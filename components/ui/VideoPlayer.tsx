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
}

export default function VideoPlayer({
  src,
  className,
  aspectRatio = '16:9',
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Lazy load: only set src when video scrolls into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Play when visible and autoplay is requested
  useEffect(() => {
    if (isVisible && videoRef.current && autoplay) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user interaction required
      })
    }
  }, [isVisible, autoplay])

  const aspectClasses = {
    '9:16': 'aspect-[9/16]',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
  }

  return (
    <div ref={containerRef} className={cn(aspectClasses[aspectRatio], 'bg-black/10 rounded-[30px] overflow-hidden', className)}>
      {isVisible && (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          playsInline
          controls={controls}
          preload="none"
        />
      )}
    </div>
  )
}
