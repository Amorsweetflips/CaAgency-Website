import { describe, it, expect } from 'vitest'
import { deepMergeWithDefaults } from '@/lib/site-content/merge'

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v))

describe('deepMergeWithDefaults', () => {
  it('returns defaults when overrides is null/undefined/non-object', () => {
    const defaults = { a: 1, b: 'x' }
    expect(deepMergeWithDefaults(defaults, null)).toEqual(defaults)
    expect(deepMergeWithDefaults(defaults, undefined)).toEqual(defaults)
    expect(deepMergeWithDefaults(defaults, 'string')).toEqual(defaults)
  })

  it('overrides scalar fields and keeps untouched defaults', () => {
    expect(deepMergeWithDefaults({ a: 1, b: 2 }, { b: 9 })).toEqual({ a: 1, b: 9 })
  })

  it('ignores explicit undefined override values', () => {
    expect(deepMergeWithDefaults({ a: 1 }, { a: undefined })).toEqual({ a: 1 })
  })

  it('replaces non-empty arrays but keeps default for an empty override array', () => {
    expect(deepMergeWithDefaults({ list: [1, 2] }, { list: [3] })).toEqual({ list: [3] })
    expect(deepMergeWithDefaults({ list: [1, 2] }, { list: [] })).toEqual({ list: [1, 2] })
  })

  it('deep-merges nested objects so a partial save does not drop sibling fields', () => {
    const defaults = { hero: { title: 'T', subtitle: 'S', cta: 'C' } }
    expect(deepMergeWithDefaults(defaults, { hero: { subtitle: 'New' } })).toEqual({
      hero: { title: 'T', subtitle: 'New', cta: 'C' },
    })
  })

  it('does not mutate the defaults object', () => {
    const defaults = { a: 1, nested: { x: 1 } }
    const snapshot = clone(defaults)
    deepMergeWithDefaults(defaults, { a: 2, nested: { x: 9 } })
    expect(defaults).toEqual(snapshot)
  })
})
