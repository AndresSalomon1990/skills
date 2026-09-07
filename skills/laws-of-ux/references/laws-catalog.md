# Laws of UX — Catalog

Reference distilled from **[Laws of UX](https://lawsofux.com)** by **Jon Yablonski**. Each entry links to the canonical page. Use takeaways for actionable design guidance.

---

## Table of contents

- [Cognitive load & memory](#cognitive-load--memory)
- [Decision & choice](#decision--choice)
- [Interaction & performance](#interaction--performance)
- [Visual perception (Gestalt)](#visual-perception-gestalt)
- [User behavior & motivation](#user-behavior--motivation)
- [Design philosophy & research](#design-philosophy--research)

---

## Cognitive load & memory

### Cognitive Load

**Definition:** The amount of mental resources needed to understand and interact with an interface.

**Source:** <https://lawsofux.com/cognitive-load/>

**Takeaways:**

- When incoming information exceeds available capacity, tasks get harder, details are missed, and users feel overwhelmed
- **Intrinsic load** — effort to hold goal-relevant information and track goals
- **Extraneous load** — processing that does not help understanding (e.g. decorative or distracting UI)
- Reduce extraneous load; respect intrinsic load limits

---

### Miller's Law

**Definition:** The average person can only keep 7 (plus or minus 2) items in their working memory.

**Source:** <https://lawsofux.com/millers-law/>

**Takeaways:**

- Do not use "7±2" to justify arbitrary design limits
- Organize content into smaller chunks for processing and recall
- Capacity varies by individual, prior knowledge, and context

---

### Chunking

**Definition:** A process by which individual pieces of an information set are broken down and then grouped together in a meaningful whole.

**Source:** <https://lawsofux.com/chunking/>

**Takeaways:**

- Chunking improves scannability and helps users find goal-aligned information faster
- Use visual hierarchy and distinct groups to reflect relationships
- Separate content with rules and hierarchy; group into modules

---

### Working Memory

**Definition:** A cognitive system that temporarily holds and manipulates information needed to complete tasks.

**Source:** <https://lawsofux.com/working-memory/>

**Takeaways:**

- Limited to roughly 4–7 chunks at a time; chunks fade after ~20–30 seconds
- Support **recognition over recall** — visited links, breadcrumbs, visible state
- Place memory burden on the system (persist data across screens, comparison tables)

---

## Decision & choice

### Hick's Law

**Definition:** The time it takes to make a decision increases with the number and complexity of choices.

**Source:** <https://lawsofux.com/hicks-law/>

**Takeaways:**

- Minimize choices when response time is critical
- Break complex tasks into smaller steps
- Highlight recommended options; use progressive onboarding
- Avoid oversimplifying to the point of abstraction

---

### Choice Overload

**Definition:** The tendency for people to get overwhelmed when presented with a large number of options (related to paradox of choice).

**Source:** <https://lawsofux.com/choice-overload/>

**Takeaways:**

- Too many options hurts decision-making and overall experience
- Enable side-by-side comparison when comparison is necessary (e.g. pricing tiers)
- Prioritize featured content; provide search and filtering to narrow choices

---

## Interaction & performance

### Fitts's Law

**Definition:** The time to acquire a target is a function of the distance to and size of the target.

**Source:** <https://lawsofux.com/fittss-law/>

**Takeaways:**

- Make touch targets large enough to select accurately
- Provide ample spacing between targets
- Place targets where they are easy to reach (short distance from attention area)

---

### Doherty Threshold

**Definition:** Productivity soars when a computer and its users interact at a pace (&lt;400ms) that ensures neither has to wait on the other.

**Source:** <https://lawsofux.com/doherty-threshold/>

**Takeaways:**

- Provide system feedback within ~400ms to hold attention
- Use perceived performance: skeleton screens, animation during load
- Progress bars make waits tolerable even if approximate
- A deliberate delay can increase perceived value and trust when appropriate

---

### Postel's Law

**Definition:** Be liberal in what you accept, and conservative in what you send.

**Source:** <https://lawsofux.com/postels-law/>

**Takeaways:**

- Be tolerant of varied user input and actions
- Anticipate diverse inputs, access paths, and capabilities
- Accept variable input, translate to requirements, define boundaries, give clear feedback

---

## Visual perception (Gestalt)

### Law of Prägnanz

**Definition:** People perceive and interpret ambiguous or complex images as the simplest form possible — the interpretation requiring least cognitive effort.

**Source:** <https://lawsofux.com/law-of-pr%C3%A4gnanz/>

**Takeaways:**

- The eye seeks simplicity and order in complex shapes to avoid overload
- Simple figures are processed and remembered better than complex ones
- Complex shapes are simplified into unified forms

---

### Law of Proximity

**Definition:** Objects that are near each other tend to be grouped together.

**Source:** <https://lawsofux.com/law-of-proximity/>

**Takeaways:**

- Proximity establishes relationships between nearby objects
- Close elements are perceived as sharing function or traits
- Spacing helps users organize and scan information faster

---

### Law of Similarity

**Definition:** The human eye tends to perceive similar elements as a complete picture, shape, or group, even when separated.

**Source:** <https://lawsofux.com/law-of-similarity/>

**Takeaways:**

- Visually similar elements are perceived as related
- Color, shape, size, orientation, and movement signal shared meaning
- Differentiate links and navigation from body text

---

### Law of Common Region

**Definition:** Elements tend to be perceived as groups if they share an area with a clearly defined boundary.

**Source:** <https://lawsofux.com/law-of-common-region/>

**Takeaways:**

- Common region clarifies structure and relationships
- Borders around elements or groups create region easily
- Backgrounds can also define a shared region

---

### Law of Uniform Connectedness

**Definition:** Elements that are visually connected are perceived as more related than elements with no connection.

**Source:** <https://lawsofux.com/law-of-uniform-connectedness/>

**Takeaways:**

- Group similar functions with color, lines, frames, or shapes
- Use connectors (lines, arrows) between related items
- Show context and emphasize relationships between similar items

---

## User behavior & motivation

### Jakob's Law

**Definition:** Users spend most of their time on other sites — they prefer yours to work like sites they already know.

**Source:** <https://lawsofux.com/jakobs-law/>

**Takeaways:**

- Users transfer expectations from familiar products to similar ones
- Leverage existing mental models so users focus on tasks, not learning
- When changing patterns, allow gradual migration (preview, revert, feedback)

---

### Mental Model

**Definition:** A compressed model based on what we think we know about a system and how it works.

**Source:** <https://lawsofux.com/mental-model/>

**Takeaways:**

- Users apply working models from past experience to new similar systems
- Align design with mental models (e-commerce patterns, carts, checkout)
- Shrink the gap via user research: interviews, personas, journey maps, empathy maps

---

### Paradox of the Active User

**Definition:** Users never read manuals but start using the software immediately.

**Source:** <https://lawsofux.com/paradox-of-the-active-user/>

**Takeaways:**

- Users prioritize immediate tasks over upfront documentation
- Long-term efficiency suffers when they skip learning — but that is the default behavior
- Provide contextual guidance (tooltips, inline help) on the path users actually take

---

### Flow

**Definition:** The mental state of energized focus, full involvement, and enjoyment in an activity.

**Source:** <https://lawsofux.com/flow/>

**Takeaways:**

- Balance task difficulty with user skill — too hard frustrates, too easy bores
- Provide feedback on actions and accomplishments
- Remove friction; make features discoverable to prevent disengagement

---

### Goal-Gradient Effect

**Definition:** The tendency to approach a goal increases with proximity to the goal.

**Source:** <https://lawsofux.com/goal-gradient-effect/>

**Takeaways:**

- Users work faster as they near completion
- Artificial progress (e.g. pre-filled steps) can increase completion motivation
- Show clear progress indicators

---

### Zeigarnik Effect

**Definition:** People remember uncompleted or interrupted tasks better than completed tasks.

**Source:** <https://lawsofux.com/zeigarnik-effect/>

**Takeaways:**

- Use clear signifiers for additional content to invite discovery
- Progress indicators and artificial head starts support completion
- Incomplete states can draw users back — use ethically

---

### Peak-End Rule

**Definition:** People judge an experience largely by how they felt at its peak and at its end, not the average of every moment.

**Source:** <https://lawsofux.com/peak-end-rule/>

**Takeaways:**

- Design the most intense moments and the **ending** deliberately
- Delight at helpful, valuable, or first-time success moments
- Negative peaks matter disproportionately; reduce painful waiting and failure states

---

### Serial Position Effect

**Definition:** Users best remember the first and last items in a series.

**Source:** <https://lawsofux.com/serial-position-effect/>

**Takeaways:**

- Place least important items in the middle of lists
- Put key navigation actions at far left and right for memorability

---

### Von Restorff Effect

**Definition:** When multiple similar objects are present, the one that differs is most likely to be remembered (Isolation Effect).

**Source:** <https://lawsofux.com/von-restorff-effect/>

**Takeaways:**

- Make important information and primary actions visually distinctive
- Restrain emphasis so elements do not compete or look like ads
- Do not rely on color alone; consider motion sensitivity

---

### Selective Attention

**Definition:** Focusing attention on a subset of stimuli — usually those related to goals.

**Source:** <https://lawsofux.com/selective-attention/>

**Takeaways:**

- Users filter non-relevant information — guide attention deliberately
- **Banner blindness** — avoid ad-like styling and ad-adjacent placement for real content
- **Change blindness** — concurrent competing changes may go unnoticed; sequence important updates

---

### Aesthetic-Usability Effect

**Definition:** Users often perceive aesthetically pleasing design as more usable.

**Source:** <https://lawsofux.com/aesthetic-usability-effect/>

**Takeaways:**

- Pleasing design creates positive response and perceived ease of use
- Users tolerate minor usability issues on attractive interfaces
- Beauty can mask problems — do not skip usability testing on polished UI

---

## Design philosophy & research

### Tesler's Law (Law of Conservation of Complexity)

**Definition:** For any system there is a certain amount of complexity which cannot be reduced.

**Source:** <https://lawsofux.com/teslers-law/>

**Takeaways:**

- Core complexity must be absorbed by the system or the user — prefer the system
- Design for real users, not idealized rational actors
- Provide contextual guidance for active learners

---

### Occam's Razor

**Definition:** Among competing hypotheses that predict equally well, select the one with the fewest assumptions.

**Source:** <https://lawsofux.com/occams-razor/>

**Takeaways:**

- Best complexity reduction: avoid adding it initially
- Remove elements without compromising overall function
- Stop simplifying when removal would break the experience

---

### Pareto Principle

**Definition:** For many events, roughly 80% of effects come from 20% of causes.

**Source:** <https://lawsofux.com/pareto-principle/>

**Takeaways:**

- Inputs and outputs are often unevenly distributed
- A few contributors drive most outcomes — focus effort there
- Prioritize changes that benefit the most users

---

### Parkinson's Law

**Definition:** Any task will inflate until all available time is spent.

**Source:** <https://lawsofux.com/parkinsons-law/>

**Takeaways:**

- Limit task duration to what users expect
- Beating expected duration improves experience
- Use autofill and smart defaults to shorten forms and bookings

---

### Cognitive Bias

**Definition:** A systematic error in thinking or rationality that influences perception and decision-making.

**Source:** <https://lawsofux.com/cognitive-bias/>

**Takeaways:**

- Mental shortcuts increase efficiency but skew judgment unconsciously
- Awareness of bias (e.g. confirmation bias) improves design and research quality
- Guard against fallacious reasoning in UX discussions and data interpretation

---

## Attribution

Content summarized from **[Laws of UX](https://lawsofux.com)** © Jon Yablonski. For originals, examples, and further reading, visit each law's page on the site.
