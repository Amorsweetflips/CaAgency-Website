export const showcaseGridClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
}

// Shared by the lazy showcase and its server fallback so both request the
// same poster variant and the swap never refetches it.
export const showcasePosterSizes = {
  2: '(max-width: 767px) 100vw, (max-width: 1299px) 50vw, 640px',
  3: '(max-width: 767px) 50vw, (max-width: 1299px) 33vw, 420px',
  4: '(max-width: 767px) 50vw, (max-width: 1299px) 25vw, 310px',
}
