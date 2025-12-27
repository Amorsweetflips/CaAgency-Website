'use client'

import { useRef, useEffect } from 'react'
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

  useEffect(() => {
    if (videoRef.current && autoplay) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user interaction required
      })
    }
  }, [autoplay])

  const aspectClasses = {
    '9:16': 'aspect-[9/16]',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className={cn(
        'w-full h-full object-cover rounded-[30px]',
        aspectClasses[aspectRatio],
        className
      )}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      playsInline
      controls={controls}
    />
  )
}
