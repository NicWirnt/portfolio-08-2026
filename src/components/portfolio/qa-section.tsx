import { Reveal } from "@/components/portfolio/reveal";
import { ScrambleText } from "@/components/portfolio/text-effects";

const questions = [
  {
    question: "What makes a good full-stack developer?",
    answer:
      "Someone who can connect product intent, user experience, data design, performance, and security into one coherent system."
  },
  {
    question: "What do you care about when building?",
    answer:
      "Clear architecture, maintainable interfaces, honest tradeoffs, and admin workflows that do not become security liabilities later."
  },
  {
    question: "What should this portfolio prove?",
    answer:
      "That the work is not only visually polished, but structured so new projects, case studies, and content can be added properly."
  }
];

export function QaSection() {
  return (
    <section id="qa" className="px-5 py-28 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-black/15 pt-8 lg:grid-cols-[0.4fr_1fr]">
        <Reveal>
          <p className="editorial-label">
            <ScrambleText text="Q&A" />
          </p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#111111] md:text-7xl">
            How I think
          </h2>
        </Reveal>
        <div className="grid gap-0 border-t border-black/15">
          {questions.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.08}>
              <article className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[0.12fr_0.88fr]">
                <p className="editorial-label">
                  <ScrambleText text={`0${index + 1}`} />
                </p>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.045em] text-[#111111] md:text-4xl">
                    {item.question}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-[#5f6b73]">
                    {item.answer}
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
