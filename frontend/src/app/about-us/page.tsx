import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bot, Sparkles, Cpu, Layers, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us – Humorphic Lab',
  description:
    'Welcome to Humorphic Lab, a platform dedicated to exploring robotics, innovation, and technology. Turning Ideas into Intelligent Machines.',
};

export default function AboutUsPage() {
  return (
    <div className="about-us-page relative min-h-screen py-12 md:py-20 overflow-hidden bg-cyber-bg transition-colors duration-300">
      {/* Background ambient micro-grid pattern & glow spheres */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#086288]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#97D7FF]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyber-border/80 bg-cyber-card/70 hover:bg-cyber-card hover:border-[#97D7FF]/70 text-slate-300 hover:text-[#97D7FF] font-mono text-xs tracking-wider transition-all duration-200 group shadow-sm active:scale-95"
            id="back-to-home-btn"
          >
            <ArrowLeft className="h-4 w-4 text-[#97D7FF] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-border/70 bg-cyber-card/40 text-[11px] font-mono text-[#85A9BE] tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#97D7FF] animate-pulse" />
            HUMORPHIC // MISSION_PROFILE
          </div>
        </div>

        {/* Main Content Card */}
        <div className="about-us-card relative rounded-2xl border border-cyber-border/80 bg-cyber-card/85 backdrop-blur-xl p-6 sm:p-10 md:p-12 shadow-card transition-all duration-300">
          
          {/* Cybernetic Corner Brackets */}
          <div className="absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-[#97D7FF]/50 pointer-events-none" />
          <div className="absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-[#97D7FF]/50 pointer-events-none" />
          <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-[#97D7FF]/50 pointer-events-none" />
          <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-[#97D7FF]/50 pointer-events-none" />

          {/* Section Sub-heading Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md border border-[#97D7FF]/30 bg-[#97D7FF]/10 text-xs font-mono font-semibold tracking-widest text-[#97D7FF] uppercase mb-5">
            <Bot className="h-3.5 w-3.5" />
            <span>Autonomous Cybernetics Initiative</span>
          </div>

          {/* Prominent Page Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-wide leading-tight mb-8">
            About Us – <span className="text-[#97D7FF]">Humorphic Lab</span>
          </h1>

          {/* Core Exact Description Paragraph */}
          <div className="about-us-body-text space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-sans font-normal">
              Welcome to Humorphic Lab, a platform dedicated to exploring robotics, innovation, and technology. Our website provides insights into our robot, including its key features, functionality, working mechanisms, and development process. From understanding its design and components to exploring its movements, control systems, and the challenges faced during development, we aim to showcase how our robot works and how technology brings ideas to life.
            </p>
          </div>

          {/* Robotics Focus Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 pt-4 border-t border-cyber-border/60">
            <div className="about-us-feature-box p-4 rounded-xl border border-cyber-border/60 bg-cyber-bg/60">
              <div className="h-8 w-8 rounded-lg bg-[#086288]/30 border border-[#97D7FF]/40 flex items-center justify-center mb-2.5 text-[#97D7FF]">
                <Cpu className="h-4 w-4" />
              </div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-1">
                Kinematics & Control
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                32-DOF harmonic drive precision and multi-axis actuator balancing.
              </p>
            </div>

            <div className="about-us-feature-box p-4 rounded-xl border border-cyber-border/60 bg-cyber-bg/60">
              <div className="h-8 w-8 rounded-lg bg-[#086288]/30 border border-[#97D7FF]/40 flex items-center justify-center mb-2.5 text-[#97D7FF]">
                <Layers className="h-4 w-4" />
              </div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-1">
                Biomorphic Design
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                Carbon-fiber skeleton engineered for human-like fluidity and endurance.
              </p>
            </div>

            <div className="about-us-feature-box p-4 rounded-xl border border-cyber-border/60 bg-cyber-bg/60">
              <div className="h-8 w-8 rounded-lg bg-[#086288]/30 border border-[#97D7FF]/40 flex items-center justify-center mb-2.5 text-[#97D7FF]">
                <Sparkles className="h-4 w-4" />
              </div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-1">
                Neural Telemetry
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                Real-time sensory telemetry and adaptive machine intelligence.
              </p>
            </div>
          </div>

          {/* Emphasized Tagline Banner */}
          <div className="about-us-tagline relative mt-8 p-6 sm:p-8 rounded-2xl border border-[#97D7FF]/50 bg-gradient-to-r from-[#086288]/30 via-[#092233]/90 to-[#086288]/30 shadow-glow overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-32 h-32 bg-[#97D7FF]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-2 text-[#FFEFC4] text-xs font-mono tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFEFC4]" />
              Mission Manifesto
            </div>

            <blockquote className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-white tracking-wide leading-snug">
              Humorphic Lab — Turning Ideas into Intelligent Machines.
            </blockquote>
          </div>

          {/* Bottom Actions */}
          <div className="mt-10 pt-6 border-t border-cyber-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#086288] via-[#0d739e] to-[#086288] text-white font-display font-bold text-xs uppercase tracking-widest shadow-glow hover:shadow-glow-sky border border-[#97D7FF]/60 hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-cyber-border/80 bg-cyber-bg/70 hover:bg-cyber-card hover:border-[#97D7FF]/70 text-slate-300 hover:text-[#97D7FF] font-display font-bold text-xs uppercase tracking-widest transition-all duration-200 group"
            >
              <span>Explore Robot Features</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
