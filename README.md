# Weather App

<div>
    <img src="public/logo.png" alt="Weather app logo" style="width:50%; height:auto; margin-bottom:10px">
</div>

A modern, responsive weather application built with React and TypeScript that provides current weather conditions and 5-day forecasts for cities worldwide.

## 🌟 Features

- **Current Weather Display**: Real-time weather data including temperature, precipitation, wind, and sunrise/sunset.
- **5-Day Forecast**: Extended forecast with daily weather predictions
- **City Search**: Search weather by city name with predictive suggestions
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Loading States**: Smooth loading indicators for better user experience
- **Error Handling**: Graceful error handling for invalid searches and network issues

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React useState/useContext
- **HTTP Client**: Axios
- **Weather API**: OpenWeatherMap API
- **Build Tool**: Create React App

## Demo

<div style="width:50%; height:auto;" >
    <video controls src="public/demo_1.mp4" title="Demo video"></video>
</div>

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your OpenWeatherMap API key:

```env
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Obtain an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your API keys section
4. Generate a new API key
5. Copy the key to your `.env` file

### 5. Start the Development Server

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/             # React components
│   ├── SearchBar.tsx       # City search input component
│   ├── WeatherHeader.tsx   # Current weather display
|   ├── FiveDayForecast.tsx # 5-day forecast display
|   ├── FeelsLike.tsx       # Feels like temperature display
|   ├── SunriseSunset.tsx   # Sunrise/Sunset display
|   ├── index.ts            # Barrel file
│   └── ...
├── contexts/               # React contexts
│   └── ...
├── hooks/                  # Custom React hooks
│   └── ...
├── services/               # API services
│   └── weatherService.ts
├── types/                  # TypeScript type definitions
│   └── weather.ts
├── utils/                  # Utility functions
│   └── ...
├── App.tsx                 # Main app component
├── index.tsx               # App entry point
├── index.css               # Global styles (Tailwind)
└── ...
```

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

## 🌐 API Usage

This project uses the OpenWeatherMap API with the following endpoints:

- **Geocoding**: `/direct?q={city name}&limit={limit}&appid={API key}`
- **5-Day Forecast**: `/forecast?lat={lat}&lon={lon}&appid={API key}&units=imperial`

### Rate Limits
- Free tier: 60 calls/minute, 1,000,000 calls/month
- Data updates every 10 minutes

## 🎨 Styling

The project uses Tailwind CSS for styling. Key design decisions:
- Mobile-first design
- Responsive custom SVG icons
- Modern glassmorphism-themed UI components
- Smooth transitions and loading states

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## 👤 Author

**Preston Hemmy**

GitHub: [@prestonhemmy](https://github.com/prestonhemmy)

LinkedIn: [Preston Hemmy](https://linkedin.com/in/prestonhemmy)
