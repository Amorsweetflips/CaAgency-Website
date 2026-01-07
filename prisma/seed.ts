import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local files
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), 'my-prisma-postgres-app', '.env.local') })
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  // Instagram & TikTok talents - with correct image file extensions
  const instagramTalents = [
    {
      name: 'Melly Sanchez',
      imageUrl: '/images/talents/melly-sanchez.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/thefashionfreakk/',
      tiktokUrl: 'https://www.tiktok.com/@thefashionfreakk/',
      order: 0,
    },
    {
      name: 'Beatrix Ramosaj',
      imageUrl: '/images/talents/beatrix-ramosaj.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/beatrixramosaj/',
      tiktokUrl: 'https://www.tiktok.com/@therealbeatrixramosaj/',
      order: 1,
    },
    {
      name: 'Asel Akmatova',
      imageUrl: '/images/talents/asel-akmatova.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/aselbbh/',
      tiktokUrl: 'https://tiktok.com/@aselbbh/',
      order: 2,
    },
    {
      name: 'Dariia Bordun',
      imageUrl: '/images/talents/dariia-bordun.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/_idareen_/',
      tiktokUrl: 'https://www.tiktok.com/@idareen_',
      order: 3,
    },
    {
      name: 'Chayna Hegener',
      imageUrl: '/images/talents/chayna-hegener.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/_chayna/',
      tiktokUrl: 'https://www.tiktok.com/@_chaynaa',
      order: 4,
    },
    {
      name: 'Loresa Konushevci',
      imageUrl: '/images/talents/loresa-konushevci.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/loresakonushevci/',
      tiktokUrl: 'https://www.tiktok.com/@loresakonushevci/',
      order: 5,
    },
    {
      name: 'Jay Sadiq',
      imageUrl: '/images/talents/jay-sadiq.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/jaysadiq_/',
      youtubeUrl: 'https://www.youtube.com/@Jaystyle_',
      tiktokUrl: 'https://www.tiktok.com/@jaysstyle_/',
      order: 6,
    },
    {
      name: 'Douglas Abbes',
      imageUrl: '/images/talents/douglas-abbes.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/douglascassio/',
      tiktokUrl: 'https://www.tiktok.com/@_douglascassio',
      order: 7,
    },
    {
      name: 'Albina Mavriqi',
      imageUrl: '/images/talents/albina-mavriqi.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/albina/',
      tiktokUrl: 'https://www.tiktok.com/@albinasglam/',
      order: 8,
    },
    {
      name: 'Rebecca Ghaderi',
      imageUrl: '/images/talents/rebecca-ghaderi.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/rebeccaghaderi',
      tiktokUrl: 'https://www.tiktok.com/@rebeccaghaderii',
      order: 9,
    },
    {
      name: 'Anisa Hukmova',
      imageUrl: '/images/talents/anisa-hukmova.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/anisavisage/',
      tiktokUrl: 'https://www.tiktok.com/@anisavisage',
      order: 10,
    },
    {
      name: 'Khutjo Matsoma',
      imageUrl: '/images/talents/khutjo-matsoma.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/khutjomatsoma/',
      tiktokUrl: 'https://www.tiktok.com/@khutjo.matsoma/',
      order: 11,
    },
    {
      name: 'Saranda Mavriqi',
      imageUrl: '/images/talents/saranda-mavriqi.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/sarandamavriqi/',
      order: 12,
    },
    {
      name: 'Anton Drozhzhin',
      imageUrl: '/images/talents/anton-drozhzhin.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/closmain/',
      tiktokUrl: 'https://www.tiktok.com/@a.closmain/',
      order: 13,
    },
  ]

  // YouTube talents (photos shifted left: Anton is now Instagram, all others moved)
  const youtubeTalents = [
    {
      name: 'Voyage',
      imageUrl: '/images/talents/voyage.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/voyage.mp3/',
      youtubeUrl: 'https://www.youtube.com/channel/UCKmVog8RvluGkUOE38PEleQ',
      order: 0,
    },
    {
      name: 'Baka',
      imageUrl: '/images/talents/baka.jpeg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/bakaprase',
      tiktokUrl: 'https://www.tiktok.com/@bakaprase',
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
    'Lena Mavriqi',
    'Mariya Atwani',
    'Melani Seiffert',
    'Ardita Gashi',
    'Aurela Elshani',
    'Qendresa Konushevci',
    'Georgii Galaev',
    'Yassuo',
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
