<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project constraints (non-negotiable)

Pixel-perfect rebuild of the Fintra website from Figma. Evaluated on process as
much as output.

### Stack
- **JavaScript only. Never TypeScript.** No `.ts`/`.tsx`, no type annotations.
- Next.js 16, App Router. Component files are `.jsx`, not `.js`.
- **CSS Modules only.** No Tailwind, no styled-components, no CSS-in-JS.
- All design values come from `src/styles/tokens.css`, generated from Figma.
  Never hardcode a colour, size, radius or spacing value.

### Charts — hard requirement
- **Zero chart libraries.** Not Recharts, Chart.js, D3, Victory, Nivo, ApexCharts,
  visx, or any wrapper around them.
- Chart geometry lives in `src/lib/charts/` as pure functions with no dependencies.
- If a task appears to need a charting library, write the maths instead.

### Folder convention
    src/app/<segment>/page.jsx             route entry
    src/app/<segment>/components/<Name>/   used by that page only
    src/components/common/<Name>/          used by 2+ pages

Each component folder: `Name.jsx`, `Name.module.css`, `Name.test.jsx`, `index.js`.
Create a folder only when its code is being written.

### Working agreement
- The developer hand-types all code. Propose small diffs, never whole-file rewrites.
- Prefer "here are the 12 lines that change" over regenerating a file.
- Never read or write `.env*`, `*.key`, `*.pem`, or `secrets/**`.
- Never suggest pasting secret values into the chat.

### Next.js 16 notes
- `params` and `searchParams` are Promises — `await` them.
- Turbopack is the default bundler; no `--turbopack` flag needed.