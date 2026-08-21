# Code conventions

Universal TypeScript/JavaScript conventions for Node.js projects. Enforce via ESLint (including unicorn), Biome, AGENTS.md, and code review — not as drive-by refactors on existing code.

## Language

- **Code comments:** English (even when the user chats in another language)
- **User-facing copy:** i18n message files when the app supports i18n — no hardcoded UI strings as the only source
- **Identifiers:** English (variables, functions, files)

## Files and naming

- **Filenames:** kebab-case (`user-profile.service.ts`, `product-card.tsx`) — enforce with `unicorn/filename-case` when using ESLint
- **One component per file** in UI folders (`features/**/components/`, `shared/components/`, `components/`)
- **Colocated folders:** when a component has sub-components, use `components/card/card-footer.tsx` — prefix with folder name for unambiguous search
- **Constants/utilities:** not inside `components/` — use `constants/`, `utilities/`, or `lib/`

## Imports

- Imports at the top of the file — no inline imports unless a circular dependency is documented
- Sorted imports via `simple-import-sort` (ESLint) or Biome equivalent
- Prefer `import type` for type-only imports
- **Feature isolation:** `features/` modules do not import sibling features — shared code lives in `shared/`

## TypeScript

- No `I`-prefixed interfaces (`User` not `IUser`)
- Avoid `any` — use `unknown` or proper types
- Unused vars: prefix with `_` if intentionally unused
- Prefer `strict` compiler options when the project allows — see [complementary-practices.md](complementary-practices.md)
- Exhaustive `switch` on discriminated unions — `default` assigns to `never` so new variants fail at compile time

## Barrel exports

- Feature-level `index.ts` as public API is fine
- Avoid deep barrel chains that re-export entire subtrees (hurts tree-shaking in Vite/Webpack) — import directly for heavy modules

## Frontend UI patterns

Shared UI rules for React, Next.js, Vite + React, Expo, and SvelteKit. Full guide: [ui-composition.md](ui-composition.md).

- **Composition over configuration** — assemble screens from small components; avoid boolean prop matrices (`isAdmin`, `showFooter`, …)
- **Thin route files** — routes/pages/screens compose feature components; minimal logic in the shell
- **Compound components** when a block has shared state and optional sections (dialog, card, menu) — prefer named subcomponents or slots over `renderX` props
- **Layout shells stay dumb** — providers and structure in root layout / `App.tsx`; domain logic in features
- Schemas in dedicated files (e.g. `schemas/*.schema.ts` with Zod) — not inline in components
- Types shared across files: `types/*.types.ts`
- Reuse existing UI primitives before creating new ones
- Theme tokens from design system / CSS variables — avoid arbitrary colors

## Quality bar

After every change:

- No linter errors from the project's CLI (`pnpm lint` / Biome / Oxlint)
- No IDE static-analysis issues when the developer uses SonarLint or equivalent — optional, not required for every editor
- SOLID, DRY, KISS — match existing patterns over new abstractions

## NestJS-specific

- Module per domain: `*.module.ts`, `*.controller.ts`, `*.service.ts`
- DTOs in `dto/` with barrel `index.ts` when the project uses barrels
- Spec files colocated: `*.spec.ts`

## Testing

- Unit tests colocated or in `test/` per framework convention
- E2E in `test/` (Nest) or `e2e/` (frontend) — match existing layout
