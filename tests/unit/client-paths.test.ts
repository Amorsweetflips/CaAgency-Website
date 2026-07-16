import { describe, expect, it } from 'vitest'
import { localizeHref, stripLocalePrefix } from '@/lib/i18n/client-paths'

describe('client locale paths', () => {
  it('keeps English unprefixed and prefixes translated routes', () => {
    expect(localizeHref('/', 'en')).toBe('/')
    expect(localizeHref('/about', 'en')).toBe('/about')
    expect(localizeHref('/', 'ar')).toBe('/ar')
    expect(localizeHref('/about', 'ko')).toBe('/ko/about')
  })

  it('strips only supported locale prefixes', () => {
    expect(stripLocalePrefix('/ar/about')).toBe('/about')
    expect(stripLocalePrefix('/ko')).toBe('/')
    expect(stripLocalePrefix('/about')).toBe('/about')
  })
})
