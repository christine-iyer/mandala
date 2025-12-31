import { useState } from 'react'
import Mandala from './components/Mandala'
import Controls from './components/Controls'
import './App.css'

function App() {
  const [config, setConfig] = useState({
    patternType: 'petals',
    layers: 8,
    repeatsPerLayer: 12,
    size: 600,
    colorScheme: 'monochrome',
    rotationSpeed: 1
  });

  return (
    <div className="app">
      <header>
        <h1>Mandala Generator</h1>
        <p>Create beautiful, customizable mandala patterns</p>
      </header>
      
      <main className="content">
        <Controls config={config} setConfig={setConfig} />
        <div className="canvas-container">
          <Mandala
            patternType={config.patternType}
            layers={config.layers}
            repeatsPerLayer={config.repeatsPerLayer}
            size={config.size}
            colorScheme={config.colorScheme}
            rotationSpeed={config.rotationSpeed}
          />
        </div>
      </main>
    </div>
  )
}

export default App
