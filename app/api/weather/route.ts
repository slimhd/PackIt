import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from '@/lib/rate-limit';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

interface OpenWeatherResponse {
  list: {
    dt: number;
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
  };
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

    // Get 5-day forecast using coordinates
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!forecastResponse.ok) {
      if (forecastResponse.status === 401) {
        return NextResponse.json(
          { error: `API key unauthorized for weather forecast. Please check server configuration.` },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: `Failed to fetch weather forecast: ${forecastResponse.statusText}` },
        { status: forecastResponse.status }
      );
    }

    const forecastData: OpenWeatherResponse = await forecastResponse.json();

    // Process forecast data - group by day and get daily min/max
    const dailyForecasts = new Map();
    
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0]; // Get YYYY-MM-DD
      
      if (!dailyForecasts.has(date)) {
        dailyForecasts.set(date, {
          date,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          description: item.weather[0].description,
          main: item.weather[0].main,
          icon: item.weather[0].icon,
          conditions: [item.weather[0].main]
        });
      } else {
        const existing = dailyForecasts.get(date);
        existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
        existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
        if (!existing.conditions.includes(item.weather[0].main)) {
          existing.conditions.push(item.weather[0].main);
        }
      }
    });

    // Convert to array and take first 5 days
    const forecast = Array.from(dailyForecasts.values()).slice(0, 5);

    // Generate weather summary
    const minTemp = Math.min(...forecast.map(f => f.temp_min));
    const maxTemp = Math.max(...forecast.map(f => f.temp_max));
    
    const allConditions = new Set<string>();
    forecast.forEach(f => f.conditions.forEach((c: string) => allConditions.add(c)));
    
    const conditionText = generateConditionText(Array.from(allConditions));
    const summary = `Expect ${Math.round(minTemp)}°C - ${Math.round(maxTemp)}°C, ${conditionText}.`;

    const weatherData = {
      city: `${name}, ${country}`,
      forecast: forecast.map(f => ({
        date: f.date,
        temp_min: Math.round(f.temp_min),
        temp_max: Math.round(f.temp_max),
        description: f.description,
        main: f.main,
        icon: f.icon
      })),
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