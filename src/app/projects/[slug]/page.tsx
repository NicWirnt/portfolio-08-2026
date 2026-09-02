import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, projects } from "@/lib/portfolio-content";
import { AmbientBackground } from "@/components/portfolio/ambient-background";
import { Reveal } from "@/components/portfolio/reveal";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-5 py-8 text-[#111111] md:px-6">
      <AmbientBackground />
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm text-[#5f6b73] transition hover:border-black hover:text-[#111111]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <section className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div>
              <p className="editorial-label">
                {project.year} / {project.role}
              </p>
              <h1 className="mt-5 text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-[#111111] md:text-8xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 tracking-[-0.03em] text-[#333333]">
                {project.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/15 px-4 py-2 text-sm text-[#5f6b73]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live ? (
                  <a
                  href={project.links.live}
                  className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-[#f4f0e8]"
                >
                    Live project
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
                {project.links.github ? (
                  <a
                  href={project.links.github}
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-[#111111]"
                >
                    Source
                    <Github className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.12}
            className="paper-card rounded-[2.25rem] p-3"
          >
            <Image
              src={project.coverImageUrl}
              alt={project.coverImageAlt}
              width={1400}
              height={900}
              className="aspect-[4/3] rounded-[1.45rem] object-cover"
              priority
            />
          </Reveal>
        </section>

        <section className="grid gap-6 pb-20 md:grid-cols-2">
          <Reveal>
            <article className="border-t border-black/15 pt-7">
              <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[#111111]">
                Problem
              </h2>
              <p className="mt-4 leading-7 text-[#5f6b73]">{project.problem}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="border-t border-black/15 pt-7">
              <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[#111111]">
                Solution
              </h2>
              <p className="mt-4 leading-7 text-[#5f6b73]">
                {project.solution}
              </p>
            </article>
          </Reveal>
          {project.content.map((section, index) => (
            <Reveal key={section.heading} delay={0.12 + index * 0.06}>
              <article className="border-t border-black/15 pt-7">
                <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[#111111]">
                  {section.heading}
                </h2>
                <p className="mt-4 leading-7 text-[#5f6b73]">{section.body}</p>
              </article>
            </Reveal>
          ))}
        </section>
      </div>
    </main>
  );
}
