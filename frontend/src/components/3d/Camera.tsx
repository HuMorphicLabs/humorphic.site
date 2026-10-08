'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface CameraProps {
  targetCoords?: [number, number, number] | null;
  resetTrigger?: number;
}

export function CameraController({ targetCoords }: CameraProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.8, 0));
  const desiredLookAt = useRef(new THREE.Vector3(0, 0.8, 0));
  const desiredCamPos = useRef(new THREE.Vector3(0, 1.2, 3.8));

  useFrame((_, delta) => {
    if (targetCoords) {
      // Focus on selected anatomy subsystem
      desiredLookAt.current.set(targetCoords[0], targetCoords[1], targetCoords[2]);
      desiredCamPos.current.set(
        targetCoords[0] * 0.5,
        targetCoords[1] + 0.1,
        2.2
      );
    } else {
      // Default view
      desiredLookAt.current.set(0, 0.8, 0);
      desiredCamPos.current.set(0, 1.2, 3.8);
    }

    // Smooth lerp
    const lerpFactor = Math.min(delta * 3.5, 1);
    camera.position.lerp(desiredCamPos.current, lerpFactor);
    currentLookAt.current.lerp(desiredLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
