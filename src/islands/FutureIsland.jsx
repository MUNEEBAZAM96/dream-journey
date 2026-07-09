// Future Island — glowing grid lines, sharp geometry, mechanical particle paths.

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'
import { islands } from '../data/islands'

const config = islands.find((i) => i.id === 'future')

// Glowing wireframe ring component
function HoloRing({ radius = 3, y = 2, speed = 0.5, color }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

export default function FutureIsland({ position = [0, 0, 0], onInteract }) {
  const spireRef = useRef()

  useFrame((state) => {
    if (spireRef.current) {
      spireRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group position={position}>
      {/* Cool cyan point light */}
      <pointLight position={[0, 10, 0]} color={config.themeColor} intensity={2.5} distance={30} decay={2} />

      {/* Sharp-edged island platform */}
      <IslandBase color="#0A2E38" radius={8} emissive={config.themeColor} emissiveIntensity={0.06} />

      {/* Wireframe grid overlay on the island surface */}
      <mesh position={[0, 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshBasicMaterial color={config.themeColor} wireframe transparent opacity={0.15} />
      </mesh>

      {/* Particles in upward data-stream pattern */}
      <ParticleField
        color={config.themeColor}
        density={config.particleCap}
        speed={0.5}
        radius={14}
        pattern="upward"
        particleSize={0.08}
        opacity={0.7}
      />

      {/* Spinning holographic rings */}
      <HoloRing radius={4} y={3} speed={0.4} color={config.themeColor} />
      <HoloRing radius={6} y={5} speed={-0.25} color="#00838F" />
      <HoloRing radius={2.5} y={7} speed={0.7} color={config.themeColor} />

      {/* Central rotating obelisk/spire */}
      <Float speed={0.8} floatIntensity={0.5}>
        <mesh ref={spireRef} position={[0, 6, 0]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#001F2A"
            emissive={config.themeColor}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Geometric accent shapes */}
      {[[5, 4, -3], [-6, 3, 2], [3, 6, 5]].map((pos, i) => (
        <Float key={i} speed={0.4 + i * 0.2} floatIntensity={0.3}>
          <mesh position={pos}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial
              color={config.themeColor}
              emissive={config.themeColor}
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}

      <InteractiveObject
        position={[0, 3.5, 0]}
        color={config.themeColor}
        label="An oracle of tomorrow"
        onInteract={onInteract}
      />
    </group>
  )
}
