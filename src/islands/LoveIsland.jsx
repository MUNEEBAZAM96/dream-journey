// Love Island — warm pinks and rose tones, soft petal particles.
// TODO: Add rose petals falling, twin heart orbiting objects, soft bloom glow.
// TODO: Interactive object reveals a love letter text panel via <Html>.

import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'

export default function LoveIsland({ position = [0, 0, 0], onInteract }) {
  return (
    <group position={position}>
      <IslandBase color="#880E4F" radius={7} />

      {/* TODO: Replace with rose petal sprites (textured PlaneGeometry) */}
      <ParticleField color="#F06292" density={80} speed={0.15} radius={12} />

      {/* TODO: Replace with two heart-shaped tori orbiting each other */}
      <InteractiveObject position={[0, 3.5, 0]} color="#F06292" label="A beating heart" onInteract={onInteract} />

      {/* TODO: Play soft piano loop via useIslandAudio on mount */}
    </group>
  )
}
