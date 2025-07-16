'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SunIcon, 
  CloudIcon, 
  CloudArrowDownIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';
import { usePackStore } from '@/store/usePackStore';
import PackingItem from './PackingItem';
// import DownloadButton from './DownloadButton';

const PackingList = () => {
  const {
    weatherData,
    packingList,
    isLightPack,
    togglePackMode,
    toggleItemPacked,
    addCustomItem,
    removeCustomItem,
    reset
  } = usePackStore();

  const [customItemName, setCustomItemName] = useState('');
  const [customItemCategory, setCustomItemCategory] = useState('Personal');
  const [showAddItem, setShowAddItem] = useState(false);

  if (!weatherData || !packingList.length) {
    return null;
  }

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (customItemName.trim()) {
      addCustomItem(customItemName.trim(), customItemCategory);
      setCustomItemName('');
      setShowAddItem(false);
    }
  };

  // Group items by category and separate AI suggestions
  const aiSuggestions = packingList.filter(item => item.isAISuggestion);
  const regularItems = packingList.filter(item => !item.isAISuggestion);
  
  const groupedItems = regularItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as { [key: string]: typeof packingList });

  // Group AI suggestions by category
  const groupedAISuggestions = aiSuggestions.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as { [key: string]: typeof packingList });

  const packedCount = packingList.filter(item => item.isPacked).length;
  const totalCount = packingList.length;
  const progressPercentage = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <SunIcon className="w-5 h-5 text-yellow-500" />;
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        return <CloudArrowDownIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <CloudIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      id="results"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Your Smart Packing List
        </h2>
        <p className="text-gray-600">
          Tailored for {weatherData.city} • {isLightPack ? 'Light Pack' : 'Full Pack'} Mode
        </p>
      </div>

      {/* Weather Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CloudIcon className="w-6 h-6 mr-2 text-blue-500" />
          Weather Forecast
        </h3>
        <p className="text-gray-700 mb-4">{weatherData.summary}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-white rounded-lg p-3 shadow-sm"
            >
              <p className="text-xs text-gray-500 mb-1">
                {new Date(day.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.main)}
              </div>
              <p className="text-sm font-medium text-gray-900">
                {day.temp_max}°C / {day.temp_min}°C
              </p>
              <p className="text-xs text-gray-600 capitalize">
                {day.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={togglePackMode}
            className="flex items-center space-x-2 button-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            <span>{isLightPack ? 'Switch to Full Pack' : 'Switch to Light Pack'}</span>
          </motion.button>

          <motion.button
            onClick={() => setShowAddItem(!showAddItem)}
            className="flex items-center space-x-2 button-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Item</span>
          </motion.button>

          <motion.button
            onClick={reset}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>🔄</span>
            <span>Start New Trip</span>
          </motion.button>
        </div>

        {/* <DownloadButton /> */}
      </div>

      {/* Add Custom Item Form */}
      <AnimatePresence>
        {showAddItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <form onSubmit={handleAddCustomItem} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Add Custom Item</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={customItemName}
                  onChange={(e) => setCustomItemName(e.target.value)}
                  placeholder="Item name"
                  className="input-field"
                  required
                />
                <select
                  value={customItemCategory}
                  onChange={(e) => setCustomItemCategory(e.target.value)}
                  className="input-field"
                >
                  <option>Personal</option>
                  <option>Clothing</option>
                  <option>Electronics</option>
                  <option>Toiletries</option>
                  <option>Health</option>
                  <option>Documents</option>
                </select>
                <button
                  type="submit"
                  className="button-primary"
                >
                  Add Item
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Packing Progress
          </span>
          <span className="text-sm text-gray-600">
            {packedCount} of {totalCount} items
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* AI Smart Suggestions Section */}
      {aiSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200"
        >
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">🧠</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Additional AI Suggestions</h2>
              <p className="text-sm text-gray-600 flex items-center">
                <span className="mr-1">🤖</span>
                Personalized recommendations based on your complete trip context
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {Object.keys(groupedAISuggestions).sort().map((category) => (
              <div key={category} className="space-y-2">
                <h3 className="text-md font-semibold text-blue-900 flex items-center">
                  <span className="mr-2">✨</span>
                  {category.replace('AI ', '')} ({groupedAISuggestions[category].length})
                </h3>
                <div className="space-y-2 pl-4">
                  {groupedAISuggestions[category].map((item) => (
                    <PackingItem
                      key={item.id}
                      item={item}
                      isLightPack={isLightPack}
                      onTogglePacked={toggleItemPacked}
                      onRemoveCustomItem={removeCustomItem}
                    />
                  ))}
                </div>
              </div>
            ))}
            {aiSuggestions.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <p>🎯 Your packing list looks complete! No additional suggestions at this time.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Packing Items by Category */}
      <div className="space-y-6">
        {Object.keys(groupedItems).sort().map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              {category} ({groupedItems[category].length})
            </h3>
            <div className="space-y-2">
              {groupedItems[category].map((item) => (
                <PackingItem
                  key={item.id}
                  item={item}
                  isLightPack={isLightPack}
                  onTogglePacked={toggleItemPacked}
                  onRemoveCustomItem={item.isCustom ? removeCustomItem : undefined}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🌟 Ready for Your Adventure!
        </h3>
        <p className="text-gray-600">
          Your personalized packing list is ready. Don't forget to check the weather again before you leave!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PackingList; 