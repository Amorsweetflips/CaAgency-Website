import ContentOverview from '@/components/admin/ContentOverview'
import { listSiteContentEntries } from '@/lib/site-content/service'

export const dynamic = 'force-dynamic'

export default async function AdminContentPage() {
  const items = await listSiteContentEntries()

  return (
    <ContentOverview
      items={items.map((item) => ({
        ...item,
        updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
      }))}
    />
  )
}
