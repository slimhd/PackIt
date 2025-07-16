import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from '@/lib/rate-limit';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const PRO_BASE_URL = 'https://pro.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

interface OpenWeatherClimateResponse {
  cod: string;
  message: number;
  cnt: number;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
  list: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    speed: number;
    deg: number;
    gust?: number;
    clouds: number;
    pop?: number;
    rain?: number;
    snow?: number;
  }[];
}

function generateConditionText(conditions: string[]): string {
  const conditionMap: { [key: string]: string } = {
    'Clear': 'clear skies',
    'Clouds': 'cloudy conditions',
    'Rain': 'rain expected',
    'Drizzle': 'light rain possible',
    'Thunderstorm': 'thunderstorms possible',
    'Snow': 'snow expected',
    'Mist': 'misty conditions',
    'Fog': 'foggy conditions',
  };

  const mappedConditions = conditions.map(c => conditionMap[c] || c.toLowerCase());
  
  if (mappedConditions.length === 1) {
    return `mostly ${mappedConditions[0]}`;
  } else if (mappedConditions.length === 2) {
    return `${mappedConditions[0]} and ${mappedConditions[1]}`;
  } else {
    return `mixed conditions with ${mappedConditions.slice(0, -1).join(', ')} and ${mappedConditions[mappedConditions.length - 1]}`;
  }
}

export async function GET(request: NextRequest) {
  // Rate limiting check
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous";
  
  const { success, limit, remaining, reset } = await rateLimiter.limit(ip);
  
  if (!success) {
    return new Response(JSON.stringify({
      error: "Rate limit exceeded. Please try again shortly.",
    }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    });
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const action = searchParams.get('action');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Weather API key is not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    // Handle city search
    if (action === 'search') {
      if (!city || city.length < 2) {
        return NextResponse.json([]);
      }

      try {
        const response = await fetch(
          `${GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=5&appid=${API_KEY}`
        );

        if (!response.ok) {
          // Return demo cities if API fails
          const demoSuggestions = [
            'London, GB',
            'Paris, FR', 
            'New York, US',
            'Tokyo, JP',
            'Sydney, AU'
          ].filter(c => c.toLowerCase().includes(city.toLowerCase()));
          
          return NextResponse.json(demoSuggestions);
        }

        const data = await response.json();
        const cities = data.map((c: any) => `${c.name}, ${c.country}`);
        return NextResponse.json(cities);
      } catch (error) {
        // Return demo cities on error
        const demoSuggestions = [
          'London, GB',
          'Paris, FR', 
          'New York, US'
        ].filter(c => c.toLowerCase().includes(city.toLowerCase()));
        
        return NextResponse.json(demoSuggestions);
      }
    }

    // Handle weather forecast
    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    // Validate date range (max 30 days from today)
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (startDate) {
      const start = new Date(startDate);
      if (start > maxDate) {
        return NextResponse.json(
          { error: 'We currently support weather-based suggestions only for trips within 30 days from today.' },
          { status: 400 }
        );
      }
    }

    // First, get coordinates for the city using FREE geocoding API
    const geoResponse = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.ok) {
      if (geoResponse.status === 404) {
        return NextResponse.json(
          { error: `City "${city}" not found. Please check the spelling and try again.` },
          { status: 404 }
        );
      }
      if (geoResponse.status === 401) {
        return NextResponse.json(
          { error: `API key unauthorized. Please check server configuration.` },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: `Failed to find city: ${geoResponse.statusText}` },
        { status: geoResponse.status }
      );
    }

    const geoData = await geoResponse.json();
    
    if (!geoData || geoData.length === 0) {
      return NextResponse.json(
        { error: `City "${city}" not found. Please check the spelling and try again.` },
        { status: 404 }
      );
    }

    const { lat, lon, name, country } = geoData[0];

    // Get 30-day climate forecast using Pro API
    const forecastResponse = await fetch(
      `${PRO_BASE_URL}/forecast/climate?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=30`
    );

    if (!forecastResponse.ok) {
      if (forecastResponse.status === 401) {
        return NextResponse.json(
          { error: `API key unauthorized for 30-day climate forecast. Please check server configuration and ensure you have a Pro subscription.` },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: `Failed to fetch weather forecast: ${forecastResponse.statusText}` },
        { status: forecastResponse.status }
      );
    }

    const forecastData: OpenWeatherClimateResponse = await forecastResponse.json();

    // Process forecast data - convert to our format
    const forecast = forecastData.list.map(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0]; // Convert Unix timestamp to YYYY-MM-DD
      
      return {
        date,
        temp_min: Math.round(item.temp.min),
        temp_max: Math.round(item.temp.max),
        description: item.weather[0]?.description || 'No description',
        main: item.weather[0]?.main || 'Clear',
        icon: item.weather[0]?.icon || '01d'
      };
    });

    // Filter forecast for travel dates if provided
    let relevantForecast = forecast;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      relevantForecast = forecast.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
      
      // If no forecast data available for travel dates, use next available days
      if (relevantForecast.length === 0) {
        relevantForecast = forecast.slice(0, 5); // Take first 5 days as fallback
      }
    } else {
      // Default to first 5 days if no specific dates provided
      relevantForecast = forecast.slice(0, 5);
    }

    // Generate weather summary from relevant forecast data
    const minTemp = Math.min(...relevantForecast.map(f => f.temp_min));
    const maxTemp = Math.max(...relevantForecast.map(f => f.temp_max));
    
    const allConditions = new Set<string>();
    relevantForecast.forEach(f => allConditions.add(f.main));
    
    const conditionText = generateConditionText(Array.from(allConditions));
    const summary = `Expect ${minTemp}°C - ${maxTemp}°C, ${conditionText}.`;

    const weatherData = {
      city: `${name}, ${country}`,
      forecast: relevantForecast,
      summary
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data. Please try again.' },
      { status: 500 }
    );
  }
} 