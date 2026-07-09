// Clickable interactive object on each island.
// Props: position ([x,y,z]), onInteract (callback), color (hex), label (string)
// TODO: Add GSAP/spring hover bounce animation, tooltip popup, and glow outline.

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function InteractiveObject({
  position = [0, 2, 0],
  onInteract,
  color = '#ffffff',
  label = 'Object',
}) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.5)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onInteract}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color={hovered ? '#ffffff' : color}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.8 : 0}
        roughness={0.2}
        metalness={0.6}
      />
      {/* TODO: Replace geometry with island-specific meaningful object (e.g. toy, clock, flower) */}
      {/* TODO: Add <Html> label popup from @react-three/drei */}
    </mesh>
  )
}
