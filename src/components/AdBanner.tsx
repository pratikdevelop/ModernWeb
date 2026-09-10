import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sparkles, X, ShieldAlert, Layers } from 'lucide-react';
import { AdNetwork } from '../types';

interface AdBannerProps {
  id?: string;
  position: 'header' | 'in-article' | 'pre-contact' | 'footer';
  slotId?: string;
  network?: AdNetwork;
  isConsentGranted?: boolean;
  onUpgradeClick?: () => void;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  id,
  position,
  slotId,
  network = 'adsense',
  isConsentGranted = true,
  onUpgradeClick,
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState<AdNetwork>(network);
  const [adLoaded, setAdLoaded] = useState(false);

  const clientId =
    import.meta.env.VITE_ADSENSE_CLIENT_ID ||
    (typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_ADSENSE_CLIENT_ID : '');

  const resolvedSlotId =
    slotId ||
    (position === 'header'
      ? import.meta.env.VITE_ADSENSE_SLOT_HEADER
      : import.meta.env.VITE_ADSENSE_SLOT_INARTICLE) ||
    '1234567890';

  const isRealAdSenseConfigured =
    clientId && !clientId.includes('0000000000000000') && !resolvedSlotId.includes('1234567890');

  useEffect(() => {
    if (activeNetwork === 'adsense' && isRealAdSenseConfigured && isConsentGranted) {
      try {
        // @ts-expect-error window.adsbygoogle check
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // @ts-expect-error push ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        }
      } catch (err) {
        console.warn('AdSense push error:', err);
      }
    }
  }, [activeNetwork, isRealAdSenseConfigured, isConsentGranted]);

  if (isDismissed) return null;

  // Header sticky banner styles
  if (position === 'header') {
    return (
      <aside
        id={id || 'ad-banner-header'}
        aria-label="Sponsored Announcement Banner"
        className={`w-full bg-gradient-to-r from-[#2D1B69] via-[#1A1A2E] to-[#2D1B69] border-b border-white/10 px-4 py-2 relative z-40 text-xs text-gray-300 transition-all ${className}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] font-bold text-[10px] tracking-wider uppercase border border-[#FFD700]/30">
              Sponsor
            </span>
            <span className="text-white font-medium">
              Accelerate your AI stack with Cloud Engine Pro.
            </span>
            <span className="hidden sm:inline text-gray-400">
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
                className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] text-[11px] font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3" /> Remove Ads
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

  // Common wrapper for in-article, pre-contact, footer
  return (
    <aside
      id={id || `ad-banner-${position}`}
      ref={adRef}
      aria-label="Advertisement"
      className={`my-8 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg transition-all ${className}`}
    >
      {/* Top micro-bar with network indicator and switcher */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-black/20 border-b border-white/5 text-[10px] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-widest font-semibold text-gray-400">Advertisement</span>
          <span className="text-gray-600">•</span>
          <span className="capitalize text-gray-300 font-mono-code">{activeNetwork}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Network preview switcher */}
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
                title={`Preview ${net}`}
              >
                {net === 'adsense' ? 'AdSense' : net === 'carbon' ? 'Carbon' : 'Media.net'}
              </button>
            ))}
          </div>

          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="text-[#FFD700] hover:underline text-[10px] flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" /> Go Ad-Free
            </button>
          )}
        </div>
      </div>

      {/* Ad Body Content */}
      <div className="p-4 sm:p-6 min-h-[120px] sm:min-h-[140px] flex items-center justify-center">
        {!isConsentGranted ? (
          <div className="text-center py-4 text-xs text-gray-400 max-w-md">
            <ShieldAlert className="w-5 h-5 mx-auto mb-1.5 text-amber-400" />
            <p className="font-medium text-gray-300">Advertising paused by consent preferences</p>
            <p className="text-[11px] mt-0.5">Enable advertising cookies in the banner to support free tools.</p>
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
          /* Carbon Ads layout */
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto text-left w-full">
            <div className="w-32 h-24 rounded-xl bg-gradient-to-tr from-[#4A00E0] to-[#20B2AA] p-0.5 flex-shrink-0 flex items-center justify-center shadow-inner">
              <div className="w-full h-full bg-[#16213E] rounded-[10px] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-xs font-bold text-[#FFD700]">NextGen Cloud</span>
                <span className="text-[9px] text-gray-400 mt-0.5">Deploy in 3s</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">
                Ultra-low latency serverless infrastructure for AI agents.
              </h4>
              <p className="text-xs text-gray-300 mt-1">
                Zero cold starts, edge KV caching, and automated global DNS routing. Built specifically for TypeScript & Next.js engineers.
              </p>
              <div className="mt-2 flex items-center justify-between">
                <a
                  href="https://modernweb.ai/sponsor/carbon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#00D4AA] hover:text-[#FFD700] font-semibold inline-flex items-center gap-1"
                >
                  Claim $100 Cloud Credits <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[9px] text-gray-500 font-mono-code">Ads by Carbon</span>
              </div>
            </div>
          </div>
        ) : activeNetwork === 'medianet' ? (
          /* Media.net / Ezoic layout */
          <div className="w-full text-center py-2">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { tag: 'Enterprise Cloud AI', sub: 'Scalable GPU instances' },
                { tag: 'Full-Stack Next.js Hosting', sub: 'Instant preview deploys' },
                { tag: 'AI Studio Pro Tooling', sub: 'Zero-prompt code generators' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer text-left min-w-[200px]"
                >
                  <p className="text-xs font-semibold text-[#FFD700]">{item.tag}</p>
                  <p className="text-[11px] text-gray-400">{item.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-gray-500 mt-3 font-mono-code">Media.net Contextual Ad Network</p>
          </div>
        ) : (
          /* AdSense Preview placeholder (when credentials not in production yet) */
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-2 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] flex items-center justify-center text-[#FFD700] shadow-md flex-shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Google AdSense Placement</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-gray-300 font-mono-code">
                    Slot {resolvedSlotId}
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-0.5">
                  Responsive Leaderboard & In-Article Banner (728x90 / fluid auto-fill).
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Ready for live traffic. Configure <code className="text-[#FFD700]">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> in production to activate live bids.
                </p>
              </div>
            </div>

            <a
              href="https://adsense.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:brightness-110 text-white font-semibold text-xs transition-all shadow-md flex-shrink-0"
            >
              AdSense Portal
            </a>
          </div>
        )}
      </div>
    </aside>
  );
};
