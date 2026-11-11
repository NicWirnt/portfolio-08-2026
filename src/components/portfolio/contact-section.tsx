import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/portfolio/contact-form";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-5 pb-16 pt-12 md:px-6 lg:pb-24">
      <div className="field-note mx-auto grid max-w-7xl gap-10 rounded-2xl border border-[var(--rule)] p-5 sm:p-10 lg:grid-cols-[0.9fr_1fr] lg:gap-16 lg:p-12">
        <div>
          <p className="editorial-label">Contact</p>
          <h2 id="contact-title" className="mt-4 text-balance text-5xl font-black leading-[0.95] tracking-[-0.065em] sm:text-6xl">
            Let’s talk.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--muted-ink)]">
            I’m looking for a team where I can contribute, learn quickly, and grow through good feedback.
          </p>
          <div className="mt-8 grid max-w-md border-t border-[var(--rule)]">
            <a href="mailto:nicowiranata@gmail.com" className="flex min-h-12 items-center justify-between gap-2 border-b border-[var(--rule)] text-sm font-medium hover:text-[var(--accent)] sm:text-base">
              nicowiranata@gmail.com <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </a>
            <a href="tel:+61451538990" className="flex min-h-12 items-center justify-between gap-2 border-b border-[var(--rule)] text-sm font-medium hover:text-[var(--accent)] sm:text-base">
              +61 451 53 8990 <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
