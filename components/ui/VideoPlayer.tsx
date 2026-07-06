'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface VideoPlayerProps {
  src: string
  className?: string
  aspectRatio?: '9:16' | '16:9' | '1:1'
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  /** Representative frame shown before the video loads/plays */
  poster?: string
  /** Show the poster with a play button; only fetch the video on demand.
      Use for very heavy sources that should not download on page load. */
  clickToPlay?: boolean
}

export default function VideoPlayer({
  src,
  className,
  aspectRatio = '16:9',
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
  poster,
  clickToPlay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [activated, setActivated] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // Lazy load: mount the <video> once it approaches the viewport, and keep
  // observing so playback pauses off-screen and resumes in view.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) setIsVisible(true)
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Autoplay respects reduced motion; playback pauses when scrolled away.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const wantsPlayback = (autoplay && !prefersReducedMotion && !clickToPlay) || activated
    if (isInView && wantsPlayback) {
      video.play().catch(() => {
        // Autoplay failed, user interaction required
      })
    } else {
      video.pause()
    }
  }, [isVisible, isInView, autoplay, prefersReducedMotion, clickToPlay, activated])

  const aspectClasses = {
    '9:16': 'aspect-9/16',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
  }

  const showFacade = clickToPlay && !activated

  return (
    <div
      ref={containerRef}
      className={cn(aspectClasses[aspectRatio], 'relative bg-black/10 rounded-[30px] overflow-hidden', className)}
    >
      {showFacade ? (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label="Play video"
        >
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" className="h-full w-full object-cover" loading="lazy" />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-foreground-primary shadow-e2 transition-transform group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      ) : (
        (isVisible || activated) && (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full object-cover"
            autoPlay={activated || (autoplay && !prefersReducedMotion)}
            muted={muted}
            loop={loop}
            playsInline
            controls={controls || activated}
            preload="none"
          />
        )
      )}
    </div>
  )
}
