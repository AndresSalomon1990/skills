# Editor and IDE tooling

Formatting and linting must work **without** any specific editor. Editor config is optional team convenience — not a requirement for the skill to succeed.

## Source of truth (every editor)

These work in Cursor, VS Code, Claude Code, Zed, OpenCode, Antigravity, terminal-only workflows, and CI:

| Mechanism | Purpose |
|-----------|---------|
| `.editorconfig` | Indent, charset, final newline — [tooling.md](tooling.md) |
| `package.json` scripts | `lint`, `lint:fix`, `format`, `typecheck` |
| Husky + lint-staged | Format/lint **staged** files on commit |
| CI | Full `lint` + `build` on every PR |

Document the commands in `AGENTS.md`:

```markdown
## Quality commands (run before pushing)

| Command | When |
|---------|------|
| `pnpm lint` | Check lint + format |
| `pnpm lint:fix` | Auto-fix locally |
| `pnpm format` | Prettier/Biome format all |
```

**Agents and CLI-only users** rely on these + hooks. Never assume format-on-save exists.

---

## Phase 2 decision flow

Ask once if not obvious from the repo:

> Which editors does the team use? (pick any)

Use answers to decide **what to commit**:

| Answer | Commit to repo | Skip |
|--------|----------------|------|
| VS Code and/or **Cursor** | `.vscode/settings.json`, `.vscode/extensions.json` | — |
| **Zed** only (or Zed-primary) | `.editorconfig` + hooks; optional `.zed/settings.json` | `.vscode/` unless someone on the team needs it |
| **Claude Code**, **OpenCode**, terminal agents | `AGENTS.md` / `CLAUDE.md` only | `.vscode/` unless mixed team |
| **JetBrains** (WebStorm, IDEA) | `.editorconfig` + hooks | `.vscode/` |
| Mixed / unknown | `.editorconfig` + hooks + `.vscode/` (widest compatibility) | — |

**Default when user does not care:** commit `.vscode/` (Cursor and most AI IDEs read it) **and** ensure hooks/scripts are solid.

**Default when user says "I use Cursor" or "no VS Code":** still offer `.vscode/` — Cursor is VS Code-compatible for workspace settings. Add note in AGENTS.md that Zed/JetBrains users run `pnpm lint:fix` manually.

---

## Editor landscape (quick reference)

| Editor | VS Code settings | Own project config | Agent context file |
|--------|------------------|--------------------|--------------------|
| VS Code | Yes | — | `AGENTS.md`, Copilot instructions |
| **Cursor** | Yes (reads `.vscode/`) | `.cursor/rules/` | `AGENTS.md` |
| Windsurf, Antigravity | Often yes (forks) | varies | `AGENTS.md` / vendor rules |
| **Zed** | No | `.zed/settings.json` | `AGENTS.md` |
| **Claude Code** | No | — | `CLAUDE.md`, `AGENTS.md` |
| **OpenCode** | Sometimes | `.opencode/` | `AGENTS.md`, skills |
| JetBrains | No | IDE settings local | — |

Do not maintain config for every editor in one repo unless the team asks. **One** VS Code-compatible block + `.editorconfig` covers most Node teams with AI assistants.

---

## VS Code-compatible editors (`.vscode/`)

For **VS Code, Cursor, Windsurf, Antigravity**, and other forks that honor workspace settings.

**Never** commit tokens or local secret paths in these files.

### Recommended extensions (`.vscode/extensions.json`)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "SonarSource.sonarlint-vscode"
  ]
}
```

Stack-specific:

| Stack | Extension |
|-------|-----------|
| SvelteKit | `svelte.svelte-vscode` |
| Tailwind | `bradlc.vscode-tailwindcss` |
| Biome | `biomejs.biome` |

Tell the user to accept workspace extension recommendations — the agent cannot install extensions.

### Prettier as formatter (typical frontend)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[svelte]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "eslint.enable": true,
  "eslint.format.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### ESLint as formatter (backend-only APIs)

```json
{
  "eslint.enable": true,
  "eslint.format.enable": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  }
}
```

Pick **one** formatter strategy per repo.

### Biome stack

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit"
  },
  "eslint.enable": false
}
```

---

## Cursor-specific (optional)

Cursor reads `.vscode/settings.json` for format-on-save. Additional agent behavior belongs in **`.cursor/rules/`** (or project rules in Cursor settings) — not duplicated in `.vscode/`.

- Do **not** put secrets in `.cursor/` rules
- Prefer linking to `AGENTS.md` from a short rule: "Follow AGENTS.md for layout and lint commands"
- Cursor skills from `npx skills add` install separately — out of scope for this phase

---

## Zed (optional)

Zed does **not** read `.vscode/settings.json`. If the team is Zed-only:

1. Rely on `.editorconfig` + Husky + `pnpm lint:fix`
2. Optionally add [`.zed/settings.json`](https://zed.dev/docs/configuring-zed#settings-files) for format-on-save, for example:

```json
{
  "format_on_save": "on",
  "formatter": "prettier",
  "languages": {
    "TypeScript": {
      "format_on_save": "on",
      "formatter": "prettier"
    }
  }
}
```

Exact keys vary by Zed version — verify against current Zed docs. Prettier must be available via project `node_modules` or PATH.

Do not add `.zed/` unless a Zed user on the team requests it.

---

## Claude Code, OpenCode, and terminal-first agents

No editor JSON required. Ensure:

- `AGENTS.md` lists lint/format commands and architecture rules
- Husky catches commits from any tool
- Optional `CLAUDE.md` symlinks or duplicates a pointer to `AGENTS.md` if the project uses Claude Code conventions

Format-on-save is irrelevant — agents should run `pnpm lint:fix` (or project equivalent) before finishing a task. State this in AGENTS.md under agent rules.

---

## Static analysis (SonarLint and alternatives)

| Tool | Where it runs |
|------|----------------|
| ESLint / Biome / Oxlint | CLI + many editors |
| **SonarLint** | VS Code, JetBrains, Visual Studio extensions |
| **SonarQube / SonarCloud** | CI (editor-agnostic) |

Recommend SonarLint **only** when the team uses a supported IDE. Otherwise suggest:

- CI job with `sonar-scanner` or GitHub Advanced Security
- Strict ESLint + `pnpm audit` as baseline

In AGENTS.md, phrase quality bar as: **zero ESLint/Biome issues** and **SonarLint clean when that extension is installed** — not SonarLint as a hard gate for every developer.

---

## Anti-patterns

- Requiring `.vscode/` for a Zed-only solo project
- Duplicating the same rules in `.vscode/`, `.cursor/rules`, and `AGENTS.md` — link instead
- Relying on format-on-save without Husky (hooks can be skipped with `--no-verify`)
- Editor-specific settings that fight the chosen lint stack (Biome + ESLint format-on-save both enabled)
