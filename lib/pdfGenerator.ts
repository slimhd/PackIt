import jsPDF from 'jspdf';
import { PackingItem, WeatherData } from '@/store/usePackStore';

interface GeneratePDFParams {
  packingList: PackingItem[];
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  isLightPack: boolean;
  weatherData: WeatherData | null;
}

// Utility function to clean text for PDF export
const cleanTextForPDF = (text: string): string => {
  return text
    .replace(/^&+\s*/, '') // Remove leading & symbols
    .replace(/[^\w\s.,!?()-]/g, '') // Keep only safe characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

export const generatePDF = async ({
  packingList,
  destination,
  startDate,
  endDate,
  isLightPack,
  weatherData
}: GeneratePDFParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Set proper font encoding and fallback
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(12);
      
      // Title
      doc.setFontSize(20);
      doc.setFont('Helvetica', 'bold');
      const cleanDestination = cleanTextForPDF(destination);
      let title = `Packing List for ${cleanDestination}`;
      if (startDate && endDate) {
        const startStr = startDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        const endStr = endDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        title += ` – ${startStr} to ${endStr}`;
      }
      doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Trip details
      doc.setFontSize(12);
      doc.setFont('Helvetica', 'normal');
      doc.text(`Pack Mode: ${isLightPack ? 'Light Pack' : 'Full Pack'}`, margin, yPosition);
      yPosition += 10;

      // Detailed Weather Forecast
      if (weatherData && weatherData.forecast.length > 0) {
        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.text('Trip Weather Forecast (Day by Day)', margin, yPosition);
        yPosition += 12;
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(10);
        
        weatherData.forecast.forEach((day, index) => {
          // Check if we need a new page
          if (yPosition > 250) {
            doc.addPage();
            yPosition = margin;
          }
          
          const date = new Date(day.date);
          const dateStr = date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          });
          
          // Get weather description (no emojis)
          let weatherDesc = cleanTextForPDF(day.description);
          switch (day.main.toLowerCase()) {
            case 'clear':
              weatherDesc = 'Clear';
              break;
            case 'rain':
              weatherDesc = 'Rain';
              break;
            case 'drizzle':
              weatherDesc = 'Light Rain';
              break;
            case 'thunderstorm':
              weatherDesc = 'Thunderstorm';
              break;
            case 'snow':
              weatherDesc = 'Snow';
              break;
            case 'clouds':
              weatherDesc = 'Cloudy';
              break;
            default:
              weatherDesc = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
          }
          
          const weatherLine = `${dateStr} — ${weatherDesc} — High: ${day.temp_max}°C, Low: ${day.temp_min}°C`;
          doc.text(weatherLine, margin, yPosition);
          yPosition += 8;
        });
        
        yPosition += 10; // Extra space after weather
      }

      // Packing progress
      const packedCount = packingList.filter(item => item.isPacked).length;
      const totalCount = packingList.length;
      const progressPercentage = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;
      
      doc.setFontSize(14);
      doc.setFont('Helvetica', 'bold');
      doc.text('Packing List', margin, yPosition);
      yPosition += 8;
      
      doc.setFontSize(11);
      doc.setFont('Helvetica', 'normal');
      doc.text(`Progress: ${packedCount}/${totalCount} items packed (${progressPercentage}%)`, margin, yPosition);
      yPosition += 12;

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
      Object.keys(groupedItems).sort().forEach((category) => {
        const items = groupedItems[category];
        
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = margin;
        }

        // Category header
        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.text(`${category} (${items.length})`, margin, yPosition);
        yPosition += 8;

        // Items in category
        doc.setFontSize(10);
        doc.setFont('Helvetica', 'normal');
        
        items.forEach((item) => {
          // Check if we need a new page
          if (yPosition > 270) {
            doc.addPage();
            yPosition = margin;
          }

          const quantity = isLightPack ? item.quantity.light : item.quantity.full;
          
          // Clean the item name using utility function
          const cleanItemName = cleanTextForPDF(item.name);
          
          // Use bullet point format
          const itemText = `• ${cleanItemName}${quantity > 1 ? ` (${quantity})` : ''}`;
          
          // Add AI suggestion indicator
          const fullText = item.isAISuggestion ? `${itemText} [AI]` : itemText;
          
          // Set font weight based on packed status
          if (item.isPacked) {
            doc.setFont('Helvetica', 'bold');
            doc.setTextColor(0, 128, 0); // Green color for packed items
          } else {
            doc.setFont('Helvetica', 'normal');
            doc.setTextColor(0, 0, 0); // Black color for unpacked items
          }
          
          doc.text(fullText, margin + 5, yPosition);
          yPosition += 6;
        });
        
        yPosition += 5; // Space between categories
      });

      // Footer
      doc.addPage();
      yPosition = margin;
      
      doc.setFontSize(12);
      doc.setFont('Helvetica', 'bold');
      doc.text('Generated by PackWise', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;
      
      doc.text('Visit packwise.app for more smart packing features', pageWidth / 2, yPosition, { align: 'center' });

      // Generate filename
      const safeDestination = destination.replace(/[^a-zA-Z0-9]/g, '_');
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `packing-list-${safeDestination}-${dateStr}.pdf`;

      // Save the PDF
      doc.save(filename);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}; 