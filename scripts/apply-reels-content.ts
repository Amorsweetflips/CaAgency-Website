// One-off (July 2026 renovation, reels batch): point the production `home`
// override's intro.mediaItems at the seven client Instagram reels so the DB
// row cannot keep serving the retired campaign videos over the new defaults
// in lib/site-content/definitions.ts (deep-merge lets stored arrays win).
// Run with: npx tsx scripts/apply-reels-content.ts
import { PrismaClient } from '@prisma/client'

const accelerateUrl = process.env.PRISMA_DATABASE_URL
if (!accelerateUrl) {
  console.error('Missing PRISMA_DATABASE_URL')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl } as any)

const NEW_MEDIA_ITEMS = [
  { type: 'video', src: '/videos/work/reel-DT3Qg4sjHPm.mp4', alt: 'Haruharu Wonder serum mist campaign reel' },
  { type: 'video', src: '/videos/work/reel-DX2BnbDMhd9.mp4', alt: 'TIRTIR matcha skincare campaign reel' },
  { type: 'video', src: '/videos/work/reel-DT3Pv52jCqc.mp4', alt: 'Rhode blush campaign reel' },
  { type: 'video', src: '/videos/work/reel-DaH6Y-huzyX.mp4', alt: 'TOCOBO sunscreen campaign reel' },
  { type: 'video', src: '/videos/work/reel-DX2Bva6sJk6.mp4', alt: 'Fenty Beauty campaign reel' },
  { type: 'video', src: '/videos/work/reel-DK7rKHjOr6a.mp4', alt: 'Bali Body campaign reel' },
  { type: 'video', src: '/videos/work/reel-DYKuGHLNs6F.mp4', alt: 'Frozen gua sha skincare campaign reel' },
]

async function main() {
  const home = await prisma.siteContent.findUnique({ where: { key: 'home' } })
  if (!home) {
    console.log('No `home` override row; definitions.ts defaults will serve the reels.')
    return
  }

  const data = home.data as Record<string, any>
  const previous = data.intro?.mediaItems
  console.log('previous intro.mediaItems (for recovery):')
  console.log(JSON.stringify(previous ?? null))

  const next = { ...data, intro: { ...data.intro, mediaItems: NEW_MEDIA_ITEMS } }
  await prisma.siteContent.update({ where: { key: 'home' }, data: { data: next } })
  console.log('\nhome override updated: intro.mediaItems -> 7 reels')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
