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
  Lock,
  Zap,
} from 'lucide-react';
import { AIPalette, CopyGenerationResult } from '../../types';
import { AdUnit } from '../AdUnit';

interface AIStudioSectionProps {
  onInteraction: () => void;
  onOpenPro: (reason?: string) => void;
  isConsentGranted?: boolean;
  remainingUses?: number;
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

export const AIStudioSection: React.FC<AIStudioSectionProps> = ({
  onInteraction,
  onOpenPro,
  isConsentGranted = true,
  remainingUses = 5,
}) => {
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
      'Zero-trust cryptographic execution sandbox',
    ],
    ctaText: 'Deploy Agents Free',
    secondaryCta: 'Explore Architecture',
    tone: 'Visionary',
  });
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const activePalette = PRESET_PALETTES[selectedPaletteIndex];

  // Helper to verify limit before action
  const checkLimitAndProceed = (action: () => void) => {
    if (remainingUses <= 0) {
      onOpenPro('You have used all free AI Studio actions! Upgrade to Studio Pro for unlimited generations and an ad-free experience.');
      return;
    }
    onInteraction();
    action();
  };

  const handleNextPalette = () => {
    checkLimitAndProceed(() => {
      setSelectedPaletteIndex((prev) => (prev + 1) % PRESET_PALETTES.length);
    });
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleCopyCssVariables = () => {
    const css = `:root {\n${activePalette.colors
      .map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.name} */`)
      .join('\n')}\n  --gradient-main: ${activePalette.gradient};\n}`;
    navigator.clipboard.writeText(css);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const handleSimulateImageGen = () => {
    checkLimitAndProceed(() => {
      setIsGeneratingImg(true);
      const newSeed = Math.floor(Math.random() * 900000) + 100000;
      setImgSeed(newSeed);

      setTimeout(() => {
        setIsGeneratingImg(false);
        setGeneratedImg(selectedStyle.sampleImg);
      }, 1400);
    });
  };

  const handleSimulateCopyGen = () => {
    checkLimitAndProceed(() => {
      setIsGeneratingCopy(true);

      setTimeout(() => {
        setIsGeneratingCopy(false);

        if (selectedTone === 'Enterprise') {
          setCopyResult({
            headline: `Accelerate ${productTopic} with Enterprise-Grade Reliability`,
            subheadline: `Engineered for Fortune 500 infrastructure: SOC2 Type II certified, 99.999% SLA availability, and dedicated VPC edge networking.`,
            badge: '🛡️ Enterprise Verified',
            bulletPoints: [
              'Guaranteed sub-15ms worldwide API latency',
              'Deterministic cost controls and usage alerts',
              'Single sign-on (SAML / Okta) and team RBAC permissions',
            ],
            ctaText: 'Schedule Technical Demo',
            secondaryCta: 'Review Security Whitepaper',
            tone: 'Enterprise',
          });
        } else if (selectedTone === 'Witty') {
          setCopyResult({
            headline: `Stop Wrestling Spaghetti Code. Meet ${productTopic}.`,
            subheadline: `Because you didn't become an engineer to maintain broken configs at 2 AM on a Saturday. We do the heavy lifting so you can ship.`,
            badge: '⚡ Built For Sleep-Deprived Devs',
            bulletPoints: [
              'Zero boilerplate, one-command deployment',
              'Actually useful error messages that make sense',
              'Integrates with your terminal before your coffee cools down',
            ],
            ctaText: 'npm install sanity',
            secondaryCta: 'View on GitHub',
            tone: 'Witty',
          });
        } else if (selectedTone === 'Minimalist') {
          setCopyResult({
            headline: `${productTopic}. Simply Powerful.`,
            subheadline: `Clarity by design. No distractions, no redundant knobs. Just pure engineering elegance delivered straight to production.`,
            badge: 'Pure Signal',
            bulletPoints: [
              'Under 2KB total client bundle footprint',
              'Zero runtime dependencies',
              'Instantaneous cold starts across 300 edge nodes',
            ],
            ctaText: 'Experience Simplicity',
            secondaryCta: 'Documentation',
            tone: 'Minimalist',
          });
        } else {
          setCopyResult({
            headline: `Pioneer the Next Horizon of ${productTopic}`,
            subheadline: `Unleash computational intuition. Transcend legacy limitations with self-optimizing neural pipelines that scale seamlessly with your ambition.`,
            badge: '🌌 The Intelligent Frontier',
            bulletPoints: [
              'Self-healing pipeline orchestration',
              'Multimodal contextual awareness across audio, vision, and text',
              'Seamless transition between on-premise and decentralized clusters',
            ],
            ctaText: 'Shape the Future',
            secondaryCta: 'Explore Manifest',
            tone: 'Visionary',
          });
        }
      }, 1200);
    });
  };

  const handleCopyText = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  return (
    <section id="ai-studio" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#4A00E0]/30 to-[#8E2DE2]/30 border border-[#8E2DE2]/50 text-xs font-semibold text-[#FFD700] mb-4 shadow-lg shadow-purple-500/10">
            <Sparkles className="w-4 h-4 text-[#FFD700] animate-spin" />
            <span>Interactive AI Studio Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            Design, Visualize & Write with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">
              Autonomous AI
            </span>
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Experience our intelligent creative modules. Test harmonic color systems, explore generative diffusion styles, and craft high-converting landing page copy in seconds.
          </p>

          {/* Free Uses Remaining Counter Pill */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md">
            <span className="text-xs text-gray-300">
              Free Plan Status: <strong className="text-emerald-400">Supported by ads</strong>
            </span>
            <span className="text-gray-600">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white">
              <Zap className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Free uses remaining:</span>
              <span className={`px-2 py-0.5 rounded-md text-xs font-mono-code font-bold ${
                remainingUses > 2 ? 'bg-[#00D4AA]/20 text-[#00D4AA]' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {remainingUses}/5
              </span>
            </span>
            {remainingUses <= 1 && (
              <button
                onClick={() => onOpenPro('Upgrade to Pro for unlimited generation and ad-free experience.')}
                className="text-[11px] font-bold text-[#FFD700] hover:underline ml-1"
              >
                Upgrade to Pro →
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'palette', label: 'Palette AI', icon: Palette, desc: 'Color Systems' },
            { id: 'image', label: 'Image Lab', icon: ImageIcon, desc: 'Diffusion Styles' },
            { id: 'copy', label: 'Copywriter Engine', icon: FileText, desc: 'Conversion Copy' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'palette' | 'image' | 'copy')}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] shadow-xl shadow-amber-500/20 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#1A1A2E]' : 'text-[#FFD700]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area with Desktop Sidebar on the Right */}
        <div className="flex flex-col xl:flex-row items-start gap-8">
          {/* Left / Primary Column: Interactive Tools */}
          <div className="flex-1 min-w-0 w-full">
            {/* TOOL 1: Palette AI */}
            {activeTab === 'palette' && (
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl animate-fade-in space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-kreon">
                        {activePalette.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] text-[10px] font-bold tracking-wide">
                        WCAG AA Ready
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1">
                      {activePalette.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCssVariables}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
                    >
                      {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5" />}
                      <span>{copiedCss ? 'CSS Copied' : 'Export Tokens'}</span>
                    </button>

                    <button
                      onClick={handleNextPalette}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Next Palette</span>
                    </button>
                  </div>
                </div>

                {/* Swatches Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {activePalette.colors.map((color) => (
                    <div
                      key={color.hex}
                      onClick={() => handleCopyHex(color.hex)}
                      className="group cursor-pointer rounded-2xl p-4 flex flex-col justify-between h-40 border border-white/10 shadow-lg transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-black/40 text-white font-mono-code text-[10px] font-bold">
                          {color.contrastWhite}:1
                        </span>
                        <span className="p-1 rounded bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {copiedHex === color.hex ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </span>
                      </div>

                      <div className="p-2 rounded-xl bg-black/50 backdrop-blur-md">
                        <p className="text-white text-xs font-bold font-kreon truncate">{color.name}</p>
                        <p className="text-gray-300 font-mono-code text-[11px] uppercase">
                          {color.hex}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Live Gradient Preview */}
                <div
                  className="rounded-2xl p-6 sm:p-8 flex flex-col justify-end min-h-[140px] shadow-xl border border-white/20 transition-all"
                  style={{ background: activePalette.gradient }}
                >
                  <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md max-w-md">
                    <span className="text-[10px] text-[#FFD700] uppercase font-bold tracking-wider">
                      Dynamic Lighting Gradient
                    </span>
                    <h4 className="text-white font-bold text-sm sm:text-base font-kreon mt-0.5">
                      Harmonized Linear Mesh Gradient
                    </h4>
                    <p className="text-xs text-gray-200 mt-1">
                      Computed with OKLCH luminance mapping for zero banding on OLED screens.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TOOL 2: Text-to-Image Lab */}
            {activeTab === 'image' && (
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl animate-fade-in space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Controls */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Visual Prompt Prompt
                      </label>
                      <textarea
                        rows={3}
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        className="w-full p-3.5 rounded-xl bg-black/30 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FFD700] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Style Preset
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {PRESET_IMAGE_STYLES.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style)}
                            className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                              selectedStyle.id === style.id
                                ? 'bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700] font-bold'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <p className="font-semibold">{style.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        {(['1:1', '16:9', '9:16'] as const).map((ratio) => (
                          <button
                            key={ratio}
                            onClick={() => setAspectRatio(ratio)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold ${
                              aspectRatio === ratio
                                ? 'bg-white/20 text-white border border-white/30'
                                : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                          >
                            {ratio}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleSimulateImageGen}
                        disabled={isGeneratingImg}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                      >
                        {isGeneratingImg ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Synthesizing...</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-3.5 h-3.5" />
                            <span>Render Image</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Output Preview */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-xl aspect-video bg-black/40 flex items-center justify-center">
                      <img
                        src={generatedImg}
                        alt="AI Generation Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                        <div className="flex items-center justify-between text-xs text-gray-300">
                          <span className="font-mono-code">Seed #{imgSeed}</span>
                          <span className="px-2 py-0.5 rounded bg-black/50 text-[#FFD700] text-[10px] font-bold">
                            {selectedStyle.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs text-gray-400">
                      <span>Pro unlocks 4K export & Imagen 3 models</span>
                      <button
                        onClick={() => onOpenPro('Unlock 4K ultra-high resolution asset exports.')}
                        className="text-[#FFD700] hover:underline font-bold"
                      >
                        Upgrade →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOOL 3: Copywriter Engine */}
            {activeTab === 'copy' && (
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl animate-fade-in space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Controls */}
                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Product / Feature Concept
                      </label>
                      <input
                        type="text"
                        value={productTopic}
                        onChange={(e) => setProductTopic(e.target.value)}
                        className="w-full p-3 rounded-xl bg-black/30 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Brand Voice & Tone
                      </label>
                      <div className="space-y-1.5">
                        {COPY_TONES.map((tone) => (
                          <button
                            key={tone.id}
                            onClick={() => setSelectedTone(tone.id as 'Visionary' | 'Enterprise' | 'Witty' | 'Minimalist')}
                            className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border flex items-center justify-between ${
                              selectedTone === tone.id
                                ? 'bg-[#FFD700]/20 border-[#FFD700] text-[#FFD700] font-bold'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <span>{tone.label}</span>
                            <span className="text-[10px] text-gray-400 font-normal">{tone.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSimulateCopyGen}
                      disabled={isGeneratingCopy}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      {isGeneratingCopy ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Copy...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-3.5 h-3.5" />
                          <span>Generate Conversion Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Output Showcase */}
                  <div className="lg:col-span-7 p-6 rounded-2xl bg-black/30 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Generated Hero Wireframe
                      </span>
                      <button
                        onClick={() => {
                          const fullCopy = `# ${copyResult.badge}\n\n# ${copyResult.headline}\n\n${copyResult.subheadline}\n\nKey Benefits:\n${copyResult.bulletPoints.map(b => `- ${b}`).join('\n')}\n\nPrimary CTA: ${copyResult.ctaText}\nSecondary CTA: ${copyResult.secondaryCta}`;
                          handleCopyText(fullCopy, 'all');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-gray-200 transition-colors flex items-center gap-1.5"
                      >
                        {copiedSection === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSection === 'all' ? 'Copied' : 'Copy Markdown'}</span>
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFD700]/15 text-[#FFD700] text-[11px] font-semibold">
                        {copyResult.badge}
                      </span>
                      <h4 className="text-xl font-bold text-white font-kreon leading-snug">
                        {copyResult.headline}
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {copyResult.subheadline}
                      </p>
                      <div className="space-y-1.5 py-1">
                        {copyResult.bulletPoints.map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <Check className="w-3.5 h-3.5 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF8A65] text-[#1A1A2E] font-bold text-xs">
                          {copyResult.ctaText}
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold">
                          {copyResult.secondaryCta}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AD POSITION 3: Inside the AI Studio section (after the tools) */}
            <AdUnit
              id="ad-unit-aistudio-after-tools"
              position="aistudio-after-tools"
              isConsentGranted={isConsentGranted}
              onUpgradeClick={() => onOpenPro('Remove all ads with Studio Pro')}
              className="mt-8"
            />
          </div>

          {/* AD POSITION 5: Sidebar on desktop (right side of AI Studio) */}
          <AdUnit
            id="ad-unit-aistudio-sidebar"
            position="aistudio-sidebar"
            isConsentGranted={isConsentGranted}
            onUpgradeClick={() => onOpenPro('Go Ad-Free with Studio Pro')}
          />
        </div>

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
