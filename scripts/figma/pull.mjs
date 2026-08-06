#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const NODE_ID = process.argv[2] ?? '11477:75610'; // Landing frame
const DEPTH = Number(process.argv[3] ?? 30);

if (!TOKEN || !FILE_KEY) {
  console.error('Missing FIGMA_TOKEN or FIGMA_FILE_KEY — run with --env-file=.env.local');
  process.exit(1);
}

async function figmaFetch(url, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } });
    if (res.status !== 429) return res;

    const header = res.headers.get('retry-after');
    const wait = Number(header);
    console.error(`429 (attempt ${attempt}/${tries}) — Retry-After: ${header ?? 'absent'}`);

    // Long budget, not a burst: stop rather than loop for hours
    if (attempt === tries || !Number.isFinite(wait) || wait > 120) return res;

    console.error(`waiting ${wait}s…`);
    await new Promise((r) => setTimeout(r, wait * 1000));
  }
}

const url =
  `https://api.figma.com/v1/files/${FILE_KEY}/nodes` +
  `?ids=${encodeURIComponent(NODE_ID)}&depth=${DEPTH}`;

const res = await figmaFetch(url);

if (!res.ok) {
  console.error(`Figma API ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exitCode = 1;
} else {
  mkdirSync('design/raw', { recursive: true });
  const out = `design/raw/${NODE_ID.replaceAll(/[:;]/g, '-')}-d${DEPTH}.json`;
  const body = JSON.stringify(await res.json());
  writeFileSync(out, body);
  console.log(`wrote ${out}  (${(Buffer.byteLength(body) / 1024).toFixed(0)} KB)`);
}
