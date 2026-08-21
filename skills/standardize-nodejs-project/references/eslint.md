# ESLint flat config

Use ESLint 9+ flat config (`eslint.config.mjs` or `eslint.config.js` with `"type": "module"`).

For Biome or Oxlint projects, see [linter-stacks.md](linter-stacks.md) instead of adding ESLint.

## Shared plugins and rules

| Plugin | Purpose |
|--------|---------|
| `typescript-eslint` | TS parsing and recommended rules |
| `eslint-plugin-import` + `eslint-import-resolver-typescript` | Import resolution |
| `eslint-plugin-simple-import-sort` | Sorted imports/exports |
| `eslint-plugin-unused-imports` | Remove unused imports |
| `eslint-plugin-unicorn` | Filename kebab-case, modern JS — see [unicorn-rules.md](unicorn-rules.md) |
| `eslint-config-prettier` | Disable conflicting formatting rules |

### Core rules (enable consistently)

- Import sort + unused imports (see above)
- `@typescript-eslint/consistent-type-imports`: error
- `@typescript-eslint/no-shadow`: error (turn off base `no-shadow`)
- `no-console`: error (allow `console.warn/error` in scripts via override)
- `eqeqeq`: always
- `curly`: all
- `max-len`: 100 code, 120 comments (ignore URLs, className/Tailwind patterns)
- Full unicorn set: [unicorn-rules.md](unicorn-rules.md)

### Ignores (baseline)

```
.git/
node_modules/
dist/
build/
coverage/
.next/
.svelte-kit/
*.min.js
eslint.config.mjs
```

## NestJS

- Globals: `globals.node`, `globals.jest`
- `sourceType`: match project (commonjs or module)
- Type-checked: `tseslint.configs.recommendedTypeChecked` with `projectService: true`
- Separate override for `test/**/*.ts`
- `prettier/prettier`: off when Prettier runs via lint-staged

## Next.js

- Merge `@next/eslint-plugin-next` for App Router projects
- `react/react-in-jsx-scope`: off
- Globals: browser + node for API routes

## SvelteKit

- `eslint-plugin-svelte` recommended + prettier configs
- Parser: `extraFileExtensions: ['.svelte']`, `projectService: true`
- `import/no-unresolved`: ignore framework aliases (`$app`, `$lib`, `$env`)
- `no-undef`: off

## Vite + React (SPA)

- `eslint-plugin-react` flat recommended + `jsx-runtime`
- `eslint-plugin-react-hooks` (`recommended-latest`)
- `eslint-plugin-react-refresh` — `reactRefresh.configs.vite` for HMR boundaries
- `@tanstack/eslint-plugin-query` when using React Query
- Globals: `globals.browser` + `globals.node` (Vite config runs in Node)
- Optional: `@eslint/css` for CSS modules / Tailwind v4 CSS files
- Path alias `@/` — configure `eslint-import-resolver-typescript` to match `tsconfig`

## Expo / React Native

- Extend `eslint-config-expo`, layer shared plugins + unicorn
- Filename ignores: `metro.config.js`, `nativewind-env.d.ts`, `babel.config.js`

## Verification

```bash
pnpm eslint . --max-warnings 0
```

Fix incrementally — path-scoped overrides over global disables.
