import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseComponent = () => {
  const location = useLocation();
  const adClient = import.meta.env.VITE_AD_CLIENT || 'ca-pub-7435469707865207';
  const adSlot = import.meta.env.VITE_AD_SLOT || '3003658895';

  useEffect(() => {
    // Do nothing on homepage, localhost, or if no ad client/slot configured
    if (location.pathname === '/' || !adClient || !adSlot) return;
    
    // Don't load ads on localhost (Google doesn't allow it)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('AdSense: Skipping ads on localhost');
      return;
    }

    // Avoid adding script multiple times
    const existingScript = document.querySelector('script[data-ad-client]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.setAttribute('data-ad-client', adClient);
      document.head.appendChild(script);
    }

    // Load the ad slot only once per page load
    const adElement = document.querySelector('.adsbygoogle');
    if (adElement && !adElement.hasAttribute('data-adsbygoogle-status')) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdsbyGoogle error:', err);
      }
    }
  }, [location.pathname, adClient, adSlot]);

  // Hide on homepage, localhost, or if no ad client/slot configured
  if (location.pathname === '/' || !adClient || !adSlot) return null;
  
  // Show placeholder on localhost for development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-4">
        <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
          <div className="text-sm text-blue-600 mb-2">Advertisement Space (Development Mode)</div>
          <div className="bg-blue-100 rounded p-4 text-blue-800">
            <div className="text-lg font-semibold mb-2">AdSense Ad Placeholder</div>
            <div className="text-sm">728 x 90 Leaderboard</div>
            <div className="text-xs mt-2">This will show real ads in production</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <div className="text-sm text-gray-500 mb-2">Advertisement</div>
        <ins 
          className="adsbygoogle"
          style={{ 
            display: 'block',
            maxWidth: '728px',
            width: '100%',
            height: '90px',
            margin: '0 auto'
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AdSenseComponent;
