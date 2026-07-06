import { NextRequest, NextResponse } from 'next/server'
import sitemap from '@/app/sitemap'
import { INDEXNOW_KEY, pingIndexNow } from '@/lib/seo/indexnow'

export const dynamic = 'force-dynamic'

// Bulk (re)submission of every sitemap URL to IndexNow. Used once after a
// large release and available for manual re-pings. Gated by the IndexNow key
// itself — the key is public by protocol (served at /<key>.txt), so this gate
// only stops drive-by requests; submitting our own URLs is something the
// protocol already permits any holder of the public key to do.
export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')
  if (key !== INDEXNOW_KEY) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 401 })
  }

  const entries = await sitemap()
  const submitted = await pingIndexNow(entries.map((entry) => entry.url))

  return NextResponse.json({ submitted, total: entries.length })
}
