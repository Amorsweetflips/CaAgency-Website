import { generatedCoverSlugs } from '@/lib/data/blog-covers'

// Posts without an uploaded featured image fall back to a generated brand
// cover (scripts/generate-blog-covers.tsx), so cards and social previews are
// never blank.

export const COVER_WIDTH = 1200
export const COVER_HEIGHT = 630

export function blogCoverPath(slug: string): string {
  return `/images/blog/covers/${slug}.webp`
}

export function resolveFeaturedImage(post: { slug: string; featuredImage?: string | null }): string | null {
  if (post.featuredImage) return post.featuredImage
  return generatedCoverSlugs.has(post.slug) ? blogCoverPath(post.slug) : null
}

// Stable 32-bit FNV-1a hash so a slug always draws the same motif.
export function hashSlug(slug: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < slug.length; i += 1) {
    hash ^= slug.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export function coverTitleSize(title: string): number {
  if (title.length <= 32) return 84
  if (title.length <= 52) return 72
  if (title.length <= 72) return 62
  return 54
}

export interface CoverRing {
  cx: number
  cy: number
  r: number
}

// Concentric rings around a centre chosen from the hash.
export function coverRings(slug: string): CoverRing[] {
  const hash = hashSlug(slug)
  const cx = 820 + (hash % 360)
  const cy = 60 + ((hash >>> 8) % 500)
  const step = 46 + ((hash >>> 16) % 24)
  return Array.from({ length: 9 }, (_, i) => ({ cx, cy, r: 90 + i * step }))
}
