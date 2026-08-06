#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

const SECTIONS = {
  hero: '11625:15840',
  features: '11549:11575',
  'app-cta': '11564:36',
  pricing: '11610:5350',
  faq: '11617:468',
  testimonials: '11622:10846',
  prefooter: '11625:15841',
};

const ids = Object.values(SECTIONS).join(',');
const url =
  `https://api.figma.com/v1/images/${FILE_KEY}` +
  `?ids=${encodeURIComponent(ids)}&format=png&scale=2`;

const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } });
const body = await res.json();

if (!res.ok || body.err) {
  console.error(`Figma images ${res.status}: ${body.err ?? res.statusText}`);
  process.exit(1);
}

mkdirSync('tests/visual/baseline', { recursive: true });

for (const [name, id] of Object.entries(SECTIONS)) {
  const src = body.images[id];
  if (!src) {
    console.error(`no render for ${name} (${id}) — re-run, Figma renders async`);
    continue;
  }
  const png = Buffer.from(await (await fetch(src)).arrayBuffer());
  writeFileSync(`tests/visual/baseline/${name}.png`, png);
  console.log(`${name}.png  ${(png.length / 1024).toFixed(0)} KB`);
}
