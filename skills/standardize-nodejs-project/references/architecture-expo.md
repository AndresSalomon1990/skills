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
