'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { TELEMETRY_STATS } from '@/config/site';
import { Box, Cpu, Clock, Layers, Users, Activity } from 'lucide-react';

const iconsMap: Record<string, any> = {
  Box,
  Cpu,
  Clock,
  Layers,
  Users,
  Activity,
};

export function StatsSection() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const duration = 1800;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts(
        TELEMETRY_STATS.map((stat) =>
          stat.target ? Math.round(stat.target * Math.min(progress, 1)) : 0
        )
      );

      if (step >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stats" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange" />
            05 // TELEMETRY &amp; METRICS // [PROJECT_STATS]
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
            ROBOT AT A <span className="text-humorphic-orange">GLANCE</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Key empirical engineering metrics, fabrication volumes, and testing benchmarks achieved by Humorphic Lab.
          </p>
        </div>

        {/* 6 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {TELEMETRY_STATS.map((stat, idx) => {
            const Icon = iconsMap[stat.iconName] || Activity;
            return (
              <Card
                key={stat.label}
                glow="orange"
                className="p-5 text-center flex flex-col items-center justify-between group hover:border-humorphic-orange/60"
              >
                <div className="p-3 rounded-lg bg-cyber-bg border border-white/10 text-humorphic-orange mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-1 my-auto">
                  <div className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                    {stat.textVal ? (
                      stat.textVal
                    ) : (
                      <>
                        {counts[idx]}
                        <span className="text-sm text-humorphic-gold ml-0.5">
                          {stat.suffix}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-300">
                    {stat.label}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500 pt-3 border-t border-white/5 w-full mt-3">
                  {stat.sub}
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
