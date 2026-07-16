// July 2026 revisions (R9 + R16) DB follow-up: the SiteContent rows override
// code defaults (arrays wholesale), so the code-side fixes on branch
// revisions-july-2026 don't reach production until these stored values are
// patched too.
//   - footer.socialLinks: TikTok href @caagency_ → @caagency (R9)
//   - footer.phone: key removed (R16) — deployed code deep-merges missing keys
//     from defaults, so pre-deploy prod keeps rendering its default until the
//     PR lands, after which the field is gone everywhere.
//   - business-license.companyInfo: drop the WhatsApp row (R16); the email row
//     already carries the contact.
// Transforms operate on the CURRENT stored arrays (not code defaults) so any
// owner CMS edits are preserved.
//
//   node --env-file=.env.local prisma/update-rev-2026-07.mjs         (dry run)
//   node --env-file=.env.local prisma/update-rev-2026-07.mjs --apply (write)
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')

if (!process.env.PRISMA_DATABASE_URL) {
  console.error('PRISMA_DATABASE_URL is not set — run with `node --env-file=.env.local`.')
  process.exit(1)
}

const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_DATABASE_URL,
})

const NEW_TIKTOK = 'https://www.tiktok.com/@caagency/'

function patchFooter(data) {
  const socialLinks = Array.isArray(data?.socialLinks)
    ? data.socialLinks.map((link) =>
        typeof link?.href === 'string' && link.href.includes('caagency_')
          ? { ...link, href: NEW_TIKTOK }
          : link
      )
    : data?.socialLinks
  const next = { ...data, socialLinks }
  delete next.phone
  return next
}

function patchBusinessLicense(data) {
  const companyInfo = Array.isArray(data?.companyInfo)
    ? data.companyInfo.filter((row) => row?.label !== 'WhatsApp')
    : data?.companyInfo
  return { ...data, companyInfo }
}

// R1 + R2: the stored `home` row's hero.carouselImages overrides code defaults
// (arrays replace wholesale). Swap the blurry ELLIS Brooklyn collage crop and
// the letterboxed Rhode photo for the new rev-2026-07 assets.
// RUN --apply ONLY AFTER the revisions-july-2026 deploy is live — the new
// /assets/rev-2026-07/ files must exist on production first.
const HERO_SWAPS = {
  '/images/hero/rebecca-ellis-brooklyn-916.webp': {
    src: '/assets/rev-2026-07/hero-slide-1-916.jpg',
    alt: 'CA Agency talent at the Too Faced launch event',
  },
  '/images/hero/rebecca-rhode.webp': {
    src: '/assets/rev-2026-07/rhode-grid-vertical.jpg',
    alt: 'Rhode campaign content grid, CA Agency',
  },
}

function patchHome(data) {
  const carouselImages = Array.isArray(data?.hero?.carouselImages)
    ? data.hero.carouselImages.map((image) => HERO_SWAPS[image?.src] ?? image)
    : data?.hero?.carouselImages
  return { ...data, hero: { ...(data?.hero ?? {}), carouselImages } }
}

const targets = [
  { key: 'footer', patch: patchFooter, summarize: (d) => ({ phone: d?.phone ?? '(absent)', socialLinks: d?.socialLinks?.map((s) => `${s?.name}:${s?.href}`) }) },
  { key: 'business-license', patch: patchBusinessLicense, summarize: (d) => ({ companyInfo: d?.companyInfo?.map((r) => r?.label) }) },
  { key: 'home', patch: patchHome, summarize: (d) => ({ carouselImages: d?.hero?.carouselImages?.map((i) => i?.src) }) },
]

for (const { key, patch, summarize } of targets) {
  const row = await prisma.siteContent.findUnique({ where: { key } })
  if (!row) {
    console.log(`[${key}] no stored row — code defaults apply, nothing to patch.`)
    continue
  }
  const next = patch(row.data)
  console.log(`[${key}] BEFORE:`, JSON.stringify(summarize(row.data), null, 2))
  console.log(`[${key}] AFTER :`, JSON.stringify(summarize(next), null, 2))
  if (APPLY) {
    await prisma.siteContent.update({ where: { key }, data: { data: next } })
    console.log(`[${key}] APPLIED.`)
  }
}

if (!APPLY) console.log('Dry run only — re-run with --apply to write.')
await prisma.$disconnect()
