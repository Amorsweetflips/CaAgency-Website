import { access } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

const baseUrl = 'https://caagency.com'

// Work page videos
const workVideos = [
  { src: '/videos/work/honor.mp4', name: 'HONOR Collaboration', brand: 'HONOR' },
  { src: '/videos/work/ysl-beauty.mp4', name: 'YSL Beauty Campaign', brand: 'YSL Beauty' },
  { src: '/videos/work/morphe.mp4', name: 'Morphe Collaboration', brand: 'Morphe' },
  { src: '/videos/work/kylie-cosmetics.mp4', name: 'Kylie Cosmetics Campaign', brand: 'Kylie Cosmetics' },
  { src: '/videos/work/medicube.mp4', name: 'Medicube Skincare', brand: 'Medicube' },
  { src: '/videos/work/yesstyle.mp4', name: 'YesStyle Collaboration', brand: 'YesStyle' },
  { src: '/videos/work/insta360x.mp4', name: 'Insta360 X Campaign', brand: 'Insta360' },
  { src: '/videos/work/mixsoon.mp4', name: 'Mixsoon Skincare', brand: 'Mixsoon' },
  { src: '/videos/work/idareen-kikomilano.mp4', name: 'Kiko Milano Campaign', brand: 'Kiko Milano' },
  { src: '/videos/work/beatrix-juviasplace.mp4', name: 'Juvias Place Campaign', brand: 'Juvias Place' },
  { src: '/videos/work/fashionfreakk-nars.mp4', name: 'NARS Campaign', brand: 'NARS' },
  { src: '/videos/work/huda-elemis.mp4', name: 'Elemis Campaign', brand: 'Elemis' },
]

// About page videos
const aboutVideos = [
  { src: '/videos/about-video-01.mp4', name: 'CA Agency Story', description: 'Learn about CA Agency and our mission' },
  { src: '/videos/about-video-02.mp4', name: 'CA Agency Team', description: 'Meet the team behind CA Agency' },
]

async function assetExists(assetPath: string) {
  const filePath = path.join(process.cwd(), 'public', assetPath.replace(/^\//, ''))

  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function filterExistingVideos<T extends { src: string }>(videos: T[]) {
  const checks = await Promise.all(
    videos.map(async (video) => ({
      exists: await assetExists(video.src),
      video,
    }))
  )

  return checks.filter((item) => item.exists).map((item) => item.video)
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0]
  const [existingWorkVideos, existingAboutVideos] = await Promise.all([
    filterExistingVideos(workVideos),
    filterExistingVideos(aboutVideos),
  ])

  const videoEntries = [
    // Work page videos
    ...existingWorkVideos.map((video) => `
    <url>
      <loc>${baseUrl}/work</loc>
      <video:video>
        <video:thumbnail_loc>${baseUrl}/images/site/logo.svg</video:thumbnail_loc>
        <video:title>${video.name}</video:title>
        <video:description>Influencer marketing campaign for ${video.brand} by CA Agency</video:description>
        <video:content_loc>${baseUrl}${video.src}</video:content_loc>
        <video:publication_date>${today}</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:live>no</video:live>
      </video:video>
    </url>`),
    // About page videos
    ...existingAboutVideos.map((video) => `
    <url>
      <loc>${baseUrl}/about</loc>
      <video:video>
        <video:thumbnail_loc>${baseUrl}/images/site/logo.svg</video:thumbnail_loc>
        <video:title>${video.name}</video:title>
        <video:description>${video.description}</video:description>
        <video:content_loc>${baseUrl}${video.src}</video:content_loc>
        <video:publication_date>${today}</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:live>no</video:live>
      </video:video>
    </url>`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries.join('')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
