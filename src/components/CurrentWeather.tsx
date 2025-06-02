import React from 'react';
import { WeatherData } from '../types/weather';

interface currentWeatherProps {
    data: WeatherData;
}

const CurrentWeather: React.FC<currentWeatherProps> = ({ data }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    return (
        <div className="max-wmd mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
                <div className="text-center">
                    {/* TODO: city should defult to nearest city -> location services required? */}
                    <h2 className="text-2xl font-bold text-gray-800">
                        {data.name}, {data.sys.country}
                    </h2>
                    
                    {/* TODO: cuurent weather icon (NOTE current iconUrl not working) */}

                    <p className="text-gray-600 capitalize mt-2">
                        {data.weather[0].description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;