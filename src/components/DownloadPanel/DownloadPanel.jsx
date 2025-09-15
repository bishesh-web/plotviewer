import React, { useState } from 'react';
import { DownloadService } from '../../services';
import './DownloadPanel.css';

const DownloadPanel = ({ config, plotData, selectedParameters, plotElementId }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCSV = async () => {
    if (plotData.filteredData.length === 0) {
      alert('No data available to download');
      return;
    }

    setIsDownloading(true);
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `thermal_data_${timestamp}.csv`;
      
      DownloadService.downloadFilteredCSV(plotData, selectedParameters, filename);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Error downloading CSV file');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPNG = () => {
    setIsDownloading(true);
    try {
      const plotElement = document.getElementById(plotElementId);
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `thermal_plot_${timestamp}.png`;
      
      DownloadService.downloadPlotPNG(plotElement, filename);
    } catch (error) {
      console.error('Error downloading PNG:', error);
      alert('Error downloading PNG file');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="download-panel">
      <h3>📅 Download</h3>
      
      <div className="download-section">
        <h4>Data Export</h4>
        <button 
          className="download-button csv"
          onClick={handleDownloadCSV}
          disabled={isDownloading || plotData.filteredData.length === 0}
        >
          <span className="button-icon">📈</span>
          Download CSV
        </button>
        <p className="download-description">
          Export filtered thermal data as CSV file
        </p>
      </div>

      <div className="download-section">
        <h4>Plot Export</h4>
        <button 
          className="download-button png"
          onClick={handleDownloadPNG}
          disabled={isDownloading}
        >
          <span className="button-icon">🖼️</span>
          Download PNG
        </button>
        <p className="download-description">
          Export current plot as high-resolution PNG
        </p>
      </div>

      {isDownloading && (
        <div className="download-progress">
          <div className="progress-spinner"></div>
          <span>Preparing download...</span>
        </div>
      )}
      
      <div className="download-info">
        <h4>📋 Current Selection</h4>
        <div className="selection-summary">
          <p><strong>Data Points:</strong> {plotData.dataPoints}</p>
          <p><strong>Parameters:</strong></p>
          <ul>
            {Object.entries(selectedParameters).map(([param, value]) => (
              <li key={param}>
                {config.data.parameters[param]?.label}: {value?.toFixed(3)}
                {config.data.parameters[param]?.unit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadPanel;