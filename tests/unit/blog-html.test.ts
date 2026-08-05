import { describe, expect, it } from 'vitest'
import { withHeadingAnchors } from '@/lib/blog-html'
import { sanitizeTrustedHtml } from '@/lib/sanitize'

describe('withHeadingAnchors after sanitization', () => {
  it('adds ids to h2 headings and drops injected markup', () => {
    const { processed, toc } = withHeadingAnchors(
      sanitizeTrustedHtml(
        '<script>alert(1)</script><h2 onclick="x()">About Us</h2><h2>About Us</h2>'
      )
    )
    expect(processed).toContain('<h2 id="about-us">About Us</h2>')
    expect(processed).toContain('<h2 id="about-us-2">About Us</h2>')
    expect(processed).not.toContain('<script')
    expect(processed).not.toContain('onclick')
    expect(toc).toEqual([
      { id: 'about-us', label: 'About Us' },
      { id: 'about-us-2', label: 'About Us' },
    ])
  })
})
