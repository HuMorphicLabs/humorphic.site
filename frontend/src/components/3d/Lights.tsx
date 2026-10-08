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
      {/* Orange Core Glow */}
      <pointLight
        position={[0, 1.2, 0.8]}
        intensity={0.8 * intensity}
        color="#eb3b1c"
        distance={4}
        decay={2}
      />

      {/* Gold Back Rim Light */}
      <pointLight
        position={[0, 2, -3]}
        intensity={1.0 * intensity}
        color="#f7c873"
        distance={6}
        decay={2}
      />

      {/* Cyan Ground Reflection */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={0.5 * intensity}
        color="#00f0ff"
        distance={3}
        decay={2}
      />
    </group>
  );
}
