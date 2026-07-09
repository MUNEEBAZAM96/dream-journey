// Sky background — smoothly interpolates scene fog and background color
// between islands as the camera moves.

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const _colorA = new THREE.Color()
const _colorB = new THREE.Color()
const _targetA = new THREE.Color()
const _targetB = new THREE.Color()

export default function SkyBackground({ colorA = '#87CEEB', colorB = '#1a1a2e' }) {
  const { scene } = useThree()
  const initialised = useRef(false)

  // Set up fog on first render
  if (!initialised.current) {
    scene.background = new THREE.Color(colorB)
    scene.fog = new THREE.FogExp2(colorA, 0.006)
    initialised.current = true
  }

  useFrame(() => {
    // Smoothly lerp background and fog toward target colors
    _targetA.set(colorA)
    _targetB.set(colorB)

    if (scene.background) {
      scene.background.lerp(_targetB, 0.02)
    }
    if (scene.fog) {
      scene.fog.color.lerp(_targetA, 0.02)
    }
  })

  return null
}
