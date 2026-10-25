'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'block w-full rounded-md border border-cyber-border bg-cyber-card/90 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-inner backdrop-blur-md transition-colors',
              'focus:border-[#97D7FF] focus:outline-none focus:ring-1 focus:ring-[#97D7FF]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500 text-red-100',
              className
            )}
            {...props}
          />
          {rightIcon && !error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              {rightIcon}
            </div>
          )}
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-red-400">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-400 font-mono flex items-center gap-1 mt-1">
            <span>// ERR:</span> {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-slate-400 font-mono mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
