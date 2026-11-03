'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface CameraProps {
  targetCoords?: [number, number, number] | null;
  resetTrigger?: number;
}

export function CameraController({ targetCoords }: CameraProps) {
  const { camera, size } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.85, 0));
  const desiredLookAt = useRef(new THREE.Vector3(0, 0.85, 0));
  const desiredCamPos = useRef(new THREE.Vector3(0, 1.1, 3.7));

  useFrame((_, delta) => {
    const isMobile = size.width < 640;
    const defaultDist = isMobile ? 4.6 : 3.7;
    const defaultLookY = isMobile ? 0.75 : 0.85;

    if (targetCoords) {
      // Focus on selected anatomy subsystem
      desiredLookAt.current.set(targetCoords[0], targetCoords[1], targetCoords[2]);
      desiredCamPos.current.set(
        targetCoords[0] * 0.45,
        targetCoords[1] + (isMobile ? 0.15 : 0.05),
        isMobile ? 2.8 : 2.2
      );
    } else {
      // Default view centered on the robot
      desiredLookAt.current.set(0, defaultLookY, 0);
      desiredCamPos.current.set(0, defaultLookY + 0.25, defaultDist);
    }

    // Smooth lerp
    const lerpFactor = Math.min(delta * 3.5, 1);
    camera.position.lerp(desiredCamPos.current, lerpFactor);
    currentLookAt.current.lerp(desiredLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
