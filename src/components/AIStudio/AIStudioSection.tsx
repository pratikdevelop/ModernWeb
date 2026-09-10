import React, { useState } from 'react';
import {
  Wand2,
  Palette,
  Image as ImageIcon,
  FileText,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Sliders,
  Download,
  Eye,
  ExternalLink,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { AIPalette, CopyGenerationResult } from '../../types';

interface AIStudioSectionProps {
  onInteraction: () => void;
  onOpenPro: (reason?: string) => void;
}

const PRESET_PALETTES: AIPalette[] = [
  {
    id: 'cyber-gold',
    name: 'Cyber Sovereign',
    description: 'Deep royal purple accented with luminous gold and neon teal.',
    colors: [
      { hex: '#4A00E0', name: 'Imperial Violet', contrastWhite: 7.8 },
      { hex: '#8E2DE2', name: 'Electric Orchid', contrastWhite: 5.2 },
      { hex: '#FFD700', name: 'Solar Gold', contrastWhite: 12.1 },
      { hex: '#20B2AA', name: 'Quantum Teal', contrastWhite: 4.8 },
      { hex: '#16213E', name: 'Abyssal Navy', contrastWhite: 14.5 },
    ],
    gradient: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 50%, #FFD700 100%)',
  },
  {
    id: 'aurora-emerald',
    name: 'Aurora Synthesis',
    description: 'High-contrast organic neon greens for clean tech and sustainable AI.',
    colors: [
      { hex: '#0F2027', name: 'Deep Carbon', contrastWhite: 15.2 },
      { hex: '#203A43', name: 'Nordic Slate', contrastWhite: 10.4 },
      { hex: '#00D4AA', name: 'Hyper Mint', contrastWhite: 3.1 },
      { hex: '#2C5364', name: 'Oceanic Blue', contrastWhite: 8.9 },
      { hex: '#E0FF4F', name: 'Electric Lime', contrastWhite: 13.6 },
    ],
    gradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #00D4AA 100%)',
  },
  {
    id: 'sunset-amber',
    name: 'Solar Flare Luxury',
    description: 'Warm, high-energy gradient system for high-converting marketing.',
    colors: [
      { hex: '#2E0854', name: 'Midnight Plum', contrastWhite: 13.9 },
      { hex: '#7928CA', name: 'Neon Nebula', contrastWhite: 6.8 },
      { hex: '#FF0080', name: 'Crimson Pulse', contrastWhite: 4.5 },
      { hex: '#FF8A65', name: 'Sunset Coral', contrastWhite: 6.2 },
      { hex: '#FFD700', name: 'Amber Gold', contrastWhite: 12.1 },
    ],
    gradient: 'linear-gradient(135deg, #2E0854 0%, #FF0080 50%, #FFD700 100%)',
  },
  {
    id: 'minimalist-mono',
    name: 'Platinum Executive',
    description: 'Understated monochrome with focused metallic gold touchpoints.',
    colors: [
      { hex: '#121216', name: 'Graphite Black', contrastWhite: 16.8 },
      { hex: '#262630', name: 'Titanium Grey', contrastWhite: 11.2 },
      { hex: '#525266', name: 'Vapor Slate', contrastWhite: 6.4 },
      { hex: '#FFD700', name: 'Gilded Accent', contrastWhite: 12.1 },
      { hex: '#F4F4F8', name: 'Pure Chalk', contrastWhite: 1.2 },
    ],
    gradient: 'linear-gradient(135deg, #121216 0%, #262630 60%, #FFD700 100%)',
  },
];

const PRESET_IMAGE_STYLES = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 3D',
    promptModifier: 'cinematic 3D render, holographic glowing wires, octanerender, volumetric lighting, 8k resolution',
    sampleImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'photoreal',
    name: 'Photorealistic',
    promptModifier: 'shot on 35mm Hasselblad, golden hour, ultra realistic textures, shallow depth of field, masterpiece',
    sampleImg: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'vector',
    name: 'Vector Illustration',
    promptModifier: 'minimalist modern vector art, clean sharp lines, vibrant flat palette, dribbble trending, high design',
    sampleImg: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'luxe',
    name: 'Minimalist Luxury',
    promptModifier: 'architectural studio lighting, frosted glass texture, matte gold finishes, dark moody atmosphere',
    sampleImg: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  },
];

const COPY_TONES = [
  { id: 'Visionary', label: 'Visionary', desc: 'Inspiring, future-defining language' },
  { id: 'Enterprise', label: 'Enterprise B2B', desc: 'Metric-driven, authoritative tone' },
  { id: 'Witty', label: 'Witty & Tech', desc: 'Punchy, developer-loved humor' },
  { id: 'Minimalist', label: 'Ultra Minimal', desc: 'Apple-like concise elegance' },
];

export const AIStudioSection: React.FC<AIStudioSectionProps> = ({ onInteraction, onOpenPro }) => {
  const [activeTab, setActiveTab] = useState<'palette' | 'image' | 'copy'>('palette');

  // Palette tool states
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);

  // Text-to-image states
  const [imagePrompt, setImagePrompt] = useState('An intelligent holographic AI core radiating violet energy and gold circuits');
  const [selectedStyle, setSelectedStyle] = useState(PRESET_IMAGE_STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('16:9');
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string>(PRESET_IMAGE_STYLES[0].sampleImg);
  const [imgSeed, setImgSeed] = useState(482910);

  // Copywriter states
  const [productTopic, setProductTopic] = useState('Cloud-native AI Orchestrator');
  const [selectedTone, setSelectedTone] = useState<'Visionary' | 'Enterprise' | 'Witty' | 'Minimalist'>('Visionary');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [copyResult, setCopyResult] = useState<CopyGenerationResult>({
    headline: 'Orchestrate Intelligent Agents at Planetary Velocity',
    subheadline: 'The unified cognitive fabric bridging developer intent with autonomous GPU workflows. Zero latency, continuous optimization.',
    badge: '🚀 Next-Gen Autonomous AI',
    bulletPoints: [
      'Multi-agent state sync with microsecond consensus',
      'Automated fallback across Google Gemini, Claude, and Llama 3',
      'End-to-end cryptographic audit logs for enterprise compliance',
    ],
    ctaText: 'Deploy Cluster in 60s',
    secondaryCta: 'Explore Architecture',
    tone: 'Visionary',
  });
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Palette actions
  const currentPalette = PRESET_PALETTES[selectedPaletteIndex];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleCopyCssVariables = () => {
    const css = `:root {\n  /* ModernWeb Palette: ${currentPalette.name} */\n${currentPalette.colors
      .map((c, i) => `  --color-brand-${i + 1}: ${c.hex}; /* ${c.name} */`)
      .join('\n')}\n}`;
    navigator.clipboard.writeText(css);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const handleCyclePalette = () => {
    onInteraction();
    setSelectedPaletteIndex((prev) => (prev + 1) % PRESET_PALETTES.length);
  };

  // Image tool actions
  const handleGenerateImage = () => {
    onInteraction();
    setIsGeneratingImg(true);

    // Simulated high-fidelity generator (ready for Gemini Imagen 3 / FLUX API hookup)
    setTimeout(() => {
      setIsGeneratingImg(false);
      setImgSeed(Math.floor(Math.random() * 900000) + 100000);
      setGeneratedImg(selectedStyle.sampleImg);
    }, 1200);
  };

  // Copywriter actions
  const handleGenerateCopy = () => {
    onInteraction();
    setIsGeneratingCopy(true);

    setTimeout(() => {
      setIsGeneratingCopy(false);

      if (selectedTone === 'Enterprise') {
        setCopyResult({
          headline: `Enterprise-Grade Scalability for ${productTopic}`,
          subheadline: `Drive measurable ROI with SOC2 Type II certified pipeline orchestration. Reduce computational overhead by 47% while scaling throughput.`,
          badge: '🛡️ Proven by Fortune 500 Leaders',
          bulletPoints: [
            'Guaranteed 99.99% uptime with multi-region failover',
            'Granular Role-Based Access Control (RBAC) with SSO integration',
            'Comprehensive audit telemetry exportable to Datadog & Splunk',
          ],
          ctaText: 'Schedule Executive Briefing',
          secondaryCta: 'Read Whitepaper',
          tone: 'Enterprise',
        });
      } else if (selectedTone === 'Witty') {
        setCopyResult({
          headline: `Stop Wrestling APIs. Let ${productTopic} Do the Hard Work.`,
          subheadline: `Because you didn't become a senior engineer to spend 4 hours debugging CORS headers and token limits on a Friday night.`,
          badge: '⚡ Built for Engineers Who Ship',
          bulletPoints: [
            'Zero YAML headaches: single line config with instant hot-reload',
            'Does not spam your Slack channel with false-positive alerts',
            'Free tier generous enough that your finance team will approve it',
          ],
          ctaText: 'npm install --save sanity',
          secondaryCta: 'View on GitHub',
          tone: 'Witty',
        });
      } else if (selectedTone === 'Minimalist') {
        setCopyResult({
          headline: `${productTopic}. Pure Precision.`,
          subheadline: 'A single purposeful platform designed to eliminate friction. Crafted for those who value clarity above all else.',
          badge: 'Design Perfection',
          bulletPoints: [
            'Focused essentials, zero unnecessary toggles',
            'Sub-10 millisecond global edge response',
            'Harmonious typography and intuitive interactions',
          ],
          ctaText: 'Experience ModernWeb',
          secondaryCta: 'Overview',
          tone: 'Minimalist',
        });
      } else {
        setCopyResult({
          headline: `The Next Horizon in ${productTopic}`,
          subheadline: 'Unleash cognitive workflows that amplify human talent. Where visionary ideas instantly transform into production experiences.',
          badge: '✨ Powered by Autonomous Intelligence',
          bulletPoints: [
            'Real-time semantic reasoning across structured datasets',
            'Fluid self-healing infrastructure adapting to spike loads',
            'Borderless collaboration between designers and machine models',
          ],
          ctaText: 'Begin Transformation',
          secondaryCta: 'Watch 2-Min Demo',
          tone: 'Visionary',
        });
      }
    }, 900);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  return (
    <section id="ai-studio" className="py-24 relative overflow-hidden">
      {/* Subtle section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-[#FFD700] mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span>ModernWeb AI Studio Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">Creative Tools</span>
          </h2>

          <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            Test real-time generative capabilities directly in browser. Generate mathematical color systems, prompt visual concepts, and simulate conversion-optimized copy.
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl max-w-lg mx-auto">
            <button
              id="ai-tab-palette"
              onClick={() => setActiveTab('palette')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'palette'
                  ? 'bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white shadow-lg shadow-purple-900/40'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Palette className="w-4 h-4 text-[#FFD700]" />
              <span>Palette AI</span>
            </button>

            <button
              id="ai-tab-image"
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'image'
                  ? 'bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white shadow-lg shadow-purple-900/40'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#20B2AA]" />
              <span>Image Lab</span>
            </button>

            <button
              id="ai-tab-copy"
              onClick={() => setActiveTab('copy')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'copy'
                  ? 'bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white shadow-lg shadow-purple-900/40'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4 text-[#FF8A65]" />
              <span>Copywriter</span>
            </button>
          </div>
        </div>

        {/* Tab 1: AI Color Intelligence */}
        {activeTab === 'palette' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-kreon">
                    {currentPalette.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFD700]/15 text-[#FFD700] text-xs font-semibold">
                    WCAG AA Pass
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1 max-w-xl">
                  {currentPalette.description}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  id="palette-next-btn"
                  onClick={handleCyclePalette}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#FFD700]" />
                  Generate Next Harmonic Set
                </button>

                <button
                  id="palette-copy-css-btn"
                  onClick={handleCopyCssVariables}
                  className="px-4 py-2 rounded-xl bg-[#20B2AA]/20 hover:bg-[#20B2AA]/30 border border-[#20B2AA]/40 text-[#20B2AA] text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
                >
                  {copiedCss ? <Check className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                  {copiedCss ? 'CSS Copied!' : 'Export CSS Variables'}
                </button>
              </div>
            </div>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 my-8">
              {currentPalette.colors.map((color) => (
                <div
                  key={color.hex}
                  onClick={() => handleCopyColor(color.hex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleCopyColor(color.hex);
                  }}
                  className="group relative rounded-2xl overflow-hidden p-4 flex flex-col justify-between h-48 border border-white/10 hover:border-[#FFD700]/60 transition-all cursor-pointer shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase backdrop-blur-md shadow"
                      style={{
                        backgroundColor: color.contrastWhite > 6 ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.7)',
                        color: color.contrastWhite > 6 ? '#FFFFFF' : '#1A1A2E',
                      }}
                    >
                      {color.hex}
                    </span>

                    <span
                      className="p-1.5 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundColor: color.contrastWhite > 6 ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
                        color: color.contrastWhite > 6 ? '#FFFFFF' : '#1A1A2E',
                      }}
                    >
                      {copiedHex === color.hex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </span>
                  </div>

                  <div>
                    <p
                      className="text-xs font-bold leading-tight drop-shadow"
                      style={{
                        color: color.contrastWhite > 6 ? '#FFFFFF' : '#1A1A2E',
                      }}
                    >
                      {color.name}
                    </p>
                    <p
                      className="text-[10px] opacity-80 mt-0.5 font-medium"
                      style={{
                        color: color.contrastWhite > 6 ? '#FFFFFF' : '#1A1A2E',
                      }}
                    >
                      Contrast: {color.contrastWhite}:1
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Gradient Preview Bar */}
            <div className="p-4 rounded-2xl bg-black/20 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div
                  className="w-12 h-12 rounded-xl shadow-md flex-shrink-0"
                  style={{ background: currentPalette.gradient }}
                />
                <div>
                  <p className="text-xs font-semibold text-white">Dynamic Gradient Blend</p>
                  <p className="text-[11px] text-gray-400 font-mono-code truncate max-w-xs sm:max-w-md">
                    {currentPalette.gradient}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`background: ${currentPalette.gradient};`);
                  handleCopyText(currentPalette.gradient, 'gradient');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-gray-200 transition-colors flex items-center gap-1.5 flex-shrink-0"
              >
                {copiedSection === 'gradient' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSection === 'gradient' ? 'Copied' : 'Copy Gradient'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Text-to-Image Lab */}
        {activeTab === 'image' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label htmlFor="img-prompt-input" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Visual Prompt Playground
                  </label>
                  <textarea
                    id="img-prompt-input"
                    rows={4}
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-black/30 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all resize-none"
                    placeholder="Describe your scene or abstract composition..."
                  />
                </div>

                {/* Style Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Aesthetic Style Model
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_IMAGE_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setSelectedStyle(style)}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                          selectedStyle.id === style.id
                            ? 'bg-[#FFD700]/15 border-[#FFD700] text-[#FFD700]'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Aspect Ratio
                  </label>
                  <div className="flex gap-2">
                    {(['1:1', '16:9', '9:16'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setAspectRatio(ratio)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          aspectRatio === ratio
                            ? 'bg-[#20B2AA]/20 border-[#20B2AA] text-[#20B2AA]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  id="img-generate-btn"
                  disabled={isGeneratingImg}
                  onClick={handleGenerateImage}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#8E2DE2] text-[#1A1A2E] font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isGeneratingImg ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Latents...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Generate Visual Asset</span>
                    </>
                  )}
                </button>

                {/* Developer note on API hookup */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-gray-400">
                  <span className="font-semibold text-[#FFD700] font-mono-code">TODO: Real API Integration</span>
                  <p className="mt-1">
                    Connect server route <code className="text-gray-300">/api/generate-image</code> with Gemini Imagen 3 (via <code className="text-gray-300">@google/genai</code>) or FLUX endpoint. Full implementation instructions included in README.md.
                  </p>
                </div>
              </div>

              {/* Preview Column */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div
                  className={`w-full rounded-2xl overflow-hidden bg-black/40 border border-white/15 relative group shadow-2xl flex items-center justify-center ${
                    aspectRatio === '1:1' ? 'aspect-square max-w-md' : aspectRatio === '9:16' ? 'aspect-[9/16] max-w-xs' : 'aspect-video'
                  }`}
                >
                  {isGeneratingImg ? (
                    <div className="flex flex-col items-center gap-3 text-center p-6">
                      <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] border-t-transparent animate-spin" />
                      <p className="text-sm font-bold text-white">Rendering with {selectedStyle.name}</p>
                      <p className="text-xs text-gray-400">Diffusion steps 28/28 • Seed: {imgSeed}</p>
                    </div>
                  ) : (
                    <>
                      <img
                        src={generatedImg}
                        alt="AI generated visual representation"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Overlay card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                        <div className="flex items-center justify-between text-xs text-white">
                          <div>
                            <p className="font-bold">{selectedStyle.name}</p>
                            <p className="text-[10px] text-gray-300 font-mono-code">Seed #{imgSeed} • 2048x1152</p>
                          </div>

                          <a
                            href={generatedImg}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={`modernweb-${imgSeed}.jpg`}
                            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                            title="Download Preview Asset"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Landing Page Copywriter */}
        {activeTab === 'copy' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Controls */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <label htmlFor="copy-topic-input" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Product / Feature Name
                  </label>
                  <input
                    id="copy-topic-input"
                    type="text"
                    value={productTopic}
                    onChange={(e) => setProductTopic(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/30 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
                    placeholder="e.g. NextGen Webhooks or AI Agent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Brand Tone of Voice
                  </label>
                  <div className="space-y-2">
                    {COPY_TONES.map((tone) => (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => setSelectedTone(tone.id as typeof selectedTone)}
                        className={`w-full p-3 rounded-xl text-left border transition-all ${
                          selectedTone === tone.id
                            ? 'bg-[#FFD700]/15 border-[#FFD700] text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <p className="text-xs font-bold text-[#FFD700]">{tone.label}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{tone.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  id="copy-generate-btn"
                  disabled={isGeneratingCopy}
                  onClick={handleGenerateCopy}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4A00E0] via-[#8E2DE2] to-[#FFD700] text-white font-extrabold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isGeneratingCopy ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Copy...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FFD700]" />
                      <span>Generate Conversion Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Output Showcase */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-black/30 border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Generated Hero Wireframe
                  </span>
                  <button
                    onClick={() => {
                      const fullCopy = `# ${copyResult.badge}\n\n# ${copyResult.headline}\n\n${copyResult.subheadline}\n\nKey Benefits:\n${copyResult.bulletPoints.map(b => `- ${b}`).join('\n')}\n\nPrimary CTA: ${copyResult.ctaText}\nSecondary CTA: ${copyResult.secondaryCta}`;
                      handleCopyText(fullCopy, 'all');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-gray-200 transition-colors flex items-center gap-1.5"
                  >
                    {copiedSection === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSection === 'all' ? 'Copied Full Markdown' : 'Copy All Markdown'}
                  </button>
                </div>

                {/* Visual Preview */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#FFD700]/15 text-[#FFD700] text-xs font-semibold">
                    {copyResult.badge}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-kreon leading-tight">
                    {copyResult.headline}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {copyResult.subheadline}
                  </p>

                  <div className="space-y-2 py-2">
                    {copyResult.bulletPoints.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <button className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-xs shadow-md">
                      {copyResult.ctaText}
                    </button>
                    <button className="py-2.5 px-5 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/15">
                      {copyResult.secondaryCta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global CTA: Open Full AI Studio */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2D1B69] via-[#16213E] to-[#2D1B69] border border-[#FFD700]/30 shadow-2xl">
            <div className="text-left sm:pr-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                Ready to orchestrate your entire enterprise stack?
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                Full AI Studio includes batch vector exports, live token streaming, and team collaboration.
              </p>
            </div>

            <button
              id="open-full-ai-studio-btn"
              onClick={() => onOpenPro('Explore the comprehensive enterprise AI Studio Suite with zero limits.')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#FFD700] text-[#1A1A2E] font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2 flex-shrink-0"
            >
              <span>Open Full AI Studio</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
