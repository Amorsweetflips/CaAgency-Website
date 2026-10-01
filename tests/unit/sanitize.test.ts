import { describe, expect, it } from 'vitest'
import { jsonLdSafe, sanitizeTrustedHtml } from '@/lib/sanitize'

describe('sanitizeTrustedHtml', () => {
  it('strips script tags and inline event handlers', () => {
    const dirty = '<p onclick="steal()">Hello</p><script>alert(1)</script><img src="x" onerror="alert(2)">'
    const clean = sanitizeTrustedHtml(dirty)
    expect(clean).not.toContain('<script')
    expect(clean).not.toContain('onclick')
    expect(clean).not.toContain('onerror')
    expect(clean).toContain('Hello')
  })

  it('blocks javascript: and data: URLs', () => {
    const clean = sanitizeTrustedHtml(
      '<a href="javascript:alert(1)">bad</a><a href="data:text/html,<script>1</script>">worse</a><img src="data:image/svg+xml,<svg onload=alert(1)>">'
    )
    expect(clean).not.toContain('javascript:')
    expect(clean).not.toContain('data:')
    expect(clean).toContain('bad')
    expect(clean).toContain('worse')
  })

  it('keeps the safe semantic subset used by articles', () => {
    const html =
      '<h2>Heading</h2><p>Body <strong>bold</strong> and <a href="/contact" rel="nofollow">link</a></p><ul><li>one</li></ul><blockquote>quote</blockquote><table><tr><td>cell</td></tr></table>'
    const clean = sanitizeTrustedHtml(html)
    expect(clean).toContain('<h2>Heading</h2>')
    expect(clean).toContain('<strong>bold</strong>')
    expect(clean).toContain('rel="noopener noreferrer"')
    expect(clean).toContain('<blockquote>quote</blockquote>')
    expect(clean).toContain('<table>')
  })

  it('demotes h1 to h2 so CMS content never adds a second page H1', () => {
    const clean = sanitizeTrustedHtml('<h1>Intro</h1><p>Body</p>')
    expect(clean).not.toContain('<h1')
    expect(clean).toContain('<h2>Intro</h2>')
  })

  it('forces rel noopener noreferrer on anchors', () => {
    const clean = sanitizeTrustedHtml('<a href="https://example.com">x</a>')
    expect(clean).toContain('rel="noopener noreferrer"')
  })
})

describe('jsonLdSafe', () => {
  it('escapes characters that could close a script tag', () => {
    const json = jsonLdSafe({ text: '</script><script>alert(1)</script>' })
    expect(json).not.toContain('</script>')
    expect(json).toContain('\\u003c/script\\u003e')
  })

  it('escapes line/paragraph separators', () => {
    const json = jsonLdSafe({ text: 'a\u2028b\u2029c' })
    expect(json).not.toContain('\u2028')
    expect(json).not.toContain('\u2029')
  })
})
