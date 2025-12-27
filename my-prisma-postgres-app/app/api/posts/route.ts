import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkBotId } from 'botid/server'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const verification = await checkBotId()

  if (verification.isBot) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { title, content, published } = body

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
