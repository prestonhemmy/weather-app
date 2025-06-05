import React from 'react';
import { ForecastData } from '../types/weather';

interface CurrentWeatherProps {
    data: ForecastData;
    location: { name: string; country: string };
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, location }) => {
    // current weather set to first forecast item
    const current = data.list[0];
    const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;

    // forecast data for 8 * 3-hour intervals (= 24 hours total)
    const todaysForecast = data.list.slice(0, 8);

    // high and lows
    const temps = todaysForecast.map(item => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

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
                        <div className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">
                            Feels like {current.main.feels_like}°F
                        </div>
                    </div>
                </div>

                {/* Weather Details Grid */}
                <div  className="max-w-2xl mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 pb-6">
                        <div className="text-center">
                            <div className="text-gray-600 text-sm">High/Low</div>
                            <div className="font-semibold">
                                {Math.round(maxTemp)}° / {Math.round(minTemp)}°
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-gray-600 text-sm">Wind</div>
                            <div className="font-semibold">
                                {current.wind.speed} mph
                                {/* TODO: Add arrow corresponding to wind direction (degrees) dispalyed inline with speed */}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-gray-600 text-sm">Humidity</div>
                            <div className="font-semibold">
                                {current.main.humidity} %
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-gray-600 text-sm">Clouds</div>
                            <div className="font-semibold">
                                {current.clouds.all} %
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sunrise/Sunset */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                    <div className="text-center">
                        <div className="text-gray-600 text-sm">Sunrise</div>
                        <div className="font-semibold">
                            {new Date(data.city.sunrise * 1000).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-600 text-sm">Sunset</div>
                        <div className="font-semibold">
                            {new Date(data.city.sunset * 1000).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;