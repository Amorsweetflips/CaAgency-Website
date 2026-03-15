import { notFound } from 'next/navigation'
import ContentEditor from '@/components/admin/ContentEditor'
import { siteContentDefinitionsByKey } from '@/lib/site-content/definitions'
import { getSiteContent } from '@/lib/site-content/service'

export const dynamic = 'force-dynamic'

export default async function AdminContentDetailPage({
  params,
}: {
  params: Promise<{ key: string }>
}) {
  const { key } = await params
  const definition = siteContentDefinitionsByKey[key]

  if (!definition) {
    notFound()
  }

  const data = await getSiteContent(key)

  return (
    <ContentEditor
      contentKey={key}
      title={definition.title}
      description={definition.description}
      fields={definition.fields}
      initialData={data}
    />
  )
}
