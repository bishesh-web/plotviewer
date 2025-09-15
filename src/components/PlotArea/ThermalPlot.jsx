import React, { useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';

const ThermalPlot = ({ plotConfig, elementId }) => {
  const plotRef = useRef();

  useEffect(() => {
    // Store reference for download functionality
    if (plotRef.current && elementId) {
      const plotElement = plotRef.current.el;
      plotElement.id = elementId;
    }
  }, [elementId]);

  if (!plotConfig) {
    return (
      <div style={{ 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8f9fa',
        border: '2px dashed #dee2e6',
        borderRadius: '8px'
      }}>
        <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
          📊 Plot will appear here...
        </p>
      </div>
    );
  }

  return (
    <Plot
      ref={plotRef}
      data={plotConfig.data}
      layout={plotConfig.layout}
      config={plotConfig.config}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler={true}
    />
  );
};

export default ThermalPlot;