import type { Experience } from "@/lib/portfolio-content";
import { Reveal } from "@/components/portfolio/reveal";
import { ScrambleText } from "@/components/portfolio/text-effects";

export function TimelineSection({
  experiences
}: {
  experiences: Experience[];
}) {
  return (
    <section id="timeline" className="px-5 py-28 md:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="editorial-rule grid gap-8 pt-8 lg:grid-cols-[0.45fr_1fr]">
            <div>
              <p className="editorial-label">
                <ScrambleText text="timeline" />
              </p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#111111] md:text-7xl">
                I document decisions
              </h2>
            </div>
            <p className="max-w-2xl text-xl leading-8 tracking-[-0.03em] text-[#333333]">
              A portfolio should explain what changed, why it changed, and how
              the technical choices supported the outcome.
            </p>
          </div>
        </Reveal>
        <div className="relative mt-12 grid gap-4">
          <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-gradient-to-b from-sky-500 via-black/20 to-amber-600 md:block" />
          {experiences.map((experience, index) => (
            <Reveal
              key={`${experience.role}-${experience.period}`}
              delay={index * 0.08}
            >
              <article
                className="relative grid gap-4 border-b border-black/15 pb-7 md:ml-12 md:grid-cols-[220px_1fr]"
              >
                <div className="absolute -left-[3.25rem] top-2 hidden h-3 w-3 rounded-full bg-sky-500 shadow-[0_0_24px_rgba(14,165,233,0.7)] md:block" />
                <div>
                  <p className="editorial-label">
                    {experience.period}
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.045em] text-[#111111]">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-[#5f6b73]">
                    {experience.organization}
                  </p>
                  <p className="mt-4 max-w-3xl leading-7 text-[#5f6b73]">
                    {experience.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
