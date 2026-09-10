import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQItem } from '../types';

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Is ModernWeb AI Studio free to use?',
    answer:
      'Yes! ModernWeb provides an ad-supported Free tier that gives you 5 daily generations across all AI tools (Palette AI, Text-to-Image Lab, and Copywriter Engine). For power creators who require unlimited generations, instant exports, and an entirely ad-free experience, we offer an affordable Studio Pro plan.',
  },
  {
    id: 'faq-2',
    category: 'Licensing',
    question: 'Can I use generated color palettes, copy, and images commercially?',
    answer:
      'Absolutely. All generated design tokens, copy assets, and visual styles produced by ModernWeb are 100% royalty-free. You retain full commercial ownership to use them in client websites, SaaS applications, marketing materials, and digital products with no attribution required.',
  },
  {
    id: 'faq-3',
    category: 'Monetization',
    question: 'How do the advertisements work on the Free plan?',
    answer:
      'To keep our AI models and server infrastructure free for everyone, the Free plan features non-intrusive advertisements from Google AdSense and Carbon Ads. All ad placements strictly adhere to the Coalition for Better Ads standards—meaning no pop-ups, no audio autoplay, and zero clutter.',
  },
  {
    id: 'faq-4',
    category: 'Technology',
    question: 'How does the Color Palette generator calculate WCAG contrast ratios?',
    answer:
      'Our color engine uses mathematical relative luminance algorithms according to W3C WCAG 2.1 specifications. Each generated color is compared against pure white (#FFFFFF) and dark slate (#1A1A2E), generating an optical contrast ratio score to ensure text legibility and accessibility before you write a single line of CSS.',
  },
  {
    id: 'faq-5',
    category: 'AI Integration',
    question: 'Can I connect my own Google Gemini API key?',
    answer:
      'Yes! While the platform provides fast built-in interactive mock generation for previewing, the codebase includes full hooks for Google Gemini (Imagen 3 and Gemini 2.5 Flash). You can supply your own GEMINI_API_KEY to execute real multimodal generation at edge scale.',
  },
  {
    id: 'faq-6',
    category: 'Studio Pro',
    question: 'What benefits are included in ModernWeb Studio Pro?',
    answer:
      'Studio Pro removes all advertisements across the platform, unlocks unlimited generations with zero daily caps, enables 4K asset downloads, adds SVG and Figma design token exports, and grants access to priority high-throughput GPU inference queues.',
  },
  {
    id: 'faq-7',
    category: 'Privacy',
    question: 'Does ModernWeb sell or track my personal browsing data?',
    answer:
      'Never. We follow strict GDPR and CCPA privacy-first protocols. All ad scripts and analytics are strictly paused until you choose to grant consent through our cookie preferences banner. You can inspect our transparent robots.txt and ads.txt at any time.',
  },
  {
    id: 'faq-8',
    category: 'Deployment',
    question: 'How do I deploy this platform to Vercel or my custom domain?',
    answer:
      'ModernWeb is built on standard TypeScript and modern Vite/Next.js conventions. You can connect your GitHub repository to Vercel or Cloud Run and deploy in less than 60 seconds with zero configuration needed. Refer to the included README.md for exact deployment instructions.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/30 text-xs font-semibold text-[#00D4AA] mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">Questions?</span> We’ve Got Answers.
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Everything you need to know about our AI Studio, commercial licensing, ad-supported free access, and developer features.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-[#FFD700] font-mono-code">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-kreon">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FFD700] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#FFD700]/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    className="px-6 pb-6 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/5 animate-fade-in"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
