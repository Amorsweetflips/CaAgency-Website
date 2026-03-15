import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { siteContentDefinitionsByKey } from '@/lib/site-content/definitions'
import { getSiteContent, saveSiteContent } from '@/lib/site-content/service'
import { revalidateSitePages } from '@/lib/revalidate'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { key } = await params
  const definition = siteContentDefinitionsByKey[key]

  if (!definition) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const data = await getSiteContent(key)

  return NextResponse.json({
    key,
    title: definition.title,
    description: definition.description,
    fields: definition.fields,
    data,
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { key } = await params
  const definition = siteContentDefinitionsByKey[key]

  if (!definition) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const body = await request.json()
    await saveSiteContent(key, body)
    revalidateSitePages()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error saving site content for ${key}:`, error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
