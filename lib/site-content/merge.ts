/**
 * Deep-merge DB-stored content over code defaults so partial saves never drop
 * fields (e.g. carouselImages). Arrays are replaced wholesale unless the
 * override is empty, in which case the default array is kept. Pure + dependency
 * free so it can be unit-tested in isolation.
 */
export function deepMergeWithDefaults<T extends object>(defaults: T, overrides: unknown): T {
  if (overrides == null || typeof overrides !== 'object') return defaults
  const result = { ...defaults } as Record<string, unknown>
  for (const key of Object.keys(overrides as Record<string, unknown>)) {
    const defVal = (defaults as Record<string, unknown>)[key]
    const overrideVal = (overrides as Record<string, unknown>)[key]
    if (overrideVal === undefined) continue
    if (Array.isArray(defVal) && Array.isArray(overrideVal)) {
      result[key] = overrideVal.length > 0 ? overrideVal : defVal
    } else if (
      overrideVal !== null &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal) &&
      defVal !== null &&
      typeof defVal === 'object' &&
      !Array.isArray(defVal)
    ) {
      result[key] = deepMergeWithDefaults(defVal as object, overrideVal) as unknown
    } else {
      result[key] = overrideVal
    }
  }
  return result as T
}
