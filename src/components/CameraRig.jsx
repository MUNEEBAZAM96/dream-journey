// Camera rig — moves the camera smoothly between island waypoints.
// Driven by currentIndex from useJourneyState hook.
// TODO: Use @react-spring/three useSpring to animate position/lookAt lerp.
// TODO: Add subtle camera shake / floating bob effect while idle.

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { islands } from '../data/islands'

export default function CameraRig({ currentIndex = 0 }) {
  const { camera } = useThree()
  const targetRef = useRef(islands[0].position)

  useFrame(() => {
    const target = islands[currentIndex]?.position ?? [0, 0, 0]
    // Offset so camera hovers above and slightly behind the island
    const [tx, ty, tz] = target
    camera.position.x += ([tx, ty + 6, tz + 18][0] - camera.position.x) * 0.03
    camera.position.y += ([tx, ty + 6, tz + 18][1] - camera.position.y) * 0.03
    camera.position.z += ([tx, ty + 6, tz + 18][2] - camera.position.z) * 0.03
    camera.lookAt(tx, ty, tz)
    targetRef.current = target
  })

  return null
  // TODO: Wire onRest callback to fire island audio and UI reveal.
}
