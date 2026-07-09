// NarrationOverlay — fading text overlay that shows one narration line per island.
// Pure CSS animation — fades in 1.5s after arriving, fades out on departure.

import { useState, useEffect } from 'react'

export default function NarrationOverlay({ text, islandId }) {
  const [visible, setVisible] = useState(false)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    // Reset on island change
    setVisible(false)
    setDisplayText('')

    // Fade in after 1.5s delay
    const timer = setTimeout(() => {
      setDisplayText(text)
      setVisible(true)
    }, 1500)

    return () => {
      clearTimeout(timer)
      setVisible(false)
    }
  }, [islandId, text])

  return (
    <div
      id="narration-overlay"
      style={{
        position: 'fixed',
        bottom: '6rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        pointerEvents: 'none',
        textAlign: 'center',
        maxWidth: '70vw',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.8s ease-in-out',
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(255, 255, 255, 0.55)',
          letterSpacing: '0.04em',
          lineHeight: 1.6,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          margin: 0,
        }}
      >
        {displayText}
      </p>
    </div>
  )
}
