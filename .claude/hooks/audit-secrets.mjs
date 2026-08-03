#!/usr/bin/env node
import { appendFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SENSITIVE = /(^|[\\/])\.env($|[.\\/])|\.(pem|key|p12)$|(^|[\\/])secrets[\\/]/i;

let raw = '';
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  let payload = {};
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const input = payload.tool_input ?? {};
  const target = input.file_path ?? input.path ?? '';
  appendFileSync(
    resolve('.claude/audit.log'),
    JSON.stringify({
      ts: new Date().toISOString(),
      tool: payload.tool_name,
      target,
      sensitive: SENSITIVE.test(target),
    }) + '\n'
  );

  if (!target || !SENSITIVE.test(target)) process.exit(0);
  appendFileSync(
    resolve('.claude/audit.log'),
    JSON.stringify({
      ts: new Date().toISOString(),
      tool: payload.tool_name,
      target,
      session: payload.session_id,
    }) + '\n'
  );

  console.error(`AUDIT: blocked ${payload.tool_name} -> ${target}`);
  process.exit(2);
});