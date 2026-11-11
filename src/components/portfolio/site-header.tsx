const navItems = [
  { label: "Work", href: "/#projects" },
  { label: "Stack", href: "/#stack", desktop: true },
  { label: "Journal", href: "/#qa", desktop: true },
  { label: "Journey", href: "/#timeline" },
  { label: "Contact", href: "/#contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-[var(--rule)] bg-[var(--paper)]/95 backdrop-blur-md">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-2 focus:z-10 focus:rounded focus:bg-white focus:p-3">
        Skip to content
      </a>
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-5 md:px-6 xl:px-0">
        <a href="#main-content" aria-label="Nico Wiranata home" className="flex min-h-11 shrink-0 items-center gap-3 rounded-md">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-md bg-[var(--ink)] text-xs font-black text-[var(--paper)]">NW</span>
          <span aria-hidden="true" className="hidden text-sm font-semibold sm:block">Nico Wiranata</span>
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-1 text-sm font-medium text-[var(--muted-ink)] sm:gap-2">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={`${item.desktop ? "hidden md:inline-flex" : "inline-flex"} min-h-11 items-center rounded-md px-2 transition-colors hover:bg-[var(--learning-mist)] hover:text-[var(--accent)] sm:px-3`}>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="hidden items-center gap-2 rounded-full border border-[var(--rule)] px-3 py-2 text-xs font-semibold text-[var(--accent)] lg:flex">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
          Open to junior roles
        </p>
      </div>
    </header>
  );
}
