# Vite + React architecture

Single-page apps: React + Vite + TypeScript, typically with React Router and client-side data fetching (TanStack Query).

Bootstrap with `npm create vite@latest` (React + TypeScript), then apply this skill — do not replace the Vite scaffold.

## Standard layout

```text
src/
  main.tsx
  App.tsx                 # Router shell, providers
  index.css               # Global styles / Tailwind entry
  features/
    {feature}/
      pages/
        {feature}.page.tsx
      components/
      schemas/            # Zod — optional
      types/
      index.ts            # Public exports for this feature
  shared/
    components/ui/        # Design system (shadcn, Radix, etc.)
    lib/
      api/                # fetch client, error parsing
      query-client/       # TanStack Query setup
    store/                # Zustand or similar — if used
    types/
public/                   # Static assets (reference with /path, not bundled imports)
```

## Routing

- **React Router** (v6/v7): route definitions in `App.tsx` or `src/routes/` — keep route config thin
- **Pages** use suffix `.page.tsx` — compose feature components, minimal logic
- Lazy-load heavy routes with `React.lazy` + `Suspense` when bundle size matters

## Testing

See [testing.md](testing.md). Vite + React:

- Pick Pattern A (`features/{name}/tests/`) or Pattern B (colocated `*.test.tsx`) project-wide
- Component tests: `*.test.tsx` with Testing Library + Vitest
- E2E: top-level `e2e/` with Playwright — separate `test:e2e` script

## Feature rules

- **`features/{name}/` is independent** — no imports from sibling features
- Cross-feature code → `shared/`
- External imports into a feature go through **`features/{name}/index.ts`** when using a barrel export pattern
- Business logic (forms, tables, mutations) lives in **components** or hooks — pages only assemble layout

## UI composition

See [ui-composition.md](ui-composition.md). React-specific:

- **Pages** (`.page.tsx`) compose feature components via `children` and layout wrappers — no fetch/form/table in the page file
- **Compound components** for reusable blocks: export `Card`, `CardHeader`, `CardContent` from `components/card/` (or use shadcn/Radix compound APIs in `shared/components/ui/`)
- **Providers** (QueryClient, theme, auth) compose in `App.tsx` or a dedicated `providers.tsx` — not duplicated per feature
- Prefer splitting variants into composed trees over adding flags to a single mega-component

## Data fetching

- **TanStack Query** for server state — configure defaults in `shared/lib/query-client/`
- Suggested defaults to document in AGENTS.md (adapt to product):
  - `staleTime`: avoid refetch storms
  - `retry`: conservative for mutations
  - `refetchOnWindowFocus`: often `false` for admin dashboards
- Add `@tanstack/eslint-plugin-query` when using React Query

## Client state

- **Zustand** (or similar) for cross-feature UI/auth state in `shared/store/`
- Prefer Query for server data; local state for UI-only concerns
- Persist sensitive tokens carefully — document storage keys; never log tokens

## Styling

- **Tailwind CSS v3/v4** — v4 may use `@import "tailwindcss"` and `@theme` in CSS instead of `tailwind.config.js`
- Use design tokens from CSS variables / `@theme` — avoid arbitrary hex in components
- **shadcn/ui**: keep `components.json`; shared primitives under `shared/components/ui/`

## Vite configuration

Typical `vite.config.ts`:

- `@` alias → `src/` (match `tsconfig` paths)
- `define` for build-time constants (e.g. app version) — not secrets
- Env vars exposed to client must use **`VITE_` prefix** — document in `.env.example`

```bash
# .env.example
VITE_API_URL=http://localhost:3000
```

## ESLint (Vite + React)

See [eslint.md](eslint.md) — include:

- `eslint-plugin-react` + `jsx-runtime`
- `eslint-plugin-react-hooks` (recommended-latest)
- `eslint-plugin-react-refresh` (Vite HMR)
- `@tanstack/eslint-plugin-query` when applicable
- unicorn + import-sort + unused-imports

## Build scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --fix --no-warn-ignored"
  }
}
```

Use `tsc -b` when the template ships project references (`tsconfig.app.json` / `tsconfig.node.json`).

## AGENTS.md highlights

Document:

- Stack versions (React, Router, Query, Tailwind major)
- Path alias (`@/` → `src/`)
- Where API client and auth live
- Design token location (`index.css`, theme file)
- Public assets convention (`/public` vs imports)

## Optional enhancements

See [complementary-practices.md](complementary-practices.md) for performance (code splitting, barrel imports), accessibility audits, and security headers for static deploys.
