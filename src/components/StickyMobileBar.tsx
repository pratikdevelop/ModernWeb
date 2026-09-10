import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface StickyMobileBarProps {
  onAction?: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onAction }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleClick = () => {
    if (onAction) {
      onAction();
    } else {
      const el = document.getElementById('ai-studio');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside
      aria-label="Mobile Quick Access Bar"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 animate-fade-in"
    >
      <div className="p-2.5 rounded-2xl bg-gradient-to-r from-[#2D1B69] via-[#1A1A2E] to-[#4A00E0] border border-[#FFD700]/40 shadow-2xl flex items-center justify-between gap-2 backdrop-blur-xl">
        <button
          onClick={handleClick}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#FFD700] text-[#1A1A2E] font-extrabold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Try AI Studio Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss quick bar"
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
