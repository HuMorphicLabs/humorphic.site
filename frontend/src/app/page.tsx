'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Box } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroSection } from '@/components/sections/HeroSection';
import { RobotScrollCanvas } from '@/components/3d/RobotScrollCanvas';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { AnatomyHUDSection } from '@/components/sections/AnatomyHUDSection';
import { ChallengesSection } from '@/components/sections/ChallengesSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { OurWorkSection } from '@/components/sections/OurWorkSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { TeamModal } from '@/components/sections/TeamModal';
import { NeuralLinkModal } from '@/components/sections/NeuralLinkModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function HomePage() {
  const [selectedPart, setSelectedPart] = useState<string>('head');
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [neuralLinkModalOpen, setNeuralLinkModalOpen] = useState(false);

  // Initialize lightweight IntersectionObserver scroll reveals
  useScrollReveal();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-cyber-bg">
      
      {/* SECTION 1: HERO */}
      <HeroSection
        onExploreRobot={() => scrollToSection('viewer-section')}
        onMeetTeam={() => setTeamModalOpen(true)}
        selectedPart={selectedPart}
        onSelectPart={(part) => setSelectedPart(part)}
      />

      {/* SECTION 2: ROBOT VIEWPORT WORKSTATION // SMOOTH SCROLL ANIMATION SHOWCASE */}
      <section id="viewer-section" className="relative w-full min-h-[320vh] bg-cyber-bg">
        <div className="sticky top-14 sm:top-16 w-full h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col py-3 sm:py-4">
          
          {/* Workstation Header Elements */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4 flex-shrink-0">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#97D7FF] tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#97D7FF] animate-pulse" />
                PRIMARY WORKSTATION // [SCROLL_ANIMATION_VIEWPORT]
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-wide">
                HUMORPHIC v5.04 AUTONOMOUS PLATFORM
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/models">
                <Button variant="outline" size="sm" leftIcon={<Box className="h-4 w-4" />}>
                  BROWSE ALL 3D MODELS
                </Button>
              </Link>
            </div>
          </div>

          {/* Clean Dedicated Animation Element (No other components on this element) */}
          <div className="relative flex-1 w-full rounded-2xl border border-[#4D8DBA]/40 bg-[#0d2b3e] shadow-glow-steel overflow-hidden backdrop-blur-md">
            <RobotScrollCanvas className="w-full h-full" />
          </div>

        </div>
      </section>

      {/* SECTION 3: SUBSYSTEM MATRIX FEATURES (ROBOT FEATURES) */}
      <FeaturesSection />

      {/* SECTION 4: ANATOMICAL HUD DECONSTRUCTION (SYNCED TO ROBOT MODEL) */}
      <AnatomyHUDSection
        selectedPart={selectedPart}
        onSelectPart={(part) => setSelectedPart(part)}
      />

      {/* SECTION 5: ENGINEERING CHALLENGES (8 CASE STUDIES) */}
      <ChallengesSection />

      {/* SECTION 6: CHRONOLOGICAL ROADMAP / DEVELOPMENT JOURNEY (HOW IT IS MADE) */}
      <JourneySection />

      {/* SECTION 7: OUR WORK // AUTHENTIC PHYSICAL HARDWARE GALLERY */}
      <OurWorkSection />

      {/* SECTION 8: ANIMATED TELEMETRY STATS */}
      <StatsSection />

      {/* SECTION 8: EMBEDDED TECHNOLOGY STACK */}
      <TechStackSection />

      {/* MODALS */}
      <TeamModal
        isOpen={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
      />

      <NeuralLinkModal
        isOpen={neuralLinkModalOpen}
        onClose={() => setNeuralLinkModalOpen(false)}
      />

    </div>
  );
}
