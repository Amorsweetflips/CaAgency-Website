// Oct 2026: the K-beauty guide post links to /case-studies/medicube-skincare,
// a case study that no longer exists (it 308s to /case-studies). The July
// renovation script removed it, but a later re-seed (seed-blog upserts post
// content) put it back. The seed source is fixed in the same PR; this rewrites
// the stored post so production matches without re-seeding every post (which
// would overwrite admin edits). Idempotent; touches only this one sentence.
//
//   node --env-file=.env.local prisma/fix-kbeauty-medicube-link.mjs         (dry run)
//   node --env-file=.env.local prisma/fix-kbeauty-medicube-link.mjs --apply (write)
//
// After --apply, the cached ISR page refreshes within an hour (revalidate
// 3600) or on the next admin save of any post.
import { PrismaClient } from '@prisma/client'

const APPLY = process.argv.includes('--apply')
const SLUG = 'k-beauty-influencer-marketing-guide'
const DEAD =
  'Our <a href="/case-studies/medicube-skincare">Medicube</a> and <a href="/case-studies/mixsoon-skincare">Mixsoon</a> case studies show'
const FIXED = 'Our <a href="/case-studies/mixsoon-skincare">Mixsoon</a> case study shows'

if (!process.env.PRISMA_DATABASE_URL) {
  console.error('PRISMA_DATABASE_URL is not set — run with `node --env-file=.env.local`.')
  process.exit(1)
}

const prisma = new PrismaClient({ accelerateUrl: process.env.PRISMA_DATABASE_URL })

try {
  const post = await prisma.post.findUnique({ where: { slug: SLUG }, select: { id: true, content: true } })

  if (!post) {
    console.log(`No post with slug ${SLUG}. Nothing to do.`)
  } else if (post.content.includes(DEAD)) {
    const content = post.content.replace(DEAD, FIXED)
    if (APPLY) {
      await prisma.post.update({ where: { id: post.id }, data: { content } })
      console.log('Applied: sentence rewritten to the Mixsoon-only case-study link.')
    } else {
      console.log('Dry run: would rewrite the Medicube+Mixsoon sentence. Re-run with --apply.')
    }
  } else if (post.content.includes('/case-studies/medicube-skincare')) {
    console.error('Dead link present but the sentence differs from the seed wording — fix it in the admin editor instead.')
    process.exitCode = 1
  } else {
    console.log('Already clean: no medicube-skincare link in the stored post.')
  }
} finally {
  await prisma.$disconnect()
}
