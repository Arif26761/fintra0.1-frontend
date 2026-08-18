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
// Verified against raw/12429-22815-d30.json — names and sizes match the spec.
const SECTIONS_MOBILE = {
  hero: '12429:22818', // Start        372x799
  features: '12528:5761', // Frame 880    362x453
  'app-cta': '12534:5767', // Frame 881    362x778
  pricing: '12547:5522', // Frame 882    402x936
  faq: '12558:16435', // Frame 883    402x617
  testimonials: '12587:16944', // Component 3  362x610
  prefooter: '12590:17049', // Frame 872    402x1006
};

const SECTIONS_MARKET = {
  'market-header': '12336:43255',
  'market-ticker': '12336:43264',
  'market-intro': '12336:43266',
  'market-cards': '12336:43270',
  'market-index': '12336:43274',
  'market-top10': '12336:43275',
  'market-heatmap': '12336:43276',
  'market-news': '12336:43277',
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
