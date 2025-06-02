import React, { useState } from 'react';
import { ForecastData, GeocodingData, WeatherData } from './types/weather';
import { weatherService } from './services/weatherServices';
import SearchBar from './components/SearchBar';
import ForecastDisplay from './components/ForecastDisplay';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<GeocodingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('API Key exists:', !!process.env.REACT_APP_OPENWEATHER_API_KEY)

  /**
   * Asynchronous function which fetches weather data for a given city
   */
  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const { forecast, location } = await weatherService.getWeatherByCity(city);
    
      // debugging
      console.log("forecast:", forecast);
      console.log("location:", location);

      setForecast(forecast);
      setLocation(location);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-4xl text-transparent bg-clip-text font-bold bg-gradient-to-br from-blue-400 to-purple-600 text-center mb-8">
          Weather App
        </h1>

        {/* Search Field */}
        <SearchBar onSearch={handleSearch}></SearchBar>

        {/* Display Field */}
        <div className="mt-8">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {forecast && location && !loading && (
            <ForecastDisplay data={forecast} location={location} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;