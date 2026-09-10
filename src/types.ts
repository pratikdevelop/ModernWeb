export type AdNetwork = 'adsense' | 'carbon' | 'medianet' | 'affiliate';

export type AdUnitPosition =
  | 'sticky-top'
  | 'hero-features'
  | 'aistudio-after-tools'
  | 'aistudio-sidebar'
  | 'demo-stats'
  | 'pre-contact'
  | 'footer';

export interface AdConfig {
  network: AdNetwork;
  clientId?: string;
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  testMode?: boolean;
}

export interface ConsentSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export interface PaletteColor {
  hex: string;
  name: string;
  contrastWhite: number;
}

export interface AIPalette {
  id: string;
  name: string;
  description: string;
  colors: PaletteColor[];
  gradient: string;
}

export interface ImagePromptPreset {
  id: string;
  title: string;
  style: 'Photorealistic' | 'Cyberpunk 3D' | 'Anime Vector' | 'Minimalist Luxury';
  aspectRatio: '1:1' | '16:9' | '9:16';
  prompt: string;
  negativePrompt: string;
  previewUrl: string;
  seed: number;
}

export interface CopyGenerationResult {
  headline: string;
  subheadline: string;
  badge: string;
  bulletPoints: string[];
  ctaText: string;
  secondaryCta: string;
  tone: 'Visionary' | 'Enterprise' | 'Witty' | 'Minimalist';
}

export interface StatItem {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  category: string;
  tags: string[];
  keyTakeaways: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  verified: boolean;
}
