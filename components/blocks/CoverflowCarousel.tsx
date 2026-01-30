'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

interface CoverflowCarouselProps {
  images: Array<{
    url: string
    alt?: string
  }>
  linkTo?: string
}

export default function CoverflowCarousel({ images, linkTo = '/talents' }: CoverflowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const paginate = useCallback((direction: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => {
      let next = prev + direction
      if (next >= images.length) next = 0
      if (next < 0) next = images.length - 1
      return next
    })
    setTimeout(() => setIsAnimating(false), 500)
  }, [images.length, isAnimating])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 5000)
    return () => clearInterval(timer)
  }, [paginate])

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Carousel Container - Wider */}
      <div className="relative w-full max-w-[1300px] h-[620px] tablet:h-[520px] mobile:h-[420px] flex justify-center items-center overflow-hidden">
        {images.map((image, index) => {
          const isActive = index === currentIndex
          const isPrev = index === (currentIndex - 1 + images.length) % images.length
          const isNext = index === (currentIndex + 1) % images.length
          const isVisible = isActive || isPrev || isNext

          if (!isVisible) return null

          return (
            <Link
              key={index}
              href={linkTo}
              className="absolute transition-all duration-500 ease-out cursor-pointer block"
              style={{
                width: isActive ? '420px' : '320px',
                height: isActive ? '560px' : '420px',
                opacity: isActive ? 1 : 0.7,
                transform: isActive
                  ? 'translateX(0) scale(1)'
                  : isPrev
                  ? 'translateX(-280px) scale(0.85)'
                  : 'translateX(280px) scale(0.85)',
                zIndex: isActive ? 10 : 5,
                filter: isActive ? 'none' : 'brightness(0.7)',
              }}
              onClick={(e) => {
                if (!isActive) {
                  e.preventDefault()
                  goToSlide(index)
                }
              }}
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl group">
                <Image
                  src={image.url}
                  alt={image.alt || `CA Agency talent ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                  priority={index === 0 || isPrev || isNext}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)',
                  }}
                />
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}
