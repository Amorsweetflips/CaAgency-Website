// Renders a branded 1200x630 cover for every seeded blog post into
// public/images/blog/covers and rewrites lib/data/blog-covers.ts.
// Run: npm run blog:covers
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { ImageResponse } from 'next/og'
import type { ReactElement } from 'react'
import { seedPosts } from '../prisma/blog-seed'
import {
  COVER_BACKGROUND,
  COVER_HEIGHT,
  COVER_WIDTH,
  assignCoverMotifs,
  blogCoverPath,
  coverAccent,
  coverBarHeights,
  coverCornerRings,
  coverDotGrid,
  coverLabelSize,
  coverRings,
  coverStripeAngle,
  coverTopLabel,
  hexToRgb,
  type CoverMotif,
  type CoverRing,
} from '../lib/blog-cover'

const root = process.cwd()
const outDir = path.join(root, 'public', 'images', 'blog', 'covers')
const muted = '#A8A8A4'

function rgba(accent: string, alpha: number): string {
  const [r, g, b] = hexToRgb(accent)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function Rings({ rings, accent }: { rings: CoverRing[]; accent: string }) {
  return (
    <>
      {rings.map((ring, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: ring.cx - ring.r,
            top: ring.cy - ring.r,
            width: ring.r * 2,
            height: ring.r * 2,
            borderRadius: ring.r,
            border: `2px solid ${rgba(accent, 0.08 + (i % 3) * 0.04)}`,
          }}
        />
      ))}
    </>
  )
}

function Stripes({ slug, accent }: { slug: string; accent: string }) {
  const line = rgba(accent, 0.4)
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 0,
          width: 680,
          height: COVER_HEIGHT,
          backgroundImage: `repeating-linear-gradient(${coverStripeAngle(slug)}deg, ${line} 0px, ${line} 2px, transparent 2px, transparent 30px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 0,
          width: 680,
          height: COVER_HEIGHT,
          backgroundImage: `linear-gradient(90deg, ${COVER_BACKGROUND} 0%, rgba(19, 16, 17, 0) 75%)`,
        }}
      />
    </>
  )
}

function Dots({ slug, accent }: { slug: string; accent: string }) {
  const { cols, rows, size, gap } = coverDotGrid(slug)
  const cells = Array.from({ length: cols * rows }, (_, i) => ({ col: i % cols, row: Math.floor(i / cols) }))
  return (
    <>
      {cells.map(({ col, row }) => (
        <div
          key={`${col}-${row}`}
          style={{
            position: 'absolute',
            left: 560 + col * gap,
            top: 50 + row * gap,
            width: size,
            height: size,
            borderRadius: size,
            background: rgba(accent, 0.16 + 0.5 * (col / (cols - 1))),
          }}
        />
      ))}
    </>
  )
}

function Bars({ slug, accent }: { slug: string; accent: string }) {
  const heights = coverBarHeights(slug)
  return (
    <>
      {heights.map((height, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 830 + i * 36,
            top: (COVER_HEIGHT - height) / 2,
            width: 22,
            height,
            borderRadius: 11,
            background: rgba(accent, 0.1 + 0.16 * (height / 420)),
          }}
        />
      ))}
    </>
  )
}

function Motif({ motif, slug, accent }: { motif: CoverMotif; slug: string; accent: string }) {
  if (motif === 'stripes') return <Stripes slug={slug} accent={accent} />
  if (motif === 'dots') return <Dots slug={slug} accent={accent} />
  if (motif === 'bars') return <Bars slug={slug} accent={accent} />
  if (motif === 'corner') return <Rings rings={coverCornerRings(slug)} accent={accent} />
  return <Rings rings={coverRings(slug)} accent={accent} />
}

interface CoverProps {
  slug: string
  categories: readonly string[]
  motif: CoverMotif
}

function Cover({ slug, categories, motif }: CoverProps): ReactElement {
  const category = categories[0] ?? 'Insights'
  const accent = coverAccent(category)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: COVER_BACKGROUND,
        color: '#FFFFFF',
        fontFamily: 'Brasika',
      }}
    >
      <Motif motif={motif} slug={slug} accent={accent} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: muted }}>{coverTopLabel(categories)}</div>
        <div
          style={{
            display: 'flex',
            maxWidth: 1000,
            fontSize: coverLabelSize(category),
            lineHeight: 1.05,
            letterSpacing: -2,
            color: accent,
          }}
        >
          {category}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            color: muted,
          }}
        >
          <div style={{ display: 'flex', color: '#FFFFFF', letterSpacing: 4 }}>CA AGENCY</div>
          <div style={{ display: 'flex' }}>caagency.com/blog</div>
        </div>
      </div>
    </div>
  )
}

async function main() {
  const font = await readFile(path.join(root, 'public', 'fonts', 'BrasikaDisplay.ttf'))
  await mkdir(outDir, { recursive: true })

  const motifs = assignCoverMotifs(seedPosts)
  const slugs: string[] = []
  for (const post of seedPosts) {
    const motif = motifs.get(post.slug) ?? 'rings'
    const png = await new ImageResponse(<Cover slug={post.slug} categories={post.categories} motif={motif} />, {
      width: COVER_WIDTH,
      height: COVER_HEIGHT,
      fonts: [{ name: 'Brasika', data: font, style: 'normal', weight: 400 }],
    }).arrayBuffer()
    await sharp(Buffer.from(png)).webp({ quality: 88 }).toFile(path.join(root, 'public', blogCoverPath(post.slug)))
    slugs.push(post.slug)
    console.log(`Cover: ${post.slug} (${motif})`)
  }

  const manifest = `// Generated by scripts/generate-blog-covers.tsx. Do not edit by hand.
export const generatedCoverSlugs: ReadonlySet<string> = new Set([
${slugs.map((slug) => `  '${slug}',`).join('\n')}
])
`
  await writeFile(path.join(root, 'lib', 'data', 'blog-covers.ts'), manifest)
}

main().catch((error) => {
  console.error('Cover generation failed:', error)
  process.exit(1)
})
