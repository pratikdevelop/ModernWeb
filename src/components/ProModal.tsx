import React, { useState, useEffect } from 'react';
import { Sparkles, Check, X, Zap, Crown, Shield, ArrowRight } from 'lucide-react';

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
      <div className="relative w-full max-w-4xl bg-[#16213E] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
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
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFD700]/20 to-[#FF8A65]/20 border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5" /> ModernWeb Studio Pro
          </div>

          <h2 id="pro-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-kreon">
            Unlock Unlimited <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF8A65]">Creative AI Power</span>
          </h2>

          <p className="text-sm text-gray-300 mt-2">
            {reason ||
              'You hit the free preview interaction limit. Upgrade to Pro for zero ads, instant high-res generation, and dedicated API capacity.'}
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 mt-6">
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
            <h3 className="text-xl font-bold text-white">Welcome to Pro!</h3>
            <p className="text-sm text-gray-300 mt-1">
              Your license has been unlocked. Ads are disabled and all AI tools are now unrestricted.
            </p>
          </div>
        ) : (
          /* Pricing Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Free Tier */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Community</span>
                <h3 className="text-xl font-bold text-white mt-1">Free Explorer</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-black text-white">$0</span>
                  <span className="text-xs text-gray-400"> / forever</span>
                </div>
                <ul className="space-y-3 text-xs text-gray-300">
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
                  <li className="flex items-center gap-2 text-gray-500">
                    <X className="w-4 h-4 flex-shrink-0" />
                    <span>Supported by non-intrusive ads</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
              >
                Continue Free
              </button>
            </div>

            {/* Pro Tier (Highlighted) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#2D1B69] to-[#1A1A2E] border-2 border-[#FFD700] flex flex-col justify-between relative shadow-xl transform md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-[10px] uppercase tracking-wider shadow">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-wider">Creator & Dev</span>
                <h3 className="text-xl font-bold text-white mt-1">Studio Pro</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-white">
                    ${isAnnual ? '24' : '29'}
                  </span>
                  <span className="text-xs text-gray-400"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-gray-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span className="font-semibold text-white">100% Ad-Free Experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>Unlimited AI Prompt generations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>4K High-Res exports & SVG download</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>Full AI copywriter with markdown export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                    <span>Priority GPU inference queue</span>
                  </li>
                </ul>
              </div>

              <button
                disabled={checkoutLoading}
                onClick={() => handleSimulateCheckout('Studio Pro')}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-extrabold text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5"
              >
                {checkoutLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" /> Start 14-Day Free Trial
                  </>
                )}
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Enterprise</span>
                <h3 className="text-xl font-bold text-white mt-1">Scale Team</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-black text-white">
                    ${isAnnual ? '79' : '99'}
                  </span>
                  <span className="text-xs text-gray-400"> / month</span>
                </div>
                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Everything in Pro for up to 10 seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Dedicated Gemini / Claude API Keys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Custom brand guidelines & fine-tuning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>SLA guarantee & 24/7 dedicated support</span>
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
          <span>Money-back guarantee within 30 days.</span>
        </div>
      </div>
    </div>
  );
};
