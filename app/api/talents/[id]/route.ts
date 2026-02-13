import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { revalidateTalentsPages } from '@/lib/revalidate'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()

    const { id } = await params

    await prisma.talent.delete({
      where: { id },
    })

    revalidateTalentsPages()
    return NextResponse.json({ success: true })
  } catch (error: any) {
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
  try {
    await requireAuth()

    const { id } = await params
    const body = await request.json()

    const filtered = Object.fromEntries(
      Object.entries(body).filter(([k]) =>
        (TALENT_PATCH_WHITELIST as readonly string[]).includes(k)
      )
    ) as Record<string, unknown>

    const data: Record<string, unknown> = { ...filtered }
    if (data.name && typeof data.name === 'string') {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }

    const talent = await prisma.talent.update({
      where: { id },
      data,
    })

    revalidateTalentsPages()
    return NextResponse.json(talent)
  } catch (error: any) {
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
