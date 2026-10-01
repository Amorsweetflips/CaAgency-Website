import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { locales } from '@/i18n/config'

type Tree = { [key: string]: unknown }

const SOURCE_DIRS = ['app', 'components', 'lib']
// const t = useTranslations('ns') | const t = await getTranslations('ns')
// | const t = await getTranslations({ locale, namespace: 'ns' })
const BINDING =
  /const\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*(?:'([\w.]+)'|\{[^}]*namespace:\s*'([\w.]+)'[^}]*\})\s*\)/g

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else if (/\.(tsx?|mts)$/.test(name)) out.push(path)
  }
  return out
}

function lookup(tree: unknown, dotted: string): unknown {
  return dotted.split('.').reduce<unknown>(
    (node, part) => (node && typeof node === 'object' ? (node as Tree)[part] : undefined),
    tree
  )
}

function flatKeys(tree: Tree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([key, value]) =>
    value && typeof value === 'object' && !Array.isArray(value)
      ? flatKeys(value as Tree, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  )
}

const catalogs = Object.fromEntries(
  locales.map((locale) => [locale, JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8')) as Tree])
)

type Usage = { file: string; namespace: string; key: string }

function collectUsages(): Usage[] {
  const usages: Usage[] = []
  for (const file of SOURCE_DIRS.flatMap((dir) => walk(dir))) {
    const source = readFileSync(file, 'utf8')
    for (const binding of source.matchAll(BINDING)) {
      const [, variable, plainNs, objectNs] = binding
      const namespace = plainNs ?? objectNs
      const call = new RegExp(`\\b${variable}(?:\\.(?:raw|rich|markup|has))?\\(\\s*'([\\w.]+)'`, 'g')
      for (const match of source.matchAll(call)) {
        usages.push({ file, namespace, key: match[1] })
      }
    }
  }
  return usages
}

describe('i18n coverage', () => {
  const usages = collectUsages()

  it('finds translation calls to check (guards the scanner itself)', () => {
    expect(usages.length).toBeGreaterThan(100)
  })

  it.each(locales)('every literal key used in code exists in %s', (locale) => {
    const missing = usages
      .filter(({ namespace, key }) => typeof lookup(catalogs[locale], `${namespace}.${key}`) === 'undefined')
      .map(({ file, namespace, key }) => `${namespace}.${key} (${file})`)

    expect([...new Set(missing)]).toEqual([])
  })

  it.each(locales.filter((locale) => locale !== 'en'))('%s has the same keys as en', (locale) => {
    const en = new Set(flatKeys(catalogs.en))
    const other = new Set(flatKeys(catalogs[locale]))

    expect({
      missing: [...en].filter((key) => !other.has(key)),
      extra: [...other].filter((key) => !en.has(key)),
    }).toEqual({ missing: [], extra: [] })
  })
})
