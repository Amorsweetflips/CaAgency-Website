import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const talents = await prisma.talent.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'asc' },
      ],
    })

    return NextResponse.json(talents)
  } catch (error) {
    console.error('Error fetching talents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch talents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const {
      name,
      imageUrl,
      category = 'instagram',
      instagramUrl,
      tiktokUrl,
      youtubeUrl,
      twitchUrl,
      kickUrl,
      order = 0,
    } = body

    if (!name || !imageUrl) {
      return NextResponse.json(
        { error: 'Name and imageUrl are required' },
        { status: 400 }
      )
    }

    const talent = await prisma.talent.create({
      data: {
        name,
        imageUrl,
        category,
        instagramUrl,
        tiktokUrl,
        youtubeUrl,
        twitchUrl,
        kickUrl,
        order,
      },
    })

    return NextResponse.json(talent, { status: 201 })
  } catch (error: any) {
    console.error('Error creating talent:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A talent with this name already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create talent' },
      { status: 500 }
    )
  }
}
