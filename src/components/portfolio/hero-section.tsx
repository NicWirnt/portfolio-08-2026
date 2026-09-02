"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight, Github, Mail } from "lucide-react";
import type { Project } from "@/lib/portfolio-content";
import {
  ScrambleText,
  TypewriterText,
} from "@/components/portfolio/text-effects";

export function HeroSection({
  featuredProjects,
}: {
  featuredProjects: Project[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 80, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 80, damping: 20 });

  return (
    <section
      className="relative min-h-screen px-5 pb-20 pt-32 md:px-6 lg:pt-36"
      onPointerMove={(event) => {
        if (prefersReducedMotion) {
          return;
        }
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(event.clientX - bounds.left);
        pointerY.set(event.clientY - bounds.top);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-sky-300/20 blur-3xl"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end"
        >
          <div>
            <h1 className="text-[15.5vw] font-black uppercase leading-[0.82] tracking-[-0.1em] text-[#111111] sm:text-[22vw] sm:leading-[0.78] sm:tracking-[-0.12em] md:text-[15vw] lg:text-[11rem]">
              <span className="block">NICO</span>
              <span className="block sm:pl-[0.18em]">WIRANATA</span>
            </h1>
            <div className="mt-8 grid gap-8 border-t border-black/15 pt-7 md:grid-cols-[0.7fr_1fr]">
              <div>
                <p className="editorial-label">
                  <ScrambleText text="Australia" />
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 border-b border-black pb-1 text-base font-semibold text-[#111111] transition hover:text-sky-600 focus-ring"
                  >
                    case studies
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#more"
                    className="group inline-flex items-center gap-2 border-b border-black/30 pb-1 text-base font-semibold text-[#111111] transition hover:border-black hover:text-sky-600 focus-ring"
                  >
                    more works
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              <p className="min-h-[4.8rem] max-w-2xl text-2xl leading-tight tracking-[-0.04em] text-[#111111] md:text-4xl">
                <TypewriterText
                  text="Full-stack Developer"
                  phrases={[
                    "Applied AI Engineer",
                    "Front-end Developer",
                    "Systems Developer",
                  ]}
                />
              </p>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="paper-card gradient-border relative overflow-hidden rounded-[2rem] p-3 shadow-[0_28px_90px_rgba(17,17,17,0.12)]"
          >
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-[#111111]">
              {["Next.js", "AI UX", "Postgres"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-black/10 bg-white/35 px-3 py-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-[#f4f0e8] shadow-[0_14px_34px_rgba(17,17,17,0.14)] transition hover:-translate-y-0.5 hover:bg-sky-600 focus-ring"
              >
                Contact <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/25 px-4 py-2 text-[#111111] transition hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-100 focus-ring"
              >
                GitHub <Github className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>
        </motion.div>

        <div id="more" className="mt-14 grid gap-3 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35 + index * 0.08 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block border-t border-black/15 py-4 transition hover:border-black"
              >
                <p className="editorial-label">
                  <ScrambleText text={`0${index + 1}`} />
                </p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <p className="text-xl font-semibold tracking-[-0.04em] text-[#111111]">
                    {project.title}
                  </p>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
