// Death Island — slate grey, monochrome, heavy silence aesthetic.
// TODO: Add falling ash particles, bare tree silhouettes, clock frozen at midnight.
// TODO: Interactive object is an hourglass — clicking it triggers a memory voiceover.

import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'

export default function DeathIsland({ position = [0, 0, 0], onInteract }) {
  return (
    <group position={position}>
      <IslandBase color="#37474F" radius={6} />

      {/* TODO: Replace with slow drifting grey ash flakes */}
      <ParticleField color="#90A4AE" density={50} speed={0.08} radius={10} />

      {/* TODO: Replace with an hourglass mesh where sand trickles down */}
      <InteractiveObject position={[0, 3, 0]} color="#B0BEC5" label="Time held still" onInteract={onInteract} />

      {/* TODO: Silence all other audio; play single low drone note on approach */}
    </group>
  )
}
