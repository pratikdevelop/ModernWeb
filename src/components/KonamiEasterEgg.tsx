import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface KonamiEasterEggProps {
  onActivate: (active: boolean) => void;
}

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const KonamiEasterEgg: React.FC<KonamiEasterEggProps> = ({ onActivate }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      setKeys((prev) => {
        const nextKeys = [...prev, key].slice(-KONAMI_SEQUENCE.length);

        // Check match
        const isMatch = nextKeys.every(
          (val, idx) => val.toLowerCase() === KONAMI_SEQUENCE[idx].toLowerCase()
        );

        if (isMatch) {
          setIsActive(true);
          onActivate(true);

          // Announce to screen reader
          const el = document.createElement('div');
          el.setAttribute('aria-live', 'assertive');
          el.className = 'sr-only';
          el.textContent = 'Special AI Rainbow Easter Egg Mode Activated!';
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 4000);
        }

        return nextKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);

  const handleDismiss = () => {
    setIsActive(false);
    onActivate(false);
  };

  if (!isActive) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF0080] via-[#7928CA] to-[#00DFD8] text-white shadow-2xl flex items-center gap-3 border-2 border-white/40 animate-bounce"
    >
      <Sparkles className="w-5 h-5 text-[#FFD700] animate-spin" />
      <div>
        <p className="font-extrabold text-xs uppercase tracking-wider">
          🌈 Konami AI Rainbow Mode Activated!
        </p>
        <p className="text-[11px] opacity-90">
          Hyperspeed particle flux & color shifting engaged.
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="ml-2 p-1 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
        aria-label="Deactivate Easter Egg"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
