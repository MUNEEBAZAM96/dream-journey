import { Suspense } from 'react'
import DreamJourney from './scenes/DreamJourney'
import './styles/global.css'

function LoadingScreen() {
  return (
    <div className="loading-overlay" id="loading-screen">
      Entering the dream…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DreamJourney />
    </Suspense>
  )
}