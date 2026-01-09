import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local files
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), 'my-prisma-postgres-app', '.env.local') })
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  // Instagram & TikTok talents - Updated list with correct social media links
  const instagramTalents = [
    {
      name: 'Melly Sanchez',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/melly-sanchez.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/thefashionfreakk/',
      tiktokUrl: 'https://www.tiktok.com/@thefashionfreakk/',
      order: 3,
    },
    {
      name: 'Beatrix Ramosaj',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/beatrix-ramosaj.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/beatrixramosaj/',
      tiktokUrl: 'https://www.tiktok.com/@therealbeatrixramosaj/',
      order: 6,
    },
    {
      name: 'Melani Seiffert',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/melani-seiffert.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/melaniseiffert/',
      tiktokUrl: 'https://www.tiktok.com/@melaniseiffert',
      order: 4,
    },
    {
      name: 'Asel Akmatova',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/asel-akmatova.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/aselbbh/',
      tiktokUrl: 'https://tiktok.com/@aselbbh/',
      order: 7,
    },
    {
      name: 'Dariia Bordun',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/dariia-bordun.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/_idareen_/',
      tiktokUrl: 'https://www.tiktok.com/@idareen_',
      order: 5,
    },
    {
      name: 'Albulena Mavriqi',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/lena-mavriqi.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/albulena.mavriqi/',
      tiktokUrl: 'https://www.tiktok.com/@lenamavriqii',
      order: 8,
    },
    {
      name: 'Mariya Atwani',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/mariya-atwani.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/itsmariyaxo/',
      tiktokUrl: 'https://www.tiktok.com/@itsmariyaxoo',
      youtubeUrl: 'https://www.youtube.com/@Itsmariyaxo',
      order: 9,
    },
    {
      name: 'Chayna Hegener',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/chayna-hegener.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/_chayna/',
      tiktokUrl: 'https://www.tiktok.com/@_chaynaa',
      order: 10,
    },
    {
      name: 'Loresa Konushevci',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/loresa-konushevci.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/loresakonushevci/',
      tiktokUrl: 'https://www.tiktok.com/@loresakonushevci/',
      order: 11,
    },
    {
      name: 'Ardita Gashi',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/ardita-gashi.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/arditagasshi/',
      tiktokUrl: 'https://www.tiktok.com/@arditagashi__',
      order: 12,
    },
    {
      name: 'Jay Sadiq',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/jay-sadiq.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/jaysadiq_/',
      youtubeUrl: 'https://www.youtube.com/@Jaystyle_',
      tiktokUrl: 'https://www.tiktok.com/@jaysstyle_/',
      order: 13,
    },
    {
      name: 'Douglas Abbes',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/douglas-abbes.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/douglascassio/',
      tiktokUrl: 'https://www.tiktok.com/@_douglascassio',
      order: 14,
    },
    {
      name: 'Albina Mavriqi',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/albina-mavriqi.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/albina/',
      tiktokUrl: 'https://www.tiktok.com/@albinasglam/',
      order: 0,
    },
    {
      name: 'Rebecca Ghaderi',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/rebecca-ghaderi.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/rebeccaghaderi',
      tiktokUrl: 'https://www.tiktok.com/@rebeccaghaderii',
      order: 2,
    },
    {
      name: 'Anisa Hukmova',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/anisa-hukmova.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/anisavisage/',
      tiktokUrl: 'https://www.tiktok.com/@anisavisage',
      order: 15,
    },
    {
      name: 'Khutjo Matsoma',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/khutjo-matsoma.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/khutjomatsoma/',
      tiktokUrl: 'https://www.tiktok.com/@khutjo.matsoma/',
      order: 16,
    },
    {
      name: 'Aurela Elshani',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/aurela-elshani.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/glowbyaure/',
      tiktokUrl: 'https://www.tiktok.com/@aurela.elshani',
      order: 17,
    },
    {
      name: 'Qendresa Konushevci',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/qendresa-konushevci.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/qendresak/',
      tiktokUrl: 'https://www.tiktok.com/@qendresak',
      order: 18,
    },
    {
      name: 'Georgii Galaev',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/georgii-galaev.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/pomogisebe/',
      order: 19,
    },
    {
      name: 'Anton Drozhzhin',
      imageUrl: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/anton-drozhzhin.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/closmain/',
      tiktokUrl: 'https://www.tiktok.com/@a.closmain/',
      order: 1,
    },
  ]

  // YouTube talents - Order: Baka, Voyage, Luka, Choda, Windoh, Yassuo
  const youtubeTalents = [
    {
      name: 'Baka',
      imageUrl: '/images/talents/baka.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/bakaprase',
      tiktokUrl: 'https://www.tiktok.com/@bakaprase',
      order: 0,
    },
    {
      name: 'Voyage',
      imageUrl: '/images/talents/voyage.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/voyage.mp3/',
      youtubeUrl: 'https://www.youtube.com/channel/UCKmVog8RvluGkUOE38PEleQ',
      order: 1,
    },
    {
      name: 'Luka',
      imageUrl: '/images/talents/luka.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/lukabojovic23/',
      youtubeUrl: 'https://www.youtube.com/@Lux27ytchannel',
      tiktokUrl: 'https://www.tiktok.com/@lukabojovic23',
      order: 2,
    },
    {
      name: 'Choda',
      imageUrl: '/images/talents/choda.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/choda19a/',
      youtubeUrl: 'https://www.youtube.com/@Choda19a',
      tiktokUrl: 'https://www.tiktok.com/@choda19a',
      order: 3,
    },
    {
      name: 'Windoh',
      imageUrl: '/images/talents/windoh.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/windoh',
      youtubeUrl: 'https://www.youtube.com/@Windoh',
      twitchUrl: 'https://www.twitch.tv/windoh',
      order: 4,
    },
    {
      name: 'Yassuo',
      imageUrl: '/images/talents/yassuo.jpg',
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
