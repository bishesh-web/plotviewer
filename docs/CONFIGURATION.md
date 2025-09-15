# ⚙️ Configuration Guide

This document explains how to configure the Thermal Analysis App for your specific data and requirements.

## 📁 Configuration File Location

The main configuration file is located at:
```
public/config/app_config.yaml
```

**Why YAML?** We use YAML instead of JSON because it:
- **Supports comments** for better documentation
- **More readable** with cleaner syntax
- **Less error-prone** with better structure validation
- **Easier to maintain** for complex configurations

## 🔧 Configuration Structure

The configuration file consists of four main sections:

1. **Data Configuration** - Defines data sources and parameters
2. **Plot Configuration** - Configures available plots and styling
3. **UI Configuration** - Controls user interface behavior
4. **Styling Configuration** - Manages visual appearance

## 📊 Data Configuration

### Data Source

```yaml
# Data source configuration
data:
  # CSV file in public/data/ directory
  source: "precomputed_Ts_grid.csv"
```

- `source`: Filename of the CSV file in the `public/data/` directory

### Parameter Definitions

Parameters are divided into input parameters and output parameters:

#### Input Parameters
```yaml
data:
  # Parameters that users can control via sliders
  parameters:
    h_Wm2K:
      label: "Heat Transfer Coefficient"
      unit: "W/m²K"
      precision: 3  # Decimal places (now fixed at 3)
      description: "Convective heat transfer coefficient"
```

#### Output Parameters
```yaml
data:
  # Calculated results from thermal analysis
  output_parameters:
    Ts_C:
      label: "Surface Temperature"
      unit: "°C"
      precision: 3
      description: "Calculated surface temperature"
```

### Parameter Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | Display name for the parameter |
| `unit` | string | No | Unit of measurement (displayed after values) |
| `precision` | number | No | Number of decimal places (deprecated, now uses 3) |
| `description` | string | No | Tooltip description for the parameter |

## 📈 Plot Configuration

### Basic Plot Setup

```yaml
plots:
  # Primary temperature analysis plot
  temperature_plot:
    title: "Surface Temperature vs Heat Input"
    x_column: "q_W"      # CSV column for X-axis
    y_column: "Ts_C"     # CSV column for Y-axis
    x_label: "Heat Input (W)"
    y_label: "Surface Temperature (°C)"
```

### Plot Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | Yes | Plot title displayed above the chart |
| `x_column` | string | Yes | CSV column name for X-axis data |
| `y_column` | string | Yes | CSV column name for Y-axis data |
| `x_label` | string | Yes | X-axis label |
| `y_label` | string | Yes | Y-axis label |
| `style` | object | No | Styling options for the plot |

### Plot Styling

```yaml
plots:
  temperature_plot:
    # ... other plot properties ...

    # Visual styling options
    style:
      line_color: "#2E86AB"    # Blue line (hex color)
      line_width: 3            # Line thickness
      marker_color: "#A23B72"  # Purple markers
      marker_size: 6           # Marker size
```

#### Style Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `line_color` | string | "#2E86AB" | Color of the plot line (hex code) |
| `line_width` | number | 3 | Width of the plot line in pixels |
| `marker_color` | string | "#A23B72" | Color of data point markers |
| `marker_size` | number | 6 | Size of data point markers |

## 🎛️ UI Configuration

### Plot Settings

```yaml
ui:
  components:
    plots:
      # Which plot to show when app loads
      default_plot: "temperature_plot"

      # Available plots for user selection
      available_plots:
        - "temperature_plot"
        - "resistance_plot"
```

- `default_plot`: Plot to display when the app loads
- `available_plots`: Array of plot keys that users can select

### Default Parameter Selection

```yaml
ui:
  components:
    parameters:
      # Initial parameter values when app loads
      # These values must exist in your CSV data
      default_selection:
        h_Wm2K: 30.0
        k_WmK: 5.0
        Area_m2: 0.1
        L_m: 0.001
        Tinf_C: 50.0
```

Sets the initial parameter values when the app loads.

## 🎨 Styling Configuration

### Theme Settings

```yaml
ui:
  styling:
    theme: "modern"              # Theme name
    primary_color: "#2E86AB"     # Main app color (blue)
    secondary_color: "#A23B72"   # Accent color (purple)
    accent_color: "#F18F01"      # Highlight color (orange)
```

| Property | Description | Usage |
|----------|-------------|-------|
| `theme` | Overall theme name | Currently supports "modern" |
| `primary_color` | Main application color | Used for headers, buttons |
| `secondary_color` | Secondary accent color | Used for highlights, markers |
| `accent_color` | Accent color | Used for warnings, special elements |

## 📋 Example Configurations

### Simple Temperature Analysis

```yaml
# Simple configuration example
data:
  source: "simple_temp_data.csv"

  # Single input parameter
  parameters:
    power:
      label: "Power Input"
      unit: "W"
      description: "Input power to the system"

  # Single output parameter
  output_parameters:
    temperature:
      label: "Temperature"
      unit: "°C"
      description: "Output temperature"

# Single plot configuration
plots:
  main_plot:
    title: "Temperature vs Power"
    x_column: "power"
    y_column: "temperature"
    x_label: "Power (W)"
    y_label: "Temperature (°C)"

# UI configuration
ui:
  components:
    plots:
      default_plot: "main_plot"
      available_plots:
        - "main_plot"
```

### Multi-Plot Configuration

```yaml
# Multiple plots with different styling
plots:
  temperature_plot:
    title: "Temperature Analysis"
    x_column: "time"
    y_column: "temperature"
    x_label: "Time (s)"
    y_label: "Temperature (°C)"
    # Orange theme for temperature
    style:
      line_color: "#FF6B35"
      marker_color: "#F7931E"

  pressure_plot:
    title: "Pressure Analysis"
    x_column: "time"
    y_column: "pressure"
    x_label: "Time (s)"
    y_label: "Pressure (Pa)"
    # Teal theme for pressure
    style:
      line_color: "#4ECDC4"
      marker_color: "#45B7AA"

# UI allows switching between plots
ui:
  components:
    plots:
      default_plot: "temperature_plot"
      available_plots:
        - "temperature_plot"
        - "pressure_plot"
```

## 🔄 CSV Data Requirements

### File Format

Your CSV file must:
1. **Have a header row** with column names
2. **Match parameter names** defined in the configuration
3. **Contain numeric data** for all parameter columns
4. **Be placed** in the `public/data/` directory

### Example CSV Structure

```csv
h_Wm2K,k_WmK,Area_m2,L_m,q_W,Tinf_C,Ts_C,Rcond_KW,Rconv_KW,Rtotal_KW
30.0,5.0,0.1,0.001,10.0,50.0,79.821,0.002,0.333,0.335
30.0,5.0,0.1,0.001,20.0,50.0,109.642,0.002,0.333,0.335
...
```

### Data Validation

The app automatically validates:
- **Column existence**: All referenced columns must exist
- **Data types**: Numeric columns are converted from strings
- **Unique values**: Parameter sliders show unique values only

## 🛠️ Customization Examples

### Adding a New Parameter

1. **Add to CSV**: Include the new column in your data file
2. **Update configuration**:
   ```yaml
   data:
     parameters:
       new_param:
         label: "New Parameter"
         unit: "units"
         description: "Description of the new parameter"
   ```

### Creating a Custom Plot

1. **Define the plot**:
   ```yaml
   plots:
     custom_plot:
       title: "Custom Analysis"
       x_column: "input_param"
       y_column: "output_param"
       x_label: "Input (units)"
       y_label: "Output (units)"
       style:
         line_color: "#custom_color"
   ```

2. **Add to available plots**:
   ```yaml
   ui:
     components:
       plots:
         available_plots:
           - "existing_plot"
           - "custom_plot"  # Add your new plot here
   ```

## ⚠️ Common Issues and Solutions

### Configuration Not Loading
- **Check file location**: Must be in `public/config/app_config.yaml`
- **Validate YAML**: Use a YAML validator to check syntax
- **Check browser console**: Look for error messages
- **YAML syntax**: Ensure proper indentation (spaces, not tabs)

### Parameters Not Showing
- **Verify CSV columns**: Parameter names must match CSV headers exactly
- **Check data types**: Ensure parameter columns contain numeric data
- **Case sensitivity**: Parameter names are case-sensitive

### Plots Not Displaying
- **Verify column references**: `x_column` and `y_column` must exist in CSV
- **Check data availability**: Ensure filtered data has matching rows
- **Validate plot configuration**: All required properties must be present

## 🔍 Testing Your Configuration

### Validation Checklist

- [ ] YAML syntax is valid (proper indentation, no tabs)
- [ ] All parameter names match CSV columns exactly
- [ ] Plot column references exist in data
- [ ] Default parameter values exist in dataset
- [ ] Required properties are present
- [ ] File paths are correct
- [ ] Comments don't interfere with data structure

### Testing Process

1. **Start the development server**: `npm start`
2. **Check browser console**: Look for configuration errors
3. **Test parameter sliders**: Verify all parameters load correctly
4. **Test plot switching**: Ensure all configured plots work
5. **Verify data filtering**: Check that parameter changes update plots

## 📚 Advanced Configuration

### Environment-Specific Configs

For different environments, you can create multiple configuration files:
- `app_config.json` - Production configuration
- `app_config.dev.json` - Development configuration
- `app_config.test.json` - Testing configuration

### Dynamic Configuration Loading

The ConfigService can be extended to load different configurations based on environment variables or URL parameters.

### Configuration Validation

Consider implementing schema validation for your YAML configuration files to catch errors early:

```javascript
// Example YAML configuration validation
import yaml from 'js-yaml';

const validateConfig = (yamlContent) => {
  try {
    const config = yaml.load(yamlContent);

    // Validate required sections
    if (!config.data || !config.plots || !config.ui) {
      throw new Error('Missing required configuration sections');
    }

    // Validate data source
    if (!config.data.source) {
      throw new Error('Data source is required');
    }

    return config;
  } catch (error) {
    console.error('Configuration validation failed:', error);
    throw error;
  }
};
```

### YAML Best Practices

1. **Use spaces for indentation** (not tabs)
2. **Be consistent with indentation** (2 or 4 spaces)
3. **Use comments liberally** to document complex sections
4. **Quote strings** that contain special characters
5. **Use multi-line strings** for long descriptions:

```yaml
description: |
  This is a long description that spans
  multiple lines and maintains formatting
  with proper line breaks.
```

This ensures your YAML configuration is readable, maintainable, and error-free.