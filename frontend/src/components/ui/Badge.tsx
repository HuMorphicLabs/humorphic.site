import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'active' | 'warning' | 'info' | 'neutral';
  pulse?: boolean;
}

export const Badge = ({
  className,
  variant = 'active',
  pulse = false,
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    active: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
    warning: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
    info: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40',
    neutral: 'bg-slate-900/60 text-slate-300 border-slate-700/60',
  };

  const dotColors = {
    active: 'bg-emerald-400',
    warning: 'bg-amber-400',
    info: 'bg-cyan-400',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider backdrop-blur-md select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              dotColors[variant]
            )}
          />
        )}
        <span
          className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            dotColors[variant]
          )}
        />
      </span>
      <span>{children}</span>
    </span>
  );
};
