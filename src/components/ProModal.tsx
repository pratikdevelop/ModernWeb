import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Check,
  X,
  Zap,
  Crown,
  Shield,
  ArrowRight,
  ShieldCheck,
  EyeOff,
  AlertCircle,
} from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose, reason }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSimulateCheckout = (planName: string) => {
    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div
      id="pro-paywall-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pro-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#16213E] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Glow ambient decoration */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#8E2DE2]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#FFD700]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {/* High-Contrast Pro Status Indicator */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFD700] text-[#12121C] text-xs font-black uppercase tracking-wider shadow-sm font-mono-code">
              <Crown className="w-3.5 h-3.5 fill-[#12121C]" />
              PRO STATUS
            </span>

            {/* Ad-Free Experience Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Ad-Free Experience
            </span>
          </div>

          <h2 id="pro-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-kreon">
            Upgrade to Pro:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">
              100% Ad-Free & Unlimited AI
            </span>
          </h2>

          <p className="text-sm text-gray-300 mt-2">
            {reason ||
              'Remove all 7 banner and sidebar advertisements, unlock unlimited AI generations, and experience lightning-fast speeds with zero distractions.'}
          </p>

          {/* Ad-Free Value Proposition Banner */}
          <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-[#1A1A2E] to-emerald-950/70 border border-emerald-500/35 flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <EyeOff className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    Zero Advertisements Guarantee
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-extrabold uppercase">
                    Ad-Free Experience
                  </span>
                </div>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  Removes all 7 banner, sticky, in-feed, and sidebar ad units across the entire app. Zero third-party trackers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-[11px] font-mono-code font-bold text-[#FFD700]">
                ⚡ 3x Faster Page Loads
              </span>
            </div>
          </div>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className={`text-xs font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              role="switch"
              aria-checked={isAnnual}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
                isAnnual ? 'bg-[#FFD700]' : 'bg-white/20'
              }`}
            >
              <div
                className={`bg-[#1A1A2E] w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-medium flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {checkoutSuccess ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Welcome to Studio Pro!</h3>
            <p className="text-sm text-gray-300 mt-1">
              Your license is now active. All advertisements are disabled and all creative AI tools are 100% unrestricted.
            </p>
          </div>
        ) : (
          /* Pricing Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Free Tier */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Community</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    <AlertCircle className="w-3 h-3 text-amber-400" /> Ad-Supported
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">Free Explorer</h3>
                <div className="mt-4 mb-3">
                  <span className="text-3xl font-black text-white">$0</span>
                  <span className="text-xs text-gray-400"> / forever</span>
                </div>

                {/* Ad-Supported Disclosure Box */}
                <div className="my-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                  <p className="text-[11px] text-amber-200/90 font-medium leading-snug">
                    Supported by 7 sponsor banner & sidebar units. Generative tokens limited to 5 daily uses.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Basic AI Color Intelligence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Standard resolution preview</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Community templates</span>
                  </li>
                  <li className="flex items-center gap-2 text-amber-300">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Contains banner & sidebar ads</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <X className="w-4 h-4 flex-shrink-0" />
                    <span>Daily 5-use generation cap</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
              >
                Continue with Ads (Free)
              </button>
            </div>

            {/* Pro Tier (Highlighted & Centerpiece) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#2D1B69] via-[#1E1B4B] to-[#16213E] border-2 border-[#FFD700] flex flex-col justify-between relative shadow-[0_0_35px_rgba(255,215,0,0.22)] transform md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#12121C] font-black text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Crown className="w-3 h-3 fill-[#12121C]" /> Most Popular Choice
              </div>

              <div>
                {/* Status Indicator & Ad-Free Badge Row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {/* High-Contrast Pro Status Indicator */}
                  <span
                    id="pro-status-indicator"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFD700] text-[#12121C] text-xs font-black uppercase tracking-wider shadow-md font-mono-code"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12121C] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12121C]"></span>
                    </span>
                    PRO STATUS
                  </span>

                  {/* Ad-Free Experience Badge */}
                  <span
                    id="pro-ad-free-badge"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/25 border border-emerald-400/60 text-emerald-300 text-xs font-extrabold tracking-tight shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Ad-Free Experience
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mt-1">Studio Pro</h3>
                <div className="mt-4 mb-3">
                  <span className="text-4xl font-black text-white">
                    ${isAnnual ? '24' : '29'}
                  </span>
                  <span className="text-xs text-gray-400"> / month</span>
                  {isAnnual && (
                    <span className="block text-[11px] text-emerald-400 font-medium mt-0.5">
                      Billed annually ($288/yr) • Save 20%
                    </span>
                  )}
                </div>

                {/* Ad-Removal Value Proposition Highlight */}
                <div className="my-3.5 p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 via-[#1A1A2E] to-emerald-950/50 border border-emerald-400/40">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300">
                      <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% Ad-Free Guarantee</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold bg-emerald-400/20 text-emerald-300">
                      0 ADS
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-200 leading-snug">
                    Instantly removes all 7 banner, sticky, in-feed, and sidebar ad units. Zero sponsor interruptions and 3x faster speeds.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-200">
                  <li className="flex items-center gap-2 p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-bold text-white">100% Ad-Free Experience (All 7 Units Removed)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span className="font-semibold text-white">Unlimited AI Prompt generations (Zero daily cap)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>4K High-Res exports & SVG vector download</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>Full AI copywriter with markdown / JSON export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>Priority GPU inference queue (&lt;300ms SLA)</span>
                  </li>
                </ul>
              </div>

              <button
                disabled={checkoutLoading}
                onClick={() => handleSimulateCheckout('Studio Pro')}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#12121C] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {checkoutLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#12121C] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-[#12121C]" />
                    <span>Upgrade to Pro — Remove Ads</span>
                  </>
                )}
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
              <div>
                {/* Status Indicator & Ad-Free Badge Row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-400 text-[#12121C] text-xs font-black uppercase tracking-wider font-mono-code">
                    ENTERPRISE
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Ad-Free Experience
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mt-1">Scale Team</h3>
                <div className="mt-4 mb-3">
                  <span className="text-3xl font-black text-white">
                    ${isAnnual ? '79' : '99'}
                  </span>
                  <span className="text-xs text-gray-400"> / month</span>
                </div>

                {/* Team Value Box */}
                <div className="my-3.5 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25">
                  <p className="text-[11px] text-cyan-200/90 font-medium leading-snug">
                    Complete ad-free access for up to 10 seats with centralized billing and dedicated enterprise support.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="font-semibold text-white">Everything in Pro for up to 10 seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Dedicated Gemini / Claude API keys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Custom brand guidelines & fine-tuning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>99.99% SLA guarantee & 24/7 support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSimulateCheckout('Scale Team')}
                className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1"
              >
                Contact Enterprise <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-bit SSL encrypted. Cancel anytime in 1-click.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <EyeOff className="w-3 h-3" /> All 7 ad placements removed
            </span>
            <span>•</span>
            <span>Money-back guarantee within 30 days.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
