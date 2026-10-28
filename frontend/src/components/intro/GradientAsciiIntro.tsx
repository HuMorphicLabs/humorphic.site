'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  seed: number;
}

interface ColorStop {
  pos: number;
  r: number;
  g: number;
  b: number;
}

// Humorphic Lab palette: #03071E, #6A040F, #DC2F02, #F4AC06, #FFBA08, #FFEFC4
const COLOR_STOPS: ColorStop[] = [
  { pos: 0.00, r: 3, g: 7, b: 30 },     // #03071E Deep Navy
  { pos: 0.20, r: 106, g: 4, b: 15 },   // #6A040F Wine
  { pos: 0.48, r: 220, g: 47, b: 2 },   // #DC2F02 Red-Orange
  { pos: 0.72, r: 244, g: 172, b: 6 },  // #F4AC06 Amber
  { pos: 0.90, r: 255, g: 186, b: 8 },  // #FFBA08 Golden Yellow
  { pos: 1.00, r: 255, g: 239, b: 196 },// #FFEFC4 Cream highlight
];

// Pre-render a 256-step color lookup table for maximum 60fps performance
const LUT_SIZE = 256;
const COLOR_LUT: { fill: string; stroke: string }[] = [];
for (let i = 0; i < LUT_SIZE; i++) {
  const t = i / (LUT_SIZE - 1);
  let s0 = COLOR_STOPS[0];
  let s1 = COLOR_STOPS[COLOR_STOPS.length - 1];
  for (let s = 0; s < COLOR_STOPS.length - 1; s++) {
    if (t >= COLOR_STOPS[s].pos && t <= COLOR_STOPS[s + 1].pos) {
      s0 = COLOR_STOPS[s];
      s1 = COLOR_STOPS[s + 1];
      break;
    }
  }
  const factor = (t - s0.pos) / (s1.pos - s0.pos || 1);
  const r = Math.round(s0.r + (s1.r - s0.r) * factor);
  const g = Math.round(s0.g + (s1.g - s0.g) * factor);
  const b = Math.round(s0.b + (s1.b - s0.b) * factor);
  // High energy characters are brighter and fully opaque
  const a = Math.min(1, Math.max(0.18, Math.pow(t, 0.72)));
  COLOR_LUT.push({
    fill: `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`,
    stroke: `rgba(${r}, ${g}, ${b}, ${(a * 0.5).toFixed(3)})`,
  });
}

// Density ramp of ASCII characters requested: #, *, +, ., 0, and suitable robotics symbols
const ASCII_RAMP = [' ', '.', '·', ':', '+', '*', 'x', '0', '8', '#', '%', '@'];

const INTRO_STORAGE_KEY = 'humorphic_intro_seen_v1';

export function GradientAsciiIntro() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; lastMove: number }>({
    x: 0,
    y: 0,
    active: false,
    lastMove: 0,
  });

  const [isMounted, setIsMounted] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);

  // Check if intro should play (first time opening URL, or forced via ?intro=1 / ?replay=1)
  useEffect(() => {
    setIsMounted(true);
    try {
      const search = window.location.search;
      const forceReplay = search.includes('intro') || search.includes('replay');
      const alreadySeen = sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true';

      if (alreadySeen && !forceReplay) {
        setIsDone(true);
        return;
      }
    } catch {
      // In case sessionStorage is blocked by security policy, proceed gracefully
    }

    setShouldShow(true);

    // Save flag so internal navigation or section scrolls don't re-trigger it
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    } catch {
      // Ignore
    }
  }, []);

  // Listen for programmatic replay events: window.dispatchEvent(new CustomEvent('replay-intro'))
  useEffect(() => {
    const handleReplay = () => {
      setIsDone(false);
      setIsExiting(false);
      setShowText(false);
      setProgress(0);
      setShouldShow(true);
      startTimeRef.current = performance.now();
    };

    // Also expose helper on window for easy developer & user verification
    if (typeof window !== 'undefined') {
      (window as unknown as { replayIntro: () => void }).replayIntro = () => {
        window.dispatchEvent(new CustomEvent('replay-intro'));
      };
    }

    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  // Body scroll lock while intro is active
  useEffect(() => {
    if (shouldShow && !isDone) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [shouldShow, isDone]);

  // Handle immediate dismissal (Skip / Esc key)
  const handleSkip = useCallback(() => {
    if (isExiting || isDone) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsDone(true);
    }, 700);
  }, [isExiting, isDone]);

  // Keyboard shortcut listener (Escape, Space, Enter skips)
  useEffect(() => {
    if (!shouldShow || isDone) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shouldShow, isDone, handleSkip]);

  // Tab visibility: pause animation when browser tab is hidden to save battery & GPU
  useEffect(() => {
    const handleVisibility = () => {
      isPausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Main Intro Sequence & Fallback Timers
  useEffect(() => {
    if (!shouldShow || isDone) return;

    // Respect prefers-reduced-motion accessibility setting
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Show brand static card briefly and gracefully reveal homepage
      setShowText(true);
      const reducedTimer = setTimeout(() => {
        handleSkip();
      }, 1200);
      return () => clearTimeout(reducedTimer);
    }

    // Step 1: Reveal brand text at 350ms synchronized with ASCII wave
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 350);

    // Step 2: Keep visible for ~2.5 - 2.8 seconds, then trigger smooth exit fade
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2600);

    // Step 3: Complete transition at 3.35s and unmount overlay
    const doneTimer = setTimeout(() => {
      setIsDone(true);
    }, 3350);

    // Step 4: Reliable safety fallback: guarantee homepage is visible even if timers stutter
    const fallbackTimer = setTimeout(() => {
      setIsExiting(true);
      setIsDone(true);
    }, 4500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      clearTimeout(fallbackTimer);
    };
  }, [shouldShow, isDone, handleSkip]);

  // Canvas Gradient ASCII Animation Engine
  useEffect(() => {
    if (!shouldShow || isDone) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      // Fallback if canvas context fails
      handleSkip();
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create ambient robotics light particles
    const particleCount = Math.min(42, Math.floor((width * height) / 28000));
    const particles: Particle[] = [];
    const particleColors = ['#FFBA08', '#F4AC06', '#DC2F02', '#97D7FF', '#FFEFC4'];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: 0.35 + Math.random() * 0.8,
        size: 0.8 + Math.random() * 2.2,
        alpha: 0.2 + Math.random() * 0.65,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        seed: Math.random() * 100,
      });
    }

    // Responsive cell sizing
    const isMobile = width < 768;
    const cellW = isMobile ? 10 : 13;
    const cellH = isMobile ? 15 : 19;
    const fontSize = isMobile ? 11 : 13;
    const fontString = `500 ${fontSize}px "Space Grotesk", "JetBrains Mono", ui-monospace, monospace`;

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse ripple tracker
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      mouseRef.current.lastMove = performance.now();
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    startTimeRef.current = performance.now();

    // Render Loop
    const render = (now: number) => {
      if (isPausedRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTimeRef.current) * 0.001; // elapsed in seconds
      const t = elapsed * 1.45; // animation flow speed

      // Update progress bar
      const p = Math.min(100, Math.round((elapsed / 2.6) * 100));
      setProgress(p);

      // Mouse ripple decay
      if (mouseRef.current.active && now - mouseRef.current.lastMove > 1800) {
        mouseRef.current.active = false;
      }

      // 1. Deep Navy background clearing
      ctx.fillStyle = '#03071E';
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Cyber Grid & Glow Backdrop
      const cx = width * 0.5;
      const cy = height * 0.48;

      // Soft radial bloom in center for robotics atmosphere
      const radialGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.65);
      radialGlow.addColorStop(0, 'rgba(106, 4, 15, 0.22)');
      radialGlow.addColorStop(0.35, 'rgba(220, 47, 2, 0.12)');
      radialGlow.addColorStop(0.7, 'rgba(3, 7, 30, 0.6)');
      radialGlow.addColorStop(1, 'rgba(3, 7, 30, 0.98)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Render Flowing Gradient ASCII Characters
      ctx.font = fontString;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = Math.ceil(width / cellW);
      const rows = Math.ceil(height / cellH);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      for (let r = 0; r < rows; r++) {
        const y = r * cellH + cellH * 0.5;
        const ny = r / rows;

        for (let c = 0; c < cols; c++) {
          const x = c * cellW + cellW * 0.5;
          const nx = c / cols;

          // Flow formula: Combination of diagonal plasma wave, counter-current swirl, and focal ripple
          const w1 = Math.sin(nx * 4.8 + ny * 3.4 + t * 1.5);
          const w2 = Math.cos(nx * 3.8 - ny * 5.0 - t * 1.2);

          // Center brand focal swell
          const dx = (nx - 0.5) * 1.5;
          const dy = (ny - 0.48) * 1.0;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const w3 = Math.sin(dist * 7.2 - t * 2.1);
          const focalBoost = Math.max(0, 1 - dist * 1.7) * 0.42;

          // Mouse wave distortion
          let mouseWave = 0;
          if (mouseActive) {
            const mDist = Math.hypot(x - mx, y - my);
            if (mDist < 160) {
              mouseWave = Math.sin((1 - mDist / 160) * Math.PI) * 0.32;
            }
          }

          // Combined intensity in [0, 1]
          let intensity = (w1 * 0.27 + w2 * 0.23 + w3 * 0.22 + 0.52) + focalBoost + mouseWave;
          if (intensity < 0.12) continue; // let background breathe
          if (intensity > 1) intensity = 1;

          // Select ASCII glyph
          const charIndex = Math.min(
            ASCII_RAMP.length - 1,
            Math.floor(intensity * (ASCII_RAMP.length - 1))
          );
          const ch = ASCII_RAMP[charIndex];
          if (ch === ' ') continue;

          // Select precalculated palette color
          const lutIdx = Math.min(LUT_SIZE - 1, Math.floor(intensity * (LUT_SIZE - 1)));
          const col = COLOR_LUT[lutIdx];

          ctx.fillStyle = col.fill;
          ctx.fillText(ch, x, y);
        }
      }

      // 4. Subtle Floating Light Particles
      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += Math.sin(p.y * 0.02 + p.seed + elapsed) * 0.45;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.65 + 0.35 * Math.sin(elapsed * 2.5 + p.seed));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. Cinematic Vignette Overlay
      const edgeVignette = ctx.createRadialGradient(cx, cy, Math.min(width, height) * 0.3, cx, cy, Math.max(width, height) * 0.72);
      edgeVignette.addColorStop(0, 'rgba(3, 7, 30, 0)');
      edgeVignette.addColorStop(0.7, 'rgba(3, 7, 30, 0.45)');
      edgeVignette.addColorStop(1, 'rgba(3, 7, 30, 0.92)');
      ctx.fillStyle = edgeVignette;
      ctx.fillRect(0, 0, width, height);

      // Continue loop
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shouldShow, isDone, handleSkip]);

  // If server-side, never requested, or completed, don't render to keep DOM clean
  if (!isMounted || !shouldShow || isDone) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] select-none overflow-hidden bg-[#03071E] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      style={{ willChange: 'opacity, transform' }}
      aria-label="Humorphic Lab Opening Experience"
      role="banner"
    >
      {/* Dynamic Fullscreen HTML5 ASCII Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Scanlines effect for high-tech robotics feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'linear-gradient(rgba(106, 4, 15, 0) 50%, rgba(3, 7, 30, 0.6) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Radial light flare for cinematic transition out */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isExiting ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 186, 8, 0.3) 0%, rgba(220, 47, 2, 0.15) 45%, transparent 75%)',
        }}
      />

      {/* Discrete Skip button for quick user interaction */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-[#03071E]/70 hover:bg-[#03071E]/95 hover:border-[#FFBA08]/60 text-slate-300 hover:text-white transition-all duration-200 backdrop-blur-md shadow-lg group cursor-pointer text-xs font-mono tracking-widest uppercase"
        title="Skip intro animation (Esc)"
      >
        <span>SKIP</span>
        <span className="text-[#FFBA08] text-[10px] opacity-80 group-hover:opacity-100">[ESC]</span>
      </button>

      {/* =========================================================================
          CENTER ANIMATED BRAND REVEAL
          - "HUMORPHIC LAB" text with elegant orange-to-gold gradient & neon glow
          - "ENGINEERING THE FUTURE" refined tagline
          - Cybernetic telemetry status
          ========================================================================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 text-center">
        
        {/* Top Robotics Telemetry Pill */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[#F4AC06]/35 bg-[#03071E]/85 backdrop-blur-xl mb-4 sm:mb-6 shadow-[0_0_20px_rgba(244,172,6,0.25)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFBA08] animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] text-[#FFEFC4]/90 uppercase">
              <span className="text-[#FFBA08] font-bold">HUMORPHIC</span> // 32-DOF BIO-SYSTEMS
            </span>
          </div>
        </div>

        {/* Main Brand Heading: HUMORPHIC LAB */}
        <h1
          className={`font-display font-black tracking-[0.18em] sm:tracking-[0.28em] md:tracking-[0.34em] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            showText ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-7 scale-95'
          }`}
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFBA08 28%, #F4AC06 62%, #DC2F02 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 25px rgba(244, 172, 6, 0.65)) drop-shadow(0 0 55px rgba(220, 47, 2, 0.45)) drop-shadow(0 4px 18px rgba(3, 7, 30, 0.95))',
          }}
        >
          HUMORPHIC LAB
        </h1>

        {/* Tagline: ENGINEERING THE FUTURE */}
        <div
          className={`flex items-center gap-3 sm:gap-6 mt-4 sm:mt-6 transition-all duration-1000 delay-200 ease-out transform ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="h-[1px] w-8 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#F4AC06]/70 to-[#FFBA08]" />
          <span className="text-xs sm:text-sm md:text-base font-mono font-semibold tracking-[0.35em] sm:tracking-[0.52em] text-[#FFEFC4]/95 uppercase drop-shadow-[0_0_15px_rgba(255,186,8,0.6)]">
            ENGINEERING THE FUTURE
          </span>
          <div className="h-[1px] w-8 sm:w-16 md:w-24 bg-gradient-to-l from-transparent via-[#F4AC06]/70 to-[#FFBA08]" />
        </div>

        {/* Cinematic Telemetry Loading Line */}
        <div
          className={`w-40 sm:w-64 h-[2px] bg-white/10 rounded-full mt-7 sm:mt-9 overflow-hidden transition-all duration-700 delay-300 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-[#DC2F02] via-[#F4AC06] to-[#FFBA08] shadow-[0_0_12px_#FFBA08] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Micro-telemetry Status */}
        <div
          className={`mt-3 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#85A9BE]/70 transition-all duration-700 delay-400 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          INITIALIZING KINEMATIC SIMULATION [{progress}%]
        </div>

      </div>

    </div>
  );
}
export default GradientAsciiIntro;

