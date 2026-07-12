import { describe, expect, it } from 'vitest'
import { validateContactPayload } from '@/lib/contact/validation'

const validBrand = {
  formType: 'brand',
  fullName: 'Amor',
  email: 'amor@example.com',
  phone: '+1 555 123 4567',
  company: 'CA Agency',
  budget: '20-40k',
  message: 'We would like to discuss a campaign.',
  website: '',
  _formTime: 4000,
}

describe('validateContactPayload', () => {
  it('accepts a complete brand enquiry without mutating it', () => {
    const input = structuredClone(validBrand)
    const result = validateContactPayload(input)
    expect(result.ok).toBe(true)
    expect(input).toEqual(validBrand)
  })

  it('rejects bots and submissions completed too quickly', () => {
    expect(validateContactPayload({ ...validBrand, website: 'spam' })).toMatchObject({
      ok: false,
      code: 'BOT_REJECTED',
    })
    expect(validateContactPayload({ ...validBrand, _formTime: 100 })).toMatchObject({
      ok: false,
      code: 'BOT_REJECTED',
    })
  })

  it('allows legitimate autofill submissions after a short human-visible delay', () => {
    expect(validateContactPayload({ ...validBrand, _formTime: 1000 })).toMatchObject({
      ok: true,
    })
  })

  it('validates form-specific required fields and maximum lengths', () => {
    expect(validateContactPayload({ ...validBrand, company: '' })).toMatchObject({
      ok: false,
      code: 'INVALID_REQUEST',
    })
    expect(validateContactPayload({ ...validBrand, phone: 'x'.repeat(101) })).toMatchObject({
      ok: false,
      code: 'INVALID_REQUEST',
    })
  })
})
