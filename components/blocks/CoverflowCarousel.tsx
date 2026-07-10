'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

interface CoverflowCarouselProps {
  images: Array<{
    url: string
    alt?: string
  }>
  linkTo?: string
  autoplay?: boolean
  autoplayIntervalMs?: number
}

export default function CoverflowCarousel({
  images,
  linkTo = '/talents',
  autoplay = false,
  autoplayIntervalMs = 5000,
}: CoverflowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current)
    }
  }, [])

  const settleAfterSlide = useCallback(() => {
    if (animationTimeout.current) clearTimeout(animationTimeout.current)
    animationTimeout.current = setTimeout(() => setIsAnimating(false), 500)
  }, [])

  const paginate = useCallback((direction: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => {
      let next = prev + direction
      if (next >= images.length) next = 0
      if (next < 0) next = images.length - 1
      return next
    })
    settleAfterSlide()
  }, [images.length, isAnimating, settleAfterSlide])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    settleAfterSlide()
  }

  // Touch/pointer swipe: a horizontal drag of 40px+ paginates. Click-through
  // on the active slide still works because small movements are ignored.
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
    swiped.current = false
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointerStart.current) return
    const dx = e.clientX - pointerStart.current.x
    const dy = e.clientY - pointerStart.current.y
    pointerStart.current = null
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true
      paginate(dx < 0 ? 1 : -1)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      paginate(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      paginate(1)
    }
  }

  // Avoid auto-advancing above-the-fold by default to keep LCP stable.
  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      paginate(1)
    }, autoplayIntervalMs)
    return () => clearInterval(timer)
  }, [autoplay, autoplayIntervalMs, paginate])

  return (
    <div
      className="relative w-full flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red/60"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured creators"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Carousel Container - Wider */}
      <div
        className="relative w-full max-w-[1300px] h-[620px] tablet:h-[520px] mobile:h-[420px] flex justify-center items-center overflow-hidden touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {images.map((image, index) => {
          const isActive = index === currentIndex
          const isPrev = index === (currentIndex - 1 + images.length) % images.length
          const isNext = index === (currentIndex + 1) % images.length
          const isVisible = isActive || isPrev || isNext

          if (!isVisible) return null

          // 9:16 cards match the vertical reel-format source assets, so
          // object-cover shows the full shot instead of a zoomed-in crop.
          const positionClasses = isActive
            ? 'translate-x-0 scale-100 opacity-100 z-10'
            : isPrev
            ? '-translate-x-[220px] tablet:-translate-x-[185px] mobile:-translate-x-[150px] scale-[0.65] opacity-55 z-[5]'
            : 'translate-x-[220px] tablet:translate-x-[185px] mobile:translate-x-[150px] scale-[0.65] opacity-55 z-[5]'

          return (
            <Link
              key={index}
              href={linkTo}
              className={`absolute block w-[324px] h-[576px] tablet:w-[270px] tablet:h-[480px] mobile:w-[216px] mobile:h-[384px] transition-all duration-500 ease-out cursor-pointer ${positionClasses}`}
              onClick={(e) => {
                if (swiped.current) {
                  e.preventDefault()
                  return
                }
                if (!isActive) {
                  e.preventDefault()
                  goToSlide(index)
                }
              }}
              draggable={false}
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-e2 group">
                <Image
                  src={image.url}
                  alt={image.alt || `Featured CA Agency creator, hero slide ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 767px) 216px, (max-width: 1024px) 270px, 324px"
                  quality={70}
                  priority={index === 0}
                  loading={index === 0 ? undefined : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 40%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 100%)',
                  }}
                />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Dot pagination */}
      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="flex h-6 w-6 items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              <span
                aria-hidden="true"
                className={`block rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'h-2 w-8 bg-foreground-primary'
                    : 'h-2 w-2 bg-black/25 hover:bg-black/40'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
