// Global journey state — tracks which island the user is currently visiting.
// Returns currentIndex, goTo(n), goNext, goPrev, isTransitioning.
// TODO: Add transition lock (isTransitioning) to prevent rapid skipping.
// TODO: Persist visited island set for UI progress indicator.

import { useState, useCallback } from 'react'
import { islands } from '../data/islands'

export function useJourneyState() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index) => {
    if (index < 0 || index >= islands.length) return
    setCurrentIndex(index)
    // TODO: set isTransitioning = true, then false on camera onRest
  }, [])

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  return {
    currentIndex,
    currentIsland: islands[currentIndex],
    goTo,
    goNext,
    goPrev,
    isTransitioning,
    total: islands.length,
  }
}
