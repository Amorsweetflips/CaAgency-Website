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
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isInView, setIsInView] = useState(false)
  // Autoplay can be suppressed by the browser (Low Power Mode, autoplay
  // policy). Client decision (July 2026): no play button may ever appear —
  // native or custom — so a suppressed tile simply holds its poster frame and
  // playback is retried on the first user gesture anywhere on the page.
  const [needsManualStart, setNeedsManualStart] = useState(false)

  // Two observers with different jobs. Mount: the <video> mounts 200px ahead
  // of scroll so the poster is ready. Playback: a tile must actually be ~35%
  // on screen before it plays — on the mobile 2x2 showcase grid this caps
  // concurrent playback to the visible row instead of starting four MP4
  // downloads at once (the old single 200px-margin observer started them all).
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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

  // Playback pauses when scrolled away and resumes in view.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isInView && autoplay) {
      // iOS only honours muted inline autoplay when the element is muted
      // before play() — set it imperatively, React's prop alone can race.
      video.defaultMuted = muted
      video.muted = muted
      video.play().then(
        () => setNeedsManualStart(false),
        (error: unknown) => {
          // NotAllowedError = the browser refused autoplay (Low Power Mode,
          // autoplay policy). AbortError from a quick pause() is transient.
          if (error instanceof DOMException && error.name === 'NotAllowedError') {
            setNeedsManualStart(true)
          }
        }
      )
    } else {
      video.pause()
    }
  }, [isVisible, isInView, autoplay, muted])

  // iOS Low Power Mode refuses play() until a user gesture, but any tap or
  // touch on the page re-enables muted playback. Retry on the first gesture
  // so suppressed tiles start together instead of needing a tap each.
  useEffect(() => {
    if (!needsManualStart) return
    const retry = () => {
      videoRef.current?.play().then(
        () => setNeedsManualStart(false),
        () => {}
      )
    }
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'touchend', 'keydown']
    events.forEach((e) => window.addEventListener(e, retry, { once: true, passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, retry))
  }, [needsManualStart])

  const aspectClasses = {
    '9:16': 'aspect-9/16',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
  }

  return (
    <div
      ref={containerRef}
      className={cn(aspectClasses[aspectRatio], 'relative bg-black/10 rounded-[30px] overflow-hidden', className)}
    >
      {isVisible && (
        // No autoplay attribute on purpose: the browser starts fetching an
        // autoplay video the moment it mounts (overriding preload="none"),
        // 200px before it is ever seen. Playback is driven imperatively by
        // the in-view effect above instead.
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          muted={muted}
          loop={loop}
          playsInline
          controls={controls}
          disablePictureInPicture
          preload="none"
        />
      )}
    </div>
  )
}
