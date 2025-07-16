import { PackingItem, WeatherData, Activity } from '@/store/usePackStore';

interface PackingTemplate {
  id: string;
  name: string;
  category: string;
  quantity: {
    light: number;
    full: number;
  };
  conditions?: {
    weather?: string[];
    activities?: string[];
    temperature?: {
      min?: number;
      max?: number;
    };
  };
}

// Base essential items that everyone needs
const ESSENTIAL_ITEMS: PackingTemplate[] = [
  { id: 'passport', name: 'Passport', category: 'Documents', quantity: { light: 1, full: 1 } },
  { id: 'phone-charger', name: 'Phone Charger', category: 'Electronics', quantity: { light: 1, full: 1 } },
  { id: 'underwear', name: 'Underwear', category: 'Clothing', quantity: { light: 3, full: 7 } },
  { id: 'socks', name: 'Socks', category: 'Clothing', quantity: { light: 3, full: 7 } },
  { id: 'toothbrush', name: 'Toothbrush', category: 'Toiletries', quantity: { light: 1, full: 1 } },
  { id: 'toothpaste', name: 'Toothpaste', category: 'Toiletries', quantity: { light: 1, full: 1 } },
  { id: 'deodorant', name: 'Deodorant', category: 'Toiletries', quantity: { light: 1, full: 1 } },
  { id: 'shampoo', name: 'Shampoo', category: 'Toiletries', quantity: { light: 1, full: 1 } },
  { id: 'medications', name: 'Medications', category: 'Health', quantity: { light: 1, full: 1 } },
];

// Weather-based items
const WEATHER_ITEMS: PackingTemplate[] = [
  {
    id: 'umbrella',
    name: 'Umbrella',
    category: 'Weather Protection',
    quantity: { light: 1, full: 1 },
    conditions: { weather: ['Rain', 'Drizzle', 'Thunderstorm'] }
  },
  {
    id: 'rain-jacket',
    name: 'Rain Jacket',
    category: 'Clothing',
    quantity: { light: 1, full: 1 },
    conditions: { weather: ['Rain', 'Drizzle', 'Thunderstorm'] }
  },
  {
    id: 'winter-coat',
    name: 'Winter Coat',
    category: 'Clothing',
    quantity: { light: 1, full: 1 },
    conditions: { temperature: { max: 5 } }
  },
  {
    id: 'warm-hat',
    name: 'Warm Hat',
    category: 'Accessories',
    quantity: { light: 1, full: 1 },
    conditions: { temperature: { max: 0 } }
  },
  {
    id: 'gloves',
    name: 'Gloves',
    category: 'Accessories',
    quantity: { light: 1, full: 1 },
    conditions: { temperature: { max: 0 } }
  },
  {
    id: 'scarf',
    name: 'Scarf',
    category: 'Accessories',
    quantity: { light: 1, full: 1 },
    conditions: { temperature: { max: 5 } }
  },
  {
    id: 'sunglasses',
    name: 'Sunglasses',
    category: 'Accessories',
    quantity: { light: 1, full: 1 },
    conditions: { weather: ['Clear'] }
  },
  {
    id: 'sunscreen',
    name: 'Sunscreen',
    category: 'Health',
    quantity: { light: 1, full: 1 },
    conditions: { weather: ['Clear'] }
  },
  {
    id: 'light-jacket',
    name: 'Light Jacket',
    category: 'Clothing',
    quantity: { light: 1, full: 1 },
    conditions: { temperature: { min: 10, max: 20 } }
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    category: 'Clothing',
    quantity: { light: 2, full: 5 },
    conditions: { temperature: { min: 15 } }
  },
  {
    id: 'sweater',
    name: 'Sweater',
    category: 'Clothing',
    quantity: { light: 1, full: 2 },
    conditions: { temperature: { max: 15 } }
  },
  {
    id: 'shorts',
    name: 'Shorts',
    category: 'Clothing',
    quantity: { light: 1, full: 3 },
    conditions: { temperature: { min: 20 } }
  },
  {
    id: 'long-pants',
    name: 'Long Pants',
    category: 'Clothing',
    quantity: { light: 1, full: 3 },
    conditions: { temperature: { max: 25 } }
  },
];

// Activity-based items
const ACTIVITY_ITEMS: PackingTemplate[] = [
  {
    id: 'swimsuit',
    name: 'Swimsuit',
    category: 'Clothing',
    quantity: { light: 1, full: 2 },
    conditions: { activities: ['beach'] }
  },
  {
    id: 'beach-towel',
    name: 'Beach Towel',
    category: 'Beach',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['beach'] }
  },
  {
    id: 'flip-flops',
    name: 'Flip Flops',
    category: 'Footwear',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['beach'] }
  },
  {
    id: 'business-suit',
    name: 'Business Suit',
    category: 'Clothing',
    quantity: { light: 1, full: 2 },
    conditions: { activities: ['business', 'formal'] }
  },
  {
    id: 'dress-shirt',
    name: 'Dress Shirt',
    category: 'Clothing',
    quantity: { light: 2, full: 5 },
    conditions: { activities: ['business', 'formal'] }
  },
  {
    id: 'tie',
    name: 'Tie',
    category: 'Accessories',
    quantity: { light: 1, full: 3 },
    conditions: { activities: ['business', 'formal'] }
  },
  {
    id: 'dress-shoes',
    name: 'Dress Shoes',
    category: 'Footwear',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['business', 'formal'] }
  },
  {
    id: 'hiking-boots',
    name: 'Hiking Boots',
    category: 'Footwear',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['hiking'] }
  },
  {
    id: 'hiking-backpack',
    name: 'Hiking Backpack',
    category: 'Gear',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['hiking'] }
  },
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    category: 'Gear',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['hiking'] }
  },
  {
    id: 'camera',
    name: 'Camera',
    category: 'Electronics',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['photography'] }
  },
  {
    id: 'camera-batteries',
    name: 'Camera Batteries',
    category: 'Electronics',
    quantity: { light: 2, full: 4 },
    conditions: { activities: ['photography'] }
  },
  {
    id: 'memory-cards',
    name: 'Memory Cards',
    category: 'Electronics',
    quantity: { light: 1, full: 2 },
    conditions: { activities: ['photography'] }
  },
  {
    id: 'comfortable-shoes',
    name: 'Comfortable Walking Shoes',
    category: 'Footwear',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['casual'] }
  },
  {
    id: 'festival-outfit',
    name: 'Festival Outfit',
    category: 'Clothing',
    quantity: { light: 1, full: 2 },
    conditions: { activities: ['festival'] }
  },
  {
    id: 'ski-gear',
    name: 'Ski Equipment',
    category: 'Sports',
    quantity: { light: 1, full: 1 },
    conditions: { activities: ['winter'] }
  },
  {
    id: 'thermal-underwear',
    name: 'Thermal Underwear',
    category: 'Clothing',
    quantity: { light: 2, full: 4 },
    conditions: { activities: ['winter'] }
  },
];

export function generatePackingList(
  weatherData: WeatherData,
  selectedActivities: Activity[]
): PackingItem[] {
  const packingItems: PackingItem[] = [];

  // Always include essential items
  ESSENTIAL_ITEMS.forEach(template => {
    packingItems.push(createPackingItem(template));
  });

  // Add weather-based items
  const weatherConditions = getWeatherConditions(weatherData);
  const temperatureRange = getTemperatureRange(weatherData);

  WEATHER_ITEMS.forEach(template => {
    if (shouldIncludeItem(template, weatherConditions, temperatureRange, selectedActivities)) {
      packingItems.push(createPackingItem(template));
    }
  });

  // Add activity-based items
  const activityIds = selectedActivities.map(a => a.id);
  
  ACTIVITY_ITEMS.forEach(template => {
    if (shouldIncludeItem(template, weatherConditions, temperatureRange, selectedActivities)) {
      packingItems.push(createPackingItem(template));
    }
  });

  // Remove duplicates and sort by category
  const uniqueItems = removeDuplicates(packingItems);
  return uniqueItems.sort((a, b) => a.category.localeCompare(b.category));
}

function createPackingItem(template: PackingTemplate): PackingItem {
  return {
    id: template.id,
    name: template.name,
    category: template.category,
    quantity: template.quantity,
    isPacked: false,
    isCustom: false,
  };
}

function getWeatherConditions(weatherData: WeatherData): string[] {
  const conditions = new Set<string>();
  weatherData.forecast.forEach(day => {
    conditions.add(day.main);
  });
  return Array.from(conditions);
}

function getTemperatureRange(weatherData: WeatherData): { min: number; max: number } {
  const temps = weatherData.forecast.flatMap(day => [day.temp_min, day.temp_max]);
  return {
    min: Math.min(...temps),
    max: Math.max(...temps)
  };
}

function shouldIncludeItem(
  template: PackingTemplate,
  weatherConditions: string[],
  temperatureRange: { min: number; max: number },
  selectedActivities: Activity[]
): boolean {
  const { conditions } = template;
  
  if (!conditions) return true;

  // Check weather conditions
  if (conditions.weather) {
    const hasMatchingWeather = conditions.weather.some(weather => 
      weatherConditions.includes(weather)
    );
    if (conditions.weather.length > 0 && !hasMatchingWeather) {
      return false;
    }
  }

  // Check temperature conditions
  if (conditions.temperature) {
    const { min: tempMin, max: tempMax } = conditions.temperature;
    if (tempMin !== undefined && temperatureRange.max < tempMin) {
      return false;
    }
    if (tempMax !== undefined && temperatureRange.min > tempMax) {
      return false;
    }
  }

  // Check activity conditions
  if (conditions.activities) {
    const activityIds = selectedActivities.map(a => a.id);
    const hasMatchingActivity = conditions.activities.some(activity => 
      activityIds.includes(activity)
    );
    if (conditions.activities.length > 0 && !hasMatchingActivity) {
      return false;
    }
  }

  return true;
}

function removeDuplicates(items: PackingItem[]): PackingItem[] {
  const seen = new Set<string>();
  return items.filter(item => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
}

export function exportPackingList(
  packingList: PackingItem[],
  destination: string,
  startDate: Date | null,
  endDate: Date | null,
  isLightPack: boolean
): string {
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let content = '🧳 PackWise - Travel Packing List\n';
  content += '=====================================\n\n';
  
  if (destination) {
    content += `📍 Destination: ${destination}\n`;
  }
  
  if (startDate && endDate) {
    content += `📅 Travel Dates: ${formatDate(startDate)} - ${formatDate(endDate)}\n`;
  }
  
  content += `📦 Pack Mode: ${isLightPack ? 'Light Pack' : 'Full Pack'}\n`;
  content += `📊 Generated: ${new Date().toLocaleDateString()}\n\n`;

  // Group items by category
  const groupedItems = packingList.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as { [key: string]: PackingItem[] });

  // Add items by category
  Object.keys(groupedItems).sort().forEach(category => {
    content += `${category.toUpperCase()}\n`;
    content += '-'.repeat(category.length) + '\n';
    
    groupedItems[category].forEach(item => {
      const quantity = isLightPack ? item.quantity.light : item.quantity.full;
      const checkbox = item.isPacked ? '✅' : '☐';
      const quantityText = quantity > 1 ? ` (${quantity})` : '';
      content += `${checkbox} ${item.name}${quantityText}\n`;
    });
    
    content += '\n';
  });

  content += '\n🌟 Have a wonderful trip!\n';
  content += 'Generated by PackWise - Smart Travel Packing Assistant\n';

  return content;
} 