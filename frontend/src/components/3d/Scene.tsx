'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import { Lights } from './Lights';
import { Controls } from './Controls';
import { CameraController } from './Camera';
import { Loading3D } from './Loading';
import { use3DPerformance } from '@/hooks/use3DPerformance';

export interface SceneProps {
  children: React.ReactNode;
  autoRotate?: boolean;
  targetCoords?: [number, number, number] | null;
  lightIntensity?: number;
  className?: string;
}

export function Scene({
  children,
  autoRotate = false,
  targetCoords = null,
  lightIntensity = 1.0,
  className = '',
}: SceneProps) {
  const perf = use3DPerformance();

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <Canvas
        shadows={perf.enableShadows}
        dpr={perf.dpr}
        camera={{ position: [0, 1.2, 3.8], fov: 45 }}
        gl={{
          antialias: perf.antialias,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <CameraController targetCoords={targetCoords} />
        <Lights intensity={lightIntensity} enableShadows={perf.enableShadows} />
        <Controls autoRotate={autoRotate} />

        <Suspense fallback={<Loading3D />}>
          <group position={[0, -0.2, 0]}>
            {children}
            {perf.enableShadows && (
              <ContactShadows
                position={[0, -0.15, 0]}
                opacity={0.65}
                scale={5}
                blur={2.4}
                far={3}
                color="#000000"
              />
            )}
          </group>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
