export const MAX_CONTACT_BODY_BYTES = 16 * 1024
export const MIN_FORM_TIME_MS = 750

export type ContactErrorCode =
  | 'INVALID_REQUEST'
  | 'BOT_REJECTED'
  | 'RATE_LIMITED'
  | 'DELIVERY_FAILED'

export type ContactFormData = {
  formType: 'brand' | 'talent'
  fullName: string
  email: string
  phone: string
  company?: string
  budget?: string
  message: string
  socialLink?: string
  subject?: string
  website: string
  _formTime: number
}

type ValidationResult =
  | { ok: true; data: ContactFormData }
  | { ok: false; code: 'INVALID_REQUEST' | 'BOT_REJECTED'; error: string }

const limits = {
  fullName: 200,
  email: 320,
  phone: 100,
  company: 200,
  budget: 100,
  message: 5000,
  socialLink: 500,
  subject: 300,
  website: 500,
} as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function optionalString(value: unknown, max: number): string | null {
  if (value === undefined || value === null) return ''
  if (typeof value !== 'string' || value.length > max) return null
  return value.trim()
}

export function validateContactPayload(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, code: 'INVALID_REQUEST', error: 'Invalid request body' }
  }

  const raw = input as Record<string, unknown>
  const formType = raw.formType
  if (formType !== 'brand' && formType !== 'talent') {
    return { ok: false, code: 'INVALID_REQUEST', error: 'Invalid form type' }
  }

  const parsed = {
    formType,
    fullName: optionalString(raw.fullName, limits.fullName),
    email: optionalString(raw.email, limits.email),
    phone: optionalString(raw.phone, limits.phone),
    company: optionalString(raw.company, limits.company),
    budget: optionalString(raw.budget, limits.budget),
    message: optionalString(raw.message, limits.message),
    socialLink: optionalString(raw.socialLink, limits.socialLink),
    subject: optionalString(raw.subject, limits.subject),
    website: optionalString(raw.website, limits.website),
    _formTime: raw._formTime,
  }

  if (Object.values(parsed).some((value) => value === null)) {
    return { ok: false, code: 'INVALID_REQUEST', error: 'One or more fields are invalid' }
  }

  if (parsed.website) {
    return { ok: false, code: 'BOT_REJECTED', error: 'Submission rejected' }
  }

  if (
    typeof parsed._formTime !== 'number' ||
    !Number.isFinite(parsed._formTime) ||
    parsed._formTime < MIN_FORM_TIME_MS
  ) {
    return { ok: false, code: 'BOT_REJECTED', error: 'Submission rejected' }
  }

  if (!parsed.fullName || !parsed.email || !parsed.phone || !parsed.message) {
    return { ok: false, code: 'INVALID_REQUEST', error: 'Missing required fields' }
  }

  if (!emailPattern.test(parsed.email)) {
    return { ok: false, code: 'INVALID_REQUEST', error: 'Invalid email format' }
  }

  if (formType === 'brand' && (!parsed.company || !parsed.budget)) {
    return { ok: false, code: 'INVALID_REQUEST', error: 'Company and budget are required' }
  }

  if (formType === 'talent' && (!parsed.socialLink || !parsed.subject)) {
    return { ok: false, code: 'INVALID_REQUEST', error: 'Social link and subject are required' }
  }

  if (parsed.socialLink) {
    try {
      const socialUrl = new URL(parsed.socialLink)
      if (!['http:', 'https:'].includes(socialUrl.protocol)) throw new Error('Unsafe protocol')
    } catch {
      return { ok: false, code: 'INVALID_REQUEST', error: 'Invalid social link' }
    }
  }

  return { ok: true, data: parsed as ContactFormData }
}
