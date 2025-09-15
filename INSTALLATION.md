# 📦 Installation Guide

This guide provides detailed instructions for setting up the Thermal Analysis App on your local machine.

## 🔧 System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 16.0.0 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB for the application and dependencies
- **Browser**: Chrome 80+, Firefox 75+, Safari 13+, or Edge 80+

### Recommended Requirements
- **Node.js**: Version 18.0.0 or higher
- **RAM**: 8GB or more
- **CPU**: Multi-core processor
- **Network**: Stable internet connection for initial setup

## 🚀 Installation Methods

### Method 1: Git Clone (Recommended)

1. **Install Git** (if not already installed):
   - **Windows**: Download from [git-scm.com](https://git-scm.com/download/win)
   - **macOS**: `brew install git` or download from [git-scm.com](https://git-scm.com/download/mac)
   - **Linux**: `sudo apt-get install git` (Ubuntu/Debian) or `sudo yum install git` (CentOS/RHEL)

2. **Install Node.js**:
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose the LTS version
   - Verify installation: `node --version` and `npm --version`

3. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd thermal-analysis-app
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the application**:
   ```bash
   npm start
   ```

### Method 2: Download ZIP

1. **Download the project**:
   - Click "Code" → "Download ZIP" from the GitHub repository
   - Extract the ZIP file to your desired location

2. **Follow steps 2, 4, and 5** from Method 1

## 🔍 Verification

After installation, verify everything is working:

1. **Check the development server**:
   - Open your browser and navigate to `http://localhost:3000`
   - You should see the Thermal Analysis App dashboard

2. **Test basic functionality**:
   - Verify that parameter sliders are visible
   - Check that the plot area loads
   - Ensure data loads without errors

3. **Check the console**:
   - Open browser developer tools (F12)
   - Look for any error messages in the console

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### Node.js Version Issues
```bash
# Check your Node.js version
node --version

# If version is below 16, update Node.js
# Download latest LTS from nodejs.org
```

#### Permission Errors (Linux/macOS)
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use a Node version manager like nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
```

#### Port 3000 Already in Use
```bash
# Kill process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm start -- --port 3001
```

#### Dependencies Installation Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try using yarn instead
npm install -g yarn
yarn install
```

#### CSV Data Not Loading
1. Ensure CSV files are in `public/data/` directory
2. Check file format matches expected structure
3. Verify file permissions (readable)
4. Check browser console for network errors

## 🔐 Security Considerations

### Development Environment
- The development server is not suitable for production
- Sensitive data should not be committed to version control
- Use environment variables for configuration

### Data Privacy
- CSV files are loaded client-side
- Ensure sensitive data is properly handled
- Consider data anonymization for shared datasets

## 📁 Directory Structure After Installation

```
thermal-analysis-app/
├── node_modules/           # Dependencies (auto-generated)
├── public/
│   ├── data/              # Your CSV data files
│   ├── config/            # Configuration files
│   ├── index.html         # Main HTML file
│   └── favicon.ico        # App icon
├── src/                   # Source code
├── docs/                  # Documentation
├── package.json           # Project configuration
├── package-lock.json      # Dependency lock file
└── README.md             # Main documentation
```

## 🌐 Environment Setup

### Development Environment Variables
Create a `.env` file in the root directory (optional):

```env
# Port configuration
PORT=3000

# Build configuration
GENERATE_SOURCEMAP=true

# Development settings
FAST_REFRESH=true
```

### Production Build
To create a production build:

```bash
npm run build
```

This creates a `build/` directory with optimized files ready for deployment.

## 📊 Data Setup

### CSV File Preparation
1. **Format your data** according to the expected structure
2. **Place files** in the `public/data/` directory
3. **Update configuration** in `public/config/app_config.json`

### Configuration Setup
1. **Copy** the example configuration file
2. **Modify** parameters to match your data
3. **Test** the configuration with your data

## 🔄 Updates and Maintenance

### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update to latest versions (use with caution)
npm install <package>@latest
```

### Git Updates
```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Restart the development server
npm start
```

## 🆘 Getting Help

If you encounter issues during installation:

1. **Check the troubleshooting section** above
2. **Review the error messages** carefully
3. **Search existing issues** on GitHub
4. **Create a new issue** with:
   - Your operating system and version
   - Node.js version (`node --version`)
   - Complete error message
   - Steps to reproduce the problem

## ✅ Post-Installation Checklist

- [ ] Node.js version 16+ installed
- [ ] Repository cloned or downloaded
- [ ] Dependencies installed successfully
- [ ] Development server starts without errors
- [ ] Application loads in browser
- [ ] No console errors visible
- [ ] Parameter sliders are functional
- [ ] Plot area displays correctly
- [ ] Data loads successfully

**Congratulations! Your Thermal Analysis App is now ready to use.**