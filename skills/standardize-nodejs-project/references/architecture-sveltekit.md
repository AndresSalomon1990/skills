# SvelteKit architecture

File-based routing with clear server/client boundaries.

## Standard layout

```text
src/
  routes/               # SvelteKit routing
  lib/
    server/             # Server-only (db, auth, services)
    shared/             # Isomorphic utilities
docs/                   # Long-form guides (link from AGENTS.md)
static/
```

## Layer boundaries

Document in `docs/architecture.md` (or AGENTS.md if small):

- `src/lib/server/**` — never imported from client-only code
- Client-safe code in `src/lib/shared/**`
- Route files stay thin

## UI composition

See [ui-composition.md](ui-composition.md). SvelteKit-specific:

- **`+page.svelte` / `+layout.svelte`** compose feature components — minimal script; no business rules in the route file when avoidable
- **Slots:** default `<slot />` and named slots for layout composition (sidebar, actions, empty states)
- **Svelte 5:** snippet props and `{@render children?.()}` for flexible inner UI — same role as React `children` and compound sections
- **Compound-style folders:** `components/dialog/dialog-content.svelte` + barrel export — callers compose `<Dialog><DialogContent>…</DialogContent></Dialog>` instead of prop-heavy single files
- **`+layout.svelte`** holds shared chrome; pages pass content via slots or composed child components

## Testing

See [testing.md](testing.md). SvelteKit-specific:

- **Pattern A (recommended):** sibling `tests/` per feature, module, or server area — unit tests kept out of `components/`, `utilities/`, and `services/` folders
- **Vitest dual projects:** Node for `*.test.ts`; browser project for `*.svelte.test.ts` when component tests are needed
- **Scripts:** `test:unit` (watch), `test` (single CI run — runner-specific flags)
- **E2E:** top-level `e2e/` — never under `src/lib/` or `routes/`
- Document test placement in `docs/architecture.md` or per-module `*.md` files

## Tooling specifics

- Prettier: `prettier-plugin-svelte` + optional Tailwind plugin
- ESLint: `eslint-plugin-svelte` + unicorn — see [eslint.md](eslint.md)
- i18n (Paraglide, etc.): document compile command in AGENTS.md

## Commands to document in AGENTS.md

| Command | Purpose |
|---------|---------|
| `dev` | Dev server |
| `check` | svelte-check + types |
| `lint` / `lint:fix` | Lint + format |
| `cm` | Conventional commit (if Commitizen enabled) |
| `test:unit` | Unit tests (watch) |
| `test` | Unit tests single run (CI) |

## AGENTS.md style

Keep root AGENTS.md short — index into `docs/` for long guides. List optional project skills path if using `.agents/skills/`.

## Optional integrations

- ORM (Drizzle, Prisma): document migration commands in AGENTS.md
- Husky `prepare` may include framework sync (e.g. `svelte-kit sync`) when needed

## Ecosystem skills (after standardization)

Install official Svelte skills (`svelte-core-bestpractices`, `svelte-code-writer`) and optional community SvelteKit skills — see [complementary-practices.md](complementary-practices.md).
