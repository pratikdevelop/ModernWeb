import React, { useEffect, useRef } from 'react';

interface ParticlesBackgroundProps {
  isRainbowMode?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ isRainbowMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const defaultColors = ['#FFD700', '#20B2AA', '#FF6B9D', '#8E2DE2', '#00D4AA'];
    const rainbowColors = ['#FF0055', '#FF8800', '#FFDD00', '#00FF88', '#00CCFF', '#AA00FF'];

    const count = Math.min(Math.floor((width * height) / 22000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.2 - Math.random() * 0.45,
        size: Math.random() * 3 + 1.2,
        color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const colors = isRainbowMode ? rainbowColors : defaultColors;

      particles.forEach((p, idx) => {
        p.x += p.vx * (isRainbowMode ? 2.5 : 1);
        p.y += p.vy * (isRainbowMode ? 2.5 : 1);

        // Wrap around screen
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const dynamicAlpha = Math.max(0.1, p.alpha + Math.sin(time + idx) * 0.15);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isRainbowMode ? colors[idx % colors.length] : p.color;
        ctx.globalAlpha = dynamicAlpha;
        ctx.shadowBlur = isRainbowMode ? 14 : 8;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
      });

      // Subtle connection lines between close particles
      ctx.globalAlpha = 0.06;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isRainbowMode ? '#FFD700' : '#8E2DE2';
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRainbowMode]);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
