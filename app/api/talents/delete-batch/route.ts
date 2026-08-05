import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth, UnauthorizedError } from '@/lib/auth'
import { rejectCrossOrigin } from '@/lib/csrf'
import { revalidateTalentsPages } from '@/lib/revalidate'
import { pingIndexNow } from '@/lib/seo/indexnow'

export const dynamic = 'force-dynamic'

// DELETE /api/talents/delete-batch - Delete multiple talents by name
export async function DELETE(req: NextRequest) {
  const crossOrigin = rejectCrossOrigin(req)
  if (crossOrigin) return crossOrigin

  try {
    await requireAuth()

    let names: unknown
    try {
      names = (await req.json()).names
    } catch {
      return NextResponse.json(
        { error: 'Names array is required', code: 'INVALID_REQUEST' },
        { status: 400 }
      )
    }

    if (
      !Array.isArray(names) ||
      names.length === 0 ||
      names.length > 100 ||
      !names.every((name) => typeof name === 'string' && name.trim().length > 0)
    ) {
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

    revalidateTalentsPages()
    await pingIndexNow(['/talents'])
    return NextResponse.json({
      success: true,
      deletedCount: result.count,
    })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }
    console.error('Error deleting talents:', error)
    return NextResponse.json(
      { error: 'Failed to delete talents' },
      { status: 500 }
    )
  }
}
