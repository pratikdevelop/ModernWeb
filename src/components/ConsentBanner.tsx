import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { ConsentSettings } from '../types';

interface ConsentBannerProps {
  onConsentChange: (consent: ConsentSettings) => void;
}

const STORAGE_KEY = 'modernweb_cookie_consent';

export function getStoredConsent(): ConsentSettings | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onConsentChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(true);

  useEffect(() => {
    const existing = getStoredConsent();
    if (existing) {
      onConsentChange(existing);
    } else {
      // Delay opening slightly for smoother initial load
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [onConsentChange]);

  const handleAcceptAll = () => {
    const consent: ConsentSettings = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    };
    saveAndNotify(consent);
  };

  const handleEssentialOnly = () => {
    const consent: ConsentSettings = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    };
    saveAndNotify(consent);
  };

  const handleSavePreferences = () => {
    const consent: ConsentSettings = {
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: Date.now(),
    };
    saveAndNotify(consent);
  };

  const saveAndNotify = (consent: ConsentSettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // ignore in incognito / restricted modes
    }
    onConsentChange(consent);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      id="cookie-consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-[#16213E]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-5 text-white animate-fade-in"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] text-[#FFD700] shadow-md flex-shrink-0">
          <Cookie className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-base text-white flex items-center gap-2">
            Privacy & Cookie Preferences
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-medium">
              GDPR / CCPA
            </span>
          </h3>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
            We respect your privacy. We use essential cookies to maintain system performance, alongside optional analytics and non-intrusive advertising partners (Google AdSense / Carbon) to support free platform tools.
          </p>
        </div>
      </div>

      {showPreferences && (
        <div className="my-3 pt-3 border-t border-white/10 space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div>
              <p className="font-medium text-white">Essential Platform Cookies</p>
              <p className="text-gray-400 text-[11px]">Necessary for website security & session state.</p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
              Always Active
            </span>
          </div>

          <label className="flex items-center justify-between p-2 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div>
              <p className="font-medium text-white">Analytics & Performance</p>
              <p className="text-gray-400 text-[11px]">Aggregated metrics to understand feature usage.</p>
            </div>
            <input
              type="checkbox"
              checked={analyticsAllowed}
              onChange={(e) => setAnalyticsAllowed(e.target.checked)}
              className="accent-[#FFD700] w-4 h-4 cursor-pointer rounded"
              aria-label="Allow analytics cookies"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div>
              <p className="font-medium text-white">Advertising & Sponsorships</p>
              <p className="text-gray-400 text-[11px]">Google AdSense & Carbon Ads network display.</p>
            </div>
            <input
              type="checkbox"
              checked={marketingAllowed}
              onChange={(e) => setMarketingAllowed(e.target.checked)}
              className="accent-[#FFD700] w-4 h-4 cursor-pointer rounded"
              aria-label="Allow advertising cookies"
            />
          </label>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 pt-2 border-t border-white/10">
        {!showPreferences ? (
          <>
            <button
              id="consent-accept-all-btn"
              onClick={handleAcceptAll}
              className="w-full sm:w-auto flex-1 py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Accept All
            </button>
            <button
              id="consent-essential-only-btn"
              onClick={handleEssentialOnly}
              className="w-full sm:w-auto py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-medium text-xs transition-colors"
            >
              Essential Only
            </button>
            <button
              id="consent-customize-btn"
              onClick={() => setShowPreferences(true)}
              className="py-2 px-2 text-gray-400 hover:text-white transition-colors"
              title="Customize Preferences"
              aria-label="Customize cookie preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex w-full items-center gap-2">
            <button
              id="consent-save-preferences-btn"
              onClick={handleSavePreferences}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#20B2AA] to-[#00D4AA] text-[#1A1A2E] font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Save Preferences
            </button>
            <button
              onClick={() => setShowPreferences(false)}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 text-xs transition-colors"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
