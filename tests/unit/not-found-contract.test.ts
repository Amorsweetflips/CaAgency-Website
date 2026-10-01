import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// The app has two root layouts ((site) and [locale]) and no app/layout.tsx,
// so a 404 raised outside a layout falls through to Next's bare default page
// (no header, no <html lang>, default title). `dynamicParams = false` does
// exactly that for unknown slugs; pages must call notFound() instead.
function pages(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) pages(path, out)
    else if (name === 'page.tsx') out.push(path)
  }
  return out
}

describe('branded 404s', () => {
  it('no public route rejects unknown params before its layout renders', () => {
    const offenders = [...pages('app/(site)'), ...pages('app/[locale]')].filter((file) =>
      /export const dynamicParams\s*=\s*false/.test(readFileSync(file, 'utf8'))
    )

    expect(offenders).toEqual([])
  })

  it('both root layouts have a not-found page to render', () => {
    expect(statSync('app/(site)/not-found.tsx').isFile()).toBe(true)
    expect(statSync('app/[locale]/not-found.tsx').isFile()).toBe(true)
  })
})
