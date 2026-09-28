import { describe, expect, it } from 'vitest'
import { gulfCostGuide, locationGuides, serviceGuides } from '@/lib/data/guides'
import { services } from '@/lib/data/services'

describe('guide links', () => {
  it('gives every service page three guides', () => {
    for (const service of services) {
      expect(serviceGuides[service.slug], service.slug).toHaveLength(3)
    }
  })

  it('only links to blog posts', () => {
    const guides = [gulfCostGuide, ...locationGuides, ...Object.values(serviceGuides).flat()]
    for (const guide of guides) {
      expect(guide.href).toMatch(/^\/blog\/[a-z0-9-]+$/)
    }
  })
})
