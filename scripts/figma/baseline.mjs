#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { BREAKPOINTS } from '../breakpoints.mjs';

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

// Desktop section node IDs (page Landing 2.1).
const SECTIONS_DESKTOP = {
  hero: '11625:15840',
  features: '11549:11575',
  'app-cta': '11564:36',
  pricing: '11610:5350',
  faq: '11617:468',
  testimonials: '11622:10846',
  prefooter: '11625:15841',
};

// Mobile section node IDs (page Landing 2.1 - Mobile, frame 12429:22815).
// The full mobile frame is 12429:22815; individual sections follow.
// TODO: confirm per-section IDs once the mobile Figma frame is inspected.
const SECTIONS_MOBILE = {
  // Placeholder — export the full mobile frame until per-section IDs are confirmed.
  // hero:         '12429:22818',
  // features:     '12528:5761',
  // 'app-cta':    '12534:5767',
  // pricing:      '12547:5522',
  // faq:          '12558:16435',
  // testimonials: '12587:16944',
  // prefooter:    '12590:17049',
};

const SECTIONS_BY_BP = {
  desktop: SECTIONS_DESKTOP,
  mobile: SECTIONS_MOBILE,
};

// Parse optional --bp=<name> flag (same convention as diff.mjs).
const bpArg = process.argv.slice(2).find((a) => a.startsWith('--bp='));
const bpFilter = bpArg ? bpArg.slice(5) : null;

if (bpFilter && !BREAKPOINTS[bpFilter]) {
  console.error(
    `Unknown breakpoint "${bpFilter}". Available: ${Object.keys(BREAKPOINTS).join(', ')}`,
  );
  process.exit(1);
}

const bpEntries = Object.entries(BREAKPOINTS).filter(([key]) => !bpFilter || key === bpFilter);

for (const [bpKey, bp] of bpEntries) {
  const sections = SECTIONS_BY_BP[bpKey];
  if (!sections || Object.keys(sections).length === 0) {
    console.log(`${bpKey.padEnd(8)} no sections registered yet — skipping`);
    continue;
  }

  const ids = Object.values(sections).join(',');
  // Export at 2x so diff.mjs's deviceScaleFactor:2 screenshots match.
  const url =
    `https://api.figma.com/v1/images/${FILE_KEY}` +
    `?ids=${encodeURIComponent(ids)}&format=png&scale=2`;

  const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } });
  const body = await res.json();

  if (!res.ok || body.err) {
    console.error(`Figma images ${res.status}: ${body.err ?? res.statusText}`);
    process.exit(1);
  }

  // Write into the breakpoint-specific subdirectory so desktop and mobile
  // baselines never collide on the same filename.
  const outDir = `tests/visual/baseline/${bp.dir}`;
  mkdirSync(outDir, { recursive: true });

  for (const [name, id] of Object.entries(sections)) {
    const src = body.images[id];
    if (!src) {
      console.error(
        `${bpKey.padEnd(8)} no render for ${name} (${id}) — re-run, Figma renders async`,
      );
      continue;
    }
    const png = Buffer.from(await (await fetch(src)).arrayBuffer());
    writeFileSync(`${outDir}${name}.png`, png);
    console.log(`${bpKey.padEnd(8)} ${name}.png  ${(png.length / 1024).toFixed(0)} KB`);
  }
}
