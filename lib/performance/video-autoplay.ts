export const VIDEO_AUTOPLAY_DWELL_MS = 250
export const VIDEO_AUTOPLAY_MIN_RATIO = 0.35

export type VideoCandidate = {
  id: string
  ratio: number
  centerDistance: number
  order: number
}

export function selectVideoCandidate(
  candidates: Iterable<VideoCandidate>,
  minimumRatio = VIDEO_AUTOPLAY_MIN_RATIO
) {
  let selected: VideoCandidate | null = null
  for (const candidate of candidates) {
    if (candidate.ratio < minimumRatio) continue
    if (
      !selected ||
      candidate.ratio > selected.ratio ||
      (candidate.ratio === selected.ratio &&
        (candidate.centerDistance < selected.centerDistance ||
          (candidate.centerDistance === selected.centerDistance &&
            candidate.order < selected.order)))
    ) {
      selected = candidate
    }
  }
  return selected?.id ?? null
}

export function createVideoAutoplayCoordinator(
  onActiveChange: (id: string | null) => void,
  dwellMs = VIDEO_AUTOPLAY_DWELL_MS
) {
  const candidates = new Map<string, VideoCandidate>()
  const suppressedIds = new Set<string>()
  let activeId: string | null = null
  let pendingId: string | null = null
  let timer: ReturnType<typeof setTimeout> | null = null

  const cancelPending = () => {
    if (timer) clearTimeout(timer)
    timer = null
    pendingId = null
  }

  const setActive = (id: string | null) => {
    if (activeId === id) return
    activeId = id
    onActiveChange(id)
  }

  const reconcile = () => {
    const eligibleCandidates = Array.from(candidates.values()).filter(
      (candidate) => !suppressedIds.has(candidate.id)
    )
    const nextId = selectVideoCandidate(eligibleCandidates)
    const activeCandidate = activeId ? candidates.get(activeId) : undefined
    if (activeId && (!activeCandidate || activeCandidate.ratio < VIDEO_AUTOPLAY_MIN_RATIO)) {
      setActive(null)
    }
    if (!nextId || nextId === activeId || nextId === pendingId) {
      if (!nextId || nextId === activeId) cancelPending()
      return
    }
    cancelPending()
    pendingId = nextId
    timer = setTimeout(() => {
      timer = null
      const current = selectVideoCandidate(
        Array.from(candidates.values()).filter(
          (candidate) => !suppressedIds.has(candidate.id)
        )
      )
      pendingId = null
      if (current === nextId) setActive(nextId)
    }, dwellMs)
  }

  return {
    update(candidate: VideoCandidate) {
      const previous = candidates.get(candidate.id)
      if (
        suppressedIds.has(candidate.id) &&
        previous &&
        previous.ratio >= VIDEO_AUTOPLAY_MIN_RATIO &&
        candidate.ratio < VIDEO_AUTOPLAY_MIN_RATIO
      ) {
        suppressedIds.delete(candidate.id)
      }
      candidates.set(candidate.id, candidate)
      reconcile()
    },
    remove(id: string) {
      candidates.delete(id)
      suppressedIds.delete(id)
      if (pendingId === id) cancelPending()
      if (activeId === id) setActive(null)
      reconcile()
    },
    request(id: string) {
      cancelPending()
      suppressedIds.delete(id)
      setActive(id)
    },
    release(id: string) {
      if (activeId !== id) return
      suppressedIds.add(id)
      setActive(null)
      reconcile()
    },
    getActiveId() {
      return activeId
    },
    destroy() {
      cancelPending()
      candidates.clear()
      suppressedIds.clear()
      activeId = null
    },
  }
}
