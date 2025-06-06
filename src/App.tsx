import React, { useState, useEffect } from 'react';
import { ForecastData, GeocodingData } from './types/weather';
import { weatherService } from './services/weatherServices';
import SearchBar from './components/SearchBar';
import WeatherHeader from './components/WeatherHeader';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<GeocodingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load default city on mount (FOR DEVELOPMENT -> TODO: Remove later)
  useEffect(() => {
    handleSearch('Portland');
  }, []);

  /**
   * Asynchronous function which fetches weather data for a given city
   */
  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const { forecast, location } = await weatherService.getWeatherByCity(city);

      setForecast(forecast);
      setLocation(location);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-300">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="pt-20 pb-12">
            {loading && (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <ErrorMessage message={error} />
              </div>
            )}
            {forecast && location && !loading && !error && (
              <WeatherHeader data={forecast} location={location} />
            )}
          </div>
        </div>

        {/* Main Content Section */}
        {/* TODO */}
    </div>
  );
};

export default App;