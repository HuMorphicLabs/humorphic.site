'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

export interface HeroRobotProps {
  className?: string;
  opacity?: number;
  totalFrames?: number;
  framesPath?: string;
  frameExtension?: string;
  startFrame?: number;
}

export function HeroRobot({
  className = '',
  opacity = 0.75,
  totalFrames = 300,
  framesPath = '/frames/ezgif-frame-',
  frameExtension = '.jpg',
  startFrame = 60,
}: HeroRobotProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  
  // Animation state refs
  const currentFrameRef = useRef<number>(startFrame);
  const targetFrameRef = useRef<number>(startFrame);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastRenderedIndexRef = useRef<number>(-1);
  const isMountedRef = useRef<boolean>(true);
  const startTimeRef = useRef<number>(0);
  const scrollYRef = useRef<number>(0);
  const mouseTiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Cached canvas resolution to eliminate layout thrashing
  const sizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  // Format frame URL: /frames/ezgif-frame-001.jpg
  const getFrameUrl = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(index)));
      const padded = String(clamped + 1).padStart(3, '0');
      return `${framesPath}${padded}${frameExtension}`;
    },
    [framesPath, frameExtension, totalFrames]
  );

  // High-performance render function with sub-pixel crispness
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(frameIndex)));

      // Find target image or nearest loaded neighbor
      let img = imagesRef.current[clamped];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < 30; offset++) {
          const prev = clamped - offset;
          if (prev >= 0 && imagesRef.current[prev]?.complete && imagesRef.current[prev]!.naturalWidth > 0) {
            img = imagesRef.current[prev];
            break;
          }
          const next = clamped + offset;
          if (next < totalFrames && imagesRef.current[next]?.complete && imagesRef.current[next]!.naturalWidth > 0) {
            img = imagesRef.current[next];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Avoid redundant repaints
      if (clamped === lastRenderedIndexRef.current) return;
      lastRenderedIndexRef.current = clamped;

      const { width, height } = sizeRef.current;
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);

      // Aspect ratio containment
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [totalFrames]
  );

  // ResizeObserver for canvas resolution
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (targetW > 0 && targetH > 0) {
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
          sizeRef.current = { width: targetW, height: targetH };
          lastRenderedIndexRef.current = -1;
          renderFrame(currentFrameRef.current);
        }
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [renderFrame]);

  // Reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Frame preloading strategy
  useEffect(() => {
    isMountedRef.current = true;
    const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);
    imagesRef.current = images;

    // Load initial prominent frames immediately for instantaneous paint
    const initialIndices = [startFrame, 0, 100, 120];
    initialIndices.forEach((idx) => {
      const img = new Image();
      img.src = getFrameUrl(idx);
      img.onload = async () => {
        if ('decode' in img) {
          await img.decode().catch(() => {});
        }
        images[idx] = img;
        if (isMountedRef.current && idx === startFrame) {
          renderFrame(startFrame);
        }
      };
    });

    // Pass 1: Dance loop keyframes (step 3 from frame 60 to 300, then 0 to 60)
    const keyframes: number[] = [];
    for (let i = 60; i < totalFrames; i += 3) {
      keyframes.push(i);
    }
    for (let i = 0; i < 60; i += 3) {
      keyframes.push(i);
    }

    // Pass 2: Remaining intermediate frames
    const keyframeSet = new Set(keyframes);
    initialIndices.forEach((idx) => keyframeSet.add(idx));
    const remainingFrames: number[] = [];
    for (let i = 0; i < totalFrames; i++) {
      if (!keyframeSet.has(i)) {
        remainingFrames.push(i);
      }
    }

    const loadSingleFrame = async (idx: number) => {
      if (!isMountedRef.current) return;
      const img = new Image();
      img.src = getFrameUrl(idx);
      await new Promise<void>((resolve) => {
        img.onload = async () => {
          if ('decode' in img) {
            await img.decode().catch(() => {});
          }
          images[idx] = img;
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    async function runWorker(queue: number[]) {
      while (queue.length > 0 && isMountedRef.current) {
        const nextIdx = queue.shift();
        if (nextIdx !== undefined) {
          await loadSingleFrame(nextIdx);
        }
      }
    }

    const pass1Promises = Array.from({ length: 8 }, () => runWorker([...keyframes]));
    Promise.all(pass1Promises).then(() => {
      if (!isMountedRef.current) return;
      Array.from({ length: 10 }, () => runWorker([...remainingFrames]));
    });

    return () => {
      isMountedRef.current = false;
    };
  }, [totalFrames, startFrame, getFrameUrl, renderFrame]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle mouse tracking for gentle 3D depth tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseTiltRef.current = { x: nx * 3.5, y: -ny * 2.5 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  // Combined continuous dance/wave + scroll animation loop with physics LERP
  useEffect(() => {
    if (prefersReducedMotion) {
      renderFrame(startFrame);
      return;
    }

    startTimeRef.current = performance.now();

    const loop = (time: number) => {
      if (!isMountedRef.current) return;

      const elapsed = (time - startTimeRef.current) / 1000;
      
      // Continuous gentle dance & wave loop across frames 60 to 299 (240 frames @ ~20 fps = 12s seamless cycle)
      const loopStart = 60;
      const loopLength = totalFrames - loopStart; // 240 frames
      const fps = 20;
      const baseCycle = (elapsed * fps) % loopLength;

      // Scroll response: as user scrolls down, modulate frame advance naturally
      const scrollOffset = scrollYRef.current * 0.18;
      
      const computedTarget = (loopStart + ((baseCycle + scrollOffset) % loopLength));
      targetFrameRef.current = computedTarget;

      // Smooth physics LERP interpolation
      let delta = targetFrameRef.current - currentFrameRef.current;
      
      // Handle modular wrap-around smoothing
      if (delta > loopLength / 2) delta -= loopLength;
      if (delta < -loopLength / 2) delta += loopLength;

      const lerpSpeed = 0.12;
      currentFrameRef.current = (currentFrameRef.current + delta * lerpSpeed);
      if (currentFrameRef.current < 0) currentFrameRef.current += totalFrames;
      currentFrameRef.current = currentFrameRef.current % totalFrames;

      renderFrame(currentFrameRef.current);

      // Update 3D container parallax and tilt
      if (containerRef.current) {
        const scrollY = scrollYRef.current;
        const translateY = Math.min(scrollY * 0.22, 160);
        const mouse = mouseTiltRef.current;
        containerRef.current.style.transform = `perspective(1000px) translateY(${translateY}px) rotateY(${mouse.x}deg) rotateX(${mouse.y}deg)`;
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [prefersReducedMotion, totalFrames, startFrame, renderFrame]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none transition-transform duration-75 ease-out ${className}`}
      style={{
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      {/* 
        Seamless Feathered Mask:
        Completely eliminates rectangular borders/cards/boxes.
        Melts the studio background smoothly into the #05131D cyber background.
      */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse 65% 72% at 50% 50%, black 35%, rgba(0,0,0,0.85) 55%, transparent 88%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 72% at 50% 50%, black 35%, rgba(0,0,0,0.85) 55%, transparent 88%)',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain block pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
