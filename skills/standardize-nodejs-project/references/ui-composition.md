# UI composition (frontend)

Prefer **composition over configuration**: assemble UI from small, focused pieces instead of one component with many boolean props or a deep inheritance tree.

Apply on **React**, **Next.js**, **Vite + React**, **Expo / React Native**, and **SvelteKit**. Stack-specific APIs differ; the design rules are the same.

## Core rules

1. **Routes and pages compose; they do not implement.** Route files, `.page.tsx`, and thin screens assemble layout + feature components. Business logic stays in hooks, services, or child components — not in the route shell.
2. **Prefer composition over prop drilling.** When a parent passes many props through layers that do not use them, restructure: compose children/slots at the call site, or lift a small wrapper — do not add “pass-through” props by default.
3. **Prefer composition over boolean props.** Avoid `isCompact`, `showFooter`, `variant="admin"` flags that multiply combinations. Split variants into composed layouts or compound subcomponents instead.
4. **Layout components stay dumb.** Shells (`App`, root layout, stack navigator layout) wire providers and structure; they do not own domain rules.
5. **Reuse primitives before new abstractions.** Extend `shared/components/ui/` (shadcn, design system) via composition before forking one-off copies.

## Compound components

Use **compound components** when a UI block has a fixed structure but flexible inner content — dialogs, cards, menus, form field groups, list items with optional actions.

Pattern:

- A **root** component holds shared state/context (open, selected id, aria ids).
- **Subcomponents** (`Root`, `Trigger`, `Content`, `Header`, `Footer`, …) are composed at the call site.
- Callers control order and optional sections without new props on the root.

Examples in the wild: Radix UI, shadcn/ui, many headless libraries. In Svelte, export named subcomponents from a folder or use slots/snippets for the same effect.

**When compound components help**

- Several related pieces share implicit state (modal open, accordion section).
- Callers need to omit or reorder sections (footer optional, actions slot).
- You would otherwise add `renderX` props or five booleans.

**When not to**

- A single leaf with no inner structure — a plain `Button` or `Badge` is enough.
- One-off layout in a single screen — inline composition is fine; do not premature-abstract.

## Stack-specific mechanisms

| Stack | Compose with | Compound / flexible inner UI |
|-------|----------------|------------------------------|
| React / Next / Vite / Expo | `children`, fragments, small layout wrappers | Named subcomponents + React context; headless + styled parts |
| SvelteKit | Default slot, named slots, `{@render children?.()}` (Svelte 5 snippets) | Subcomponents in a folder (`card/`, `dialog/`) or snippet props |

See also:

- [architecture-vite-react.md](architecture-vite-react.md)
- [architecture-nextjs.md](architecture-nextjs.md)
- [architecture-expo.md](architecture-expo.md)
- [architecture-sveltekit.md](architecture-sveltekit.md)

## Anti-patterns

- **God component** — one file with fetch, form, table, and modal logic.
- **Prop explosion** — root component accepts every child’s concerns.
- **Wrapper-only route files** — `page.tsx` → `page-content.tsx` with no reuse; merge or compose feature components directly.
- **Cross-feature UI coupling** — importing another feature’s internal components; extract to `shared/`.

## AGENTS.md

When standardizing a frontend project, add a short bullet under agent rules:

- **UI composition** — thin routes; prefer children/slots and compound components over boolean props; see `docs/architecture.md` or team UI guidelines.

Link to this reference or a project-specific `docs/ui-patterns.md` if the team documents local compound primitives.
