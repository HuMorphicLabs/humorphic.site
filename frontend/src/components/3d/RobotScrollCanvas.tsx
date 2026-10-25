'use client';

import React, { useRef, useEffect, useCallback } from 'react';

export interface RobotScrollCanvasProps {
  totalFrames?: number;
  className?: string;
  framesPath?: string;
  frameExtension?: string;
}

export function RobotScrollCanvas({
  totalFrames = 300,
  className = '',
  framesPath = '/frames/ezgif-frame-',
  frameExtension = '.jpg',
}: RobotScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastRenderedIndexRef = useRef<number>(-1);
  const isMountedRef = useRef<boolean>(true);
  const sampledColorRef = useRef<string>('#92a7bc');

  // Cached canvas resolution to eliminate getBoundingClientRect layout thrashing
  const sizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  // Direct drag / scrub interaction state
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const startFrameRef = useRef<number>(0);

  // Helper to format frame path: /frames/ezgif-frame-001.jpg
  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index + 1).padStart(3, '0');
      return `${framesPath}${padded}${frameExtension}`;
    },
    [framesPath, frameExtension]
  );

  // Auto-sample studio backdrop color from corner pixel of frame
  const sampleColorFromImage = useCallback((img: HTMLImageElement) => {
    try {
      const offscreen = document.createElement('canvas');
      offscreen.width = 16;
      offscreen.height = 16;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;
      offCtx.drawImage(img, 0, 0, 16, 16);
      const pixel = offCtx.getImageData(2, 2, 1, 1).data;
      if (pixel[3] > 0) {
        const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        sampledColorRef.current = color;
        if (containerRef.current) {
          containerRef.current.style.backgroundColor = color;
        }
      }
    } catch (_) {
      sampledColorRef.current = '#92a7bc';
    }
  }, []);

  // High-performance render function with zero layout thrashing
  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(frameIndex)));

      // Find target image or fallback to nearest loaded image
      let img = imagesRef.current[clamped];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < totalFrames; offset++) {
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

      // Skip redundant repaints if same frame is already displayed
      if (clamped === lastRenderedIndexRef.current) return;
      lastRenderedIndexRef.current = clamped;

      const { width, height } = sizeRef.current;
      if (width === 0 || height === 0) return;

      // Fill canvas background with seamless studio backdrop color
      ctx.fillStyle = sampledColorRef.current;
      ctx.fillRect(0, 0, width, height);

      // Precise aspect ratio containment (fitScale = 1.0 for edge-to-edge precision)
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

  // ResizeObserver to manage canvas resolution without triggering layout thrashing in render loop
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

  // Two-Pass Progressive Preloading Strategy:
  // Pass 1: Preload keyframes at step 5 across entire 0-300 range (60 images = ~1.2MB, loads in <250ms)
  // Pass 2: Concurrently preload all remaining intermediate frames with img.decode()
  useEffect(() => {
    isMountedRef.current = true;
    const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);
    imagesRef.current = images;

    // Load first frame immediately for instant first paint
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = async () => {
      if ('decode' in firstImg) {
        await firstImg.decode().catch(() => {});
      }
      images[0] = firstImg;
      sampleColorFromImage(firstImg);
      if (isMountedRef.current) {
        renderFrame(0);
      }
    };

    // Pass 1: Keyframe indices [5, 10, 15, ..., 295, 299]
    const keyframes: number[] = [];
    for (let i = 5; i < totalFrames; i += 5) {
      keyframes.push(i);
    }
    if (keyframes[keyframes.length - 1] !== totalFrames - 1) {
      keyframes.push(totalFrames - 1);
    }

    // Pass 2: All intermediate indices
    const keyframeSet = new Set(keyframes);
    keyframeSet.add(0);
    const remainingFrames: number[] = [];
    for (let i = 1; i < totalFrames; i++) {
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
        img.onerror = () => {
          resolve();
        };
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

    // Execute Pass 1 with 8 concurrent workers
    const pass1Queue = [...keyframes];
    const pass1Concurrency = 8;
    const pass1Promises = Array.from({ length: pass1Concurrency }, () => runWorker(pass1Queue));

    Promise.all(pass1Promises).then(() => {
      if (!isMountedRef.current) return;
      // Execute Pass 2 with 10 concurrent workers
      const pass2Queue = [...remainingFrames];
      const pass2Concurrency = 10;
      Array.from({ length: pass2Concurrency }, () => runWorker(pass2Queue));
    });

    return () => {
      isMountedRef.current = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [totalFrames, getFrameUrl, sampleColorFromImage, renderFrame]);

  // Continuous physics LERP animation loop (Linear Interpolation for silky smoothness)
  useEffect(() => {
    const loop = () => {
      const delta = targetFrameRef.current - currentFrameRef.current;
      const lerpSpeed = 0.1;

      if (Math.abs(delta) > 0.005) {
        currentFrameRef.current += delta * lerpSpeed;
        renderFrame(currentFrameRef.current);
      } else if (currentFrameRef.current !== targetFrameRef.current) {
        currentFrameRef.current = targetFrameRef.current;
        renderFrame(currentFrameRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Scroll listener tracking parent sticky section progress
  useEffect(() => {
    const handleScroll = () => {
      if (isDraggingRef.current) return;
      const container = containerRef.current;
      if (!container) return;

      const parentSection = container.closest('section') || container;
      const rect = parentSection.getBoundingClientRect();
      const windowH = window.innerHeight;

      const scrollDistance = rect.height - windowH;
      let progress = 0;

      if (scrollDistance > 50) {
        // Sticky track mode: progresses as section scrolls from rect.top = 0 to -scrollDistance
        progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
      } else {
        // Fallback viewport entrance mode
        const totalRange = windowH + rect.height;
        const current = windowH - rect.top;
        progress = Math.max(0, Math.min(1, current / totalRange));
      }

      targetFrameRef.current = progress * (totalFrames - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalFrames]);

  // Pointer drag-to-scrub handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startFrameRef.current = currentFrameRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - startYRef.current;
    const dominantDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : -deltaY;
    const frameStep = dominantDelta * 0.45;

    let newFrame = (startFrameRef.current + frameStep) % totalFrames;
    if (newFrame < 0) newFrame += totalFrames;
    targetFrameRef.current = newFrame;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  // Wheel scrubbing directly on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.sign(e.deltaY) * 2.5;
      let nextFrame = targetFrameRef.current + delta;
      nextFrame = Math.max(0, Math.min(totalFrames - 1, nextFrame));
      targetFrameRef.current = nextFrame;
    };

    canvas.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [totalFrames]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-[#92a7bc] transition-colors duration-300 ${className}`}
    >
      {/* Pristine Dedicated Canvas Element - Pure Animation Showcase Without Any Overlaid Components */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-full object-contain cursor-grab active:cursor-grabbing touch-none select-none block"
      />
    </div>
  );
}
