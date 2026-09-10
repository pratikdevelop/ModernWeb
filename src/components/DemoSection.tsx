import React, { useState } from 'react';
import { Sparkles, Palette, Zap, Check } from 'lucide-react';
import { AdSidebar } from './AdSidebar';

interface DemoSectionProps {
  onInteraction: () => void;
  onOpenPro: (reason?: string) => void;
  isConsentGranted: boolean;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const DemoSection: React.FC<DemoSectionProps> = ({
  onInteraction,
  onOpenPro,
  isConsentGranted,
}) => {
  const [color1, setColor1] = useState('#4A00E0');
  const [color2, setColor2] = useState('#8E2DE2');
  const [color3, setColor3] = useState('#FFD700');
  const [clicks, setClicks] = useState(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  const gradientString = `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;

  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    const newCount = clicks + 1;
    setClicks(newCount);
    onInteraction();
  };

  const handleCopyGradient = () => {
    navigator.clipboard.writeText(`background: ${gradientString};`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="demo" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Color Intelligence Demo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            Power Your End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">Creative Process</span>
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Experience the future of interactive design with our reactive color palette engine. Adjust the vectors, trigger tactile ripples, and watch real-time mathematical gradient interpolation.
          </p>
        </div>

        {/* Layout: Demo Interactive on left/center + AdSidebar on desktop right */}
        <div className="flex flex-col lg:flex-row items-start gap-8 justify-center">
          {/* Main Interactive Demo Container */}
          <div className="flex-1 w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-kreon flex items-center gap-2.5">
                  <Palette className="w-5 h-5 text-[#FFD700]" />
                  <span>Real-Time Shader Matrix</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Adjust color stops below or click the interactive card to trigger physical ripples.
                </p>
              </div>

              {/* Color pickers */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <label htmlFor="color-1-input" className="text-[10px] text-gray-400 font-bold mb-1">
                    PRIMARY
                  </label>
                  <input
                    id="color-1-input"
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    aria-label="Select primary gradient color"
                    className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white/20 bg-transparent hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <label htmlFor="color-2-input" className="text-[10px] text-gray-400 font-bold mb-1">
                    SECONDARY
                  </label>
                  <input
                    id="color-2-input"
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    aria-label="Select secondary gradient color"
                    className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white/20 bg-transparent hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <label htmlFor="color-3-input" className="text-[10px] text-gray-400 font-bold mb-1">
                    ACCENT
                  </label>
                  <input
                    id="color-3-input"
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    aria-label="Select accent gradient color"
                    className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white/20 bg-transparent hover:scale-110 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Demo Box */}
            <div className="my-8 flex flex-col items-center">
              <div
                id="demo-box"
                tabIndex={0}
                role="button"
                aria-label="Interactive AI-powered demo box - click to interact and generate ripples"
                onClick={handleBoxClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setClicks((c) => c + 1);
                    onInteraction();
                  }
                }}
                className="w-full max-w-md h-64 sm:h-72 rounded-3xl shadow-2xl relative overflow-hidden cursor-pointer select-none flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(255,215,0,0.3)] active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#FFD700]"
                style={{ background: gradientString }}
              >
                {/* Ripple elements */}
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/40 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ping"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 120,
                      height: 120,
                      animationDuration: '0.6s',
                    }}
                  />
                ))}

                <div className="p-4 rounded-2xl bg-black/35 backdrop-blur-md border border-white/20 text-white shadow-xl pointer-events-none group-hover:scale-105 transition-transform">
                  <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FFD700] mb-1">
                    <Zap className="w-3.5 h-3.5 fill-current" /> Tactile AI Canvas
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black font-kreon">
                    AI Magic ✨
                  </h4>
                  <p className="text-xs text-gray-200 mt-1">
                    Click to trigger kinetic feedback
                  </p>
                </div>

                <span className="absolute bottom-3 text-[11px] text-white/80 font-mono-code bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  Clicks: {clicks}
                </span>
              </div>
            </div>

            {/* Bottom Bar with Counter & Export */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">Interactive Session Active</span>
                <span className="text-gray-500">•</span>
                <span>{clicks} interactions registered</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  id="copy-css-gradient-btn"
                  onClick={handleCopyGradient}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />}
                  <span>{isCopied ? 'CSS Copied!' : 'Copy CSS'}</span>
                </button>

                <button
                  onClick={() => onOpenPro('Unlock 100+ procedural gradients and vector tokens in Pro.')}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold transition-all hover:brightness-110"
                >
                  Export All Tokens
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Right Sidebar Ad */}
          <AdSidebar
            id="ad-sidebar-demo"
            isConsentGranted={isConsentGranted}
            onUpgradeClick={() => onOpenPro('Remove all sidebar and header advertisements with Pro.')}
          />
        </div>
      </div>
    </section>
  );
};
