import React, { useState, useEffect, useRef } from 'react';
import { StatItem } from '../types';

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const statsData: StatItem[] = [
    { target: 2500, suffix: '+', label: 'Enterprise Clients', description: 'Global brands scaling on ModernWeb' },
    { target: 99.9, suffix: '%', label: 'Uptime Percentage', description: 'Zero single point of failure guarantee' },
    { target: 150, suffix: '+', label: 'AI Models Deployed', description: 'Fine-tuned vision & semantic engines' },
    { target: 1, suffix: '', label: 'Unified Platform', description: 'From visual design to live monetization' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            setCounts(
              statsData.map((s) => {
                if (s.target % 1 !== 0) {
                  return Number((s.target * easeProgress).toFixed(1));
                }
                return Math.round(s.target * easeProgress);
              })
            );

            if (step >= steps) {
              clearInterval(timer);
              setCounts(statsData.map((s) => s.target));
            }
          }, interval);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-r from-[#2D1B69] via-[#1A1A2E] to-[#2D1B69] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">Industry Leaders</span>
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Delivering mission-critical reliability, automated intelligence, and proven revenue outcomes at global scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-white/10 text-center hover:border-[#FFD700]/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-black font-kreon text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-white mb-2 group-hover:scale-105 transition-transform">
                {counts[idx]}
                {stat.suffix}
              </div>

              <h3 className="text-lg font-bold text-white font-kreon group-hover:text-[#FFD700] transition-colors">
                {stat.label}
              </h3>

              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
