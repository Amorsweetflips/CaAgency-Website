// July 2026 round-4 follow-up: point the CMS-stored `home` row's
// intro.mediaItems at the `-clean` reel filenames. The round-3 de-watermark
// reused the round-2 filenames, but /videos/* ships immutable cache headers,
// so visitors who saw the round-2 watermarked reels (like the client) keep
// getting their cached brand-marked bytes forever. Fresh URLs force a refetch.
// Only intro.mediaItems is touched — hero.carouselImages keeps the round-4
// `-916` crops applied by update-hero-round4.mjs.
//
// RUN AFTER the deploy is live (the -clean files must exist on production):
//   node --env-file=.env.local prisma/update-intro-clean-reels.mjs         (dry run)
//   node --env-file=.env.local prisma/update-intro-clean-reels.mjs --apply (write)
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')

const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_DATABASE_URL,
})

const introMediaItems = [
  { type: 'video', src: '/videos/work/reel-DX2BnbDMhd9-clean.mp4', alt: 'TIRTIR matcha skincare campaign reel' },
  { type: 'video', src: '/videos/work/reel-DT3Pv52jCqc-clean.mp4', alt: 'Rhode blush campaign reel' },
  { type: 'video', src: '/videos/work/reel-DYKuGHLNs6F-clean.mp4', alt: 'Frozen gua sha skincare campaign reel' },
  { type: 'video', src: '/videos/work/reel-DX2Bva6sJk6-clean.mp4', alt: 'Fenty Beauty campaign reel' },
  { type: 'video', src: '/videos/work/reel-DK7rKHjOr6a-clean.mp4', alt: 'Bali Body campaign reel' },
  { type: 'video', src: '/videos/work/reel-DT3Qg4sjHPm-clean.mp4', alt: 'Haruharu Wonder serum mist campaign reel' },
]

const row = await prisma.siteContent.findUnique({ where: { key: 'home' } })

if (!row) {
  console.log('No stored `home` row — code defaults already apply everywhere. Nothing to do.')
} else {
  const data = row.data
  console.log('BEFORE:', JSON.stringify(data?.intro?.mediaItems?.map((i) => i.src), null, 2))
  console.log('AFTER :', JSON.stringify(introMediaItems.map((i) => i.src), null, 2))
  console.log('hero.carouselImages (untouched):', JSON.stringify(data?.hero?.carouselImages?.map((i) => i.src)))

  if (APPLY) {
    const next = {
      ...data,
      intro: { ...(data?.intro ?? {}), mediaItems: introMediaItems },
    }
    await prisma.siteContent.update({ where: { key: 'home' }, data: { data: next } })
    console.log('APPLIED. Remember the homepage revalidates hourly (ISR 3600s).')
  } else {
    console.log('Dry run only — re-run with --apply to write.')
  }
}

await prisma.$disconnect()
