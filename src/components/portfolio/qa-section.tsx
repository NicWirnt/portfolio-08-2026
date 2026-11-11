import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjectBySlug } from "@/lib/portfolio-content";

const entries = [
  {
    slug: "ai-article-summarizer",
    title: "Start with the main task",
    reflection: "The summarizer opens with a URL field and gives the result its own space. The next thing I’d test is what happens when someone pastes a link the app can’t read."
  },
  {
    slug: "berbagi-image-discovery",
    title: "Keep browsing and downloading close",
    reflection: "I used categories to narrow a dense gallery and put the download action on each image card. I’d test whether those controls are easy to find on a phone."
  },
  {
    slug: "netflix-clone",
    title: "Use layout to make a long list easier to scan",
    reflection: "The hero gives one title the spotlight while poster rows let people browse by collection. I’d revisit how those rows behave on small screens and with keyboard navigation."
  }
];

export function QaSection() {
  return (
    <section id="qa" aria-labelledby="journal-title" className="px-5 py-12 md:px-6">
      <div className="editorial-rule mx-auto grid max-w-7xl gap-8 pt-8 lg:grid-cols-[0.6fr_1fr]">
        <h2 id="journal-title" className="text-balance text-5xl font-black leading-none tracking-[-0.065em] sm:text-7xl">
          Decision journal
        </h2>
        <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {entries.map(({ slug, title, reflection }) => {
            const project = getProjectBySlug(slug);

            return (
              <article key={slug} className="py-5">
                <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 max-w-prose leading-relaxed text-[var(--muted-ink)]">{reflection}</p>
                {project && (
                  <Link href={`/projects/${slug}`} className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-[var(--accent)] hover:underline">
                    {project.title} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
