import { describe, it, expect } from 'vitest'
import {
  isPublicAsset,
  isSensitiveProbe,
  getLocalizedSiteRouteRedirect,
} from '@/lib/routing-helpers'

describe('isPublicAsset', () => {
  it('matches known public files and asset prefixes', () => {
    expect(isPublicAsset('/robots.txt')).toBe(true)
    expect(isPublicAsset('/sitemap.xml')).toBe(true)
    expect(isPublicAsset('/images/site/logo.svg')).toBe(true)
    expect(isPublicAsset('/videos/work/medicube.mp4')).toBe(true)
    expect(isPublicAsset('/fonts/anegra.woff2')).toBe(true)
  })

  it('rejects normal routes', () => {
    expect(isPublicAsset('/')).toBe(false)
    expect(isPublicAsset('/about')).toBe(false)
    expect(isPublicAsset('/blog')).toBe(false)
  })
})

describe('isSensitiveProbe', () => {
  it('flags scanner probes', () => {
    expect(isSensitiveProbe('/.env')).toBe(true)
    expect(isSensitiveProbe('/.env.local')).toBe(true)
    expect(isSensitiveProbe('/.git/config')).toBe(true)
    expect(isSensitiveProbe('/backup.sql')).toBe(true)
  })

  it('does not flag legitimate routes', () => {
    expect(isSensitiveProbe('/')).toBe(false)
    expect(isSensitiveProbe('/about')).toBe(false)
    expect(isSensitiveProbe('/environment')).toBe(false)
  })
})

describe('getLocalizedSiteRouteRedirect', () => {
  it('strips the locale prefix for (site)-only routes', () => {
    expect(getLocalizedSiteRouteRedirect('/ar/blog')).toBe('/blog')
    expect(getLocalizedSiteRouteRedirect('/ko/blog')).toBe('/blog')
    expect(getLocalizedSiteRouteRedirect('/ar/privacy-policy')).toBe('/privacy-policy')
    expect(getLocalizedSiteRouteRedirect('/ar/influencer-marketing-dubai')).toBe(
      '/influencer-marketing-dubai'
    )
    expect(getLocalizedSiteRouteRedirect('/ko/korean-skincare-influencer-marketing')).toBe(
      '/korean-skincare-influencer-marketing'
    )
    expect(getLocalizedSiteRouteRedirect('/ar/talents/jay-sadiq')).toBe('/talents/jay-sadiq')
  })

  it('returns null for localized pages that have a [locale] variant', () => {
    expect(getLocalizedSiteRouteRedirect('/ar')).toBeNull()
    expect(getLocalizedSiteRouteRedirect('/ar/about')).toBeNull()
    expect(getLocalizedSiteRouteRedirect('/ar/services')).toBeNull()
    // talents *listing* is localized; only the /talents/<slug> detail is (site)-only
    expect(getLocalizedSiteRouteRedirect('/ar/talents')).toBeNull()
  })

  it('returns null for default-locale (unprefixed) routes', () => {
    expect(getLocalizedSiteRouteRedirect('/blog')).toBeNull()
    expect(getLocalizedSiteRouteRedirect('/privacy-policy')).toBeNull()
  })
})
