# eslint-plugin-unicorn

Recommended rules for TypeScript Node.js projects using **ESLint**. Unicorn enforces modern JavaScript patterns and consistent file naming.

If the project uses **Biome**, **Oxlint**, or **Oxfmt** instead of ESLint, see [linter-stacks.md](linter-stacks.md) — do not install ESLint + unicorn on top without the user's consent.

## Setup

```bash
# with detected package manager
pnpm add -D eslint-plugin-unicorn
```

In flat config:

```js
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

export default [
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      // overrides below
    },
  },
]
```

## Recommended rules (enable)

| Rule | Purpose |
|------|---------|
| `unicorn/filename-case` | kebab-case files; ignore framework config names |
| `unicorn/prefer-module` | ESM over CommonJS where project is ESM |
| `unicorn/prefer-node-protocol` | `node:fs` imports |
| `unicorn/no-await-expression-member` | Avoid `(await foo).bar` |
| `unicorn/no-for-loop` | Prefer iterators / functional patterns |
| `unicorn/no-instanceof-array` | Use `Array.isArray()` |
| `unicorn/prefer-number-properties` | `Number.isNaN` over global |

### filename-case ignore list

Framework and tooling files often need exceptions:

```js
'unicorn/filename-case': [
  'error',
  {
    case: 'kebabCase',
    ignore: [
      'babel.config.js',
      'metro.config.js',
      'tailwind.config.js',
      'nativewind-env.d.ts',
      'global.d.ts',
      'vite.config.ts',
      'svelte.config.js',
    ],
  },
],
```

Add project-specific ignores only when required — do not disable the rule globally.

## Recommended overrides (turn off)

| Rule | Why |
|------|-----|
| `unicorn/no-null` | `null` is idiomatic in TS/React/API boundaries |
| `unicorn/prevent-abbreviations` | Too noisy for domain abbreviations (e.g. `params`, `ctx`) |
| `unicorn/no-top-level-assignment-in-function` | Conflicts with some framework patterns |
| `unicorn/no-empty-file` | Allow intentional barrel/index files (override per path) |

## Per-path overrides

Use sparingly for generated or third-party-adjacent code:

```js
{
  files: ['src/lib/generated/**'],
  rules: {
    'unicorn/filename-case': 'off',
  },
},
```

## Style rules that pair with unicorn

These live outside unicorn but align with the same conventions:

- `@typescript-eslint/naming-convention` — camelCase vars, PascalCase types, no `I` prefix on interfaces
- `@typescript-eslint/consistent-type-imports` — `import type`
- `max-len` — 100 code / 120 comments
- `no-console` — error (override to allow `warn`/`error` in scripts if needed)

## Verification

After adding unicorn:

```bash
pnpm eslint . --max-warnings 0
```

Fix violations incrementally. Prefer renaming files to kebab-case over disabling `filename-case`.
