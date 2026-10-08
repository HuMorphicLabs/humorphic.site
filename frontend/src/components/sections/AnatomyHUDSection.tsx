'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { ANATOMY_SUBSYSTEMS } from '@/config/site';
import { Activity, Cpu, Shield, Zap, CheckCircle2 } from 'lucide-react';

export interface AnatomyHUDSectionProps {
  selectedPart: string;
  onSelectPart: (partId: string) => void;
}

export function AnatomyHUDSection({
  selectedPart,
  onSelectPart,
}: AnatomyHUDSectionProps) {
  const currentSubsystem = ANATOMY_SUBSYSTEMS[selectedPart] || ANATOMY_SUBSYSTEMS.head;

  const pins = [
    { id: 'head', label: 'HEAD', top: '9%', left: '16%' },
    { id: 'torso', label: 'TORSO', top: '23%', left: '10%' },
    { id: 'arms', label: 'ARMS', top: '35%', left: '8%' },
    { id: 'hands', label: 'HANDS', top: '51%', left: '8%' },
    { id: 'waist', label: 'WAIST', top: '45%', right: '10%' },
    { id: 'legs', label: 'LEGS', top: '68%', right: '8%' },
    { id: 'feet', label: 'FEET', top: '86%', right: '8%' },
    { id: 'motors', label: 'MOTORS', top: '18%', right: '10%' },
    { id: 'battery', label: 'BATTERY', top: '30%', right: '10%' },
  ];

  return (
    <section id="anatomy" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange" />
            02 // ANATOMICAL DECONSTRUCTION // [INTERACTIVE_HUD]
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
            ROBOT <span className="text-humorphic-orange">ANATOMY</span> &amp; SUBSYSTEMS
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Click or select key anatomical component pins to inspect structural specs, actuators, and hardware telemetry. Bidirectionally synchronized with the 3D scene.
          </p>
        </div>

        {/* 2-Column HUD Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Col 1: Schematic Wireframe with Hotspot Pins (7 Cols) */}
          <div className="lg:col-span-7 relative rounded-2xl border border-cyber-border bg-cyber-card/80 p-6 sm:p-10 backdrop-blur-xl overflow-hidden min-h-[500px] flex items-center justify-center shadow-2xl">
            
            {/* Ambient HUD Scanning Grid line */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(235,59,28,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(235,59,28,0.06)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
            
            {/* Center Robot Schematic Vector */}
            <div className="relative w-full max-w-[340px] aspect-[4/6] mx-auto select-none">
              <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
                
                {/* Head */}
                <circle
                  cx="200"
                  cy="70"
                  r="28"
                  stroke={selectedPart === 'head' ? '#eb3b1c' : 'rgba(255,255,255,0.4)'}
                  strokeWidth={selectedPart === 'head' ? 3 : 2}
                  fill="rgba(15,23,42,0.6)"
                  className="cursor-pointer transition-colors"
                  onClick={() => onSelectPart('head')}
                />
                <rect x="182" y="62" width="36" height="12" rx="4" fill="#eb3b1c" opacity="0.8" />
                <line x1="200" y1="98" x2="200" y2="120" stroke="#f7c873" strokeWidth="4" />

                {/* Torso */}
                <path
                  d="M150 120 L250 120 L230 250 L170 250 Z"
                  stroke={selectedPart === 'torso' ? '#eb3b1c' : 'rgba(255,255,255,0.4)'}
                  strokeWidth={selectedPart === 'torso' ? 3 : 2}
                  fill="rgba(15,23,42,0.7)"
                  className="cursor-pointer transition-colors"
                  onClick={() => onSelectPart('torso')}
                />
                {/* Battery / Energy Core */}
                <circle
                  cx="200"
                  cy="180"
                  r="18"
                  stroke="#eb3b1c"
                  strokeWidth="2"
                  fill="rgba(235,59,28,0.3)"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('battery')}
                />

                {/* Arms */}
                <path
                  d="M150 125 L100 160 L85 270"
                  stroke={selectedPart === 'arms' ? '#eb3b1c' : 'rgba(255,255,255,0.4)'}
                  strokeWidth="3"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('arms')}
                />
                <path
                  d="M250 125 L300 160 L315 270"
                  stroke={selectedPart === 'arms' ? '#eb3b1c' : 'rgba(255,255,255,0.4)'}
                  strokeWidth="3"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('arms')}
                />

                {/* Hands */}
                <circle
                  cx="85"
                  cy="280"
                  r="10"
                  stroke="#f7c873"
                  strokeWidth="2"
                  fill="rgba(15,23,42,0.8)"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('hands')}
                />
                <circle
                  cx="315"
                  cy="280"
                  r="10"
                  stroke="#f7c873"
                  strokeWidth="2"
                  fill="rgba(15,23,42,0.8)"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('hands')}
                />

                {/* Waist */}
                <rect
                  x="165"
                  y="255"
                  width="70"
                  height="35"
                  rx="6"
                  stroke={selectedPart === 'waist' ? '#eb3b1c' : '#f7c873'}
                  strokeWidth="2"
                  fill="rgba(247,200,115,0.15)"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('waist')}
                />

                {/* Legs */}
                <path
                  d="M175 290 L165 420 L160 520"
                  stroke={selectedPart === 'legs' ? '#eb3b1c' : 'rgba(255,255,255,0.4)'}
                  strokeWidth="4"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('legs')}
                />
                <path
                  d="M225 290 L235 420 L240 520"
                  stroke={selectedPart === 'legs' ? '#eb3b1c' : 'rgba(255,255,255,0.4)'}
                  strokeWidth="4"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('legs')}
                />

                {/* Joint Actuators / Motors */}
                <circle cx="150" cy="125" r="7" fill="#eb3b1c" className="cursor-pointer" onClick={() => onSelectPart('motors')} />
                <circle cx="250" cy="125" r="7" fill="#eb3b1c" className="cursor-pointer" onClick={() => onSelectPart('motors')} />
                <circle cx="165" cy="420" r="7" fill="#eb3b1c" className="cursor-pointer" onClick={() => onSelectPart('motors')} />
                <circle cx="235" cy="420" r="7" fill="#eb3b1c" className="cursor-pointer" onClick={() => onSelectPart('motors')} />

                {/* Feet */}
                <rect
                  x="140"
                  y="520"
                  width="35"
                  height="15"
                  rx="3"
                  stroke={selectedPart === 'feet' ? '#eb3b1c' : '#f7c873'}
                  strokeWidth="2"
                  fill="rgba(15,23,42,0.9)"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('feet')}
                />
                <rect
                  x="225"
                  y="520"
                  width="35"
                  height="15"
                  rx="3"
                  stroke={selectedPart === 'feet' ? '#eb3b1c' : '#f7c873'}
                  strokeWidth="2"
                  fill="rgba(15,23,42,0.9)"
                  className="cursor-pointer"
                  onClick={() => onSelectPart('feet')}
                />
              </svg>

              {/* Hotspot Pins Overlay */}
              {pins.map((p) => {
                const isActive = selectedPart === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectPart(p.id)}
                    style={{
                      top: p.top,
                      left: p.left,
                      right: p.right,
                    }}
                    className={`absolute flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 shadow-lg ${
                      isActive
                        ? 'bg-humorphic-orange text-white ring-2 ring-humorphic-orange shadow-glow scale-105 z-20'
                        : 'bg-cyber-card/90 text-slate-300 border border-cyber-border hover:border-humorphic-orange/60 hover:text-white z-10'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isActive ? 'bg-white animate-ping' : 'bg-humorphic-orange'
                      }`}
                    />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Col 2: Dynamic Telemetry Specs Card (5 Cols) */}
          <div className="lg:col-span-5">
            <Card glow="orange" className="p-8 border-humorphic-orange/40 bg-cyber-card/95 backdrop-blur-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-xs font-mono font-bold text-humorphic-orange tracking-wider">
                  {currentSubsystem.code}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {currentSubsystem.status}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-wide mb-3">
                {currentSubsystem.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                {currentSubsystem.desc}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="rounded-xl border border-white/10 bg-cyber-bg/60 p-4 mb-6">
                <h4 className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-3">
                  KEY TECHNICAL SPECIFICATIONS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSubsystem.specs.map((sp, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <span className="block text-[11px] font-mono text-slate-400">{sp.key}</span>
                      <span className="block text-xs font-mono text-humorphic-gold font-semibold">{sp.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Subsystem Switcher Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {Object.keys(ANATOMY_SUBSYSTEMS).map((key) => {
                  const sub = ANATOMY_SUBSYSTEMS[key];
                  const isCur = selectedPart === key;
                  return (
                    <button
                      key={key}
                      onClick={() => onSelectPart(key)}
                      className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded transition-colors ${
                        isCur
                          ? 'bg-humorphic-orange text-white font-bold'
                          : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {sub.id}
                    </button>
                  );
                })}
              </div>

            </Card>
          </div>

        </div>

      </div>
    </section>
  );
}
