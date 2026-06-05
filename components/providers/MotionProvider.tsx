'use client'

import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * App-wide motion context.
 *
 * - `LazyMotion` + `domAnimation` loads only the DOM animation feature set
 *   (~15kb) instead of the full library. All motion components in this codebase
 *   use the lightweight `m` component (not `motion`) so the larger bundle is
 *   never pulled in.
 * - `reducedMotion="user"` makes every animation honour the OS-level
 *   prefers-reduced-motion setting automatically (transform/opacity animations
 *   are skipped, content renders in its final state).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
