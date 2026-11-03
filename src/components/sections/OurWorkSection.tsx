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
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  Layers,
  Cpu,
} from 'lucide-react';

export function OurWorkSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter photos based on category
  const filteredPhotos = OUR_WORK_PHOTOS.filter((photo) => {
    if (activeCategory === 'ALL') return true;
    return photo.category === activeCategory;
  });

  const bipedalCount = OUR_WORK_PHOTOS.filter((p) => p.category === 'BIPEDAL').length;
  const kinematicsCount = OUR_WORK_PHOTOS.filter((p) => p.category === 'KINEMATICS').length;
  const systemsCount = OUR_WORK_PHOTOS.filter((p) => p.category === 'SYSTEMS').length;

  const categories = [
    { id: 'ALL', label: `ALL WORK (${OUR_WORK_PHOTOS.length})` },
    { id: 'BIPEDAL', label: `BIPEDAL & LOCOMOTION (${bipedalCount})` },
    { id: 'KINEMATICS', label: `ARMS & MANIPULATION (${kinematicsCount})` },
    { id: 'SYSTEMS', label: `LAB RIG & TELEMETRY (${systemsCount})` },
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[#086288]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e4e6d_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4 reveal-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#97D7FF] tracking-wider bg-cyber-card/80 border border-[#97D7FF]/30 px-3.5 py-1.5 rounded-full shadow-glow-sky">
            <span className="h-2 w-2 rounded-full bg-[#97D7FF] animate-pulse" />
            05 // PHYSICAL HARDWARE & LAB R&D // [LAB_CAPTURES]
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-wide uppercase reveal-blur-sharp">
            OUR <span className="text-[#97D7FF]">WORK</span> & PROTOTYPES
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Authentic photographic documentation from the Humorphic Lab workbench — full bipedal humanoid skeleton, dual-leg servo kinematics, articulated robotic arms, biomorphic end-effectors, and live telemetry testing.
          </p>

          {/* Telemetry summary pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
            <Badge variant="active" pulse>
              AUTHENTIC LAB BUILDS
            </Badge>
            <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5 bg-cyber-card/70 px-3 py-1 rounded-full border border-cyber-border">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              100% REAL HARDWARE
            </span>
            <span className="text-xs font-mono text-[#FFEFC4] flex items-center gap-1.5 bg-cyber-card/70 px-3 py-1 rounded-full border border-cyber-border">
              <Camera className="h-3.5 w-3.5 text-[#FFEFC4]" />
              {OUR_WORK_PHOTOS.length} VERIFIED CAPTURES
            </span>
            <span className="text-xs font-mono text-[#97D7FF] flex items-center gap-1.5 bg-cyber-card/70 px-3 py-1 rounded-full border border-cyber-border hidden sm:inline-flex">
              <Cpu className="h-3.5 w-3.5 text-[#97D7FF]" />
              ACTIVE LAB STATUS
            </span>
          </div>
        </div>

        {/* Category Filters */}
        {OUR_WORK_PHOTOS.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400 mr-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#97D7FF]" />
              <span>SUBSYSTEM FILTER:</span>
            </div>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#086288] border-[#97D7FF] text-white shadow-glow-sky font-semibold scale-105'
                      : 'bg-cyber-card/70 border-cyber-border/80 text-slate-400 hover:text-white hover:border-[#4D8DBA]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Empty State Fallback (If no photos match filter) */}
        {filteredPhotos.length === 0 && (
          <Card className="max-w-xl mx-auto p-12 text-center border-cyber-border/80 bg-cyber-card/50 rounded-2xl">
            <div className="h-14 w-14 rounded-full bg-cyber-bg border border-[#97D7FF]/40 flex items-center justify-center mx-auto mb-4 text-[#97D7FF] shadow-glow">
              <Camera className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              NO HARDWARE CAPTURES FOUND
            </h3>
            <p className="text-xs font-mono text-slate-400 leading-relaxed mb-6">
              No photographic records found for the selected category.
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

        {/* Gallery Grid - Responsive: 1 col on mobile, 2 on tablet, 3 on desktop */}
        {filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPhotos.map((photo, index) => (
              <Card
                key={photo.id}
                glow="primary"
                className="group flex flex-col justify-between overflow-hidden p-5 rounded-2xl bg-cyber-card/70 border-cyber-border/80 hover:border-[#97D7FF]/70 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(8,98,136,0.3)]"
              >
                <div>
                  {/* Photo Viewport Container */}
                  <div
                    className="relative h-64 sm:h-72 w-full overflow-hidden rounded-xl bg-[#030c14] border border-cyber-border/70 group-hover:border-[#97D7FF]/50 transition-colors flex items-center justify-center cursor-pointer select-none"
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${photo.title} in high resolution`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        openLightbox(index);
                      }
                    }}
                  >
                    {/* Ambient blurred backdrop of the photo for edge harmony */}
                    <img
                      src={photo.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-125 select-none pointer-events-none"
                    />

                    {/* Unstretched Foreground Photo maintaining authentic aspect ratio */}
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      className="relative z-10 max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Subtle top/bottom gradient overlay for badge legibility */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

                    {/* Category pill on image */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#05131D]/90 border border-[#97D7FF]/50 text-[10px] font-mono text-[#FFEFC4] backdrop-blur-md shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#97D7FF] animate-pulse" />
                        {photo.categoryLabel}
                      </span>
                    </div>

                    {/* Orientation badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="text-[10px] font-mono text-slate-300 bg-[#05131D]/80 border border-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                        {photo.orientation === 'portrait' ? 'PORTRAIT RIG' : 'WIDE RIG'}
                      </span>
                    </div>

                    {/* Hover expand button */}
                    <div className="absolute bottom-3 right-3 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                        className="p-2 rounded-lg bg-[#05131D]/90 border border-white/20 text-white hover:text-[#97D7FF] hover:border-[#97D7FF] transition-all shadow-lg backdrop-blur-md group-hover:scale-110 cursor-pointer"
                        title="Click to inspect in high resolution"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Date watermark */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="text-[10px] font-mono text-slate-300 bg-black/75 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
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
                      className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#FFEFC4] transition-colors leading-snug cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      {photo.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {photo.description}
                    </p>
                  </div>
                </div>

                {/* Technical Specs Matrix */}
                <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {photo.specs.map((sp, idx) => (
                      <div key={idx} className="flex flex-col bg-cyber-bg/40 p-1.5 rounded border border-white/5">
                        <span className="text-slate-400 text-[9px] uppercase tracking-wider">
                          {sp.label}
                        </span>
                        <span className="text-slate-200 font-medium truncate text-[11px]">
                          {sp.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLightbox(index)}
                      className="w-full text-xs font-mono justify-center hover:border-[#97D7FF] hover:text-[#97D7FF] cursor-pointer"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-2xl p-3 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxPhoto.title}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full max-h-[96vh] flex flex-col rounded-2xl border border-[#086288]/80 bg-[#071824]/95 shadow-[0_0_60px_rgba(8,98,136,0.35)] overflow-hidden backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#1C4E6D]/80 bg-[#05131D]/90">
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <div className="h-2 w-2 rounded-full bg-[#97D7FF] animate-ping" />
                <span className="text-xs font-mono text-[#97D7FF] tracking-wider font-semibold">
                  {currentLightboxPhoto.tag}
                </span>
                <span className="text-[#4D8DBA] font-mono text-xs hidden sm:inline">|</span>
                <span className="text-xs font-mono text-slate-300">
                  CAPTURE [{activeLightboxIndex! + 1} / {filteredPhotos.length}]
                </span>
                <span className="hidden md:inline-flex text-[11px] font-mono text-slate-400">
                  (Use ← / → arrows or click thumbnails)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={currentLightboxPhoto.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#97D7FF] hover:bg-white/10 transition-colors hidden sm:flex items-center gap-1 text-xs font-mono"
                  title="Open full resolution in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>RAW FILE</span>
                </a>
                <button
                  onClick={closeLightbox}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close photo inspection"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Photo Viewport */}
            <div className="relative flex-1 min-h-[260px] max-h-[58vh] w-full bg-black flex items-center justify-center overflow-hidden p-3 sm:p-4">
              <img
                src={currentLightboxPhoto.image}
                alt={currentLightboxPhoto.title}
                className="max-h-[54vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
              />

              {/* Navigation arrows */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#05131D]/80 border border-[#1C4E6D] text-white hover:border-[#97D7FF] hover:text-[#97D7FF] transition-all backdrop-blur-md shadow-lg cursor-pointer"
                    aria-label="Previous capture"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#05131D]/80 border border-[#1C4E6D] text-white hover:border-[#97D7FF] hover:text-[#97D7FF] transition-all backdrop-blur-md shadow-lg cursor-pointer"
                    aria-label="Next capture"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Interactive Thumbnail Filmstrip */}
            {filteredPhotos.length > 1 && (
              <div className="px-4 py-2 bg-[#040e16] border-t border-white/5 flex items-center justify-center gap-2 overflow-x-auto">
                {filteredPhotos.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className={`relative h-12 w-16 rounded-md overflow-hidden border transition-all flex-shrink-0 cursor-pointer ${
                      idx === activeLightboxIndex
                        ? 'border-[#97D7FF] ring-2 ring-[#97D7FF]/50 scale-105'
                        : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/40'
                    }`}
                    title={thumb.title}
                  >
                    <img
                      src={thumb.image}
                      alt={thumb.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Metadata Footer Panel */}
            <div className="p-4 sm:p-5 border-t border-cyber-border bg-cyber-surface/90 space-y-3 overflow-y-auto max-h-[30vh]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    {currentLightboxPhoto.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-400 mt-0.5">
                    <span className="text-[#FFEFC4] font-semibold">{currentLightboxPhoto.categoryLabel}</span>
                    <span>•</span>
                    <span>{currentLightboxPhoto.date}</span>
                    <span>•</span>
                    <span className="text-[#85A9BE] text-[11px] truncate max-w-xs sm:max-w-md">
                      Source: {currentLightboxPhoto.originalFileName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="active" pulse>
                    AUTHENTIC LAB RECORD
                  </Badge>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentLightboxPhoto.description}
              </p>

              {/* Specs inline grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-[11px] font-mono">
                {currentLightboxPhoto.specs.map((sp, idx) => (
                  <div key={idx} className="bg-cyber-bg/70 p-2 rounded-lg border border-white/5">
                    <div className="text-slate-400 text-[10px] uppercase">{sp.label}</div>
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
