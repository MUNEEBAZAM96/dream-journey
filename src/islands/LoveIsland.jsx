// Love Island — warm pinks, soft pulsing glow, upward-drifting particles.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'
import { islands } from '../data/islands'

const config = islands.find((i) => i.id === 'love')

// Pulsing glow orb — synced to a slow "heartbeat"
function HeartbeatOrb({ position, color, baseScale = 1 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    // Heartbeat: two quick pulses then pause
    const t = state.clock.elapsedTime * 1.2
    const beat = Math.pow(Math.sin(t * Math.PI) * 0.5 + 0.5, 8) +
                 Math.pow(Math.sin((t + 0.15) * Math.PI) * 0.5 + 0.5, 8)
    const scale = baseScale + beat * 0.25
    ref.current.scale.setScalar(scale)
    ref.current.material.emissiveIntensity = 0.4 + beat * 0.8
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.8, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
        roughness={0.3}
      />
    </mesh>
  )
}

export default function LoveIsland({ position = [0, 0, 0], onInteract }) {
  return (
    <group position={position}>
      {/* Warm pink light */}
      <pointLight position={[0, 8, 0]} color={config.themeColor} intensity={2} distance={25} decay={2} />
      <pointLight position={[5, 3, -3]} color="#E91E63" intensity={0.8} distance={15} decay={2} />

      {/* Smooth rounded island */}
      <IslandBase
        color="#880E4F"
        radius={7}
        bobSpeed={0.4}
        bobAmount={0.2}
        emissive={config.themeColor}
        emissiveIntensity={0.08}
      />

      {/* Upward-drifting petal particles */}
      <ParticleField
        color={config.themeColor}
        density={config.particleCap}
        speed={0.12}
        radius={12}
        pattern="upward"
        particleSize={0.15}
        opacity={0.7}
      />

      {/* Soft sparkle haze */}
      <Sparkles count={30} scale={16} size={2} speed={0.15} color={config.themeColor} />

      {/* Twin pulsing orbs — orbiting each other (not literal hearts) */}
      <HeartbeatOrb position={[-1.5, 5, 0]} color={config.themeColor} baseScale={0.8} />
      <HeartbeatOrb position={[1.5, 5, 0]} color="#E91E63" baseScale={0.8} />

      {/* Flowing ribbon arcs */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <Float key={i} speed={0.6} floatIntensity={0.5} rotationIntensity={0.2}>
          <mesh
            position={[Math.cos(angle) * 4, 3 + i * 0.5, Math.sin(angle) * 4]}
            rotation={[0, angle, Math.PI / 6]}
          >
            <torusGeometry args={[1, 0.04, 8, 32, Math.PI]} />
            <meshStandardMaterial
              color={config.themeColor}
              emissive={config.themeColor}
              emissiveIntensity={0.4}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>
      ))}

      <InteractiveObject
        position={[0, 3.5, 0]}
        color={config.themeColor}
        label="A beating heart"
        onInteract={onInteract}
      />
    </group>
  )
}
