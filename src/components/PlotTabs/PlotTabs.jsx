import React from 'react';
import './PlotTabs.css';

const PlotTabs = ({ plots, activeTab, onTabChange }) => {
  const enabledPlots = Object.entries(plots).filter(([_, plotConfig]) => 
    plotConfig.enabled !== false
  );

  if (enabledPlots.length <= 1) {
    return null;
  }

  return (
    <div className="plot-tabs">
      <div className="tabs-container">
        {enabledPlots.map(([plotKey, plotConfig]) => (
          <button
            key={plotKey}
            className={`tab-button ${activeTab === plotKey ? 'active' : ''}`}
            onClick={() => onTabChange(plotKey)}
            title={plotConfig.description}
          >
            {plotConfig.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlotTabs;