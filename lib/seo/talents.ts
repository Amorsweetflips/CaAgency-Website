// Profiles without a real bio render near-identical boilerplate, which search
// engines treat as thin duplicate pages. They stay reachable for visitors but
// are kept out of the index (and sitemap) until a bio is written in the admin.
export const MIN_INDEXABLE_BIO_LENGTH = 80

export function isIndexableTalentProfile(bio: string | null | undefined): boolean {
  return (bio?.trim().length ?? 0) >= MIN_INDEXABLE_BIO_LENGTH
}
