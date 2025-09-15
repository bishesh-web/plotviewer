import yaml from 'js-yaml';

class ConfigService {
  constructor() {
    this.config = null;
  }

  async loadConfig() {
    try {
      // Try to load YAML configuration first
      const response = await fetch('/config/app_config.yaml');
      if (response.ok) {
        const yamlText = await response.text();
        this.config = yaml.load(yamlText);
        console.log('✅ Configuration loaded from YAML file');
        console.log('YAML config plots:', this.config.plots);
        return this.config;
      } else {
        console.warn('YAML config file not found, using default configuration');
        this.config = this.getDefaultConfig();
        return this.config;
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
      console.log('Falling back to default configuration');
      this.config = this.getDefaultConfig();
      return this.config;
    }
  }

  getDefaultConfig() {
    // Fallback configuration if YAML file cannot be loaded
    return {
      app: {
        name: "Thermal Analysis Dashboard",
        version: "1.0.0",
        description: "Interactive thermal analysis visualization tool"
      },
      data: {
        source: "precomputed_Ts_grid.csv",
        parameters: {
          h_Wm2K: {
            label: "Heat Transfer Coefficient",
            unit: "W/m²K",
            precision: 3,
            description: "Convective heat transfer coefficient"
          },
          k_WmK: {
            label: "Thermal Conductivity",
            unit: "W/mK",
            precision: 3,
            description: "Material thermal conductivity"
          },
          Area_m2: {
            label: "Surface Area",
            unit: "m²",
            precision: 3,
            description: "Heat transfer surface area"
          },
          L_m: {
            label: "Thickness",
            unit: "m",
            precision: 3,
            description: "Material thickness"
          },
          q_W: {
            label: "Heat Input",
            unit: "W",
            precision: 3,
            description: "Heat input power"
          },
          Tinf_C: {
            label: "Ambient Temperature",
            unit: "°C",
            precision: 3,
            description: "Surrounding fluid temperature"
          }
        }
      },
      plots: {
        temperature_plot: {
          title: "Surface Temperature vs Heat Input",
          x_column: "q_W",
          y_column: "Ts_C",
          x_label: "Heat Input (W)",
          y_label: "Surface Temperature (°C)",
          style: {
            line_color: "#2E86AB",
            line_width: 3,
            marker_color: "#A23B72",
            marker_size: 6
          }
        },
        resistance_plot: {
          title: "Convective vs Total Thermal Resistance",
          x_column: "Rconv_KW",
          y_column: "Rtotal_KW",
          x_label: "Convective Thermal Resistance (K/W)",
          y_label: "Total Thermal Resistance (K/W)",
          style: {
            line_color: "#F18F01",
            line_width: 3,
            marker_color: "#C73E1D",
            marker_size: 6
          }
        }
      },
      ui: {
        components: {
          plots: {
            default_plot: "temperature_plot",
            available_plots: ["temperature_plot", "resistance_plot"]
          },
          parameters: {
            default_selection: {
              h_Wm2K: 30.0,
              k_WmK: 5.0,
              Area_m2: 0.1,
              L_m: 0.001,
              Tinf_C: 50.0
            }
          }
        },
        styling: {
          theme: "modern",
          primary_color: "#2E86AB",
          secondary_color: "#A23B72",
          accent_color: "#F18F01"
        }
      }
    };
  }

  getConfig() {
    return this.config;
  }
}

export { ConfigService };