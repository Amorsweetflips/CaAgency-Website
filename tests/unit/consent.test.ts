import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  COOKIE_CONSENT_KEY,
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
  storeConsent,
} from '@/lib/consent'

function stubBrowserGlobals({ getItem = vi.fn(), setItem = vi.fn() } = {}) {
  const dispatchEvent = vi.fn()
  vi.stubGlobal('window', { dispatchEvent })
  vi.stubGlobal('localStorage', { getItem, setItem })
  return { dispatchEvent, getItem, setItem }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getStoredConsent', () => {
  it('returns pending during SSR (no window)', () => {
    expect(getStoredConsent()).toBe('pending')
  })

  it('returns stored accepted/declined values', () => {
    const { getItem } = stubBrowserGlobals()
    getItem.mockReturnValue('accepted')
    expect(getStoredConsent()).toBe('accepted')
    getItem.mockReturnValue('declined')
    expect(getStoredConsent()).toBe('declined')
    expect(getItem).toHaveBeenCalledWith(COOKIE_CONSENT_KEY)
  })

  it('returns pending for absent or unrecognized stored values', () => {
    const { getItem } = stubBrowserGlobals()
    getItem.mockReturnValue(null)
    expect(getStoredConsent()).toBe('pending')
    getItem.mockReturnValue('garbage')
    expect(getStoredConsent()).toBe('pending')
  })

  it('returns pending when localStorage access throws', () => {
    const { getItem } = stubBrowserGlobals()
    getItem.mockImplementation(() => {
      throw new Error('storage disabled')
    })
    expect(getStoredConsent()).toBe('pending')
  })
})

describe('storeConsent', () => {
  it('is a no-op during SSR (no window)', () => {
    expect(() => storeConsent('accepted')).not.toThrow()
  })

  it('persists the decision and broadcasts the change event', () => {
    const { dispatchEvent, setItem } = stubBrowserGlobals()
    storeConsent('accepted')
    expect(setItem).toHaveBeenCalledWith(COOKIE_CONSENT_KEY, 'accepted')
    expect(dispatchEvent).toHaveBeenCalledTimes(1)
    const event = dispatchEvent.mock.calls[0][0] as CustomEvent
    expect(event.type).toBe(CONSENT_CHANGE_EVENT)
    expect(event.detail).toBe('accepted')
  })

  it('still broadcasts when persistence fails (private browsing)', () => {
    const { dispatchEvent, setItem } = stubBrowserGlobals()
    setItem.mockImplementation(() => {
      throw new Error('quota exceeded')
    })
    storeConsent('declined')
    expect(dispatchEvent).toHaveBeenCalledTimes(1)
    const event = dispatchEvent.mock.calls[0][0] as CustomEvent
    expect(event.detail).toBe('declined')
  })
})
