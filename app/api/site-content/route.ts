import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { listSiteContentEntries } from '@/lib/site-content/service'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const items = await listSiteContentEntries()
  return NextResponse.json(items)
}
