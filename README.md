# 🌡️ Thermal Analysis App

A modern React-based thermal analysis application for visualizing and analyzing thermal data with interactive parameter controls and real-time plotting capabilities.

## ✨ Features

- **Interactive Parameter Sliders**: Discrete value sliders that snap to exact CSV data points
- **Real-time Thermal Plots**: Dynamic plotting with Plotly.js integration
- **CSV Data Support**: Load and analyze thermal data from CSV files
- **Responsive Design**: Modern, mobile-friendly interface
- **Data Export**: Download plots and data in various formats
- **Configurable UI**: JSON-based configuration system

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd thermal-analysis-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open your browser:**
Navigate to `http://localhost:3000` to view the application.

## 📁 Project Structure

```
thermal-analysis-app/
├── public/
│   ├── data/                    # CSV data files
│   │   └── precomputed_Ts_grid.csv
│   └── config/                  # Configuration files
│       └── app_config.yaml
├── src/
│   ├── components/              # React components
│   │   ├── Dashboard/           # Main dashboard component
│   │   ├── ParameterSliders/    # Parameter control sliders
│   │   ├── PlotArea/           # Plotting components
│   │   ├── PlotTabs/           # Plot tab navigation
│   │   ├── DownloadPanel/      # Data export functionality
│   │   └── LoadingSpinner/     # Loading indicator
│   ├── services/               # Business logic services
│   │   ├── ConfigService.js    # Configuration management
│   │   ├── DataService.js      # Data processing
│   │   ├── PlotService.js      # Plot generation
│   │   └── index.js           # Service exports
│   ├── App.jsx                # Main application component
│   ├── App.css               # Global styles
│   └── index.js              # Application entry point
├── docs/                     # Documentation
├── README.md                # This file
└── package.json            # Dependencies and scripts
```

## 🎛️ Usage

### Loading Data

1. Place your CSV files in the `public/data/` directory
2. Update the configuration in `public/config/app_config.yaml`
3. The app will automatically load and process the data

### Parameter Controls

- Use the **discrete sliders** to select parameter values
- Sliders snap to exact values from your CSV data
- Current values are displayed with 3 decimal precision
- First and last values are shown as tick marks

### Plotting

- Interactive plots update in real-time as parameters change
- Hover over data points for detailed information
- Use plot controls for zooming and panning
- Download plots as PNG images

### Data Export

- Export current data selection as CSV
- Download plots in various image formats
- Parameter summary included in exports

## ⚙️ Configuration

The application uses a YAML configuration file located at `public/config/app_config.yaml`. YAML format allows for comments and better readability. See [Configuration Documentation](./docs/CONFIGURATION.md) for detailed setup instructions.

## 🔧 Development

### Available Scripts

- `npm start` - Start development server (opens http://localhost:3000)
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (irreversible)

### Key Technologies

- **React 19** - User interface framework
- **Plotly.js** - Interactive plotting library
- **Papa Parse** - CSV parsing
- **Lodash** - Utility functions

## 📊 Data Format

CSV files should follow this structure:

```csv
h_Wm2K,k_WmK,Area_m2,L_m,q_W,Rcond_KW,Rconv_KW,Rtotal_KW,Tinf_C,Ts_C
30.0,5.0,0.1,0.001,10.0,0.002,0.333,0.335,50.0,79.821
30.0,5.0,0.1,0.001,20.0,0.002,0.333,0.335,50.0,109.642
...
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

For support and questions:

1. Check the [documentation](./docs/)
2. Open an issue on GitHub
3. Review existing issues and discussions

## 🔄 Changelog

### v0.1.0 (Current)
- Initial release
- Basic thermal analysis functionality
- Parameter slider controls
- CSV data loading
- Interactive plotting
- Data export capabilities

---

**Built with ❤️ using React and modern web technologies**
