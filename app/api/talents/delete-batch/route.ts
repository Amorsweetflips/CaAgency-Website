import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'

// DELETE /api/talents/delete-batch - Delete multiple talents by name
export async function DELETE(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
