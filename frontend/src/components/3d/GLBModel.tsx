'use client';

import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export interface GLBModelProps {
  url: string;
  wireframe?: boolean;
}

export function GLBModel({ url, wireframe = false }: GLBModelProps) {
  const gltf = useGLTF(url);

  const { scene, scaledOffset } = useMemo(() => {
    const cloned = gltf.scene.clone(true);

    // Compute bounding box to normalize scale and center model
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = maxDim > 0 ? 1.8 / maxDim : 1;

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if ('wireframe' in mat) {
              (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
            }
          });
        } else if (mesh.material && 'wireframe' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      }
    });

    return {
      scene: cloned,
      scaledOffset: {
        scale: targetScale,
        position: [-center.x * targetScale, -box.min.y * targetScale, -center.z * targetScale] as [number, number, number],
      },
    };
  }, [gltf.scene, wireframe]);

  return (
    <primitive
      object={scene}
      scale={scaledOffset.scale}
      position={scaledOffset.position}
    />
  );
}
