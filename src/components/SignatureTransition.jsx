// SignatureTransition — the Death → Space "star igniting" moment.
// Triggered by proximity/distance checks, not timers.
// When departing Death toward Space: spawns a brief bright Sparkles burst,
// dims light on approach to Death, restores on reaching Space.

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { islands } from '../data/islands'

const DEATH_INDEX = islands.findIndex((i) => i.id === 'death')
const SPACE_INDEX = islands.findIndex((i) => i.id === 'space')

export default function SignatureTransition({ currentIndex }) {
  const lightRef = useRef()
  const [burstActive, setBurstActive] = useState(false)
  const prevIndexRef = useRef(currentIndex)

  // Detect when transitioning FROM death TO space
  useEffect(() => {
    if (prevIndexRef.current === DEATH_INDEX && currentIndex === SPACE_INDEX) {
      // Fire the star-igniting burst
      setBurstActive(true)
      const timer = setTimeout(() => setBurstActive(false), 3000)
      return () => clearTimeout(timer)
    }
    prevIndexRef.current = currentIndex
  }, [currentIndex])

  useFrame((state) => {
    if (!lightRef.current) return

    // Approaching Death: dim the directional light gradually
    if (currentIndex === DEATH_INDEX) {
      lightRef.current.intensity += (0.15 - lightRef.current.intensity) * 0.02
    } else if (currentIndex === SPACE_INDEX) {
      // Arriving at Space: restore brightness
      lightRef.current.intensity += (1.2 - lightRef.current.intensity) * 0.03
    } else {
      // Normal intensity
      lightRef.current.intensity += (0.8 - lightRef.current.intensity) * 0.03
    }
  })

  return (
    <>
      {/* Scene directional light — intensity controlled by transition state */}
      <directionalLight ref={lightRef} position={[10, 20, 10]} intensity={0.8} />

      {/* Star igniting burst — only rendered during Death→Space transition */}
      {burstActive && (
        <group position={islands[SPACE_INDEX].position}>
          <Sparkles
            count={120}
            scale={20}
            size={8}
            speed={2}
            color="#FFFFFF"
            opacity={0.9}
          />
          <pointLight position={[0, 5, 0]} color="#FFFFFF" intensity={6} distance={40} decay={2} />
        </group>
      )}
    </>
  )
}
