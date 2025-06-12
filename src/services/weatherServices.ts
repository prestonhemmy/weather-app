import axios from 'axios';
import { GeocodingData, ForecastData } from '../types/weather';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0'

if (!API_KEY) {
  console.error('OpenWeather API key is not defined. Please check your .env file.')
}

export const weatherService = {
  // get coords using city name
  getCoordinates: async (city: string): Promise<GeocodingData[]> => {
    if (!API_KEY) {
      throw new Error('OpenWeather API key is not configured')
    }

    const response = await axios.get<GeocodingData[]>(
      `${GEO_URL}/direct?q=${city}&limit=5&appid=${API_KEY}`
    );

    if (response.data.length === 0) {
      throw new Error('City not found');
    }

    return response.data;
  },

  // get forecast using coords
  getForecast: async (lat: number, lon: number): Promise<ForecastData> => {
    if (!API_KEY) {
      throw new Error('OpenWeather API key is not configured');
    }
    
    const response = await axios.get<ForecastData>(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );

    return response.data;
  },

  getWeatherByCity: async (city: string) => {
    const geoData = await weatherService.getCoordinates(city);
    const { lat, lon } = geoData[0];

    const forecast = await weatherService.getForecast(lat, lon);

    return {
      forecast,
      location: geoData[0]
    };
  }
};