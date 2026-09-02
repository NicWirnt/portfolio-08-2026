# nicowiranata.dev

Next.js + TypeScript rebuild of Nico Wiranata's portfolio.

## Direction

- Public site: immersive portfolio with interactive hero, project map, case-study pages, skill graph, timeline, and contact.
- Admin area: protected content management for projects, skills, timeline entries, testimonials, media assets, and contact messages.
- Data stack: Neon Postgres with Drizzle ORM.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add the Neon `DATABASE_URL`.
4. Generate and run migrations with `npm run db:generate` and `npm run db:migrate`.
5. Start locally with `npm run dev`.

## Notes

- Legacy images from the old portfolio are in `public/legacy-assets`.
- The public site can render from seed content before Neon is configured.
- Admin write flows should remain disabled until authentication is added.
# portfolio-08-2026
