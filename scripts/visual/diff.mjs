#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { BREAKPOINTS } from '../breakpoints.mjs';

const URL = process.env.DIFF_URL ?? 'http://localhost:3000';
const SECTIONS = ['hero', 'features', 'app-cta', 'pricing', 'faq', 'testimonials', 'prefooter'];

// Composite transparent Figma exports onto the true page background colour.
// --color-bg is #000c0c = [0, 12, 12].
const BG = [0, 12, 12]; // --color-bg #000c0c

// Absorbs Playwright rounding a clip rect up on fractional page offsets.
// This is a fixed artefact, not proportional — keep 4 at every breakpoint.
const SIZE_SLACK = 4;

// --- CLI parsing -----------------------------------------------------------
// Parse --bp=<name> before reading the positional section filter, otherwise
// the flag would be swallowed as a section name.
const bpArg = process.argv.slice(2).find((a) => a.startsWith('--bp='));
const bpFilter = bpArg ? bpArg.slice(5) : null; // e.g. 'desktop' or 'mobile'
const only = process.argv.slice(2).find((a) => !a.startsWith('--')); // section filter

// Validate --bp value early so we fail loudly on typos.
if (bpFilter && !BREAKPOINTS[bpFilter]) {
  console.error(
    `Unknown breakpoint "${bpFilter}". Available: ${Object.keys(BREAKPOINTS).join(', ')}`,
  );
  process.exit(1);
}

const bpEntries = Object.entries(BREAKPOINTS).filter(([key]) => !bpFilter || key === bpFilter);

// ---------------------------------------------------------------------------

function crop(png, width, height) {
  if (png.width === width && png.height === height) return png;
  const out = new PNG({ width, height });
  PNG.bitblt(png, out, 0, 0, width, height, 0, 0);
  return out;
}

// Allow CI/containers to point at their system Chromium.
// Locally this env var is unset and Playwright uses its own bundled build.
const browser = await chromium.launch(
  process.env.DIFF_CHROMIUM ? { executablePath: process.env.DIFF_CHROMIUM } : {},
);

let failures = 0;

for (const [bpKey, bp] of bpEntries) {
  // Viewport is set at page construction, so open one page per breakpoint.
  const page = await browser.newPage({
    viewport: { width: bp.width, height: bp.height },
    deviceScaleFactor: 2,
    isMobile: bpKey === 'mobile',
    hasTouch: bpKey === 'mobile',
  });

  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Hide the fixed navbar so it doesn't bleed into section screenshots.
  await page.addStyleTag({ content: '[data-diff-hide]{display:none !important}' });

  // Ensure nested output directories exist for this breakpoint.
  mkdirSync(`tests/visual/actual/${bp.dir}`, { recursive: true });
  mkdirSync(`tests/visual/diff/${bp.dir}`, { recursive: true });

  for (const name of SECTIONS) {
    if (only && only !== name) continue;

    const label = `${bpKey.padEnd(8)} ${name.padEnd(13)}`;

    const basePath = `tests/visual/baseline/${bp.dir}${name}.png`;
    if (!existsSync(basePath)) {
      console.log(`${label} not built yet`);
      continue;
    }

    const el = page.locator(`[data-section="${name}"]`);
    if ((await el.count()) === 0) {
      console.log(`${label} not built yet`);
      continue;
    }

    const box = await el.boundingBox();
    console.log(`${label} box   y:${box.y}  h:${box.height}`);

    const actualPath = `tests/visual/actual/${bp.dir}${name}.png`;
    await el.screenshot({ path: actualPath });

    let base = PNG.sync.read(readFileSync(basePath));
    let shot = PNG.sync.read(readFileSync(actualPath));

    const dw = Math.abs(base.width - shot.width);
    const dh = Math.abs(base.height - shot.height);

    if (dw > SIZE_SLACK || dh > SIZE_SLACK) {
      console.log(
        `${label} SIZE  baseline ${base.width}x${base.height}  actual ${shot.width}x${shot.height}`,
      );
      failures++;
      continue;
    }

    // Playwright rounds an element's clip rect up when the page lands it on a
    // fractional offset — compare the overlap; SIZE_SLACK already caught bad cases.
    const width = Math.min(base.width, shot.width);
    const height = Math.min(base.height, shot.height);

    if (dw || dh) {
      console.log(
        `${label} note  ${base.width}x${base.height} vs ${shot.width}x${shot.height} — comparing ${width}x${height}`,
      );
      base = crop(base, width, height);
      shot = crop(shot, width, height);
    }

    // Figma frames export with transparency — composite onto the page background.
    for (let i = 0; i < base.data.length; i += 4) {
      const a = base.data[i + 3] / 255;
      if (a === 1) continue;
      for (let c = 0; c < 3; c++) {
        base.data[i + c] = Math.round(base.data[i + c] * a + BG[c] * (1 - a));
      }
      base.data[i + 3] = 255;
    }

    const diff = new PNG({ width, height });
    const bad = pixelmatch(base.data, shot.data, diff.data, width, height, {
      threshold: 0.12,
    });
    writeFileSync(`tests/visual/diff/${bp.dir}${name}.png`, PNG.sync.write(diff));

    const pct = ((1 - bad / (width * height)) * 100).toFixed(2);
    console.log(`${label} ${pct}%   ${bad.toLocaleString()} px differ`);
    if (Number(pct) < 99) failures++;
  }

  await page.close();
}

await browser.close();
process.exitCode = failures ? 1 : 0;
