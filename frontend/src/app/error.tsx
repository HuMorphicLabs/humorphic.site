'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="py-24 px-4 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full text-center space-y-6 rounded-2xl border border-red-500/40 bg-cyber-card/90 p-8 backdrop-blur-2xl">
        <div className="h-16 w-16 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center shadow-lg">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-red-400 tracking-widest uppercase block">
            // RUNTIME SYSTEM INTERRUPT
          </span>
          <h1 className="text-2xl font-display font-extrabold text-white">
            TELEMETRY CORRUPTED
          </h1>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            An unexpected error occurred while rendering the cybernetic view. System recovery protocol is standing by.
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            onClick={() => reset()}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            RE-INITIALIZE VIEWPORT
          </Button>
        </div>
      </div>
    </div>
  );
}
