---
name: laws-of-ux
description: >-
  Applies UX psychology and design principles from Laws of UX (lawsofux.com) for
  UX/UI recommendations — greenfield design for new projects and audits of existing
  apps, screens, flows, or codebases. Use whenever the user asks to improve, review,
  critique, simplify, or redesign an interface; design forms, navigation, onboarding,
  checkout, or dashboards; reduce friction or cognitive load; or wants UX-informed
  guidance on a mockup, Figma, component, or live product — even if they never mention
  "Laws of UX", Hick's Law, Fitts's Law, Jakob's Law, Gestalt, or mental models.
---

# Laws of UX

Apply evidence-based UX principles when designing or reviewing interfaces. This skill distills content from **[Laws of UX](https://lawsofux.com)** by **Jon Yablonski** for agent use — it does not speak as Jon Yablonski, and it is not affiliated with or endorsed by the site.

When citing principles in output, attribute the source:

> Based on [Laws of UX](https://lawsofux.com) by Jon Yablonski.

For full definitions, takeaways, and source URLs, read [references/laws-catalog.md](references/laws-catalog.md).

## When to use

Load this skill automatically when the request is about **UX or UI quality** — the user does not need to name a law or this skill.

| Signal | Examples |
| ------ | -------- |
| **New project / greenfield** | "Design the checkout flow", "How should onboarding work?", "Layout for a settings page", starting a new screen or feature from scratch |
| **Existing project / audit** | "Review this page", "Why do users drop off here?", "Critique our nav", "Improve this form" with code, URL, screenshot, or component |
| **Either mode** | Simplify UI, reduce choices, fix hierarchy, speed up flows, strengthen CTAs, explain UX trade-offs |

If the user only wants visual styling (colors, fonts, brand) with no usability goal, skip this skill unless they also ask for UX impact.

## Modes

Detect mode from context; default to **audit** when code or a live UI exists, **greenfield** when designing something that does not exist yet.

### Greenfield (new project)

No implementation yet — wireframes, specs, or "how should this work?" questions.

1. Clarify user goals, primary tasks, platform, and constraints
2. Propose structure (IA, flows, grouping) before pixel details
3. Apply 2–5 laws to justify choices; flag what to validate after build

### Audit (existing project)

Something already exists — components, pages, repo, staging URL, or screenshot.

1. Inspect what exists (read code, UI files, or user-provided artifacts)
2. Map friction to specific screens, flows, or components
3. Recommend concrete changes with law-backed rationale; note quick wins vs larger refactors

## Workflow

Copy this checklist and track progress:

```text
Laws of UX Progress:
- [ ] Step 0: Detect mode (greenfield vs audit)
- [ ] Step 1: Clarify user goal, context, and constraints
- [ ] Step 2: Identify applicable laws (use quick index below)
- [ ] Step 3: Read relevant entries in references/laws-catalog.md
- [ ] Step 4: Produce recommendations tied to specific laws
- [ ] Step 5: Note trade-offs and what to validate with users
```

### Step 0: Detect mode

| Clue | Mode |
| ---- | ---- |
| "Build/design/create" with no existing UI | Greenfield |
| Code, repo paths, components, URLs, screenshots, "our app", "this page" | Audit |
| Ambiguous | Ask once: design from scratch or improve what exists? |

### Step 1: Clarify context

Before recommending, establish:

1. **User goal** — what task are they trying to complete?
2. **Context** — platform (web, mobile, desktop), input modality, frequency of use
3. **Pain** — cognitive overload, errors, drop-off, slow completion, confusion *(audit: tie to specific UI)*
4. **Constraints** — brand, technical, content, or business rules you must respect

If critical context is missing, ask once — then proceed with stated assumptions.

**Audit:** read relevant UI code or artifacts before recommending. **Greenfield:** confirm scope (MVP vs full feature) so recommendations stay proportional.

### Step 2: Select applicable laws

Use the quick index. Pick **2–5 laws** most relevant to the problem; avoid listing every law.

| If the problem involves… | Start with these laws |
| -------------------------- | ------------------------ |
| Too many options, menus, or settings | Hick's Law, Choice Overload, Miller's Law, Chunking |
| Cluttered or overwhelming screens | Cognitive Load, Occam's Razor, Selective Attention, Chunking |
| Tap/click targets, mobile actions | Fitts's Law |
| Unfamiliar patterns, user confusion | Jakob's Law, Mental Model, Paradox of the Active User |
| Visual grouping or hierarchy | Law of Proximity, Similarity, Common Region, Uniform Connectedness, Law of Prägnanz |
| Sluggish or waiting UI | Doherty Threshold |
| Forms, memory, multi-step tasks | Working Memory, Goal-Gradient Effect, Zeigarnik Effect, Parkinson's Law |
| Onboarding, empty states, help | Paradox of the Active User, Tesler's Law, Flow |
| Trust, polish, perceived quality | Aesthetic-Usability Effect, Peak-End Rule |
| Emphasis, CTAs, banners | Von Restorff Effect, Selective Attention, Serial Position Effect |
| Scope and prioritization | Pareto Principle, Tesler's Law |
| Input validation, edge cases | Postel's Law |
| Engagement and completion | Flow, Goal-Gradient Effect, Zeigarnik Effect |
| Decision bias in design/research | Cognitive Bias |

### Step 3: Read the catalog

Open [references/laws-catalog.md](references/laws-catalog.md) and read only the sections you selected. Prefer **takeaways** over reciting definitions.

### Step 4: Recommend

Tie each recommendation to a named law and a concrete UI change. Prefer:

- Reduce — remove choices, fields, or visual noise
- Chunk — group related items; progressive disclosure
- Align — match familiar patterns and mental models
- Emphasize — one primary action; clear visual hierarchy
- Support memory — persist state, breadcrumbs, visited links, summaries
- Respect performance — feedback within ~400ms; honest progress indicators

Flag conflicts explicitly (e.g. simplifying so far it becomes abstract — Hick's Law vs. oversimplification).

### Step 5: Validate

Remind that laws are heuristics, not substitutes for user research. Suggest lightweight validation when appropriate: usability test, analytics on drop-off, A/B on critical paths.

## Output format

Use this structure unless the user asks otherwise:

```markdown
## Summary
[One paragraph: problem, approach, expected impact]

## Applicable laws
- **[Law name](https://lawsofux.com/...)** — why it applies here

## Recommendations
1. **[Change]** — tied to [Law]; [expected benefit]
2. ...

## Trade-offs
- [Law A vs B, or simplification vs power-user needs]

## Validate
- [How to test the highest-risk assumption]

---
*Principles from [Laws of UX](https://lawsofux.com) by Jon Yablonski.*
```

## Guardrails

- **Attribute** — link to [lawsofux.com](https://lawsofux.com) and name Jon Yablonski when presenting law-based guidance
- **Do not impersonate** — never claim to be Jon Yablonski or present text as official Laws of UX copy
- **Do not over-prescribe** — Miller's "7±2" is not a license for arbitrary limits; chunking beats magic numbers
- **Accessibility** — Von Restorff and emphasis must not rely on color alone; respect motion sensitivity
- **Aesthetic-usability** — pretty UI can hide real usability problems; call out when polish may mask issues

## All laws (index)

Full takeaways: [references/laws-catalog.md](references/laws-catalog.md)

| Law | One-line definition |
| ----- | --------------------- |
| [Aesthetic-Usability Effect](https://lawsofux.com/aesthetic-usability-effect/) | Pleasing design is often perceived as more usable |
| [Choice Overload](https://lawsofux.com/choice-overload/) | Too many options impairs decisions |
| [Chunking](https://lawsofux.com/chunking/) | Group information into meaningful wholes |
| [Cognitive Bias](https://lawsofux.com/cognitive-bias/) | Systematic errors in judgment affect UX decisions |
| [Cognitive Load](https://lawsofux.com/cognitive-load/) | Mental effort required to use an interface |
| [Doherty Threshold](https://lawsofux.com/doherty-threshold/) | Productivity peaks when response stays under ~400ms |
| [Fitts's Law](https://lawsofux.com/fittss-law/) | Acquisition time depends on target size and distance |
| [Flow](https://lawsofux.com/flow/) | Immersion when challenge matches skill |
| [Goal-Gradient Effect](https://lawsofux.com/goal-gradient-effect/) | Effort increases as users near a goal |
| [Hick's Law](https://lawsofux.com/hicks-law/) | Decision time grows with choices and complexity |
| [Jakob's Law](https://lawsofux.com/jakobs-law/) | Users expect your site to work like others they know |
| [Law of Common Region](https://lawsofux.com/law-of-common-region/) | Shared boundaries create perceived groups |
| [Law of Proximity](https://lawsofux.com/law-of-proximity/) | Near elements are seen as related |
| [Law of Prägnanz](https://lawsofux.com/law-of-pr%C3%A4gnanz/) | People prefer the simplest plausible interpretation |
| [Law of Similarity](https://lawsofux.com/law-of-similarity/) | Similar elements are perceived as a group |
| [Law of Uniform Connectedness](https://lawsofux.com/law-of-uniform-connectedness/) | Connected elements feel more related |
| [Mental Model](https://lawsofux.com/mental-model/) | Users' internal model of how a system works |
| [Miller's Law](https://lawsofux.com/millers-law/) | Working memory holds roughly 7±2 chunks |
| [Occam's Razor](https://lawsofux.com/occams-razor/) | Prefer the simplest solution that works |
| [Paradox of the Active User](https://lawsofux.com/paradox-of-the-active-user/) | Users skip manuals and learn by doing |
| [Pareto Principle](https://lawsofux.com/pareto-principle/) | Roughly 80% of effects come from 20% of causes |
| [Parkinson's Law](https://lawsofux.com/parkinsons-law/) | Work expands to fill available time |
| [Peak-End Rule](https://lawsofux.com/peak-end-rule/) | Experiences are judged by peak and ending moments |
| [Postel's Law](https://lawsofux.com/postels-law/) | Be liberal in input, conservative in output |
| [Selective Attention](https://lawsofux.com/selective-attention/) | Users focus on goal-relevant stimuli only |
| [Serial Position Effect](https://lawsofux.com/serial-position-effect/) | First and last items in a series are remembered best |
| [Tesler's Law](https://lawsofux.com/teslers-law/) | Some complexity cannot be removed — assign it wisely |
| [Von Restorff Effect](https://lawsofux.com/von-restorff-effect/) | Distinct items are remembered more |
| [Working Memory](https://lawsofux.com/working-memory/) | Temporary store for task-relevant information |
| [Zeigarnik Effect](https://lawsofux.com/zeigarnik-effect/) | Incomplete tasks stay more memorable |
