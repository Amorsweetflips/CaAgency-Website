'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface CoverflowCarouselProps {
  images: Array<{
    url: string
    alt?: string
    buttonText?: string
    buttonLink?: string
  }>
}

export default function CoverflowCarousel({ images }: CoverflowCarouselProps) {
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
      {/* Carousel Container */}
      <div className="relative w-full max-w-[900px] h-[500px] tablet:h-[440px] mobile:h-[360px] flex justify-center items-center overflow-hidden">
        {images.map((image, index) => {
          const isActive = index === currentIndex
          const isPrev = index === (currentIndex - 1 + images.length) % images.length
          const isNext = index === (currentIndex + 1) % images.length
          const isVisible = isActive || isPrev || isNext

          if (!isVisible) return null

          return (
            <div
              key={index}
              className="absolute transition-all duration-500 ease-out cursor-pointer"
              style={{
                width: isActive ? '300px' : '220px',
                height: isActive ? '450px' : '350px',
                opacity: isActive ? 1 : 0.5,
                transform: isActive
                  ? 'translateX(0) scale(1)'
                  : isPrev
                  ? 'translateX(-180px) scale(0.85)'
                  : 'translateX(180px) scale(0.85)',
                zIndex: isActive ? 10 : 5,
                filter: isActive ? 'none' : 'brightness(0.6)',
              }}
              onClick={() => !isActive && goToSlide(index)}
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
                <Image
                  src={image.url}
                  alt={image.alt || `Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="300px"
                  priority={index === 0}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)',
                  }}
                />

                {/* Button on active card */}
                {isActive && image.buttonText && image.buttonLink && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <Button href={image.buttonLink}>{image.buttonText}</Button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-8 mt-8">
        {/* Prev button */}
        <button
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300"
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
