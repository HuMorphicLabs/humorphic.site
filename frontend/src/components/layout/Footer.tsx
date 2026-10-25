'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Terminal, Shield, Cpu, Activity, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Button } from '@/components/ui/Button';

export interface FooterProps {
  onOpenNeuralLink?: () => void;
}

export const Footer = ({ onOpenNeuralLink }: FooterProps) => {
  return (
    <footer className="relative border-t border-cyber-border/80 bg-cyber-bg/95 pt-16 pb-12 overflow-hidden">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Banner Box */}
        <div className="rounded-2xl border border-cyber-border bg-cyber-card/70 p-8 sm:p-12 mb-16 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#086288]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#97D7FF] tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#97D7FF] animate-pulse" />
                HUMORPHIC LAB ARCHITECTURE // [ONLINE]
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
                Pioneering Physical Intelligence.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Where mathematical models manifest into physical motion. Transforming high-frequency Whole-Body Control equations into sentient cybernetic motion.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenNeuralLink}
                leftIcon={<Activity className="h-5 w-5" />}
              >
                INITIATE NEURAL LINK
              </Button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-cyber-border/60">
          
          {/* Col 1: Brand & Coordinates */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyber-card border border-[#97D7FF]/60 shadow-glow-sky">
                <Bot className="h-5 w-5 text-[#97D7FF]" />
              </div>
              <span className="font-display font-extrabold text-base tracking-wider text-white">
                HUMORPHIC<span className="text-[#97D7FF]">LAB</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              Autonomous robotics research bay focusing on 32-DOF biomorphic kinematics, real-time spatial vision, and low-latency actuation.
            </p>
            <div className="space-y-1 text-[11px] font-mono text-slate-500">
              <div>COORD: {SITE_CONFIG.coords}</div>
              <div>TIER: {SITE_CONFIG.tier}</div>
              <div>SYSTEM: {SITE_CONFIG.version}</div>
            </div>
          </div>

          {/* Col 2: Architecture */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Robotics Subsystems
            </h3>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li><a href="/#our-work" className="hover:text-[#97D7FF] transition-colors text-[#FFEFC4] flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#97D7FF]"></span>Our Work Gallery</a></li>
              <li><a href="/#anatomy" className="hover:text-[#97D7FF] transition-colors">Vision Sensor Bay</a></li>
              <li><a href="/#anatomy" className="hover:text-[#97D7FF] transition-colors">Core Computer & IMU</a></li>
              <li><a href="/#anatomy" className="hover:text-[#97D7FF] transition-colors">7-DOF Manipulators</a></li>
              <li><a href="/#anatomy" className="hover:text-[#97D7FF] transition-colors">Bipedal Stride System</a></li>
              <li><a href="/#anatomy" className="hover:text-[#97D7FF] transition-colors">Harmonic BLDC Servos</a></li>
            </ul>
          </div>

          {/* Col 3: 3D Platform */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              3D Platform & API
            </h3>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li><Link href="/models" className="hover:text-[#97D7FF] transition-colors">3D Model Explorer</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#97D7FF] transition-colors">Telemetry Dashboard</Link></li>
              <li>
                <a
                  href="http://localhost:8000/api/docs/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#97D7FF] transition-colors inline-flex items-center gap-1"
                >
                  <span>OpenAPI Swagger UI</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8000/api/redoc/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#97D7FF] transition-colors inline-flex items-center gap-1"
                >
                  <span>ReDoc Specification</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Cybernetics Stack */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Embedded Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {['CAN-FD', 'RTOS', 'PyTorch', 'SolidWorks', 'ESP32', 'C++', 'Three.js', 'Next.js', 'PostgreSQL'].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-cyber-card border border-white/10 text-[10px] font-mono text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-2 text-xs text-slate-500 font-mono">
              Deterministic 1,000 Hz balance loops running onboard.
            </div>
          </div>

        </div>

        {/* Bottom Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            HUMORPHIC LABS © 2026 • ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-6">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              ALL SYSTEMS OPERATIONAL
            </span>
            <span className="text-slate-600">|</span>
            <span>WCAG 2.1 AA COMPLIANT</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
