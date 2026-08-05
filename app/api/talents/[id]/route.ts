import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, UnauthorizedError } from '@/lib/auth'
import { rejectCrossOrigin } from '@/lib/csrf'
import { revalidateTalentsPages } from '@/lib/revalidate'
import { pingIndexNow } from '@/lib/seo/indexnow'

export const dynamic = 'force-dynamic'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const crossOrigin = rejectCrossOrigin(request)
  if (crossOrigin) return crossOrigin

  try {
    await requireAuth()

    const { id } = await params

    await prisma.talent.delete({
      where: { id },
    })

    revalidateTalentsPages()
    await pingIndexNow(['/talents'])
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }
    console.error('Error deleting talent:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Talent not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete talent' },
      { status: 500 }
    )
  }
}

const TALENT_PATCH_WHITELIST = [
  'name',
  'imageUrl',
  'category',
  'instagramUrl',
  'tiktokUrl',
  'youtubeUrl',
  'twitchUrl',
  'kickUrl',
  'order',
  'bio',
] as const

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const crossOrigin = rejectCrossOrigin(request)
  if (crossOrigin) return crossOrigin

  try {
    await requireAuth()

    const { id } = await params
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body', code: 'INVALID_REQUEST' },
        { status: 400 }
      )
    }

    const filtered = Object.fromEntries(
      Object.entries(body).filter(([k]) =>
        (TALENT_PATCH_WHITELIST as readonly string[]).includes(k)
      )
    ) as Record<string, unknown>

    const data: Record<string, unknown> = { ...filtered }
    if (
      data.imageUrl !== undefined &&
      (typeof data.imageUrl !== 'string' || !data.imageUrl.trim() || data.imageUrl.length > 2000)
    ) {
      return NextResponse.json(
        { error: 'Invalid imageUrl', code: 'INVALID_REQUEST' },
        { status: 400 }
      )
    }
    if (data.name && typeof data.name === 'string') {
      if (!data.name.trim() || data.name.length > 120) {
        return NextResponse.json(
          { error: 'Invalid name', code: 'INVALID_REQUEST' },
          { status: 400 }
        )
      }
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }
    if (data.order !== undefined && (typeof data.order !== 'number' || !Number.isFinite(data.order))) {
      return NextResponse.json(
        { error: 'Invalid order', code: 'INVALID_REQUEST' },
        { status: 400 }
      )
    }

    const talent = await prisma.talent.update({
      where: { id },
      data,
    })

    revalidateTalentsPages()
    await pingIndexNow(['/talents', `/talents/${talent.slug}`])
    return NextResponse.json(talent)
  } catch (error: any) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }
    console.error('Error updating talent:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Talent not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update talent' },
      { status: 500 }
    )
  }
}
