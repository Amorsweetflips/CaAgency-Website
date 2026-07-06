import { access } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { workVideos, aboutVideos, posterFor, VIDEO_PUBLICATION_DATE } from '@/lib/data/videos'

const baseUrl = 'https://caagency.com'

async function assetExists(assetPath: string) {
  const filePath = path.join(process.cwd(), 'public', assetPath.replace(/^\//, ''))

  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

// A sitemap entry is only valid when both the video and its thumbnail exist.
async function filterExistingVideos<T extends { src: string }>(videos: T[]) {
  const checks = await Promise.all(
    videos.map(async (video) => ({
      exists: (await assetExists(video.src)) && (await assetExists(posterFor(video.src))),
      video,
    }))
  )

  return checks.filter((item) => item.exists).map((item) => item.video)
}

function videoTag(video: { src: string; name: string }, description: string) {
  return `
    <video:video>
      <video:thumbnail_loc>${baseUrl}${posterFor(video.src)}</video:thumbnail_loc>
      <video:title>${video.name}</video:title>
      <video:description>${description}</video:description>
      <video:content_loc>${baseUrl}${video.src}</video:content_loc>
      <video:publication_date>${VIDEO_PUBLICATION_DATE}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`
}

export async function GET() {
  const [existingWorkVideos, existingAboutVideos] = await Promise.all([
    filterExistingVideos(workVideos),
    filterExistingVideos(aboutVideos),
  ])

  // Google dedupes sitemap entries by <loc>, so each page must appear exactly
  // once, carrying all of its videos as <video:video> children.
  const pageEntries = [
    {
      loc: `${baseUrl}/work`,
      videos: existingWorkVideos.map((video) =>
        videoTag(video, `Influencer marketing campaign for ${video.brand} by CA Agency`)
      ),
    },
    {
      loc: `${baseUrl}/about`,
      videos: existingAboutVideos.map((video) => videoTag(video, video.description)),
    },
  ].filter((page) => page.videos.length > 0)

  const videoEntries = pageEntries.map(
    (page) => `
  <url>
    <loc>${page.loc}</loc>${page.videos.join('')}
  </url>`
  )

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
