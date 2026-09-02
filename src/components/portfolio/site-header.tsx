import Link from "next/link";

const navItems = [
  { label: "Studies", href: "/#projects" },
  { label: "Stack", href: "/#stack" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Q&A", href: "/#qa" },
  { label: "Contact", href: "/#contact" }
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 border-b border-black/15 bg-[#f4f0e8]/80 px-0 py-4 backdrop-blur-xl">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full focus-ring"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#111111] text-xs font-black tracking-[-0.08em] text-[#f4f0e8]">
            NW
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.28em] text-[#111111] sm:block">
            NICO
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-[#5f6b73] md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 transition hover:bg-black/[0.06] hover:text-[#111111] focus-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Link
          href="/admin"
          className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-[#111111] transition hover:border-sky-500 hover:bg-sky-100 focus-ring"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
