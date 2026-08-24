# Shared tooling templates

Adapt paths and package manager commands to the target project. See [linter-stacks.md](linter-stacks.md) if the project does not use ESLint + Prettier.

## .editorconfig

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true

[*.{js,ts,jsx,tsx,mjs,cjs,svelte}]
charset = utf-8
indent_style = space
indent_size = 2

[{package.json,*.yml,*.yaml}]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab
```

## Prettier (ESLint stack)

`.prettierrc`:

```json
{
  "trailingComma": "es5",
  "semi": false,
  "singleQuote": true,
  "useTabs": false,
  "quoteProps": "consistent",
  "bracketSpacing": true,
  "arrowParens": "always",
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "auto"
}
```

**Tailwind:** add `prettier-plugin-tailwindcss` when Tailwind is present.

**SvelteKit:** use `prettier.config.js` with `prettier-plugin-svelte` + optional Tailwind plugin and a `*.svelte` override.

`.prettierignore`:

```
node_modules
dist
build
coverage
.next
.svelte-kit
```

## .env.example

Template only — no real secrets:

```bash
# API
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
API_PORT=3000

# Public (frontend)
# NEXT_PUBLIC_* / VITE_* / EXPO_PUBLIC_* as needed
```

Ensure `.gitignore` excludes `.env` and `.env.local` but not `.env.example`.

## package.json scripts

Add or merge:

```json
{
  "scripts": {
    "prepare": "husky",
    "lint-staged": "lint-staged",
    "format": "prettier --write .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix --no-warn-ignored",
    "typecheck": "tsc --noEmit",
    "cm": "cz"
  }
}
```

Framework-specific lint scripts may replace generic `eslint .` (e.g. `next lint`, `expo lint`, `svelte-check`).

## lint-staged

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,svelte}": [
      "prettier --write",
      "eslint --fix --no-warn-ignored"
    ],
    "*.{json,md,yml,yaml,css}": [
      "prettier --write"
    ]
  }
}
```

Biome equivalent: `"*": "biome check --write --no-errors-on-unmatched"`

## Husky hooks

`.husky/pre-commit`:

```sh
pnpm lint-staged
# optional, if scripts exist and are fast:
# pnpm typecheck
# pnpm test
```

`.husky/prepare-commit-msg` (optional — Commitizen):

```sh
exec < /dev/tty && npx cz --hook || true
```

## Commitizen (optional)

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

Alternative: `cz-git` for interactive scopes in larger teams.

## Dev dependencies (ESLint stack)

```
eslint @eslint/js typescript-eslint eslint-config-prettier
eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-unused-imports
eslint-plugin-unicorn globals
prettier husky lint-staged
eslint-import-resolver-typescript
```

Optional: `commitizen`, `cz-conventional-changelog`, framework ESLint plugins.

See [unicorn-rules.md](unicorn-rules.md) for unicorn configuration.

## engines

Set when missing — prefer **Node 24+** when the framework supports it; otherwise match framework LTS:

```json
{
  "engines": {
    "node": ">=24.0.0"
  }
}
```
