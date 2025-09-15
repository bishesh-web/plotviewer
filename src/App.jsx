import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { ConfigService, DataService } from './services';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState(null);
  const [dataService, setDataService] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);

      // Load configuration
      const configService = new ConfigService();
      const loadedConfig = await configService.loadConfig();
      setConfig(loadedConfig);

      // Initialize data service
      const dataServiceInstance = new DataService(loadedConfig);
      await dataServiceInstance.loadData();
      setDataService(dataServiceInstance);

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading thermal analysis application..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Application</h2>
        <p>{error}</p>
        <button onClick={initializeApp}>Retry</button>
      </div>
    );
  }

  return (
    <div className="App">
      <Dashboard config={config} dataService={dataService} />
    </div>
  );
}

export default App;