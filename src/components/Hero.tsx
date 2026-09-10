import React from 'react';
import { ArrowRight, Sparkles, Play, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onTryDemoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onTryDemoClick }) => {
  return (
    <section
      id="home"
      role="banner"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Dynamic Animated Gradient Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#FFD700]/20 to-[#FF8A65]/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-gradient-to-br from-[#4A00E0]/30 to-[#8E2DE2]/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#20B2AA]/15 blur-3xl pointer-events-none" />

      {/* Floating Orbital Badges */}
      <div className="hidden lg:block absolute top-1/3 left-8 xl:left-24 p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl animate-float">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] flex items-center justify-center text-[#FFD700]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">4.8x Throughput</p>
            <p className="text-[10px] text-gray-400">Zero cold-start LLM edge</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-1/3 right-8 xl:right-24 p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#20B2AA] to-[#00D4AA] flex items-center justify-center text-[#1A1A2E]">
            <ShieldCheck className="w-5 h-5 font-black" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">SOC2 Type II</p>
            <p className="text-[10px] text-gray-400">Enterprise AI safety certified</p>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Shimmer Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-white mb-6 relative overflow-hidden shadow-lg">
          <span className="text-[#FFD700]">🚀</span>
          <span>The Future of Content is Here</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white font-kreon tracking-tight leading-[1.1] mb-6">
          The future of content is{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA] drop-shadow-sm">
            Human + AI
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          ModernWeb is the AI co-pilot for enterprise teams who want to build high-converting digital products. Tap into generative design systems, automated copy intelligence, and high-performance monetization.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#FFD700] text-[#1A1A2E] font-extrabold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 group"
          >
            <span>Explore Platform</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="hero-demo-btn"
            onClick={onTryDemoClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-[#FFD700] fill-current" />
            <span>Try Interactive Demo</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00D4AA]" /> 99.99% Enterprise Uptime
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFD700]" /> Google AdSense & Carbon Ready
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#20B2AA]" /> Next.js & TypeScript Native
          </span>
        </div>
      </div>
    </section>
  );
};
