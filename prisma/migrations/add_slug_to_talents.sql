-- Add slug and bio columns to Talent table
ALTER TABLE "Talent" ADD COLUMN IF NOT EXISTS "slug" TEXT;
ALTER TABLE "Talent" ADD COLUMN IF NOT EXISTS "bio" TEXT;

-- Generate slugs from names (lowercase, replace spaces with hyphens)
UPDATE "Talent" SET "slug" = LOWER(REPLACE(REPLACE("name", ' ', '-'), '''', '')) WHERE "slug" IS NULL;

-- Make slug required and unique
ALTER TABLE "Talent" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "Talent_slug_key" ON "Talent"("slug");
CREATE INDEX IF NOT EXISTS "Talent_slug_idx" ON "Talent"("slug");
