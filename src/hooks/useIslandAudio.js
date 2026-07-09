// Howler.js wrapper — loads and plays ambient audio per island.
// Returns { play, stop, isPlaying } so island components stay audio-agnostic.
// TODO: Add fade-in/out crossfade when switching islands.
// TODO: Handle browser autoplay policy with user-gesture unlock.

import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

export function useIslandAudio(audioFile, { volume = 0.4, loop = true } = {}) {
  const soundRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!audioFile) return
    soundRef.current = new Howl({
      src: [audioFile],
      volume,
      loop,
      onplay: () => setIsPlaying(true),
      onstop: () => setIsPlaying(false),
    })
    return () => soundRef.current?.unload()
  }, [audioFile, volume, loop])

  const play = () => soundRef.current?.play()
  const stop = () => soundRef.current?.stop()

  return { play, stop, isPlaying }
}
