'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { CHALLENGES_LIST } from '@/config/site';
import { AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';

export function ChallengesSection() {
  const [activeTab, setActiveTab] = useState(CHALLENGES_LIST[0].id);

  const activeChallenge =
    CHALLENGES_LIST.find((c) => c.id === activeTab) || CHALLENGES_LIST[0];

  return (
    <section id="challenges" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange" />
            03 // ENGINEERING CASE STUDY // [RESEARCH_LOG]
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
            CHALLENGES BEHIND BUILDING A <span className="text-humorphic-orange">HUMANOID</span> ROBOT
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            An interactive technical deep-dive into the complex physics, hardware constraints, and algorithmic hurdles of human-centered cybernetics.
          </p>
        </div>

        {/* Outer Container */}
        <div className="rounded-2xl border border-cyber-border bg-cyber-card/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          
          {/* Tab Strip */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/10 mb-8 overflow-x-auto">
            {CHALLENGES_LIST.map((ch, idx) => {
              const isActive = ch.id === activeTab;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveTab(ch.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 select-none whitespace-nowrap ${
                    isActive
                      ? 'bg-humorphic-orange text-white shadow-glow border border-humorphic-orange font-bold'
                      : 'bg-cyber-bg/60 text-slate-400 border border-white/5 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-amber-200' : 'text-slate-500'}>
                    0{idx + 1}
                  </span>
                  <span>{ch.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Content */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono font-bold text-humorphic-orange tracking-widest block mb-1">
                {activeChallenge.caseId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
                {activeChallenge.title}
              </h3>
            </div>

            {/* 3 Grid Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Box 1: The Challenge */}
              <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-300">
                    THE CHALLENGE
                  </h4>
                </div>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {activeChallenge.desc}
                </p>
              </div>

              {/* Box 2: Why It Is Difficult */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-amber-400">
                  <HelpCircle className="h-5 w-5" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                    WHY IT IS DIFFICULT
                  </h4>
                </div>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {activeChallenge.why}
                </p>
              </div>

              {/* Box 3: Humorphic Solution */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                    HUMORPHIC SOLUTION
                  </h4>
                </div>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {activeChallenge.solution}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
