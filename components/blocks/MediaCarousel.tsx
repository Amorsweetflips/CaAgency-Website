'use client'

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react'
import Image from 'next/image'

// React only calls these subscribe/snapshot helpers on the client (SSR uses
// the getServerSnapshot argument), but non-DOM environments like unit tests
// can still import and invoke them — the guards keep that from throwing.
function subscribeToPageVisibility(onChange: () => void) {
  if (typeof document === 'undefined') return () => {}
  document.addEventListener('visibilitychange', onChange)
  return () => document.removeEventListener('visibilitychange', onChange)
}

const REDUCED_MOTION_FALLBACK = {
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
} as unknown as MediaQueryList

let reducedMotionQuery: MediaQueryList | null = null

function getReducedMotionQuery() {
  if (typeof window === 'undefined') return REDUCED_MOTION_FALLBACK
  reducedMotionQuery ??= window.matchMedia('(prefers-reduced-motion: reduce)')
  return reducedMotionQuery
}

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = getReducedMotionQuery()
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

export interface MediaItem {
  type: 'video' | 'image'
  src: string
  alt?: string
  poster?: string
}

export interface MediaCarouselProps {
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
  // Server snapshot is false so SSR/hydration render the motion-on markup;
  // the client snapshot corrects it before paint for reduced-motion users.
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => getReducedMotionQuery().matches,
    () => false
  )
  // The carousel sits below the fold; keep posters and video bytes off the
  // critical first load by not mounting any media until it approaches the
  // viewport (autoplay on the active slide overrides preload="none", so
  // mounting early starts an MP4 download that competes with the hero LCP).
  const [isNearView, setIsNearView] = useState(false)
  // Live visibility (unlike the one-way isNearView mount latch): once the
  // section scrolls away or the tab is hidden, playback and the advance timer
  // stop instead of cycling 1-2.5MB reels off-screen for the rest of the
  // session.
  const [isInView, setIsInView] = useState(false)
  const isPageVisible = useSyncExternalStore(
    subscribeToPageVisibility,
    () => !document.hidden,
    () => true
  )
  // Playback can be refused (iOS Low Power Mode, autoplay policy) or fail
  // outright (missing/unsupported source from the CMS). No play button may
  // ever appear, so the active slide holds its poster, playback is retried on
  // the first user gesture, and the auto-advance timer takes over so the
  // carousel never stalls on a slide that will not play.
  const [playbackBlocked, setPlaybackBlocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())
  const currentIndexRef = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // Two observers, mirroring VideoPlayer. Mount latch: media mounts 200px
    // ahead of scroll so posters are ready. Playback gate: no margin and a
    // ~35% threshold — one shared 200px-margin observer would flip isInView
    // (and start MP4 fetch/decode) while the carousel is still off-screen.
    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearView(true)
          mountObserver.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    const playObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    )
    mountObserver.observe(el)
    playObserver.observe(el)
    return () => {
      mountObserver.disconnect()
      playObserver.disconnect()
    }
  }, [])


  const isAutoAdvanceEnabled =
    !prefersReducedMotion &&
    !isManuallyPaused &&
    !isInteractionPaused &&
    isInView &&
    isPageVisible

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  // Auto-advance only when nothing is suppressing it. Video slides advance
  // when playback finishes (onEnded) so a reel is never cut off mid-play; the
  // timer only drives image slides and video slides that refused or failed to
  // play (poster held, `ended` would never fire).
  const activeItemType = items[currentIndex]?.type
  useEffect(() => {
    if (!isAutoAdvanceEnabled) return
    if (activeItemType === 'video' && !playbackBlocked) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [isAutoAdvanceEnabled, activeItemType, playbackBlocked, next])

  // Pause non-active videos, play active — but only while the carousel is
  // actually on screen and the tab is visible.
  useEffect(() => {
    currentIndexRef.current = currentIndex
    videoRefs.current.forEach((video, index) => {
      // The ref callback never set()s null, but guard against a stale entry
      // if that invariant ever changes.
      if (!video) return
      if (
        index === currentIndex &&
        isInView &&
        isPageVisible &&
        !prefersReducedMotion &&
        !isManuallyPaused
      ) {
        // iOS only honours muted inline autoplay when the element is muted
        // before play() — set it imperatively, the attribute alone can race.
        video.defaultMuted = true
        video.muted = true
        video.play().then(
          () => setPlaybackBlocked(false),
          // Any refusal (autoplay policy or a broken source) parks the slide
          // on its poster — flag it so the timer fallback keeps things moving.
          () => setPlaybackBlocked(true)
        )
      } else {
        video.pause()
      }
    })
    // isNearView is a dep so the first play() attempt happens as soon as the
    // active slide's <video> mounts, not only on slide change.
  }, [currentIndex, isNearView, isInView, isPageVisible, prefersReducedMotion, isManuallyPaused])

  // Any tap or touch re-enables muted playback after a refusal — retry the
  // active slide on the first gesture (same pattern as VideoPlayer).
  useEffect(() => {
    if (!playbackBlocked) return
    const retry = () => {
      const video = videoRefs.current.get(currentIndexRef.current)
      video?.play().then(
        () => setPlaybackBlocked(false),
        () => {}
      )
    }
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'touchend', 'keydown']
    events.forEach((e) => window.addEventListener(e, retry, { once: true, passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, retry))
  }, [playbackBlocked])

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
            // Only the active video receives a source; adjacent slides retain
            // lightweight poster shells until selected.
            const shouldLoad = isNearView && isActive

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
                        if (el) {
                          el.defaultMuted = true
                          videoRefs.current.set(index, el)
                        } else {
                          videoRefs.current.delete(index)
                        }
                      }}
                      src={item.src}
                      poster={item.poster}
                      // No autoplay attribute: it would make the browser
                      // start fetching the MP4 at mount (200px early, even
                      // off-screen) despite preload="none". The play/pause
                      // effect above drives playback imperatively instead.
                      muted
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover"
                      onEnded={(e) => {
                        if (index !== currentIndex) return
                        // With a single item next() would be a state no-op and
                        // nothing would restart playback — loop in place then.
                        if (isAutoAdvanceEnabled && items.length > 1) {
                          next()
                        } else if (isInView && isPageVisible) {
                          // Paused (manually or via hover/reduced motion) or
                          // sole slide: keep the current reel looping in place.
                          const video = e.currentTarget
                          video.currentTime = 0
                          video.play().catch(() => {})
                        }
                        // Off-screen/hidden tab: leave it ended — the play
                        // effect restarts it when the carousel returns.
                      }}
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
