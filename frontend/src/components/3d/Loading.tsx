'use client';

import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

export function Loading3D() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center rounded-xl border border-cyber-border bg-cyber-card/90 px-6 py-4 shadow-2xl backdrop-blur-xl min-w-[200px] text-center select-none">
        <Loader2 className="h-8 w-8 animate-spin text-humorphic-orange mb-3" />
        <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
          STREAMING 3D MESH
        </span>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-humorphic-orange to-humorphic-gold h-full transition-all duration-300"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <span className="text-[11px] font-mono text-slate-400 mt-2">
          {Math.round(progress)}% LOADED
        </span>
      </div>
    </Html>
  );
}
