'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import CoverflowCarousel from './CoverflowCarousel'

interface DeferredHeroCarouselProps {
  images: Array<{
    url: string
    alt?: string
  }>
  linkTo?: string
  deferMs?: number
}

export default function DeferredHeroCarousel({
  images,
  linkTo = '/talents',
  deferMs = 1500,
}: DeferredHeroCarouselProps) {
  const [showInteractiveCarousel, setShowInteractiveCarousel] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowInteractiveCarousel(true)
    }, deferMs)

    return () => window.clearTimeout(timer)
  }, [deferMs])

  if (images.length === 0) return null

  if (showInteractiveCarousel) {
    return <CoverflowCarousel images={images} linkTo={linkTo} autoplay={false} />
  }

  const firstImage = images[0]

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full max-w-[1300px] h-[620px] tablet:h-[520px] mobile:h-[420px] flex justify-center items-center overflow-hidden">
        <Link href={linkTo} className="block w-[420px] h-[560px] tablet:w-[360px] tablet:h-[480px] mobile:w-[260px] mobile:h-[360px]">
          <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
            <Image
              src={firstImage.url}
              alt={firstImage.alt || 'CA Agency talent highlight'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 260px, (max-width: 1024px) 360px, 420px"
              quality={70}
              priority
              fetchPriority="high"
            />

            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)',
              }}
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
