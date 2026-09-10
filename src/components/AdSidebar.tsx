import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, Box, ShieldAlert } from 'lucide-react';
import { AdNetwork } from '../types';

interface AdSidebarProps {
  id?: string;
  slotId?: string;
  isConsentGranted?: boolean;
  onUpgradeClick?: () => void;
  className?: string;
}

export const AdSidebar: React.FC<AdSidebarProps> = ({
  id = 'ad-sidebar-demo',
  slotId,
  isConsentGranted = true,
  onUpgradeClick,
  className = '',
}) => {
  const [activeNetwork, setActiveNetwork] = useState<AdNetwork>('adsense');

  const clientId =
    import.meta.env.VITE_ADSENSE_CLIENT_ID ||
    (typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_ADSENSE_CLIENT_ID : '');

  const resolvedSlotId =
    slotId ||
    import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR ||
    '3456789012';

  const isRealAdSenseConfigured =
    clientId && !clientId.includes('0000000000000000') && !resolvedSlotId.includes('3456789012');

  useEffect(() => {
    if (activeNetwork === 'adsense' && isRealAdSenseConfigured && isConsentGranted) {
      try {
        // @ts-expect-error window.adsbygoogle check
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // @ts-expect-error push ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.warn('AdSense sidebar push error:', err);
      }
    }
  }, [activeNetwork, isRealAdSenseConfigured, isConsentGranted]);

  return (
    <aside
      id={id}
      aria-label="Sidebar Advertisement"
      className={`hidden lg:flex flex-col w-[320px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-xl overflow-hidden self-start sticky top-28 ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-black/25 border-b border-white/5 text-[10px] text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="uppercase tracking-wider font-semibold text-gray-400">Sponsor</span>
          <span>•</span>
          <span className="text-gray-300 capitalize font-mono-code">{activeNetwork}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setActiveNetwork((prev) =>
                prev === 'adsense' ? 'carbon' : prev === 'carbon' ? 'affiliate' : 'adsense'
              )
            }
            className="text-[9px] text-[#FFD700] hover:underline"
            title="Switch display network"
          >
            Switch
          </button>
          {onUpgradeClick && (
            <button
              onClick={onUpgradeClick}
              className="text-gray-400 hover:text-white ml-1"
              title="Hide ads with Pro"
            >
              <Sparkles className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 flex flex-col items-center justify-center min-h-[340px]">
        {!isConsentGranted ? (
          <div className="text-center py-6 text-xs text-gray-400">
            <ShieldAlert className="w-6 h-6 mx-auto mb-2 text-amber-400" />
            <p className="font-semibold text-gray-200">Ad Blocked by Consent</p>
            <p className="text-[11px] mt-1 text-gray-400">
              Grant advertising consent to view relevant sponsor tools.
            </p>
          </div>
        ) : activeNetwork === 'adsense' && isRealAdSenseConfigured ? (
          <div className="w-full text-center">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={clientId}
              data-ad-slot={resolvedSlotId}
              data-ad-format="rectangle"
              data-full-width-responsive="false"
            />
          </div>
        ) : activeNetwork === 'carbon' ? (
          <div className="text-left w-full space-y-3">
            <div className="w-full h-36 rounded-xl bg-gradient-to-tr from-[#16213E] to-[#4A00E0] border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/40 text-[9px] text-[#FFD700] font-mono-code">
                300x250
              </div>
              <Box className="w-10 h-10 text-[#FFD700] mb-2 animate-bounce" />
              <p className="text-sm font-bold text-white text-center">Modern Cloud GPUs</p>
              <p className="text-[11px] text-gray-300 text-center">NVIDIA H100s on demand</p>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-medium">
              Run fine-tuned LLMs & diffusion pipelines in milliseconds with dedicated bare-metal nodes.
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
              <span className="text-[9px] text-gray-500 font-mono-code">Carbon Ads</span>
            </div>
          </div>
        ) : (
          /* Affiliate / Default Sponsor Preview */
          <div className="text-left w-full space-y-3">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#4A00E0]/30 to-[#8E2DE2]/20 border border-[#8E2DE2]/30 text-center">
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-[10px] font-bold uppercase tracking-wider mb-2">
                Recommended Tool
              </span>
              <h4 className="text-sm font-bold text-white">Full-Stack AI IDE</h4>
              <p className="text-xs text-gray-300 mt-1">
                Write, test, and ship complete Next.js and TypeScript apps at 10x velocity.
              </p>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]"></span>
                <span>Context-aware codebase chat</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]"></span>
                <span>Automated multi-file refactoring</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]"></span>
                <span>Instant Vercel / Cloud Run sync</span>
              </div>
            </div>

            <a
              href="https://modernweb.ai/tools/cursor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-xs hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-md mt-2"
            >
              Try Free with Credits <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <p className="text-[9px] text-gray-500 text-center font-mono-code pt-1">
              Google AdSense Ready Slot: {resolvedSlotId}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
