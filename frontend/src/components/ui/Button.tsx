'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-display uppercase tracking-wider font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#97D7FF] focus:ring-offset-2 focus:ring-offset-cyber-bg disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-gradient-to-r from-[#086288] via-[#0d739e] to-[#086288] text-white hover:from-[#107ea8] hover:to-[#086288] shadow-glow border border-[#97D7FF]/60',
      secondary:
        'bg-cyber-card/90 text-[#FFEFC4] border border-[#FFEFC4]/40 hover:border-[#FFEFC4] hover:bg-[#FFEFC4]/10 hover:shadow-glow-cream backdrop-blur-md',
      outline:
        'bg-transparent text-slate-200 border border-cyber-border hover:border-[#97D7FF]/70 hover:text-[#97D7FF] hover:bg-[#97D7FF]/[0.06]',
      ghost:
        'bg-transparent text-slate-400 hover:text-[#97D7FF] hover:bg-white/[0.05]',
      danger:
        'bg-red-950/80 text-red-200 border border-red-700/60 hover:bg-red-900 hover:border-red-500 shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 rounded-sm gap-1.5',
      md: 'text-sm px-5 py-2.5 rounded-md gap-2',
      lg: 'text-base px-7 py-3 rounded-lg gap-2.5 shadow-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
