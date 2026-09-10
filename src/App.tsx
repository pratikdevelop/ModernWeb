/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { DemoSection } from './components/DemoSection';
import { AIStudioSection } from './components/AIStudio/AIStudioSection';
import { Stats } from './components/Stats';
import { AffiliateSection } from './components/AffiliateSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';
import { ProModal } from './components/ProModal';
import { ConsentBanner, getStoredConsent } from './components/ConsentBanner';
import { AdSenseScriptLoader } from './components/AdSenseScriptLoader';
import { ParticlesBackground } from './components/ParticlesBackground';
import { KonamiEasterEgg } from './components/KonamiEasterEgg';
import { ConsentSettings } from './types';
import { initGoogleAnalytics, trackEvent } from './utils/analytics';

export default function App() {
  const [consent, setConsent] = useState<ConsentSettings | null>(() => getStoredConsent());
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proModalReason, setProModalReason] = useState<string | undefined>();
  const [interactionCount, setInteractionCount] = useState(0);
  const [hasTriggeredPaywall, setHasTriggeredPaywall] = useState(false);
  const [isRainbowMode, setIsRainbowMode] = useState(false);

  // Initialize analytics if consent granted
  useEffect(() => {
    if (consent?.analytics) {
      const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
      initGoogleAnalytics(gaId);
    }
  }, [consent]);

  const handleConsentChange = useCallback((newConsent: ConsentSettings) => {
    setConsent(newConsent);
    trackEvent('consent_updated', {
      analytics: newConsent.analytics,
      marketing: newConsent.marketing,
    });
  }, []);

  const handleOpenProModal = useCallback((reason?: string) => {
    setProModalReason(reason);
    setIsProModalOpen(true);
    trackEvent('open_pro_modal', { reason: reason || 'manual_click' });
  }, []);

  // Soft paywall handler: trigger after 2 interactions with AI demos
  const handleDemoInteraction = useCallback(() => {
    setInteractionCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 2 && !hasTriggeredPaywall) {
        setHasTriggeredPaywall(true);
        // Delay opening modal slightly so user sees their action result first
        setTimeout(() => {
          handleOpenProModal(
            'You have reached 2 free AI Studio actions! Upgrade to Pro for unlimited generative workflows and ad-free experience.'
          );
        }, 800);
      }
      return nextCount;
    });
  }, [hasTriggeredPaywall, handleOpenProModal]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const isMarketingAllowed = consent ? consent.marketing : false;

  return (
    <div className={`relative min-h-screen ambient-glow-bg ${isRainbowMode ? 'konami-rainbow' : ''}`}>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FFD700] focus:text-[#1A1A2E] focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Floating Canvas Particles */}
      <ParticlesBackground isRainbowMode={isRainbowMode} />

      {/* AdSense Global Script Loader (respects user GDPR consent) */}
      <AdSenseScriptLoader isConsentGranted={isMarketingAllowed} />

      {/* Sticky Header Sponsor Banner */}
      <AdBanner
        id="ad-banner-header-top"
        position="header"
        isConsentGranted={isMarketingAllowed}
        onUpgradeClick={() => handleOpenProModal('Go Ad-Free with Studio Pro')}
      />

      {/* Main Accessible Header / Navigation */}
      <Navigation
        onOpenPro={() => handleOpenProModal('Upgrade to Pro for full access')}
        konamiActive={isRainbowMode}
      />

      {/* Main Page Landmark */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('features')}
          onTryDemoClick={() => scrollToSection('demo')}
        />

        {/* Features Section */}
        <Features />

        {/* In-Article Responsive AdBanner between Features and Demo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner
            id="ad-banner-inarticle-features"
            position="in-article"
            isConsentGranted={isMarketingAllowed}
            onUpgradeClick={() => handleOpenProModal('Remove banner advertisements with Pro')}
          />
        </div>

        {/* Interactive Demo Section (with Desktop Sidebar Ad) */}
        <DemoSection
          onInteraction={handleDemoInteraction}
          onOpenPro={handleOpenProModal}
          isConsentGranted={isMarketingAllowed}
        />

        {/* AI Studio Section (Placed between Demo and Stats) */}
        <AIStudioSection
          onInteraction={handleDemoInteraction}
          onOpenPro={handleOpenProModal}
        />

        {/* Statistics Section with Animated Counters */}
        <Stats />

        {/* Affiliate-Ready Recommended Tools */}
        <AffiliateSection />

        {/* Contact Section (with Pre-Contact AdBanner inside) */}
        <ContactSection
          isConsentGranted={isMarketingAllowed}
          onOpenPro={() => handleOpenProModal('Enjoy an ad-free experience')}
        />
      </main>

      {/* Footer (with Footer Ad Unit) */}
      <Footer
        isConsentGranted={isMarketingAllowed}
        onOpenPro={() => handleOpenProModal('Upgrade to Pro')}
      />

      {/* Pro Upgrade / Soft Paywall Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        reason={proModalReason}
      />

      {/* GDPR / Cookiebot Consent Banner */}
      <ConsentBanner onConsentChange={handleConsentChange} />

      {/* Konami Code Easter Egg Listener */}
      <KonamiEasterEgg onActivate={setIsRainbowMode} />
    </div>
  );
}
