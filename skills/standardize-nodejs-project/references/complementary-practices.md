# Complementary practices

Optional enhancements from public engineering guides ([Vercel agent-skills](https://github.com/vercel-labs/agent-skills), [Google Chrome / web.dev / Lighthouse](https://skills.sh/googlechrome), [Anthropic skill authoring](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills), [Agent Skills spec](https://agentskills.io/), TypeScript/Cursor community norms). **Suggest these when relevant — do not impose if the user chose a different tradeoff.**

## How to use this file

During Phase 4 (AGENTS.md) or the final report, mention applicable items the project does not yet have. Link to `docs/` or install ecosystem skills when deeper coverage is needed.

### Cross-cutting (any stack)

| Need | Skill / resource | Install |
|------|------------------|---------|
| React/Next performance | `vercel-labs/agent-skills@vercel-react-best-practices` | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices` |
| UI accessibility audit | `vercel-labs/agent-skills@web-design-guidelines` | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| Skill authoring | `anthropics/skills@skill-creator` | `npx skills add anthropics/skills --skill skill-creator` |

### SvelteKit / Svelte 5

| Need | Skill / resource | Notes |
|------|------------------|-------|
| **Official** — Svelte runes, reactivity, components | `svelte-core-bestpractices` | From [Svelte AI docs](https://svelte.dev/docs/ai/skills); ships with Svelte plugins (`@sveltejs/opencode`, Claude/Copilot plugins) or copy from Svelte releases / `tools/skills` |
| **Official** — edit/analyze `.svelte` files | `svelte-code-writer` | Uses `@sveltejs/mcp` CLI (`list-sections`, `get-documentation`, `svelte-autofixer`) — run before finalizing components |
| SvelteKit routing, layouts, load functions | `spences10/svelte-skills-kit@sveltekit-structure` | Community; [skills.sh](https://skills.sh/spences10/svelte-skills-kit/sveltekit-structure) |
| Runes (`$state`, `$derived`, `$effect`) | `spences10/svelte-skills-kit@svelte-runes` | Community complement to official best-practices |
| Data flow (loads, form actions) | `spences10/svelte-skills-kit@sveltekit-data-flow` | Community |

```bash
# Community SvelteKit skills (skills.sh)
npx skills add spences10/svelte-skills-kit --skill sveltekit-structure
npx skills add spences10/svelte-skills-kit --skill svelte-runes

# Official MCP (no skills.sh — use during Svelte work)
npx @sveltejs/mcp svelte-autofixer ./src/routes/+page.svelte
```

After standardizing a SvelteKit repo, suggest installing **`svelte-core-bestpractices`** + **`svelte-code-writer`** (official) and optionally one community skill for routing/data if the team wants skills.sh installs.

### Expo / React Native

| Need | Skill / resource | Install |
|------|------------------|---------|
| **Official** — router, UI, upgrades, EAS | `expo/skills` (full set) | `npx skills add expo/skills` — see [Expo Skills docs](https://docs.expo.dev/skills/) |
| **Official** — entry / routing | `expo-overview`, `expo-router`, `expo-project-structure` | Subset of `expo/skills` |
| **Official** — native UI, Tailwind, data | `expo-native-ui`, `expo-tailwind-setup`, `expo-data-fetching` | Subset of `expo/skills` |
| **Official** — store deploy | `eas-app-stores`, `eas-workflows` | Subset of `expo/skills` |
| React Native performance (Vercel) | `vercel-labs/agent-skills@vercel-react-native-skills` | Complements Expo official skills |

```bash
# All official Expo skills
npx skills add expo/skills

# Or pick one
npx skills add expo/skills --skill expo-router
```

Prefer **`expo/skills`** over generic RN skills when the project uses Expo — first-party constraints (Router, EAS, config plugins) differ from bare React Native.

### NestJS / Express (API backends)

NestJS has **no first-party skills.sh package** from the Nest team. After this skill sets up modules, DTOs, and lint hooks, suggest **community** skills for framework depth:

| Need | Skill / resource | Install | Notes |
|------|------------------|---------|-------|
| NestJS patterns (DI, guards, modules) | `full-stack-skills/nodejs-skills@nestjs` | `npx skills add full-stack-skills/nodejs-skills --skill nestjs` | Examples-driven |
| NestJS best practices (security, Prisma, etc.) | `xirothedev/agent-skills@nestjs-best-practices` | `npx skills add xirothedev/agent-skills --skill nestjs-best-practices` | 26 rules across 13 categories |
| NestJS scaffold reference | `terminalskills/skills@nestjs` | `npx skills add terminalskills/skills --skill nestjs` | Structure + TypeORM setup |
| **Express 5** REST API layout (non-Nest) | `stack-shifter/skills@expressjs-rest-api` | `npx skills add stack-shifter/skills --skill expressjs-rest-api` | Controllers → services → repositories; useful when Nest sits on Express or for plain Express apps |

NestJS uses Express (or Fastify) under the hood — Express REST boundary patterns (thin controllers, repository layer) still apply inside Nest modules.

Verify install counts and security audits on [skills.sh](https://skills.sh/) before recommending community backend skills to production teams.

### Google / Chrome / web.dev (frontend quality)

Google does not ship a single “Google web skill” repo, but several **first-party and Lighthouse-aligned** options complement this skill after the repo is standardized:

| Need | Skill / resource | Install | Notes |
|------|------------------|---------|-------|
| **Chrome team** — modern web patterns & use cases | `googlechrome/modern-web-guidance@modern-web-guidance` | `npx skills add googlechrome/modern-web-guidance --skill modern-web-guidance` | Search standardized guides before ad-hoc implementations — [skills.sh](https://skills.sh/googlechrome/modern-web-guidance) |
| **Chrome team** — extensions | `googlechrome/modern-web-guidance@chrome-extensions` | `npx skills add googlechrome/modern-web-guidance --skill chrome-extensions` | MV3 extension work only |
| **Chrome DevTools** — accessibility debugging | `chromedevtools/chrome-devtools-mcp@a11y-debugging` | `npx skills add chromedevtools/chrome-devtools-mcp --skill a11y-debugging` | Requires [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp); Lighthouse + a11y tree — [Chrome for Developers](https://developer.chrome.com/docs/devtools/agents/get-started) |
| **Lighthouse / CWV / WCAG** (unofficial, Google-aligned) | `addyosmani/web-quality-skills` | `npx skills add addyosmani/web-quality-skills` | Encodes 150+ Lighthouse audits, Core Web Vitals, a11y, SEO, best practices — stack-agnostic |
| **Firebase backend** (Google BaaS) | `firebase/agent-skills` | `npx skills add firebase/agent-skills` | Auth, Firestore, hosting, etc. — not a substitute for Nest/Express architecture |

**`addyosmani/web-quality-skills` sub-skills** (pick as needed):

| Skill | Use when |
|-------|----------|
| `web-quality-audit` | Full Lighthouse-style review (perf + a11y + SEO + best practices) |
| `performance` / `core-web-vitals` | LCP, INP, CLS, load-time optimization |
| `accessibility` | WCAG 2.2, keyboard, screen readers |
| `seo` | Meta, structured data, crawlability |
| `best-practices` | HTTPS, security headers, modern APIs (overlaps backend hygiene for HTTP APIs) |

**Docs (no install)** — agents can fetch [web.dev](https://web.dev/) articles as markdown:

```text
https://web.dev/articles/vitals.md.txt
https://web.dev/articles/accessible-tap-targets.md.txt
```

Append **`.md.txt`** to any web.dev article URL for clean markdown ([used by Chrome a11y skill](https://developer.chrome.com/docs/devtools/agents/get-started)).

**PWA:** no dedicated Google skill on skills.sh — point to [web.dev/learn/pwa](https://web.dev/learn/pwa/) and `web-quality-audit` / `best-practices` for installability, manifest, and service worker checks.

**Chrome DevTools MCP** (optional infra for perf/a11y skills):

```json
"chrome-devtools": {
  "command": ["npx", "-y", "chrome-devtools-mcp@latest"]
}
```

Suggest Google-aligned skills **after** standardization, for frontend stacks (Vite, Next, SvelteKit). They do not replace ESLint/Husky setup from this skill.

---

## Architecture and code organization

### Feature isolation (default in this skill)

Vertical slices under `features/` with a shared layer — aligns with scalable SPA and full-stack apps. Alternative valid patterns:

- **Layered** (`components/`, `hooks/`, `services/` at root) — fine for small apps; document when to migrate to features
- **Domain-driven folders** — nest by bounded context in monoliths

### Barrel files (`index.ts` re-exports)

**Public feature API:** a single `features/foo/index.ts` helps encapsulation.

**Deep barrel trees** hurt bundle size and tree-shaking (Vercel `bundle-barrel-imports`). Prefer:

- Direct imports for heavy modules inside a feature
- Barrels only at feature boundaries, not for every subfolder

### Progressive disclosure for agents

Keep root `AGENTS.md` short; long guides live in `docs/`. Optional **`CONTEXT.md`** for domain vocabulary (terms agents should reuse in names and docs) — separate from AGENTS.md so onboarding stays scannable.

### Thin boundaries

- Route/page files compose; they do not accumulate business logic
- API client + error parsing centralized — not duplicated per feature

---

## TypeScript and naming

### Compiler strictness

Enable when bootstrapping or migrating:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

Relax individual flags only with a documented reason in AGENTS.md.

### Discriminated unions

Use exhaustive `switch` with a `never` default so new variants fail at compile time (common Cursor/TS team practice):

```typescript
default: {
  const _exhaustive: never = value
  return _exhaustive
}
```

### Imports

- Top of file only — no inline imports unless circular dependency is documented
- `import type` for type-only imports
- Avoid `any`; prefer `unknown` + narrowing

---

## React performance (Vite, Next, Expo, SvelteKit)

Prioritized checklist from Vercel engineering patterns (also relevant to client-heavy SvelteKit islands):

1. **Eliminate waterfalls** — `Promise.all` for independent fetches; start promises before awaiting
2. **Bundle size** — dynamic `import()` for heavy routes/charts/editors; avoid unnecessary barrel imports
3. **Re-renders** — do not define components inside components; derive state in render instead of effect when possible
4. **Lists** — virtualize long lists; `content-visibility` for very long static sections
5. **Third-party scripts** — defer analytics until after hydration (SPAs) or load on interaction

For Vite SPAs: analyze with `rollup-plugin-visualizer` or Vite's build report when bundle grows.

For SvelteKit: prefer official **`svelte-core-bestpractices`** and `@sveltejs/mcp svelte-autofixer` over generic React advice when editing `.svelte` files.

---

## Styling and UI quality

- Design tokens in CSS variables / Tailwind `@theme` — not one-off hex values
- Focus visible states, semantic HTML, labels on inputs (see Vercel Web Interface Guidelines — fetch live rules when auditing UI)
- `prefers-reduced-motion` for non-essential animation
- Images: explicit dimensions, lazy loading below the fold

---

## Security (beyond [security.md](security.md))

### Dependencies

- Run `npm audit` / `pnpm audit` in CI; pin or override known vulnerable transitive deps
- Enable Dependabot or Renovate on GitHub repos
- Prefer lockfiles committed; CI uses `npm ci` / `pnpm install --frozen-lockfile`

### Client apps (Vite, Next, Expo)

- Only `VITE_*` / `NEXT_PUBLIC_*` / `EXPO_PUBLIC_*` reach the browser — never prefix secrets
- Sanitize user HTML; avoid `dangerouslySetInnerHTML` without a trusted pipeline
- Store tokens in `httpOnly` cookies when you control the backend; if using localStorage, document XSS risk in AGENTS.md
- CSP headers at CDN/reverse proxy when deploying SPAs

### APIs (Nest, Next route handlers)

- Validate all input (Zod, class-validator)
- Rate limiting and auth on every mutating route
- Helmet or equivalent security headers for HTTP APIs
- Do not log request bodies containing passwords or tokens

### Git and CI

- GitHub secret scanning / push protection when available
- No secrets in CI logs — mask env vars in workflows
- OIDC to cloud providers instead of long-lived CI keys when possible

---

## Git hooks and CI

Local hooks (this skill's default):

- lint-staged → fast feedback
- optional `tsc --noEmit` / `tsc -b` if fast enough

CI (recommend in final report):

```yaml
# illustrative — adapt to provider
- run: pnpm install --frozen-lockfile
- run: pnpm lint
- run: pnpm build
- run: pnpm test --if-present
```

Pre-commit is not a substitute for CI — hooks can be skipped with `--no-verify`.

---

## Documentation and agent ergonomics

Full guide: [documentation.md](documentation.md). Summary:

- **`AGENTS.md` = index** — link to `docs/` or external sources; do not duplicate long guides
- **Audit first** — suggest architecture, product, design, glossary, and guides based on project shape; user approves before creating files
- **External docs count** — Figma, Notion, wiki URLs belong in the fast-context table
- **Plans / session notes** — `docs/plans/` if used; mark non-normative

From Anthropic / Agent Skills best practices:

- One workflow per skill; compose skills rather than mega-docs
- Descriptions include **when** to activate (trigger phrases)
- Examples of good vs bad outcomes in `docs/` or references
- Security: no credentials in skills or AGENTS.md

From Vercel agent-skills repo:

- Scripts in `scripts/` for repeatable automation (validation, packaging)
- Status to stderr, machine-readable output to stdout for scripts

---

## Optional project files

| File | Purpose |
|------|---------|
| `CONTEXT.md` | Domain glossary for agents |
| `docs/adr/` | Architecture decision records |
| `.github/pull_request_template.md` | PR checklist (lint, tests, screenshots) |
| `.nvmrc` / `.node-version` | Pin Node for team + CI |
| `CONTRIBUTING.md` | Human contributor guide; link from README |

---

## When standards conflict

This skill encodes one **opinionated default** (ESLint + Prettier + unicorn + feature folders). Valid alternatives:

- Biome-only repos
- Oxlint/Oxfmt
- Layered architecture for tiny codebases
- Different commit message conventions

Always **audit first**, propose deltas, and let the user choose before large migrations.
