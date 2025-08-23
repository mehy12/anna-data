import { useState } from "react";
import { Cloud, Sun, CloudRain, Droplets, Wind, Thermometer } from "lucide-react";

export default function Weather({ userProfile }) {
  // Mock weather data - in a real app, you'd integrate with OpenWeather API
  const [weatherData] = useState({
    location: userProfile?.location || "Punjab",
    current: {
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      icon: "partly-cloudy",
    },
    forecast: [
      {
        day: "Today",
        high: 32,
        low: 24,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
        precipitation: 10,
      },
      {
        day: "Tomorrow",
        high: 30,
        low: 22,
        condition: "Light Rain",
        icon: "rain",
        precipitation: 70,
      },
      {
        day: "Day 3",
        high: 27,
        low: 20,
        condition: "Rainy",
        icon: "rain",
        precipitation: 85,
      },
      {
        day: "Day 4",
        high: 29,
        low: 21,
        condition: "Cloudy",
        icon: "cloudy",
        precipitation: 20,
      },
      {
        day: "Day 5",
        high: 31,
        low: 23,
        condition: "Sunny",
        icon: "sunny",
        precipitation: 5,
      },
    ],
    alerts: [
      {
        type: "warning",
        title: "Heavy Rainfall Expected",
        description: "Heavy to very heavy rainfall is expected in the next 48 hours. Postpone spraying activities.",
        icon: "⚠️",
      },
    ],
    farmingTips: [
      "Avoid irrigation for the next 2 days due to expected rainfall",
      "Consider harvesting mature crops before the heavy rain",
      "Ensure proper drainage in fields to prevent waterlogging",
      "Store harvested produce in covered areas",
    ],
  });

  const getWeatherIcon = (iconType) => {
    const icons = {
      "sunny": <Sun size={24} className="text-yellow-500" />,
      "partly-cloudy": <Cloud size={24} className="text-gray-500" />,
      "cloudy": <Cloud size={24} className="text-gray-600" />,
      "rain": <CloudRain size={24} className="text-blue-500" />,
    };
    return icons[iconType] || <Cloud size={24} className="text-gray-500" />;
  };

  const getConditionColor = (condition) => {
    if (condition.includes("Rain")) return "text-blue-600 dark:text-blue-400";
    if (condition.includes("Sunny")) return "text-yellow-600 dark:text-yellow-400";
    if (condition.includes("Cloud")) return "text-gray-600 dark:text-gray-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-sora mb-2">
          Weather Forecast
        </h2>
        <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
          Current conditions and 5-day forecast for {weatherData.location}
        </p>
      </div>

      {/* Current Weather */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
        <h3 className="text-lg font-semibold text-black dark:text-white font-sora mb-4">
          Current Weather
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Temperature */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FEF3F2] dark:bg-[#2E1A1A] rounded-lg flex items-center justify-center">
              <Thermometer size={24} className="text-[#EF4444]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black dark:text-white font-sora">
                {weatherData.current.temperature}°C
              </p>
              <p className={`text-sm font-inter ${getConditionColor(weatherData.current.condition)}`}>
                {weatherData.current.condition}
              </p>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F0F9FF] dark:bg-[#1E293B] rounded-lg flex items-center justify-center">
              <Droplets size={24} className="text-[#0EA5E9]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black dark:text-white font-sora">
                {weatherData.current.humidity}%
              </p>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Humidity
              </p>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F0FDF4] dark:bg-[#1A2E1A] rounded-lg flex items-center justify-center">
              <Wind size={24} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-black dark:text-white font-sora">
                {weatherData.current.windSpeed} km/h
              </p>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Wind Speed
              </p>
            </div>
          </div>

          {/* Weather Icon */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg flex items-center justify-center">
              {getWeatherIcon(weatherData.current.icon)}
            </div>
            <div>
              <p className="text-lg font-semibold text-black dark:text-white font-sora">
                {weatherData.location}
              </p>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Current Location
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
        <h3 className="text-lg font-semibold text-black dark:text-white font-sora mb-4">
          5-Day Forecast
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <div
              key={index}
              className="p-4 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg text-center"
            >
              <p className="font-medium text-sm text-black dark:text-white font-inter mb-2">
                {day.day}
              </p>
              
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.icon)}
              </div>
              
              <div className="space-y-1">
                <p className="text-lg font-bold text-black dark:text-white font-sora">
                  {day.high}°
                </p>
                <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                  {day.low}°
                </p>
                <p className={`text-xs font-inter ${getConditionColor(day.condition)}`}>
                  {day.condition}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-inter">
                  {day.precipitation}% rain
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts.length > 0 && (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
          <h3 className="text-lg font-semibold text-black dark:text-white font-sora mb-4">
            Weather Alerts
          </h3>
          
          <div className="space-y-3">
            {weatherData.alerts.map((alert, index) => (
              <div
                key={index}
                className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{alert.icon}</span>
                  <div>
                    <h4 className="font-medium text-sm text-orange-800 dark:text-orange-200 font-inter mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 font-inter">
                      {alert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Farming Tips */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
        <h3 className="text-lg font-semibold text-black dark:text-white font-sora mb-4">
          Weather-Based Farming Tips
        </h3>
        
        <div className="space-y-3">
          {weatherData.farmingTips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-[#F0F9FF] dark:bg-[#1E293B] rounded-lg"
            >
              <span className="text-[#0EA5E9] mt-1">💡</span>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Source Note */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-4">
        <p className="text-xs text-[#666666] dark:text-[#AAAAAA] font-inter text-center">
          Weather data is for demonstration purposes. In production, this would integrate with OpenWeather API or similar service.
        </p>
      </div>
    </div>
  );
}


