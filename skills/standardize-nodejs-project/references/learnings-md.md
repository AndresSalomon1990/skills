# LEARNINGS.md template

Create at project root alongside `AGENTS.md`. Replace `{placeholders}`. Keep **newest-first** so agents and humans see recent gotchas first.

**Do not** use `MEMORIES.md` — that name collides with agent memory stores in some tools. **`LEARNINGS.md`** is the project convention.

```markdown
# LEARNINGS.md — {Project Name}

Living log of non-trivial fixes and gotchas so the team (and agents) do not repeat the same mistakes.

**Newest first.** Redact secrets, tokens, and PII. Reference paths and error messages — not customer data.

## When to add an entry

- After non-trivial debugging (not typos or one-line fixes)
- Tooling, env, CI, or SDK surprises
- Platform quirks (mobile, SSR, monorepo boundaries)
- Painful architectural mistakes and how they were resolved

## Entry format

`{YYYY-MM-DD} — {title}:` Symptom → fix → **`path/to/file`**. Optional one-line prevention note.

## Entries

- _{date} — {title}:_ {symptom}. {fix}. **`path/to/file`**.
```

## Link from AGENTS.md

Add to the fast-context table:

| Goal | Where to look |
|------|---------------|
| Past bugs & gotchas | `LEARNINGS.md` |

Do **not** duplicate entries in `AGENTS.md` — one line in fast-context is enough.

## Maintenance

- Append after non-trivial debugging; agents should suggest an entry when closing a hard bug
- Trim or archive only when an entry is fully obsolete (feature removed, stack replaced)
- See [security.md](security.md) for redaction rules
