'use client';

import { useEffect, useState } from 'react';

interface AdSlotProps {
  slotId: string;
  type: 'banner' | 'sidebar' | 'inline' | 'sticky';
  desktopOnly?: boolean;
  mobileOnly?: boolean;
  className?: string;
}

const AdSlot = ({ slotId, type, desktopOnly, mobileOnly, className = '' }: AdSlotProps) => {
  const [isProduction, setIsProduction] = useState(false);
  const [doNotTrack, setDoNotTrack] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Check if we're in production and not on localhost
    const isProd = process.env.NODE_ENV === 'production' && 
                   typeof window !== 'undefined' && 
                   !window.location.hostname.includes('localhost');
    
    // Check for Do Not Track setting
    const dnt = navigator.doNotTrack === '1' || 
                navigator.doNotTrack === 'yes' || 
                (window as any).doNotTrack === '1';

    setIsProduction(isProd);
    setDoNotTrack(dnt);

    // Only load ads in production and if Do Not Track is not enabled
    if (isProd && !dnt) {
      // Simulate ad loading (replace with actual ad network integration)
      const timer = setTimeout(() => {
        setAdLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Don't render anything if desktop/mobile only constraints are not met
  if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 768;
    if (desktopOnly && isMobile) return null;
    if (mobileOnly && !isMobile) return null;
  }

  // Don't render ads if Do Not Track is enabled or not in production
  if (!isProduction || doNotTrack) {
    return null;
  }

  // Get dimensions based on ad type
  const getDimensions = () => {
    switch (type) {
      case 'banner':
        return 'h-24 w-full';
      case 'sidebar':
        return 'h-64 w-full max-w-xs';
      case 'inline':
        return 'h-32 w-full';
      case 'sticky':
        return 'h-16 w-full';
      default:
        return 'h-32 w-full';
    }
  };

  return (
    <div 
      className={`${getDimensions()} ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {adLoaded ? (
        <div 
          id={`ad-slot-${slotId}`}
          className="w-full h-full bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center"
        >
          {/* Placeholder for actual ad content */}
          <div className="text-gray-400 text-sm font-medium">
            Advertisement
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center animate-pulse">
          <div className="text-gray-300 text-sm">
            Ad loading...
          </div>
        </div>
      )}
    </div>
  );
};

export default AdSlot; 