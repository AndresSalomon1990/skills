# Next.js architecture

App Router projects (Next.js 13+).

## Standard layout

```text
app/                    # Routes, layouts, route handlers
features/
  {feature}/
    components/
    schemas/
    types/
    services/ or hooks/
shared/
  components/ui/
  lib/
messages/               # i18n locale files (when using next-intl or similar)
public/
```

## Feature isolation

- **`features/{name}/` is independent** — no imports from sibling features
- Cross-feature code → `shared/` (import from real paths, avoid stub re-exports)
- One React component per file under `components/`

## i18n

- User-visible strings in locale message files for **every supported language**
- Document locale list and paths in AGENTS.md

## Routes vs features

- Route files in `app/` stay thin — compose feature components
- Avoid `page → *-content.tsx` wrappers that only exist for one route

## UI composition

See [ui-composition.md](ui-composition.md). Next.js App Router:

- **`layout.tsx` / `page.tsx`** compose feature UI — server components can fetch; still delegate presentation to feature components under `features/`
- **Nested layouts** are composition boundaries — shared chrome (nav, sidebar) in parent layouts; page content from features
- **Compound components** in `shared/components/ui/` (shadcn/Radix pattern) — feature code composes `Dialog`, `DialogContent`, `DialogFooter` instead of one dialog with ten props
- Client boundaries: push `"use client"` to the smallest compound leaf that needs hooks, not the whole page

## Reverse proxy / deploy

If deployed behind a reverse proxy (IIS, nginx, CDN):

- Document which paths the framework owns vs upstream APIs
- New `app/api/*` routes may need proxy rules — note in AGENTS.md when relevant

## Styling

- Design tokens from `globals.css` / theme variables
- Tailwind: enable `prettier-plugin-tailwindcss` when used

## Admin / data tables

- TanStack Table: colocate `column-definitions` and cell renderers with the table component
