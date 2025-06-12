import React from "react";
import { GeocodingData, ForecastData } from "../types/weather";


interface WeatherHeaderProps {
    data: ForecastData;
    location: GeocodingData;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ data, location }) => {
    // current weather from the first forecast item
    const current = data.list[0];

    // today's forecast data (8 * 3-hour intervals = 24 hours)
    const todaysForecast = data.list.slice(0, 8);

    // high and low from daily temps aggregation
    const temps = todaysForecast.map(item => item.main.temp);
    const high = Math.round(Math.max(...temps));
    const low  = Math.round(Math.min(...temps))

    return (
        <div className="text-center text-white">
            <h1 className="text-2xl font-medium mb-2">
                {location.name}, {location.country}         {/* Including country for now */}
            </h1>

            <div className="text-6xl font-light mb-2 ml-6">
                {Math.round(current.main.temp)}°
            </div>

            <p className="text-lg font-light mb-2 capitalize">
                {current.weather[0].description}
            </p>

            <div className="text-lg font-light text-gray-100">
                 <span className="mr-3">H: {high}°</span>
                 <span>L: {low}°</span>
            </div>
        </div>
    );
}

export default WeatherHeader;