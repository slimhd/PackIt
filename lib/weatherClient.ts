import { WeatherData } from '@/store/usePackStore';

export async function fetchWeatherForecast(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      
      throw new Error(errorData.error || 'Failed to fetch weather data');
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }
}

export async function searchCities(query: string): Promise<string[]> {
  if (query.length < 2) {
    return [];
  }

  try {
    const response = await fetch(`/api/weather?action=search&city=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      if (response.status === 429) {
        // Rate limit exceeded - return fewer demo suggestions
        return [
          'London, GB',
          'Paris, FR', 
          'New York, US'
        ].filter(city => city.toLowerCase().includes(query.toLowerCase()));
      }
      
      // Return demo cities if API fails
      const demoSuggestions = [
        'London, GB',
        'Paris, FR', 
        'New York, US',
        'Tokyo, JP',
        'Sydney, AU'
      ].filter(city => city.toLowerCase().includes(query.toLowerCase()));
      
      return demoSuggestions;
    }

    const cities = await response.json();
    return cities;
  } catch (error) {
    // Return demo cities on error
    return [
      'London, GB',
      'Paris, FR', 
      'New York, US'
    ].filter(city => city.toLowerCase().includes(query.toLowerCase()));
  }
} 