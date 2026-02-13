import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

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

    // Revalidate the talents page cache
    revalidatePath('/talents')
    revalidatePath('/')

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()

    const { id } = await params
    const body = await request.json()

    const talent = await prisma.talent.update({
      where: { id },
      data: body,
    })

    // Revalidate the talents page cache
    revalidatePath('/talents')
    revalidatePath('/')

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
