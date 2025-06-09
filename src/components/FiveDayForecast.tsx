import React from "react";
import { ForecastData } from "../types/weather";

interface FiveDayForecastProps {
    data: ForecastData;
}

interface DailyForecast {
    date: Date;
    day: string;
    temps: number[];
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
    pop: number;
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ data }) => {
    const groupForecastByDay = (): DailyForecast[] => {
        const dailyData: { [key: string]: any } = {};

        // Group forecast data by day
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toDateString();

            if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                    date: date,
                    temps: [],
                    weather: [],
                    pop: []
                };
            }

            dailyData[dateKey].temps.push(item.main.temp);
            dailyData[dateKey].weather.push(item.weather[0]);
            dailyData[dateKey].pop.push(item.pop);
        });

        // Process daily data
        const processedDays = Object.values(dailyData).map((day: any) => {
            const minTemp = Math.round(Math.min(...day.temps));
            const maxTemp = Math.round(Math.max(...day.temps));

            // Find most common weather condition
            const weatherCounts: { [key: string]: number } = {};
            day.weather.forEach((w: any) => {
                weatherCounts[w.icon] = (weatherCounts[w.icon] || 0) + 1;
            });

            let mostCommon = day.weather[0];
            let maxCount = 0;
            Object.entries(weatherCounts).forEach(([icon, count]) => {
                if (count > maxCount) {
                    maxCount = count as number;
                    mostCommon = day.weather.find((w: any) => w.icon === icon);
                }
            });

            // Get max probability of precipitation
            const maxPop = Math.round(Math.max(...day.pop) * 100);

            return {
                date: day.date,
                day: day.date.toLocaleDateString('en-US', { weekday: 'long' }),
                temps: [minTemp, maxTemp],
                weather: mostCommon,
                pop: maxPop
            };
        });

        return processedDays.slice(0, 5);
    };

    const dailyForecasts = groupForecastByDay();

    const getWeatherIcon = (iconCode: string) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };
    
    return (
        <div className="bg-gray-600/20 backdrop-blur-sm rounded-lg p-4 space-y-2">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-3">

                {/* Calendar Icon */}
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-gray-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>

                <h3 className="text-gray-300 text-xs font-medium uppercase tracking-wider">
                    5-Day Forecast
                </h3>
            </div>

            {/* Forecast Display */}
            <div className="space-y-2">
                {dailyForecasts.map((day, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between py-2">
                            {/* Day */}
                            <div className="w-20">
                                <p className="text-white text-sm">
                                    {index === 0 ? 'Today' : day.day.slice(0, 3)}
                                </p>
                            </div>

                            {/* Weather Icon */}
                            <img 
                                src={getWeatherIcon(day.weather.icon)}
                                alt={day.weather.description}
                                className="w-8 h-8"
                            />

                            {/* Weather Description */}
                            <div className="flex-1 px-4">
                                <p className="text-white text-xs capitalize">
                                    {day.weather.description}
                                </p>
                            </div>

                            {/* High and Low */}
                            <div className="flex items-baseline space-x-2 px-4">
                                <span className="text-white text-md">{day.temps[1]}°</span>
                                <span className="text-gray-300 text-xs">{day.temps[0]}°</span>
                            </div>

                            {/* Precipitation */}
                            <div className="w-20">
                                <div className="flex items-center space-x-1 ml-3">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-3 w-3 text-sky-600" 
                                        fill="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 21.5C8.4 21.5 5.5 18.6 5.5 15C5.5 11.7 8.5 6.5 10.5 3.5C11.1 2.6 12.9 2.6 13.5 3.5C15.5 6.5 18.5 11.7 18.5 15C18.5 18.6 15.6 21.5 12 21.5Z" />
                                    </svg>
                                    <span className="text-sky-600 text-sm">{day.pop}%</span>
                                </div>
                            </div>
                        </div>

                        {index < dailyForecasts.length - 1 && (
                            <div className="border-b border-white/10"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FiveDayForecast;