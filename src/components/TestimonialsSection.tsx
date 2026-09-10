import React from 'react';
import { Star, CheckCircle, Quote, MessageSquare } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Alexander Wright',
    role: 'VP of Product Engineering',
    company: 'HyperScale Labs',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    verified: true,
    content:
      'ModernWeb completely eliminated our design token bottlenecks. The AI Color Palette generator gives our designers and engineers an indisputable single source of truth with automated WCAG AA ratings. We cut our sprint delivery times in half.',
  },
  {
    id: 't-2',
    name: 'Sophia Martinez',
    role: 'Head of Growth Marketing',
    company: 'PulseVelocity SaaS',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    verified: true,
    content:
      'The conversion copywriter tool inside the AI Studio generated our highest-converting landing page headline to date (+34% conversion lift). The hybrid monetization with Google AdSense and an ad-free Pro tier is the exact monetization model we wanted to adopt.',
  },
  {
    id: 't-3',
    name: 'Liam Chen',
    role: 'Lead Full-Stack Developer',
    company: 'Krypton Interactive',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    verified: true,
    content:
      'The code cleanliness and TypeScript rigor in ModernWeb is exceptional. No sloppy libraries or hacky CSS. We inspected the AdSense ad unit implementation and it complies strictly with Better Ads standards and GDPR privacy rules right out of the box.',
  },
  {
    id: 't-4',
    name: 'Amara Okafor',
    role: 'Creative Director',
    company: 'Studio Aethel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    verified: true,
    content:
      'As a design agency founder, the visual language here is breath of fresh air. Deep navy with purple glassmorphism and gold accents feels like an enterprise luxury product. It proves that AI-powered websites can be breathtakingly sophisticated.',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700] mb-4">
            <MessageSquare className="w-4 h-4" />
            <span>Customer Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">Builders & Leaders</span>
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            See how forward-thinking product teams, engineering leads, and creators use ModernWeb to craft high-impact web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#FFD700]/40 transition-all duration-300 hover:-translate-y-1 shadow-xl relative group"
            >
              <Quote className="w-10 h-10 text-[#FFD700]/20 absolute top-6 right-6 group-hover:text-[#FFD700]/40 transition-colors" />

              <div>
                <div className="flex items-center gap-1 text-[#FFD700] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed italic mb-8">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD700]/50"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white font-kreon">{t.name}</h3>
                    {t.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#00D4AA]" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {t.role} • <span className="text-[#FFD700]">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
