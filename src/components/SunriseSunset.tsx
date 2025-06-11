import React from "react";

interface SunriseSunsetProps {
    sunriseUTC: number;
    sunsetUTC: number;
    timezone: number;
}

const SunriseSunset: React.FC<SunriseSunsetProps> = ({ sunriseUTC, sunsetUTC, timezone }) => {
    const now = Date.now();

    // current time in selected city's timezone
    // const time = new Date(now + (timezone * 1000));

    // convert sunrise and sunset to milliseconds
    const sunrise = sunriseUTC * 1000;
    const sunset = sunsetUTC * 1000;

    const isDay = now >= sunrise && now <= sunset;

    // Calculate current progress into Day or Night
    let progress = 0;
    if (isDay) {
        const dayDuration = sunset - sunrise;
        const elapsed = now - sunrise;
        progress = (elapsed / dayDuration) * 100;
    } else {
        let nightStart: number;
        let nightEnd: number;

        // if between sunset and midnight -> use next sunrise
        if (now > sunset) { 
            nightStart = sunset;
            nightEnd = sunrise + (24 * 60 * 60 * 1000);
        
        // o.w. if between midnight and sunrise -> use previous sunset
        } else {
            nightStart = sunset - (24 * 60 * 60 * 1000);
            nightEnd = sunrise;
        }

        const nightDuration = nightEnd - nightStart;
        const elapsed = now - nightStart;
        progress = (elapsed / nightDuration) * 100;
    }

    progress = Math.max(0, Math.min(100, progress));

    // format time relative to selected city's timezone
    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);

        const cityMs = date.getTime() + (timezone * 1000);
        const cityDate = new Date(cityMs)

        let hours: number;
        let suffix: string;
        if (cityDate.getUTCHours() > 12) {
            hours = cityDate.getUTCHours() - 12;
            suffix = "PM"
        } else {
            hours = cityDate.getUTCHours();
            suffix = "AM"
        }

        const minutes = cityDate.getUTCMinutes();

        return `${hours.toString()}:${minutes.toString().padStart(2, '0')} ${suffix}`;
    }


    return (
        <div className="bg-gray-600/20 backdrop-blur-sm rounded-lg p-4 aspect-square flex flex-col">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-2">

                {isDay ? (
                // Sunset Icon
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-gray-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                >
                    <path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>
                </svg>
                ) : (
                // Sunrise Icon
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-gray-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                >
                    <path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 5 12 1 16 5"></polyline>
                </svg>
                )}

                <h3 className="text-gray-300 text-xs font-medium uppercase tracking-wider">
                    {isDay ? 'Sunset' : 'Sunrise'}
                </h3>
            </div>

            {/* Time Display */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-4">
                <span className="text-white text-2xl">
                    {now >= sunrise ? formatTime(sunsetUTC) : formatTime(sunriseUTC)}
                </span>

                {/* Progress Bar */}
                <div className="w-full px-2">
                    <div className="relative">
                        <div className="flex justify-between mb-1">
                            {/* Sun Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {/* Moon Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>

                        {/* Progress Track */}
                        <div 
                            className={`relative h-1 rounded-full ${
                                isDay ? 'bg-gray-600' : ''
                            }`}
                        >
                            {/* Progress Fill */}
                            <div 
                                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
                                    isDay ? 'bg-gradient-to-r from-gray-400 to-white' : 'bg-gradient-to-r from-gray-400 to-gray-600'
                                }`}
                                style={{ width: `${progress}%` }}
                            />

                            {/* Progress Indicator */}
                            <div 
                                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 -translate-x-1/2 rounded-full shadow-lg ${
                                    isDay ? 'bg-white shadow-white/50' : 'bg-gray-600 shadow-gray-600/50'
                                }`}
                                style={{ left: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SunriseSunset;