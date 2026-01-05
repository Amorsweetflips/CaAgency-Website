import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local files
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), 'my-prisma-postgres-app', '.env.local') })
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  // Instagram & TikTok talents
  const instagramTalents = [
    {
      name: 'Rebecca Ghaderi',
      imageUrl: '/images/talents/melly-sanchez.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/rebeccaghaderi',
      tiktokUrl: 'https://www.tiktok.com/@rebeccaghaderii',
      order: 0,
    },
    {
      name: 'Melly Sanchez',
      imageUrl: '/images/talents/lidia-jora.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/thefashionfreakk/',
      tiktokUrl: 'https://www.tiktok.com/@thefashionfreakk/',
      order: 1,
    },
    {
      name: 'Lidia Jora',
      imageUrl: '/images/talents/sadaf-torabi.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/gold.en_queen/',
      youtubeUrl: 'https://www.youtube.com/@gold.en_queen.',
      tiktokUrl: 'https://www.tiktok.com/@gold.en_queen',
      order: 2,
    },
    {
      name: 'Sadaf Torabi',
      imageUrl: '/images/talents/asel-akmatova.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/shellbeauty1/',
      youtubeUrl: 'https://www.youtube.com/@ShellBeauty1',
      tiktokUrl: 'https://www.tiktok.com/@shellbeautyy',
      order: 3,
    },
    {
      name: 'Asel Akmatova',
      imageUrl: '/images/talents/dariia-bordun.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/aselbbh/',
      youtubeUrl: 'https://www.youtube.com/@aselbbh',
      tiktokUrl: 'https://tiktok.com/@aselbbh/',
      order: 4,
    },
    {
      name: 'Dariia Bordun',
      imageUrl: '/images/talents/mariya-atwani.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/_idareen_/',
      tiktokUrl: 'https://www.tiktok.com/@idareen_',
      order: 5,
    },
    {
      name: 'Mariya Atwani',
      imageUrl: '/images/talents/chloe-paredes.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/itsmariyaxo/',
      youtubeUrl: 'https://www.youtube.com/@Itsmariyaxo',
      order: 6,
    },
    {
      name: 'Lena Mavriqi',
      imageUrl: '/images/talents/albina-mavriqi.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/albulena.mavriqi/',
      tiktokUrl: 'https://www.tiktok.com/@lenamavriqii',
      order: 7,
    },
    {
      name: 'Albina Mavriqi',
      imageUrl: '/images/talents/melody-ozgoli.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/albina/',
      tiktokUrl: 'https://www.tiktok.com/@albinamavriqii/',
      order: 8,
    },
    {
      name: 'Beatrix Ramosaj',
      imageUrl: '/images/talents/franceska-rustem.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/beatrixramosaj/',
      youtubeUrl: 'https://www.youtube.com/user/TheBeautyBeatrix',
      tiktokUrl: 'https://www.tiktok.com/@therealbeatrixramosaj/',
      order: 9,
    },
    {
      name: 'Douglas Abbes',
      imageUrl: '/images/talents/aysa-amini.jpeg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/douglascassio/',
      order: 10,
    },
    {
      name: 'Chayna Hegener',
      imageUrl: '/images/talents/saranda-mavriqi.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/_chayna/',
      tiktokUrl: 'https://www.tiktok.com/@_chaynaa',
      order: 11,
    },
    {
      name: 'Saranda Mavriqi',
      imageUrl: '/images/talents/anisa-hukmova.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/sarandamavriqi/',
      order: 12,
    },
    {
      name: 'Anisa Hukmova',
      imageUrl: '/images/talents/khutjo-matsoma.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/anisavisage/',
      tiktokUrl: 'https://www.tiktok.com/@anisavisage',
      order: 13,
    },
    {
      name: 'Khutjo Matsoma',
      imageUrl: '/images/talents/liz-vinet.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/khutjomatsoma/',
      tiktokUrl: 'https://www.tiktok.com/@khutjo.matsoma/',
      order: 14,
    },
    {
      name: 'Loresa Konushevci',
      imageUrl: '/images/talents/melani-seiffert.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/loresakonushevci/',
      order: 15,
    },
    {
      name: 'Melani Seiffert',
      imageUrl: '/images/talents/valeriia-vakar.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/melaniseiffert/',
      tiktokUrl: 'https://www.tiktok.com/@melaniseiffert/',
      order: 16,
    },
    {
      name: 'Anagha Sabu',
      imageUrl: '/images/talents/anton-drozhzhin.png',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/dr_anagha_sabu/',
      youtubeUrl: 'https://www.youtube.com/@hi_i_am_anagha/featured',
      order: 17,
    },
    {
      name: 'Anton Drozhzhin',
      imageUrl: '/images/talents/anton-correct.jpg',
      category: 'instagram',
      instagramUrl: 'https://www.instagram.com/closmain',
      tiktokUrl: 'https://www.tiktok.com/@a.closmain',
      order: 18,
    },
  ]

  // YouTube talents
  const youtubeTalents = [
    {
      name: 'Voyage',
      imageUrl: '/images/talents/baka.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/voyage.mp3/',
      youtubeUrl: 'https://www.youtube.com/channel/UCKmVog8RvluGkUOE38PEleQ',
      order: 0,
    },
    {
      name: 'Baka',
      imageUrl: '/images/talents/luka.jpeg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/bakaprase',
      tiktokUrl: 'https://www.tiktok.com/@bakaprase',
      order: 1,
    },
    {
      name: 'Luka',
      imageUrl: '/images/talents/choda.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/lukabojovic23/',
      youtubeUrl: 'https://www.youtube.com/@Lux27ytchannel',
      tiktokUrl: 'https://www.tiktok.com/@lukabojovic23',
      order: 2,
    },
    {
      name: 'Choda',
      imageUrl: '/images/talents/windoh.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/choda19a/',
      youtubeUrl: 'https://www.youtube.com/@Choda19a',
      tiktokUrl: 'https://www.tiktok.com/@choda19a',
      order: 3,
    },
    {
      name: 'Windoh',
      imageUrl: '/images/talents/yassuo.jpg',
      category: 'youtube',
      instagramUrl: 'https://www.instagram.com/windoh',
      youtubeUrl: 'https://www.youtube.com/@Windoh',
      twitchUrl: 'https://www.twitch.tv/windoh',
      order: 4,
    },
    {
      name: 'Yassuo',
      imageUrl: '/images/talents/yassuo-100thieves.jpg',
      category: 'youtube',
      youtubeUrl: 'https://www.youtube.com/yassuo',
      tiktokUrl: 'https://www.tiktok.com/@yassuo',
      twitchUrl: 'https://www.twitch.tv/yassuo',
      kickUrl: 'https://kick.com/yassuo',
      order: 5,
    },
  ]

  // Talents to delete
  const talentsToDelete = [
    'Valeriia Vakar',
    'Chanel Sorée',
    'Liz Vinet',
    'Chloe Paredes',
    'Melody Ozgoli',
    'Huda Belhaddad',
    'Yasaman Khatibi',
    'Jay Sadiq',
    'Aysa Amini',
    'Franceska Rustem',
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
