"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-content";

const nodePositions = [
  "left-[8%] top-[20%]",
  "right-[8%] top-[14%]",
  "left-[15%] bottom-[16%]"
];

export function OrbitalProjectMap({
  projects
}: {
  projects: Project[];
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative h-[430px] overflow-hidden rounded-[2rem] p-5 md:h-[560px]">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/20"
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/10 bg-black/30 p-3 shadow-glow backdrop-blur">
        <Image
          src="/legacy-assets/nico-signature.gif"
          alt="Nico signature"
          width={438}
          height={157}
          className="h-full w-full object-contain"
          unoptimized
        />
      </div>
      <svg
        className="absolute inset-0 h-full w-full text-cyan/20"
        viewBox="0 0 600 560"
        aria-hidden
      >
        <path
          d="M90 130 C220 260 340 225 505 95"
          fill="none"
          stroke="currentColor"
          strokeDasharray="8 10"
        />
        <path
          d="M115 430 C230 305 380 380 510 180"
          fill="none"
          stroke="currentColor"
          strokeDasharray="8 10"
        />
        <path
          d="M140 145 C265 450 385 350 470 440"
          fill="none"
          stroke="currentColor"
          strokeDasharray="8 10"
        />
      </svg>

      {projects.slice(0, 3).map((project, index) => (
        <motion.div
          key={project.slug}
          className={`absolute ${nodePositions[index]} w-[13rem]`}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 + index * 0.12 }}
          whileHover={prefersReducedMotion ? undefined : { y: -6 }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="group block rounded-[1.35rem] border border-white/10 bg-black/40 p-2 shadow-panel backdrop-blur-xl transition hover:border-cyan/60"
          >
            <Image
              src={project.coverImageUrl}
              alt={project.coverImageAlt}
              width={420}
              height={260}
              className="aspect-[16/10] rounded-[1rem] object-cover"
            />
            <div className="flex items-center justify-between gap-3 px-2 py-3">
              <p className="text-sm font-semibold leading-5 text-white">
                {project.title}
              </p>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
