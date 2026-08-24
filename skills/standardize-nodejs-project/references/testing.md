# Testing organization

Separate **test kinds**, **folders**, and **scripts** so unit, component, integration, and e2e tests do not mix. Pick one layout pattern per project and document it in AGENTS.md — do not mix colocated and module-scoped `tests/` folders without a documented reason.

## Test kinds

| Kind | What it tests | Typical runner | Keep separate from |
|------|---------------|----------------|--------------------|
| **Unit** | Pure functions, services, utilities, domain logic | Vitest/Jest (Node) | UI and HTTP |
| **Component** | Components in isolation (Svelte, React) | Vitest browser, Testing Library | Route handlers |
| **Integration** | API routes, DB, multi-module flows | Vitest/Jest (Node) | Full browser e2e |
| **E2E** | Full user flows across the app | Playwright, Cypress | Unit/component suites |

Use different directories and npm scripts for each kind. Run unit tests on every PR; run e2e in CI on a separate job when slower.

## Naming

- **One suffix per project:** `*.test.ts` **or** `*.spec.ts` — not both. Document the choice in AGENTS.md.
  - Frontend / Vitest projects often standardize on `*.test.ts`
  - NestJS convention is `*.spec.ts` for unit tests and `*.e2e-spec.ts` for e2e
- **File names mirror the unit under test:** `money.ts` → `money.test.ts`, `parse-movement-draft.ts` → `parse-movement-draft.test.ts`
- **Component tests:** `*.svelte.test.ts` or `*.test.tsx` so the runner can route them to a browser project

## Layout patterns

### Pattern A — module-scoped `tests/` folders (recommended for feature-sliced apps)

Keep unit tests **out of source folders**. Each feature, module, or server area owns a sibling `tests/` directory:

```text
src/lib/
  shared/
    utilities/
    tests/                    # shared unit tests
  features/
    {feature}/
      components/
      utilities/
      tests/                  # feature unit tests
  server/
    {area}/
      services/
      tests/                  # server-only unit tests
e2e/                          # Playwright — never inside src/lib
```

Rules:

- Place `tests/` at the same depth as the code it covers (`features/matrix/tests/`, not a single global `src/tests/`)
- Import the unit under test with relative paths (`../utilities/foo`) or project aliases (`$lib/`, `@/`)
- Split large domains by layer when needed: `services/tests/`, `tools/tests/`, `seeds/tests/` — do not dump unrelated tests into one folder
- Document in the area's module doc or `docs/architecture.md`: *"unit tests live in `tests/` — kept out of source folders"*

### Pattern B — colocated tests (common in React and Nest)

```text
features/cart/
  cart.service.ts
  cart.service.test.ts
test/
  app.e2e-spec.ts             # Nest e2e at project root
e2e/
  checkout.spec.ts              # Playwright at project root
```

Use when the team prefers tests beside implementation. Still keep **e2e** and **integration** in dedicated top-level folders.

**Pick A or B for unit tests — do not mix both in the same module.**

## SvelteKit + Vitest

Typical dual-project setup in `vite.config.ts`:

| Project | Includes | Environment |
|---------|----------|-------------|
| `server` | `src/**/*.{test,spec}.{js,ts}` excluding `*.svelte.*` | `node` |
| `client` | `src/**/*.svelte.{test,spec}.{js,ts}` | browser (e.g. Playwright provider) |

Recommended Vitest options to document:

- `expect: { requireAssertions: true }` — every test must assert
- `test:unit` — watch mode (`vitest`)
- `test` — CI single run (`vitest --run`)

Component browser tests may be zero at first — configure the client project anyway so the convention is ready.

## React / Next.js / Expo

- **Unit + hooks:** colocated `*.test.tsx` or `features/{name}/tests/` — match Pattern A or B project-wide
- **Component tests:** Testing Library + Vitest/Jest; keep under the feature or in `tests/`
- **E2E:** `e2e/` at repo root (Playwright for Next/Vite; Detox/Maestro for Expo when applicable) — separate `test:e2e` script
- **Route handlers / API:** integration tests in `tests/integration/` or feature `tests/` — not in e2e unless testing the full stack

## NestJS

- Unit tests: colocated `*.spec.ts` next to `*.service.ts` / `*.controller.ts` (Nest default)
- E2E: `test/*.e2e-spec.ts` with dedicated tsconfig — see [architecture-nestjs.md](architecture-nestjs.md)
- Do not put e2e specs inside `src/modules/`

## Scripts and CI

Document in AGENTS.md:

| Script | Purpose |
|--------|---------|
| `test:unit` | Fast unit tests (watch in dev) |
| `test` | Full unit run for CI (`--run`) |
| `test:e2e` | E2E only — separate CI job when slow |
| `test:integration` | Optional — when integration suite exists |

- Add `test` to Husky pre-commit **only** if the unit suite is fast (< few seconds)
- Always run `test` (unit) in CI; run e2e on PR or main per team tolerance
- ESLint: separate override for test paths — see [eslint.md](eslint.md)

## AGENTS.md

Include:

- Test runner (Vitest, Jest, Playwright)
- Layout pattern (A or B) and suffix (`*.test.ts` vs `*.spec.ts`)
- Commands table (`test`, `test:unit`, `test:e2e`)
- Where to add a new test when touching `features/foo/` or `server/bar/`

## Anti-patterns

- Unit tests scattered in `routes/`, `components/`, or next to every file when the project chose Pattern A
- E2E specs inside `src/lib/` or feature folders
- One mega `tests/` folder at repo root for a feature-sliced app — loses module boundaries
- Mixing `*.test.ts` and `*.spec.ts` without framework reason
- Slow e2e in pre-commit hooks
