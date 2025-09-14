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
  const adClient = import.meta.env.VITE_AD_CLIENT;
  const adSlot = import.meta.env.VITE_AD_SLOT;

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
  
  // Don't show ads on localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return null;
  }

  return (
    <div style={{ margin: '10px 0', textAlign: 'center' }}>
      <ins 
        className="adsbygoogle"
        style={{ 
          display: 'block',
          maxWidth: '728px',
          width: '100%',
          height: '90px'
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseComponent;
