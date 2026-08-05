// Meta descriptions must be plain text — post.content is stored as HTML.
export function plainTextExcerpt(html: string, length = 160) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, length)
}

export function readingTimeMinutes(html: string) {
  const words = html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z0-9#]+;/gi, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// Give every h2 an id so the table of contents can anchor-link to it, and
// collect the entries for rendering. Content is CMS-authored HTML, so
// tolerate attributes on the tag and dedupe repeated/empty heading slugs.
// Must run after sanitization so injected markup never reaches the output.
export function withHeadingAnchors(html: string) {
  const toc: Array<{ id: string; label: string }> = []
  const seen = new Map<string, number>()
  const processed = html.replace(/<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (_m, inner: string) => {
    const label = inner.replace(/<[^>]*>/g, '').trim()
    let id = slugifyHeading(label) || 'section'
    const count = seen.get(id) ?? 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count + 1}`
    toc.push({ id, label })
    return `<h2 id="${id}">${inner}</h2>`
  })
  return { processed, toc }
}
