# 📜 Scripts Documentation

This document provides detailed information about the npm scripts available in the Thermal Analysis App.

## 📋 Available Scripts

The following scripts are defined in `package.json` and can be executed using `npm run <script-name>`:

### `npm start`
**Purpose**: Starts the development server

**Command**: `react-scripts start`

**Details**:
- Starts the development server on `http://localhost:3000`
- Enables hot reloading for instant development feedback
- Opens browser automatically (can be disabled with `BROWSER=none`)
- Supports custom port via `PORT` environment variable

**Usage**:
```bash
npm start

# Custom port
PORT=3001 npm start

# Disable browser auto-open
BROWSER=none npm start

# Windows PowerShell
$env:PORT=3001; npm start
```

**Development Features**:
- **Hot Module Replacement**: Changes reflect immediately
- **Error Overlay**: Shows compilation errors in browser
- **Source Maps**: Debug with original source code
- **CSS Auto-refresh**: Style changes update without page reload

---

### `npm run build`
**Purpose**: Creates an optimized production build

**Command**: `react-scripts build`

**Details**:
- Builds the app for production in the `build/` folder
- Optimizes and minifies all assets
- Includes hashed filenames for cache busting
- Generates service worker for offline functionality

**Output Structure**:
```
build/
├── static/
│   ├── css/           # Minified CSS files
│   ├── js/            # Minified JavaScript bundles
│   └── media/         # Optimized images and assets
├── index.html         # Main HTML file
└── manifest.json      # PWA manifest
```

**Build Optimizations**:
- **Code Splitting**: Automatic bundle splitting for better caching
- **Tree Shaking**: Removes unused code from bundles
- **Asset Optimization**: Images and other assets are optimized
- **Gzip Compression**: Files are pre-compressed for faster loading

**Usage**:
```bash
npm run build

# Build with source maps (for debugging)
GENERATE_SOURCEMAP=true npm run build

# Analyze bundle size
npm run build && npx serve -s build
```

---

### `npm test`
**Purpose**: Runs the test suite in interactive watch mode

**Command**: `react-scripts test`

**Details**:
- Uses Jest testing framework
- Runs tests in watch mode by default
- Automatically re-runs tests when files change
- Includes coverage reporting capabilities

**Test Files**:
- Files ending in `.test.js` or `.test.jsx`
- Files ending in `.spec.js` or `.spec.jsx`
- Files in `__tests__` folders

**Usage**:
```bash
npm test

# Run tests once (CI mode)
CI=true npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Dashboard.test.jsx

# Run tests matching pattern
npm test -- --testNamePattern="parameter"
```

**Coverage Reports**:
```bash
# Generate coverage report
npm test -- --coverage --watchAll=false

# Coverage output location
coverage/
├── lcov-report/       # HTML coverage report
├── clover.xml        # XML coverage for CI
└── lcov.info         # LCOV format for tools
```

---

### `npm run eject`
**Purpose**: Ejects from Create React App configuration

**Command**: `react-scripts eject`

**⚠️ WARNING**: This is a **one-way operation**. Once you eject, you can't go back!

**Details**:
- Copies all configuration files and dependencies to your project
- Gives you full control over build tools and configuration
- Required only for advanced customization needs

**What Gets Ejected**:
- Webpack configuration
- Babel configuration
- ESLint configuration
- All build dependencies

**Before Ejecting, Consider**:
- **Custom Scripts**: Add custom build scripts instead
- **Environment Variables**: Use `.env` files for configuration
- **Proxy Configuration**: Use `package.json` proxy field
- **PostCSS Plugins**: Many can be added without ejecting

**Usage**:
```bash
npm run eject
# Confirm when prompted
```

## 🛠️ Custom Scripts

You can add custom scripts to `package.json` for project-specific tasks:

### Development Scripts
```json
{
  "scripts": {
    "dev": "npm start",
    "dev:port": "PORT=3001 npm start",
    "dev:debug": "BROWSER=none npm start"
  }
}
```

### Build Scripts
```json
{
  "scripts": {
    "build:dev": "GENERATE_SOURCEMAP=true npm run build",
    "build:analyze": "npm run build && npx bundle-analyzer build/static/js/*.js",
    "prebuild": "npm run lint && npm run test:ci"
  }
}
```

### Testing Scripts
```json
{
  "scripts": {
    "test:ci": "CI=true npm test",
    "test:coverage": "npm test -- --coverage --watchAll=false",
    "test:update": "npm test -- --updateSnapshot",
    "test:watch": "npm test"
  }
}
```

### Deployment Scripts
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d build",
    "deploy:aws": "npm run build && aws s3 sync build/ s3://my-bucket",
    "deploy:netlify": "npm run build && netlify deploy --prod --dir=build"
  }
}
```

### Linting Scripts
```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/"
  }
}
```

## 🔧 Environment Variables

### Development Environment
Create a `.env` file in the root directory:

```env
# Development server configuration
PORT=3000
BROWSER=chrome
GENERATE_SOURCEMAP=true

# Feature flags
REACT_APP_ENABLE_DEBUG=true
REACT_APP_API_URL=http://localhost:8000

# Build optimization
FAST_REFRESH=true
```

### Production Environment
```env
# Production build settings
GENERATE_SOURCEMAP=false
PUBLIC_URL=/thermal-analysis

# Feature flags
REACT_APP_ENABLE_DEBUG=false
REACT_APP_API_URL=https://api.example.com
```

### Environment Variable Rules
- Must start with `REACT_APP_` to be available in browser
- Values are embedded at build time (not runtime)
- Use `.env.local` for local overrides (gitignored)

## 🚀 Deployment Scripts

### Static Hosting (Netlify, Vercel)
```json
{
  "scripts": {
    "build": "react-scripts build",
    "predeploy": "npm run build"
  }
}
```

### GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json
{
  "homepage": "https://username.github.io/thermal-analysis-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Docker Deployment
Create `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
```

Add script:
```json
{
  "scripts": {
    "docker:build": "docker build -t thermal-analysis-app .",
    "docker:run": "docker run -p 3000:3000 thermal-analysis-app"
  }
}
```

## 🔍 Debugging Scripts

### Bundle Analysis
```bash
# Install analyzer
npm install --save-dev webpack-bundle-analyzer

# Add script
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}
```

### Performance Profiling
```bash
# Run with profiler
npm start -- --profile

# Build with profiler
npm run build -- --profile
```

### Debug Information
```json
{
  "scripts": {
    "debug:info": "react-scripts --version && node --version && npm --version",
    "debug:deps": "npm ls",
    "debug:audit": "npm audit",
    "debug:outdated": "npm outdated"
  }
}
```

## 🧪 Testing Scripts

### Unit Testing
```json
{
  "scripts": {
    "test:unit": "npm test -- --testPathPattern=src/components",
    "test:services": "npm test -- --testPathPattern=src/services",
    "test:utils": "npm test -- --testPathPattern=src/utils"
  }
}
```

### Integration Testing
```json
{
  "scripts": {
    "test:integration": "npm test -- --testPathPattern=src/integration",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open"
  }
}
```

### Performance Testing
```json
{
  "scripts": {
    "test:lighthouse": "lhci autorun",
    "test:size": "size-limit",
    "test:speed": "npm run build && serve -s build & npm run test:lighthouse"
  }
}
```

## 📈 CI/CD Scripts

### GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm test -- --coverage --watchAll=false
      - run: npm run build
```

### Package.json CI scripts
```json
{
  "scripts": {
    "ci": "npm ci && npm run lint && npm run test:ci && npm run build",
    "ci:fast": "npm ci --production=false && npm run test:ci && npm run build"
  }
}
```

## 🔧 Troubleshooting Scripts

### Common Issues
```json
{
  "scripts": {
    "clean": "rm -rf node_modules package-lock.json && npm install",
    "clean:cache": "npm cache clean --force",
    "clean:build": "rm -rf build",
    "reset": "npm run clean && npm run clean:build && npm install"
  }
}
```

### Health Check
```json
{
  "scripts": {
    "health": "npm run debug:info && npm run debug:deps && npm audit",
    "doctor": "npm run health && npm run lint && npm run test:ci"
  }
}
```

## 📚 Script Best Practices

### Naming Conventions
- Use **descriptive names**: `test:coverage` instead of `coverage`
- Use **colons for namespacing**: `build:dev`, `build:prod`
- Use **standard prefixes**: `pre`, `post` for hooks

### Error Handling
```json
{
  "scripts": {
    "build:safe": "npm run lint && npm run test:ci && npm run build",
    "deploy": "npm run build:safe && npm run deploy:prod || npm run deploy:rollback"
  }
}
```

### Documentation
- Document complex scripts in this file
- Use comments in package.json when necessary
- Include usage examples for custom scripts

### Performance
- Combine related operations
- Use parallel execution where possible
- Cache dependencies and build artifacts

This comprehensive script documentation should help developers understand and effectively use all available npm scripts in the Thermal Analysis App.