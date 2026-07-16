'use client'

import { lazy, Suspense, type ReactNode } from 'react'
import useNearViewport from '@/components/hooks/useNearViewport'
import type { VideoShowcaseProps } from '@/components/blocks/VideoShowcase'

const InteractiveVideoShowcase = lazy(() => import('@/components/blocks/VideoShowcase'))

export default function DeferredVideoShowcase({
  fallback,
  ...props
}: VideoShowcaseProps & { fallback: ReactNode }) {
  const { ref, isNear } = useNearViewport()

  return (
    <div
      ref={ref}
      data-deferred="video-showcase"
      data-deferred-state={isNear ? 'active' : 'fallback'}
    >
      {isNear ? (
        <Suspense fallback={fallback}>
          <InteractiveVideoShowcase {...props} />
        </Suspense>
      ) : fallback}
    </div>
  )
}
