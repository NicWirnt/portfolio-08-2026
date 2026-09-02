# Living Field Notes Portfolio Design

Date: 2026-09-02

## Summary

The portfolio will present Nico Wiranata as a curious full-stack developer who is learning and adapting in a fast-moving world. Its primary audience is employers hiring junior developers.

The approved direction, **Living Field Notes**, retains the current warm editorial foundation while turning growth into the site's signature. The experience will show what Nico builds, what he is learning, how feedback changes his thinking, and where he is heading. It will not use an image of Nico.

## Goals

- Give employers a clear, credible understanding of Nico within five seconds.
- Communicate curiosity, open-mindedness, adaptability, and steady growth without presenting uncertainty as a weakness.
- Position Nico for junior full-stack roles while making his frontend evidence easy to recognize.
- Make projects demonstrate decisions and learning, not only finished screenshots.
- Create a memorable opening through typography, field-note structure, and restrained interaction.
- Keep essential content fast, accessible, responsive, and easy to scan.

## Non-goals

- Do not present Nico as an expert, senior engineer, AI engineer, or security specialist.
- Do not present personal projects as formal employment.
- Do not use proficiency percentages or unsupported performance metrics.
- Do not add a photograph, portrait, avatar, silhouette, or generated representation of Nico.
- Do not add WebGL, a 3D scene, a custom cursor, a fake loading screen, or motion that delays access to work.
- Do not redesign the admin system or database as part of this visual implementation.

## Audience and Positioning

The primary audience is recruiters, hiring managers, and engineering leads considering junior developers.

Primary role:

> Curious full-stack developer

Supporting message:

> Learning and adapting in a fast-moving world—one useful project at a time.

The supporting evidence will emphasize React, TypeScript, Next.js, interface implementation, API integration, and growing backend experience with Postgres and Drizzle. Applied AI and security remain learning directions rather than headline expertise.

## Design Principles

### Quiet confidence

The writing can acknowledge learning, changed assumptions, and feedback. Visual quality, clear structure, and concrete project evidence provide confidence without inflated claims.

### Growth as evidence

Each major section connects to one stage of the same loop:

> Build → Learn → Reflect → Improve

### Recruiter clarity

Role, availability, location, featured work, technologies, and contact routes must be apparent without decoding the visual concept.

### Distinctive but restrained

The field-note metaphor appears through annotations, labels, rules, stamps, and small rotations. It must not reduce readability or become decorative clutter.

## Homepage Information Architecture

The homepage follows this order:

1. **Living introduction**
2. **Selected build notes**
3. **Current learning path**
4. **Decision journal**
5. **Growth changelog**
6. **Start a conversation**

The existing Q&A content will be reshaped into the decision journal. The existing skill graph will become the learning path. The existing timeline will become the growth changelog.

## Hero Design

The hero uses the current oversized name treatment and warm paper background. It contains two primary columns on desktop and one column on mobile.

### Left column

- Small label: `Australia · learning, building, improving`
- Oversized name: `NICO WIRANATA`
- Role: `Curious full-stack developer`
- Supporting message: `Learning and adapting in a fast-moving world—one useful project at a time.`
- Primary action: `Explore my work`
- Secondary action: `Follow my journey`

### Right column

An image-free field-note card titled `Current state` contains three truthful entries:

- **Build:** A portfolio that explains decisions, not just outcomes.
- **Learn:** Backend architecture, applied AI, and secure development.
- **Mind:** Open to feedback and willing to change direction when better evidence appears.

The card ends with the current core stack: `Next.js · TypeScript · Postgres`.

### Supporting proof

Three featured project links appear immediately below the hero as `PROOF 01`, `PROOF 02`, and `PROOF 03`. They provide direct routes to the strongest available case studies.

### Availability

The header displays `Open to junior roles` with a small status marker. The public header will not display an Admin link. The admin route remains available directly and retains its existing protection.

## Selected Build Notes

The project section becomes a set of focused case-study entries. Project screenshots may remain because the no-image constraint applies to personal imagery, not project evidence.

Each featured project must communicate:

- **Problem:** What needed solving?
- **Decision:** What implementation or design choice did Nico make?
- **Learned:** What did Nico learn, and what would he improve next?
- **Evidence:** Role, year, relevant stack, repository link, and live link when they actually exist.

The list view is the primary presentation because it is faster to scan and better suited to written evidence. A grid/list toggle is unnecessary unless user testing demonstrates a real need.

## Current Learning Path

The current skill cards and arbitrary progress bars will be removed. Skills will be grouped by honest learning state:

- **Comfortable now:** technologies supported by multiple projects.
- **Actively learning:** technologies currently used but still developing.
- **Exploring next:** credible near-term learning directions.

Every skill should link or refer to at least one project, build note, or concrete learning activity. The section must not imply numerical proficiency.

Initial positioning:

- Comfortable now: React, TypeScript, responsive interface implementation.
- Actively learning: Next.js full-stack patterns, Postgres, Drizzle, backend architecture.
- Exploring next: applied AI workflows and secure-by-default application design.

## Decision Journal

The existing abstract Q&A becomes short entries grounded in actual work. Each entry uses one of these structures:

- A mistaken assumption and what corrected it.
- Feedback received and what changed afterward.
- A trade-off considered and why one direction was chosen.
- A problem that remains unresolved and what Nico would investigate next.

Entries must refer to real projects or real learning. Generic thought-leadership statements are not sufficient.

## Growth Changelog

The timeline shows progression without treating project periods as employment history.

Initial milestones:

- **2023–2024:** React projects and interface experiments across media, maps, catalogs, and AI-assisted tools.
- **2026:** Portfolio rebuild using Next.js, data persistence, admin workflows, and secure defaults.
- **Now:** Seeking a junior role with feedback, collaboration, and room to develop full-stack depth.

If verified employment or education details are added later, they must be labeled by type so employers can distinguish employment, education, personal work, and ongoing learning.

## Contact Section

The final invitation is:

> I’m looking for a team where I can contribute, learn quickly, and grow through good feedback.

The section provides email, GitHub, résumé, and the existing contact form. A résumé action appears only after a real résumé file or URL is available. The generic `https://github.com` placeholder must be replaced with Nico's verified profile before release.

The form must have visible labels, pending feedback, a success state, an error state, and errors associated with their fields. Placeholder text is supplementary and not the only label.

## Visual System

### Color roles

- Ink: `#111111` — primary text and strong surfaces.
- Paper: `#F4F0E8` — primary background.
- Curiosity sky: `#0EA5E9` — focus, active learning, and primary interaction accents.
- Reflection amber: `#D97706` — field-note stamps and reflective content.
- Learning mist: `#DFF3FB` — quiet highlighted sections.
- Warm sand: `#F4E2C6` — journey and history sections.

These colors become semantic CSS custom properties. Components should use the tokens instead of repeating raw hexadecimal values.

### Typography

- **Archivo variable:** expressive headings and readable body copy.
- **IBM Plex Mono:** dates, field-note labels, statuses, evidence markers, and technical annotations.

Fonts should be loaded through `next/font` to avoid layout shift and unnecessary external runtime requests. Body text remains at least 16px with a readable line height.

### Shape and texture

- Large headings use tight tracking and compact line height.
- Most surfaces remain flat with visible editorial rules.
- Field notes may use a subtle one-degree rotation, but body content remains level.
- Pills are reserved for concise statuses or technology labels and are not used as general decoration.
- Shadows remain soft and low contrast.

## Motion and Interaction

Motion communicates sequence and state rather than decoration.

### Initial load

- Name lines resolve from small positional offsets over 600–750ms.
- The field-note card settles into place with a subtle rotation.
- Essential text is present in the DOM immediately and does not wait for animation.

### Scrolling

A small annotation rail tracks the page story: `Build → Learn → Reflect → Journey`. It advances as sections enter the viewport and also acts as a compact progress indicator.

Sections reveal once using slight opacity and vertical movement. Long chained animations are not allowed.

### Projects

Hover and focus may reveal a short `what I learned` annotation. The same content must remain available on touch devices and through keyboard interaction; no evidence may be hover-only.

### Reduced motion

When `prefers-reduced-motion: reduce` is enabled:

- All content renders in its final position.
- The annotation rail becomes a static section marker.
- Pointer-following effects do not run.
- Auto-typing and scrambling effects render stable text immediately.

## Responsive Design

- Desktop uses the two-column hero with the field note aligned to the introduction.
- Tablet and mobile stack the field note below the role and supporting message.
- The project list becomes a single readable column.
- The annotation rail becomes a compact top or side marker and must not obscure content.
- Navigation simplifies to a keyboard-accessible menu while keeping Work, Journey, and Contact reachable.
- No viewport may produce horizontal scrolling at 375px, 768px, 1024px, or 1440px widths.

## Accessibility

- Text and interactive elements must meet WCAG 2.2 AA contrast requirements.
- Interactive targets must be at least 44 by 44 CSS pixels where practical.
- Focus states must remain clearly visible on every interactive element.
- Page landmarks, heading order, links, buttons, and form labels must use semantic HTML.
- Icons that repeat visible text are decorative and hidden from assistive technology.
- Color is never the only way to communicate learning state, status, or progress.
- Keyboard users must be able to reach all navigation, projects, and form controls in a logical order.

## Component Boundaries

Implementation should preserve focused components:

- `SiteHeader`: public navigation and junior-role availability.
- `HeroSection`: introduction, actions, and featured-project proof rail.
- `FieldNoteCard`: current Build, Learn, and Mind entries.
- `SectionProgressRail`: scroll-aware page-story indicator with a static reduced-motion mode.
- `ProjectShowcase`: list-first build notes and project evidence.
- `LearningPath`: honest skill states tied to evidence.
- `DecisionJournal`: project-grounded reflection entries.
- `GrowthChangelog`: typed timeline milestones.
- `ContactSection`: invitation, contact routes, and accessible form states.

The implementation may extract additional small presentational components when doing so reduces repetition. It should not introduce a new state-management library.

## Content and Data Flow

The first implementation continues using `src/lib/portfolio-content.ts` as the source of truth. It may extend the existing types to include:

- project decisions and lessons;
- skill learning state and evidence links;
- journal entry type and related project;
- changelog milestone type.

The page remains server-rendered wherever interaction is unnecessary. Client components are limited to motion, the progress rail, project interaction, and contact-form feedback.

No database migration is required for the initial visual redesign. Admin-managed versions of the new fields are a separate future task.

## Error and Empty States

- Optional project links are omitted when unavailable rather than rendered as dead controls.
- A missing project image uses a reserved, text-based project cover so layout does not shift.
- Empty learning groups are not rendered.
- A missing résumé omits the résumé action.
- Contact submission displays pending, success, validation, and server-error feedback without clearing the user's message on failure.
- Unsupported JavaScript or reduced-motion environments still receive all core content and navigation.

## Verification

Implementation is complete only after:

- ESLint, TypeScript type checking, and the production build pass.
- The page is visually checked at 375px, 768px, 1024px, and 1440px.
- There is no horizontal overflow or text clipping.
- Navigation, project links, and contact controls work with keyboard only.
- Reduced-motion mode contains no pointer-following or auto-typing animation.
- Automated accessibility checks report no critical WCAG violations, followed by a manual focus-order and landmark review.
- Console and network checks show no unexpected errors or missing assets.
- No personal image appears anywhere in the public portfolio.
- Public claims, project links, GitHub URL, availability, and résumé availability are verified before release.

## Approved Scope

This specification covers the public portfolio homepage and shared visual language. Project detail pages should inherit the tokens and field-note style, but substantial case-study content rewriting can be implemented incrementally after the homepage direction is established.
