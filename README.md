# 🧳 PackWise - Smart Travel Packing Assistant

A modern, production-ready web application that generates personalized packing lists based on real weather forecasts and travel activities. Now with built-in monetization, security enhancements, and GDPR compliance.

## ✨ Features

### Core Features
- **Real Weather Integration**: Fetches 5-day weather forecasts from OpenWeatherMap API
- **AI-Powered Suggestions**: Smart packing recommendations using OpenRouter AI models
- **Activity-Based Recommendations**: Customized packing suggestions for beach, business, hiking, festivals, and more
- **Smart Pack Modes**: Toggle between "Light Pack" and "Full Pack" for different trip lengths
- **Interactive Checklist**: Check off items as you pack with progress tracking
- **Custom Items**: Add your own items to any packing list
- **Export & Sharing**: Multiple export options including PDF, screenshot, email, and social media sharing
- **PDF Generation**: Clean, printable PDFs with trip details and weather information
- **Screenshot Capture**: High-quality images perfect for social media sharing
- **Email Integration**: Send packing lists directly to your email with beautiful formatting
- **Social Sharing**: Share via WhatsApp, Telegram, Twitter, and Instagram
- **Responsive Design**: Beautiful UI that works on all devices
- **City Autocomplete**: Smart city search with suggestions
- **Rate Limiting**: Built-in API protection against abuse and spam

### Production Features 🚀
- **Monetization Ready**: Strategic Google AdSense integration with multiple ad placements
- **Security Enhanced**: API keys secured server-side, never exposed to browser
- **GDPR Compliant**: Cookie consent banner and comprehensive privacy policy
- **Do Not Track Support**: Respects user privacy preferences automatically
- **Ad-blocker Friendly**: Full functionality maintained even with ad blockers enabled
- **Mobile Optimized**: Non-intrusive sticky ads and responsive ad layout
- **SEO Optimized**: Proper meta tags and performance optimizations

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS with custom color palette
- **State Management**: Zustand for global state
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Heroicons
- **APIs**: 
  - OpenWeatherMap for real weather data
  - OpenRouter for AI-powered packing suggestions
- **Export Libraries**: jsPDF for PDF generation, html2canvas for screenshots
- **Email**: Nodemailer for secure email delivery
- **Notifications**: React Hot Toast for user feedback
- **Rate Limiting**: Upstash Redis with sliding window algorithm
- **TypeScript**: Full type safety throughout
- **Security**: Server-side API key handling, CORS protection

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed on your machine
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/slimhd/PackWise.git
   cd PackWise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```bash
   # Required: Weather API (Get free key from https://openweathermap.org/api)
   WEATHER_API_KEY=your_actual_openweathermap_api_key_here
   
   # Required: OpenRouter AI API (Get from https://openrouter.ai/)
   OPENROUTER_API_KEY=your_actual_openrouter_api_key_here
   OPENROUTER_MODEL=tngtech/deepseek-r1t2-chimera:free
   
   # Required: Upstash Redis for Rate Limiting (Get from https://upstash.com/)
   UPSTASH_REDIS_REST_URL=your_actual_upstash_redis_url_here
   UPSTASH_REDIS_REST_TOKEN=your_actual_upstash_redis_token_here
   
   # Optional: Google AdSense (Get from Google AdSense console)
   ADSENSE_CLIENT_ID=your_actual_adsense_client_id_here
   
   # Required: Site URL (Update for production)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   
   # Optional: Email Configuration (for sending packing lists via email)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_specific_password
   ```
   
   **🔒 Security Note**: All API keys and secrets are handled server-side only and never exposed to the browser. Only `NEXT_PUBLIC_SITE_URL` is exposed client-side for metadata purposes.
   
   **📧 Email Setup**: For email functionality, you'll need to configure an email service. Gmail users should use an app-specific password. See the email configuration section below for details.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 🚀 Deployment to Vercel (Recommended)

This application is optimized for zero-configuration deployment on Vercel:

### One-Click Deploy from GitHub

1. **Connect Repository**
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect this as a Next.js app

2. **Configure Environment Variables**
   
   In your Vercel dashboard, add these environment variables:
   
   **Required Variables:**
   ```bash
   WEATHER_API_KEY=your_openweathermap_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key  
   OPENROUTER_MODEL=tngtech/deepseek-r1t2-chimera:free
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
   ```
   
   **Optional Variables:**
   ```bash
   ADSENSE_CLIENT_ID=your_adsense_client_id
   ```

3. **Deploy**
   - Click "Deploy" in Vercel
   - Your app will be live at `https://your-app-name.vercel.app`
   - Automatic deployments on every Git push

### Setting Up Required Services

**OpenWeatherMap API:**
1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Get your free API key
3. Add as `WEATHER_API_KEY` in Vercel

**OpenRouter AI API:**
1. Sign up at [openrouter.ai](https://openrouter.ai/)
2. Get your API key
3. Add as `OPENROUTER_API_KEY` in Vercel

**Upstash Redis (Rate Limiting):**
1. Sign up at [upstash.com](https://upstash.com/) (free tier available)
2. Create a Redis database
3. Copy the REST URL and Token
4. Add as `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

### Other Deployment Platforms

For other platforms (Netlify, Railway, etc.):
1. Build the project: `npm run build`
2. Deploy the `.next` folder and `public` assets
3. Set all environment variables in your hosting platform
4. Ensure Node.js runtime is configured

### Production Checklist ✅
- [ ] All API keys configured as server-side environment variables
- [ ] Upstash Redis database created and configured
- [ ] OpenRouter AI API key obtained and set
- [ ] `NEXT_PUBLIC_SITE_URL` updated with production domain
- [ ] Email service configured (optional, for email sharing)
- [ ] Google AdSense account setup (optional)
- [ ] Privacy policy reviewed for your jurisdiction
- [ ] Custom domain configured (optional)
- [ ] Rate limiting tested and working
- [ ] Build process completes without errors

## 📤 Export & Sharing Features

PackWise now includes comprehensive export and sharing capabilities to help you save and share your packing lists:

### 🖨️ PDF Export
- **Clean Layout**: Professional PDF format with trip details and weather information
- **Print-Ready**: Optimized for printing with proper page breaks
- **Smart Formatting**: Items grouped by category with checkboxes and quantities
- **Weather Summary**: Includes 5-day weather forecast in the PDF
- **Progress Tracking**: Shows packing progress percentage
- **File Naming**: Automatic naming with destination and date

### 📸 Screenshot Export
- **High Quality**: 2x resolution for crisp images
- **Social Media Ready**: Perfect dimensions for sharing on platforms
- **Trip Overlay**: Destination and dates displayed as overlay
- **Watermark**: Includes PackWise branding
- **PNG Format**: Lossless quality for sharing

### 📧 Email Integration
- **Beautiful Templates**: HTML email with professional styling
- **Complete Information**: Includes weather, progress, and all items
- **AI Suggestions Highlighted**: Special formatting for AI-recommended items
- **Mobile Friendly**: Responsive email design
- **Secure Delivery**: Server-side email processing

### 📱 Social Media Sharing
- **WhatsApp**: Direct sharing with formatted message
- **Telegram**: Share with custom text and link
- **Twitter/X**: Tweet with hashtags and link
- **Instagram**: Copy shareable text to clipboard
- **Universal Link**: Copy direct link to your packing list

### 🔧 Email Configuration

To enable email functionality, configure your email service:

#### Gmail Setup (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Add to your environment variables:
   ```bash
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ```

#### Other Email Providers
For other providers (SendGrid, Mailgun, etc.), update the email configuration in `app/api/send-email/route.ts`:

```typescript
return nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

### 🎨 Customization

The export features are highly customizable:

- **PDF Styling**: Modify fonts, colors, and layout in `lib/pdfGenerator.ts`
- **Screenshot Options**: Adjust quality, dimensions, and overlays in `lib/screenshotGenerator.ts`
- **Email Templates**: Customize HTML templates in `app/api/send-email/route.ts`
- **Social Sharing**: Update share text and URLs in `components/ExportOptions.tsx`

## 📁 Project Structure

```
PackWise/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API routes
│   │   ├── weather/       # Secure weather API proxy
│   │   └── send-email/    # Email sending API
│   ├── privacy/           # Privacy policy page
│   ├── globals.css        # Global styles and TailwindCSS
│   ├── layout.tsx         # Root layout with ads and GDPR banner
│   └── page.tsx           # Main application page
├── components/            # Reusable React components
│   ├── Form.tsx          # Main input form
│   ├── PackingList.tsx   # Results and checklist
│   ├── PackingItem.tsx   # Individual item component
│   ├── ExportOptions.tsx # Export and sharing options
│   ├── ExportFormatToggle.tsx # Format selection toggle
│   ├── DownloadButton.tsx # Legacy export functionality
│   ├── AdSlot.tsx        # Reusable advertisement component
│   └── GDPRBanner.tsx    # Cookie consent banner
├── lib/                  # Utility functions and business logic
│   ├── weatherClient.ts  # Secure client-side weather service
│   ├── packingEngine.ts  # Core packing list generation
│   ├── pdfGenerator.ts   # PDF generation utility
│   └── screenshotGenerator.ts # Screenshot capture utility
├── store/                # State management
│   └── usePackStore.ts   # Zustand store definition
├── public/               # Static assets
└── README.md            # This file
```

## 🎯 How It Works

1. **User Input**: Users enter their destination, travel dates, and planned activities
2. **Weather Fetch**: App retrieves real 5-day forecast from OpenWeatherMap
3. **Smart Generation**: Packing engine analyzes weather + activities to suggest items
4. **Interactive List**: Users can check off items, add custom ones, and export the list

## 🔧 Core Logic

### Weather-Based Items
- **Cold Weather** (< 5°C): Winter coat, gloves, warm hat
- **Cool Weather** (5-15°C): Light jacket, sweater, scarf
- **Warm Weather** (> 20°C): Shorts, t-shirts, sunscreen
- **Rainy Conditions**: Umbrella, rain jacket, waterproof items

### Activity-Based Items
- **Beach**: Swimsuit, flip-flops, beach towel, sunscreen
- **Business**: Suit, dress shoes, ties, formal attire
- **Hiking**: Hiking boots, backpack, water bottle
- **Photography**: Camera, extra batteries, memory cards

## 🎨 Design Philosophy

- **Clean & Minimal**: Focus on functionality without clutter
- **Responsive First**: Mobile-friendly design that scales up
- **Accessible**: Semantic HTML, proper ARIA labels, keyboard navigation
- **Fast Loading**: Optimized images, code splitting, efficient API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Environment Variables

| Variable | Description | Required | Scope | Where to Get |
|----------|-------------|----------|-------|--------------|
| `WEATHER_API_KEY` | OpenWeatherMap API key | Yes | Server-side only | [openweathermap.org](https://openweathermap.org/api) |
| `OPENROUTER_API_KEY` | OpenRouter AI API key | Yes | Server-side only | [openrouter.ai](https://openrouter.ai/) |
| `OPENROUTER_MODEL` | AI model to use | Yes | Server-side only | Use: `tngtech/deepseek-r1t2-chimera:free` |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL | Yes | Server-side only | [upstash.com](https://upstash.com/) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST Token | Yes | Server-side only | [upstash.com](https://upstash.com/) |
| `NEXT_PUBLIC_SITE_URL` | Your site's URL | Yes | Client & Server | Your domain (e.g., `https://myapp.vercel.app`) |
| `ADSENSE_CLIENT_ID` | Google AdSense client ID | No | Server-side only | [Google AdSense](https://www.google.com/adsense/) |

**🔒 Security Notice**: Only `NEXT_PUBLIC_SITE_URL` is exposed to the client. All API keys and secrets are server-side only and never exposed to the browser.

## 🐛 Troubleshooting

### Common Issues

1. **"Weather API key is not configured"**
   - Ensure you've added `WEATHER_API_KEY` to `.env.local` (server-side only)
   - Restart the development server after adding environment variables

2. **"City not found"**
   - Check spelling of the city name
   - Try adding country code (e.g., "London, UK")

3. **Build errors**
   - Delete `.next` folder and `node_modules`
   - Run `npm install` again
   - Ensure all TypeScript errors are resolved

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Heroicons](https://heroicons.com/) for beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for styling system
- [Framer Motion](https://www.framer.com/motion/) for animations

---

**Made with ❤️ for travelers who want to pack smart!** 