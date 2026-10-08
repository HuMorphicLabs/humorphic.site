'use client';

import { useState, useEffect } from 'react';

export interface PerformanceSettings {
  isMobile: boolean;
  dpr: number;
  enableShadows: boolean;
  enablePostProcessing: boolean;
  antialias: boolean;
  reducedMotion: boolean;
  useFallback2D: boolean;
}

export function use3DPerformance(): PerformanceSettings {
  const [settings, setSettings] = useState<PerformanceSettings>({
    isMobile: false,
    dpr: 1.5,
    enableShadows: true,
    enablePostProcessing: true,
    antialias: true,
    reducedMotion: false,
    useFallback2D: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const isMobileDevice = width < 768;
    const isVerySmall = width < 480;

    // Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = reducedMotionQuery.matches;

    // Test WebGL availability
    let webglSupported = true;
    try {
      const canvas = document.createElement('canvas');
      webglSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      webglSupported = false;
    }

    setSettings({
      isMobile: isMobileDevice,
      dpr: isMobileDevice ? 1 : Math.min(window.devicePixelRatio || 1, 2),
      enableShadows: !isVerySmall,
      enablePostProcessing: !isMobileDevice,
      antialias: !isVerySmall,
      reducedMotion: prefersReducedMotion,
      useFallback2D: !webglSupported,
    });

    const handleResize = () => {
      const w = window.innerWidth;
      setSettings(prev => ({
        ...prev,
        isMobile: w < 768,
        dpr: w < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 2),
        enableShadows: w >= 480,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return settings;
}
