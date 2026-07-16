'use client'

import { useEffect, useRef, useState } from 'react'

export default function useNearViewport(rootMargin = '500px') {
  const ref = useRef<HTMLDivElement>(null)
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isNear) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsNear(true)
        observer.disconnect()
      },
      { rootMargin }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [isNear, rootMargin])

  return { ref, isNear }
}
