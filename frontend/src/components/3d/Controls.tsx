'use client';

import React from 'react';
import { OrbitControls } from '@react-three/drei';

export interface ControlsProps {
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
}

export function Controls({
  autoRotate = false,
  enableZoom = true,
  enablePan = true,
}: ControlsProps) {
  return (
    <OrbitControls
      makeDefault
      autoRotate={autoRotate}
      autoRotateSpeed={1.2}
      enableDamping
      dampingFactor={0.06}
      enableZoom={enableZoom}
      minDistance={1.2}
      maxDistance={7.0}
      enablePan={enablePan}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 1.85} // Prevents camera from going under floor
      target={[0, 0.8, 0]}
    />
  );
}
