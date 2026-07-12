import { describe, expect, it, vi } from 'vitest'
import {
  getReducedMotionSnapshot,
  subscribeReducedMotion,
  type MatchMedia,
} from '@/lib/performance/reduced-motion'

function createMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>()
  const mediaQuery = {
    matches,
    addEventListener: vi.fn((_type: string, listener: () => void) => listeners.add(listener)),
    removeEventListener: vi.fn((_type: string, listener: () => void) => listeners.delete(listener)),
  }
  const matchMedia = vi.fn(() => mediaQuery) as unknown as MatchMedia
  return { listeners, matchMedia, mediaQuery }
}

describe('reduced motion preference', () => {
  it('uses a conservative server snapshot and a no-op server subscription', () => {
    expect(getReducedMotionSnapshot()).toBe(true)
    const unsubscribe = subscribeReducedMotion(vi.fn())
    expect(unsubscribe()).toBeUndefined()
  })

  it('reads the current media-query value', () => {
    expect(getReducedMotionSnapshot(createMatchMedia(true).matchMedia)).toBe(true)
    expect(getReducedMotionSnapshot(createMatchMedia(false).matchMedia)).toBe(false)
  })

  it('subscribes and cleans up the media-query listener', () => {
    const { listeners, matchMedia, mediaQuery } = createMatchMedia(false)
    const onChange = vi.fn()
    const unsubscribe = subscribeReducedMotion(onChange, matchMedia)

    expect(mediaQuery.addEventListener).toHaveBeenCalledWith('change', onChange)
    listeners.forEach((listener) => listener())
    expect(onChange).toHaveBeenCalledOnce()

    unsubscribe()
    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith('change', onChange)
  })
})
