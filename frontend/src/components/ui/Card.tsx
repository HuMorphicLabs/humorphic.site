import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: 'orange' | 'gold' | 'cyan' | 'none';
}

export const Card = ({
  className,
  children,
  hoverEffect = true,
  glow = 'none',
  ...props
}: CardProps) => {
  const glowStyles = {
    orange: 'hover:border-humorphic-orange/60 hover:shadow-glow',
    gold: 'hover:border-humorphic-gold/60 hover:shadow-glow-gold',
    cyan: 'hover:border-humorphic-cyan/60 hover:shadow-glow-cyan',
    none: '',
  };

  return (
    <div
      className={cn(
        'relative rounded-xl border border-cyber-border/80 bg-cyber-card/75 p-6 backdrop-blur-xl transition-all duration-300',
        hoverEffect && 'hover:-translate-y-1 hover:border-slate-600',
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl-sm pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br-sm pointer-events-none" />
      {children}
    </div>
  );
};
