import Link from "next/link";
import { Database, Lock, MessageSquare, PanelsTopLeft, ShieldCheck } from "lucide-react";
import { projects, skills } from "@/lib/portfolio-content";
import { AmbientBackground } from "@/components/portfolio/ambient-background";
import { Reveal } from "@/components/portfolio/reveal";

export default function AdminPage() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);

  return (
    <main className="min-h-screen px-5 py-8 text-[#111111] md:px-6">
      <AmbientBackground />
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="editorial-label">
              Admin
            </p>
            <h1 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] md:text-7xl">
              Admin
              <span className="block">control panel</span>
            </h1>
          </div>
          <Link
            href="/"
            className="focus-ring rounded-full border border-black/15 px-5 py-3 text-sm text-[#5f6b73] transition hover:border-black hover:text-[#111111]"
          >
            Back to site
          </Link>
        </Reveal>

        <section className="mt-10 grid gap-4 md:grid-cols-4">
          <StatusCard
            icon={<PanelsTopLeft className="h-5 w-5" />}
            label="Projects"
            value={String(projects.length)}
          />
          <StatusCard
            icon={<ShieldCheck className="h-5 w-5" />}
            label="Skills"
            value={String(skills.length)}
          />
          <StatusCard
            icon={<Database className="h-5 w-5" />}
            label="Neon"
            value={databaseConfigured ? "Ready" : "Not set"}
          />
          <StatusCard
            icon={<MessageSquare className="h-5 w-5" />}
            label="Messages"
            value="Schema ready"
          />
        </section>

        <Reveal delay={0.1} className="mt-8 rounded-[2rem] border border-amber-700/25 bg-amber-100/40 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-amber/20 p-3 text-amber">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#111111]">
                Write access is intentionally locked
              </h2>
              <p className="mt-2 max-w-3xl leading-7 text-[#5f6b73]">
                The admin area is scaffolded, but project creation/editing
                should not be enabled until authentication is added. Recommended
                setup: Auth.js with a GitHub or email allowlist for
                `ADMIN_EMAILS`.
              </p>
            </div>
          </div>
        </Reveal>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="paper-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-semibold">Managed content model</h2>
            <div className="mt-6 space-y-4">
              {[
                "Projects with slug, case-study content, links, stack, and screenshots",
                "Skills grouped by category and connected to project case studies",
                "Experience timeline entries",
                "Testimonials and brand/client proof",
                "Contact messages with read/archive status",
                "Media assets for uploaded project screenshots"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/15 bg-white/30 px-4 py-3 text-sm text-[#5f6b73]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="paper-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-semibold">Next implementation steps</h2>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-[#5f6b73]">
              <li>1. Add Auth.js and restrict `/admin` routes.</li>
              <li>2. Wire project reads from Neon via Drizzle queries.</li>
              <li>3. Add project create/edit/delete forms with validation.</li>
              <li>4. Add image upload through Vercel Blob, R2, or Cloudinary.</li>
              <li>5. Add audit logs for admin changes.</li>
            </ol>
          </Reveal>
        </section>
      </div>
    </main>
  );
}

function StatusCard({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Reveal className="paper-card rounded-[1.5rem] p-5">
      <div className="text-sky-600">{icon}</div>
      <p className="mt-4 text-sm text-[#5f6b73]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#111111]">{value}</p>
    </Reveal>
  );
}
