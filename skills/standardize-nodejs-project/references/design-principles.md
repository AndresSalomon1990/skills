# Design principles (code structure)

Apply when **starting features**, **reviewing PRs**, or **standardizing** a repo — greenfield or brownfield. These principles complement lint rules and architecture docs; they are not an excuse for large refactors unless the user asked for one.

## Default stance

1. **Match the repo first** — extend existing patterns, naming, and folder layout before introducing new abstractions.
2. **Prefer boring code** — familiar framework patterns beat custom frameworks.
3. **Optimize for readers** — the next developer (or agent) should grasp a file without jumping through indirection.
4. **Complexity budget** — every layer (wrapper, factory, generic helper) must earn its place.

## DRY (Don't Repeat Yourself)

- Extract shared logic when the **same rule** appears in **three or more** places, or when a bug fix would need to land in multiple copies.
- Do **not** DRY one-off flows, slightly different use cases, or "might reuse someday" code — duplication is cheaper than the wrong abstraction.
- Shared code belongs in the project's **shared layer** (`shared/`, `lib/`, `common/`) — not in a random feature importing another feature.

## KISS (Keep It Simple, Stupid)

- Choose the smallest design that satisfies the requirement and fits the stack.
- Prefer explicit steps over clever metaprogramming; prefer data + functions over deep inheritance.
- If a helper needs a long comment to explain what it does, consider inlining or renaming instead.

## SOLID (practical subset)

| Principle | Agent-friendly application |
|-----------|----------------------------|
| **Single responsibility** | One reason to change per module/service/component file; split when a file mixes HTTP, persistence, and formatting. |
| **Open/closed** | Extend via composition, new strategies, or framework hooks — avoid editing stable core for every variant. |
| **Liskov** | Subtypes and mocks must honor the same contracts; don't weaken types in subclasses. |
| **Interface segregation** | Small, focused types and ports — not one god interface for every consumer. |
| **Dependency inversion** | Depend on abstractions at boundaries (DB, HTTP, clock); inject in Nest/modules; avoid hard-coding singletons in domain logic. |

Do not lecture or force patterns where the framework already gives a good default (e.g. Nest modules, SvelteKit loads, Next route handlers).

## Known patterns

- Use **framework-native** patterns first (Nest modules/DTOs, React Query + thin components, SvelteKit loads, Expo Router screens).
- Reach for **catalog patterns** when they reduce cognitive load: repository at persistence boundary, adapter for third-party APIs, compound components for UI blocks — see [ui-composition.md](ui-composition.md).
- Name patterns in PRs or `LEARNINGS.md` when the team adopts a non-obvious convention.

## Avoid over-engineering

- **YAGNI** — no plugin systems, generic pipelines, or "future-proof" layers without a concrete second use case.
- **No speculative configuration** — avoid env flags and strategy objects for a single implementation.
- **Refactor triggers** — repeated bugs, copy-paste across features, or a file exceeding ~300–400 lines of mixed concerns (guideline, not a hard rule).
- Brownfield: **do not** rewrite working modules to "clean architecture" during tooling standardization — document target shape in `AGENTS.md` and apply to **new** code.

## Cognitive complexity

- Shallow call stacks for common paths; deep nesting rarely needs more than 2–3 levels.
- Prefer clear names over comments; extract functions when a block needs a heading comment.
- Keep public APIs of a feature small — export from feature `index` only what other features need.
- Align with lint rules that cap complexity when enabled (`complexity`, `max-depth`, Sonar cognitive complexity) — suggest enabling in [complementary-practices.md](complementary-practices.md) if the project lacks them.

## Document in AGENTS.md

Add one non-negotiable rule when the team cares about consistency:

> **Design:** DRY/KISS/SOLID and familiar patterns — no over-abstraction; match existing code before inventing new structure. See `docs/` or team conventions.

Link to this file from `AGENTS.md` fast-context when `docs/guides/design-principles.md` is not copied in-repo.

## Related

- Code style and naming: [code-conventions.md](code-conventions.md)
- UI structure: [ui-composition.md](ui-composition.md)
- Architecture per framework: `architecture-*.md`
