import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// DELETE /api/talents/delete-batch - Delete multiple talents by name
export async function DELETE(req: NextRequest) {
  try {
    await requireAuth()

    const { names } = await req.json()

    if (!Array.isArray(names) || names.length === 0) {
      return NextResponse.json(
        { error: 'Names array is required' },
        { status: 400 }
      )
    }

    const result = await prisma.talent.deleteMany({
      where: {
        name: {
          in: names,
        },
      },
    })

    // Revalidate the talents page cache
    revalidatePath('/talents')
    revalidatePath('/')

    return NextResponse.json({
      success: true,
      deletedCount: result.count,
    })
  } catch (error) {
    console.error('Error deleting talents:', error)
    return NextResponse.json(
      { error: 'Failed to delete talents' },
      { status: 500 }
    )
  }
}
