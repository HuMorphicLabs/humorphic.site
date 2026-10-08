'use client';

import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Bot, Users, Activity, Compass, Cpu } from 'lucide-react';

export interface HeroSectionProps {
  onExploreRobot?: () => void;
  onMeetTeam?: () => void;
}

export function HeroSection({ onExploreRobot, onMeetTeam }: HeroSectionProps) {
  const fullText = SITE_CONFIG.description;
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-humorphic-orange/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-humorphic-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Top Tech Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-humorphic-orange/40 bg-cyber-card/80 px-4 py-1.5 backdrop-blur-xl shadow-glow">
            <Activity className="h-4 w-4 text-humorphic-orange animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wider text-slate-200">
              <span className="text-humorphic-orange font-bold">ROBOTICS</span> • <span className="text-humorphic-gold font-bold">AI</span> • INNOVATION
              <span className="text-slate-500 mx-2">//</span>
              <span className="text-emerald-400 font-bold">[SEC_SYS::ACTV]</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase leading-[1.08]">
            <span className="block">
              BUILDING <span className="text-humorphic-orange drop-shadow-[0_0_25px_rgba(235,59,28,0.5)]">MACHINES.</span>
            </span>
            <span className="block">
              <span className="text-amber-200">ENGINEERING</span> THE
            </span>
            <span className="block text-humorphic-gold drop-shadow-[0_0_25px_rgba(247,200,115,0.4)]">
              FUTURE.
            </span>
          </h1>

          {/* Typing Description */}
          <p className="min-h-[70px] text-base sm:text-lg text-slate-300 font-sans max-w-2xl leading-relaxed">
            <span>{displayedText}</span>
            <span className="inline-block w-2 h-4 ml-1 bg-humorphic-orange animate-pulse" />
          </p>

          {/* Coordinates & Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs font-mono text-slate-400 border-y border-white/10 py-3 w-full max-w-2xl">
            <div className="flex items-center gap-2">
              <Compass className="h-3.5 w-3.5 text-humorphic-orange" />
              <span>COORD: <strong className="text-white">{SITE_CONFIG.coords}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-humorphic-gold" />
              <span>TIER: <strong className="text-white">{SITE_CONFIG.tier}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-3.5 w-3.5 text-emerald-400" />
              <span>REV: <strong className="text-white">{SITE_CONFIG.version}</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onExploreRobot}
              leftIcon={<Bot className="h-5 w-5" />}
            >
              EXPLORE THE ROBOT
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={onMeetTeam}
              leftIcon={<Users className="h-5 w-5" />}
            >
              MEET THE TEAM
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
