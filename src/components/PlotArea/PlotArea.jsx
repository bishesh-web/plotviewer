import React from 'react';
import ThermalPlot from './ThermalPlot';
import './PlotArea.css';

const PlotArea = ({ plotConfig, isLoading, elementId }) => {
  return (
    <div className="plot-area">
      {isLoading && (
        <div className="plot-overlay">
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Updating plot...</span>
          </div>
        </div>
      )}
      
      <div className={`plot-container ${isLoading ? 'loading' : ''}`}>
        <ThermalPlot 
          plotConfig={plotConfig}
          elementId={elementId}
        />
      </div>
    </div>
  );
};

export default PlotArea;