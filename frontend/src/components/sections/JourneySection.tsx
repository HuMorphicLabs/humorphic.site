'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { TIMELINE_MILESTONES } from '@/config/site';

export function JourneySection() {
  return (
    <section id="journey" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange" />
            04 // CHRONOLOGICAL MILESTONES // [ROADMAP]
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
            OUR <span className="text-humorphic-orange">DEVELOPMENT</span> JOURNEY
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From initial mathematical theory and kinematic simulation to fully articulated physical humanoid prototype.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIMELINE_MILESTONES.map((item) => (
            <Card
              key={item.step}
              glow="orange"
              className="relative p-6 flex flex-col justify-between group hover:border-humorphic-orange/60"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-9 w-9 rounded-lg bg-cyber-bg border border-humorphic-orange/40 flex items-center justify-center font-display font-black text-sm text-humorphic-orange group-hover:scale-110 transition-transform shadow-glow">
                    0{item.step}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.phase}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-humorphic-gold transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  COMPLETED
                </span>
                <span className="text-slate-500">REV.V5</span>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
