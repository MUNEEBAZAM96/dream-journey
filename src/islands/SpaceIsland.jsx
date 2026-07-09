// Space Island — deep indigo, star-filled void, cosmic wonder.
// TODO: Add star-field skybox, nebula cloud planes, orbiting planet meshes.
// TODO: Interactive object is a glowing comet that on click triggers cosmic zoom-out.

import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'

export default function SpaceIsland({ position = [0, 0, 0], onInteract }) {
  return (
    <group position={position}>
      <IslandBase color="#1A237E" radius={9} />

      {/* TODO: Replace with starfield — large spherical instanced points */}
      <ParticleField color="#B39DDB" density={200} speed={0.05} radius={20} />

      {/* TODO: Replace with a slowly rotating planet or comet with tail shader */}
      <InteractiveObject position={[0, 5, 0]} color="#B39DDB" label="A star that remembers you" onInteract={onInteract} />

      {/* TODO: Add distant ambient synth pad and low-frequency rumble */}
    </group>
  )
}
