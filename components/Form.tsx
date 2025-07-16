'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, PlayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePackStore, ACTIVITIES } from '@/store/usePackStore';
import { fetchWeatherForecast } from '@/lib/weatherClient';
import { generatePackingList } from '@/lib/packingEngine';
import { format, addDays, isBefore, startOfToday } from 'date-fns';

const Form = () => {
  const {
    destination,
    startDate,
    endDate,
    selectedActivities,
    setDestination,
    setStartDate,
    setEndDate,
    toggleActivity,
    setWeatherData,
    setPackingList,
    addAISuggestions,
    setLoading,
    setLoadingAI,
    setError,
    isLoading,
    isLoadingAI
  } = usePackStore();

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const today = startOfToday();
  const minEndDate = startDate ? addDays(startDate, 1) : addDays(today, 1);
  const maxDate = addDays(today, 30); // Limit to 30 days from today

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDestinationChange = useCallback(async (value: string) => {
    setDestination(value);
    setSelectedSuggestionIndex(-1);
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoadingSuggestions(false);
      return;
    }

    // Debounce the search
    const timeout = setTimeout(async () => {
      setIsLoadingSuggestions(true);
      try {
        const { searchCities } = await import('@/lib/weatherClient');
        const cities = await searchCities(value);
        setSuggestions(cities);
        setShowSuggestions(cities.length > 0);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 300); // 300ms debounce

    setSearchTimeout(timeout);
  }, [setDestination, searchTimeout]);

  const handleSuggestionClick = (city: string) => {
    setDestination(city);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleStartDateChange = (date: string) => {
    const newStartDate = new Date(date);
    
    // Validate date is within 30-day range
    if (newStartDate > maxDate) {
      setError('We currently support weather-based suggestions only for trips within 30 days from today.');
      return;
    }
    
    setStartDate(newStartDate);
    setError(null); // Clear any previous error
    
    // Adjust end date if it's before the new start date
    if (endDate && isBefore(endDate, addDays(newStartDate, 1))) {
      setEndDate(addDays(newStartDate, 1));
    }
  };

  const handleEndDateChange = (date: string) => {
    const newEndDate = new Date(date);
    
    // Validate date is within 30-day range
    if (newEndDate > maxDate) {
      setError('We currently support weather-based suggestions only for trips within 30 days from today.');
      return;
    }
    
    setEndDate(newEndDate);
    setError(null); // Clear any previous error
  };

  // Helper function to convert PackingItem[] to base list format for AI
  const convertPackingListToBaseList = (items: any[]) => {
    const baseList = {
      clothing: [] as string[],
      accessories: [] as string[],
      optional: [] as string[]
    };

    items.forEach(item => {
      if (item.isAISuggestion) return; // Skip AI suggestions from base list
      
      const category = item.category.toLowerCase();
      if (category.includes('clothing') || category.includes('shirt') || category.includes('pants') || 
          category.includes('dress') || category.includes('jacket') || category.includes('shoe')) {
        baseList.clothing.push(item.name);
      } else if (category.includes('electronics') || category.includes('accessories') || 
                 category.includes('personal') || category.includes('documents')) {
        baseList.accessories.push(item.name);
      } else {
        baseList.optional.push(item.name);
      }
    });

    return baseList;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination || !startDate || !endDate) {
      setError('Please fill in all required fields');
      return;
    }

    if (selectedActivities.length === 0) {
      setError('Please select at least one activity');
      return;
    }

    // Validate dates are within 30-day range
    if (startDate > maxDate || endDate > maxDate) {
      setError('We currently support weather-based suggestions only for trips within 30 days from today.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch weather data with travel dates for accurate forecasting
      const weatherData = await fetchWeatherForecast(destination, startDate, endDate);
      setWeatherData(weatherData);

      // Generate base packing list
      const basePackingList = generatePackingList(weatherData, selectedActivities);
      setPackingList(basePackingList);

      // Get AI suggestions with full trip context
      if (selectedActivities.length > 0) {
        setLoadingAI(true);
        try {
          // Convert base packing list to format expected by AI
          const baseList = convertPackingListToBaseList(basePackingList);
          
          const response = await fetch('/api/ai-suggestions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              destination: destination.trim(),
              startDate: startDate.toISOString().split('T')[0],
              endDate: endDate.toISOString().split('T')[0],
              activities: selectedActivities.map(activity => activity.name),
              baseList
            }),
          });

          if (response.ok) {
            const aiSuggestions = await response.json();
            
            // Convert AI suggestions to PackingItem format
            const suggestionItems = [
              ...aiSuggestions.clothing.map((item: string, index: number) => ({
                id: `ai-clothing-${Date.now()}-${index}`,
                name: item,
                category: 'AI Clothing',
                isPacked: false,
                isCustom: false,
                isAISuggestion: true,
                quantity: { light: 1, full: 1 }
              })),
              ...aiSuggestions.accessories.map((item: string, index: number) => ({
                id: `ai-accessories-${Date.now()}-${index}`,
                name: item,
                category: 'AI Accessories',
                isPacked: false,
                isCustom: false,
                isAISuggestion: true,
                quantity: { light: 1, full: 1 }
              })),
              ...aiSuggestions.optional.map((item: string, index: number) => ({
                id: `ai-optional-${Date.now()}-${index}`,
                name: item,
                category: 'AI Optional',
                isPacked: false,
                isCustom: false,
                isAISuggestion: true,
                quantity: { light: 1, full: 1 }
              }))
            ];

            // Add AI suggestions to the packing list
            if (suggestionItems.length > 0) {
              addAISuggestions(suggestionItems);
            }
          } else {
            console.warn('AI suggestions failed, continuing without them');
            // Handle specific error cases
            const errorData = await response.json();
            
            if (response.status === 429) {
              // Rate limit exceeded - show user-friendly message
              setError('Whoa there! Too many requests. Please wait a minute before trying again.');
              setTimeout(() => setError(null), 30000); // Show for 30 seconds to give user time to wait
            } else if (errorData.error !== 'AI service not configured') {
              setError('Couldn\'t fetch smart suggestions. You can still use weather-based packing.');
              setTimeout(() => setError(null), 3000);
            }
          }
        } catch (aiError) {
          console.warn('AI suggestions error:', aiError);
          // Don't show error to user - AI is optional
        } finally {
          setLoadingAI(false);
        }
      }

      // Scroll to results section
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate packing list');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = destination && startDate && endDate && selectedActivities.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Plan Your Perfect Trip
        </h2>
        <p className="text-gray-600 text-lg">
          Tell us where you're going and what you'll do - we'll create a smart packing list just for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Input with Enhanced Autocomplete */}
        <div className="relative">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
            <MapPinIcon className="w-5 h-5 inline mr-2" />
            Where are you going?
          </label>
          <div className="relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                placeholder="Enter city name (e.g., Paris, New York, Tokyo)"
                className="input-field pr-10"
                autoComplete="off"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {isLoadingSuggestions ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
                ) : (
                  <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
            
            {showSuggestions && (suggestions.length > 0 || isLoadingSuggestions) && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto"
              >
                {isLoadingSuggestions && suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent mr-2"></div>
                    Searching cities...
                  </div>
                ) : (
                  suggestions.map((city, index) => (
                    <motion.button
                      key={`${city}-${index}`}
                      type="button"
                      onClick={() => handleSuggestionClick(city)}
                      className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors border-none bg-transparent cursor-pointer flex items-center ${
                        index === selectedSuggestionIndex ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                      } ${index !== suggestions.length - 1 ? 'border-b border-gray-100' : ''}`}
                      whileHover={{ backgroundColor: 'rgba(249, 168, 37, 0.05)' }}
                    >
                      <MapPinIcon className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="font-medium">{city}</span>
                    </motion.button>
                  ))
                )}
              </motion.div>
            )}
          </div>
          
          {/* Helper text */}
          <p className="mt-1 text-xs text-gray-500">
            Start typing to search for cities worldwide
          </p>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="w-5 h-5 inline mr-2" />
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => handleStartDateChange(e.target.value)}
              min={format(today, 'yyyy-MM-dd')}
              max={format(maxDate, 'yyyy-MM-dd')}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="w-5 h-5 inline mr-2" />
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => handleEndDateChange(e.target.value)}
              min={format(minEndDate, 'yyyy-MM-dd')}
              max={format(maxDate, 'yyyy-MM-dd')}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Activities Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            <PlayIcon className="w-5 h-5 inline mr-2" />
            What activities do you plan to do?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ACTIVITIES.map((activity) => {
              const isSelected = selectedActivities.some(a => a.id === activity.id);
              return (
                <motion.button
                  key={activity.id}
                  type="button"
                  onClick={() => toggleActivity(activity)}
                  className={`activity-pill ${isSelected ? 'selected' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-2">{activity.icon}</span>
                  <span className="text-sm font-medium">{activity.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="button-primary w-full py-3 text-lg font-semibold flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>
                {isLoadingAI ? 'Getting AI suggestions...' : 'Generating your packing list...'}
              </span>
            </>
          ) : (
            <>
              <span>🧳</span>
              <span>Create My Packing List</span>
            </>
          )}
        </motion.button>

        {/* Form Validation Message */}
        {!isFormValid && (destination || startDate || endDate || selectedActivities.length > 0) && (
          <div className="text-center text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            Please complete all fields and select at least one activity
          </div>
        )}
      </form>
    </div>
  );
};

export default Form; 