import './Controls.css';

const Controls = ({ config, setConfig }) => {
  const handleChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="controls">
      <h2>Mandala Controls</h2>
      
      <div className="control-group">
        <label htmlFor="patternType">Pattern Type</label>
        <select
          id="patternType"
          value={config.patternType}
          onChange={(e) => handleChange('patternType', e.target.value)}
        >
          <option value="circles">Circles</option>
          <option value="petals">Petals</option>
          <option value="stars">Stars</option>
          <option value="diamonds">Diamonds</option>
          <option value="waves">Waves</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="layers">
          Number of Layers: {config.layers}
        </label>
        <input
          type="range"
          id="layers"
          min="1"
          max="20"
          value={config.layers}
          onChange={(e) => handleChange('layers', parseInt(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="repeatsPerLayer">
          Repeats Per Layer: {config.repeatsPerLayer}
        </label>
        <input
          type="range"
          id="repeatsPerLayer"
          min="3"
          max="24"
          value={config.repeatsPerLayer}
          onChange={(e) => handleChange('repeatsPerLayer', parseInt(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="size">
          Canvas Size: {config.size}px
        </label>
        <input
          type="range"
          id="size"
          min="300"
          max="800"
          step="50"
          value={config.size}
          onChange={(e) => handleChange('size', parseInt(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="colorScheme">Color Scheme</label>
        <select
          id="colorScheme"
          value={config.colorScheme}
          onChange={(e) => handleChange('colorScheme', e.target.value)}
        >
          <option value="rainbow">Rainbow</option>
          <option value="ocean">Ocean</option>
          <option value="fire">Fire</option>
          <option value="purple">Purple</option>
          <option value="monochrome">Monochrome</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="rotationSpeed">
          Rotation Speed: {config.rotationSpeed === 0 ? 'Static' : config.rotationSpeed}
        </label>
        <input
          type="range"
          id="rotationSpeed"
          min="0"
          max="5"
          step="0.1"
          value={config.rotationSpeed}
          onChange={(e) => handleChange('rotationSpeed', parseFloat(e.target.value))}
        />
      </div>

      <div className="control-group">
        <button 
          className="reset-button"
          onClick={() => setConfig({
            patternType: 'petals',
            layers: 8,
            repeatsPerLayer: 12,
            size: 600,
            colorScheme: 'rainbow',
            rotationSpeed: 1
          })}
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default Controls;
