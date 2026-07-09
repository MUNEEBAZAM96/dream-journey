// Reusable floating particle field around an island.
// Supports pattern variants: 'random' (default), 'grid', 'upward', 'erratic', 'falling'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function ParticleField({
  color = '#ffffff',
  density = 80,
  speed = 0.3,
  radius = 10,
  pattern = 'random',
  particleSize = 0.12,
  opacity = 0.8,
}) {
  const pointsRef = useRef()
  const timeRef = useRef(0)

  const positions = useMemo(() => {
    const arr = new Float32Array(density * 3)
    for (let i = 0; i < density; i++) {
      if (pattern === 'grid') {
        // Grid/matrix formation
        const cols = Math.ceil(Math.sqrt(density))
        const row = Math.floor(i / cols)
        const col = i % cols
        arr[i * 3] = (col / cols - 0.5) * radius * 2
        arr[i * 3 + 1] = Math.random() * radius
        arr[i * 3 + 2] = (row / cols - 0.5) * radius * 2
      } else {
        // Random spherical distribution
        arr[i * 3] = (Math.random() - 0.5) * radius * 2
        arr[i * 3 + 1] = Math.random() * radius
        arr[i * 3 + 2] = (Math.random() - 0.5) * radius * 2
      }
    }
    return arr
  }, [density, radius, pattern])

  // Base positions stored for animated patterns
  const basePositions = useMemo(() => new Float32Array(positions), [positions])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    timeRef.current += delta

    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position

    if (pattern === 'upward') {
      // Gentle upward drift, reset at top
      for (let i = 0; i < density; i++) {
        let y = posAttr.getY(i) + delta * speed * 2
        if (y > radius) y = 0
        posAttr.setY(i, y)
      }
      posAttr.needsUpdate = true
    } else if (pattern === 'erratic') {
      // Jittery flickering movement
      for (let i = 0; i < density; i++) {
        posAttr.setX(i, basePositions[i * 3] + (Math.random() - 0.5) * 0.5)
        posAttr.setY(i, basePositions[i * 3 + 1] + (Math.random() - 0.5) * 0.5)
        posAttr.setZ(i, basePositions[i * 3 + 2] + (Math.random() - 0.5) * 0.5)
      }
      posAttr.needsUpdate = true
    } else if (pattern === 'falling') {
      // Slow ash-like fall
      for (let i = 0; i < density; i++) {
        let y = posAttr.getY(i) - delta * speed * 0.8
        if (y < -2) y = radius
        posAttr.setY(i, y)
        // Gentle horizontal drift
        posAttr.setX(i, posAttr.getX(i) + Math.sin(timeRef.current + i) * delta * 0.05)
      }
      posAttr.needsUpdate = true
    } else {
      // Default: gentle rotation
      pointsRef.current.rotation.y += delta * speed * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={particleSize}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  )
}
