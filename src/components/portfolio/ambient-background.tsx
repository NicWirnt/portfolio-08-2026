"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 ambient-grid opacity-55" />
      <div className="absolute inset-0 noise-overlay" />
      <motion.div
        aria-hidden
        className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 38, -18, 0],
                y: [0, 28, 14, 0],
                scale: [1, 1.08, 0.96, 1]
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-7rem] top-4 h-[32rem] w-[32rem] rounded-full bg-amber-500/20 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -30, 24, 0],
                y: [0, 32, -20, 0],
                scale: [1, 0.94, 1.08, 1]
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-12rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-slate-900/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["-50%", "-46%", "-53%", "-50%"],
                scale: [1, 1.06, 0.98, 1]
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
