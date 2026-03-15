import AdminDashboard from '@/components/admin/AdminDashboard'
import { prisma } from '@/lib/prisma'
import { listSiteContentEntries } from '@/lib/site-content/service'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const [contentItems, talentsCount, postsCount] = await Promise.all([
    listSiteContentEntries(),
    prisma.talent.count().catch(() => 0),
    prisma.post.count().catch(() => 0),
  ])

  const contentUpdated = contentItems.filter((item) => item.updatedAt).length

  return (
    <AdminDashboard
      cards={[
        {
          title: 'Website content',
          description:
            'Beheer de vaste pagina’s van de website, inclusief home, about, services, contact, footer, legal content en SEO-landingspagina’s.',
          href: '/admin/content',
          cta: 'Open content editor',
          stats: [
            { label: 'Pagina’s / secties', value: String(contentItems.length) },
            { label: 'Aangepast vanuit admin', value: String(contentUpdated) },
          ],
        },
        {
          title: 'Talents',
          description:
            'Voeg creators toe, wijzig profielinformatie en beheer de volgorde van talenten op de website.',
          href: '/admin/talents',
          cta: 'Open talents',
          stats: [
            { label: 'Talents in database', value: String(talentsCount) },
            { label: 'Categorieën', value: '2+' },
          ],
        },
        {
          title: 'Blog',
          description:
            'Beheer artikelen, concepten en publicaties vanuit het bestaande blogbeheer.',
          href: '/admin/blog',
          cta: 'Open blog',
          stats: [
            { label: 'Posts', value: String(postsCount) },
            { label: 'Statussen', value: 'Draft/Live' },
          ],
        },
      ]}
    />
  )
}
