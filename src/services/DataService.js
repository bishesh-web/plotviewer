import Papa from 'papaparse';
import _ from 'lodash';

class DataService {
  constructor(config) {
    this.config = config;
    this.rawData = [];
    this.parameterValues = {};
  }

  async loadData() {
    try {
      // Handle both string and object source configurations
      const sourcePath = typeof this.config.data.source === 'string'
        ? `/data/${this.config.data.source}`
        : this.config.data.source.file_path;

      console.log('🔄 Loading data from:', sourcePath);
      const response = await fetch(sourcePath);

      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
      }

      const csvText = await response.text();
      console.log('✅ Data loaded, CSV length:', csvText.length);

      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            this.rawData = results.data;
            console.log('📊 Parsed CSV data:', this.rawData.length, 'rows');
            console.log('📊 First row:', this.rawData[0]);
            this.extractUniqueParameterValues();
            console.log('📊 Parameter values extracted:', Object.keys(this.parameterValues));
            resolve(this.rawData);
          },
          error: reject
        });
      });
    } catch (error) {
      console.error('Error loading data:', error);
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

  filterDataByExactValues(parameterSelection) {
    return this.rawData.filter(row => {
      return Object.entries(parameterSelection).every(([param, selectedValue]) => {
        return row[param] === selectedValue;
      });
    });
  }

  getPlotData(parameterSelection, plotKey = null) {
    // Determine x and y columns based on plot configuration
    let xColumn, yColumn;

    if (plotKey && this.config.plots[plotKey]) {
      // Use specific plot configuration
      xColumn = this.config.plots[plotKey].x_column;
      yColumn = this.config.plots[plotKey].y_column;
    } else {
      // Fallback to legacy configuration or default
      xColumn = this.config.data.columns?.x_axis || 'q_W';
      yColumn = this.config.data.columns?.y_axis || 'Ts_C';
    }

    // Filter data: keep non-x-axis parameters constant, allow x-axis to vary
    const filteredData = this.rawData.filter(row => {
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

  getParameterValues() {
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