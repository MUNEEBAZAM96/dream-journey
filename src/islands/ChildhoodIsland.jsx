// Childhood Island — warm golden light, firefly orbs, gentle bobbing.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'
import { islands } from '../data/islands'

const config = islands.find((i) => i.id === 'childhood')

export default function ChildhoodIsland({ position = [0, 0, 0], onInteract }) {
  const orbRef = useRef()

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.position.y = 5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.8
    }
  })

  return (
    <group position={position}>
      {/* Warm golden point light */}
      <pointLight position={[0, 8, 0]} color={config.themeColor} intensity={2} distance={25} decay={2} />

      {/* Rounded grassy island — gentle bobbing */}
      <IslandBase
        color="#5A7A32"
        radius={7}
        bobSpeed={0.6}
        bobAmount={0.3}
        emissive={config.themeColor}
        emissiveIntensity={0.05}
      />

      {/* Firefly particles — slow random drift */}
      <ParticleField
        color={config.themeColor}
        density={config.particleCap}
        speed={0.15}
        radius={12}
        particleSize={0.18}
        opacity={0.9}
      />

      {/* Extra firefly sparkles from drei */}
      <Sparkles count={40} scale={14} size={3} speed={0.3} color={config.themeColor} />

      {/* Floating golden orb — a childhood memory */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={orbRef} position={[3, 5, -2]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color={config.themeColor}
            emissive={config.themeColor}
            emissiveIntensity={0.6}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* Floating toy-like torus — playful */}
      <Float speed={2} rotationIntensity={0.8}>
        <mesh position={[-4, 3, 2]}>
          <torusGeometry args={[0.6, 0.25, 12, 24]} />
          <meshStandardMaterial color="#FF8A65" emissive="#FF8A65" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <InteractiveObject
        position={[0, 3, 0]}
        color={config.themeColor}
        label="A childhood toy"
        onInteract={onInteract}
      />
    </group>
  )
}
