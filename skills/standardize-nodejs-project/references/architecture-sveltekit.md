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
| `test:unit` | Vitest or project test runner |

## AGENTS.md style

Keep root AGENTS.md short — index into `docs/` for long guides. List optional project skills path if using `.agents/skills/`.

## Optional integrations

- ORM (Drizzle, Prisma): document migration commands in AGENTS.md
- Husky `prepare` may include framework sync (e.g. `svelte-kit sync`) when needed

## Ecosystem skills (after standardization)

Install official Svelte skills (`svelte-core-bestpractices`, `svelte-code-writer`) and optional community SvelteKit skills — see [complementary-practices.md](complementary-practices.md).
