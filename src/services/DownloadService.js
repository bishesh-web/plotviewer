class DownloadService {
  static downloadFilteredCSV(plotData, selectedParameters, filename = 'thermal_data.csv') {
    try {
      // Create CSV content
      const headers = Object.keys(plotData.filteredData[0] || {});
      const csvContent = [
        headers.join(','),
        ...plotData.filteredData.map(row =>
          headers.map(header => {
            const value = row[header];
            return typeof value === 'string' ? `"${value}"` : value;
          }).join(',')
        )
      ].join('\n');

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      throw error;
    }
  }

  static downloadPlotPNG(plotElement, filename = 'thermal_plot.png') {
    try {
      if (!plotElement) {
        throw new Error('Plot element not found');
      }

      // Use Plotly's built-in download functionality
      const plotDiv = plotElement.querySelector('.plotly-graph-div') || plotElement;

      if (window.Plotly && window.Plotly.downloadImage) {
        window.Plotly.downloadImage(plotDiv, {
          format: 'png',
          filename: filename.replace('.png', ''),
          height: 600,
          width: 800,
          scale: 2
        });
      } else {
        throw new Error('Plotly not available for image download');
      }
    } catch (error) {
      console.error('Error downloading PNG:', error);
      throw error;
    }
  }
}

export { DownloadService };