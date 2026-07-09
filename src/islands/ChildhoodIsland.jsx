// Childhood Island — warm golden tones, playful floating objects.
// TODO: Add spinning toy tops, paper airplanes, kite strings as interactive objects.
// TODO: Swap IslandBase for grassy terrain with dandelion particles.

import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'

export default function ChildhoodIsland({ position = [0, 0, 0], onInteract }) {
  return (
    <group position={position}>
      <IslandBase color="#D4A843" radius={7} />

      {/* TODO: Replace with dandelion seed particles */}
      <ParticleField color="#FFD580" density={60} speed={0.2} radius={12} />

      {/* TODO: Replace octahedron with a spinning toy or kite mesh */}
      <InteractiveObject position={[0, 3, 0]} color="#FFD580" label="A childhood toy" onInteract={onInteract} />

      {/* TODO: Add ambient childhood ambient audio trigger via useIslandAudio */}
    </group>
  )
}
