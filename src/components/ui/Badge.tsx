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
    active: 'bg-[#086288]/40 text-[#97D7FF] border-[#97D7FF]/40 shadow-[0_0_15px_rgba(151,215,255,0.2)]',
    warning: 'bg-[#FFEFC4]/15 text-[#FFEFC4] border-[#FFEFC4]/40',
    info: 'bg-[#4D8DBA]/25 text-[#97D7FF] border-[#4D8DBA]/50',
    neutral: 'bg-[#0D2B3E] text-slate-300 border-[#1C4E6D]',
  };

  const dotColors = {
    active: 'bg-[#97D7FF]',
    warning: 'bg-[#FFEFC4]',
    info: 'bg-[#4D8DBA]',
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
