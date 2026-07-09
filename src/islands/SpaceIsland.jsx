// Space Island — deep navy/black, starfield, abstract floating fragments.
// Brightest, most open scene of all seven.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Float, Sparkles } from '@react-three/drei'
import IslandBase from '../components/IslandBase'
import ParticleField from '../components/ParticleField'
import InteractiveObject from '../components/InteractiveObject'
import { islands } from '../data/islands'

const config = islands.find((i) => i.id === 'space')

export default function SpaceIsland({ position = [0, 0, 0], onInteract }) {
  const cometRef = useRef()
  const nebulaRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (cometRef.current) {
      cometRef.current.rotation.y = t * 0.15
      cometRef.current.rotation.x = Math.sin(t * 0.1) * 0.2
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = t * 0.02
    }
  })

  return (
    <group position={position}>
      {/* Bright cosmic light */}
      <pointLight position={[0, 12, 0]} color="#E8EAF6" intensity={3} distance={40} decay={2} />
      <pointLight position={[10, 5, -10]} color={config.themeColor} intensity={1} distance={25} decay={2} />

      {/* Starfield sky — drei Stars centered on this island */}
      <Stars radius={60} depth={30} count={800} factor={4} saturation={0.2} fade speed={0.3} />

      {/* Fragmented abstract island base — floating pieces */}
      <IslandBase
        color="#1A237E"
        radius={9}
        variant="fragmented"
        emissive={config.themeColor}
        emissiveIntensity={0.1}
      />

      {/* Twinkling star particles — large radius, gentle drift */}
      <ParticleField
        color={config.themeColor}
        density={config.particleCap}
        speed={0.03}
        radius={25}
        particleSize={0.14}
        opacity={0.9}
      />

      {/* Extra sparkles for cosmic dust feel */}
      <Sparkles count={60} scale={30} size={2.5} speed={0.1} color="#E8EAF6" />

      {/* Nebula cloud — large translucent sphere */}
      <mesh ref={nebulaRef} position={[0, 8, -5]}>
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial color="#3F0A6B" transparent opacity={0.04} side={2} />
      </mesh>

      {/* Orbiting planet */}
      <group ref={cometRef}>
        <Float speed={0.3} floatIntensity={0.5}>
          <mesh position={[8, 6, 0]}>
            <sphereGeometry args={[1.2, 24, 24]} />
            <meshStandardMaterial
              color="#283593"
              emissive={config.themeColor}
              emissiveIntensity={0.5}
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
          {/* Planet ring */}
          <mesh position={[8, 6, 0]} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2, 0.05, 8, 48]} />
            <meshBasicMaterial color={config.themeColor} transparent opacity={0.5} />
          </mesh>
        </Float>
      </group>

      {/* Floating crystal shards */}
      {[[5, 10, -6], [-7, 8, 4], [3, 12, 8], [-4, 6, -8]].map((pos, i) => (
        <Float key={i} speed={0.15 + i * 0.05} floatIntensity={0.6} rotationIntensity={0.3}>
          <mesh position={pos}>
            <octahedronGeometry args={[0.5 + i * 0.15, 0]} />
            <meshStandardMaterial
              color={config.themeColor}
              emissive={config.themeColor}
              emissiveIntensity={0.7}
              transparent
              opacity={0.7}
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}

      <InteractiveObject
        position={[0, 5, 0]}
        color={config.themeColor}
        label="A star that remembers you"
        onInteract={onInteract}
      />
    </group>
  )
}
