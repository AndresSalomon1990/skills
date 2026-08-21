# AGENTS.md

Guidance for AI coding agents working in this repository.

## Repository Overview

Personal collection of [Agent Skills](https://agentskills.io/) for Cursor and other AI agents. Each skill is a directory with a `SKILL.md` file that teaches the agent a specialized workflow.

Published via [skills.sh](https://skills.sh/) with:

```bash
npx skills add AndresSalomon1990/skills --skill <skill-name>
```

## Directory Layout

```
skills/
  {skill-name}/           # kebab-case
    SKILL.md              # Required
    references/           # Optional — loaded on demand
    scripts/              # Optional — utility scripts
    agents/               # Optional — agent-specific config (e.g. openai.yaml)
```

Do **not** put skills in `~/.cursor/skills-cursor/` — that path is reserved for Cursor built-in skills.

Published skills live in `skills/`. Authoring helpers live in `.agents/skills/` (local only, not published):

| Skill | Purpose |
|-------|---------|
| `skill-creator` | Anthropic skill for creating, evaluating, and improving skills |

## Creating a New Skill

1. Scaffold:

   ```bash
   npx skills init skills/my-skill-name
   ```

2. Edit `skills/my-skill-name/SKILL.md`:
   - Set `name` (kebab-case, max 64 chars) and `description` (third person, WHAT + WHEN, trigger terms).
   - Add `disable-model-invocation: true` when the skill should load only when explicitly invoked.

3. Keep `SKILL.md` under 500 lines. Move detail to `references/`.

4. Register the skill in `skills.sh.json` groupings when it is ready to publish.

5. Document it in `README.md`.

## Authoring Conventions (this repo)

These patterns come from skills used across other projects:

| Pattern | When to use |
|---------|-------------|
| **Protocol-style sections** | UI/design skills with strict constraints (banned elements, palette, typography) |
| **Workflow + checklist** | Multi-step agent workflows (explore → report → iterate) |
| **Progressive disclosure** | `references/` for API docs, examples, long tables |
| **`disable-model-invocation: true`** | Heavy or explicit skills (architecture review, grilling sessions) |
| **Verbatim user text** | When the user provides exact wording for a skill, preserve it word-for-word |

### Description format

```yaml
description: >-
  One sentence in third person describing what the skill does.
  Include trigger phrases and when the agent should load it.
```

### Script conventions

- Bash: `#!/bin/bash`, `set -e`, status to stderr, JSON to stdout
- Node: `#!/usr/bin/env node`, `.mjs` extension
- Use forward slashes in paths (`scripts/helper.mjs`), never backslashes

## Quality Checklist

Before merging a new skill:

- [ ] `name` and `description` frontmatter are set
- [ ] Description includes trigger terms (WHEN) and capabilities (WHAT)
- [ ] `SKILL.md` is under 500 lines
- [ ] File references are one level deep from `SKILL.md`
- [ ] Added to `skills.sh.json` and `README.md` if public
- [ ] No Windows-style paths in skill content

## Testing a Skill Locally

Install from this repo without publishing:

```bash
npx skills add ./ --skill my-skill-name -y
```

Or install globally:

```bash
npx skills add AndresSalomon1990/skills --skill my-skill-name -g -y
```
