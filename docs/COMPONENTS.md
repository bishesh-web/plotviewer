# 🧩 Component Documentation

This document provides detailed information about the React components used in the Thermal Analysis App.

## 📋 Component Overview

The application follows a modular component architecture with clear separation of concerns:

```
src/components/
├── Dashboard/           # Main application container
├── ParameterSliders/    # Interactive parameter controls
├── PlotArea/           # Plot rendering and management
├── PlotTabs/           # Plot navigation tabs
├── DownloadPanel/      # Data export functionality
└── LoadingSpinner/     # Loading state indicator
```

## 🏠 Dashboard Component

### Purpose
Main container component that orchestrates the entire application state and data flow.

### Location
`src/components/Dashboard/Dashboard.jsx`

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | Object | Yes | Application configuration from ConfigService |
| `dataService` | DataService | Yes | Initialized data service instance |

### State Management
```javascript
const [selectedParameters, setSelectedParameters] = useState({});
const [parameterValues, setParameterValues] = useState({});
const [plotData, setPlotData] = useState({ x: [], y: [] });
const [activeTab, setActiveTab] = useState('temperature_plot');
```

### Key Features
- **Parameter Management**: Handles parameter selection and updates
- **Plot Data Generation**: Generates plot data based on parameter selection
- **Tab Management**: Manages active plot tab selection
- **Real-time Updates**: Updates plots when parameters change

### Usage Example
```jsx
<Dashboard
  config={loadedConfig}
  dataService={dataServiceInstance}
/>
```

## 🎛️ ParameterSliders Component

### Purpose
Renders interactive sliders for parameter selection with discrete value snapping.

### Location
`src/components/ParameterSliders/ParameterSliders.jsx`

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | Object | Yes | Configuration object with parameter definitions |
| `parameterValues` | Object | Yes | Available values for each parameter |
| `selectedParameters` | Object | Yes | Currently selected parameter values |
| `onParameterChange` | Function | Yes | Callback when parameter value changes |
| `dataPointsCount` | Number | Yes | Number of data points for current selection |

### Features
- **Discrete Value Sliders**: Snap to exact CSV data values
- **Visual Feedback**: Show first/last values as tick marks
- **Real-time Updates**: Display current values with 3 decimal precision
- **Parameter Info**: Show units and descriptions

### Callback Signature
```javascript
onParameterChange(parameterName, newValue)
```

### CSS Classes
- `.parameter-sliders` - Main container
- `.slider-container` - Individual parameter container
- `.parameter-slider` - Range input element
- `.slider-ticks` - Tick mark container
- `.tick` - Individual tick mark
- `.current-value` - Current value display

### Usage Example
```jsx
<ParameterSliders
  config={config}
  parameterValues={parameterValues}
  selectedParameters={selectedParameters}
  onParameterChange={handleParameterChange}
  dataPointsCount={filteredData.length}
/>
```

## 📊 PlotArea Component

### Purpose
Container for plot rendering and management.

### Location
`src/components/PlotArea/PlotArea.jsx`

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `plotData` | Object | Yes | Plot data with x, y arrays |
| `config` | Object | Yes | Configuration object |
| `selectedParameters` | Object | Yes | Current parameter selection |
| `activeTab` | String | Yes | Currently active plot tab |

### Features
- **Responsive Plotting**: Adapts to container size
- **Interactive Controls**: Zoom, pan, and hover functionality
- **Export Capabilities**: Download plots as images
- **Error Handling**: Graceful handling of missing or invalid data

### Plot Data Structure
```javascript
{
  x: [10, 20, 30, 40, 50],
  y: [79.821, 109.642, 139.463, 169.284, 199.105],
  xColumn: 'q_W',
  yColumn: 'Ts_C'
}
```

## 📈 ThermalPlot Component

### Purpose
Renders individual Plotly.js plots with thermal-specific styling.

### Location
`src/components/PlotArea/ThermalPlot.jsx`

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | Array | Yes | Plotly data array |
| `layout` | Object | Yes | Plotly layout configuration |
| `config` | Object | Yes | Plotly config options |

### Features
- **Plotly Integration**: Full Plotly.js functionality
- **Custom Styling**: Thermal analysis specific themes
- **Responsive Design**: Automatic resize handling
- **Performance Optimization**: Efficient re-rendering

### Plotly Configuration
```javascript
{
  displayModeBar: true,
  displaylogo: false,
  responsive: true,
  modeBarButtonsToRemove: [
    'autoScale2d', 'lasso2d', 'select2d', 'toggleSpikelines'
  ],
  toImageButtonOptions: {
    format: 'png',
    filename: 'thermal_plot',
    height: 600,
    width: 800,
    scale: 2
  }
}
```

## 🗂️ PlotTabs Component

### Purpose
Navigation tabs for switching between different plot views.

### Location
`src/components/PlotTabs/PlotTabs.jsx`

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | Object | Yes | Configuration with available plots |
| `activeTab` | String | Yes | Currently active tab |
| `onTabChange` | Function | Yes | Callback when tab is changed |

### Features
- **Dynamic Tab Generation**: Creates tabs based on configuration
- **Active State Management**: Highlights current tab
- **Responsive Design**: Adapts to different screen sizes

### Callback Signature
```javascript
onTabChange(newTabKey)
```

## 📥 DownloadPanel Component

### Purpose
Provides data export functionality for plots and datasets.

### Location
`src/components/DownloadPanel/DownloadPanel.jsx`

### Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `plotData` | Object | Yes | Current plot data |
| `selectedParameters` | Object | Yes | Current parameter selection |
| `config` | Object | Yes | Configuration object |

### Features
- **CSV Export**: Download filtered data as CSV
- **Plot Export**: Save plots as PNG images
- **Parameter Summary**: Include parameter info in exports
- **Filename Generation**: Automatic filename with timestamp

### Export Formats
- **CSV**: Comma-separated values with headers
- **PNG**: High-resolution plot images
- **JSON**: Raw data in JSON format (optional)

## 🔄 LoadingSpinner Component

### Purpose
Displays loading state with customizable messages.

### Location
`src/components/LoadingSpinner/LoadingSpinner.jsx`

### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `message` | String | No | "Loading..." | Loading message to display |

### Features
- **Customizable Message**: Show specific loading context
- **CSS Animation**: Smooth spinning animation
- **Centered Layout**: Automatically centers in container

### Usage Example
```jsx
<LoadingSpinner message="Loading thermal analysis data..." />
```

## 🎨 Styling Architecture

### CSS Organization
Each component has its own CSS file for styling isolation:
- `ComponentName.jsx` - React component
- `ComponentName.css` - Component-specific styles

### CSS Classes Convention
- **Component Container**: `.component-name`
- **Sub-elements**: `.component-name__element`
- **State Modifiers**: `.component-name--state`
- **Utility Classes**: `.u-utility-name`

### Color Scheme
```css
:root {
  --primary-color: #2E86AB;
  --secondary-color: #A23B72;
  --accent-color: #F18F01;
  --background-color: #F8F9FA;
  --text-color: #495057;
  --border-color: #DEE2E6;
}
```

## 🔄 Data Flow

### Typical Data Flow
1. **Dashboard** receives config and dataService props
2. **Dashboard** initializes parameter values from dataService
3. **ParameterSliders** displays available parameter values
4. User selects parameters → **onParameterChange** callback
5. **Dashboard** updates selectedParameters state
6. **Dashboard** generates new plotData from dataService
7. **PlotArea** receives updated plotData and re-renders
8. **DownloadPanel** uses current data for export functionality

### State Management Pattern
```javascript
// Parent component (Dashboard)
const [selectedParameters, setSelectedParameters] = useState({});

// Child component callback
const handleParameterChange = (param, value) => {
  setSelectedParameters(prev => ({
    ...prev,
    [param]: value
  }));
};

// Pass to child
<ParameterSliders onParameterChange={handleParameterChange} />
```

## 🧪 Component Testing

### Testing Strategies
1. **Unit Tests**: Test individual component functionality
2. **Integration Tests**: Test component interactions
3. **Snapshot Tests**: Ensure UI consistency
4. **User Interaction Tests**: Test user workflows

### Example Test Structure
```javascript
// ParameterSliders.test.jsx
import { render, fireEvent, screen } from '@testing-library/react';
import ParameterSliders from './ParameterSliders';

describe('ParameterSliders', () => {
  test('renders parameter sliders correctly', () => {
    const mockProps = {
      config: mockConfig,
      parameterValues: mockValues,
      selectedParameters: mockSelection,
      onParameterChange: jest.fn(),
      dataPointsCount: 100
    };

    render(<ParameterSliders {...mockProps} />);
    expect(screen.getByText('Parameters')).toBeInTheDocument();
  });

  test('calls onParameterChange when slider moves', () => {
    const mockOnChange = jest.fn();
    // ... test implementation
  });
});
```

## 🔧 Customization Guide

### Adding New Components

1. **Create component directory**:
   ```
   src/components/NewComponent/
   ├── NewComponent.jsx
   ├── NewComponent.css
   └── index.js
   ```

2. **Component template**:
   ```jsx
   import React from 'react';
   import './NewComponent.css';

   const NewComponent = ({ prop1, prop2, onEvent }) => {
     return (
       <div className="new-component">
         {/* Component content */}
       </div>
     );
   };

   export default NewComponent;
   ```

3. **Export from index.js**:
   ```javascript
   export { default } from './NewComponent';
   ```

### Extending Existing Components

1. **Add new props** to component interface
2. **Update prop validation** (if using PropTypes)
3. **Implement new functionality** while maintaining backward compatibility
4. **Update documentation** and examples

### Performance Optimization

1. **React.memo**: Wrap components that receive stable props
2. **useCallback**: Memoize callback functions
3. **useMemo**: Memoize expensive calculations
4. **Code Splitting**: Lazy load heavy components

```jsx
import React, { memo, useCallback, useMemo } from 'react';

const OptimizedComponent = memo(({ data, onUpdate }) => {
  const expensiveValue = useMemo(() => {
    return heavyCalculation(data);
  }, [data]);

  const handleUpdate = useCallback((value) => {
    onUpdate(value);
  }, [onUpdate]);

  return (
    <div>
      {/* Component content */}
    </div>
  );
});
```

## 📚 Dependencies

### Component Dependencies
- **React**: Core library (v19+)
- **Plotly.js**: Plotting functionality
- **React-Plotly.js**: React wrapper for Plotly

### Styling Dependencies
- **CSS3**: Modern CSS features
- **Flexbox**: Layout system
- **CSS Grid**: Advanced layouts (where needed)

### Optional Enhancements
- **React Router**: For multi-page navigation
- **Redux**: For complex state management
- **Styled Components**: For CSS-in-JS styling
- **React Testing Library**: For comprehensive testing