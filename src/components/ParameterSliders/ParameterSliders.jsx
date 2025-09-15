import React from 'react';
import './ParameterSliders.css';

const ParameterSliders = ({ config, parameterValues, selectedParameters, onParameterChange, dataPointsCount }) => {
  const handleParameterChange = (param, value) => {
    onParameterChange(param, parseFloat(value));
  };

  return (
    <div className="parameter-sliders">
      <h3>🎛️ Parameters</h3>
      
      {Object.entries(config.data.parameters).map(([param, paramConfig]) => {
        const values = parameterValues[param]?.values || [];
        const selectedValue = selectedParameters[param];
        
        return (
          <div key={param} className="slider-container">
            <label className="slider-label">
              {paramConfig.label}
              {paramConfig.unit && ` (${paramConfig.unit})`}
            </label>
            
            <input
              type="range"
              className="parameter-slider"
              min={0}
              max={values.length - 1}
              step={1}
              value={values.indexOf(selectedValue)}
              onChange={(e) => handleParameterChange(param, values[parseInt(e.target.value)])}
            />
            <div className="slider-ticks">
              <span className="tick" style={{left: '0%'}}>
                {values[0]?.toFixed(3)}
              </span>
              <span className="tick" style={{left: '100%'}}>
                {values[values.length - 1]?.toFixed(3)}
              </span>
            </div>
            
            <div className="slider-info">
              <span className="current-value">
                Current: {selectedValue?.toFixed(3)}{paramConfig.unit}
              </span>
              <span className="value-count">
                {values.length} values available
              </span>
            </div>
            
            {paramConfig.description && (
              <p className="parameter-description">{paramConfig.description}</p>
            )}
          </div>
        );
      })}
      
      <div className="data-summary">
        <h4>📈 Current Selection</h4>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Data Points:</span>
            <span className="stat-value">{dataPointsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterSliders;