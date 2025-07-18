// Test utility for PDF generation
import { generatePDF } from './pdfGenerator';
import { PackingItem, WeatherData } from '@/store/usePackStore';

// Test data with various character types
const testPackingList: PackingItem[] = [
  {
    id: '1',
    name: 'T-Shirt (Clean & Simple)',
    category: 'Clothing',
    isPacked: false,
    isCustom: false,
    quantity: { light: 2, full: 3 }
  },
  {
    id: '2',
    name: 'Passport & Documents',
    category: 'Documents',
    isPacked: true,
    isCustom: false,
    quantity: { light: 1, full: 1 }
  },
  {
    id: '3',
    name: 'Charging Cable - USB-C',
    category: 'Electronics',
    isPacked: false,
    isCustom: false,
    quantity: { light: 1, full: 2 }
  },
  {
    id: '4',
    name: 'Sunscreen SPF 50+',
    category: 'Toiletries',
    isPacked: false,
    isCustom: false,
    isAISuggestion: true,
    quantity: { light: 1, full: 1 }
  }
];

const testWeatherData: WeatherData = {
  city: 'Paris, France',
  summary: 'Sunny with occasional clouds. High 22°C, Low 12°C. Perfect weather for sightseeing!',
  forecast: [
    {
      date: '2024-01-15',
      temp_min: 12,
      temp_max: 22,
      description: 'sunny',
      main: 'Clear',
      icon: '01d'
    }
  ]
};

export const testPDFGeneration = async () => {
  try {
    console.log('Testing PDF generation...');
    
    await generatePDF({
      packingList: testPackingList,
      destination: 'Paris, France',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-20'),
      isLightPack: true,
      weatherData: testWeatherData
    });
    
    console.log('✅ PDF generation test completed successfully!');
    console.log('📄 Check your downloads folder for: packing-list-Paris_France-2024-01-15.pdf');
    
  } catch (error) {
    console.error('❌ PDF generation test failed:', error);
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testPDFGeneration = testPDFGeneration;
} 