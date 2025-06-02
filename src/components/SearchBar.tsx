import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log('Form submitted with city:', city);
        
        if (city.trim()) {
            onSearch(city.trim());
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for a city"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-blue-500 focus:border-gray-300"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-br from-blue-400 to-purple-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;