"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Grid2X2, List } from "lucide-react";
import type { Project } from "@/lib/portfolio-content";

const viewOptions = [
  { mode: "list", label: "List", Icon: List },
  { mode: "grid", label: "Grid", Icon: Grid2X2 }
] as const;

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const isGrid = viewMode === "grid";

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-5 py-12 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="editorial-rule flex flex-wrap items-end justify-between gap-5 pt-8">
          <div>
            <p className="editorial-label">Case studies</p>
            <h2 id="projects-title" className="mt-3 text-balance text-5xl font-black leading-none tracking-[-0.065em] sm:text-7xl">
              Selected work
            </h2>
          </div>
          <div role="group" aria-label="Project layout" className="flex gap-1 rounded-lg border border-[var(--rule)] bg-white/40 p-1">
            {viewOptions.map(({ mode, label, Icon }) => (
              <button
                key={mode}
                type="button"
                aria-pressed={viewMode === mode}
                onClick={() => setViewMode(mode)}
                className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--muted-ink)] transition-colors hover:bg-[var(--learning-mist)] aria-pressed:bg-[var(--ink)] aria-pressed:text-white"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <ul className={isGrid ? "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "mt-8 grid gap-3"}>
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className={`group grid h-full rounded-xl border border-[var(--rule)] bg-white/40 p-3 transition-colors hover:border-[var(--accent)] hover:bg-white/80 ${isGrid ? "content-start" : "md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:grid-cols-[18rem_minmax(0,1fr)]"}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[var(--paper)]">
                  <Image
                    src={project.coverImageUrl}
                    alt={project.coverImageAlt}
                    fill
                    sizes={isGrid ? "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 288px, (min-width: 768px) 33vw, 100vw"}
                    className="object-cover object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center px-2 pb-2 pt-4 sm:p-5">
                  <p className="font-mono text-xs uppercase tracking-wide text-[var(--accent)]">{project.year} · {project.role}</p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{project.title}</h3>
                    <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  </div>
                  <p className="mt-2 max-w-prose leading-relaxed text-[var(--muted-ink)]">{project.summary}</p>
                  <ul aria-label="Technologies and topics" className="mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((item) => (
                      <li key={item} className="rounded-full border border-[var(--rule)] px-2.5 py-1 text-xs font-medium text-[var(--muted-ink)]">{item}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
