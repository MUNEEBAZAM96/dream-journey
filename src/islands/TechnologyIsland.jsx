// Technology Island — dark green/matrix tones, circuit-board ground.
// TODO: Add matrix rain particle columns, floating PCB planes, glowing node graph.
// TODO: Interactive object opens a terminal-style "data readout" modal.

import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'

export default function TechnologyIsland({ position = [0, 0, 0], onInteract }) {
  return (
    <group position={position}>
      <IslandBase color="#1B5E20" radius={8} />

      {/* TODO: Replace with vertical green rain columns (instanced) */}
      <ParticleField color="#69F0AE" density={120} speed={0.6} radius={14} />

      {/* TODO: Replace with a spinning gear / CPU chip mesh */}
      <InteractiveObject position={[0, 4, 0]} color="#69F0AE" label="The machine that thinks" onInteract={onInteract} />

      {/* TODO: Add reactive point light that pulses to simulated CPU "heartbeat" */}
    </group>
  )
}
