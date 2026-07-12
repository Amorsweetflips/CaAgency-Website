'use client'

import { useSyncExternalStore } from 'react'
import {
  getReducedMotionSnapshot,
  subscribeReducedMotion,
} from '@/lib/performance/reduced-motion'

export default function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => true
  )
}
