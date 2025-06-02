import React from 'react';
import { ForecastData } from '../types/weather';

interface ForecastDisplayProps {
    data: ForecastData;
    location: { name: string; country: string };
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ data, location }) => {
    // current weather set to first forecast item
    const current = data.list[0];
    const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;

    // forecast data for 8 * 3-hour intervals (= 24 hours total)
    const todaysForecasts = data.list.slice(0, 8);

    // high and lows
    const temps = todaysForecasts.map(item => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    // Alt (?)
    const low = todaysForecasts[0].main.temp_min;
    const high = todaysForecasts[0].main.temp_max;

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
                {/* Location Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {location.name}, {location.country}
                    </h2>
                    <p className="text-gray-600 capitalize mt-2">
                        {current.weather[0].description}
                    </p>
                </div>

                {/* Weather Icon and Temperature */}
                <div className="flex items-center justify-center mb-6">
                    <img src={iconUrl} alt={current.weather[0].description} className="w-32 h-32"/>
                    <div className="ml-6">
                        <div className="text-6xl font-bold text-gray-800">
                            {Math.round(current.main.temp)}°F
                        </div>
                        <div className="text-gray-600">
                            Feels like {current.main.feels_like}°F
                        </div>
                    </div>
                </div>

                {/* Weather Details Grid */}
                {/* TODO */}

                {/* Sunrise/Sunset */}
                {/* TODO */}
            </div>
        </div>
    )
}

export default ForecastDisplay;