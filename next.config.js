/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Public environment variables (client-side accessible)
    // Note: NEVER put sensitive API keys here
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  // Vercel deployment ready
  images: {
    domains: [],
  },
}

module.exports = nextConfig 