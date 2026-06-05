'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  /** Insert locale thousands separators (e.g. 3,000). Off preserves "3000". */
  useGrouping?: boolean
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  useGrouping = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const animate = useCallback(() => {
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)

      setCount(Math.round(eased * end))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [end, duration])

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(end)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          animate()
          observer.disconnect()
        }
      },
      { rootMargin: '-100px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, end, hasAnimated])

  // Render as a single interpolated string (one text node). Adjacent JSX
  // expressions with an empty `prefix`/`suffix` split into multiple text nodes
  // that SSR and client hydration can disagree on (React error #418).
  return (
    <span ref={ref} className={className}>
      {`${prefix}${count.toLocaleString(undefined, { useGrouping })}${suffix}`}
    </span>
  )
}
