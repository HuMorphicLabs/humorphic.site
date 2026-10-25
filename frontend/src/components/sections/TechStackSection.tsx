'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { TECH_STACK } from '@/config/site';
import {
  Cpu,
  Wifi,
  HardDrive,
  Code,
  Terminal,
  Box,
  Zap,
  Eye,
} from 'lucide-react';

const iconsMap: Record<string, any> = {
  Cpu,
  Wifi,
  HardDrive,
  Code,
  Terminal,
  Box,
  Zap,
  Eye,
};

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 reveal-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange animate-pulse" />
            06 // TECH ARCHITECTURE // [CORE_STACK]
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase reveal-blur-sharp">
            TECHNOLOGY <span className="text-humorphic-orange">STACK</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            The silicon micro-controllers, software engines, and hardware frameworks powering our autonomous humanoid platform.
          </p>
        </div>

        {/* 8 Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger-parent">
          {TECH_STACK.map((tech) => {
            const Icon = iconsMap[tech.iconName] || Cpu;
            return (
              <Card
                key={tech.name}
                glow="primary"
                className="p-6 flex flex-col justify-between group hover:border-[#97D7FF]/60 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-cyber-bg border border-[#97D7FF]/30 text-[#97D7FF] group-hover:scale-110 transition-transform shadow-glow-sky">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFEFC4] bg-[#086288]/40 border border-[#97D7FF]/40 px-2 py-0.5 rounded">
                      {tech.pill}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-[#FFEFC4] transition-colors">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>PRODUCTION READY</span>
                  <span className="text-emerald-400">SYNCED</span>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
