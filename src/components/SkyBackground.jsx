// Sky background — sets scene fog and background gradient feel.
// Props: colorA (horizon hex), colorB (zenith hex)
// TODO: Replace with a sky shader (e.g. drei <Sky> or custom GLSL gradient dome).

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function SkyBackground({ colorA = '#87CEEB', colorB = '#1a1a2e' }) {
  const { scene } = useThree()

  useEffect(() => {
    scene.background = new THREE.Color(colorB)
    scene.fog = new THREE.FogExp2(colorA, 0.008)

    return () => {
      scene.background = null
      scene.fog = null
    }
  }, [scene, colorA, colorB])

  return null
  // TODO: Add a large sphere mesh with gradient vertex colors as a skydome.
  // TODO: Animate color transition between islands using spring interpolation.
}
