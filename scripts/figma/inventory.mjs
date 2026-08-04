#!/usr/bin/env node
const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!TOKEN || !FILE_KEY) {
  console.error('Missing FIGMA_TOKEN or FIGMA_FILE_KEY — run with --env-file=.env.local');
  process.exit(1);
}

const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}?depth=2`, {
  headers: { 'X-Figma-Token': TOKEN },
});

if (!res.ok) {
  console.error(`Figma API ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}

const file = await res.json();
console.log(`File:     ${file.name}`);
console.log(`Modified: ${file.lastModified}`);
console.log(`Version:  ${file.version}\n`);

for (const page of file.document.children) {
  const kids = page.children ?? [];
  console.log(`PAGE  ${page.name}  [${page.id}]  — ${kids.length} top-level nodes`);
  for (const n of kids) {
    const b = n.absoluteBoundingBox;
    const size = b ? `${Math.round(b.width)}x${Math.round(b.height)}` : '-';
    console.log(`   ${n.type.padEnd(12)} ${n.id.padEnd(14)} ${size.padEnd(14)} ${n.name}`);
  }
  console.log('');
}