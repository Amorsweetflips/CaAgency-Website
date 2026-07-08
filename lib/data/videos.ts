// Campaign video catalog shared by the work page, video sitemap, and
// VideoObject structured data. Poster frames live in /public/images/video-thumbs.

// Stable publication date (when these campaign videos were added to the site).
// Avoids a daily-changing date, which Google treats as a noisy signal.
export const VIDEO_PUBLICATION_DATE = '2025-12-26'

// Per-video JPEG poster (Google rejects SVG and requires a representative
// frame). Generated from each source video into /public/images/video-thumbs.
// No node imports — this is also consumed from client components.
export function posterFor(src: string) {
  const name = src.split('/').pop()!.replace(/\.[^.]+$/, '')
  return `/images/video-thumbs/${name}.jpg`
}

export interface WorkVideo {
  src: string
  name: string
  brand: string
}

export const workVideos: WorkVideo[] = [
  { src: '/videos/work/honor.mp4', name: 'HONOR Collaboration', brand: 'HONOR' },
  { src: '/videos/work/ysl-beauty.mp4', name: 'YSL Beauty Campaign', brand: 'YSL Beauty' },
  { src: '/videos/work/kylie-cosmetics.mp4', name: 'Kylie Cosmetics Campaign', brand: 'Kylie Cosmetics' },
  { src: '/videos/work/yesstyle.mp4', name: 'YesStyle Collaboration', brand: 'YesStyle' },
  { src: '/videos/work/insta360x.mp4', name: 'Insta360 X Campaign', brand: 'Insta360' },
  { src: '/videos/work/mixsoon.mp4', name: 'Mixsoon Skincare', brand: 'Mixsoon' },
  { src: '/videos/work/idareen-kikomilano.mp4', name: 'Kiko Milano Campaign', brand: 'Kiko Milano' },
  { src: '/videos/work/beatrix-juviasplace.mp4', name: 'Juvias Place Campaign', brand: 'Juvias Place' },
  { src: '/videos/work/fashionfreakk-nars.mp4', name: 'NARS Campaign', brand: 'NARS' },
  { src: '/videos/work/huda-elemis.mp4', name: 'Elemis Campaign', brand: 'Elemis' },
]

export const aboutVideos = [
  { src: '/videos/about-video-01.mp4', name: 'CA Agency Story', description: 'Learn about CA Agency and our mission' },
  { src: '/videos/about-video-02.mp4', name: 'CA Agency Team', description: 'Meet the team behind CA Agency' },
]
