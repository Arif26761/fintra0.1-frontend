#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const URL = process.env.DIFF_URL ?? 'http://localhost:3000';
const SECTIONS = ['hero', 'features', 'app-cta', 'pricing', 'faq', 'testimonials', 'prefooter'];
const only = process.argv[2];
const BG = [13, 24, 24]; // --color-bg #0d1818
const SIZE_SLACK = 4; // px of rounding we tolerate before calling it a layout bug

mkdirSync('tests/visual/actual', { recursive: true });
mkdirSync('tests/visual/diff', { recursive: true });

function crop(png, width, height) {
  if (png.width === width && png.height === height) return png;
  const out = new PNG({ width, height });
  PNG.bitblt(png, out, 0, 0, width, height, 0, 0);
  return out;
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

await page.goto(URL, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: '[data-diff-hide]{display:none !important}' });

let failures = 0;

for (const name of SECTIONS) {
  if (only && only !== name) continue;

  const basePath = `tests/visual/baseline/${name}.png`;
  if (!existsSync(basePath)) continue;

  const el = page.locator(`[data-section="${name}"]`);
  if ((await el.count()) === 0) {
    console.log(`${name.padEnd(13)} not built yet`);
    continue;
  }

  const box = await el.boundingBox();
  console.log(`${name.padEnd(13)} box   y:${box.y}  h:${box.height}`);

  await el.screenshot({ path: `tests/visual/actual/${name}.png` });

  let base = PNG.sync.read(readFileSync(basePath));
  let shot = PNG.sync.read(readFileSync(`tests/visual/actual/${name}.png`));

  const dw = Math.abs(base.width - shot.width);
  const dh = Math.abs(base.height - shot.height);

  if (dw > SIZE_SLACK || dh > SIZE_SLACK) {
    console.log(
      `${name.padEnd(13)} SIZE  baseline ${base.width}x${base.height}  actual ${shot.width}x${shot.height}`,
    );
    failures++;
    continue;
  }

  // Playwright rounds an element's clip rect up when the page lands it on a
  // fractional offset — the Landing frame is 5752.65px tall, so every section
  // below a fractional one can come back 1-2px larger than Figma's export.
  // Compare the overlap; anything past SIZE_SLACK already failed above.
  const width = Math.min(base.width, shot.width);
  const height = Math.min(base.height, shot.height);

  if (dw || dh) {
    console.log(
      `${name.padEnd(13)} note  ${base.width}x${base.height} vs ${shot.width}x${shot.height} — comparing ${width}x${height}`,
    );
    base = crop(base, width, height);
    shot = crop(shot, width, height);
  }

  // Figma frames export with transparency — composite onto the page background
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
  writeFileSync(`tests/visual/diff/${name}.png`, PNG.sync.write(diff));

  const pct = ((1 - bad / (width * height)) * 100).toFixed(2);
  console.log(`${name.padEnd(13)} ${pct}%   ${bad.toLocaleString()} px differ`);
  if (Number(pct) < 99) failures++;
}

await browser.close();
process.exitCode = failures ? 1 : 0;
