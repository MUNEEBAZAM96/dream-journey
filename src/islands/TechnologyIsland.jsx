// Technology Island — neon accents, circuit grid, matrix-like particle grid.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'
import { islands } from '../data/islands'

const config = islands.find((i) => i.id === 'technology')

// Spinning gear-like ring
function GearRing({ radius = 2, y = 3, speed = 0.5 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} position={[0, y, 0]}>
      <torusGeometry args={[radius, 0.06, 6, 8]} />
      <meshStandardMaterial
        color={config.themeColor}
        emissive={config.themeColor}
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}

export default function TechnologyIsland({ position = [0, 0, 0], onInteract }) {
  const coreRef = useRef()
  const pulseRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) coreRef.current.rotation.y = t * 0.4
    if (pulseRef.current) {
      // CPU heartbeat pulse
      pulseRef.current.intensity = 1 + Math.sin(t * 4) * 0.8
    }
  })

  return (
    <group position={position}>
      {/* Neon green accent light */}
      <pointLight ref={pulseRef} position={[0, 8, 0]} color={config.themeColor} intensity={1.5} distance={25} decay={2} />

      {/* Dark platform with circuit feel */}
      <IslandBase color="#0A1F0A" radius={8} emissive={config.themeColor} emissiveIntensity={0.04} />

      {/* Circuit-pattern wireframe overlay */}
      <mesh position={[0, 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 16, 16, 16]} />
        <meshBasicMaterial color={config.themeColor} wireframe transparent opacity={0.08} />
      </mesh>

      {/* Matrix/grid particle formation */}
      <ParticleField
        color={config.themeColor}
        density={config.particleCap}
        speed={0.3}
        radius={14}
        pattern="grid"
        particleSize={0.06}
        opacity={0.6}
      />

      {/* Spinning gear rings — mechanical feel */}
      <GearRing radius={3} y={4} speed={0.3} />
      <GearRing radius={2} y={6} speed={-0.5} />
      <GearRing radius={4.5} y={2.5} speed={0.15} />

      {/* Central CPU core */}
      <Float speed={0.3} floatIntensity={0.2}>
        <mesh ref={coreRef} position={[0, 5.5, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#001A00"
            emissive={config.themeColor}
            emissiveIntensity={0.9}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      </Float>

      {/* Data node accents */}
      {[[6, 3, -4], [-5, 4, 3], [4, 5, 5], [-6, 2, -5]].map((pos, i) => (
        <Float key={i} speed={0.2 + i * 0.1} floatIntensity={0.15}>
          <mesh position={pos}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial
              color={config.themeColor}
              emissive={config.themeColor}
              emissiveIntensity={1}
            />
          </mesh>
        </Float>
      ))}

      <InteractiveObject
        position={[0, 3.5, 0]}
        color={config.themeColor}
        label="The machine that thinks"
        onInteract={onInteract}
      />
    </group>
  )
}
