#!/usr/bin/env node
const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const NODE_ID = process.argv[2];
const DEPTH = Number(process.argv[3] ?? 3);

if (!TOKEN || !FILE_KEY || !NODE_ID) {
  console.error('Usage: node --env-file=.env.local scripts/figma/frame.mjs <node-id> [depth]');
  process.exit(1);
}

const url =
  `https://api.figma.com/v1/files/${FILE_KEY}/nodes` +
  `?ids=${encodeURIComponent(NODE_ID)}&depth=${DEPTH}`;

const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } });

if (!res.ok) {
  console.error(`Figma API ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}

const root = (await res.json()).nodes[NODE_ID]?.document;

if (!root) {
  console.error(`Node ${NODE_ID} not found — check the id uses a colon, not a dash.`);
  process.exit(1);
}

const fonts = new Map(); // font-family + weight + size + line-height
const colors = new Map(); // colour code + opacity
const radii = new Map();

const hex = ({ r, g, b }) =>
  '#' +
  [r, g, b]
    .map((v) =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');

function collectPaints(paints, kind) {
  for (const p of paints ?? []) {
    if (p.visible === false) continue;
    const alpha = (p.opacity ?? 1) * (p.color?.a ?? 1);
    const label =
      p.type === 'SOLID'
        ? `${kind} ${hex(p.color)}${alpha < 1 ? ` @${alpha.toFixed(2)}` : ''}`
        : `${kind} ${p.type}`;
    colors.set(label, (colors.get(label) ?? 0) + 1);
  }
}

function walk(node, depth) {
  const b = node.absoluteBoundingBox;
  const size = b ? `${Math.round(b.width)}x${Math.round(b.height)}` : '';
  const auto = node.layoutMode ? ` [${node.layoutMode} gap:${node.itemSpacing ?? 0}]` : '';
  console.log(
    `${'  '.repeat(depth)}${node.type.padEnd(10)} ${node.id.padEnd(14)} ${size.padEnd(12)} ${node.name}${auto}`,
  );

  const s = node.style;
  if (s?.fontFamily) {
    const key = `${s.fontFamily} w${s.fontWeight} ${s.fontSize}px/${Math.round(s.lineHeightPx ?? 0)}`;
    fonts.set(key, (fonts.get(key) ?? 0) + 1);
  }

  collectPaints(node.fills, 'fill');
  collectPaints(node.strokes, 'stroke');
  if (node.cornerRadius > 0) {
    radii.set(node.cornerRadius, (radii.get(node.cornerRadius) ?? 0) + 1);
  }

  for (const child of node.children ?? []) walk(child, depth + 1);
}

walk(root, 0);

console.log('\n--- typography ---');
[...fonts.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, n]) => console.log(`${String(n).padStart(4)}x  ${k}`));

console.log('\n--- colours ---');
[...colors.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, n]) => console.log(`${String(n).padStart(4)}x  ${k}`));

console.log('\n--- corner radii ---');
[...radii.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, n]) => console.log(`${String(n).padStart(4)}x  ${k}px`));
