// July 2026 round 4: the hero carousel cards went vertical (9:16), so the two
// 3:4 photos got dedicated 9:16 crops under NEW filenames (old paths keep
// immutable CDN cache, overwriting them would serve stale crops forever).
// The stored `home` SiteContent row overrides code defaults for arrays
// (lib/site-content/merge.ts), so swap the two src paths in place there.
//
// RUN AFTER the round-4 deploy is live (the -916 files must exist on
// production first):
//   node --env-file=.env.local prisma/update-hero-round4.mjs         (dry run)
//   node --env-file=.env.local prisma/update-hero-round4.mjs --apply (write)
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')

const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_DATABASE_URL,
})

const SRC_SWAPS = {
  '/images/hero/melly-huda-beauty.webp': '/images/hero/melly-huda-beauty-916.webp',
  '/images/hero/rebecca-ellis-brooklyn.webp': '/images/hero/rebecca-ellis-brooklyn-916.webp',
}

const row = await prisma.siteContent.findUnique({ where: { key: 'home' } })

if (!row) {
  console.log('No stored `home` row — code defaults already apply everywhere. Nothing to do.')
} else {
  const data = row.data
  const images = data?.hero?.carouselImages ?? []
  const next = {
    ...data,
    hero: {
      ...(data?.hero ?? {}),
      carouselImages: images.map((img) => ({
        ...img,
        src: SRC_SWAPS[img.src] ?? img.src,
      })),
    },
  }
  const swapped = images.filter((img) => SRC_SWAPS[img.src]).map((img) => img.src)
  console.log('BEFORE:', JSON.stringify(images.map((i) => i.src), null, 2))
  console.log('SWAPPING:', JSON.stringify(swapped, null, 2))

  if (swapped.length === 0) {
    console.log('Nothing to swap — row already patched or paths differ.')
  } else if (APPLY) {
    await prisma.siteContent.update({ where: { key: 'home' }, data: { data: next } })
    console.log('APPLIED. Remember the homepage revalidates hourly (ISR 3600s).')
  } else {
    console.log('DRY RUN — rerun with --apply to write.')
  }
}

await prisma.$disconnect()
