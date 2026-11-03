'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Rotate3d,
  Maximize2,
  Minimize2,
  Sun,
  Eye,
  Camera,
  Layers,
  Sparkles,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Scene } from './Scene';
import { HumanoidRobot } from './HumanoidRobot';
import { FallbackViewer } from './FallbackViewer';
import { ANATOMY_SUBSYSTEMS } from '@/config/site';

// Dynamically import GLBModel to avoid SSR issues
const GLBModel = dynamic(() => import('./GLBModel').then((mod) => mod.GLBModel), {
  ssr: false,
});

export interface ModelViewerProps {
  modelUrl?: string | null;
  selectedPart?: string | null;
  onSelectPart?: (partId: string) => void;
  className?: string;
  borderless?: boolean;
}

class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode; onError?: (error: any) => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('3D Canvas encountered a rendering error, falling back:', error);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function ModelViewer({
  modelUrl = null,
  selectedPart = null,
  onSelectPart,
  className = '',
  borderless = false,
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [highLighting, setHighLighting] = useState(false);
  const [useFallback2D, setUseFallback2D] = useState(false);
  const [activeModelChoice, setActiveModelChoice] = useState<'procedural' | 'glb'>('procedural');

  useEffect(() => {
    setIsMounted(true);
    // Check if WebGL is supported
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL is not supported in this browser. Switching to 2D frame animation fallback.');
        setUseFallback2D(true);
      }
    } catch {
      setUseFallback2D(true);
    }
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Get active part details
  const activeSubsystem = selectedPart ? ANATOMY_SUBSYSTEMS[selectedPart] : null;

  return (
    <div
      ref={containerRef}
      className={
        borderless
          ? `relative w-full h-full bg-transparent overflow-hidden ${className}`
          : `relative w-full h-[520px] sm:h-[620px] lg:h-[720px] rounded-2xl border border-cyber-border bg-cyber-bg/95 overflow-hidden shadow-2xl backdrop-blur-2xl ${className}`
      }
    >
      {!borderless && (
        <>
          {/* Background Cyber Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent pointer-events-none" />
        </>
      )}

      {/* Floating Toolbar & HUD Elements - Only on interactive boxed workstations, NOT on borderless background */}
      {borderless ? null : (
        /* Standard Workstation Top HUD Telemetry Bar */
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Subsystem Focus Badge */}
          <div className="pointer-events-auto flex items-center gap-2 bg-cyber-card/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-cyber-border shadow-lg">
            <div className="h-2 w-2 rounded-full bg-humorphic-orange animate-pulse" />
            <div className="text-xs font-mono">
              {activeSubsystem ? (
                <span className="text-white">
                  <span className="text-humorphic-orange font-bold">// TARGET:</span> {activeSubsystem.title}
                </span>
              ) : (
                <span className="text-slate-300">
                  <span className="text-humorphic-gold font-bold">// 3D SCENE:</span> HUMORPHIC ROBOT v5.04
                </span>
              )}
            </div>
          </div>

          {/* Quick Toolbar */}
          <div className="pointer-events-auto flex items-center gap-1.5 bg-cyber-card/85 backdrop-blur-md p-1 rounded-lg border border-cyber-border shadow-lg">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-md transition-colors ${
                autoRotate ? 'bg-humorphic-orange text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle Auto Rotation"
            >
              <Rotate3d className="h-4 w-4" />
            </button>
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`p-2 rounded-md transition-colors ${
                wireframe ? 'bg-humorphic-orange text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle Wireframe Mode"
            >
              <Layers className="h-4 w-4" />
            </button>
            <button
              onClick={() => setHighLighting(!highLighting)}
              className={`p-2 rounded-md transition-colors ${
                highLighting ? 'bg-humorphic-gold text-black' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle Studio Lighting"
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => onSelectPart?.('')}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset Camera & Focus"
            >
              <Camera className="h-4 w-4" />
            </button>
            <button
              onClick={() => setUseFallback2D(!useFallback2D)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                useFallback2D
                  ? 'bg-amber-900/60 border-amber-500 text-amber-200'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
              title="Toggle 2D Frame Animation Fallback"
            >
              {useFallback2D ? '2D MODE' : '3D WEBGL'}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Main 3D Canvas or 2D Fallback */}
      <div className="w-full h-full">
        {!isMounted ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-cyber-bg/50">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-humorphic-orange border-t-transparent" />
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              INITIALIZING 3D WORKSTATION...
            </p>
          </div>
        ) : useFallback2D ? (
          <FallbackViewer totalFrames={300} />
        ) : (
          <CanvasErrorBoundary
            fallback={<FallbackViewer totalFrames={300} />}
            onError={() => setUseFallback2D(true)}
          >
            <Scene
              autoRotate={autoRotate}
              targetCoords={activeSubsystem?.targetCoords || null}
              lightIntensity={highLighting ? 1.6 : 1.0}
              enableZoom={!borderless}
            >
              {modelUrl && activeModelChoice === 'glb' ? (
                <GLBModel url={modelUrl} wireframe={wireframe} />
              ) : (
                <HumanoidRobot
                  selectedPart={selectedPart}
                  onSelectPart={onSelectPart}
                  wireframe={wireframe}
                />
              )}
            </Scene>
          </CanvasErrorBoundary>
        )}
      </div>

      {/* Bottom Hint / Coordinates Telemetry */}
      {!borderless && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-[11px] font-mono text-slate-400">
          <div className="pointer-events-auto bg-cyber-card/70 backdrop-blur-md px-3 py-1 rounded border border-white/5">
            Left Click + Drag: Orbit • Scroll: Zoom • Click Limbs: Inspect
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            {modelUrl && (
              <div className="bg-cyber-card/85 backdrop-blur-md px-2 py-1 rounded border border-cyber-border text-[11px] flex items-center gap-1.5">
                <button
                  onClick={() => setActiveModelChoice('procedural')}
                  className={`px-1.5 py-0.5 rounded ${activeModelChoice === 'procedural' ? 'bg-humorphic-orange text-white' : 'text-slate-400'}`}
                >
                  Humanoid v5
                </button>
                <button
                  onClick={() => setActiveModelChoice('glb')}
                  className={`px-1.5 py-0.5 rounded ${activeModelChoice === 'glb' ? 'bg-humorphic-orange text-white' : 'text-slate-400'}`}
                >
                  Loaded GLB
                </button>
              </div>
            )}
            <span className="hidden sm:inline bg-cyber-card/70 backdrop-blur-md px-3 py-1 rounded border border-white/5">
              FPS: 60 • R3F v9 • THREE v0.173
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
