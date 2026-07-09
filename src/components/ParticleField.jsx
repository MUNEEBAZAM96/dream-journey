// Reusable floating particle field around an island.
// Props: color (hex), density (number of particles), speed (float)
// TODO: Use maath/random for spherical distribution; add instanced mesh for perf.

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ color = '#ffffff', density = 80, speed = 0.3, radius = 10 }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(density * 3)
    for (let i = 0; i < density; i++) {
      arr[i * 3] = (Math.random() - 0.5) * radius * 2
      arr[i * 3 + 1] = Math.random() * radius
      arr[i * 3 + 2] = (Math.random() - 0.5) * radius * 2
    }
    return arr
  }, [density, radius])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * speed * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.12} sizeAttenuation transparent opacity={0.8} />
      {/* TODO: Replace with custom shader for soft glowing particles */}
    </points>
  )
}
