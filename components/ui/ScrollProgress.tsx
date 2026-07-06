'use client'

import { m, useScroll, useSpring, useReducedMotion } from 'motion/react'

/**
 * Thin accent-colored reading-progress bar pinned above the header.
 * Scroll-linked 1:1 (not autonomous motion); the spring smoothing is dropped
 * under prefers-reduced-motion. Compositor-only (scaleX).
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothed = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.001 })

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent-red"
      style={{ scaleX: reduce ? scrollYProgress : smoothed }}
    />
  )
}
