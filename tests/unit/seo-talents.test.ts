import { describe, expect, it } from 'vitest'
import { MIN_INDEXABLE_BIO_LENGTH, isIndexableTalentProfile } from '@/lib/seo/talents'

describe('isIndexableTalentProfile', () => {
  it('rejects missing, empty and short bios', () => {
    expect(isIndexableTalentProfile(null)).toBe(false)
    expect(isIndexableTalentProfile(undefined)).toBe(false)
    expect(isIndexableTalentProfile('   ')).toBe(false)
    expect(isIndexableTalentProfile('Beauty creator.')).toBe(false)
  })

  it('ignores surrounding whitespace when measuring', () => {
    const padded = `  ${'a'.repeat(MIN_INDEXABLE_BIO_LENGTH - 1)}  `
    expect(isIndexableTalentProfile(padded)).toBe(false)
  })

  it('accepts a bio at or above the threshold', () => {
    expect(isIndexableTalentProfile('a'.repeat(MIN_INDEXABLE_BIO_LENGTH))).toBe(true)
  })
})
