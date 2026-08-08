// Offline reader for the things frame.mjs does not print:
//   • child offsets inside a frame that has no auto-layout
//   • gradient stops on a fill or stroke
//   • effects (drop shadows, blurs) with their raw numbers
// Reads the cached tree only — never calls the API.

import { readFileSync } from 'node:fs';

const [file, targetId] = process.argv.slice(2);

const hex = (color) =>
  ['r', 'g', 'b']
    .map((k) =>
      Math.round(color[k] * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');

const describeGradients = (node, indent) => {
  const paints = [...(node.strokes ?? []), ...(node.fills ?? [])];
  for (const paint of paints.filter((p) => p.type?.startsWith('GRADIENT'))) {
    console.log(`${indent}${paint.type}  handles:${JSON.stringify(paint.gradientHandlePositions)}`);
    for (const stop of paint.gradientStops ?? []) {
      const alpha = stop.color.a * (paint.opacity ?? 1);
      console.log(
        `${indent}  ${stop.position.toFixed(3)}  #${hex(stop.color)}  a:${alpha.toFixed(2)}`,
      );
    }
  }
};

const describeEffects = (node, indent) => {
  for (const fx of node.effects ?? []) {
    if (fx.visible === false) continue;
    const parts = [fx.type];
    if (fx.offset) parts.push(`offset:${fx.offset.x},${fx.offset.y}`);
    if (fx.radius !== undefined) parts.push(`blur:${fx.radius}`);
    if (fx.spread) parts.push(`spread:${fx.spread}`);
    if (fx.color) parts.push(`#${hex(fx.color)} a:${fx.color.a.toFixed(2)}`);
    console.log(`${indent}${parts.join('  ')}`);
  }
};

if (!file || !targetId) {
  console.error('usage: node scripts/figma/offsets.mjs <raw.json> <node-id>');
  process.exitCode = 1;
} else {
  const raw = JSON.parse(readFileSync(file, 'utf8'));
  const roots = raw.nodes
    ? Object.values(raw.nodes).map((entry) => entry.document)
    : [raw.document ?? raw];

  const find = (node, id) => {
    if (node.id === id) return node;
    for (const child of node.children ?? []) {
      const hit = find(child, id);
      if (hit) return hit;
    }
    return null;
  };

  let target = null;
  for (const root of roots) {
    target = find(root, targetId);
    if (target) break;
  }

  if (!target) {
    console.error(`node ${targetId} not found in ${file}`);
    process.exitCode = 1;
  } else {
    const box = target.absoluteBoundingBox;
    console.log(`${target.name}  ${target.id}  ${box.width}x${box.height}`);
    describeGradients(target, '  ');
    describeEffects(target, '  ');

    for (const child of target.children ?? []) {
      const c = child.absoluteBoundingBox;

      if (!c) {
        console.log(`  ${child.name.padEnd(16)} ${child.id.padEnd(16)}  (no bounding box)`);
        continue;
      }

      console.log(
        `  ${child.name.padEnd(16)} ${child.id.padEnd(16)}` +
          ` ${String(c.width).padStart(6)}x${String(c.height).padEnd(6)}` +
          `  left:${(c.x - box.x).toFixed(1)}  top:${(c.y - box.y).toFixed(1)}`,
      );
      describeGradients(child, '      ');
      describeEffects(child, '      ');
    }
  }
}
