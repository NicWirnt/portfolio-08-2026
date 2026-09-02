import { createContactMessage } from "@/server/contact-actions";
import { Reveal } from "@/components/portfolio/reveal";
import { ScrambleText } from "@/components/portfolio/text-effects";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 py-28 md:px-6">
      <Reveal className="mx-auto grid max-w-7xl gap-10">
        <div className="grid gap-10 border-t border-black/15 pt-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="editorial-label">
              <ScrambleText text="contact" />
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#111111] md:text-7xl">
              Let&apos;s build something useful
            </h2>
            <p className="mt-6 max-w-xl text-xl leading-8 tracking-[-0.03em] text-[#333333]">
              Send a message about work, collaboration, or a project worth
              building properly.
            </p>
            <div className="mt-8 grid gap-3 text-[#111111]">
              <a
                href="mailto:nicowiranata@gmail.com"
                className="border-b border-black/15 py-3 transition hover:border-black hover:text-sky-600"
              >
                nicowiranata@gmail.com
              </a>
              <a
                href="tel:+61451538990"
                className="border-b border-black/15 py-3 transition hover:border-black hover:text-sky-600"
              >
                +61 451 53 8990
              </a>
            </div>
          </div>
          <form action={createContactMessage} className="grid gap-4">
            <input
              name="name"
              required
              placeholder="Your name"
              className="focus-ring border-b border-black/20 bg-transparent px-0 py-4 text-[#111111] transition placeholder:text-[#7b858b] focus:border-sky-600"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="focus-ring border-b border-black/20 bg-transparent px-0 py-4 text-[#111111] transition placeholder:text-[#7b858b] focus:border-sky-600"
            />
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your message"
              className="focus-ring resize-none border-b border-black/20 bg-transparent px-0 py-4 text-[#111111] transition placeholder:text-[#7b858b] focus:border-sky-600"
            />
            <button
              type="submit"
              className="focus-ring mt-4 inline-flex w-fit items-center rounded-full bg-[#111111] px-7 py-4 text-sm font-semibold text-[#f4f0e8] transition hover:bg-sky-600"
            >
              Send message
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
