'use client'

import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'

type OverviewItem = {
  key: string
  title: string
  description: string
  updatedAt: string | null
}

export default function ContentOverview({
  items,
}: {
  items: OverviewItem[]
}) {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items

    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.key.toLowerCase().includes(normalized)
    )
  }, [items, query])

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Website content</p>
            <Heading as="h2" color="white" className="mt-4 text-[40px] mobile:text-[30px]">
              Duidelijk overzicht per pagina en sectie
            </Heading>
            <p className="mt-4 text-base leading-7 text-white/70">
              Elke kaart opent een bewerkscherm met vaste velden. Zo blijft het beheer overzichtelijk en kun je pagina&apos;s veilig aanpassen zonder in code te werken.
            </p>
          </div>

          <div className="w-full max-w-[320px]">
            <label className="mb-2 block text-sm text-white/60">Zoek pagina of sectie</label>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Bijv. home, footer, dubai"
              className="w-full rounded-[16px] border border-white/15 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/30"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <article
            key={item.key}
            className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Heading as="h3" color="white" className="text-[28px]">
                  {item.title}
                </Heading>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/35">
                  {item.key}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">
                {item.updatedAt
                  ? new Date(item.updatedAt).toLocaleDateString('nl-NL')
                  : 'Default'}
              </div>
            </div>

            <p className="mt-4 min-h-[72px] text-sm leading-6 text-white/65">
              {item.description}
            </p>

            <div className="mt-6">
              <Button href={`/admin/content/${item.key}`}>Open editor</Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
