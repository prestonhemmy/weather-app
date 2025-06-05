import React from 'react';
import { ForecastData } from '../types/weather';

interface ForecastDisplayProps {
    data: ForecastData;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ data }) => {
    // TODO: Process data -> daily results

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600 mb-4">5-Day Forecast</h3>

            {/* Desktop Layout (>= Medium Screen Size) */}
            <div className="hidden md:grid md:grid-cols-5 gap-4">
                <div>
                    {1}
                </div>
                <div>
                    {2}
                </div>
                <div>
                    3
                </div>
                <div>
                    4
                </div>
                <div>
                    5
                </div>
            </div>

            {/* TODO: Mobile Layout (<Medium Screen Size) */}
            <div className="md:hidden space-y-3">
                <div>
                    {1}
                </div>
                <div>
                    {2}
                </div>
                <div>
                    3
                </div>
                <div>
                    4
                </div>
                <div>
                    5
                </div>
            </div>
        </div>
    );
}

export default ForecastDisplay;