'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OUR_WORK_PHOTOS, WorkPhoto } from '@/config/workGallery';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Wrench,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

export function OurWorkSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter photos based on category
  const filteredPhotos = OUR_WORK_PHOTOS.filter((photo) => {
    if (activeCategory === 'ALL') return true;
    return photo.category === activeCategory;
  });

  const categories = [
    { id: 'ALL', label: `ALL WORK (${OUR_WORK_PHOTOS.length})` },
    { id: 'ASSEMBLY', label: 'MECHANICAL ASSEMBLY' },
    { id: 'GRIPPERS', label: 'KINEMATICS & GRIPPERS' },
    { id: 'INTEGRATION', label: 'LAB INTEGRATION' },
  ];

  // Lightbox navigation helpers
  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const goToPrevious = useCallback(() => {
    if (activeLightboxIndex === null || filteredPhotos.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev! === 0 ? filteredPhotos.length - 1 : prev! - 1
    );
  }, [activeLightboxIndex, filteredPhotos.length]);

  const goToNext = useCallback(() => {
    if (activeLightboxIndex === null || filteredPhotos.length === 0) return;
    setActiveLightboxIndex((prev) =>
      prev! === filteredPhotos.length - 1 ? 0 : prev! + 1
    );
  }, [activeLightboxIndex, filteredPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, goToPrevious, goToNext]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLightboxIndex]);

  const currentLightboxPhoto: WorkPhoto | null =
    activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] ?? null : null;

  return (
    <section id="our-work" className="py-24 relative overflow-hidden bg-cyber-bg">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#086288]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e4e6d_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4 reveal-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#97D7FF] tracking-wider bg-cyber-card/80 border border-[#97D7FF]/30 px-3 py-1 rounded-full shadow-glow-sky">
            <span className="h-1.5 w-1.5 rounded-full bg-[#97D7FF] animate-pulse" />
            05 // PHYSICAL HARDWARE & LAB R&D // [LAB_CAPTURES]
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-wide uppercase reveal-blur-sharp">
            OUR <span className="text-[#97D7FF]">WORK</span> & PROTOTYPES
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Authentic photographic documentation from the Humorphic Lab workbench — physical skeleton fabrication, dual articulated robotic limbs, biomorphic end-effectors, and real-time test integration.
          </p>

          {/* Quick telemetry summary pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Badge variant="active" pulse>
              AUTHENTIC LAB BUILDS
            </Badge>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 bg-cyber-card/60 px-3 py-0.5 rounded-full border border-cyber-border">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              100% REAL HARDWARE
            </span>
            <span className="text-xs font-mono text-[#FFEFC4] flex items-center gap-1.5 bg-cyber-card/60 px-3 py-0.5 rounded-full border border-cyber-border">
              <Camera className="h-3.5 w-3.5 text-[#FFEFC4]" />
              {OUR_WORK_PHOTOS.length} VERIFIED CAPTURES
            </span>
          </div>
        </div>

        {/* Category Filters */}
        {OUR_WORK_PHOTOS.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400 mr-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#97D7FF]" />
              <span>FILTER:</span>
            </div>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-lg border transition-all duration-200 ${
                    isActive
                      ? 'bg-[#086288] border-[#97D7FF] text-white shadow-glow-sky'
                      : 'bg-cyber-card/70 border-cyber-border/80 text-slate-400 hover:text-white hover:border-[#4D8DBA]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Empty State Fallback (If no photos exist yet) */}
        {filteredPhotos.length === 0 && (
          <Card className="max-w-xl mx-auto p-12 text-center border-cyber-border/80 bg-cyber-card/50">
            <div className="h-14 w-14 rounded-full bg-cyber-bg border border-humorphic-orange/40 flex items-center justify-center mx-auto mb-4 text-humorphic-orange shadow-glow">
              <Camera className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              AWAITING LABORATORY CAPTURES
            </h3>
            <p className="text-xs font-mono text-slate-400 leading-relaxed mb-6">
              No hardware captures found for the selected filter. As new photos are added to the lab repository, they will automatically appear here.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveCategory('ALL')}
            >
              RESET FILTER
            </Button>
          </Card>
        )}

        {/* Gallery Grid */}
        {filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 reveal-stagger-parent">
            {filteredPhotos.map((photo, index) => (
              <Card
                key={photo.id}
                glow="primary"
                className="group flex flex-col justify-between overflow-hidden p-5 hover:border-[#97D7FF]/70 transition-all duration-300"
              >
                <div>
                  {/* Photo Container */}
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-cyber-surface border border-cyber-border/80 cursor-pointer group-hover:border-[#97D7FF]/60 transition-colors"
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${photo.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        openLightbox(index);
                      }
                    }}
                  >
                    {/* The exact original photo */}
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Category pill on image */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#05131D]/90 border border-[#97D7FF]/50 text-[10px] font-mono text-[#FFEFC4] backdrop-blur-md shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#97D7FF] animate-pulse" />
                        {photo.categoryLabel}
                      </span>
                    </div>

                    {/* Hover expand button */}
                    <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                        className="p-2 rounded-lg bg-[#05131D]/90 border border-white/20 text-white hover:text-[#97D7FF] hover:border-[#97D7FF] transition-all shadow-lg backdrop-blur-md group-hover:scale-110"
                        title="Click to expand high-res capture"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Date watermark */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        {photo.date}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#97D7FF]">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#97D7FF]" />
                        {photo.tag}
                      </span>
                      <span className="text-[#4D8DBA] text-[10px]">
                        PHYSICAL LAB RIG
                      </span>
                    </div>

                    <h3
                      className="text-lg font-display font-bold text-white group-hover:text-[#FFEFC4] transition-colors leading-snug cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      {photo.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                </div>

                {/* Technical Specs Matrix */}
                <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {photo.specs.map((sp, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-slate-400 text-[10px] uppercase">
                          {sp.label}
                        </span>
                        <span className="text-slate-200 font-medium truncate">
                          {sp.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLightbox(index)}
                      className="w-full text-xs font-mono justify-center hover:border-[#97D7FF] hover:text-[#97D7FF]"
                      leftIcon={<Maximize2 className="h-3.5 w-3.5" />}
                    >
                      INSPECT CAPTURE
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {currentLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxPhoto.title}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full max-h-[95vh] flex flex-col rounded-2xl border border-[#086288]/70 bg-[#092233]/95 shadow-[0_0_50px_rgba(8,98,136,0.4)] overflow-hidden backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1C4E6D]/80 bg-[#05131D]/90">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#97D7FF] animate-ping" />
                <span className="text-xs font-mono text-[#97D7FF] tracking-wider font-semibold">
                  {currentLightboxPhoto.tag}
                </span>
                <span className="text-[#4D8DBA] font-mono text-xs">|</span>
                <span className="text-xs font-mono text-slate-300">
                  CAPTURE [{activeLightboxIndex! + 1} / {filteredPhotos.length}]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={closeLightbox}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close photo inspection"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Photo Viewport */}
            <div className="relative flex-1 min-h-[300px] max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden p-2">
              <img
                src={currentLightboxPhoto.image}
                alt={currentLightboxPhoto.title}
                className="max-h-[62vh] max-w-full object-contain rounded-md"
              />

              {/* Navigation arrows */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#05131D]/80 border border-[#1C4E6D] text-white hover:border-[#97D7FF] hover:text-[#97D7FF] transition-all backdrop-blur-md shadow-lg"
                    aria-label="Previous capture"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#05131D]/80 border border-[#1C4E6D] text-white hover:border-[#97D7FF] hover:text-[#97D7FF] transition-all backdrop-blur-md shadow-lg"
                    aria-label="Next capture"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Metadata Footer Panel */}
            <div className="p-5 border-t border-cyber-border bg-cyber-surface/90 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-lg font-display font-bold text-white">
                    {currentLightboxPhoto.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-0.5">
                    <span className="text-[#FFEFC4] font-semibold">{currentLightboxPhoto.categoryLabel}</span>
                    <span>•</span>
                    <span>{currentLightboxPhoto.date}</span>
                    <span>•</span>
                    <span className="text-[#85A9BE]">Source: {currentLightboxPhoto.originalFileName}</span>
                  </div>
                </div>

                <Badge variant="active" pulse>
                  AUTHENTIC LAB RECORD
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentLightboxPhoto.description}
              </p>

              {/* Specs inline grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-[11px] font-mono">
                {currentLightboxPhoto.specs.map((sp, idx) => (
                  <div key={idx} className="bg-cyber-bg/60 p-2 rounded border border-white/5">
                    <div className="text-slate-400 text-[10px]">{sp.label}</div>
                    <div className="text-slate-200 font-semibold truncate">{sp.val}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
