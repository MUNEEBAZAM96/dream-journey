// DreamJourney.jsx — top-level Canvas + orchestrates all islands and camera.
// TODO: Replace arrow-key navigation with scroll-wheel / touch swipe gesture.
// TODO: Add HUD overlay (island name, progress dots) as DOM layer over Canvas.

import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useJourneyState } from '../hooks/useJourneyState'
import { islands } from '../data/islands'
import CameraRig from '../components/CameraRig'
import SkyBackground from '../components/SkyBackground'
import ChildhoodIsland from '../islands/ChildhoodIsland'
import FearIsland from '../islands/FearIsland'
import FutureIsland from '../islands/FutureIsland'
import LoveIsland from '../islands/LoveIsland'
import TechnologyIsland from '../islands/TechnologyIsland'
import DeathIsland from '../islands/DeathIsland'
import SpaceIsland from '../islands/SpaceIsland'

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
  const { currentIndex, currentIsland, goNext, goPrev } = useJourneyState()

  return (
    <>
      <Canvas camera={{ position: [0, 6, 18], fov: 60 }} style={{ width: '100vw', height: '100vh' }}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />
        {/* TODO: Add per-island coloured point light that swaps with island theme */}

        {/* Sky — driven by current island */}
        <SkyBackground colorA={currentIsland.skyColorA} colorB={currentIsland.skyColorB} />

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

        {/* Post-processing */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.2} />
          {/* TODO: Add ChromaticAberration and Vignette for cinematic feel */}
        </EffectComposer>
      </Canvas>

      {/* HUD navigation — rendered outside Canvas as DOM overlay */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', zIndex: 10 }}>
        <button onClick={goPrev}>← Prev</button>
        <span style={{ color: '#fff' }}>{currentIsland.name}</span>
        <button onClick={goNext}>Next →</button>
        {/* TODO: Replace plain buttons with styled glassmorphism nav from global.css */}
      </div>
    </>
  )
}
