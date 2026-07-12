const clamp = (value: number, fallback: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return fallback
  return Math.min(max, Math.max(min, value))
}

const milliseconds = (seconds: number, fallback: number) =>
  `${Math.round(clamp(seconds, fallback, 0, 10) * 1000)}ms`

export function getRevealAttributes({
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  once = true,
}: {
  delay?: number
  duration?: number
  yOffset?: number
  once?: boolean
}) {
  return {
    'data-reveal': '',
    'data-reveal-once': String(once),
    style: {
      '--reveal-delay': milliseconds(delay, 0),
      '--reveal-duration': milliseconds(duration, 0.5),
      '--reveal-y': `${Math.round(clamp(yOffset, 16, -200, 200))}px`,
    },
  }
}

export function getStaggerAttributes({
  stagger = 0.08,
  delayChildren = 0,
  once = true,
}: {
  stagger?: number
  delayChildren?: number
  once?: boolean
}) {
  return {
    'data-stagger': '',
    'data-reveal-once': String(once),
    style: {
      '--stagger-delay': milliseconds(delayChildren, 0),
      '--stagger-gap': milliseconds(stagger, 0.08),
    },
  }
}

export function getStaggerItemStyle({
  index = 0,
  y = 28,
  duration = 0.6,
  stagger = 0.08,
  delayChildren = 0,
}: {
  index?: number
  y?: number
  duration?: number
  stagger?: number
  delayChildren?: number
}) {
  const safeIndex = Math.round(clamp(index, 0, 0, 1000))
  const delay = clamp(delayChildren, 0, 0, 10) + safeIndex * clamp(stagger, 0.08, 0, 10)
  return {
    '--stagger-index': String(safeIndex),
    '--stagger-item-delay': milliseconds(delay, 0),
    '--stagger-y': `${Math.round(clamp(y, 28, -200, 200))}px`,
    '--stagger-duration': milliseconds(duration, 0.6),
  }
}
