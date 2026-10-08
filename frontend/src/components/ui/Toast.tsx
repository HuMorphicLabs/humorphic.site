'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  onClose?: () => void;
}

export const Toast = ({ type = 'info', title, message, onClose }: ToastProps) => {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-400" />,
    info: <Info className="h-5 w-5 text-cyan-400" />,
  };

  const borders = {
    success: 'border-emerald-500/40 bg-emerald-950/80',
    error: 'border-red-500/40 bg-red-950/80',
    info: 'border-cyan-500/40 bg-cyan-950/80',
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 shadow-xl backdrop-blur-xl transition-all duration-300 max-w-md w-full',
        borders[type]
      )}
    >
      <div className="shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm">
        <h4 className="font-semibold text-white tracking-wide">{title}</h4>
        {message && <p className="text-slate-300 mt-1 text-xs">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
