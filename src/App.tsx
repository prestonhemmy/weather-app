import React, { useState, useEffect } from 'react';
import { 
  ForecastData, 
  GeocodingData 
} from './types/weather';
import { weatherService } from './services/weatherServices';
import {
  SearchBar,
  ErrorMessage,
  LoadingSpinner,
  WeatherHeader,
  FiveDayForecast,
  FeelsLike,
  SunriseSunset,
  Wind
} from './components';

function App() {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<GeocodingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load default city on mount
  useEffect(() => {
    handleSearch('Portland');
  }, []);

  /**
   * Asynchronous function which fetches weather data for a given city (default)
   * or for a given location (if provided)
   */
  const handleSearch = async (city: string, specificLocation?: GeocodingData) => {
    try {
      setLoading(true);
      setError(null);

      let weatherData;

      // if specific location provided use coords
      if (specificLocation) {
        weatherData = await weatherService.getForecast(specificLocation.lat, specificLocation.lon);
        setLocation(specificLocation);
        setForecast(weatherData);

      // O.W. use city (default)
      } else {
        weatherData = await weatherService.getWeatherByCity(city);
        setLocation(weatherData.location);
        setForecast(weatherData.forecast);
      }

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
        {forecast && location && !loading && !error && (
          <div className="max-w-3xl mx-auto px-4 pb-8">

            {/* Mobile Layout */}
            <div className="md:hidden max-w-md mx-auto space-y-2">
              <FiveDayForecast data={forecast}/>

              <div className="grid grid-cols-2 gap-2">
                <FeelsLike temperature={forecast.list[0].main.feels_like}/>
                <SunriseSunset 
                  sunriseUTC={forecast.city.sunrise} 
                  sunsetUTC={forecast.city.sunset} 
                  timezone={forecast.city.timezone}
                />

                <div className="col-span-2">
                  <Wind 
                    speed={forecast.list[0].wind.speed}
                    gust={forecast.list[0].wind.gust}
                    deg={forecast.list[0].wind.deg}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-2">
              <FiveDayForecast data={forecast}/>

              <div className="grid grid-cols-2 gap-2">
                <FeelsLike temperature={forecast.list[0].main.feels_like}/>
                <SunriseSunset 
                  sunriseUTC={forecast.city.sunrise} 
                  sunsetUTC={forecast.city.sunset} 
                  timezone={forecast.city.timezone}
                />

                <div className="col-span-2">
                  <Wind 
                    speed={forecast.list[0].wind.speed}
                    gust={forecast.list[0].wind.gust}
                    deg={forecast.list[0].wind.deg}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default App;