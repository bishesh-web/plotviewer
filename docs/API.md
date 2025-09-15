# 🔌 API Documentation

This document provides detailed information about the services and APIs used in the Thermal Analysis App.

## 📋 Overview

The application uses a service-oriented architecture with the following core services:
- **ConfigService**: Manages application configuration
- **DataService**: Handles data loading and processing
- **PlotService**: Generates plot configurations

## 🔧 ConfigService

### Purpose
Loads and manages application configuration from JSON files.

### Location
`src/services/ConfigService.js`

### Methods

#### `loadConfig()`
Loads the main application configuration from the server.

```javascript
const configService = new ConfigService();
const config = await configService.loadConfig();
```

**Returns**: `Promise<Object>` - The loaded configuration object

**Throws**: `Error` - If configuration cannot be loaded or parsed

**Example Response**:
```json
{
  "data": {
    "source": "precomputed_Ts_grid.csv",
    "parameters": {
      "h_Wm2K": {
        "label": "Heat Transfer Coefficient",
        "unit": "W/m²K",
        "precision": 3,
        "description": "Convective heat transfer coefficient"
      }
    }
  },
  "plots": {
    "temperature_plot": {
      "title": "Temperature Analysis",
      "x_label": "Position (m)",
      "y_label": "Temperature (°C)"
    }
  }
}
```

### Configuration Schema

#### Data Configuration
- `source`: CSV filename in `public/data/` directory
- `parameters`: Object defining parameter properties
  - `label`: Display name for the parameter
  - `unit`: Unit of measurement
  - `precision`: Number of decimal places (deprecated, now uses 3)
  - `description`: Optional parameter description

#### Plot Configuration
- `title`: Plot title
- `x_label`: X-axis label
- `y_label`: Y-axis label
- `style`: Optional styling properties

## 📊 DataService

### Purpose
Handles CSV data loading, parsing, and filtering operations.

### Location
`src/services/DataService.js`

### Constructor

```javascript
const dataService = new DataService(config);
```

**Parameters**:
- `config`: Configuration object from ConfigService

### Methods

#### `loadData()`
Loads and parses CSV data from the configured source.

```javascript
await dataService.loadData();
```

**Returns**: `Promise<void>`

**Side Effects**: Populates internal data structures with parsed CSV data

#### `getParameterValues(param)`
Gets all unique values for a specific parameter.

```javascript
const values = dataService.getParameterValues('h_Wm2K');
```

**Parameters**:
- `param`: Parameter name (string)

**Returns**: `Array<number>` - Sorted array of unique values

#### `getAllParameterValues()`
Gets unique values for all parameters.

```javascript
const allValues = dataService.getAllParameterValues();
```

**Returns**: `Object` - Object with parameter names as keys and value arrays as values

**Example**:
```javascript
{
  "h_Wm2K": [30.0, 40.0, 50.0],
  "k_WmK": [5.0, 10.0, 15.0],
  "q_W": [10.0, 20.0, 30.0]
}
```

#### `getFilteredData(parameterSelection)`
Filters data based on parameter selection.

```javascript
const filteredData = dataService.getFilteredData({
  h_Wm2K: 30.0,
  k_WmK: 5.0
});
```

**Parameters**:
- `parameterSelection`: Object with parameter names and selected values

**Returns**: `Array<Object>` - Array of data rows matching the selection

#### `getPlotData(parameterSelection, xColumn, yColumn)`
Gets plot-ready data for the specified parameters and columns.

```javascript
const plotData = dataService.getPlotData(
  { h_Wm2K: 30.0 },
  'q_W',
  'Ts_C'
);
```

**Parameters**:
- `parameterSelection`: Object with parameter names and selected values
- `xColumn`: Column name for X-axis data
- `yColumn`: Column name for Y-axis data

**Returns**: `Object` - Plot data object

**Example Response**:
```javascript
{
  x: [10, 20, 30, 40, 50],
  y: [79.821, 109.642, 139.463, 169.284, 199.105],
  xColumn: 'q_W',
  yColumn: 'Ts_C'
}
```

### Data Processing Pipeline

1. **Loading**: CSV file is fetched from `public/data/`
2. **Parsing**: Papa Parse converts CSV to JavaScript objects
3. **Type Conversion**: String values converted to numbers where appropriate
4. **Indexing**: Parameter values are indexed for quick lookup
5. **Filtering**: Data is filtered based on user selections

## 📈 PlotService

### Purpose
Generates Plotly.js configuration objects for data visualization.

### Location
`src/services/PlotService.js`

### Constructor

```javascript
const plotService = new PlotService(config);
```

**Parameters**:
- `config`: Configuration object from ConfigService

### Methods

#### `createPlotConfig(plotData, parameterSelection, plotKey)`
Creates a complete Plotly.js configuration object.

```javascript
const plotConfig = plotService.createPlotConfig(
  plotData,
  { h_Wm2K: 30.0, k_WmK: 5.0 },
  'temperature_plot'
);
```

**Parameters**:
- `plotData`: Data object from DataService.getPlotData()
- `parameterSelection`: Current parameter values
- `plotKey`: Optional plot configuration key (defaults to default_plot)

**Returns**: `Object` - Complete Plotly.js configuration

**Example Response**:
```javascript
{
  data: [{
    x: [10, 20, 30],
    y: [79.821, 109.642, 139.463],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Thermal Response',
    line: { color: '#2E86AB', width: 3 },
    marker: { color: '#A23B72', size: 6 },
    hovertemplate: '<b>Thermal Data Point</b><br>...'
  }],
  layout: {
    title: 'Temperature Analysis<br><sub>h_Wm2K: 30.000W/m²K, k_WmK: 5.000W/mK</sub>',
    xaxis: { title: 'Heat Input (W)' },
    yaxis: { title: 'Surface Temperature (°C)' }
  },
  config: {
    displayModeBar: true,
    responsive: true
  }
}
```

### Plot Configuration Features

- **Interactive tooltips** with 3 decimal precision
- **Responsive design** that adapts to container size
- **Custom styling** with configurable colors and sizes
- **Export capabilities** for PNG images
- **Zoom and pan controls**

## 🔄 Service Integration

### Typical Usage Flow

```javascript
// 1. Initialize services
const configService = new ConfigService();
const config = await configService.loadConfig();

const dataService = new DataService(config);
await dataService.loadData();

const plotService = new PlotService(config);

// 2. Get parameter values for UI
const parameterValues = dataService.getAllParameterValues();

// 3. Handle user parameter selection
const parameterSelection = { h_Wm2K: 30.0, k_WmK: 5.0 };

// 4. Get plot data
const plotData = dataService.getPlotData(
  parameterSelection,
  'q_W',
  'Ts_C'
);

// 5. Generate plot configuration
const plotConfig = plotService.createPlotConfig(
  plotData,
  parameterSelection
);

// 6. Render plot with Plotly
Plotly.newPlot('plot-container', plotConfig.data, plotConfig.layout, plotConfig.config);
```

## 🚨 Error Handling

### Common Error Types

#### Configuration Errors
```javascript
// Missing configuration file
Error: "Failed to load configuration: 404 Not Found"

// Invalid JSON
Error: "Failed to parse configuration: Unexpected token"
```

#### Data Loading Errors
```javascript
// Missing CSV file
Error: "Failed to load data file: public/data/missing.csv"

// Invalid CSV format
Error: "CSV parsing failed: Missing required columns"
```

#### Parameter Errors
```javascript
// Invalid parameter selection
Error: "Parameter 'invalid_param' not found in dataset"

// No data matches selection
Warning: "No data points match the current parameter selection"
```

### Error Recovery

The application implements graceful error handling:
- **Configuration errors**: Show error message with retry option
- **Data errors**: Display loading spinner with error details
- **Parameter errors**: Reset to default values
- **Plot errors**: Show empty plot with error message

## 🔧 Extending the Services

### Adding New Parameters

1. **Update CSV data** with new parameter column
2. **Modify configuration** to include parameter definition
3. **Services automatically adapt** to new parameters

### Custom Plot Types

1. **Extend PlotService** with new plot generation methods
2. **Update configuration** with new plot definitions
3. **Modify UI components** to handle new plot types

### Data Sources

1. **Implement new data loading methods** in DataService
2. **Update configuration schema** for new source types
3. **Maintain consistent data format** for compatibility

## 📚 Dependencies

### External Libraries
- **Papa Parse**: CSV parsing (`papaparse`)
- **Lodash**: Utility functions (`lodash`)
- **Plotly.js**: Plotting library (`plotly.js`)

### Internal Dependencies
- Services are **loosely coupled** and communicate through well-defined interfaces
- **Configuration-driven** behavior allows for easy customization
- **Promise-based** APIs for consistent async handling