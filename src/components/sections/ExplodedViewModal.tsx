'use client';

import React, { useEffect, useState } from 'react';
import { X, Bot, Layers } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ExplodedHUD } from '@/components/sections/ExplodedHUD';

// Dynamically import the 3D canvas (no SSR)
const ExplodedViewCanvas = dynamic(
  () => import('@/components/3d/ExplodedViewCanvas').then((m) => m.ExplodedViewCanvas),
  { ssr: false, loading: () => <CanvasPlaceholder /> }
);

function CanvasPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-2 border-[#97D7FF]/40 border-t-[#97D7FF] animate-spin" />
        <span className="text-[10px] font-mono tracking-widest text-slate-400">INITIALIZING 3D ENGINE</span>
      </div>
    </div>
  );
}

export interface ExplodedViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPart: string | null;
  onSelectPart: (partId: string) => void;
}

export function ExplodedViewModal({ isOpen, onClose, selectedPart, onSelectPart }: ExplodedViewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mount then animate in
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const t = setTimeout(() => setVisible(true), 30);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      const t = setTimeout(() => {
        setMounted(false);
        setIsExploded(false);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!mounted) return null;

  return (
    <>
      {/* ── BACKDROP ─────────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-350 bg-black/75 backdrop-blur-sm ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* ── MODAL ────────────────────────────────────────────────────────── */}
      <div
        className={`
          fixed inset-0 z-[75] flex flex-col
          transition-all duration-350
          ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        style={{ pointerEvents: 'none' }}
      >
        {/* Inner container */}
        <div
          className="relative m-4 sm:m-8 lg:m-14 flex-1 rounded-2xl border border-[#97D7FF]/25 bg-[#030c14]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(8,98,136,0.4)] overflow-hidden"
          style={{ pointerEvents: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] z-10"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(151,215,255,0.8) 3px, rgba(151,215,255,0.8) 4px)',
            }}
          />

          {/* Ambient corner glows */}
          <div className="pointer-events-none absolute top-0 left-0 w-80 h-80 bg-[#086288]/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-[#eb3b1c]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          {/* ── TOP BAR ── */}
          <div className="relative z-20 flex items-center justify-between px-5 py-3 border-b border-[#97D7FF]/15 bg-cyber-bg/40">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#eb3b1c] animate-pulse" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFEFC4]" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="h-3.5 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Bot className="h-3.5 w-3.5 text-[#97D7FF]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-white">
                  HMR-5.04 // 3D ANATOMY VIEWER
                </span>
              </div>
              {isExploded && (
                <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-[#eb3b1c]/50 bg-[#eb3b1c]/10 text-[#eb3b1c] tracking-widest animate-pulse">
                  EXPLODED
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Explode / Assemble toggle */}
              <button
                onClick={() => setIsExploded((p) => !p)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider
                  border transition-all duration-300
                  ${isExploded
                    ? 'bg-[#eb3b1c]/20 border-[#eb3b1c]/60 text-[#eb3b1c] hover:bg-[#eb3b1c]/30 shadow-[0_0_15px_rgba(235,59,28,0.3)]'
                    : 'bg-[#086288]/20 border-[#97D7FF]/40 text-[#97D7FF] hover:bg-[#086288]/40 shadow-[0_0_15px_rgba(8,98,136,0.2)]'
                  }
                `}
              >
                <Layers className="h-3 w-3" />
                {isExploded ? 'REASSEMBLE' : 'EXPLODE VIEW'}
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono border border-white/15 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
              >
                <X className="h-3 w-3" />
                CLOSE
              </button>
            </div>
          </div>

          {/* ── 3D CANVAS ── */}
          <div className="relative flex-1" style={{ height: 'calc(100% - 52px)' }}>
            <ExplodedViewCanvas
              isExploded={isExploded}
              selectedPart={selectedPart}
              onSelectPart={onSelectPart}
            />

            {/* Grid floor overlay */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-10"
              style={{
                background: 'linear-gradient(to top, rgba(5,19,29,0.8), transparent)',
              }}
            />

            {/* Corner HUD decorations */}
            <div className="pointer-events-none absolute top-2 left-2 z-20 opacity-40">
              <div className="text-[7px] font-mono text-[#97D7FF] tracking-widest">
                CAM: [0.0, 1.2, 4.2]<br />
                FOV: 42°<br />
                {isExploded ? 'MODE: EXPLODED' : 'MODE: ASSEMBLED'}
              </div>
            </div>
            <div className="pointer-events-none absolute top-2 right-2 z-20 opacity-40 text-right">
              <div className="text-[7px] font-mono text-[#97D7FF] tracking-widest">
                DRAG TO ORBIT<br />
                SCROLL TO ZOOM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CYBERPUNK HUD OVERLAY (rendered at root z-level above modal) ── */}
      <ExplodedHUD
        isExploded={isExploded}
        selectedPart={selectedPart}
        onClose={onClose}
        onSelectPart={onSelectPart}
      />
    </>
  );
}

