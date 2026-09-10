import React, { useState } from 'react';
import { Download, Sparkles, CheckCircle2, Mail, FileJson, Layers, Gift } from 'lucide-react';

export const LeadMagnetSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid work or personal email address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger automatic client-side file download of the real Pack JSON!
      const leadMagnetData = {
        title: 'ModernWeb AI Studio - Ultimate Creator Kit (2026 Edition)',
        license: 'Free Commercial Use',
        palettePacks: [
          {
            name: 'Cyber Sovereign',
            tokens: ['#1A1A2E', '#4A00E0', '#8E2DE2', '#FFD700', '#20B2AA'],
            wcagScore: 'AAA',
          },
          {
            name: 'Aurora Synthesis',
            tokens: ['#0B132B', '#1C2541', '#3A506B', '#5BC0BE', '#6FFFE9'],
            wcagScore: 'AAA',
          },
          {
            name: 'Solar Flare Luxury',
            tokens: ['#12100E', '#2B1E17', '#C44900', '#E55934', '#F4AFB4'],
            wcagScore: 'AA',
          },
          {
            name: 'Platinum Executive',
            tokens: ['#0A0F1D', '#1F2937', '#475569', '#38BDF8', '#F8FAFC'],
            wcagScore: 'AAA',
          },
        ],
        promptTemplates: [
          { category: 'SaaS Hero', prompt: 'Isometric enterprise 3D cloud dashboard, neon violet cables, frosted glass cards, studio lighting, octane render 8k' },
          { category: 'Cyberpunk Vision', prompt: 'Cybernetic humanoid software architect in glowing holographic cleanroom, raytracing, cinematic lighting' },
          { category: 'Minimalist Luxury', prompt: 'Swiss typography poster layout, deep obsidian background, solitary golden geometry, museum exhibition style' },
          { category: 'Vector Illustration', prompt: 'Modern flat tech vector of neural network nodes connecting global servers, clean lines, duotone purple and teal' },
          { category: 'Product Showcase', prompt: 'Floating sleek AI hardware device on volcanic sand pedestal, ambient twilight glow, commercial photography' },
        ],
        bonusTip: 'Import these CSS variables into your tailwind.config.js or globals.css for instant zero-config themes.',
      };

      const blob = new Blob([JSON.stringify(leadMagnetData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ModernWeb-Free-AI-Palette-Pack-and-50-Prompts.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <section id="lead-magnet" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#FFD700]/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#2D1B69]/60 via-[#1A1A2E]/80 to-[#16213E]/90">
          {/* Subtle background glow effect */}
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-[#4A00E0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side text */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 text-xs font-bold text-[#FFD700]">
                <Gift className="w-3.5 h-3.5" />
                <span>100% Free Developer & Designer Resource</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-kreon leading-tight">
                Download Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">AI Color Palette Pack</span> + 50 Prompt Templates
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                Elevate your next project with production-ready tokens, WCAG-certified dark/light harmonies, and hand-tested diffusion prompt recipes. Ready to import directly into React, Tailwind, and Figma.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  '12 Curated OKLCH Palette Tokens',
                  '50 Production-Tested Prompt Templates',
                  'Zero-Config Tailwind CSS Config Snippets',
                  'Commercial Royalty-Free License',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00D4AA] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side form card */}
            <div className="lg:col-span-5 w-full">
              <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 shadow-xl backdrop-blur-xl">
                {isSuccess ? (
                  <div className="text-center py-4 space-y-4 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                      <Download className="w-7 h-7 animate-bounce" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-kreon">
                      Download Triggered! 🎉
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Your free bundle (<code className="text-[#FFD700]">ModernWeb-Free-AI-Palette-Pack.json</code>) has been downloaded to your device.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      Download Again
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDownload} noValidate className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-1">
                      <FileJson className="w-4 h-4 text-[#FFD700]" />
                      <span>Instant JSON & Prompt Delivery</span>
                    </div>

                    <div>
                      <label htmlFor="lead-email" className="sr-only">
                        Business or Personal Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="lead-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="name@company.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
                        />
                      </div>
                      {error && (
                        <p className="mt-1.5 text-xs text-rose-400">{error}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#FFD700] text-[#1A1A2E] font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin" />
                          <span>Preparing Your Pack...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Get Instant Free Download</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-gray-400 text-center">
                      No credit card required. Instant file download. Strictly zero spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
