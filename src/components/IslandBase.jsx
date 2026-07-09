// Shared island base geometry — renders the floating ground platform.
// Props: color (hex string), radius (number), position ([x,y,z])
// TODO: Replace box with sculpted terrain mesh or custom geometry.

import { useRef } from 'react'

export default function IslandBase({ color = '#aaaaaa', radius = 6, position = [0, 0, 0] }) {
  const meshRef = useRef()

  return (
    <group position={position}>
      {/* Main ground disc */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius * 1.2, 1.5, 32]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Underside taper */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[radius * 1.2, 3, 32]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>

      {/* TODO: Add moss/surface detail textures */}
      {/* TODO: Add procedural rock formations around edges */}
    </group>
  )
}
