/**
 * Analytics utility supporting Google Analytics 4 and Plausible
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // Safe console log in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${eventName}:`, params);
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(eventName, { props: params });
  }
}

export function initGoogleAnalytics(measurementId?: string) {
  if (typeof window === 'undefined' || !measurementId || measurementId.includes('XXXXX')) return;

  const existingScript = document.getElementById('ga-script');
  if (existingScript) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { anonymize_ip: true });
}
