import React, { 
    useState, 
    FormEvent, 
    useEffect, 
    useRef 
} from 'react';
import { GeocodingData } from '../types/weather';
import { weatherService } from '../services/weatherServices';

interface SearchBarProps {
    onSearch: (city: string, location?: GeocodingData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [city, setCity] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<GeocodingData[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout>(null);

    // Close dropdown when clicking outside of boundary
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Fetch suggestions when input changes
    useEffect(() => {
        // if user enters less than two characters then do not fetch
        if (city.trim().length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // O.W. fetch...

        // clear previous timer reference
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // debounce search to avoid excessive API calls
        debounceTimerRef.current = setTimeout(async () => {
            try {
                setIsLoading(true);
                const results = (await weatherService.getCoordinates(city));
                setSuggestions(results);
                setShowSuggestions(true);
                setSelectedIndex(-1);
            } catch (error) {
                console.error('Error fetching city suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };

    }, [city])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
        if (city.trim()) {
            // If there's a selected suggestion, use it
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                onSearch(city.trim(), suggestions[selectedIndex]);
            
            // O.W. use entered text
            } else {
                onSearch(city.trim());
            }
            setShowSuggestions(false);
        }
    }

    const handleSuggestionClick = (suggestion: GeocodingData) => {
        const cityName = suggestion.name + (suggestion.state ? `, ${suggestion.state}` : '') + `, ${suggestion.country}`;
        setCity(cityName);
        onSearch(cityName, suggestion);
        setShowSuggestions(false);
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!showSuggestions || suggestions.length === 0) { return; }

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;

            case 'ArrowUp':
                event.preventDefault();
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : -1
                );
                break;

            case 'Enter':
                if (selectedIndex >= 0) {
                    event.preventDefault();
                    handleSuggestionClick(suggestions[selectedIndex]);
                }
                break;

            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;

        }
    }

    const formatSuggestion = (suggestion: GeocodingData) => {
        const suggestionInfo = [suggestion.name];
        if (suggestion.state) {
            suggestionInfo.push(suggestion.state);
        }

        suggestionInfo.push(suggestion.country);
        return suggestionInfo.join(", ");

    }

    return (
        <div ref={searchRef} className="relative">
            <form onSubmit={handleSubmit}>
                <div className={`flex items-center bg-gray-600/20 backdrop-blur-sm rounded-md px-4 py-2 transition-all ${
                    isFocused ? 'ring-2 ring-blue-500' : ''
                }`}>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
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

            {/* TODO: Dropdown suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-1.5 w-full min-w-[200px] max-w-[300px] bg-gray-800/95 backdrop-blur-sm rounded-md shadow-lg z-50 overflow-hidden">
                    <ul className="py-1 max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={`${suggestion.lat}-${suggestion.lon}`}
                                className={`flex flex-grow m-1.5 px-4 py-2 rounded-md cursor-pointer transition-colors ${
                                    index === selectedIndex
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-200 hover:bg-gray-700'
                                }`}
                                onClick={() => handleSuggestionClick(suggestion)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <div className="flex flex-grow items-center justify-between">
                                    <span className="text-sm">
                                        {formatSuggestion(suggestion)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;