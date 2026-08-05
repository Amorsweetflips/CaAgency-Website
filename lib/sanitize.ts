import sanitizeHtml from 'sanitize-html'

// CMS-authored HTML is rendered with dangerouslySetInnerHTML in a few places
// (blog articles, legal pages). Allow only a safe, semantic subset so a
// compromised editor or imported post cannot inject script/event handlers.
const allowedTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'br',
  'hr',
  'strong',
  'em',
  'b',
  'i',
  'u',
  's',
  'ul',
  'ol',
  'li',
  'a',
  'blockquote',
  'code',
  'pre',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'img',
  'figure',
  'figcaption',
  'span',
  'sup',
  'sub',
  'mark',
  'small',
  'div',
]

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags,
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: {
    img: ['http', 'https'],
  },
  allowProtocolRelative: false,
  disallowedTagsMode: 'discard',
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
  },
}

export function sanitizeTrustedHtml(html: string): string {
  return sanitizeHtml(html, sanitizeOptions)
}

// JSON embedded in <script type="application/ld+json"> must not be able to
// close the script tag, even when the source data is static/trusted.
export function jsonLdSafe(value: unknown): string {
  return JSON.stringify(value)
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
