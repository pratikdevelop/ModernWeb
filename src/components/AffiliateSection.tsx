import React from 'react';
import { ExternalLink, Star, Server, Terminal, Sparkles, Send } from 'lucide-react';

export const AffiliateSection: React.FC = () => {
  const tools = [
    {
      id: 'vercel',
      name: 'Vercel Edge Platform',
      category: 'Production Hosting',
      icon: Server,
      rating: '4.9/5',
      badge: 'Official Host Partner',
      description: 'Zero-config global deployment for Next.js and Vite. Instant preview branches and edge KV storage.',
      perk: '$100 Cloud Inference Credit',
      link: 'https://vercel.com',
    },
    {
      id: 'cursor',
      name: 'Cursor AI IDE',
      category: 'Developer Workflow',
      icon: Terminal,
      rating: '4.9/5',
      badge: 'Editor Choice',
      description: 'The native AI code editor built to understand entire codebases, write tests, and refactor in seconds.',
      perk: '14-Day Free Pro Trial',
      link: 'https://cursor.com',
    },
    {
      id: 'resend',
      name: 'Resend Email API',
      category: 'Transactional API',
      icon: Send,
      rating: '4.8/5',
      badge: 'High Deliverability',
      description: 'Modern email API designed for React developers. Deliver beautiful marketing & transactional emails.',
      perk: '3,000 Free Emails / Month',
      link: 'https://resend.com',
    },
  ];

  return (
    <section id="recommended-tools" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D4AA] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Developer Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-kreon">
              Recommended Stack & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF8A65]">Partner Tools</span>
            </h2>
          </div>
          <p className="text-xs text-gray-400 max-w-sm">
            Hand-picked infrastructure we use and recommend for high-performance AI deployments. We may earn partner commissions at zero extra cost to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#FFD700]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#00D4AA]/15 text-[#00D4AA] text-[11px] font-bold">
                      {tool.badge}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#FFD700] font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{tool.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FFD700] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-kreon group-hover:text-[#FFD700] transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-[11px] text-gray-400">{tool.category}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-[#FFD700] font-semibold">{tool.perk}</span>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Visit Partner</span>
                    <ExternalLink className="w-3 h-3 text-[#FFD700]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
