import { prisma } from '@/lib/prisma'

export async function getFeaturedTalents(limit = 6) {
  if (!process.env.PRISMA_DATABASE_URL) {
    return []
  }

  try {
    const talents = await prisma.talent.findMany({
      where: { category: 'instagram' },
      take: limit,
      orderBy: { order: 'asc' },
    })

    return talents.map((talent) => ({
      name: talent.name,
      imageUrl: talent.imageUrl,
      instagramUrl: talent.instagramUrl || undefined,
      tiktokUrl: talent.tiktokUrl || undefined,
      youtubeUrl: talent.youtubeUrl || undefined,
    }))
  } catch {
    return []
  }
}
