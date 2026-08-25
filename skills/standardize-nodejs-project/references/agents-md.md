# AGENTS.md template

Create at project root. Replace `{placeholders}`. Keep concise — agents load this on every session; link to `docs/` for depth ([writing for agents](https://agentskills.io/) best practice).

```markdown
# AGENTS.md — {Project Name}

Guidance for coding agents. **Default workspace:** `{primary-path}` unless the task says otherwise.

## Stack

| Area | Technology |
|------|------------|
| Runtime | Node {version} |
| Language | TypeScript |
| Framework | {framework} |
| Package manager | {pnpm / npm / yarn} |
| Lint / format | {eslint + prettier / biome / oxlint} |

## Commands

| Command | Description |
|---------|-------------|
| `{pm} dev` | Development server |
| `{pm} lint` / `{pm} lint:fix` | Lint and format |
| `{pm} cm` | Conventional commit (if Commitizen enabled) |
| `{pm} test` | Unit tests (CI run) |
| `{pm} test:unit` | Unit tests (watch) |
| `{pm} test:e2e` | E2E (when configured) |

## What lives where

- `{features or modules path}` — domain slices
- `{shared path}` — cross-cutting code (features must not import each other)
- `{routes path}` — thin routes only

## Agent rules (non-negotiable)

1. **English comments** in all code
2. **One component per file** in UI folders
3. **Feature isolation** — no cross-feature imports; use shared layer
4. **Imports at top** — no inline imports unless documented
5. **i18n** — user strings in message files, all locales
6. **Lint clean** — `pnpm lint` passes; fix with `pnpm lint:fix` before finishing
7. **No secrets** in code, docs, or commits — use env vars
8. **UI composition** (frontend) — thin routes; prefer children/slots and compound components over boolean props — see `{docs/ui-patterns or architecture}`
9. **Tests** — follow project layout (module `tests/` or colocated); separate unit from e2e — see `{docs/architecture or testing}`

## Fast context

| Goal | Where to look |
|------|---------------|
| Docs index | `{docs/README.md}` or external wiki/Notion link |
| Product / scope | `{docs/product.md or URL}` |
| Architecture / ERD | `{docs/architecture.md}` |
| Design / UI | `{docs/design/ or Figma URL}` |
| Domain glossary | `{CONTEXT.md or docs/product.md#glossary}` |
| API routes / endpoints | `{path}` |
| Auth / routing | `{path}` |
| Shared UI | `{path}` |

## Team learnings (living document)

**Keep updated.** Newest first. 2–5 lines: symptom → fix → `path`. Redact secrets and PII.

Entries:

- _{date} — {title}:_ {summary}. **`path/to/file`**.
```

## Monorepo variant

Add a workspace table at the top:

| Folder | Role |
|--------|------|
| `{app-a}/` | {description} |
| `{app-b}/` | {description} |

State which folders agents may edit. Sub-apps may have their own AGENTS.md for local rules.

## Optional: CONTEXT.md

For domain-heavy apps, add a root **`CONTEXT.md`** glossary (terms agents should reuse in code and docs). Keep `AGENTS.md` as the index; link to `CONTEXT.md` from the fast-context table.

## Maintenance

- Update when structure or commands change
- Add team learnings after non-trivial debugging
- Do not duplicate long architecture docs — link instead
- Index external docs (Figma, Notion) in fast-context — see [documentation.md](documentation.md)
- Optional improvements catalog: [complementary-practices.md](complementary-practices.md)
