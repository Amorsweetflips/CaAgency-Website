# CA Agency

Next.js 16 App Router website.

## Setup

```bash
npm install
npm run dev
```

## Production configuration

- `PRISMA_DATABASE_URL` — Prisma Accelerate runtime connection.
- `DATABASE_URL` — direct database connection for Prisma CLI operations.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_SECURE` — contact-form delivery.
- `GOOGLE_SITE_VERIFICATION` — Google Search Console verification token.
- Vercel OIDC must remain enabled for BotID verification on `POST /api/contact`.

Verified testimonials belong in `lib/data/testimonials.ts`. Only complete records with `approved: true` render; never publish estimated campaign results.

The contact-form firewall rule is managed through Vercel Firewall, not `vercel.json`. Roll it out as log-only first, review matched production traffic, then tighten it to five requests per IP per minute and publish.

## Project Structure

- `app/(site)/` - Page routes
- `components/layout/` - Header, Footer, MobileMenu
- `components/blocks/` - Page sections (Hero, Carousels, Grids)
- `components/ui/` - Reusable UI components
- `lib/` - Utilities and fonts
