#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const NODE_ID = process.argv[2];
const DEPTH = Number(process.argv[3] ?? 3);

if (!TOKEN || !FILE_KEY || !NODE_ID) {
  console.error('Usage: node --env-file=.env.local scripts/figma/frame.mjs <node-id> [depth]');
  process.exit(1);
}

let root = null;

for (const file of existsSync('design/raw') ? readdirSync('design/raw') : []) {
  if (!file.endsWith('.json')) continue;
  const payload = JSON.parse(readFileSync(`design/raw/${file}`, 'utf8'));
  for (const entry of Object.values(payload.nodes ?? {})) {
    root = findNode(entry.document, NODE_ID);
    if (root) break;
  }
  if (root) {
    console.error(`(from cache: design/raw/${file})`);
    break;
  }
}

if (!root) {
  console.error(`${NODE_ID} not in design/raw — run scripts/figma/pull.mjs first`);
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

// function findNode(node, id) {
//   if (node?.id === id) return node;
//   for (const child of node?.children ?? []) {
//     const hit = findNode(child, id);
//     if (hit) return hit;
//   }
//   return null;
// }

function detail(node) {
  const bits = [];

  if (node.layoutMode) {
    bits.push(node.layoutMode === 'HORIZONTAL' ? 'row' : 'col');
    if (node.itemSpacing) bits.push(`gap:${node.itemSpacing}`);
    if (node.primaryAxisAlignItems) bits.push(`main:${node.primaryAxisAlignItems}`);
    if (node.counterAxisAlignItems) bits.push(`cross:${node.counterAxisAlignItems}`);
    const p = [node.paddingTop, node.paddingRight, node.paddingBottom, node.paddingLeft];
    if (p.some(Boolean)) bits.push(`pad:${p.map((v) => v ?? 0).join('/')}`);
  }

  if (node.cornerRadius) bits.push(`r:${node.cornerRadius}`);

  const alpha = (p) => (p.opacity ?? 1) * (p.color?.a ?? 1);
  const paint = (p) => {
    const a = alpha(p);
    return (p.type === 'SOLID' ? hex(p.color) : p.type) + (a < 1 ? ` @${a.toFixed(2)}` : '');
  };

  const fill = (node.fills ?? []).find((f) => f.visible !== false);
  if (fill) bits.push(`${node.type === 'TEXT' ? 'color' : 'bg'}:${paint(fill)}`);

  const stroke = (node.strokes ?? []).find((s) => s.visible !== false);
  if (stroke) bits.push(`border:${paint(stroke)}@${node.strokeWeight ?? 1}px`);

  if (node.type === 'TEXT') {
    const s = node.style ?? {};
    if (s.textCase) bits.push(`case:${s.textCase}`);
    if (s.textAlignHorizontal !== 'LEFT') bits.push(`align:${s.textAlignHorizontal}`);
    if (s.letterSpacing) bits.push(`ls:${s.letterSpacing}`);
    bits.push(
      `"${node.characters}"`,
      `${s.fontSize}/${Math.round(s.lineHeightPx ?? 0)} w${s.fontWeight}`,
    );
  }

  for (const e of node.effects ?? []) {
    if (e.visible === false) continue;
    if (e.type === 'LAYER_BLUR') bits.push(`blur:${e.radius}`);
    else if (e.type === 'BACKGROUND_BLUR') bits.push(`backdrop:${e.radius}`);
    else if (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') {
      const a = (e.color?.a ?? 1).toFixed(2);
      const kind = e.type === 'INNER_SHADOW' ? 'inset-shadow' : 'shadow';
      bits.push(
        `${kind}:${e.offset?.x ?? 0},${e.offset?.y ?? 0} ${e.radius} ${hex(e.color)} @${a}`,
      );
    }
  }

  return bits.length ? `  ${bits.join(' ')}` : '';
}

function findNode(node, id) {
  if (node?.id === id) return node;
  for (const child of node?.children ?? []) {
    const hit = findNode(child, id);
    if (hit) return hit;
  }
  return null;
}

function walk(node, depth) {
  const b = node.absoluteBoundingBox;
  const size = b ? `${Math.round(b.width)}x${Math.round(b.height)}` : '';

  console.log(
    `${'  '.repeat(depth)}${node.type.padEnd(10)} ${node.id.padEnd(14)} ${size.padEnd(12)} ${node.name}${detail(node)}`,
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
