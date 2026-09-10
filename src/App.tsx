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
import { LeadMagnetSection } from './components/LeadMagnetSection';
import { BlogSection } from './components/BlogSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { AffiliateSection } from './components/AffiliateSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdUnit } from './components/AdUnit';
import { ProModal } from './components/ProModal';
import { ConsentBanner, getStoredConsent } from './components/ConsentBanner';
import { AdSenseScriptLoader } from './components/AdSenseScriptLoader';
import { ParticlesBackground } from './components/ParticlesBackground';
import { KonamiEasterEgg } from './components/KonamiEasterEgg';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ConsentSettings } from './types';
import { initGoogleAnalytics, trackEvent } from './utils/analytics';

export default function App() {
  const [consent, setConsent] = useState<ConsentSettings | null>(() => getStoredConsent());
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proModalReason, setProModalReason] = useState<string | undefined>();
  const [remainingUses, setRemainingUses] = useState(5);
  const [interactionCount, setInteractionCount] = useState(0);
  const [hasTriggeredSoftPaywall, setHasTriggeredSoftPaywall] = useState(false);
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

  // Soft paywall: decreases remaining free actions and triggers modal after 4-5 interactions
  const handleAIInteraction = useCallback(() => {
    setInteractionCount((prevCount) => {
      const nextCount = prevCount + 1;
      setRemainingUses((prevRem) => Math.max(0, prevRem - 1));

      // Trigger soft paywall after 4-5 interactions
      if (nextCount >= 5 && !hasTriggeredSoftPaywall) {
        setHasTriggeredSoftPaywall(true);
        setTimeout(() => {
          handleOpenProModal(
            'You have reached the 5 free daily AI generations limit! Upgrade to Studio Pro for unlimited access, 4K exports, and a 100% ad-free experience.'
          );
        }, 700);
      }
      return nextCount;
    });
  }, [hasTriggeredSoftPaywall, handleOpenProModal]);

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

      {/* AD POSITION 1: Sticky Top Banner (Desktop Only) */}
      <AdUnit
        id="ad-unit-sticky-top"
        position="sticky-top"
        isConsentGranted={isMarketingAllowed}
        onUpgradeClick={() => handleOpenProModal('Go Ad-Free with Studio Pro')}
      />

      {/* Main Navigation (Sticky Header) */}
      <Navigation
        onOpenPro={() => handleOpenProModal('Upgrade to Pro for full ad-free access')}
        konamiActive={isRainbowMode}
      />

      {/* Main Page Landmark */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('features')}
          onTryDemoClick={() => scrollToSection('ai-studio')}
        />

        {/* AD POSITION 2: Between Hero and Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdUnit
            id="ad-unit-hero-features"
            position="hero-features"
            isConsentGranted={isMarketingAllowed}
            onUpgradeClick={() => handleOpenProModal('Remove banner advertisements with Pro')}
          />
        </div>

        {/* Features Section */}
        <Features />

        {/* Interactive Demo Section */}
        <DemoSection
          onInteraction={handleAIInteraction}
          onOpenPro={handleOpenProModal}
          isConsentGranted={isMarketingAllowed}
        />

        {/* AI Studio Section (Contains AD POSITION 3 inside after tools & AD POSITION 5 on desktop right sidebar) */}
        <AIStudioSection
          onInteraction={handleAIInteraction}
          onOpenPro={handleOpenProModal}
          isConsentGranted={isMarketingAllowed}
          remainingUses={remainingUses}
        />

        {/* AD POSITION 4: Between Demo and Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdUnit
            id="ad-unit-demo-stats"
            position="demo-stats"
            isConsentGranted={isMarketingAllowed}
            onUpgradeClick={() => handleOpenProModal('Remove banner advertisements with Pro')}
          />
        </div>

        {/* Statistics Section with Animated Counters */}
        <Stats />

        {/* High-Converting Email Lead Magnet */}
        <LeadMagnetSection />

        {/* Comprehensive Blog Section (4 In-Depth Articles for SEO & AdSense Approval) */}
        <BlogSection />

        {/* Verified Customer Testimonials */}
        <TestimonialsSection />

        {/* Accordion FAQ Section */}
        <FAQSection />

        {/* Recommended Stack & Partner Tools */}
        <AffiliateSection />

        {/* Contact Section (Contains AD POSITION 6: Above Contact Form) */}
        <ContactSection
          isConsentGranted={isMarketingAllowed}
          onOpenPro={() => handleOpenProModal('Enjoy an ad-free experience with Pro')}
        />
      </main>

      {/* Footer (Contains AD POSITION 7: Footer Banner) */}
      <Footer
        isConsentGranted={isMarketingAllowed}
        onOpenPro={() => handleOpenProModal('Upgrade to Pro')}
      />

      {/* Sticky Mobile CTA Bar ("Try AI Studio Free →") */}
      <StickyMobileBar onAction={() => scrollToSection('ai-studio')} />

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
