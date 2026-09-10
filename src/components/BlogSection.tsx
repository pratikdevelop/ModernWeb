import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles, User, Tag, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../types';

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ai-web-design-2026',
    slug: 'how-ai-is-changing-web-design-2026',
    title: 'How AI is Changing Web Design in 2026',
    excerpt: 'Explore the shift from static component libraries to autonomous design systems, generative shaders, and microsecond layout adaptation.',
    readTime: '6 min read',
    date: 'Sep 08, 2026',
    category: 'Design Systems',
    tags: ['AI Design', 'Generative UI', 'Frontend', 'Next.js'],
    author: {
      name: 'Elena Rostova',
      role: 'Principal Design Technologist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    },
    keyTakeaways: [
      'Generative design engines replace hardcoded styling with real-time semantic token streams.',
      'Accessibility is verified continuously using computer vision models before render.',
      'Developers shift from manually writing CSS to directing multimodal design synthesis.',
    ],
    content: [
      'The modern web has reached an inflection point. Where frontend engineers once spent countless hours nudging pixels and maintaining sprawling design system tokens, generative models now calculate optical harmony in microseconds.',
      'In 2026, web design is no longer a collection of static Figma frames translated into JSX. Instead, the interface adapts contextually to user telemetry, ambient lighting conditions, and cognitive load requirements.',
      'Key architectural shifts include mathematical color harmony engines that guarantee WCAG AAA contrast regardless of user device color profiles, alongside dynamic layout stabilization that eliminates layout shift (CLS) entirely.',
      'For teams building production applications, the winning strategy combines human creative taste with autonomous AI validation pipelines.',
    ],
  },
  {
    id: 'best-palette-generators',
    slug: 'best-color-palette-generators-for-developers',
    title: 'Best Color Palette Generators for Developers',
    excerpt: 'A comprehensive benchmark of algorithmic palette tools, WCAG contrast scoring algorithms, and token export formats for React & Tailwind CSS.',
    readTime: '5 min read',
    date: 'Sep 04, 2026',
    category: 'Engineering',
    tags: ['Color Theory', 'CSS Variables', 'Accessibility', 'Tailwind'],
    author: {
      name: 'Marcus Vance',
      role: 'Staff Frontend Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    },
    keyTakeaways: [
      'Perceptual color models like OKLCH outshine legacy sRGB for smooth linear interpolation.',
      'Automated WCAG AA/AAA scoring prevents legal compliance issues for public websites.',
      'Exporting tokens directly as CSS variables enables instant dark/light theme switching.',
    ],
    content: [
      'Color selection in digital product design is often treated as purely aesthetic, but in software engineering, color systems are strict mathematical matrices that govern usability, conversion rates, and legal accessibility compliance.',
      'Modern developer-focused palette generators have evolved beyond random hex generators. Today’s premier engines utilize OKLCH and CIELAB color spaces to calculate perceptual lightness consistency across all hues.',
      'When integrating palettes into Tailwind CSS v4 or modern CSS variable architectures, tools must output semantic tokens (--color-surface, --color-primary-accent, --color-contrast-text) rather than abstract color numbers.',
      'ModernWeb AI Studio provides mathematical harmony algorithms (Complementary, Triadic, Split-Analogous) that compute optical contrast ratios in real time, making token deployment seamless.',
    ],
  },
  {
    id: 'monetize-ai-adsense',
    slug: 'how-to-monetize-ai-tools-with-google-adsense',
    title: 'How to Monetize AI Tools with Google AdSense',
    excerpt: 'Step-by-step blueprint for passing Google AdSense site reviews with AI applications, placing high-RPM units, and implementing hybrid freemium models.',
    readTime: '8 min read',
    date: 'Aug 29, 2026',
    category: 'Monetization',
    tags: ['Google AdSense', 'Passive Income', 'Ad Revenue', 'Better Ads'],
    author: {
      name: 'Sarah Chen',
      role: 'Growth & Ad Monetization Lead',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
    },
    keyTakeaways: [
      'Google AdSense requires original textual depth: pair interactive tools with comprehensive guides to prevent "Low Value Content" rejections.',
      'Sticky desktop header banners and in-article responsive units yield the highest viewability and RPMs.',
      'A hybrid model (ad-supported Free plan + ad-free Pro upgrade) maximizes both recurring subscriptions and impression revenue.',
    ],
    content: [
      'Monetizing interactive AI utilities and developer tools requires balancing immediate visitor monetization with an unobtrusive, premium brand impression.',
      'Many creators struggle to get AdSense approval for single-page AI tools because Google crawlers evaluate textual substance. By integrating high-value educational guides, thorough FAQ sections, and transparent privacy policies, approval times drop from weeks to 48 hours.',
      'Strategic ad placement matters: avoid accidental click traps that violate AdSense policies. Instead, place high-viewability leaderboard banners between primary content modules and vertical sticky units alongside desktop workspaces.',
      'By offering an ad-supported free tier with clear "Supported by ads" badges, you build user empathy that naturally drives conversions to your ad-free Pro subscription.',
    ],
  },
  {
    id: 'human-ai-workflow-startups',
    slug: 'human-ai-content-workflow-for-startups',
    title: 'Human + AI Content Workflow for Startups',
    excerpt: 'How lean engineering teams ship 10x more landing pages, technical documentation, and product assets without ballooning overhead.',
    readTime: '7 min read',
    date: 'Aug 22, 2026',
    category: 'Startups',
    tags: ['Workflows', 'Productivity', 'Startup Growth', 'Content Strategy'],
    author: {
      name: 'David Kim',
      role: 'Co-founder & Chief Product Officer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    },
    keyTakeaways: [
      'AI acts as a velocity multiplier: generating foundational drafts while human editors inject brand nuance.',
      'Automated copy simulation reduces landing page A/B testing cycle times from 2 weeks to 2 hours.',
      'Unified platforms combining copy, visual tokens, and hosting eliminate context switching.',
    ],
    content: [
      'Startups frequently face a classic dilemma: they need world-class marketing copy, distinct visual assets, and high-converting landing pages, but lack the budget for full creative agencies.',
      'The "Human + AI" paradigm breaks this bottleneck. Rather than relying on AI to blindly produce final output, top-performing founders use models to generate diverse architectural options, which human experts curate and refine.',
      'For example, utilizing AI copy generators to draft headlines in varying brand voices (Visionary, Enterprise, Witty) gives product managers immediate empathy for different customer segments.',
      'As modern frameworks continue to converge, the teams that integrate AI into their daily shipping cadences will outpace competitors by orders of magnitude.',
    ],
  },
];

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700] mb-4">
            <BookOpen className="w-4 h-4" />
            <span>ModernWeb Knowledge Base & Insights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">Engineering & Design</span> Articles
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Deep dives on autonomous design architectures, mathematical color models, and scalable ad monetization strategies for modern builders.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedPost(post);
              }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#FFD700]/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#4A00E0]/40 to-[#8E2DE2]/40 border border-[#8E2DE2]/40 text-[#FFD700] text-xs font-bold">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-kreon group-hover:text-[#FFD700] transition-colors leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Key Takeaways summary chip */}
                <div className="p-3 rounded-2xl bg-black/25 border border-white/5 space-y-1.5 mb-6">
                  {post.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{post.author.name}</p>
                    <p className="text-[10px] text-gray-400">{post.author.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FFD700] group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Read Full Article Modal */}
        {selectedPost && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedPost(null);
            }}
          >
            <div className="relative w-full max-w-3xl bg-[#16213E] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setSelectedPost(null)}
                aria-label="Close article"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#FFD700]/15 text-[#FFD700] text-xs font-bold">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-gray-400">• {selectedPost.date}</span>
                <span className="text-xs text-gray-400">• {selectedPost.readTime}</span>
              </div>

              <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-bold text-white font-kreon mb-4">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <p className="text-sm font-bold text-white">{selectedPost.author.name}</p>
                  <p className="text-xs text-gray-400">{selectedPost.author.role}</p>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-4 rounded-2xl bg-[#4A00E0]/20 border border-[#8E2DE2]/40 mb-6">
                <h4 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Executive Summary & Takeaways
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-200">
                  {selectedPost.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00D4AA] font-bold">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body Content */}
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                {selectedPost.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400 mr-1" />
                {selectedPost.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] text-gray-300 font-mono-code">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
