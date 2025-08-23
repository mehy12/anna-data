import React, { useState, useEffect } from 'react';

const Weather = ({ user, onLogout, onNavigate }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      // Mock weather data for demo
      setTimeout(() => {
        setWeather({
          location: user.location || 'New Delhi',
          temperature: 28,
          description: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          forecast: [
            { day: 'Today', high: 32, low: 22, description: 'Sunny' },
            { day: 'Tomorrow', high: 30, low: 20, description: 'Cloudy' },
            { day: 'Day 3', high: 29, low: 19, description: 'Light Rain' }
          ]
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Anna-Data</h1>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('weather')}
                className="text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Weather
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={onLogout}
                  className="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Weather Forecast</h1>
          <p className="text-gray-600 mt-2">Current weather conditions and forecast</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : weather ? (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Current Weather</h2>
                  <p className="text-gray-600">{weather.location}</p>
                </div>
                <svg className="h-12 w-12 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">{weather.temperature}°C</p>
                  <p className="text-gray-600">{weather.description}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-2xl font-bold text-blue-600">{weather.humidity}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-2xl font-bold text-green-600">{weather.windSpeed} km/h</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-medium text-green-600">Good for farming</p>
                </div>
              </div>
            </div>

            {/* 3-Day Forecast */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">3-Day Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                    <h4 className="font-medium text-gray-900">{day.day}</h4>
                    <p className="text-sm text-gray-600 mt-1">{day.description}</p>
                    <div className="mt-2">
                      <span className="text-lg font-bold text-gray-900">{day.high}°</span>
                      <span className="text-gray-500 ml-2">{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agricultural Advice */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Agricultural Advice</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Recommended Activities</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Good time for irrigation</li>
                    <li>• Suitable for pesticide application</li>
                    <li>• Ideal for harvesting</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 mb-2">Precautions</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Monitor humidity levels</li>
                    <li>• Prepare for possible rain</li>
                    <li>• Check soil moisture</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;