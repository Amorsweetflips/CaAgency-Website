'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion'

interface VideoPlayerProps {
  src: string
  className?: string
  aspectRatio?: '9:16' | '16:9' | '1:1'
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  poster?: string
  posterPriority?: boolean
  label?: string
  playbackActive?: boolean
  onRequestActive?: () => void
  onReleaseActive?: () => void
  labels?: {
    pause: string
    play: string
    pauseVideo: string
    playVideo: string
  }
}

let activeVideo: HTMLVideoElement | null = null

export default function VideoPlayer({
  src,
  className,
  aspectRatio = '16:9',
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
  poster,
  posterPriority = false,
  label = 'Campaign video',
  playbackActive,
  onRequestActive,
  onReleaseActive,
  labels = {
    pause: 'Pause',
    play: 'Play',
    pauseVideo: 'Pause video',
    playVideo: 'Play video',
  },
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasRequestedPlayback, setHasRequestedPlayback] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const startPlayback = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    if (activeVideo && activeVideo !== video) activeVideo.pause()
    activeVideo = video
    video.defaultMuted = muted
    video.muted = muted
    try {
      await video.play()
    } catch {
      if (activeVideo === video) activeVideo = null
      onReleaseActive?.()
    }
  }, [muted, onReleaseActive])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const allowedByOwner = playbackActive ?? true
    if (isInView && allowedByOwner && (hasRequestedPlayback || (autoplay && !prefersReducedMotion))) {
      void startPlayback()
      return
    }

    video.pause()
  }, [isInView, autoplay, hasRequestedPlayback, playbackActive, prefersReducedMotion, startPlayback])

  useEffect(() => {
    const video = videoRef.current
    return () => {
      if (activeVideo === video) activeVideo = null
    }
  }, [playbackActive])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) {
      setHasRequestedPlayback(true)
      onRequestActive?.()
      return
    }
    if (video.paused) {
      setHasRequestedPlayback(true)
      onRequestActive?.()
      void startPlayback()
    } else {
      video.pause()
      setHasRequestedPlayback(false)
      setIsPlaying(false)
      if (activeVideo === video) activeVideo = null
      onReleaseActive?.()
    }
  }

  const aspectClasses = {
    '9:16': 'aspect-9/16',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
  }
  const shouldMountVideo = playbackActive === undefined
    ? hasRequestedPlayback || (autoplay && isInView && !prefersReducedMotion)
    : playbackActive && isInView && (hasRequestedPlayback || (autoplay && !prefersReducedMotion))

  return (
    <div
      ref={containerRef}
      className={cn(
        aspectClasses[aspectRatio],
        'relative overflow-hidden rounded-[30px] bg-black/10',
        className
      )}
    >
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          quality={60}
          preload={posterPriority}
          loading={posterPriority ? undefined : 'lazy'}
          fetchPriority={posterPriority ? 'high' : 'auto'}
          sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
          className={cn('object-cover transition-opacity', isPlaying && 'opacity-0')}
          aria-hidden="true"
        />
      )}
      {shouldMountVideo && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={label}
          className="h-full w-full object-cover"
          muted={muted}
          loop={loop}
          playsInline
          controls={controls}
          disablePictureInPicture
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
      {!controls && (
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute bottom-4 end-4 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black/70 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={isPlaying ? labels.pauseVideo : labels.playVideo}
          aria-pressed={isPlaying}
        >
          {isPlaying ? labels.pause : labels.play}
        </button>
      )}
    </div>
  )
}
