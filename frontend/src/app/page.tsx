'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ModelViewer } from '@/components/3d/ModelViewer';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { AnatomyHUDSection } from '@/components/sections/AnatomyHUDSection';
import { ChallengesSection } from '@/components/sections/ChallengesSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { TeamModal } from '@/components/sections/TeamModal';
import { NeuralLinkModal } from '@/components/sections/NeuralLinkModal';
import { Activity, Sparkles, Box } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const [selectedPart, setSelectedPart] = useState<string>('head');
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [neuralLinkModalOpen, setNeuralLinkModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* SECTION 1: HERO */}
      <HeroSection
        onExploreRobot={() => scrollToSection('viewer-section')}
        onMeetTeam={() => setTeamModalOpen(true)}
      />

      {/* SECTION 2: 3D ROBOT VIEWPORT WORKSTATION */}
      <section id="viewer-section" className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange" />
                PRIMARY WORKSTATION // [3D_INTERACTIVE_VIEWPORT]
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
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

          {/* 3D Model Viewer Container */}
          <ModelViewer
            selectedPart={selectedPart}
            onSelectPart={(part) => setSelectedPart(part)}
          />

        </div>
      </section>

      {/* SECTION 3: SUBSYSTEM MATRIX FEATURES */}
      <FeaturesSection />

      {/* SECTION 4: ANATOMICAL HUD DECONSTRUCTION (SYNCED TO 3D MODEL) */}
      <AnatomyHUDSection
        selectedPart={selectedPart}
        onSelectPart={(part) => setSelectedPart(part)}
      />

      {/* SECTION 5: ENGINEERING CHALLENGES (8 CASE STUDIES) */}
      <ChallengesSection />

      {/* SECTION 6: CHRONOLOGICAL ROADMAP / DEVELOPMENT JOURNEY */}
      <JourneySection />

      {/* SECTION 7: ANIMATED TELEMETRY STATS */}
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
