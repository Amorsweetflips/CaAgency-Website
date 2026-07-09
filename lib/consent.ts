export const COOKIE_CONSENT_KEY = 'ca-agency-cookie-consent'
export const CONSENT_CHANGE_EVENT = 'ca-consent-change'

export type ConsentStatus = 'pending' | 'accepted' | 'declined'

declare global {
  interface WindowEventMap {
    [CONSENT_CHANGE_EVENT]: CustomEvent<ConsentStatus>
  }
}

export function getStoredConsent(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending'
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    return stored === 'accepted' || stored === 'declined' ? stored : 'pending'
  } catch {
    return 'pending'
  }
}

export function storeConsent(consent: 'accepted' | 'declined'): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent)
  } catch {
    // Private browsing / storage disabled: consent stays session-only.
  }
  window.dispatchEvent(new CustomEvent<ConsentStatus>(CONSENT_CHANGE_EVENT, { detail: consent }))
}
