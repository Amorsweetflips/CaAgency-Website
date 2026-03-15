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
            'Manage the fixed pages of the website, including home, about, services, contact, footer, legal content and SEO landing pages.',
          href: '/admin/content',
          cta: 'Open content editor',
          stats: [
            { label: 'Pages / sections', value: String(contentItems.length) },
            { label: 'Modified from admin', value: String(contentUpdated) },
          ],
        },
        {
          title: 'Talents',
          description:
            'Add creators, edit profile information and manage the order of talents on the website.',
          href: '/admin/talents',
          cta: 'Open talents',
          stats: [
            { label: 'Talents in database', value: String(talentsCount) },
            { label: 'Categories', value: '2+' },
          ],
        },
        {
          title: 'Blog',
          description:
            'Manage articles, drafts and publications from the existing blog management.',
          href: '/admin/blog',
          cta: 'Open blog',
          stats: [
            { label: 'Posts', value: String(postsCount) },
            { label: 'Statuses', value: 'Draft/Live' },
          ],
        },
      ]}
    />
  )
}
