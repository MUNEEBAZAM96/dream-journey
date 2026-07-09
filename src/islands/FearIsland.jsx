// Fear Island — jagged broken geometry, erratic flickering particles, unease.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'
import { islands } from '../data/islands'

const config = islands.find((i) => i.id === 'fear')

export default function FearIsland({ position = [0, 0, 0], onInteract }) {
  const flickerRef = useRef()
  const spikeRefs = [useRef(), useRef(), useRef()]

  useFrame((state) => {
    // Flickering light — random intensity
    if (flickerRef.current) {
      flickerRef.current.intensity = 0.5 + Math.random() * 2.5
    }
    // Spikes slowly writhe
    spikeRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + i * 2) * 0.15
        ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2 + i * 3) * 0.1
      }
    })
  })

  return (
    <group position={position}>
      {/* Flickering purple-tinted light */}
      <pointLight ref={flickerRef} position={[0, 6, 0]} color="#6A1B9A" intensity={1.5} distance={20} decay={2} />

      {/* Jagged broken island surface */}
      <IslandBase color="#1A0025" radius={6} variant="jagged" emissive="#4A148C" emissiveIntensity={0.08} />

      {/* Erratic particles — darting like disturbed insects */}
      <ParticleField
        color={config.themeColor}
        density={config.particleCap}
        speed={0.6}
        radius={10}
        pattern="erratic"
        particleSize={0.1}
        opacity={0.6}
      />

      {/* Dark spire formations — twisted spikes */}
      {[[-3, 2, -2], [4, 3, 1], [-1, 2.5, 4]].map((pos, i) => (
        <mesh key={i} ref={spikeRefs[i]} position={pos}>
          <coneGeometry args={[0.4, 3 + i * 0.8, 5]} />
          <meshStandardMaterial color="#0D0015" emissive="#4A148C" emissiveIntensity={0.15} roughness={1} />
        </mesh>
      ))}

      {/* Floating cracked shape */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[2, 5, -3]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="#2D0040"
            emissive={config.themeColor}
            emissiveIntensity={0.4}
            wireframe
          />
        </mesh>
      </Float>

      <InteractiveObject
        position={[0, 3, 0]}
        color={config.themeColor}
        label="The thing in the dark"
        onInteract={onInteract}
      />
    </group>
  )
}
