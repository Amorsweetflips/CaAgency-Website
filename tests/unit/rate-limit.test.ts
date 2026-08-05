import { describe, expect, it, vi } from 'vitest'
import {
  checkRateLimit,
  clearRateLimitsForTests,
  rateLimitBucketCountForTests,
  setRateLimitMaxBucketsForTests,
} from '@/lib/rate-limit'

describe('checkRateLimit', () => {
  it('allows requests up to the limit and rejects the next', () => {
    clearRateLimitsForTests()
    for (let i = 0; i < 3; i++) {
      expect(checkRateLimit('ip-a', { limit: 3, windowMs: 60_000 }).limited).toBe(false)
    }
    expect(checkRateLimit('ip-a', { limit: 3, windowMs: 60_000 }).limited).toBe(true)
  })

  it('tracks keys independently', () => {
    clearRateLimitsForTests()
    checkRateLimit('ip-a', { limit: 1, windowMs: 60_000 })
    expect(checkRateLimit('ip-a', { limit: 1, windowMs: 60_000 }).limited).toBe(true)
    expect(checkRateLimit('ip-b', { limit: 1, windowMs: 60_000 }).limited).toBe(false)
  })

  it('reports retry-after in seconds', () => {
    clearRateLimitsForTests()
    checkRateLimit('ip-c', { limit: 1, windowMs: 60_000 })
    const result = checkRateLimit('ip-c', { limit: 1, windowMs: 60_000 })
    expect(result.limited).toBe(true)
    expect(result.retryAfterSeconds).toBeGreaterThan(0)
    expect(result.retryAfterSeconds).toBeLessThanOrEqual(60)
  })

  it('resets after the window elapses', () => {
    vi.useFakeTimers()
    try {
      clearRateLimitsForTests()
      checkRateLimit('ip-d', { limit: 1, windowMs: 1000 })
      expect(checkRateLimit('ip-d', { limit: 1, windowMs: 1000 }).limited).toBe(true)
      vi.advanceTimersByTime(1001)
      expect(checkRateLimit('ip-d', { limit: 1, windowMs: 1000 }).limited).toBe(false)
    } finally {
      vi.useRealTimers()
    }
  })

  it('evicts the oldest bucket when at capacity', () => {
    setRateLimitMaxBucketsForTests(3)
    try {
      clearRateLimitsForTests()
      checkRateLimit('ip-1', { limit: 1, windowMs: 60_000 })
      checkRateLimit('ip-2', { limit: 1, windowMs: 60_000 })
      checkRateLimit('ip-3', { limit: 1, windowMs: 60_000 })
      checkRateLimit('ip-4', { limit: 1, windowMs: 60_000 })
      expect(rateLimitBucketCountForTests()).toBe(3)
      // The oldest key was evicted, so it starts a fresh window again.
      expect(checkRateLimit('ip-1', { limit: 1, windowMs: 60_000 }).limited).toBe(false)
    } finally {
      setRateLimitMaxBucketsForTests(10_000)
      clearRateLimitsForTests()
    }
  })
})
