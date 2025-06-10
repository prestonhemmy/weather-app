import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [city, setCity] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
        if (city.trim()) {
            onSearch(city.trim());
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className={`flex items-center bg-gray-600/20 backdrop-blur-sm rounded-md px-4 py-2 transition-all ${
                isFocused ? 'ring-2 ring-blue-500' : ''
            }`}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search"
                    className="bg-transparent text-white placeholder-gray-300 outline-none w-32 focus:w-48 transition-all duration-300"
                />
                <button
                    type="submit"
                    className="ml-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default SearchBar;