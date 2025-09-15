import React, { useState, useEffect } from 'react';
import ParameterSliders from '../ParameterSliders/ParameterSliders';
import PlotArea from '../PlotArea/PlotArea';
import DownloadPanel from '../DownloadPanel/DownloadPanel';
import PlotTabs from '../PlotTabs/PlotTabs';
import { PlotService } from '../../services';
import './Dashboard.css';

const Dashboard = ({ config, dataService }) => {
  const [parameterValues, setParameterValues] = useState({});
  const [selectedParameters, setSelectedParameters] = useState({});
  const [plotData, setPlotData] = useState({ x: [], y: [], dataPoints: 0, filteredData: [] });
  const [plotConfig, setPlotConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const plotService = new PlotService(config);

  useEffect(() => {
    if (dataService) {
      initializeApp();
    }
  }, [dataService]);

  const initializeApp = () => {
    console.log('🚀 Initializing Dashboard with config:', config);

    // First determine the active tab
    const defaultPlot = config.ui?.components?.plots?.default_plot || 'temperature_plot';
    const enabledPlots = Object.entries(config.plots).filter(([_, plotConfig]) =>
      plotConfig.enabled !== false
    );

    // Use default plot if it exists and is enabled, otherwise use first enabled plot
    const firstEnabledPlot = enabledPlots.length > 0 ? enabledPlots[0][0] : '';
    const activeTabKey = enabledPlots.find(([key]) => key === defaultPlot) ? defaultPlot : firstEnabledPlot;

    setActiveTab(activeTabKey);

    // Then initialize parameters and plot for the active tab
    const availableValues = dataService.getParameterValues(activeTabKey);
    console.log('📊 Available parameter values for', activeTabKey, ':', availableValues);
    setParameterValues(availableValues);

    // Set initial selection to first available value for each parameter
    const initialSelection = {};

    // Use plot-specific parameters if available, otherwise fall back to global parameters
    const plotConfig = config.plots[activeTabKey];
    const parametersToUse = plotConfig?.parameters ? Object.keys(plotConfig.parameters) : Object.keys(config.data.parameters);

    parametersToUse.forEach(param => {
      const values = availableValues[param]?.values || [];
      if (values.length > 0) {
        initialSelection[param] = values[0];
      }
    });

    console.log('🎯 Initial selection:', initialSelection);
    setSelectedParameters(initialSelection);
    updatePlot(initialSelection, activeTabKey);
  };

  const updatePlot = (selection, plotKey = null) => {
    setIsLoading(true);

    try {
      // Use current active tab if plotKey not specified
      const currentPlotKey = plotKey || activeTab;

      // Get filtered data for the specific plot
      const data = dataService.getPlotData(selection, currentPlotKey);
      console.log('📈 Plot data:', data);
      const plotConfigData = plotService.createPlotConfig(data, selection, currentPlotKey);
      console.log('🎨 Plot config created:', plotConfigData.data[0].x.length, 'data points');

      setPlotData(data);
      setPlotConfig(plotConfigData);
    } catch (error) {
      console.error('Error updating plot:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleParameterChange = (parameter, value) => {
    const newSelection = { ...selectedParameters, [parameter]: value };
    setSelectedParameters(newSelection);
    updatePlot(newSelection);
  };

  const handleTabChange = (tabKey) => {
    console.log('🔄 Switching to tab:', tabKey);
    setActiveTab(tabKey);

    // Load parameters for the new plot
    const newParameterValues = dataService.getParameterValues(tabKey);
    setParameterValues(newParameterValues);

    // Reset parameter selection to defaults for the new plot
    const plotConfig = config.plots[tabKey];
    const parametersToUse = plotConfig?.parameters ? Object.keys(plotConfig.parameters) : Object.keys(config.data.parameters);

    const newSelection = {};
    parametersToUse.forEach(param => {
      const values = newParameterValues[param]?.values || [];
      if (values.length > 0) {
        newSelection[param] = values[0];
      }
    });

    console.log('🎯 New selection for', tabKey, ':', newSelection);
    setSelectedParameters(newSelection);
    updatePlot(newSelection, tabKey);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>{config.app.name}</h1>
        <p>Pure Data Visualization - No Calculations</p>
      </header>

      <div className="dashboard-content">
        <aside className="sidebar">
          <ParameterSliders
            config={config}
            parameterValues={parameterValues}
            selectedParameters={selectedParameters}
            onParameterChange={handleParameterChange}
            dataPointsCount={plotData.dataPoints}
            activeTab={activeTab}
          />

          <DownloadPanel
            config={config}
            plotData={plotData}
            selectedParameters={selectedParameters}
            plotElementId="thermal-plot"
          />
        </aside>

        <main className="main-content">
          <PlotTabs
            plots={config.plots}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <PlotArea
            plotConfig={plotConfig}
            isLoading={isLoading}
            elementId="thermal-plot"
          />

          <div className="data-info">
            <div className="info-cards">
              <div className="info-card">
                <span className="card-number">{plotData.dataPoints}</span>
                <span className="card-label">Data Points</span>
              </div>
              <div className="info-card">
                <span className="card-number">{Object.keys(selectedParameters).length}</span>
                <span className="card-label">Parameters</span>
              </div>
              <div className="info-card">
                <span className="card-number">
                  {plotData.x.length > 0 ? `${Math.min(...plotData.x)}-${Math.max(...plotData.x)}` : 'N/A'}
                </span>
                <span className="card-label">{plotData.xColumn || 'X-axis'} Range</span>
              </div>
              <div className="info-card">
                <span className="card-number">
                  {plotData.y.length > 0 ? `${Math.min(...plotData.y).toFixed(3)}-${Math.max(...plotData.y).toFixed(3)}` : 'N/A'}
                </span>
                <span className="card-label">{plotData.yColumn || 'Y-axis'} Range</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;