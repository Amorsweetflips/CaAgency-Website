# Fix: SiteContent table missing in production

The Vercel logs show: **"The table `public.SiteContent` does not exist in the current database."**

## Quick fix (run once)

Apply the migration to your production database:

```bash
# Set DATABASE_URL to your direct Postgres connection string (not Prisma Accelerate URL)
# Then run:
npm run db:migrate:deploy
```

Or run this SQL directly in your database (Vercel Postgres, Neon, etc.):

```sql
CREATE TABLE IF NOT EXISTS "SiteContent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "SiteContent_key_key" ON "SiteContent"("key");
CREATE INDEX IF NOT EXISTS "SiteContent_key_idx" ON "SiteContent"("key");
```

## Vercel deployment

To run migrations automatically on deploy, add `DATABASE_URL` (direct Postgres URL) to your Vercel project env vars, then update the build script to run migrations before the build.
