// Death Island — muted grey/black, crumbling/translucent, sparse slow-falling ash.
// All movement is dramatically slowed. Near-silence.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'
import { islands } from '../data/islands'

const config = islands.find((i) => i.id === 'death')

export default function DeathIsland({ position = [0, 0, 0], onInteract }) {
  const hourglassTopRef = useRef()
  const hourglassBottomRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.1 // dramatically slow
    // Hourglass halves very subtly counter-rotate
    if (hourglassTopRef.current) hourglassTopRef.current.rotation.y = t
    if (hourglassBottomRef.current) hourglassBottomRef.current.rotation.y = -t
  })

  return (
    <group position={position}>
      {/* Dim, cool-toned light — barely illuminating */}
      <pointLight position={[0, 6, 0]} color="#546E7A" intensity={0.6} distance={18} decay={2} />

      {/* Crumbling translucent island */}
      <IslandBase
        color="#263238"
        radius={6}
        variant="crumbling"
        opacity={0.7}
        emissive="#37474F"
        emissiveIntensity={0.03}
      />

      {/* Sparse slow-falling ash particles */}
      <ParticleField
        color="#90A4AE"
        density={config.particleCap}
        speed={0.04}
        radius={10}
        pattern="falling"
        particleSize={0.1}
        opacity={0.4}
      />

      {/* Hourglass form — two cones meeting at a point */}
      <group position={[0, 5, 0]}>
        <mesh ref={hourglassTopRef} position={[0, 0.8, 0]}>
          <coneGeometry args={[0.7, 1.6, 8]} />
          <meshStandardMaterial
            color="#455A64"
            emissive="#546E7A"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
        <mesh ref={hourglassBottomRef} position={[0, -0.8, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.7, 1.6, 8]} />
          <meshStandardMaterial
            color="#455A64"
            emissive="#546E7A"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
      </group>

      {/* Bare tree silhouettes — simple cone+cylinder */}
      {[[-4, 0, -2], [3, 0, 3], [-2, 0, 4]].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.06, 0.1, 3, 6]} />
            <meshStandardMaterial color="#1A1A1A" roughness={1} />
          </mesh>
          {/* Sparse branches */}
          <mesh position={[0.3, 2.8, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.02, 0.04, 1.2, 4]} />
            <meshStandardMaterial color="#1A1A1A" roughness={1} />
          </mesh>
          <mesh position={[-0.2, 2.5, 0.1]} rotation={[0, 0, -Math.PI / 5]}>
            <cylinderGeometry args={[0.02, 0.04, 0.9, 4]} />
            <meshStandardMaterial color="#1A1A1A" roughness={1} />
          </mesh>
        </group>
      ))}

      <InteractiveObject
        position={[0, 3, 0]}
        color={config.themeColor}
        label="Time held still"
        onInteract={onInteract}
      />
    </group>
  )
}
