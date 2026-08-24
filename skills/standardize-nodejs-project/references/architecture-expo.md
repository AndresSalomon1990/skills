# Expo / React Native architecture

Expo Router with feature-based slices.

## Standard layout

```text
app/                    # Expo Router — thin layouts, auth gating
features/
  {domain}/
    screens/
    components/
    services/
    hooks/
    schemas/
    types/
    store/
    constants/
    utilities/
shared/
  lib/                  # api client, routes, theme
  components/ui/
  hooks/
assets/
plugins/                # config plugins — document in AGENTS.md
```

## Routing

- **`app/**/*.tsx` stays thin** — layouts and navigation; business logic in `features/**/screens/`
- Centralize API path constants in one module (e.g. `shared/lib/api-routes.ts`)

## Feature rules

- One component per file under `features/**/components/`
- Sub-components in named folders with prefixed filenames
- Constants/utilities outside `components/`
- **No cross-feature imports** — use `shared/`

## UI composition

See [ui-composition.md](ui-composition.md). React Native / Expo:

- **`app/**/*.tsx` and layouts** compose screens from `features/**/screens/` — navigation shell only in `app/`
- **Screens compose components** via `children` and small layout wrappers (`Screen`, `ScrollContainer`) — same rules as web React
- **Compound components** for repeated mobile patterns (bottom sheet sections, list row + trailing action) — subcomponents in a colocated folder
- Platform-specific branches stay in leaf components, not in screen composition roots

## Testing

See [testing.md](testing.md). Expo / React Native:

- Unit tests: `features/{name}/tests/` or colocated `*.test.tsx`
- Prefer Jest or Vitest for logic; Detox/Maestro for native e2e when needed
- Keep e2e out of `features/**/components/` — dedicated `e2e/` or platform test folder

## Environment

- Document `EXPO_PUBLIC_*` (or equivalent) in `.env.example` and AGENTS.md — names only

## Tooling specifics

- ESLint: `eslint-config-expo` + shared plugins + unicorn
- Prettier + Tailwind plugin when using NativeWind or similar
- Set `packageManager` in `package.json` when using pnpm

## Team learnings

Mobile projects benefit from a **Team learnings** section in AGENTS.md (platform bugs, SDK upgrades, keyboard issues) — newest-first, redact secrets and customer data.

## Native modules

Document config plugins and rebuild requirements in AGENTS.md when adding native dependencies.

## Ecosystem skills (after standardization)

Install official **`expo/skills`** from [docs.expo.dev/skills](https://docs.expo.dev/skills/) — see [complementary-practices.md](complementary-practices.md).
