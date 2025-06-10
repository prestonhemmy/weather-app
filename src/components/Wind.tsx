import React from "react";

interface WindProps {
    speed: number;
    gust?: number;
    deg: number;
}

const Wind: React.FC<WindProps> = ({ speed, gust, deg }) => {
    // NOTE: 'deg' refers to direction from which wind blows
    // Convert 'deg' to compass arrow direction 'dir'
    const dir = (deg + 180) % 360

    return (
        <div className="bg-gray-600/20 backdrop-blur-sm rounded-lg p-4 space-y-2">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-3">

                {/* Wind Icon */}
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-gray-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={0.5}
                >
                    <path d="M2.639 9.126c1.447 -0.462 2.945 -0.693 4.372 -0.693 1.849 0 3.205 0.292 4.954 0.292 1.809 0 2.934 -1.226 2.934 -2.824 0 -1.638 -1.256 -2.804 -2.804 -2.804 -1.146 0 -2.151 0.714 -2.573 1.668 -0.161 0.332 -0.1 0.724 0.251 0.905 0.322 0.161 0.713 0.06 0.924 -0.352 0.221 -0.513 0.764 -0.915 1.397 -0.915 0.834 0 1.487 0.583 1.487 1.497S12.95 7.417 11.965 7.417c-1.668 0 -3.045 -0.301 -4.954 -0.301 -1.638 0 -3.296 0.292 -4.773 0.763 -0.422 0.121 -0.583 0.483 -0.482 0.834 0.1 0.342 0.432 0.543 0.884 0.412m15.717 4.703c2.341 0 3.999 -1.487 3.999 -3.567 0 -2.05 -1.578 -3.537 -3.537 -3.537 -1.819 0 -3.165 1.266 -3.407 2.934 -0.06 0.412 0.171 0.744 0.533 0.794 0.372 0.05 0.694 -0.181 0.774 -0.653 0.171 -1.045 1.045 -1.769 2.1 -1.769 1.226 0 2.221 0.915 2.221 2.231 0 1.336 -1.055 2.261 -2.683 2.261 -3.065 0 -6.371 -1.748 -10.391 -1.748 -2.07 0 -3.959 0.331 -5.728 0.965 -0.412 0.141 -0.583 0.492 -0.482 0.844 0.1 0.342 0.442 0.553 0.884 0.402 1.638 -0.623 3.346 -0.894 5.326 -0.894 4.01 0 7.004 1.739 10.391 1.739M11.975 20.913c1.548 0 2.743 -1.146 2.743 -2.783 0 -2.371 -2.422 -3.698 -6.884 -3.698 -1.869 0 -3.889 0.362 -5.597 0.955 -0.412 0.141 -0.583 0.492 -0.482 0.844 0.1 0.342 0.442 0.553 0.884 0.402 1.598 -0.573 3.387 -0.884 5.196 -0.884 3.647 0 5.577 0.914 5.577 2.381 0 0.924 -0.643 1.477 -1.437 1.477 -0.794 0 -1.276 -0.533 -1.417 -1.377 -0.06 -0.372 -0.331 -0.673 -0.764 -0.643 -0.452 0.03 -0.633 0.412 -0.573 0.814 0.181 1.397 1.216 2.512 2.753 2.512"/>
                </svg>

                <h3 className="text-gray-300 text-xs font-medium uppercase tracking-wider">
                    Wind
                </h3>
            </div>

            {/* Content Display */}
            <div className="flex items-center">

                {/* Speed Display */}
                <div className="flex-1 space-y-3">

                    {/* Wind Speed */}
                    <div className="flex items-end space-x-2">
                        <span className="text-white text-3xl">{Math.round(speed)}</span>
                        <div className="flex flex-col">
                            <span className="text-gray-300 text-xs">MPH</span>
                            <span className="text-gray-300 text-xs">Wind</span>
                        </div>
                        
                    </div>

                    <div className="border-b border-white/10"></div>

                    {/* Gust Speed */}
                    {gust && (
                        <div className="flex items-end space-x-2">
                            <span className="text-white text-3xl">{Math.round(gust)}</span>
                            <div className="flex flex-col">
                                <span className="text-gray-300 text-xs">MPH</span>
                                <span className="text-gray-300 text-xs">Gusts</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Direction Display */}
                <div className="relative w-24 h-24 ml-4">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
                        {/* Outer Circle */}
                        <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                        
                        {/* Outer Cardinal Direction Markers */}
                        <line x1="60" y1="20" x2="60" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                        <line x1="90" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                        <line x1="60" y1="100" x2="60" y2="90" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                        <line x1="20" y1="60" x2="30" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

                        {/* Inner Circle */}
                        <circle cx="60" cy="60" r="4" fill="white" stroke="rgba(255,255,255,1)" strokeWidth="2" />
                        
                        {/* Cardinal Direction Labels */}
                        <text x="60" y="10" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="1000">N</text>
                        <text x="112" y="64" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="1000">E</text>
                        <text x="60" y="116" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="1000">S</text>
                        <text x="6" y="64" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="1000">W</text>
                        
                        {/* Wind Direction Arrow */}
                        <g transform={`rotate(${dir} 60 60)`}>
                            <path 
                                d="M60 15 L55 25 L60 20 L65 25 Z" 
                                fill="white" 
                                filter="url(#arrowShadow)"
                            />
                            <line x1="60" y1="20" x2="60" y2="100" stroke="white" strokeWidth="2" />
                        </g>
                        
                        {/* Shadow Filter */}
                        <defs>
                            <filter id="arrowShadow">
                                <feDropShadow dx="0" dy="0" stdDeviation="3" floodOpacity="0.3" />
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>

    );
}

export default Wind;