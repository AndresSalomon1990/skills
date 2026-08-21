# Linter and formatter stacks

This skill defaults to **ESLint 9 (flat config) + Prettier + eslint-plugin-unicorn**. Adapt when the project already chose a different stack.

## Detect before installing

| Signal | Stack |
|--------|-------|
| `biome.json` or `@biomejs/biome` in package.json | Biome |
| `oxlint.json` / `.oxlintrc.json` or `oxlint` in scripts | Oxlint |
| `oxfmt` in scripts or devDependencies | Oxfmt |
| `eslint.config.*` only | ESLint (this skill's default path) |

Ask once if multiple stacks appear: *"The repo already uses X. Keep X and align conventions, or migrate to ESLint + Prettier?"*

## ESLint + Prettier + unicorn (default)

Best when:

- No linter is configured yet
- Team wants unicorn filename rules and import-sort plugins
- Framework docs assume ESLint (Next.js, SvelteKit, Expo)

Follow [eslint.md](eslint.md) and [unicorn-rules.md](unicorn-rules.md).

## Biome

Biome bundles lint + format. **Do not add ESLint + Prettier on top** unless migrating.

Instead:

1. Keep Biome as the single tool
2. Align **Prettier-equivalent** options in `biome.json` with [tooling.md](tooling.md) (single quotes, no semis, 100 width if team prefers)
3. Map conventions from [code-conventions.md](code-conventions.md) and [unicorn-rules.md](unicorn-rules.md) to Biome rules where equivalents exist:
   - `useFilenamingConvention` → kebab-case
   - `noConsole` → restrict console
   - `useImportType` → type imports
4. Husky + lint-staged: run `biome check --write` on staged files
5. VS Code-compatible editors: see [editor-tooling.md](editor-tooling.md). Biome-only teams on Zed may skip `.vscode/` entirely.

## Oxlint + Oxfmt

Oxlint is fast; Oxfmt handles formatting. **Do not layer ESLint** without explicit migration.

1. Configure oxlint rules closest to this skill's conventions
2. Use oxfmt for format-on-save if adopted
3. Husky: `oxlint` + `oxfmt` (or project scripts) on staged paths
4. Document in AGENTS.md which commands to run (`pnpm lint`, etc.)

Unicorn-specific rules may not have 1:1 oxlint equivalents — enforce filename kebab-case via AGENTS.md + code review until a rule exists.

## Partial overlap (avoid)

| Anti-pattern | Why |
|--------------|-----|
| ESLint + Biome both linting | Duplicate diagnostics, slow CI |
| Prettier + Oxfmt both formatting | Conflicting output |
| unicorn + Biome naming rules without tuning | Duplicate filename errors |

## Husky regardless of stack

Git hooks are stack-agnostic. Always consider:

- **lint-staged** — format/lint staged files only
- **optional** `typecheck` script in pre-commit (fast `tsc --noEmit` or framework check)
- **optional** `test` — only if unit tests are fast; skip for slow e2e suites

Adapt hook commands to the active stack: staged format/lint first, then optional full typecheck/test if fast enough.
