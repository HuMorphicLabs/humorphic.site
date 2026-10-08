'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface FallbackViewerProps {
  totalFrames?: number;
  className?: string;
}

export function FallbackViewer({
  totalFrames = 300,
  className = '',
}: FallbackViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let active = true;
    const images: HTMLImageElement[] = [];

    // Preload first 30 frames immediately for quick start
    const initialLoadCount = Math.min(30, totalFrames);
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${padded}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= initialLoadCount && active) {
          setLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      active = false;
    };
  }, [totalFrames]);

  useEffect(() => {
    if (!isPlaying || !loaded) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev >= totalFrames ? 1 : prev + 1));
    }, 40); // 25 FPS

    return () => clearInterval(interval);
  }, [isPlaying, loaded, totalFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[currentFrame - 1];
    if (img && img.complete) {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;

      // Draw aspect fill / contain
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    }
  }, [currentFrame, loaded]);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center bg-cyber-bg overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full object-contain" />

      {/* Control Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-cyber-card/85 backdrop-blur-md px-4 py-2 rounded-full border border-cyber-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause frame playback' : 'Play frame playback'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <span className="text-xs font-mono text-slate-300 min-w-[70px] text-center">
          {String(currentFrame).padStart(3, '0')} / {totalFrames}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentFrame(1)}
          aria-label="Reset frame animation"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute top-4 right-4 bg-amber-950/70 border border-amber-500/40 px-3 py-1 rounded text-[10px] font-mono text-amber-300">
        2D TELEMETRY CACHE STREAM
      </div>
    </div>
  );
}
