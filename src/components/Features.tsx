import React from 'react';
import { Zap, Cpu, Sparkles, Activity, ShieldCheck, Layers } from 'lucide-react';

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: Zap,
      iconColor: 'from-[#FFD700] to-[#FF8A65]',
      title: 'Lightning Fast Performance',
      description:
        'Experience sub-millisecond interaction latency and instantaneous layout stabilization powered by modern bundling and zero-bloat state architectures.',
    },
    {
      icon: Cpu,
      iconColor: 'from-[#4A00E0] to-[#8E2DE2]',
      title: 'AI-Powered Intelligence',
      description:
        'Harness multimodal neural models to automate visual design token systems, synthesize semantic headlines, and generate contextual assets in real time.',
    },
    {
      icon: Sparkles,
      iconColor: 'from-[#20B2AA] to-[#00D4AA]',
      title: 'Modern Design System',
      description:
        'Engineered with strict WCAG AA contrast standards, fluid proportional spacing, dark aesthetic excellence, and mathematically balanced color palettes.',
    },
    {
      icon: Activity,
      iconColor: 'from-[#FF6B9D] to-[#FF8A65]',
      title: 'Real-time Interactions',
      description:
        'Micro-interactions that communicate tactile state changes: ripple animations, dynamic spring physics, and animated counter tickers that captivate users.',
    },
    {
      icon: Layers,
      iconColor: 'from-[#667eea] to-[#764ba2]',
      title: 'Modular & Extensible',
      description:
        'Every component is decoupled, fully typed in TypeScript, and production-ready for deployment to Vercel, Cloud Run, or custom container clusters.',
    },
    {
      icon: ShieldCheck,
      iconColor: 'from-[#00D4AA] to-[#20B2AA]',
      title: 'Enterprise Monetization',
      description:
        'Compliant Google AdSense and Carbon Ads integration with built-in GDPR cookie gating, responsive viewports, and high-conversion Pro paywall upgrade paths.',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">AI-Powered</span> Platform of Your Dreams
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Built from first principles for developers and modern product creators. High visual craftsmanship meets scalable monetization infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresList.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <article
                key={index}
                className="glass-card group relative p-8 rounded-3xl border border-white/10 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Glowing Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.iconColor} p-0.5 mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-[#16213E]/80 backdrop-blur-sm rounded-[14px] flex items-center justify-center text-[#FFD700]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-kreon group-hover:text-[#FFD700] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-[#00D4AA] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
