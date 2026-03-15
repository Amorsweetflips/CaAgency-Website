'use client'

import { useMemo } from 'react'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'

type DashboardStat = {
  label: string
  value: string
}

type DashboardCard = {
  title: string
  description: string
  href: string
  cta: string
  stats: DashboardStat[]
}

export default function AdminDashboard({
  cards,
}: {
  cards: DashboardCard[]
}) {
  const quickStats = useMemo(
    () =>
      cards.flatMap((card) =>
        card.stats.map((stat) => ({
          key: `${card.title}-${stat.label}`,
          ...stat,
        }))
      ),
    [cards]
  )

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Admin overzicht</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Heading as="h2" color="white" className="text-[44px] mobile:text-[32px]">
              Beheer alle websitecontent vanuit één plek
            </Heading>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
              Gebruik de modules hieronder om vaste pagina&apos;s, blogartikelen en talents overzichtelijk te beheren.
            </p>
          </div>
          <Button href="/admin/content">Open website content</Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickStats.map((stat) => (
            <div key={stat.key} className="rounded-[20px] border border-white/8 bg-black/20 p-5">
              <div className="font-anegra text-[34px] leading-none text-white">{stat.value}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/45">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.href}
            className="flex flex-col rounded-[24px] border border-white/10 bg-white/[0.03] p-6"
          >
            <Heading as="h3" color="white" className="text-[28px]">
              {card.title}
            </Heading>
            <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/65">
              {card.description}
            </p>

            <div className="mt-6 space-y-3">
              {card.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-[16px] border border-white/8 bg-black/20 px-4 py-3"
                >
                  <span className="text-sm text-white/55">{stat.label}</span>
                  <span className="font-anegra text-[22px] text-white">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button href={card.href}>{card.cta}</Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
