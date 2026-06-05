// Shared motion tokens so every animation across the site feels consistent.
// Mirrors the cubic-bezier already used by the original ScrollReveal component.
// Typed as a 4-tuple (mutable) so it satisfies Framer Motion's cubic-bezier ease.
export const EASE_OUT: [number, number, number, number] = [0.25, 0.1, 0.25, 1]
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const DURATION = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
} as const
