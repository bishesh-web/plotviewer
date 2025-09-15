import Papa from 'papaparse';
import _ from 'lodash';

class DataService {
  constructor(config) {
    this.config = config;
    this.rawData = [];
    this.parameterValues = {};
    // Cache for multiple datasets
    this.plotDatasets = {};
    this.plotParameterValues = {};
  }

  async loadData() {
    try {
      // Load data for all plots
      const plotKeys = Object.keys(this.config.plots);
      console.log('🔄 Loading data for plots:', plotKeys);

      for (const plotKey of plotKeys) {
        await this.loadPlotData(plotKey);
      }

      // For backward compatibility, set default data to first plot
      const firstPlotKey = plotKeys[0];
      if (firstPlotKey && this.plotDatasets[firstPlotKey]) {
        this.rawData = this.plotDatasets[firstPlotKey];
        this.parameterValues = this.plotParameterValues[firstPlotKey];
      }

      console.log('✅ All plot data loaded successfully');
      return this.rawData;
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  async loadPlotData(plotKey) {
    try {
      const plotConfig = this.config.plots[plotKey];
      if (!plotConfig) {
        throw new Error(`Plot configuration not found for: ${plotKey}`);
      }

      // Determine data source for this plot
      const sourcePath = plotConfig.data_source
        ? `/data/${plotConfig.data_source}`
        : (typeof this.config.data.source === 'string'
          ? `/data/${this.config.data.source}`
          : this.config.data.source.file_path);

      console.log(`🔄 Loading data for ${plotKey} from:`, sourcePath);
      const response = await fetch(sourcePath);

      if (!response.ok) {
        throw new Error(`Failed to load data for ${plotKey}: ${response.status} ${response.statusText}`);
      }

      const csvText = await response.text();
      console.log(`✅ Data loaded for ${plotKey}, CSV length:`, csvText.length);

      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            this.plotDatasets[plotKey] = results.data;
            console.log(`📊 Parsed CSV data for ${plotKey}:`, results.data.length, 'rows');
            console.log(`📊 First row for ${plotKey}:`, results.data[0]);

            this.extractPlotParameterValues(plotKey);
            console.log(`📊 Parameter values extracted for ${plotKey}:`, Object.keys(this.plotParameterValues[plotKey] || {}));
            resolve(results.data);
          },
          error: reject
        });
      });
    } catch (error) {
      console.error(`Error loading data for ${plotKey}:`, error);
      throw error;
    }
  }

  extractUniqueParameterValues() {
    const parameters = Object.keys(this.config.data.parameters);

    parameters.forEach(param => {
      const values = this.rawData
        .map(row => row[param])
        .filter(v => v != null && !isNaN(v));

      const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

      this.parameterValues[param] = {
        values: uniqueValues,
        min: uniqueValues[0],
        max: uniqueValues[uniqueValues.length - 1],
        count: uniqueValues.length
      };
    });
  }

  extractPlotParameterValues(plotKey) {
    const plotConfig = this.config.plots[plotKey];
    const plotData = this.plotDatasets[plotKey];

    if (!plotConfig || !plotData) {
      console.warn(`Cannot extract parameters for ${plotKey}: missing config or data`);
      return;
    }

    // Use plot-specific parameters if available, otherwise fall back to global parameters
    const parameters = plotConfig.parameters
      ? Object.keys(plotConfig.parameters)
      : Object.keys(this.config.data.parameters);

    const parameterValues = {};

    parameters.forEach(param => {
      const values = plotData
        .map(row => row[param])
        .filter(v => v != null && !isNaN(v));

      const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

      parameterValues[param] = {
        values: uniqueValues,
        min: uniqueValues[0],
        max: uniqueValues[uniqueValues.length - 1],
        count: uniqueValues.length
      };
    });

    this.plotParameterValues[plotKey] = parameterValues;
  }

  filterDataByExactValues(parameterSelection) {
    return this.rawData.filter(row => {
      return Object.entries(parameterSelection).every(([param, selectedValue]) => {
        return row[param] === selectedValue;
      });
    });
  }

  getPlotData(parameterSelection, plotKey = null) {
    // Determine which dataset to use
    const currentPlotKey = plotKey || Object.keys(this.config.plots)[0];
    const plotData = this.plotDatasets[currentPlotKey] || this.rawData;

    // Determine x and y columns based on plot configuration
    let xColumn, yColumn;

    if (currentPlotKey && this.config.plots[currentPlotKey]) {
      // Use specific plot configuration
      xColumn = this.config.plots[currentPlotKey].x_column;
      yColumn = this.config.plots[currentPlotKey].y_column;
    } else {
      // Fallback to legacy configuration or default
      xColumn = this.config.data.columns?.x_axis || 'q_W';
      yColumn = this.config.data.columns?.y_axis || 'Ts_C';
    }

    // Filter data: keep non-x-axis parameters constant, allow x-axis to vary
    const filteredData = plotData.filter(row => {
      return Object.entries(parameterSelection).every(([param, selectedValue]) => {
        // Allow x-axis parameter to vary (don't filter on it)
        if (param === xColumn) {
          return true;
        }
        // Keep other parameters constant
        return row[param] === selectedValue;
      });
    });

    const sortedData = _.sortBy(filteredData, xColumn);

    return {
      x: sortedData.map(row => row[xColumn]),
      y: sortedData.map(row => row[yColumn]),
      dataPoints: sortedData.length,
      filteredData: sortedData,
      xColumn,
      yColumn
    };
  }

  getParameterValues(plotKey = null) {
    // Return plot-specific parameter values if available
    if (plotKey && this.plotParameterValues[plotKey]) {
      return this.plotParameterValues[plotKey];
    }

    // Fallback to global parameter values
    return this.parameterValues;
  }

  getDataInfo() {
    return {
      totalRows: this.rawData.length,
      parameters: Object.keys(this.config.data.parameters),
      columns: Object.keys(this.rawData[0] || {})
    };
  }
}

export { DataService };