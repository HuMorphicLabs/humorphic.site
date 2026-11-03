import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Bot, Home, AlertOctagon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 px-4 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full text-center space-y-6 rounded-2xl border border-cyber-border bg-cyber-card/80 p-8 backdrop-blur-2xl">
        <div className="h-16 w-16 rounded-full bg-red-950/50 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center shadow-lg">
          <AlertOctagon className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-humorphic-orange tracking-widest uppercase block">
            // TELEMETRY_FAULT 404
          </span>
          <h1 className="text-3xl font-display font-extrabold text-white">
            COORDINATE UNMAPPED
          </h1>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            The requested cybernetic subsystem, route, or 3D asset could not be located in the lab matrix.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" leftIcon={<Home className="h-4 w-4" />}>
              RETURN TO MAIN BAY
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
