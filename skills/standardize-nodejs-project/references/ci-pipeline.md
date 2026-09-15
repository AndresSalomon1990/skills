# CI pipeline (provider-agnostic)

Recommend a **quality gate** the team can implement on their Git host — GitHub Actions, GitLab CI, Bitbucket Pipelines, Azure DevOps, CircleCI, Jenkins, etc. This skill does **not** assume a provider and does **not** commit pipeline config unless the user explicitly approves.

## Principles

1. **Scripts first** — CI should call the same `package.json` scripts as local dev (`lint`, `test`, `build`, `check`). Standardize scripts in Phases 1 and 3 before writing pipeline YAML.
2. **Hooks ≠ CI** — Husky catches fast feedback locally; CI is the enforceable gate on every PR. Hooks can be skipped with `--no-verify`.
3. **Audit before write** — detect existing pipeline config; extend or document gaps; never overwrite a working pipeline blindly.
4. **User chooses provider** — ask once if unknown, or infer from repo files (see table below).
5. **Menu, not mandate** — propose 2–4 concrete steps the project lacks; user approves before creating or editing config.

## Audit during standardization

| Look for | Typical location |
|----------|------------------|
| GitHub Actions | `.github/workflows/*.{yml,yaml}` |
| GitLab CI | `.gitlab-ci.yml` |
| Bitbucket Pipelines | `bitbucket-pipelines.yml` |
| Azure DevOps | `azure-pipelines.yml` (or pipeline defined in the UI only) |
| CircleCI | `.circleci/config.yml` |
| Jenkins | `Jenkinsfile` |
| Generic | `package.json` scripts used by any existing CI job |

Report what exists, what scripts are missing, and what the pipeline should call — then let the team map that to their host's syntax.

## Recommended quality gate

Adapt steps to project shape. Skip steps with no script yet (suggest adding the script first).

| Step | Purpose | Typical script | Skip when |
|------|---------|----------------|-----------|
| **Install** | Reproducible deps | `{pm} install --frozen-lockfile` (or `npm ci`, `yarn install --immutable`) | Never |
| **Lint** | Style + static rules | `{pm} lint` | Never for TS apps |
| **Typecheck / check** | Types + framework validation | `{pm} check`, `tsc --noEmit`, `tsc -b`, `svelte-check`, `nest build --webpack` dry path | JS-only with no check script |
| **Unit test** | Fast regression | `{pm} test` or `{pm} test:unit` | No tests yet — note as gap |
| **Build** | Compile / bundle succeeds | `{pm} build` | Library with no build step |
| **Dependency audit** | Known vulns | `{pm} audit --prod` (threshold per team policy) | Optional; often `continue-on-error` |

Run **e2e in a separate job** when slow (Playwright/Cypress) — do not block every PR on full browser suites unless the team wants that.

### Framework script hints

Map to whatever scripts the project already defines in Phase 1/3:

| Framework | Often add or reuse |
|-----------|-------------------|
| NestJS | `lint`, `test`, `test:e2e` (separate job), `build` |
| Next.js | `lint`, `test`, `build` |
| SvelteKit | `lint`, `check`, `test`, `build` |
| Vite + React | `lint`, `test`, `build` |
| Expo | `lint`, `test` (unit); EAS/build pipelines separate |

Document the chosen CI scripts in `AGENTS.md` under Commands if they differ from local-only aliases.

## What to deliver

Unless the user asked to scaffold CI, prefer a **short spec** they can paste into their provider:

```markdown
## CI quality gate (proposed)

**Triggers:** pull requests + default branch (team chooses branch names)

**Job: check**
1. Checkout
2. Setup Node {version} + {package manager}
3. Install (frozen lockfile)
4. `{pm} lint`
5. `{pm} check` (or typecheck script)
6. `{pm} test`
7. `{pm} build` (if applicable)
8. `{pm} audit --prod` (optional; non-blocking)

**Env (placeholders — set in CI secrets/variables, not in repo):**
- `{VAR_NAME}=...`

**Notes:** e2e in separate job; monorepo may need matrix per app/package.
```

When the user **does** want config committed, translate the spec into **their** provider's format — one file, minimal comments, no secrets.

## Monorepo

- One install at root when using workspaces; run `{pm} -r lint` or filter per package as the repo already does locally.
- Parallel jobs per app/package only when boundaries are clear in `AGENTS.md`.
- Do not invent a monorepo CI layout without reading existing workspace scripts.

## Security

See [security.md](security.md):

- Frozen lockfile installs in CI
- No secrets in pipeline files — use the host's secret/variable store
- Mask env vars in logs; use OIDC over long-lived keys when deploying
- Audit failures: team policy decides block vs warn

## When to skip Phase 5b

- User only asked for local tooling (hooks, lint, editor)
- CI already matches the proposed gate — report "no changes needed"
- No remote / no CI planned — mention the spec as a future step in the final report

## Related

- Local hooks: [tooling.md](tooling.md)
- Test layout and CI split: [testing.md](testing.md)
- Optional extras (SAST, Dependabot): [complementary-practices.md](complementary-practices.md)
