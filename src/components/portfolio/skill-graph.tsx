import Image from "next/image";
import type { Project, Skill } from "@/lib/portfolio-content";
import { Reveal } from "@/components/portfolio/reveal";

const categoryOrder: Skill["category"][] = [
  "Frontend",
  "Backend",
  "Database",
  "Tooling",
  "Security",
];

const categoryNotes: Record<Skill["category"], string> = {
  Frontend: "Interfaces people can understand and use.",
  Backend: "Growing from polished UI into product logic and APIs.",
  Database: "Learning reliable data modelling and persistence.",
  Tooling: "Tools I use to design, build, and improve the work.",
  Security: "A secure-by-default mindset for every implementation.",
};

function getProjectEvidence(skill: Skill, projects: Project[]) {
  const normalizedSkill = skill.name.toLowerCase();

  return projects.filter((project) =>
    project.stack.some((technology) => {
      const normalizedTechnology = technology.toLowerCase();
      return (
        normalizedTechnology.includes(normalizedSkill) ||
        normalizedSkill.includes(normalizedTechnology)
      );
    }),
  );
}

export function SkillGraph({
  skills,
  projects,
}: {
  skills: Skill[];
  projects: Project[];
}) {
  const groups = categoryOrder.flatMap((category) => {
    const categorySkills = skills.filter((skill) => skill.category === category);
    return categorySkills.length ? [{ category, skills: categorySkills }] : [];
  });

  return (
    <section id="stack" className="px-5 py-12 md:px-6">
      <div className="mx-auto max-w-7xl border-t border-black/15 pt-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <Reveal>
            <p className="editorial-label">
              Stack
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-5xl font-black leading-none tracking-[-0.065em] sm:text-7xl">
              Learning journey
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-6 border-l-2 border-sky-500 pl-5 sm:grid-cols-[1fr_auto] sm:items-end sm:pl-7">
              <p className="text-xl leading-8 tracking-[-0.03em] text-[#333333]">
                A working toolkit, not a scorecard. Every skill is either
                connected to something I have built or clearly marked as a
                direction I am developing.
              </p>
              <dl className="grid grid-cols-3 gap-4 font-mono text-xs uppercase tracking-[0.12em] text-[#5f6b73] sm:text-right">
                <div>
                  <dt>Tools</dt>
                  <dd className="mt-1 text-2xl font-black tracking-[-0.05em] text-[#111111]">
                    {skills.length}
                  </dd>
                </div>
                <div>
                  <dt>Fields</dt>
                  <dd className="mt-1 text-2xl font-black tracking-[-0.05em] text-[#111111]">
                    {groups.length}
                  </dd>
                </div>
                <div>
                  <dt>Projects</dt>
                  <dd className="mt-1 text-2xl font-black tracking-[-0.05em] text-[#111111]">
                    {projects.length}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-[#111111] px-5 py-7 text-[#f4f0e8] shadow-[0_28px_90px_rgba(17,17,17,0.14)] sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
            <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/70">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.85)]" />
              Current learning signal
            </div>
            <p className="max-w-md text-sm leading-6 text-white/55">
              Project counts show visible evidence—not a percentage of mastery.
            </p>
          </div>

          <ol className="relative mt-2 before:absolute before:bottom-8 before:left-[1.15rem] before:top-8 before:hidden before:w-px before:bg-white/15 sm:before:block">
            {groups.map(({ category, skills: categorySkills }, groupIndex) => (
              <li
                key={category}
                className="relative grid gap-5 border-b border-white/10 py-7 last:border-b-0 sm:grid-cols-[3rem_minmax(0,0.62fr)_minmax(0,1.38fr)] sm:gap-6"
              >
                <div className="relative z-10 hidden h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#111111] font-mono text-xs font-bold text-sky-200 sm:grid">
                  {String(groupIndex + 1).padStart(2, "0")}
                </div>

                <div>
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sky-200 sm:hidden">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-[#f4f0e8] sm:mt-0">
                    {category}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/55">
                    {categoryNotes[category]}
                  </p>
                </div>

                <ul className="grid min-w-0 gap-3 md:grid-cols-2">
                  {categorySkills.map((skill) => {
                    const evidence = getProjectEvidence(skill, projects);
                    const evidenceLabel = evidence.length
                      ? `${evidence.length} ${evidence.length === 1 ? "project" : "projects"}`
                      : "Currently learning";

                    return (
                      <li
                        key={skill.name}
                        className="group min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition duration-200 motion-safe:hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-white/[0.075]"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            aria-hidden="true"
                            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10"
                            style={{ backgroundColor: `${skill.color}1f` }}
                          >
                            {skill.iconUrl ? (
                              <Image
                                src={skill.iconUrl}
                                alt=""
                                width={25}
                                height={25}
                                className="h-6 w-6 object-contain"
                              />
                            ) : (
                              <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: skill.color }}
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="break-words font-semibold text-[#f4f0e8]">
                              {skill.name}
                            </p>
                            <p className="mt-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/45">
                              {evidenceLabel}
                            </p>
                          </div>

                          <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                        </div>

                        {evidence.length > 0 && (
                          <p className="mt-3 line-clamp-1 border-t border-white/10 pt-3 text-xs text-white/50">
                            Seen in {evidence.map((project) => project.title).join(", ")}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
