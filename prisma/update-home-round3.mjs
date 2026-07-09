// July 2026 round 3: patch the CMS-stored `home` SiteContent row so the
// admin-saved copy matches the new code defaults for the two arrays this
// round changes. The DB row overrides code defaults wholesale for non-empty
// arrays (lib/site-content/merge.ts), so without this patch the live hero
// keeps Lidia/Aysa and the intro carousel keeps the old 7-reel sequence.
//
// RUN AFTER the round-3 deploy is live (the new /images/hero files must
// exist on production first):
//   node --env-file=.env.local prisma/update-home-round3.mjs         (dry run)
//   node --env-file=.env.local prisma/update-home-round3.mjs --apply (write)
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')

const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_DATABASE_URL,
})

const heroCarouselImages = [
  { src: '/images/hero/albina-medicube.webp', alt: 'Albina for Medicube, CA Agency campaign' },
  { src: '/images/hero/rebecca-ellis-brooklyn.webp', alt: 'Rebecca for ELLIS Brooklyn, CA Agency campaign' },
  { src: '/images/hero/dariia-ysl.webp', alt: 'Dariia for YSL Beauty, CA Agency campaign' },
  { src: '/images/hero/khutjo-medicube.webp', alt: 'Khutjo for Medicube, CA Agency campaign' },
  { src: '/images/hero/melly-huda-beauty.webp', alt: 'Melly for Huda Beauty, CA Agency campaign' },
  { src: '/images/hero/rebecca-rhode.webp', alt: 'Rebecca for Rhode, CA Agency campaign' },
  { src: '/images/hero/melani-skin1004.webp', alt: 'Melani for SKIN1004, CA Agency campaign' },
]

const introMediaItems = [
  { type: 'video', src: '/videos/work/reel-DX2BnbDMhd9.mp4', alt: 'TIRTIR matcha skincare campaign reel' },
  { type: 'video', src: '/videos/work/reel-DT3Pv52jCqc.mp4', alt: 'Rhode blush campaign reel' },
  { type: 'video', src: '/videos/work/reel-DYKuGHLNs6F.mp4', alt: 'Frozen gua sha skincare campaign reel' },
  { type: 'video', src: '/videos/work/reel-DX2Bva6sJk6.mp4', alt: 'Fenty Beauty campaign reel' },
  { type: 'video', src: '/videos/work/reel-DK7rKHjOr6a.mp4', alt: 'Bali Body campaign reel' },
  { type: 'video', src: '/videos/work/reel-DT3Qg4sjHPm.mp4', alt: 'Haruharu Wonder serum mist campaign reel' },
]

const row = await prisma.siteContent.findUnique({ where: { key: 'home' } })

if (!row) {
  console.log('No stored `home` row — code defaults already apply everywhere. Nothing to do.')
} else {
  const data = row.data
  const before = {
    carouselImages: data?.hero?.carouselImages?.map((i) => i.src),
    mediaItems: data?.intro?.mediaItems?.map((i) => i.src),
  }
  const next = {
    ...data,
    hero: { ...(data?.hero ?? {}), carouselImages: heroCarouselImages },
    intro: { ...(data?.intro ?? {}), mediaItems: introMediaItems },
  }
  console.log('BEFORE:', JSON.stringify(before, null, 2))
  console.log('AFTER :', JSON.stringify({
    carouselImages: heroCarouselImages.map((i) => i.src),
    mediaItems: introMediaItems.map((i) => i.src),
  }, null, 2))

  if (APPLY) {
    await prisma.siteContent.update({ where: { key: 'home' }, data: { data: next } })
    console.log('APPLIED. Remember the homepage revalidates hourly (ISR 3600s).')
  } else {
    console.log('Dry run only — re-run with --apply to write.')
  }
}

await prisma.$disconnect()
