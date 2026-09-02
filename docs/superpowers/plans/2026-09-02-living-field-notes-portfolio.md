# Living Field Notes Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public portfolio homepage as an image-free personal introduction that presents Nico as a curious full-stack developer through verifiable projects, active learning, reflection, and growth.

**Architecture:** Keep `src/lib/portfolio-content.ts` as the typed content source and keep server-rendered sections by default. Use small client components only for Framer Motion, the section progress rail, and contact submission feedback; do not add state management or change the database schema.

**Tech Stack:** Next.js 16.2, React 19.2, TypeScript 5.9, Tailwind CSS 3.4, Framer Motion 12, Lucide React, Bun test, Drizzle ORM, Neon Postgres

**Spec:** `docs/superpowers/specs/2026-09-02-living-field-notes-portfolio-design.md`

## Global Constraints

- Do not use a photograph, portrait, avatar, silhouette, or generated representation of Nico.
- Position Nico as a `Curious full-stack developer`; do not claim senior, expert, AI engineer, or security-specialist status.
- Do not present personal projects as formal employment or show proficiency percentages.
- Keep project screenshots as project evidence; the image restriction applies to personal imagery.
- Use `src/lib/portfolio-content.ts` as the initial source of truth; do not add a database migration.
- Use the existing Framer Motion dependency; add no WebGL, 3D, custom cursor, fake loader, or new animation package.
- Use semantic CSS variables for the approved palette and load Archivo plus IBM Plex Mono through `next/font`.
- Respect `prefers-reduced-motion`, WCAG 2.2 AA contrast, visible focus, semantic landmarks, and keyboard access.
- Omit unavailable GitHub, live-project, and résumé actions instead of rendering unverified or dead links.
- Preserve unrelated working-tree changes. At plan creation, `bun.lock`, `next-env.d.ts`, and `src/components/portfolio/hero-section.tsx` were already modified.

## File Structure

### Content and tests

- Modify `package.json` — add the Bun test command.
- Modify `src/lib/portfolio-content.ts` — define project evidence, learning stages, journal entries, and growth milestones.
- Create `src/lib/portfolio-content.test.ts` — enforce truthful references and complete learning states.
- Create `src/lib/contact-validation.ts` — pure contact-form parsing and validation.
- Create `src/lib/contact-validation.test.ts` — validation behavior.

### Visual foundation

- Modify `src/app/layout.tsx` — load fonts and update metadata.
- Modify `src/app/globals.css` — semantic design tokens, field-note utilities, and reduced-motion fallbacks.
- Create `src/app/visual-system.test.ts` — assert required tokens and reduced-motion CSS exist.
- Modify `src/components/portfolio/ambient-background.tsx` — quieter token-based background.
- Modify `src/components/portfolio/reveal.tsx` — shorter reveal timing with static reduced-motion output.
- Modify `src/components/portfolio/text-effects.tsx` — keep stable text under reduced motion and remove the rotating role typewriter from the hero.

### Homepage components

- Modify `src/components/portfolio/site-header.tsx` — recruiter-focused navigation and availability; remove the public Admin action.
- Create `src/components/portfolio/field-note-card.tsx` — image-free Build/Learn/Mind card.
- Create `src/components/portfolio/section-progress-rail.tsx` — Build/Learn/Reflect/Journey scroll state.
- Modify `src/components/portfolio/hero-section.tsx` — approved hero composition and featured proof rail.
- Create `src/components/portfolio/hero-content.test.tsx` — static checks for field-note and header semantics.
- Modify `src/components/portfolio/project-showcase.tsx` — list-first build notes.
- Create `src/components/portfolio/project-showcase.test.tsx` — project evidence and optional-link behavior.
- Create `src/components/portfolio/learning-path.tsx` — Comfortable/Learning/Exploring groups.
- Create `src/components/portfolio/decision-journal.tsx` — grounded reflection entries.
- Create `src/components/portfolio/growth-changelog.tsx` — typed project/learning/career milestones.
- Create `src/components/portfolio/story-sections.test.tsx` — server-rendered section checks.
- Modify `src/components/portfolio/contact-section.tsx` — recruiter message and accessible form state.
- Modify `src/server/contact-actions.ts` — typed action result and validation integration.
- Modify `src/app/page.tsx` — approved section order and progress rail.
- Delete `src/components/portfolio/skill-graph.tsx` after its replacement is wired.
- Delete `src/components/portfolio/qa-section.tsx` after its replacement is wired.
- Delete `src/components/portfolio/timeline-section.tsx` after its replacement is wired.

### Shared page inheritance

- Modify `src/app/projects/[slug]/page.tsx` — semantic tokens and Problem/Decision/Learned structure.

---

### Task 1: Establish the Tested Portfolio Content Model

**Files:**
- Modify: `package.json`
- Modify: `src/lib/portfolio-content.ts`
- Create: `src/lib/portfolio-content.test.ts`

**Interfaces:**
- Produces: `LearningStage = "comfortable" | "learning" | "exploring"`
- Produces: `Project.decision: string` and `Project.lesson: string`
- Changes: `Project.coverImageUrl` from required `string` to optional `string`
- Produces: `Skill.stage: LearningStage`, `Skill.evidenceSlugs: string[]`, and optional `Skill.evidenceNote: string`
- Produces: `JournalEntry`, `GrowthMilestone`, `journalEntries`, and `growthMilestones`
- Consumes: existing `projects`, `skills`, and `getFeaturedProjects()` exports

- [ ] **Step 1: Add the test command and write failing content-integrity tests**

Add this script to `package.json`:

```json
"test": "bun test"
```

Create `src/lib/portfolio-content.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import {
  getFeaturedProjects,
  growthMilestones,
  journalEntries,
  projects,
  skills,
} from "./portfolio-content";

describe("portfolio content integrity", () => {
  test("featured work exposes exactly three projects", () => {
    expect(getFeaturedProjects()).toHaveLength(3);
  });

  test("every project contains decision and learning evidence", () => {
    for (const project of projects) {
      expect(project.decision.trim().length).toBeGreaterThan(20);
      expect(project.lesson.trim().length).toBeGreaterThan(20);
    }
  });

  test("skill evidence references real projects", () => {
    const projectSlugs = new Set(projects.map((project) => project.slug));

    for (const skill of skills) {
      expect(skill.evidenceSlugs.length > 0 || Boolean(skill.evidenceNote)).toBe(true);
      for (const slug of skill.evidenceSlugs) {
        expect(projectSlugs.has(slug)).toBe(true);
      }
    }
  });

  test("all three learning states are represented", () => {
    expect(new Set(skills.map((skill) => skill.stage))).toEqual(
      new Set(["comfortable", "learning", "exploring"]),
    );
  });

  test("journal project references and milestone kinds are valid", () => {
    const projectSlugs = new Set(projects.map((project) => project.slug));
    for (const entry of journalEntries) {
      if (entry.projectSlug) expect(projectSlugs.has(entry.projectSlug)).toBe(true);
    }
    expect(growthMilestones.map((entry) => entry.kind)).toEqual(
      expect.arrayContaining(["project", "learning", "career"]),
    );
  });
});
```

- [ ] **Step 2: Run the test and verify the missing fields fail**

Run: `bun test src/lib/portfolio-content.test.ts`

Expected: FAIL because `decision`, `lesson`, `stage`, `evidenceSlugs`, `journalEntries`, and `growthMilestones` do not exist.

- [ ] **Step 3: Add the exact content types and exports**

Add these definitions to `src/lib/portfolio-content.ts`:

```ts
export type LearningStage = "comfortable" | "learning" | "exploring";

export type JournalEntry = {
  id: string;
  label: "Assumption" | "Feedback" | "Trade-off";
  title: string;
  summary: string;
  projectSlug?: string;
};

export type GrowthMilestone = {
  period: string;
  title: string;
  kind: "project" | "learning" | "career";
  description: string;
};
```

Extend `Project` with `decision: string` and `lesson: string`, and change `coverImageUrl` to `coverImageUrl?: string` so a text fallback can represent a missing image without layout shift. Extend `Skill` with `stage: LearningStage`, `evidenceSlugs: string[]`, and `evidenceNote?: string`.

Use these project evidence values:

| Project slug | `decision` | `lesson` |
| --- | --- | --- |
| `ai-article-summarizer` | `Kept the workflow centered on one URL input and one readable result so the API interaction never competed with the user's main task.` | `A stronger version needs explicit URL validation, loading and error states, and clearer source transparency around generated summaries.` |
| `berbagi-image-discovery` | `Used category navigation and a masonry-style gallery to keep dense visual browsing understandable while preserving direct download actions.` | `Image-heavy interfaces need responsive image sizing, reserved loading skeletons, and measured rendering performance as the collection grows.` |
| `netflix-clone` | `Modeled the interface as reusable content rows and media cards so repeated browsing patterns stayed consistent across categories.` | `The next iteration should make loading, empty, focus, and responsive carousel behavior as deliberate as the finished visual state.` |
| `map-experience` | `Kept the map as the primary canvas and treated search and location controls as supporting context instead of competing panels.` | `A production version would need real geospatial search, permission handling, route states, and accessible alternatives to pointer-only map gestures.` |
| `car-showcase` | `Used catalogue cards and focused filters to keep product comparison understandable without overloading each vehicle preview.` | `Typed filters, server-rendered detail routes, query persistence, and optimized media would turn the interface concept into a stronger product system.` |

Use these skill states and evidence mappings:

| Skill | Stage | Evidence |
| --- | --- | --- |
| React | `comfortable` | `ai-article-summarizer`, `berbagi-image-discovery`, `netflix-clone`, `map-experience`, `car-showcase` |
| TypeScript | `comfortable` | `ai-article-summarizer`; note: `Used throughout the current Next.js portfolio rebuild.` |
| Node.js | `learning` | `ai-article-summarizer` |
| Postgres | `learning` | note: `Used in the current portfolio's contact-message and admin data model.` |
| Drizzle ORM | `learning` | note: `Used to define and access the current portfolio's typed database schema.` |
| Git | `comfortable` | note: `Used to version and review the portfolio and project work.` |
| Figma | `comfortable` | `berbagi-image-discovery`, `car-showcase` |
| Security Mindset | `exploring` | note: `Applied through locked admin writes, input validation, and secure-by-default planning in this portfolio.` |

Export these exact collections:

```ts
export const journalEntries: JournalEntry[] = [
  {
    id: "reduce-interface-friction",
    label: "Trade-off",
    title: "A smaller interface can show clearer thinking",
    summary:
      "The article summarizer worked best when the experience focused on one primary action instead of exposing every possible control.",
    projectSlug: "ai-article-summarizer",
  },
  {
    id: "visual-density-needs-structure",
    label: "Assumption",
    title: "More content is only useful when navigation stays obvious",
    summary:
      "The image discovery project taught me to pair visual density with clear categories, readable targets, and predictable browsing.",
    projectSlug: "berbagi-image-discovery",
  },
  {
    id: "backend-depth-next",
    label: "Feedback",
    title: "A polished frontend is stronger when the system behind it is explainable",
    summary:
      "I am using this portfolio rebuild to deepen my understanding of data models, admin workflows, and secure defaults.",
  },
];

export const growthMilestones: GrowthMilestone[] = [
  {
    period: "2023–2024",
    title: "React projects and interface experiments",
    kind: "project",
    description:
      "Built media, maps, catalogue, image-discovery, and AI-assisted interfaces while learning reusable React patterns.",
  },
  {
    period: "2026",
    title: "Growing toward full-stack delivery",
    kind: "learning",
    description:
      "Rebuilding the portfolio with Next.js, Postgres, Drizzle, admin workflows, and secure-by-default decisions.",
  },
  {
    period: "Now",
    title: "Open to junior developer roles",
    kind: "career",
    description:
      "Looking for a team where I can contribute, learn quickly, and improve through thoughtful feedback.",
  },
];
```

- [ ] **Step 4: Run tests and static checks**

Run: `bun test src/lib/portfolio-content.test.ts && bun run typecheck && bun run lint`

Expected: all commands PASS.

- [ ] **Step 5: Commit the tested content model**

```bash
git add package.json src/lib/portfolio-content.ts src/lib/portfolio-content.test.ts
git commit -m "feat: model portfolio learning evidence"
```

### Task 2: Install the Approved Visual Foundation

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/app/visual-system.test.ts`
- Modify: `src/components/portfolio/ambient-background.tsx`
- Modify: `src/components/portfolio/reveal.tsx`
- Modify: `src/components/portfolio/text-effects.tsx`

**Interfaces:**
- Produces CSS variables: `--color-ink`, `--color-paper`, `--color-sky`, `--color-amber`, `--color-mist`, `--color-sand`
- Produces font variables: `--font-sans`, `--font-mono`
- Produces utilities: `.field-note`, `.field-label`, `.focus-ring`, `.editorial-label`
- Consumes: existing Framer Motion reduced-motion handling

- [ ] **Step 1: Write a failing token contract test**

Create `src/app/visual-system.test.ts`:

```ts
import { describe, expect, test } from "bun:test";

const css = await Bun.file(new URL("./globals.css", import.meta.url)).text();

describe("Living Field Notes visual system", () => {
  test.each([
    "--color-ink: #111111",
    "--color-paper: #f4f0e8",
    "--color-sky: #0ea5e9",
    "--color-amber: #d97706",
    "--color-mist: #dff3fb",
    "--color-sand: #f4e2c6",
  ])("defines %s", (token) => expect(css.toLowerCase()).toContain(token));

  test("defines field-note and reduced-motion rules", () => {
    expect(css).toContain(".field-note");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
```

- [ ] **Step 2: Run the visual contract test and verify it fails**

Run: `bun test src/app/visual-system.test.ts`

Expected: FAIL because the semantic variables and `.field-note` do not exist.

- [ ] **Step 3: Load fonts and create semantic tokens**

In `src/app/layout.tsx`, load fonts and attach their variables to `<body>`:

```ts
import { Archivo, IBM_Plex_Mono } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});
```

Set the body class to `${archivo.variable} ${plexMono.variable}`. In `globals.css`, replace repeated color literals in shared utilities with these root tokens:

```css
:root {
  color-scheme: light;
  --color-ink: #111111;
  --color-paper: #f4f0e8;
  --color-sky: #0ea5e9;
  --color-amber: #d97706;
  --color-mist: #dff3fb;
  --color-sand: #f4e2c6;
  --color-muted: #5f6b73;
  --color-rule: rgb(17 17 17 / 15%);
  background: var(--color-paper);
}

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans), sans-serif;
}

.field-note {
  border: 1px solid var(--color-rule);
  border-radius: 1.25rem;
  background: rgb(255 255 255 / 44%);
  box-shadow: 0 18px 50px rgb(17 17 17 / 8%);
}

.field-label,
.editorial-label {
  color: var(--color-muted);
  font-family: var(--font-mono), monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Align background and reveal behavior**

Use token-backed arbitrary values or shared utilities in `ambient-background.tsx`. Keep all background layers `aria-hidden`. In `reveal.tsx`, use a 0.5-second reveal with at most 18px vertical movement:

```tsx
initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
```

Keep `ScrambleText` available for small labels, but do not use `TypewriterText` in the new hero. Verify both effects render stable final text whenever reduced motion is active.

- [ ] **Step 5: Run the visual contract and application checks**

Run: `bun test src/app/visual-system.test.ts && bun run typecheck && bun run lint`

Expected: all commands PASS.

- [ ] **Step 6: Commit the visual foundation**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/visual-system.test.ts src/components/portfolio/ambient-background.tsx src/components/portfolio/reveal.tsx src/components/portfolio/text-effects.tsx
git commit -m "feat: establish living field notes visual system"
```

### Task 3: Build the Recruiter-Focused Header and Hero

**Files:**
- Modify: `src/components/portfolio/site-header.tsx`
- Create: `src/components/portfolio/field-note-card.tsx`
- Create: `src/components/portfolio/section-progress-rail.tsx`
- Modify: `src/components/portfolio/hero-section.tsx`
- Create: `src/components/portfolio/hero-content.test.tsx`

**Interfaces:**
- Consumes: `featuredProjects: Project[]`
- Produces: `FieldNoteCard()` with Build/Learn/Mind entries
- Produces: `SectionProgressRail({ sections }: { sections: Array<{ id: string; label: string }> })`
- Produces homepage anchors: `#work`, `#learning`, `#reflect`, `#journey`, `#contact`

- [ ] **Step 1: Write failing semantic tests for the static header and field note**

Create `src/components/portfolio/hero-content.test.tsx`:

```tsx
import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { FieldNoteCard } from "./field-note-card";
import { SiteHeader } from "./site-header";

describe("hero content", () => {
  test("field note exposes build, learn, and mindset evidence", () => {
    const html = renderToStaticMarkup(<FieldNoteCard />);
    expect(html).toContain("Current state");
    expect(html).toContain("Build");
    expect(html).toContain("Learn");
    expect(html).toContain("Mind");
    expect(html).not.toMatch(/<img/i);
  });

  test("public header advertises availability without exposing admin", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    expect(html).toContain("Open to junior roles");
    expect(html).not.toContain("Admin");
    expect(html).toContain("href=\"/#work\"");
    expect(html).toContain("<details");
    expect(html).toContain("Menu");
  });
});
```

- [ ] **Step 2: Run the hero tests and verify they fail**

Run: `bun test src/components/portfolio/hero-content.test.tsx`

Expected: FAIL because `FieldNoteCard` is missing and the header still contains Admin.

- [ ] **Step 3: Implement `FieldNoteCard` as a server component**

Create `field-note-card.tsx` with this content contract:

```tsx
const notes = [
  { label: "Build", text: "A portfolio that explains decisions, not just outcomes." },
  { label: "Learn", text: "Backend architecture, applied AI, and secure development." },
  { label: "Mind", text: "Open to feedback and willing to change direction when better evidence appears." },
];

export function FieldNoteCard() {
  return (
    <aside aria-labelledby="current-state-title" className="field-note relative p-5 lg:rotate-1">
      <span className="absolute -top-3 right-5 -rotate-2 bg-[var(--color-amber)] px-3 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white">
        Field note 001
      </span>
      <div className="flex items-center justify-between gap-4 pb-3">
        <h2 id="current-state-title" className="field-label">Current state</h2>
        <span className="font-mono text-xs text-[var(--color-muted)]">2026 / AU</span>
      </div>
      <dl>
        {notes.map((note) => (
          <div key={note.label} className="grid grid-cols-[4rem_1fr] gap-3 border-t border-[var(--color-rule)] py-4">
            <dt className="field-label text-[0.65rem]">{note.label}</dt>
            <dd className="font-semibold leading-6">{note.text}</dd>
          </div>
        ))}
      </dl>
      <p className="rounded-xl bg-[var(--color-ink)] px-4 py-3 font-mono text-xs text-[var(--color-paper)]">
        Next.js · TypeScript · Postgres
      </p>
    </aside>
  );
}
```

- [ ] **Step 4: Replace public navigation and rebuild the hero**

Set header links to Work, Learning, Journey, and Contact. Remove the Admin link and add a non-interactive status chip with visible text `Open to junior roles`. Keep the desktop navigation visible from `md` upward. On smaller screens render the same links inside a native `<details>` disclosure with a `<summary>` labeled `Menu`; style both summary and links with at least 44px touch targets and visible focus.

In `hero-section.tsx`:

- retain reduced-motion-safe Framer Motion entrance;
- remove the pointer-following glow and rotating `TypewriterText` roles;
- render the approved location, name, role, supporting message, actions, and `FieldNoteCard`;
- render the first three projects below as `PROOF 01` through `PROOF 03`;
- keep all CTA targets connected to real section IDs.
- animate the two name lines from at most 16px offset over 600–750ms, and render them directly in final position when reduced motion is active.

Use this content verbatim:

```tsx
<p className="field-label">Australia · learning, building, improving</p>
<h1>NICO<br />WIRANATA</h1>
<p>Curious full-stack developer</p>
<p>Learning and adapting in a fast-moving world—one useful project at a time.</p>
<a href="#work">Explore my work</a>
<a href="#journey">Follow my journey</a>
```

- [ ] **Step 5: Implement the progress rail**

Create a client component that observes section IDs and sets the active label. Use one observer and disconnect it during cleanup:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function SectionProgressRail({
  sections,
}: {
  sections: Array<{ id: string; label: string }>;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Portfolio story" className="section-progress-rail">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={activeId === section.id ? "location" : undefined}
          data-motion={reducedMotion ? "static" : "active"}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
```

Hide or collapse the rail below the tablet breakpoint without removing the same destinations from the main header.

- [ ] **Step 6: Run focused and static checks**

Run: `bun test src/components/portfolio/hero-content.test.tsx && bun run typecheck && bun run lint`

Expected: all commands PASS.

- [ ] **Step 7: Commit the header and hero**

```bash
git add src/components/portfolio/site-header.tsx src/components/portfolio/field-note-card.tsx src/components/portfolio/section-progress-rail.tsx src/components/portfolio/hero-section.tsx src/components/portfolio/hero-content.test.tsx
git commit -m "feat: build living field notes hero"
```

### Task 4: Turn Projects into Build Notes

**Files:**
- Modify: `src/components/portfolio/project-showcase.tsx`
- Create: `src/components/portfolio/project-showcase.test.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Project[]` with `problem`, `decision`, `lesson`, `stack`, and optional links
- Produces: server-rendered `ProjectShowcase({ projects }: { projects: Project[] })`
- Produces: `#work` section anchor

- [ ] **Step 1: Write failing build-note rendering tests**

Create `src/components/portfolio/project-showcase.test.tsx`:

```tsx
import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { projects } from "@/lib/portfolio-content";
import { ProjectShowcase } from "./project-showcase";

describe("ProjectShowcase", () => {
  test("renders decision and learning evidence", () => {
    const html = renderToStaticMarkup(<ProjectShowcase projects={[projects[0]]} />);
    expect(html).toContain("Problem");
    expect(html).toContain("Decision");
    expect(html).toContain("Learned");
    expect(html).toContain(projects[0].decision);
    expect(html).toContain(projects[0].lesson);
  });

  test("does not render unavailable repository or live links", () => {
    const html = renderToStaticMarkup(<ProjectShowcase projects={[projects[0]]} />);
    expect(html).not.toContain("View source");
    expect(html).not.toContain("Open live project");
  });

  test("uses a reserved text cover when an image is unavailable", () => {
    const project = { ...projects[0], coverImageUrl: undefined };
    const html = renderToStaticMarkup(<ProjectShowcase projects={[project]} />);
    expect(html).toContain("Project preview unavailable");
    expect(html).toContain(project.title);
  });
});
```

- [ ] **Step 2: Run the project test and verify it fails**

Run: `bun test src/components/portfolio/project-showcase.test.tsx`

Expected: FAIL because the current client component does not render Decision or Learned.

- [ ] **Step 3: Replace the grid/list switcher with list-first build notes**

Remove `"use client"`, `useState`, and the view-mode buttons. Each project article must include:

```tsx
<article>
  <p className="field-label">{`Build note ${String(index + 1).padStart(2, "0")}`}</p>
  <h3>{project.title}</h3>
  <p>{project.summary}</p>
  <dl>
    <div><dt>Problem</dt><dd>{project.problem}</dd></div>
    <div><dt>Decision</dt><dd>{project.decision}</dd></div>
    <div><dt>Learned</dt><dd>{project.lesson}</dd></div>
  </dl>
  <Link href={`/projects/${project.slug}`}>Read the case study</Link>
  {project.links.github ? <a href={project.links.github}>View source</a> : null}
  {project.links.live ? <a href={project.links.live}>Open live project</a> : null}
</article>
```

Retain optimized project screenshots with explicit width, height, and aspect ratio. When `coverImageUrl` is absent, render a same-aspect-ratio `div` with `role="img"`, an accessible label formed from the project title plus `project preview unavailable`, and visible `Project preview unavailable` text followed by the project title. Put the section at `id="work"`.

Use hover and focus-within only to emphasize the visible `Learned` row; do not hide the lesson by default. Touch and keyboard users must receive the same content without an extra gesture.

- [ ] **Step 4: Align project detail pages with the same evidence structure**

Update `src/app/projects/[slug]/page.tsx` to use semantic color utilities and render Problem, Decision, and Learned before the remaining content entries. Add `target="_blank" rel="noreferrer"` to external live and source links. Hide absent actions. Use the same reserved text cover as `ProjectShowcase` when `coverImageUrl` is absent.

- [ ] **Step 5: Run tests and application checks**

Run: `bun test src/components/portfolio/project-showcase.test.tsx && bun run typecheck && bun run lint`

Expected: all commands PASS.

- [ ] **Step 6: Commit build notes**

```bash
git add src/components/portfolio/project-showcase.tsx src/components/portfolio/project-showcase.test.tsx 'src/app/projects/[slug]/page.tsx'
git commit -m "feat: present projects as build notes"
```

### Task 5: Replace Generic Skills, Q&A, and Timeline with the Page Story

**Files:**
- Create: `src/components/portfolio/learning-path.tsx`
- Create: `src/components/portfolio/decision-journal.tsx`
- Create: `src/components/portfolio/growth-changelog.tsx`
- Create: `src/components/portfolio/story-sections.test.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/components/portfolio/skill-graph.tsx`
- Delete: `src/components/portfolio/qa-section.tsx`
- Delete: `src/components/portfolio/timeline-section.tsx`

**Interfaces:**
- Consumes: `skills: Skill[]`, `projects: Project[]`, `entries: JournalEntry[]`, `milestones: GrowthMilestone[]`
- Produces: `#learning`, `#reflect`, and `#journey` sections
- Consumes from Task 3: `SectionProgressRail`

- [ ] **Step 1: Write failing server-render tests for the three story sections**

Create `src/components/portfolio/story-sections.test.tsx`:

```tsx
import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import {
  growthMilestones,
  journalEntries,
  projects,
  skills,
} from "@/lib/portfolio-content";
import { DecisionJournal } from "./decision-journal";
import { GrowthChangelog } from "./growth-changelog";
import { LearningPath } from "./learning-path";

describe("portfolio story sections", () => {
  test("learning path uses named states without percentages", () => {
    const html = renderToStaticMarkup(<LearningPath skills={skills} projects={projects} />);
    expect(html).toContain("Comfortable now");
    expect(html).toContain("Actively learning");
    expect(html).toContain("Exploring next");
    expect(html).not.toMatch(/\d+%/);
  });

  test("journal and changelog render grounded labels", () => {
    const journal = renderToStaticMarkup(<DecisionJournal entries={journalEntries} />);
    const changelog = renderToStaticMarkup(<GrowthChangelog milestones={growthMilestones} />);
    expect(journal).toContain("Decision journal");
    expect(changelog).toContain("Growth changelog");
    expect(changelog).toContain("Open to junior developer roles");
  });
});
```

- [ ] **Step 2: Run the tests and verify missing components fail**

Run: `bun test src/components/portfolio/story-sections.test.tsx`

Expected: FAIL because the three components do not exist.

- [ ] **Step 3: Implement `LearningPath` with evidence links**

Use this exact state-label map:

```ts
const stageLabels = {
  comfortable: "Comfortable now",
  learning: "Actively learning",
  exploring: "Exploring next",
} satisfies Record<LearningStage, string>;
```

Group `skills` by state, render each skill name and category, map `evidenceSlugs` to project titles and `/projects/[slug]` links, and render `evidenceNote` when present. Do not render a progress bar, percentage, or decorative skill icon wall.

- [ ] **Step 4: Implement `DecisionJournal` and `GrowthChangelog`**

`DecisionJournal` renders each entry's label, title, summary, and optional case-study link. `GrowthChangelog` renders each period, title, description, and visible kind label (`Project`, `Learning`, or `Career`) so milestones cannot be mistaken for employment.

Both are server components wrapped in the existing `Reveal` component and use semantic `<section>`, `<article>`, `<h2>`, and `<h3>` structure.

- [ ] **Step 5: Wire the approved homepage order and remove replaced components**

Update `src/app/page.tsx` to render:

```tsx
<main className="min-h-screen overflow-hidden">
  <AmbientBackground />
  <SiteHeader />
  <SectionProgressRail
    sections={[
      { id: "work", label: "Build" },
      { id: "learning", label: "Learn" },
      { id: "reflect", label: "Reflect" },
      { id: "journey", label: "Journey" },
    ]}
  />
  <HeroSection featuredProjects={getFeaturedProjects()} />
  <ProjectShowcase projects={projects} />
  <LearningPath skills={skills} projects={projects} />
  <DecisionJournal entries={journalEntries} />
  <GrowthChangelog milestones={growthMilestones} />
  <ContactSection />
</main>
```

Delete the three replaced component files only after imports are removed and the new page compiles.

- [ ] **Step 6: Run focused tests and static checks**

Run: `bun test src/components/portfolio/story-sections.test.tsx && bun run typecheck && bun run lint`

Expected: all commands PASS and no import references to deleted components remain.

- [ ] **Step 7: Commit the complete page story**

```bash
git add src/app/page.tsx src/components/portfolio/learning-path.tsx src/components/portfolio/decision-journal.tsx src/components/portfolio/growth-changelog.tsx src/components/portfolio/story-sections.test.tsx src/components/portfolio/skill-graph.tsx src/components/portfolio/qa-section.tsx src/components/portfolio/timeline-section.tsx
git commit -m "feat: connect portfolio growth story"
```

### Task 6: Make Contact Submission Honest and Accessible

**Files:**
- Create: `src/lib/contact-validation.ts`
- Create: `src/lib/contact-validation.test.ts`
- Modify: `src/server/contact-actions.ts`
- Modify: `src/components/portfolio/contact-section.tsx`

**Interfaces:**
- Produces: `ContactFormState`
- Produces: `validateContactForm(formData: FormData): ValidationResult`
- Changes action signature to `createContactMessage(previousState: ContactFormState, formData: FormData): Promise<ContactFormState>`

- [ ] **Step 1: Write failing validation tests**

Create `src/lib/contact-validation.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { validateContactForm } from "./contact-validation";

function form(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe("validateContactForm", () => {
  test("returns field errors for missing and invalid values", () => {
    const result = validateContactForm(form({ name: "", email: "bad", message: "" }));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.state.fieldErrors.name).toBeTruthy();
      expect(result.state.fieldErrors.email).toBeTruthy();
      expect(result.state.fieldErrors.message).toBeTruthy();
    }
  });

  test("normalizes a valid message", () => {
    const result = validateContactForm(
      form({ name: " Nico ", email: " nico@example.com ", message: " Hello team " }),
    );
    expect(result).toEqual({
      ok: true,
      data: { name: "Nico", email: "nico@example.com", message: "Hello team" },
    });
  });
});
```

- [ ] **Step 2: Run tests and verify the module is missing**

Run: `bun test src/lib/contact-validation.test.ts`

Expected: FAIL because `contact-validation.ts` does not exist.

- [ ] **Step 3: Implement pure validation**

Create `src/lib/contact-validation.ts`:

```ts
export type ContactField = "name" | "email" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<ContactField, string>>;
};

type ContactData = Record<ContactField, string>;

export type ValidationResult =
  | { ok: true; data: ContactData }
  | { ok: false; state: ContactFormState };

export const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export function validateContactForm(formData: FormData): ValidationResult {
  const data: ContactData = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!data.name) fieldErrors.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(data.email)) fieldErrors.email = "Enter a valid email address.";
  if (data.message.length < 10) fieldErrors.message = "Write at least 10 characters.";
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, state: { status: "error", message: "Check the highlighted fields.", fieldErrors } };
  }
  return { ok: true, data };
}
```

- [ ] **Step 4: Return explicit states from the server action**

Update `createContactMessage` to accept the previous state, validate before database access, return a clear configuration error when `getOptionalDb()` is absent, catch insert errors without logging message contents, and return success after insertion:

```ts
export async function createContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = validateContactForm(formData);
  if (!result.ok) return result.state;
  const db = getOptionalDb();
  if (!db) return { status: "error", message: "Messaging is temporarily unavailable. Please use email instead.", fieldErrors: {} };
  try {
    await db.insert(contactMessages).values(result.data);
    revalidatePath("/");
    return { status: "success", message: "Thanks—your message has been received.", fieldErrors: {} };
  } catch {
    return { status: "error", message: "The message could not be sent. Please try email instead.", fieldErrors: {} };
  }
}
```

- [ ] **Step 5: Add labeled fields and submission feedback**

Make `ContactSection` a client component using `useActionState(createContactMessage, initialContactState)`. Use visible `<label>` elements, `aria-invalid`, `aria-describedby`, inline field errors, a `role="status" aria-live="polite"` response message, and a disabled submit button whose text becomes `Sending…` while pending.

Use the approved invitation verbatim:

```tsx
<p>I’m looking for a team where I can contribute, learn quickly, and grow through good feedback.</p>
```

Keep email and telephone links. Add GitHub and résumé only after their verified values exist; do not use `https://github.com` as a fallback.

- [ ] **Step 6: Run validation and application checks**

Run: `bun test src/lib/contact-validation.test.ts && bun run typecheck && bun run lint`

Expected: all commands PASS.

- [ ] **Step 7: Commit accessible contact behavior**

```bash
git add src/lib/contact-validation.ts src/lib/contact-validation.test.ts src/server/contact-actions.ts src/components/portfolio/contact-section.tsx
git commit -m "feat: add accessible contact feedback"
```

### Task 7: Final Metadata, Responsive, Accessibility, and Browser Verification

**Files:**
- Modify: `src/app/layout.tsx`
- Modify as failures require: files changed in Tasks 2–6

**Interfaces:**
- Consumes: completed homepage and project-detail implementation
- Produces: verified production build and browser QA evidence

- [ ] **Step 1: Update public metadata to the approved position**

Set the default title to `Nico Wiranata | Curious Full-stack Developer` and the description to:

```text
Portfolio of Nico Wiranata, a curious full-stack developer in Australia learning, building, and improving through useful web projects.
```

Use the same positioning in Open Graph metadata. Keep the existing metadata base unless the deployment domain changes.

- [ ] **Step 2: Run the complete automated suite**

Run: `bun test && bun run lint && bun run typecheck && bun run build`

Expected: all tests pass, ESLint reports no errors, TypeScript emits no errors, and Next.js completes a production build.

- [ ] **Step 3: Run desktop browser smoke checks at 1440px**

Start the app with `bun run dev`. In browser automation:

1. Open `http://localhost:3000`.
2. Set viewport to `1440x1000`.
3. Confirm there are no console errors and no failed document, stylesheet, script, font, or image requests.
4. Confirm the first viewport shows Nico's name, role, availability, work CTA, field note, and three proof links without personal imagery.
5. Activate every public navigation link and verify it reaches the correct section.
6. Verify no public Admin action is present.

- [ ] **Step 4: Run responsive checks at 375px, 768px, and 1024px**

At each viewport:

1. Check `document.documentElement.scrollWidth <= window.innerWidth`.
2. Confirm the field note stacks below the introduction on mobile.
3. Confirm headings are not clipped.
4. Confirm all interactive targets are at least 44px high or wide where the layout permits.
5. Confirm project evidence and contact labels remain readable without hover.

Expected: no horizontal overflow, obscured content, or unreachable action.

- [ ] **Step 5: Verify keyboard and reduced-motion behavior**

Using only Tab, Shift+Tab, Enter, and Escape:

1. Traverse header navigation, hero actions, project links, learning evidence, journal links, and contact controls in DOM order.
2. Confirm every focused control has a visible focus ring.
3. Emulate `prefers-reduced-motion: reduce` and reload.
4. Confirm the hero is immediately readable, text does not type or scramble, pointer-following effects do not run, and the story rail remains static and usable.

- [ ] **Step 6: Run accessibility audit and manually verify semantics**

Run a Lighthouse accessibility snapshot on the homepage and one project detail page. Resolve all critical violations. Manually verify one `<main>`, ordered headings, named navigation landmarks, associated contact labels, form error descriptions, meaningful project image alt text, and decorative icon hiding.

- [ ] **Step 7: Verify release claims and optional actions**

Search the rendered page and source for:

```text
expert
senior
AI Engineer
Security Specialist
https://github.com
resume
résumé
```

Expected: no inflated role claim, no generic GitHub destination, and no résumé action unless a real file or URL was supplied. Confirm the growth changelog labels personal work as Project or Learning, not Employment.

- [ ] **Step 8: Commit final metadata and verified fixes**

Stage only files changed to satisfy this task, inspect `git diff --cached`, then commit:

```bash
git commit -m "chore: verify living field notes portfolio"
```

- [ ] **Step 9: Record final status**

Run: `git status --short`

Expected: only pre-existing unrelated user changes remain. Report test, build, viewport, keyboard, reduced-motion, and accessibility results with any unresolved item labeled explicitly.
