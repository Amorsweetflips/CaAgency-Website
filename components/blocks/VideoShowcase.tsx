'use client'

import { useEffect, useRef, useState } from 'react'
import VideoPlayer from '@/components/ui/VideoPlayer'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { posterFor } from '@/lib/data/videos'
import { createVideoAutoplayCoordinator } from '@/lib/performance/video-autoplay'

export interface VideoShowcaseProps {
  videos: Array<{ src: string; alt?: string; poster?: string }>
  columns?: 2 | 3 | 4
}

export default function VideoShowcase({
  videos,
  columns = 4,
}: VideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [coordinator] = useState(() => createVideoAutoplayCoordinator(setActiveId))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = [...container.querySelectorAll<HTMLElement>('[data-video-candidate]')]
    const observer = new IntersectionObserver(
      (entries) => {
        const viewportCenter = window.innerHeight / 2
        for (const entry of entries) {
          const element = entry.target as HTMLElement
          const id = element.dataset.videoCandidate
          const order = Number(element.dataset.videoOrder)
          if (!id) continue
          const rect = entry.boundingClientRect
          coordinator.update({
            id,
            ratio: entry.intersectionRatio,
            centerDistance: Math.abs(rect.top + rect.height / 2 - viewportCenter),
            order: Number.isFinite(order) ? order : 0,
          })
        }
      },
      { threshold: [0, 0.35, 0.5, 0.75, 1] }
    )

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      coordinator.destroy()
    }
  }, [coordinator])

  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <div ref={containerRef}>
    <Stagger className={`grid ${gridClasses[columns]} gap-[24px] mobile:gap-[16px]`} stagger={0.08}>
      {videos.map((video, index) => {
        // On the 2-col mobile grid an odd trailing tile would sit alone in
        // the left cell; span the row and center it at sibling width instead.
        const isLoneLastOnMobile =
          columns === 3 && videos.length % 2 === 1 && index === videos.length - 1
        return (
        <StaggerItem
          key={index}
          className={`w-full hover-lift${
            isLoneLastOnMobile
              ? ' mobile:col-span-2 mobile:w-[calc(50%-8px)] mobile:justify-self-center'
              : ''
          }`}
        >
          <div data-video-candidate={video.src} data-video-order={index}>
            <VideoPlayer
              src={video.src}
              poster={video.poster ?? posterFor(video.src)}
              aspectRatio="9:16"
              autoplay
              muted
              loop
              playbackActive={activeId === video.src}
              onRequestActive={() => coordinator.request(video.src)}
              onReleaseActive={() => coordinator.release(video.src)}
            />
          </div>
        </StaggerItem>
        )
      })}
    </Stagger>
    </div>
  )
}
