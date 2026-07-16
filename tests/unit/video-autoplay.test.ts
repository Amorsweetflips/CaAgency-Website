import { describe, expect, it, vi } from 'vitest'
import {
  VIDEO_AUTOPLAY_DWELL_MS,
  createVideoAutoplayCoordinator,
  selectVideoCandidate,
} from '@/lib/performance/video-autoplay'

describe('featured video autoplay coordination', () => {
  it('selects the most visible candidate and uses distance as a tie-breaker', () => {
    expect(
      selectVideoCandidate([
        { id: 'a', ratio: 0.5, centerDistance: 80, order: 0 },
        { id: 'b', ratio: 0.8, centerDistance: 120, order: 1 },
      ])
    ).toBe('b')
    expect(
      selectVideoCandidate([
        { id: 'a', ratio: 0.6, centerDistance: 80, order: 0 },
        { id: 'b', ratio: 0.6, centerDistance: 20, order: 1 },
      ])
    ).toBe('b')
  })

  it('activates only after a stable dwell and cancels stale candidates', () => {
    vi.useFakeTimers()
    const changes: Array<string | null> = []
    const coordinator = createVideoAutoplayCoordinator((id) => changes.push(id))

    coordinator.update({ id: 'a', ratio: 0.7, centerDistance: 10, order: 0 })
    vi.advanceTimersByTime(VIDEO_AUTOPLAY_DWELL_MS - 1)
    expect(changes).toEqual([])

    coordinator.update({ id: 'a', ratio: 0.1, centerDistance: 10, order: 0 })
    vi.advanceTimersByTime(VIDEO_AUTOPLAY_DWELL_MS)
    expect(changes).toEqual([])

    coordinator.update({ id: 'b', ratio: 0.8, centerDistance: 5, order: 1 })
    vi.advanceTimersByTime(VIDEO_AUTOPLAY_DWELL_MS)
    expect(changes).toEqual(['b'])

    coordinator.destroy()
    vi.useRealTimers()
  })

  it('transfers manual ownership immediately and releases removed owners', () => {
    const changes: Array<string | null> = []
    const coordinator = createVideoAutoplayCoordinator((id) => changes.push(id))

    coordinator.request('manual')
    expect(coordinator.getActiveId()).toBe('manual')
    expect(changes).toEqual(['manual'])

    coordinator.remove('manual')
    expect(coordinator.getActiveId()).toBeNull()
    expect(changes).toEqual(['manual', null])
    coordinator.destroy()
  })

  it('keeps a released visible candidate paused until it leaves and re-enters', () => {
    vi.useFakeTimers()
    const changes: Array<string | null> = []
    const coordinator = createVideoAutoplayCoordinator((id) => changes.push(id))
    const visible = { id: 'a', ratio: 0.8, centerDistance: 5, order: 0 }

    coordinator.update(visible)
    vi.advanceTimersByTime(VIDEO_AUTOPLAY_DWELL_MS)
    coordinator.release('a')
    vi.advanceTimersByTime(VIDEO_AUTOPLAY_DWELL_MS * 2)
    expect(changes).toEqual(['a', null])

    coordinator.update({ ...visible, ratio: 0.1 })
    coordinator.update(visible)
    vi.advanceTimersByTime(VIDEO_AUTOPLAY_DWELL_MS)
    expect(changes).toEqual(['a', null, 'a'])

    coordinator.destroy()
    vi.useRealTimers()
  })

  it('allows an explicit request to reactivate a suppressed candidate', () => {
    vi.useFakeTimers()
    const coordinator = createVideoAutoplayCoordinator(vi.fn())

    coordinator.update({ id: 'a', ratio: 0.8, centerDistance: 5, order: 0 })
    vi.advanceTimersByTime(VIDEO_AUTOPLAY_DWELL_MS)
    coordinator.release('a')
    coordinator.request('a')

    expect(coordinator.getActiveId()).toBe('a')
    coordinator.destroy()
    vi.useRealTimers()
  })
})
