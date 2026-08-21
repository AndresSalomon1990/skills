# skills

[![skills.sh](https://skills.sh/b/AndresSalomon1990/skills)](https://skills.sh/AndresSalomon1990/skills)

Personal collection of [Agent Skills](https://agentskills.io/) for Cursor and other AI agents.

Each skill is a directory with a `SKILL.md` file that teaches the agent a specialized workflow: UI design, architecture review, framework best practices, and more.

## Installation

Install a skill from this repo:

```bash
npx skills add AndresSalomon1990/skills --skill <skill-name>
```

Install globally (available across all projects):

```bash
npx skills add AndresSalomon1990/skills --skill <skill-name> -g -a cursor -y
```

Specify `-a cursor` (or your agent) with `-g`. Without it, the CLI may try every detected agent — some targets (e.g. PromptScript) do not support global install and the command can fail or print a misleading error even when the skill did install.

For most projects, prefer **project-level** install (no `-g`):

```bash
npx skills add AndresSalomon1990/skills --skill <skill-name> -a cursor -y
```

Search the ecosystem:

```bash
npx skills find <query> --owner AndresSalomon1990
```

## Available skills

| Skill | Description |
|-------|-------------|
| [`standardize-nodejs-project`](skills/standardize-nodejs-project/SKILL.md) | Tooling, lint, hooks, optional editor config, and AGENTS.md for bootstrapped Node/TS apps |

## Create a new skill

1. Scaffold:

   ```bash
   npx skills init skills/my-new-skill
   ```

2. Edit `skills/my-new-skill/SKILL.md` - see [AGENTS.md](AGENTS.md) for conventions.

3. Use `skills/_template/` as reference (structure with `references/`).

4. Register in `skills.sh.json` and in the table above when ready to publish.

5. Test locally:

   ```bash
   npx skills add ./ --skill my-new-skill -y
   ```

## Repository structure

```
skills/
  _template/          # Template for new skills
  {skill-name}/
    SKILL.md          # Skill definition (required)
    references/       # On-demand documentation (optional)
    scripts/          # Utility scripts (optional)
AGENTS.md             # Guidance for agents working in this repo
skills.sh.json        # Metadata for skills.sh
```

## Conventions

Aligned with [Agent Skills](https://agentskills.io/) and [skills.sh](https://skills.sh/):

- **Names**: kebab-case (`minimalist-ui`, `standardize-nodejs-project`)
- **Descriptions**: third person, what it does + when to activate
- **Progressive disclosure**: detail in `references/`, not in the main `SKILL.md`
- **`disable-model-invocation: true`**: for heavy or explicit skills

## License

MIT — see [LICENSE](LICENSE).
