import Image from "next/image";
import type { Project, Skill } from "@/lib/portfolio-content";
import { Reveal } from "@/components/portfolio/reveal";
import { ScrambleText } from "@/components/portfolio/text-effects";

export function SkillGraph({
  skills,
  projects
}: {
  skills: Skill[];
  projects: Project[];
}) {
  return (
    <section id="stack" className="px-5 py-28 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-black/15 pt-8 lg:grid-cols-[0.45fr_1fr] lg:items-start">
        <Reveal>
          <p className="editorial-label">
            <ScrambleText text="stack" />
          </p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#111111] md:text-7xl">
            I care about security
          </h2>
          <p className="mt-6 text-xl leading-8 tracking-[-0.03em] text-[#333333]">
            The new portfolio should avoid a generic icon wall. Each skill
            should connect back to shipped projects and case-study decisions.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[2rem] border border-black/15 bg-[#111111] p-6 text-[#f4f0e8]">
            <div className="absolute right-8 top-8 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-sky-300/60 hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${skill.color}22` }}
                    >
                      {skill.iconUrl ? (
                        <Image
                          src={skill.iconUrl}
                          alt={skill.name}
                          width={26}
                          height={26}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[#f4f0e8]">{skill.name}</p>
                      <p className="text-xs text-white/45">{skill.category}</p>
                    </div>
                  </div>
                  <div className="mt-4 h-1 rounded-full bg-white/10">
                    <div
                      className="h-1 rounded-full"
                      style={{
                        width: `${72 + (index % 4) * 7}%`,
                        background: `linear-gradient(90deg, ${skill.color}, rgba(255,255,255,0.18))`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/70">
              {projects.length} projects are ready to be connected to stack,
              architecture notes, and admin-managed case studies.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
