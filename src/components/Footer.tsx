import React from 'react';
import { Sparkles, FileCode, Shield, Heart } from 'lucide-react';
import { AdUnit } from './AdUnit';

interface FooterProps {
  isConsentGranted: boolean;
  onOpenPro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isConsentGranted, onOpenPro }) => {
  return (
    <footer role="contentinfo" className="pt-12 pb-16 border-t border-white/10 bg-[#0F0F1D] text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Ad Unit */}
        <AdUnit
          id="ad-unit-footer"
          position="footer"
          isConsentGranted={isConsentGranted}
          onUpgradeClick={onOpenPro}
          className="mb-12"
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-y border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold font-kreon text-white bg-gradient-to-r from-[#4A00E0] via-[#8E2DE2] to-[#FFD700] bg-clip-text text-transparent">
              ModernWeb
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-xs text-gray-300 font-medium">
              Human + AI Content Architecture
            </span>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
            <li>
              <a href="#home" className="hover:text-[#FFD700] transition-colors">Home</a>
            </li>
            <li>
              <a href="#features" className="hover:text-[#FFD700] transition-colors">Features</a>
            </li>
            <li>
              <a href="#demo" className="hover:text-[#FFD700] transition-colors">Interactive Demo</a>
            </li>
            <li>
              <a href="#ai-studio" className="hover:text-[#FFD700] transition-colors">AI Studio</a>
            </li>
            <li>
              <a href="/ads.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors flex items-center gap-1">
                <FileCode className="w-3 h-3 text-[#FFD700]" /> ads.txt
              </a>
            </li>
            <li>
              <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#20B2AA]" /> robots.txt
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} ModernWeb. The future of content is Human + AI. All rights reserved.
          </p>

          <p className="flex items-center gap-1 text-gray-400">
            <span>Crafted for high performance & monetization with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current inline" />
            <span>& AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
