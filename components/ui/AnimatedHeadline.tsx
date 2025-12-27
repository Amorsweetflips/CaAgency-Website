'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedHeadlineProps {
  beforeText?: string
  highlightedText: string
  afterText?: string
  rotatingText?: string
  marker?: 'curly' | 'underline' | 'circle'
  className?: string
  alignment?: 'left' | 'center' | 'right'
}

export default function AnimatedHeadline({
  beforeText,
  highlightedText,
  afterText,
  rotatingText,
  marker = 'curly',
  className,
  alignment = 'left',
}: AnimatedHeadlineProps) {
  const [currentRotating, setCurrentRotating] = useState(0)

  const rotatingWords = rotatingText?.split('\n') || []

  useEffect(() => {
    if (rotatingWords.length === 0) return

    const interval = setInterval(() => {
      setCurrentRotating((prev) => (prev + 1) % rotatingWords.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [rotatingWords.length])

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={cn('font-anegra text-[25px] text-foreground-dark', alignmentClasses[alignment], className)}>
      {beforeText && <span>{beforeText} </span>}
      <span className="font-semibold relative">
        {highlightedText}
        {rotatingWords.length > 0 && (
          <span className="inline-block ml-2">
            {rotatingWords[currentRotating]}
          </span>
        )}
        {marker === 'curly' && (
          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground-dark/70" />
        )}
      </span>
      {afterText && <span> {afterText}</span>}
    </div>
  )
}
