// DreamJourney.jsx — top-level Canvas + orchestrates all islands and camera.
// Effects are toggleable via EFFECTS_CONFIG for demo-day performance tuning.

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useJourneyState } from '../hooks/useJourneyState'
import { islands } from '../data/islands'
import CameraRig from '../components/CameraRig'
import SkyBackground from '../components/SkyBackground'
import SignatureTransition from '../components/SignatureTransition'
import NarrationOverlay from '../components/NarrationOverlay'
import ChildhoodIsland from '../islands/ChildhoodIsland'
import FearIsland from '../islands/FearIsland'
import FutureIsland from '../islands/FutureIsland'
import LoveIsland from '../islands/LoveIsland'
import TechnologyIsland from '../islands/TechnologyIsland'
import DeathIsland from '../islands/DeathIsland'
import SpaceIsland from '../islands/SpaceIsland'

// ═══════════════════════════════════════════
// EFFECTS CONFIG — toggle any effect to false
// if it tanks frame rate on the demo laptop.
// ═══════════════════════════════════════════
const EFFECTS_CONFIG = {
  bloom: true,
  vignette: true,
  chromaticAberrationOnFear: true,
}

// To show FPS during development, uncomment:
// import { Stats } from '@react-three/drei'
// Then add <Stats /> inside <Canvas> below.

const ISLAND_COMPONENTS = {
  childhood: ChildhoodIsland,
  fear: FearIsland,
  future: FutureIsland,
  love: LoveIsland,
  technology: TechnologyIsland,
  death: DeathIsland,
  space: SpaceIsland,
}

export default function DreamJourney() {
  const { currentIndex, currentIsland, goNext, goPrev, total } = useJourneyState()
  const isFearActive = currentIsland.id === 'fear'

  return (
    <>
      <Canvas camera={{ position: [0, 6, 18], fov: 60 }} style={{ width: '100vw', height: '100vh' }}>
        <Suspense fallback={null}>
          {/* Lighting — ambient is always on; directional is inside SignatureTransition */}
          <ambientLight intensity={0.4} />

          {/* Sky — smoothly interpolated per-island */}
          <SkyBackground colorA={currentIsland.skyColorA} colorB={currentIsland.skyColorB} />

          {/* Signature Death→Space transition (also manages the scene directional light) */}
          <SignatureTransition currentIndex={currentIndex} />

          {/* Render all islands at their world positions */}
          {islands.map((island) => {
            const IslandComponent = ISLAND_COMPONENTS[island.id]
            return (
              <IslandComponent
                key={island.id}
                position={island.position}
                onInteract={() => console.log(`Interacted with ${island.name}`)}
              />
            )
          })}

          {/* Camera navigation */}
          <CameraRig currentIndex={currentIndex} />

          {/* Post-processing stack */}
          <EffectComposer>
            {EFFECTS_CONFIG.bloom && (
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.4} />
            )}
            {EFFECTS_CONFIG.vignette && (
              <Vignette eskil={false} offset={0.3} darkness={0.7} blendFunction={BlendFunction.NORMAL} />
            )}
            {EFFECTS_CONFIG.chromaticAberrationOnFear && isFearActive && (
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.003, 0.003]}
                radialModulation={false}
                modulationOffset={0.5}
              />
            )}
          </EffectComposer>

          {/* Uncomment for dev FPS stats: <Stats /> */}
        </Suspense>
      </Canvas>

      {/* Narration text overlay */}
      <NarrationOverlay text={currentIsland.narration} islandId={currentIsland.id} />

      {/* HUD navigation */}
      <div className="hud-nav" id="hud-navigation">
        <button onClick={goPrev} disabled={currentIndex === 0} id="btn-prev">
          ← Prev
        </button>

        {/* Progress dots */}
        <div className="progress-dots">
          {islands.map((island, i) => (
            <span
              key={island.id}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              style={{ '--dot-color': island.themeColor }}
            />
          ))}
        </div>

        <span className="island-name">{currentIsland.name}</span>

        <button onClick={goNext} disabled={currentIndex === total - 1} id="btn-next">
          Next →
        </button>
      </div>
    </>
  )
}
