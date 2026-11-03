'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { ExplodedRobotScene } from '@/components/3d/ExplodedRobotScene';

export interface ExplodedViewCanvasProps {
  isExploded: boolean;
  selectedPart: string | null;
  onSelectPart: (partId: string) => void;
}

export function ExplodedViewCanvas({ isExploded, selectedPart, onSelectPart }: ExplodedViewCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 4.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      className="w-full h-full"
    >
      {/* Ambient */}
      <ambientLight intensity={0.45} color="#c7e8ff" />

      {/* Key light — front-top */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light — cyan accent */}
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#97D7FF" />

      {/* Rim / back orange glow */}
      <pointLight position={[0, 2, -4]} intensity={0.9} color="#eb3b1c" />

      {/* Bottom bounce */}
      <pointLight position={[0, -1, 2]} intensity={0.4} color="#FFEFC4" />

      {/* Exploded parts emissive environment */}
      {isExploded && <pointLight position={[0, 1.2, 0.8]} intensity={2.0} color="#7c3aed" distance={3} />}

      <Suspense fallback={null}>
        <group position={[0, -0.5, 0]}>
          <ExplodedRobotScene
            isExploded={isExploded}
            selectedPart={selectedPart}
            onSelectPart={onSelectPart}
          />
          <ContactShadows
            position={[0, -0.15, 0]}
            opacity={0.55}
            scale={5}
            blur={2.5}
            far={3}
            color="#000000"
          />
        </group>
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={2.2}
        maxDistance={7}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  );
}

