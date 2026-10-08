import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="py-32 px-4 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-humorphic-orange" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border border-humorphic-gold animate-ping opacity-30" />
      </div>
      <div className="text-center space-y-1">
        <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block">
          STREAMING CYBERNETIC WORKSPACE
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          Syncing Whole-Body Control Telemetry...
        </span>
      </div>
    </div>
  );
}
