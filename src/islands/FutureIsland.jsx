// Future Island — cyan/teal neon tones, geometric floating architecture.
// TODO: Add wireframe city spires, data-stream particle trails, hologram rings.
// TODO: Interactive object should open a "vision" modal with a written prophecy.

import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'

export default function FutureIsland({ position = [0, 0, 0], onInteract }) {
  return (
    <group position={position}>
      <IslandBase color="#004D60" radius={8} />

      {/* TODO: Replace with vertical upward-drifting data-stream lines */}
      <ParticleField color="#00E5FF" density={100} speed={0.4} radius={14} />

      {/* TODO: Replace with a floating holographic pyramid / obelisk */}
      <InteractiveObject position={[0, 4, 0]} color="#00E5FF" label="An oracle of tomorrow" onInteract={onInteract} />

      {/* TODO: Add pulsing point light synced to particle rhythm */}
    </group>
  )
}
