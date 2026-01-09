import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local files
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), 'my-prisma-postgres-app', '.env.local') })
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  // ============================================
  // INSTAGRAM & TIKTOK TALENTS
  // ============================================
  const instagramTalents = [
    // 1. Albina Mavriqi
    {
      name: 'Albina Mavriqi',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/albina-mavriqi.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/albina/',
      tiktokUrl: 'https://www.tiktok.com/@albinasglam/',
      order: 0,
    },
    // 2. Anton Drozhzhin
    {
      name: 'Anton Drozhzhin',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/anton-drozhzhin.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/closmain/',
      tiktokUrl: 'https://www.tiktok.com/@a.closmain/',
      order: 1,
    },
    // 3. Dariia Bordun
    {
      name: 'Dariia Bordun',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/dariia-bordun.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/_idareen_/',
      tiktokUrl: 'https://www.tiktok.com/@idareen_',
      order: 2,
    },
    // 4. Rebecca Ghaderi
    {
      name: 'Rebecca Ghaderi',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/rebecca-ghaderi.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/rebeccaghaderi',
      tiktokUrl: 'https://www.tiktok.com/@rebeccaghaderii',
      order: 3,
    },
    // 5. Melly Sanchez
    {
      name: 'Melly Sanchez',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/melly-sanchez.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/thefashionfreakk/',
      tiktokUrl: 'https://www.tiktok.com/@thefashionfreakk/',
      order: 4,
    },
    // 6. Melani Seiffert
    {
      name: 'Melani Seiffert',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/melani-seiffert.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/melaniseiffert/',
      tiktokUrl: 'https://www.tiktok.com/@melaniseiffert',
      order: 5,
    },
    // 7. Beatrix Ramosaj
    {
      name: 'Beatrix Ramosaj',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/beatrix-ramosaj.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/beatrixramosaj/',
      tiktokUrl: 'https://www.tiktok.com/@therealbeatrixramosaj/',
      order: 6,
    },
    // 8. Asel Akmatova
    {
      name: 'Asel Akmatova',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/asel-akmatova.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/aselbbh/',
      tiktokUrl: 'https://tiktok.com/@aselbbh/',
      order: 7,
    },
    // 9. Albulena Mavriqi
    {
      name: 'Albulena Mavriqi',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/lena-mavriqi.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/albulena.mavriqi/',
      tiktokUrl: 'https://www.tiktok.com/@lenamavriqii',
      order: 8,
    },
    // 10. Mariya Atwani
    {
      name: 'Mariya Atwani',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/mariya-atwani.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/itsmariyaxo/',
      tiktokUrl: 'https://www.tiktok.com/@itsmariyaxoo',
      youtubeUrl: 'https://www.youtube.com/@Itsmariyaxo',
      order: 9,
    },
    // 11. Chayna Hegener
    {
      name: 'Chayna Hegener',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/chayna-hegener.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/_chayna/',
      tiktokUrl: 'https://www.tiktok.com/@_chaynaa',
      order: 10,
    },
    // 12. Loresa Konushevci
    {
      name: 'Loresa Konushevci',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/loresa-konushevci.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/loresakonushevci/',
      tiktokUrl: 'https://www.tiktok.com/@loresakonushevci/',
      order: 11,
    },
    // 13. Ardita Gashi
    {
      name: 'Ardita Gashi',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/ardita-gashi.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/arditagasshi/',
      tiktokUrl: 'https://www.tiktok.com/@arditagashi__',
      order: 12,
    },
    // 14. Jay Sadiq
    {
      name: 'Jay Sadiq',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/jay-sadiq.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/jaysadiq_/',
      youtubeUrl: 'https://www.youtube.com/@Jaystyle_',
      tiktokUrl: 'https://www.tiktok.com/@jaysstyle_/',
      order: 13,
    },
    // 15. Douglas Abbes
    {
      name: 'Douglas Abbes',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/douglas-abbes.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/douglascassio/',
      tiktokUrl: 'https://www.tiktok.com/@_douglascassio',
      order: 14,
    },
    // 16. Anisa Hukmova
    {
      name: 'Anisa Hukmova',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/anisa-hukmova.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/anisavisage/',
      tiktokUrl: 'https://www.tiktok.com/@anisavisage',
      order: 15,
    },
    // 17. Khutjo Matsoma
    {
      name: 'Khutjo Matsoma',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/khutjo-matsoma.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/khutjomatsoma/',
      tiktokUrl: 'https://www.tiktok.com/@khutjo.matsoma/',
      order: 16,
    },
    // 18. Aurela Elshani
    {
      name: 'Aurela Elshani',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/aurela-elshani.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/glowbyaure/',
      tiktokUrl: 'https://www.tiktok.com/@aurela.elshani',
      order: 17,
    },
    // 19. Qendresa Konushevci
    {
      name: 'Qendresa Konushevci',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/qendresa-konushevci.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/qendresak/',
      tiktokUrl: 'https://www.tiktok.com/@qendresak',
      order: 18,
    },
    // 20. Georgii Galaev
    {
      name: 'Georgii Galaev',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/georgii-galaev.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/pomogisebe/',
      order: 19,
    },
  ]

  // ============================================
  // YOUTUBE TALENTS
  // ============================================
  const youtubeTalents = [
    // 1. Baka
    {
      name: 'Baka',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/youtube/baka.jpeg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/bakaprase',
      tiktokUrl: 'https://www.tiktok.com/@bakaprase',
      order: 0,
    },
    // 2. Voyage
    {
      name: 'Voyage',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/youtube/voyage.jpeg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/voyage.mp3/',
      youtubeUrl: 'https://www.youtube.com/channel/UCKmVog8RvluGkUOE38PEleQ',
      order: 1,
    },
    // 3. Luka
    {
      name: 'Luka',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/youtube/luka.jpeg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/lukabojovic23/',
      youtubeUrl: 'https://www.youtube.com/@Lux27ytchannel',
      tiktokUrl: 'https://www.tiktok.com/@lukabojovic23',
      order: 2,
    },
    // 4. Choda
    {
      name: 'Choda',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/youtube/choda.jpeg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/choda19a/',
      youtubeUrl: 'https://www.youtube.com/@Choda19a',
      tiktokUrl: 'https://www.tiktok.com/@choda19a',
      order: 3,
    },
    // 5. Windoh
    {
      name: 'Windoh',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/youtube/windoh.jpeg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/windoh',
      youtubeUrl: 'https://www.youtube.com/@Windoh',
      twitchUrl: 'https://www.twitch.tv/windoh',
      order: 4,
    },
    // 6. Yassuo
    {
      name: 'Yassuo',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/youtube/yassuo.jpeg',
      category: 'youtube',
      youtubeUrl: 'https://www.youtube.com/yassuo',
      tiktokUrl: 'https://www.tiktok.com/@yassuo',
      twitchUrl: 'https://www.twitch.tv/yassuo',
      kickUrl: 'https://kick.com/yassuo',
      order: 5,
    },
  ]

  // Talents to delete (no longer with the agency)
  const talentsToDelete = [
    'Valeriia Vakar',
    'Chanel Sorée',
    'Liz Vinet',
    'Chloe Paredes',
    'Melody Ozgoli',
    'Huda Belhaddad',
    'Yasaman Khatibi',
    'Aysa Amini',
    'Franceska Rustem',
    'Sadaf Torabi',
    'Lidia Jora',
    'Anagha Sabu',
    'Saranda Mavriqi',
    'Lena Mavriqi', // Now named Albulena Mavriqi
  ]

  console.log('Deleting removed talents...')
  for (const name of talentsToDelete) {
    await prisma.talent.deleteMany({
      where: { name },
    })
  }

  console.log('Seeding talents...')

  for (const talent of [...instagramTalents, ...youtubeTalents]) {
    await prisma.talent.upsert({
      where: { name: talent.name },
      update: talent,
      create: talent,
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
