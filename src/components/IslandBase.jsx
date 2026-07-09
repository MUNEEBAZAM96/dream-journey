// Shared island base geometry — renders the floating ground platform.
// Supports visual variants: 'smooth' (default), 'jagged', 'crumbling', 'fragmented'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function IslandBase({
  color = '#aaaaaa',
  radius = 6,
  position = [0, 0, 0],
  variant = 'smooth',
  emissive = '#000000',
  emissiveIntensity = 0,
  opacity = 1,
  bobSpeed = 0,
  bobAmount = 0,
}) {
  const groupRef = useRef()
  const timeRef = useRef(0)

  // Displaced geometry for jagged variant
  const jaggedGeo = useMemo(() => {
    if (variant !== 'jagged') return null
    const geo = new THREE.CylinderGeometry(radius, radius * 1.2, 1.5, 24, 4)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, pos.getY(i) + (Math.random() - 0.5) * 1.2)
      pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.6)
      pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 0.6)
    }
    geo.computeVertexNormals()
    return geo
  }, [variant, radius])

  useFrame((_, delta) => {
    if (groupRef.current && bobSpeed > 0) {
      timeRef.current += delta
      groupRef.current.position.y = position[1] + Math.sin(timeRef.current * bobSpeed) * bobAmount
    }
  })

  const materialProps = {
    color,
    roughness: 0.8,
    metalness: 0.1,
    emissive,
    emissiveIntensity,
    transparent: opacity < 1,
    opacity,
  }

  // Fragmented variant — scattered broken pieces
  if (variant === 'fragmented') {
    const fragments = useMemo(() => {
      const frags = []
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const dist = radius * 0.4 + Math.random() * radius * 0.6
        frags.push({
          pos: [Math.cos(angle) * dist, (Math.random() - 0.5) * 3, Math.sin(angle) * dist],
          rot: [Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5],
          scale: 0.4 + Math.random() * 0.8,
        })
      }
      return frags
    }, [radius])

    return (
      <group ref={groupRef} position={position}>
        {/* Central remnant */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[radius * 0.4, radius * 0.5, 1, 16]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Floating fragments */}
        {fragments.map((f, i) => (
          <mesh key={i} position={f.pos} rotation={f.rot} scale={f.scale}>
            <dodecahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        ))}
      </group>
    )
  }

  // Crumbling variant — translucent with holes
  if (variant === 'crumbling') {
    return (
      <group ref={groupRef} position={position}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[radius, radius * 1.1, 1.2, 24]} />
          <meshStandardMaterial {...materialProps} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[radius * 1.1, 2.5, 24]} />
          <meshStandardMaterial {...materialProps} wireframe side={THREE.DoubleSide} />
        </mesh>
      </group>
    )
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Main ground disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        {variant === 'jagged' && jaggedGeo ? (
          <primitive object={jaggedGeo} attach="geometry" />
        ) : (
          <cylinderGeometry args={[radius, radius * 1.2, 1.5, 32]} />
        )}
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Underside taper */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[radius * 1.2, 3, 32]} />
        <meshStandardMaterial {...materialProps} roughness={0.9} />
      </mesh>
    </group>
  )
}
