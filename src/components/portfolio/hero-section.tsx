import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/portfolio-content";

const notes = [
  { label: "Building", text: "This portfolio with Next.js and TypeScript." },
  { label: "Learning", text: "Backend architecture, Postgres, and Drizzle." },
  { label: "Exploring", text: "Applied AI and secure development." }
];

export function HeroSection({ featuredProjects }: { featuredProjects: Project[] }) {
  return (
    <section className="relative px-5 pb-10 pt-10 sm:pt-16 md:px-6 lg:pt-20" aria-labelledby="intro-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="editorial-label flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              Australia
            </p>
            <h1 id="intro-title" className="mt-5 text-[clamp(2.9rem,11.8vw,9rem)] font-black uppercase leading-[0.83] tracking-[-0.088em] text-[var(--ink)] lg:text-[clamp(5.9rem,9.3vw,9rem)]">
              <span className="block">Nico{" "}</span>
              <span className="block">Wiranata</span>
            </h1>
            <p className="mt-6 text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
              Curious full-stack developer
            </p>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-[var(--muted-ink)] sm:text-lg">
              I build web interfaces with React and TypeScript and use personal projects to deepen my backend skills.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" className="portfolio-button portfolio-button-primary">
                Explore my work <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </a>
              <a href="#contact" className="portfolio-button portfolio-button-secondary">
                Get in touch <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside aria-labelledby="current-state" className="field-note rounded-xl border border-[var(--rule)] p-6 sm:p-8">
            <p className="editorial-label">Field notes</p>
            <h2 id="current-state" className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
              What I’m working on
            </h2>
            <dl className="mt-6 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {notes.map(({ label, text }) => (
                <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-3 py-4">
                  <dt className="font-mono text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{label}</dt>
                  <dd className="text-sm leading-relaxed text-[var(--muted-ink)] sm:text-base">{text}</dd>
                </div>
              ))}
            </dl>
            <a href="#stack" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-[var(--accent)] hover:underline">
              See what I’m learning <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </aside>
        </div>

        {featuredProjects.length > 0 && (
          <div id="more" className="mt-12 border-t border-[var(--rule)] pt-5 sm:mt-16">
            <h2 className="editorial-label">Featured projects</h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="group flex h-full items-center gap-3 rounded-lg border border-[var(--rule)] bg-white/40 p-2.5 transition-colors hover:border-[var(--accent)] hover:bg-white/80 sm:gap-4">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-[var(--paper)]">
                      <Image src={project.coverImageUrl} alt="" fill sizes="80px" className="object-cover object-top" />
                    </div>
                    <span className="min-w-0 flex-1 text-sm font-semibold leading-snug sm:text-base">{project.title}</span>
                    <ArrowUpRight aria-hidden="true" className="mr-1 h-4 w-4 shrink-0 text-[var(--accent)] transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
