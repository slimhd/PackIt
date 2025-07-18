'use client';

import { PackingItem as PackingItemType, WeatherData } from '@/store/usePackStore';
import PackingItem from './PackingItem';

interface ExportViewProps {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  isLightPack: boolean;
  weatherData: WeatherData | null;
  packingList: PackingItemType[];
  className?: string;
}

const ExportView = ({
  destination,
  startDate,
  endDate,
  isLightPack,
  weatherData,
  packingList,
  className = ''
}: ExportViewProps) => {
  if (!weatherData || !packingList.length) {
    return null;
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'clouds':
        return '☁️';
      default:
        return '🌤️';
    }
  };

  // Group items by category
  const groupedItems = packingList.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as { [key: string]: PackingItemType[] });

  const packedCount = packingList.filter(item => item.isPacked).length;
  const totalCount = packingList.length;
  const progressPercentage = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  return (
    <div 
      id="export-view"
      className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 ${className}`}
      style={{ display: 'none' }} // Hidden by default, shown only during export
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Packing List for {destination}
        </h2>
        <p className="text-gray-600">
          {startDate && endDate ? (
            `${startDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })} - ${endDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })} • ${isLightPack ? 'Light Pack' : 'Full Pack'} Mode`
          ) : (
            `${isLightPack ? 'Light Pack' : 'Full Pack'} Mode`
          )}
        </p>
      </div>

      {/* Weather Forecast */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📅</span>
          Trip Weather Forecast (Day by Day)
        </h3>
        <div className="space-y-3">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getWeatherIcon(day.main)}</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    {day.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {day.temp_max}°C / {day.temp_min}°C
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Packing Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            📋 Packing Progress
          </span>
          <span className="text-sm text-gray-600">
            {packedCount} of {totalCount} items packed ({Math.round(progressPercentage)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Packing Items by Category */}
      <div className="space-y-6">
        {Object.keys(groupedItems).sort().map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              {category} ({groupedItems[category].length})
            </h3>
            <div className="space-y-2">
              {groupedItems[category].map((item) => (
                <PackingItem
                  key={item.id}
                  item={item}
                  isLightPack={isLightPack}
                  onTogglePacked={() => {}} // No-op for export view
                  onRemoveCustomItem={undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Generated by PackWise ✈️ • {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};

export default ExportView; 