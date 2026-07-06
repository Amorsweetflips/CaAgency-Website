import { NextResponse } from 'next/server'
import sitemap from '@/app/sitemap'
import { INDEXNOW_KEY, pingIndexNow } from '@/lib/seo/indexnow'

export const dynamic = 'force-dynamic'

// Path-segment variant of ../route.ts for clients that cannot send query
// strings. Same nominal gate (the key is public by protocol); responds with
// minimal HTML so simple fetchers can read the outcome.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  if (key !== INDEXNOW_KEY) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 401 })
  }

  const entries = await sitemap()
  const submitted = await pingIndexNow(entries.map((entry) => entry.url))

  return new NextResponse(
    `<html><head><title>IndexNow</title></head><body><p>IndexNow submitted ${submitted} of ${entries.length} URLs for caagency.com</p></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
