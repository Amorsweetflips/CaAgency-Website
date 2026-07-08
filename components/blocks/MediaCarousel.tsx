'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface MediaItem {
  type: 'video' | 'image'
  src: string
  alt?: string
  poster?: string
}

interface MediaCarouselProps {
  items: MediaItem[]
  className?: string
}

export default function MediaCarousel({ items, className = '' }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  // Manual pause (the Pause/Play button) is kept separate from transient
  // interaction pausing (hover/focus) so a deliberate pause is not undone when
  // the pointer or focus simply leaves the carousel.
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [isInteractionPaused, setIsInteractionPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  // The carousel sits below the fold; keep posters and video bytes off the
  // critical first load by not mounting any media until it approaches the
  // viewport (autoplay on the active slide overrides preload="none", so
  // mounting early starts an MP4 download that competes with the hero LCP).
  const [isNearView, setIsNearView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Detect reduced-motion on the client only, to avoid hydration mismatches.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  const isAutoAdvanceEnabled =
    !prefersReducedMotion && !isManuallyPaused && !isInteractionPaused

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  // Auto-advance only when nothing is suppressing it.
  useEffect(() => {
    if (!isAutoAdvanceEnabled) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [isAutoAdvanceEnabled, next])

  // Pause non-active videos, play active
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index === currentIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [currentIndex])

  return (
    <div
      ref={containerRef}
      className={`media-carousel ${className}`}
      onMouseEnter={() => setIsInteractionPaused(true)}
      onMouseLeave={() => setIsInteractionPaused(false)}
      onFocusCapture={() => setIsInteractionPaused(true)}
      onBlurCapture={(e) => {
        // Only resume when focus actually leaves the carousel subtree, not when
        // it moves between the arrows/dots inside it.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsInteractionPaused(false)
        }
      }}
    >
      <div className="relative">
        {/* Main carousel container */}
        <div className="relative w-[340px] h-[600px] tablet:w-[300px] tablet:h-[530px] mobile:w-[260px] mobile:h-[460px] rounded-[20px] overflow-hidden bg-black/5">
          {items.map((item, index) => {
            const isActive = index === currentIndex
            const isPrev = index === (currentIndex - 1 + items.length) % items.length
            const isNext = index === (currentIndex + 1) % items.length
            // Only render video src for active and adjacent slides, and only
            // once the carousel is near the viewport.
            const shouldLoad = isNearView && (isActive || isPrev || isNext)

            return (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? 'translateX(0) scale(1)'
                    : isPrev
                    ? 'translateX(-100%) scale(0.9)'
                    : isNext
                    ? 'translateX(100%) scale(0.9)'
                    : 'translateX(0) scale(0.8)',
                  zIndex: isActive ? 10 : 0,
                }}
              >
                {item.type === 'video' ? (
                  shouldLoad ? (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(index, el)
                        else videoRefs.current.delete(index)
                      }}
                      src={item.src}
                      poster={item.poster}
                      autoPlay={isActive}
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/10" />
                  )
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt || `CA Agency influencer campaign content, slide ${index + 1} of ${items.length}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 340px"
                    loading="lazy"
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all z-20"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all z-20"
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Pagination dots + pause toggle */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {!prefersReducedMotion && (
            <button
              onClick={() => setIsManuallyPaused((p) => !p)}
              aria-label={isManuallyPaused ? 'Play carousel' : 'Pause carousel'}
              className="w-6 h-6 flex items-center justify-center rounded-full text-black/60 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black mr-1"
            >
              {isManuallyPaused ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              )}
            </button>
          )}
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-6 h-6 flex items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              <span
                aria-hidden="true"
                className={`block rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-foreground-primary'
                    : 'w-2 h-2 bg-black/25 hover:bg-black/40'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
