import React, { useEffect } from 'react';

interface AdSenseScriptLoaderProps {
  clientId?: string;
  isConsentGranted: boolean;
}

export const AdSenseScriptLoader: React.FC<AdSenseScriptLoaderProps> = ({
  clientId,
  isConsentGranted,
}) => {
  useEffect(() => {
    if (!isConsentGranted) return;

    const resolvedClientId =
      clientId ||
      import.meta.env.VITE_ADSENSE_CLIENT_ID ||
      (typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_ADSENSE_CLIENT_ID : undefined);

    // If client ID is dummy or not configured yet, don't load script to prevent browser 400 errors
    if (!resolvedClientId || resolvedClientId.includes('0000000000000000')) {
      return;
    }

    const scriptId = 'google-adsense-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${resolvedClientId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount if needed
    };
  }, [clientId, isConsentGranted]);

  return null;
};
