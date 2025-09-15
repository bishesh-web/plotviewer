class PlotService {
  constructor(config) {
    this.config = config;
  }

  createPlotConfig(plotData, parameterSelection, plotKey = null) {
    // Use specified plot or fallback to default
    const defaultPlot = this.config.ui?.components?.plots?.default_plot || 'temperature_plot';
    const selectedPlotKey = plotKey || defaultPlot;
    const plotConfig = this.config.plots[selectedPlotKey] || this.config.plots.main_plot;

    // Create parameter info for title
    const paramString = Object.entries(parameterSelection)
      .map(([param, value]) => {
        const config = this.config.data.parameters[param];
        const unit = config?.unit || '';
        const precision = config?.precision || 2;
        return `${param}: ${value?.toFixed(3)}${unit}`;
      })
      .join(', ');

    return {
      data: [{
        x: plotData.x,
        y: plotData.y,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Thermal Response',
        line: {
          color: plotConfig.style?.line_color || '#2E86AB',
          width: plotConfig.style?.line_width || 3,
          shape: 'linear'
        },
        marker: {
          color: plotConfig.style?.marker_color || '#A23B72',
          size: plotConfig.style?.marker_size || 6,
          opacity: 0.8
        },
        hovertemplate:
          '<b>Thermal Data Point</b><br>' +
          '%{xaxis.title.text}: %{x}<br>' +
          '%{yaxis.title.text}: %{y:.3f}<br>' +
          '<extra></extra>'
      }],
      layout: {
        title: {
          text: `${plotConfig.title}<br><sub style="font-size:12px;color:#666;">${paramString}</sub>`,
          font: {
            size: 18,
            color: '#343a40',
            family: 'Arial, sans-serif'
          },
          x: 0.5,
          xanchor: 'center'
        },
        xaxis: {
          title: {
            text: plotConfig.x_label,
            font: {
              size: 14,
              color: '#495057',
              family: 'Arial, sans-serif'
            }
          },
          showgrid: true,
          gridcolor: 'rgba(128, 128, 128, 0.2)',
          gridwidth: 1,
          zeroline: false,
          showline: true,
          linecolor: '#dee2e6',
          linewidth: 1,
          tickfont: {
            size: 12,
            color: '#6c757d'
          }
        },
        yaxis: {
          title: {
            text: plotConfig.y_label,
            font: {
              size: 14,
              color: '#495057',
              family: 'Arial, sans-serif'
            }
          },
          showgrid: true,
          gridcolor: 'rgba(128, 128, 128, 0.2)',
          gridwidth: 1,
          zeroline: false,
          showline: true,
          linecolor: '#dee2e6',
          linewidth: 1,
          tickfont: {
            size: 12,
            color: '#6c757d'
          }
        },
        hovermode: 'closest',
        showlegend: false,
        plot_bgcolor: 'white',
        paper_bgcolor: 'white',
        margin: {
          l: 70,   // Left margin for y-axis label
          r: 30,   // Right margin
          t: 80,   // Top margin for title
          b: 60    // Bottom margin for x-axis label
        },
        font: {
          family: 'Arial, sans-serif',
          size: 12,
          color: '#495057'
        }
      },
      config: {
        displayModeBar: true,
        displaylogo: false,
        responsive: true,
        modeBarButtonsToRemove: [
          'autoScale2d',
          'lasso2d',
          'select2d',
          'toggleSpikelines'
        ],
        modeBarButtonsToAdd: ['pan2d'],
        toImageButtonOptions: {
          format: 'png',
          filename: 'thermal_plot',
          height: 600,
          width: 800,
          scale: 2
        }
      }
    };
  }
}

export { PlotService };