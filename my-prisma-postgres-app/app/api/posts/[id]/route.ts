import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkBotId } from 'botid/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const verification = await checkBotId()

  if (verification.isBot) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    )
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { title, content, published } = body

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        published,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const verification = await checkBotId()

  if (verification.isBot) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    )
  }

  try {
    const { id } = await params
    await prisma.post.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ message: 'Post deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
