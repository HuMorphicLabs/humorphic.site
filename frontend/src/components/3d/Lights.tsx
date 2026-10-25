'use client';

import React from 'react';

export interface LightsProps {
  intensity?: number;
  enableShadows?: boolean;
}

export function Lights({ intensity = 1.0, enableShadows = true }: LightsProps) {
  return (
    <group>
      {/* Ambient ambient fill */}
      <ambientLight intensity={0.4 * intensity} />

      {/* Main Studio Key Light with soft shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2 * intensity}
        castShadow={enableShadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={25}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0005}
      />

      {/* Cool Fill Light */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={0.6 * intensity}
        color="#88b5ff"
      />

      {/* Cybernetic Accent Point Lights */}
      {/* Deep Teal Core Glow */}
      <pointLight
        position={[0, 1.2, 0.8]}
        intensity={1.1 * intensity}
        color="#086288"
        distance={4.5}
        decay={2}
      />

      {/* Soft Cream Back Rim Light */}
      <pointLight
        position={[0, 2, -3]}
        intensity={0.9 * intensity}
        color="#FFEFC4"
        distance={6.5}
        decay={2}
      />

      {/* Sky Blue Ground Reflection */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={0.7 * intensity}
        color="#97D7FF"
        distance={3}
        decay={2}
      />
    </group>
  );
}
