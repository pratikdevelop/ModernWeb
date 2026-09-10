import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, ShieldAlert, Layers, ExternalLink, Box } from 'lucide-react';
import { AdNetwork, AdUnitPosition } from '../types';

interface AdUnitProps {
  id?: string;
  position: AdUnitPosition;
  slotId?: string;
  network?: AdNetwork;
  isConsentGranted?: boolean;
  onUpgradeClick?: () => void;
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  id,
  position,
  slotId,
  network = 'adsense',
  isConsentGranted = true,
  onUpgradeClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState<AdNetwork>(network);
  const [adPushed, setAdPushed] = useState(false);

  // Lazy loading using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' } // Load 200px before appearing on screen
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clientId =
    import.meta.env.VITE_ADSENSE_CLIENT_ID ||
    (typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_ADSENSE_CLIENT_ID : '');

  // Resolve slot ID based on exact placement
  const resolveSlot = () => {
    if (slotId) return slotId;
    switch (position) {
      case 'sticky-top':
        return import.meta.env.VITE_ADSENSE_SLOT_HEADER || '1234567890';
      case 'hero-features':
        return import.meta.env.VITE_ADSENSE_SLOT_HERO_FEATURES || '2345678901';
      case 'aistudio-after-tools':
        return import.meta.env.VITE_ADSENSE_SLOT_AISTUDIO_IN || '3456789012';
      case 'aistudio-sidebar':
        return import.meta.env.VITE_ADSENSE_SLOT_AISTUDIO_SIDEBAR || '4567890123';
      case 'demo-stats':
        return import.meta.env.VITE_ADSENSE_SLOT_DEMO_STATS || '5678901234';
      case 'pre-contact':
        return import.meta.env.VITE_ADSENSE_SLOT_PRE_CONTACT || '6789012345';
      case 'footer':
        return import.meta.env.VITE_ADSENSE_SLOT_FOOTER || '7890123456';
      default:
        return '1234567890';
    }
  };

  const resolvedSlotId = resolveSlot();

  const isRealAdSenseConfigured =
    clientId &&
    !clientId.includes('0000000000000000') &&
    !resolvedSlotId.includes('1234567890');

  // Push to AdSense queue once visible and consent granted
  useEffect(() => {
    if (
      isIntersecting &&
      isConsentGranted &&
      activeNetwork === 'adsense' &&
      isRealAdSenseConfigured &&
      !adPushed
    ) {
      try {
        // @ts-expect-error window.adsbygoogle
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // @ts-expect-error push ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdPushed(true);
        }
      } catch (err) {
        console.warn('AdSense push error:', err);
      }
    }
  }, [isIntersecting, isConsentGranted, activeNetwork, isRealAdSenseConfigured, adPushed]);

  if (isDismissed) return null;

  // 1. Sticky Top Banner (Desktop Only)
  if (position === 'sticky-top') {
    return (
      <aside
        id={id || 'ad-unit-sticky-top'}
        ref={containerRef}
        aria-label="Sponsored Announcement Header"
        className={`hidden md:block w-full bg-gradient-to-r from-[#2D1B69] via-[#1A1A2E] to-[#2D1B69] border-b border-white/10 px-4 py-2 relative z-40 text-xs text-gray-300 transition-all ${className}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-bold text-[10px] tracking-wider uppercase border border-[#FFD700]/30">
              Sponsored
            </span>
            <span className="text-white font-medium">
              Accelerate your AI stack with Cloud Engine Pro.
            </span>
            <span className="text-gray-400">
              High-throughput GPU inference with 99.99% SLA.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://modernweb.ai/sponsor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#00D4AA] hover:text-[#FFD700] transition-colors font-semibold"
            >
              Learn More <ExternalLink className="w-3 h-3" />
            </a>

            {onUpgradeClick && (
              <button
                onClick={onUpgradeClick}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] text-[11px] font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3" /> Go Ad-Free
              </button>
            )}

            <button
              onClick={() => setIsDismissed(true)}
              aria-label="Dismiss banner"
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // 2. Desktop Sidebar Unit (Right side of AI Studio)
  if (position === 'aistudio-sidebar') {
    return (
      <aside
        id={id || 'ad-unit-aistudio-sidebar'}
        ref={containerRef}
        aria-label="Sidebar Advertisement"
        className={`hidden xl:flex flex-col w-[300px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-xl overflow-hidden self-start sticky top-28 ${className}`}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-black/30 border-b border-white/5 text-[10px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="uppercase tracking-wider font-semibold text-gray-400">Advertisement</span>
            <span>•</span>
            <span className="text-gray-300 capitalize font-mono-code">{activeNetwork}</span>
          </div>
          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="text-[#FFD700] hover:underline text-[10px] flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" /> Ad-Free
            </button>
          )}
        </div>

        <div className="p-4 flex flex-col items-center justify-center min-h-[320px]">
          {!isConsentGranted ? (
            <div className="text-center py-6 text-xs text-gray-400">
              <ShieldAlert className="w-6 h-6 mx-auto mb-2 text-amber-400" />
              <p className="font-semibold text-gray-200">Ad Paused by Cookie Consent</p>
              <p className="text-[11px] mt-1 text-gray-400">
                Grant marketing consent in the banner to view relevant tools.
              </p>
            </div>
          ) : activeNetwork === 'adsense' && isRealAdSenseConfigured ? (
            <div className="w-full text-center">
              <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '300px', height: '250px' }}
                data-ad-client={clientId}
                data-ad-slot={resolvedSlotId}
                data-ad-format="rectangle"
                data-full-width-responsive="false"
              />
            </div>
          ) : activeNetwork === 'carbon' ? (
            <div className="text-left w-full space-y-3">
              <div className="w-full h-32 rounded-xl bg-gradient-to-tr from-[#16213E] to-[#4A00E0] border border-white/10 flex flex-col items-center justify-center p-3 relative overflow-hidden">
                <Box className="w-8 h-8 text-[#FFD700] mb-2 animate-bounce" />
                <p className="text-xs font-bold text-white text-center">Cloud GPU Inference</p>
                <p className="text-[10px] text-gray-300 text-center">Fine-tune in 1-click</p>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-medium">
                Sub-50ms inference nodes for diffusion models and language pipelines.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-white/5">
                <a
                  href="https://modernweb.ai/sponsor/gpu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#00D4AA] hover:text-[#FFD700] font-semibold inline-flex items-center gap-1"
                >
                  Deploy Now <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[9px] text-gray-500 font-mono-code">Carbon</span>
              </div>
            </div>
          ) : (
            <div className="text-left w-full space-y-3">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#4A00E0]/30 to-[#8E2DE2]/20 border border-[#8E2DE2]/30 text-center">
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-[10px] font-bold uppercase tracking-wider mb-2">
                  Sponsored Partner
                </span>
                <h4 className="text-sm font-bold text-white">Full-Stack AI IDE</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Write, test, and ship complete TypeScript apps at 10x velocity.
                </p>
              </div>
              <a
                href="https://modernweb.ai/tools/ide"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-xs hover:brightness-110 transition-all text-center flex items-center justify-center gap-1.5 shadow-md"
              >
                Claim Free Credits <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-[9px] text-gray-500 text-center font-mono-code">
                Slot: {resolvedSlotId}
              </p>
            </div>
          )}
        </div>
      </aside>
    );
  }

  // 3. In-Feed & Responsive Horizontal Ad Units (Between Hero-Features, Inside AI Studio, Between Demo-Stats, Above Contact, Footer)
  return (
    <aside
      id={id || `ad-unit-${position}`}
      ref={containerRef}
      aria-label="Advertisement"
      className={`my-8 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg transition-all ${className}`}
    >
      {/* Top micro-bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-black/30 border-b border-white/5 text-[10px] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-widest font-semibold text-gray-400">Advertisement</span>
          <span className="text-gray-600">•</span>
          <span className="capitalize text-gray-300 font-mono-code">{activeNetwork}</span>
          <span className="text-gray-600">•</span>
          <span className="text-emerald-400 font-medium">Supported by ads</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Network switcher in preview mode */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 p-0.5 rounded">
            {(['adsense', 'carbon', 'medianet'] as AdNetwork[]).map((net) => (
              <button
                key={net}
                onClick={() => setActiveNetwork(net)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-medium transition-colors ${
                  activeNetwork === net
                    ? 'bg-[#FFD700]/20 text-[#FFD700]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {net === 'adsense' ? 'AdSense' : net === 'carbon' ? 'Carbon' : 'Media.net'}
              </button>
            ))}
          </div>

          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="text-[#FFD700] hover:underline text-[10px] flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-2.5 h-2.5" /> Go Ad-Free
            </button>
          )}
        </div>
      </div>

      {/* Ad Content */}
      <div className="p-4 sm:p-6 min-h-[110px] sm:min-h-[130px] flex items-center justify-center">
        {!isConsentGranted ? (
          <div className="text-center py-4 text-xs text-gray-400 max-w-md">
            <ShieldAlert className="w-5 h-5 mx-auto mb-1.5 text-amber-400" />
            <p className="font-medium text-gray-300">Advertising paused by consent preferences</p>
            <p className="text-[11px] mt-0.5">Enable advertising cookies in the banner to support free tools.</p>
          </div>
        ) : !isIntersecting ? (
          <div className="text-center text-xs text-gray-500 py-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-gray-500 border-t-transparent animate-spin" />
            <span>Lazy loading ad unit...</span>
          </div>
        ) : activeNetwork === 'adsense' && isRealAdSenseConfigured ? (
          <div className="w-full text-center">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={clientId}
              data-ad-slot={resolvedSlotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        ) : activeNetwork === 'carbon' ? (
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto text-left w-full">
            <div className="w-28 h-20 rounded-xl bg-gradient-to-tr from-[#4A00E0] to-[#20B2AA] p-0.5 flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-[#16213E] rounded-[10px] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-xs font-bold text-[#FFD700]">NextGen Cloud</span>
                <span className="text-[9px] text-gray-400 mt-0.5">Deploy in 3s</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">
                Ultra-low latency edge infrastructure for AI agents.
              </h4>
              <p className="text-xs text-gray-300 mt-1">
                Zero cold starts, global KV routing, and edge caching for Next.js & React engineers.
              </p>
              <div className="mt-2 flex items-center justify-between">
                <a
                  href="https://modernweb.ai/sponsor/carbon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#00D4AA] hover:text-[#FFD700] font-semibold inline-flex items-center gap-1"
                >
                  Claim $100 Credits <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[9px] text-gray-500 font-mono-code">Carbon Ads</span>
              </div>
            </div>
          </div>
        ) : activeNetwork === 'medianet' ? (
          <div className="w-full text-center py-2">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { tag: 'Enterprise Cloud AI', sub: 'Scalable GPU instances' },
                { tag: 'Full-Stack Next.js Hosting', sub: 'Instant preview deploys' },
                { tag: 'AI Studio Pro Tooling', sub: 'Zero-prompt code generators' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors text-left min-w-[200px]"
                >
                  <p className="text-xs font-semibold text-[#FFD700]">{item.tag}</p>
                  <p className="text-[11px] text-gray-400">{item.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-500 mt-2 font-mono-code">Media.net Contextual Ad Network</p>
          </div>
        ) : (
          /* High quality AdSense preview matching publisher guidelines */
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-2 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] flex items-center justify-center text-[#FFD700] shadow-md flex-shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Google AdSense Responsive Unit</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#FFD700] font-mono-code">
                    Slot {resolvedSlotId}
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-0.5">
                  Responsive banner ({position}). Clean ad placement adhering to Better Ads Standards.
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Set <code className="text-[#FFD700]">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> in production to activate live ad auctions.
                </p>
              </div>
            </div>

            <a
              href="https://adsense.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:brightness-110 text-white font-semibold text-xs transition-all shadow-md flex-shrink-0"
            >
              AdSense Console
            </a>
          </div>
        )}
      </div>
    </aside>
  );
};
