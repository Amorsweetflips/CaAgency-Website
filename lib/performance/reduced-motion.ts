export type MediaQuery = {
  matches: boolean
  addEventListener: (type: 'change', listener: () => void) => void
  removeEventListener: (type: 'change', listener: () => void) => void
}

export type MatchMedia = (query: string) => MediaQuery

const query = '(prefers-reduced-motion: reduce)'

const browserMatchMedia: MatchMedia = (value) => window.matchMedia(value)

export function getReducedMotionSnapshot(matchMedia: MatchMedia = browserMatchMedia) {
  if (typeof window === 'undefined' && matchMedia === browserMatchMedia) return true
  return matchMedia(query).matches
}

export function subscribeReducedMotion(
  onChange: () => void,
  matchMedia: MatchMedia = browserMatchMedia
) {
  if (typeof window === 'undefined' && matchMedia === browserMatchMedia) return () => {}
  const mediaQuery = matchMedia(query)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}
