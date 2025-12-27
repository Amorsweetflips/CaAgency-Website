import { PrismaClient } from '../generated/prisma-client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Welcome to Next.js + Prisma',
      content: 'This is a sample post created by the seed script. You can edit or delete it!',
      published: true,
    },
  })

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Getting Started with Prisma',
      content: 'Prisma is a next-generation ORM that makes database access easy and type-safe.',
      published: true,
    },
  })

  const post3 = await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Draft Post Example',
      content: 'This is a draft post that is not published yet.',
      published: false,
    },
  })

  console.log('Seeded posts:', { post1, post2, post3 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
