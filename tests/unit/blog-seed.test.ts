import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { seedPosts, selectPostsToSeed } from '@/prisma/blog-seed'
import { COVER_WIDTH, blogCoverPath, coverRings, coverTitleSize, hashSlug, resolveFeaturedImage } from '@/lib/blog-cover'
import { generatedCoverSlugs } from '@/lib/data/blog-covers'
import { gulfCostGuide, locationGuides, saudiGuide, serviceGuides } from '@/lib/data/guides'

const seededSlugs = new Set(seedPosts.map((post) => post.slug))

describe('selectPostsToSeed', () => {
  it('returns every post when no slugs are requested', () => {
    expect(selectPostsToSeed(seedPosts, [])).toHaveLength(seedPosts.length)
  })

  it('returns only the requested posts', () => {
    const selected = selectPostsToSeed(seedPosts, ['tiktok-shop-beauty-brands', 'saudi-arabia-influencer-marketing-guide'])
    expect(selected.map((post) => post.slug).sort()).toEqual([
      'saudi-arabia-influencer-marketing-guide',
      'tiktok-shop-beauty-brands',
    ])
  })

  it('rejects unknown slugs instead of silently seeding nothing', () => {
    expect(() => selectPostsToSeed(seedPosts, ['tiktok-shop-beauty-brands', 'no-such-post'])).toThrow(/no-such-post/)
  })

  it('does not mutate the source list', () => {
    const before = seedPosts.map((post) => post.slug)
    selectPostsToSeed(seedPosts, [])
    expect(seedPosts.map((post) => post.slug)).toEqual(before)
  })
})

describe('seed posts', () => {
  it('have unique slugs', () => {
    expect(seededSlugs.size).toBe(seedPosts.length)
  })

  it('only link to other seeded posts', () => {
    for (const post of seedPosts) {
      const hrefs = [...post.content.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)].map((match) => match[1])
      for (const slug of hrefs) {
        expect(seededSlugs.has(slug), `${post.slug} -> ${slug}`).toBe(true)
      }
    }
  })

  it('are referenced by guide links only if seeded', () => {
    const guides = [gulfCostGuide, saudiGuide, ...locationGuides, ...Object.values(serviceGuides).flat()]
    for (const guide of guides) {
      expect(seededSlugs.has(guide.href.replace('/blog/', '')), guide.href).toBe(true)
    }
  })

  it('have a generated cover on disk and in the manifest', () => {
    for (const slug of seededSlugs) {
      expect(generatedCoverSlugs.has(slug), slug).toBe(true)
      expect(existsSync(path.join(process.cwd(), 'public', blogCoverPath(slug))), slug).toBe(true)
    }
  })
})

describe('blog covers', () => {
  it('prefers an uploaded featured image', () => {
    expect(resolveFeaturedImage({ slug: 'tiktok-shop-beauty-brands', featuredImage: '/images/custom.webp' })).toBe(
      '/images/custom.webp'
    )
  })

  it('falls back to the generated cover for seeded slugs', () => {
    expect(resolveFeaturedImage({ slug: 'tiktok-shop-beauty-brands', featuredImage: null })).toBe(
      '/images/blog/covers/tiktok-shop-beauty-brands.webp'
    )
  })

  it('returns null for posts with no image and no generated cover', () => {
    expect(resolveFeaturedImage({ slug: 'admin-written-post' })).toBeNull()
  })

  it('draws the same rings for the same slug and different rings otherwise', () => {
    expect(coverRings('a-post')).toEqual(coverRings('a-post'))
    expect(hashSlug('a-post')).not.toBe(hashSlug('another-post'))
    expect(coverRings('a-post')).toHaveLength(9)
  })

  it('shrinks the title as it gets longer', () => {
    expect(coverTitleSize('Short')).toBeGreaterThan(coverTitleSize('x'.repeat(60)))
    expect(coverTitleSize('x'.repeat(200))).toBeGreaterThanOrEqual(40)
    expect(COVER_WIDTH).toBe(1200)
  })
})
