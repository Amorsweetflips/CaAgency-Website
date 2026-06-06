/**
 * One-off: update the CMS `home` entry so the English homepage hero/stats/intro
 * lead with Korean skincare (K-beauty). Patches ONLY those three fields and
 * preserves everything else (carousel images, media items, etc.). Reversible in
 * /admin. Run: npx tsx scripts/update-home-kbeauty.ts
 */
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config()

const accelerateUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL
if (!accelerateUrl) throw new Error('Missing PRISMA_DATABASE_URL or DATABASE_URL.')

const prisma = new PrismaClient({ accelerateUrl } as never)

const HERO_SUBTITLE =
  'We connect brands with their target audience through engaging content, strategic partnerships, and high-impact campaigns across Instagram, TikTok, and YouTube — with deep specialism in beauty and Korean skincare (K-beauty).'
const TAGLINE =
  "We create scroll-stopping content for global brands — from K-beauty names like Medicube, Mixsoon, and Laneige to JBL, Sony, SHEIN, and L'Oréal Paris."
const INTRO_PARA =
  'We provide cross-platform influencer promotion on Instagram, YouTube and TikTok, and we are especially known for beauty and Korean skincare (K-beauty) campaigns with brands like Medicube, Mixsoon, and YesStyle.'

async function main() {
  const client = prisma as unknown as {
    siteContent: {
      findUnique: (a: unknown) => Promise<{ data: Record<string, unknown> } | null>
      upsert: (a: unknown) => Promise<unknown>
    }
  }

  const entry = await client.siteContent.findUnique({ where: { key: 'home' }, select: { data: true } })
  if (!entry?.data) {
    throw new Error('No `home` CMS entry found — nothing to patch. (Homepage would use code defaults, which already include K-beauty.)')
  }

  const data = entry.data as {
    hero?: { subtitle?: string }
    stats?: { tagline?: string }
    intro?: { paragraphs?: Array<{ text: string }> }
  }

  console.log('--- BEFORE ---')
  console.log('hero.subtitle:', data.hero?.subtitle)
  console.log('stats.tagline:', data.stats?.tagline)
  console.log('intro.paragraphs:', data.intro?.paragraphs?.map((p) => p.text))

  if (data.hero) data.hero.subtitle = HERO_SUBTITLE
  if (data.stats) data.stats.tagline = TAGLINE
  if (data.intro?.paragraphs) {
    data.intro.paragraphs = data.intro.paragraphs.map((p) =>
      /cross-platform influencer promotion/i.test(p.text) ? { ...p, text: INTRO_PARA } : p
    )
  }

  await client.siteContent.upsert({
    where: { key: 'home' },
    create: { key: 'home', data },
    update: { data },
  })

  const after = await client.siteContent.findUnique({ where: { key: 'home' }, select: { data: true } })
  const a = after?.data as typeof data
  console.log('\n--- AFTER ---')
  console.log('hero.subtitle:', a.hero?.subtitle)
  console.log('stats.tagline:', a.stats?.tagline)
  console.log('intro.paragraphs:', a.intro?.paragraphs?.map((p) => p.text))
  console.log('\n✓ home CMS entry updated with K-beauty copy.')
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
