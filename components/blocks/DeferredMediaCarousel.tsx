'use client'

import { lazy, Suspense, type ReactNode } from 'react'
import useNearViewport from '@/components/hooks/useNearViewport'
import type { MediaCarouselProps } from '@/components/blocks/MediaCarousel'

const InteractiveMediaCarousel = lazy(() => import('@/components/blocks/MediaCarousel'))

export default function DeferredMediaCarousel({
  fallback,
  ...props
}: MediaCarouselProps & { fallback: ReactNode }) {
  const { ref, isNear } = useNearViewport()

  return (
    <div
      ref={ref}
      data-deferred="media-carousel"
      data-deferred-state={isNear ? 'active' : 'fallback'}
    >
      {isNear ? (
        <Suspense fallback={fallback}>
          <InteractiveMediaCarousel {...props} />
        </Suspense>
      ) : fallback}
    </div>
  )
}
