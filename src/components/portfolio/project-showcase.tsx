"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Grid2X2, List } from "lucide-react";
import type { Project } from "@/lib/portfolio-content";
import { Reveal } from "@/components/portfolio/reveal";
import { ScrambleText } from "@/components/portfolio/text-effects";

type ViewMode = "grid" | "list";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <section id="projects" className="px-5 py-28 md:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="editorial-rule grid gap-8 pt-8 lg:grid-cols-[0.52fr_1fr]">
          <div>
            <p className="editorial-label">
              <ScrambleText text="case studies" />
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#111111] md:text-7xl">
              I build products
            </h2>
          </div>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-xl text-xl leading-8 tracking-[-0.03em] text-[#333333]">
              Projects are presented as decisions, constraints, and outcomes —
              not just screenshots. The admin area will let you add new studies
              without touching the code.
            </p>
            <div className="flex w-fit rounded-full border border-black/15 p-1">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  viewMode === "list"
                    ? "bg-[#111111] text-[#f4f0e8]"
                    : "text-[#5f6b73] hover:bg-black/[0.06]"
                }`}
              >
                <List className="h-4 w-4" />
                List
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  viewMode === "grid"
                    ? "bg-[#111111] text-[#f4f0e8]"
                    : "text-[#5f6b73] hover:bg-black/[0.06]"
                }`}
              >
                <Grid2X2 className="h-4 w-4" />
                Grid
              </button>
            </div>
          </div>
        </Reveal>

        {viewMode === "list" ? (
          <div className="mt-12 border-t border-black/15">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid gap-6 border-b border-black/15 py-7 transition hover:bg-black/[0.035] md:grid-cols-[5rem_1fr_12rem]"
                >
                  <p className="editorial-label">
                    <ScrambleText text={`0${index + 1}`} />
                  </p>
                  <div>
                    <p className="text-3xl font-semibold tracking-[-0.055em] text-[#111111] md:text-5xl">
                      {project.title}
                    </p>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6b73]">
                      {project.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-black/15 px-3 py-1 text-xs text-[#5f6b73]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-black/15 bg-[#111111]">
                    <Image
                      src={project.coverImageUrl}
                      alt={project.coverImageAlt}
                      width={420}
                      height={280}
                      className="aspect-[4/3] object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#f4f0e8] text-[#111111] transition group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group paper-card overflow-hidden rounded-[1.8rem] p-3 transition hover:-translate-y-1 hover:border-black/30"
              >
                <Image
                  src={project.coverImageUrl}
                  alt={project.coverImageAlt}
                  width={780}
                  height={520}
                  className="aspect-[16/10] rounded-[1.35rem] object-cover grayscale transition duration-500 group-hover:grayscale-0"
                />
                <div className="p-4">
                  <p className="editorial-label">
                    <ScrambleText text={`0${index + 1}`} />
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-[#111111]">
                    {project.title}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5f6b73]">
                    {project.summary}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
