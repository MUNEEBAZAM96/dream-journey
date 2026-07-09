// Fear Island — deep purple/black palette, unsettling floating shapes.
// TODO: Add pulsing dark tendrils, flickering point lights, shadow entities.
// TODO: Add heartbeat audio that speeds up near interactive object.

import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'

export default function FearIsland({ position = [0, 0, 0], onInteract }) {
  return (
    <group position={position}>
      <IslandBase color="#2D0040" radius={6} />

      {/* TODO: Replace with dark smoke/ash particles that drift downward */}
      <ParticleField color="#7B1FA2" density={90} speed={0.5} radius={10} />

      {/* TODO: Replace with a contorted shadow figure or cracked mirror mesh */}
      <InteractiveObject position={[0, 3, 0]} color="#7B1FA2" label="The thing in the dark" onInteract={onInteract} />

      {/* TODO: Trigger flickering directional light on hover */}
    </group>
  )
}
