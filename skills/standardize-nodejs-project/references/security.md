# Security — applying this skill safely

Rules for agents and humans standardizing any public or private repo.

## Never commit

- `.env`, `.env.local`, credentials, API keys, tokens, private keys
- `*.pem`, `*.p12`, service account JSON, connection strings with passwords
- Real user data, production URLs with secrets in query strings
- Internal hostnames, VPN endpoints, or employee emails unless the user explicitly wants them in docs

## Always use templates

- Commit **`.env.example`** with placeholder values and comments describing each variable
- Ensure `.gitignore` includes: `.env`, `.env.*`, `!.env.example`, `node_modules/`, `dist/`, `.DS_Store`
- Document required env vars in AGENTS.md (names only, not values)

## Before writing config files

- Do not embed license keys, SonarQube tokens, or npm tokens in `.vscode/settings.json`, `.zed/settings.json`, or CI YAML
- Do not add `postman.settings` or IDE settings that reference local secret paths
- Review Husky hooks — they must not echo secrets or send data externally

## SonarLint / SAST

- **SonarLint** — optional IDE extension (VS Code, JetBrains). Not required for Zed, Claude Code, or terminal-only workflows.
- **CI SAST** — SonarCloud, GitHub code scanning, or strict ESLint in CI as editor-agnostic alternative
- Connected mode (SonarCloud/SonarQube) is optional; never hardcode server tokens in the repo

## AGENTS.md content

- Describe architecture and commands, not production infrastructure secrets
- **Team learnings** may reference file paths and error messages — redact customer data and credentials
- Monorepo maps: folder names only, not deploy credentials

## If secrets were exposed

Stop and tell the user:

1. Rotate the exposed credential immediately
2. Remove from git history if committed (user decides on `git filter-repo` / BFG)
3. Do not proceed with standardization until resolved

## Client env vars (Vite, Next, Expo)

- Browser-exposed vars use framework prefixes only: `VITE_`, `NEXT_PUBLIC_`, `EXPO_PUBLIC_`
- Never put API secrets, private keys, or DB URLs in client-prefixed variables
- Document allowed public vars in `.env.example` with placeholder values

## Dependency and supply chain

- Commit lockfiles; CI should use frozen installs
- Run `npm audit` / `pnpm audit` periodically; fix or document accepted risks
- Enable GitHub Dependabot or Renovate on public repos when practical

## skills.sh / public repos

This skill is designed for publication. All reference content must be:

- Generic (no client names, no private repo paths)
- Free of proprietary URLs or internal tooling identifiers
- MIT-compatible — no copied license-incompatible config blobs from third parties

More security hardening options: [complementary-practices.md](complementary-practices.md).
