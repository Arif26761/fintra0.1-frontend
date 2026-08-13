# Antigravity IDE Agent Rules & Security Policy

> **ENFORCEMENT NOTE:** Antigravity does not have a `settings.json` permission-deny
> mechanism like Claude's `.claude/settings.json`. All security restrictions below are
> **behaviorally enforced** — agents that violate them are acting against explicit
> project policy. Always verify agent actions match these rules.

---

## 1. Security & File Access Restrictions (STRICT DENY)

**These rules are non-negotiable and apply to every tool call: Read, Edit, Write, Grep, and Terminal.**

### 1.1 Prohibited File Patterns — NEVER touch these

| Pattern      | Examples                                            |
| ------------ | --------------------------------------------------- |
| `.env`       | root `.env`                                         |
| `.env.*`     | `.env.local`, `.env.production`, `.env.development` |
| `**/.env*`   | any `.env*` anywhere in the tree                    |
| `**/*.pem`   | TLS/SSL certificates                                |
| `**/*.key`   | private key files                                   |
| `**/*.p12`   | PKCS#12 key bundles                                 |
| `secrets/**` | any path under a `secrets/` folder                  |

### 1.2 The one safe env file

- ✅ **ALLOWED to read/write:** `.env.example` — this is a placeholder template with **no real values**.
- ❌ **Everything else** with `env` in the name: **BLOCKED**.

### 1.3 Strict Secret Rules

- **No Secret Reads:** Never read, open, or inspect any env file, private key, or credential file.
- **No Secret Outputs:** Never print, log, summarize, or paste API tokens, passwords, or private keys into any chat response or artifact.
- **No Secret Creation:** Never generate or write a file that contains real API keys or tokens. Use placeholder strings (e.g., `your_token_here`) in `.env.example` only.
- **No Chat Suggestions:** Never suggest the user paste secret values into the chat.
- **Audit Awareness:** All tool calls in this project are subject to the `.claude/audit.log` pre-tool hook. Antigravity agents must self-audit equivalent behavior.

---

## 2. Technical Stack & Coding Standards

### Core Stack

- **JavaScript Only (No TypeScript):** Do NOT write `.ts` or `.tsx` files. Do NOT use TypeScript type annotations.
- **Next.js 16 App Router:** Component files MUST use `.jsx` extensions.
- **Tailwind CSS v4:**
  - Theme styles using Figma tokens in `src/styles/tokens.css`.
  - Prefer semantic utility classes (`bg-brand`, `text-ink-soft`, `rounded-md`) over arbitrary values.
  - Never hardcode hex codes or pixel values that exist as design tokens.
  - Overridden Type Scale: `text-base` = 16px, `text-lg` = 18px, `text-xl` = 20px.
- **CSS Modules:** Use `.module.css` ONLY for pseudo-elements with layout, keyframes, or when class strings exceed ~6 arbitrary values.

### Charts (Hard Requirement)

- **Zero Chart Libraries:** Do NOT install or use Recharts, Chart.js, D3, Victory, Nivo, ApexCharts, visx, or any chart wrappers.
- **Custom Math:** All chart geometries must be implemented in `src/lib/charts/` as pure functions with zero external dependencies.

### Directory Structure Conventions

```
src/app/<segment>/page.jsx             # Route entrypoint
src/app/<segment>/components/<Name>/   # Page-specific components
src/components/common/<Name>/          # Shared components across 2+ pages
```

Every component folder structure: `Name.jsx`, `Name.module.css`, `Name.test.jsx`, `index.js`.
Only create a folder when its code is actively being written.

---

## 3. Working Agreement & Next.js 16 Rules

- **Minimal Code Diffs:** Propose small, focused diffs rather than whole-file rewrites.
- **Prefer "here are the 12 lines that change"** over regenerating a file.
- **Next.js 16 Async APIs:** `params` and `searchParams` are Promises — always `await` them.
- **Bundler:** Turbopack is the default bundler in Next.js 16; do not add `--turbopack`.
- **Read Next.js docs first:** Before writing any code, read the relevant guide in `node_modules/next/dist/docs/`. APIs and conventions differ from training data.
