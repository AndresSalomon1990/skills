---
name: standardize-nodejs-project
description: >-
  Applies dev tooling, formatting, lint rules, git hooks, optional editor workspace
  settings, and AGENTS.md conventions to an already bootstrapped Node.js/TypeScript project
  (NestJS, Next.js, SvelteKit, Vite+React, Expo/React Native). Use when the user
  asks to standardize, harden, configure tooling, set up ESLint/Prettier/Husky,
  improve project structure, or add AGENTS.md after nest new, create-next-app,
  npm create vite, sv create, or create-expo-app — not when bootstrapping from scratch.
disable-model-invocation: true
---

# Standardize Node.js Project

Apply a consistent **development workspace** to a project that already exists. This skill does **not** scaffold apps — use the official CLI first (`nest new`, `create-next-app`, `npm create vite@latest`, `sv create`, `create-expo-app`, etc.), then run this workflow.

## Prerequisites

Confirm before starting:

1. The project is bootstrapped and installs cleanly (`npm/pnpm/yarn install` succeeds).
2. You know the **framework** (nestjs | nextjs | sveltekit | expo | vite-react | other).
3. You know the **package manager** (detect from lockfile; ask once if ambiguous).
4. You know the **lint/format stack** (eslint | biome | oxlint — see [references/linter-stacks.md](references/linter-stacks.md)).
5. **Optional:** which **editors** the team uses (Cursor, VS Code, Zed, Claude Code, etc.) — see [references/editor-tooling.md](references/editor-tooling.md). If skipped, default to hooks + `.editorconfig` + `.vscode/` for broad compatibility.

If any of these are unclear, ask once. Do not re-run framework CLIs.

## Workflow

Copy this checklist and track progress:

```
Standardization Progress:
- [ ] Phase 0: Audit existing config (skip what already matches)
- [ ] Phase 1: Shared tooling (.editorconfig, format/lint, Husky)
- [ ] Phase 2: Editor tooling (hooks/scripts first; optional `.vscode/` or `.zed/`)
- [ ] Phase 3: Architecture + folder conventions (framework-specific)
- [ ] Phase 4: AGENTS.md (project context for agents)
- [ ] Phase 5: Verify (lint, format, hooks)
```

### Phase 0: Audit

Read existing config before writing files:

- `.editorconfig`, `.prettierrc*` / `prettier.config.*` / `biome.json`
- `eslint.config.*`, oxlint config, existing lint scripts
- `.husky/*`, `lint-staged` in `package.json`
- `.vscode/settings.json`, `.zed/settings.json` (if present), `AGENTS.md`, `.env.example`, `.gitignore`
- Framework layout (`src/modules/` Nest, `app/` Next, `src/routes/` SvelteKit, `src/features/` Vite+React, `features/` Expo)

**Adapt, don't overwrite blindly.** Merge with existing rules; skip steps the project already satisfies. Note deltas for the user.

Read [references/security.md](references/security.md) before creating or committing any file.

### Phase 1: Shared tooling

Apply the stack documented in [references/tooling.md](references/tooling.md) and [references/linter-stacks.md](references/linter-stacks.md):

| File / area | Purpose |
|-------------|---------|
| `.editorconfig` | LF, final newline, 2-space indent for JS/TS |
| Formatter | Prettier, Biome, or Oxfmt — one formatter only |
| Linter | ESLint + unicorn (default), or keep Biome/Oxlint |
| Husky | `pre-commit` → lint-staged; optional Commitizen hook |
| `lint-staged` | Format + lint fix on staged files |
| Commitizen | Optional `pnpm cm` / `npm run cm` for conventional commits |
| `.env.example` | Document env var names without secrets |

**ESLint path:** include `eslint-plugin-unicorn` per [references/unicorn-rules.md](references/unicorn-rules.md).

Detect package manager from lockfile and use it consistently in scripts and Husky hooks. Add `"prepare": "husky"` if missing.

Optional pre-commit additions (ask user if tests/typecheck are fast enough):

- `typecheck` or framework check (`tsc --noEmit`, `svelte-check`, etc.)
- `test` — unit tests only, not slow e2e

### Phase 2: Editor tooling

**Mandatory:** scripts + Husky already configured in Phase 1 — that is the cross-editor baseline.

**Optional workspace files:** follow [references/editor-tooling.md](references/editor-tooling.md):

1. Ask which editors the team uses (or infer from existing `.vscode/`, `.zed/`, `.cursor/`).
2. Commit **only** config that matches:
   - **VS Code / Cursor / most AI forks** → `.vscode/settings.json` + `extensions.json`
   - **Zed-primary** → `.editorconfig` + hooks; add `.zed/settings.json` only if requested
   - **Claude Code / terminal-only** → skip editor JSON; document `pnpm lint:fix` in AGENTS.md
3. SonarLint: recommend for VS Code/JetBrains users; suggest CI SAST otherwise.

Do not block standardization on format-on-save — many agents and editors never use it.

### Phase 3: Architecture (framework-specific)

Read **one** reference based on detected framework:

| Framework | Reference |
|-----------|-----------|
| NestJS | [references/architecture-nestjs.md](references/architecture-nestjs.md) |
| Next.js | [references/architecture-nextjs.md](references/architecture-nextjs.md) |
| SvelteKit | [references/architecture-sveltekit.md](references/architecture-sveltekit.md) |
| Vite + React (SPA) | [references/architecture-vite-react.md](references/architecture-vite-react.md) |
| Expo / React Native | [references/architecture-expo.md](references/architecture-expo.md) |

Shared conventions: [references/code-conventions.md](references/code-conventions.md).

Optional enhancements (performance, security, strict TS, ecosystem skills): [references/complementary-practices.md](references/complementary-practices.md) — suggest during Phase 4/5, do not force.

Do not restructure working code unless the user asked — document the target layout in AGENTS.md and apply incrementally to new files.

### Phase 4: AGENTS.md

Create or extend `AGENTS.md` at the project root using [references/agents-md.md](references/agents-md.md).

Include:

- Stack + key commands (`dev`, `lint`, `test`, `cm`)
- Where code lives (features vs shared, modules vs controllers)
- Non-negotiable rules (English comments, one component per file, feature isolation)
- Fast-context table (paths agents should read first)
- Optional **Team learnings** section (newest-first, living document — redact secrets)

Keep AGENTS.md concise; link to `docs/` for long guides. Write for agents: short pointers, not essays ([Agent Skills spec](https://agentskills.io/)).

### Phase 5: Verify

Run and fix until clean:

```bash
pnpm install
pnpm lint        # or the project's lint script
pnpm lint-staged # optional manual smoke test
```

Stage a trivial change and confirm the pre-commit hook runs.

Report to the user:

- What was added vs skipped (already present)
- Linter stack chosen and any unicorn/Biome/Oxlint tradeoffs
- Framework-specific choices made
- Editor files added vs skipped (and why)
- Recommended next steps (CI lint/build, complementary practices)

## Variables to adapt per project

| Variable | Options | Default when unknown |
|----------|---------|----------------------|
| Package manager | pnpm, npm, yarn, bun | Detect from lockfile |
| Lint stack | eslint, biome, oxlint | Detect from config files |
| Node engine | `>=20`, `>=22`, `>=24` | Match framework LTS docs |
| Commitizen adapter | `cz-conventional-changelog`, `cz-git` | `cz-conventional-changelog` |
| Tailwind | yes / no | Add tailwind Prettier plugin only if Tailwind is present |
| Monorepo | yes / no | Per-package config + root AGENTS.md workspace map |
| i18n | next-intl, paraglide, none | Document message file paths in AGENTS.md |

## Anti-patterns

- Do **not** run `create-next-app`, `nest new`, etc. inside this workflow.
- Do **not** stack ESLint + Biome (or Prettier + Oxfmt) without migrating intentionally.
- Do **not** add strict type-checked ESLint to a JS-only template without TypeScript.
- Do **not** commit secrets, real `.env` values, or internal URLs — see [references/security.md](references/security.md).
- Do **not** disable unicorn or naming rules project-wide to greenwash a first lint run — fix incrementally or narrow overrides by path.

## Additional resources

- Tooling: [references/tooling.md](references/tooling.md)
- Linter stacks: [references/linter-stacks.md](references/linter-stacks.md)
- ESLint base: [references/eslint.md](references/eslint.md)
- Unicorn rules: [references/unicorn-rules.md](references/unicorn-rules.md)
- Editor tooling: [references/editor-tooling.md](references/editor-tooling.md)
- Security: [references/security.md](references/security.md)
- Code conventions: [references/code-conventions.md](references/code-conventions.md)
- AGENTS.md template: [references/agents-md.md](references/agents-md.md)
- Complementary practices: [references/complementary-practices.md](references/complementary-practices.md)
