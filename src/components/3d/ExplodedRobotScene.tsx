'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ExplodedRobotSceneProps {
  isExploded: boolean;
  selectedPart?: string | null;
  onSelectPart?: (partId: string) => void;
}

// ─── Part definitions ──────────────────────────────────────────────────────────
// Each part has a base position and an exploded offset it moves to.
const PARTS = {
  head:      { base: [0,    1.62, 0  ] as [number,number,number], explode: [0,    2.55, 0.25] as [number,number,number] },
  torso:     { base: [0,    1.25, 0  ] as [number,number,number], explode: [0,    1.25, 0   ] as [number,number,number] }, // stays, inner parts pop out
  leftArm:   { base: [-0.32, 1.35, 0 ] as [number,number,number], explode: [-1.0, 1.45, 0.2] as [number,number,number] },
  rightArm:  { base: [ 0.32, 1.35, 0 ] as [number,number,number], explode: [ 1.0, 1.45, 0.2] as [number,number,number] },
  waist:     { base: [0,    0.92, 0  ] as [number,number,number], explode: [0,    0.5,  0.3 ] as [number,number,number] },
  leftLeg:   { base: [-0.14, 0.76, 0 ] as [number,number,number], explode: [-0.55, 0.2, 0.2] as [number,number,number] },
  rightLeg:  { base: [ 0.14, 0.76, 0 ] as [number,number,number], explode: [ 0.55, 0.2, 0.2] as [number,number,number] },
  core:      { base: [0,    1.27, 0.14] as [number,number,number], explode: [0,    1.3,  0.7] as [number,number,number] },
  spine:     { base: [0,    1.25, -0.13] as [number,number,number], explode: [0,   1.25, -0.7] as [number,number,number] },
};

// ─── Materials (memoized outside component for stability) ─────────────────────
function useMaterials() {
  return useMemo(() => ({
    armor: new THREE.MeshStandardMaterial({ color: '#0f172a', metalness: 0.88, roughness: 0.2 }),
    secondary: new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.9, roughness: 0.3 }),
    gold: new THREE.MeshStandardMaterial({ color: '#FFEFC4', metalness: 0.9, roughness: 0.2 }),
    glass: new THREE.MeshStandardMaterial({ color: '#0ea5e9', metalness: 0.1, roughness: 0.0, transparent: true, opacity: 0.35 }),
    glow: new THREE.MeshStandardMaterial({ color: '#eb3b1c', emissive: '#eb3b1c', emissiveIntensity: 1.1, roughness: 0.05 }),
    glowCyan: new THREE.MeshStandardMaterial({ color: '#00f0ff', emissive: '#00f0ff', emissiveIntensity: 0.9 }),
    npu: new THREE.MeshStandardMaterial({ color: '#7c3aed', emissive: '#7c3aed', emissiveIntensity: 0.7, roughness: 0.1 }),
    battery: new THREE.MeshStandardMaterial({ color: '#16a34a', emissive: '#16a34a', emissiveIntensity: 0.8, roughness: 0.1 }),
    wires: new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.6 }),
    transparent: new THREE.MeshStandardMaterial({ color: '#086288', transparent: true, opacity: 0.15, roughness: 0.0, metalness: 0.1 }),
  }), []);
}

// ─── Lerped group that animates between base and exploded positions ────────────
interface AnimGroupProps {
  base: [number, number, number];
  explode: [number, number, number];
  isExploded: boolean;
  children: React.ReactNode;
}

function AnimGroup({ base, explode, isExploded, children }: AnimGroupProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_s, delta) => {
    if (!ref.current) return;
    const target = isExploded ? explode : base;
    const speed = Math.min(delta * 3.5, 1);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, target[0], speed);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, target[1], speed);
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, target[2], speed);
  });

  return (
    <group ref={ref} position={base}>
      {children}
    </group>
  );
}

// ─── Main exploded robot ───────────────────────────────────────────────────────
export function ExplodedRobotScene({ isExploded, selectedPart, onSelectPart }: ExplodedRobotSceneProps) {
  const m = useMaterials();

  // Idle rotation of whole assembly
  const rootRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const npuRef  = useRef<THREE.Mesh>(null);
  const battRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (rootRef.current) {
      // Gentle slow spin when exploded, idle sway when assembled
      const targetY = isExploded ? t * 0.12 : Math.sin(t * 0.4) * 0.07;
      rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, targetY, Math.min(delta * 2, 1));
      // Gentle hover bob
      rootRef.current.position.y = Math.sin(t * 1.2) * 0.012;
    }
    // Pulsing internals
    if (coreRef.current) {
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7 + Math.sin(t * 4) * 0.4;
    }
    if (npuRef.current) {
      (npuRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + Math.sin(t * 5 + 1) * 0.35;
    }
    if (battRef.current) {
      (battRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + Math.sin(t * 3 + 2) * 0.3;
    }
  });

  const handleClick = (e: any, partId: string) => {
    e.stopPropagation();
    onSelectPart?.(partId);
  };

  return (
    <group ref={rootRef}>

      {/* ── HEAD ── */}
      <AnimGroup base={PARTS.head.base} explode={PARTS.head.explode} isExploded={isExploded}>
        <group onClick={(e) => handleClick(e, 'head')} onPointerOver={() => {}} >
          {/* Cranium */}
          <mesh material={selectedPart === 'head' ? new THREE.MeshStandardMaterial({ color: '#086288', emissive: '#97D7FF', emissiveIntensity: 0.8, metalness: 0.8 }) : m.armor}>
            <sphereGeometry args={[0.16, 28, 28]} />
          </mesh>
          {/* Visor */}
          <mesh position={[0, 0, 0.12]} material={m.secondary}>
            <boxGeometry args={[0.22, 0.12, 0.08]} />
          </mesh>
          {/* Vision bar */}
          <mesh position={[0, 0.02, 0.165]} material={m.glow}>
            <boxGeometry args={[0.16, 0.03, 0.02]} />
          </mesh>
          {/* Cameras */}
          {([-0.05, 0.05] as number[]).map((x, i) => (
            <mesh key={i} position={[x, 0.02, 0.17]} rotation={[Math.PI / 2, 0, 0]} material={m.glowCyan}>
              <cylinderGeometry args={[0.015, 0.015, 0.02, 16]} />
            </mesh>
          ))}
          {/* Neck */}
          <mesh position={[0, -0.12, 0]} material={m.gold}>
            <cylinderGeometry args={[0.06, 0.07, 0.08, 16]} />
          </mesh>
          {/* Internal — visible only when exploded */}
          {isExploded && (
            <mesh position={[0, 0.02, 0]} material={m.npu}>
              <sphereGeometry args={[0.06, 16, 16]} />
            </mesh>
          )}
        </group>
      </AnimGroup>

      {/* ── TORSO SHELL (stays in place) ── */}
      <group position={PARTS.torso.base} onClick={(e) => handleClick(e, 'torso')}>
        {/* Chest plate — goes transparent when exploded to reveal internals */}
        <mesh>
          <boxGeometry args={[0.46, 0.42, 0.28]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.88}
            roughness={0.2}
            transparent={isExploded}
            opacity={isExploded ? 0.18 : 1}
          />
        </mesh>
        {/* Shoulder mounts */}
        {([-0.28, 0.28] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 0.14, 0]} material={m.gold}>
            <sphereGeometry args={[0.08, 16, 16]} />
          </mesh>
        ))}
      </group>

      {/* ── INTERNAL CORE (pops forward when exploded) ── */}
      <AnimGroup base={PARTS.core.base} explode={PARTS.core.explode} isExploded={isExploded}>
        <mesh ref={coreRef} rotation={[Math.PI / 2, 0, 0]} material={m.glow}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
        </mesh>
      </AnimGroup>

      {/* ── INTERNAL SPINE (pops backward when exploded) ── */}
      <AnimGroup base={PARTS.spine.base} explode={PARTS.spine.explode} isExploded={isExploded}>
        <mesh ref={npuRef} material={m.npu}>
          <boxGeometry args={[0.14, 0.46, 0.08]} />
        </mesh>
        {/* NPU chip detail */}
        {isExploded && (
          <mesh position={[0, 0.1, 0.05]} material={m.glowCyan}>
            <boxGeometry args={[0.08, 0.08, 0.02]} />
          </mesh>
        )}
      </AnimGroup>

      {/* ── WAIST ── */}
      <AnimGroup base={PARTS.waist.base} explode={PARTS.waist.explode} isExploded={isExploded}>
        <group onClick={(e) => handleClick(e, 'waist')}>
          <mesh material={m.secondary}>
            <cylinderGeometry args={[0.14, 0.16, 0.16, 24]} />
          </mesh>
          <mesh material={m.gold}>
            <torusGeometry args={[0.15, 0.02, 12, 24]} />
          </mesh>
          <mesh position={[0, -0.1, 0]} material={m.armor}>
            <boxGeometry args={[0.38, 0.14, 0.24]} />
          </mesh>
          {/* Battery inside waist — reveals when exploded */}
          {isExploded && (
            <mesh ref={battRef} position={[0, 0.02, 0]} material={m.battery} onClick={(e) => handleClick(e, 'battery')}>
              <boxGeometry args={[0.18, 0.08, 0.14]} />
            </mesh>
          )}
        </group>
      </AnimGroup>

      {/* ── LEFT ARM ── */}
      <AnimGroup base={PARTS.leftArm.base} explode={PARTS.leftArm.explode} isExploded={isExploded}>
        <group onClick={(e) => handleClick(e, 'arms')}>
          {/* Upper arm */}
          <mesh position={[-0.05, -0.18, 0]} material={m.secondary}>
            <cylinderGeometry args={[0.045, 0.04, 0.26, 16]} />
          </mesh>
          {/* Elbow */}
          <mesh position={[-0.05, -0.34, 0]} material={m.gold}>
            <sphereGeometry args={[0.055, 16, 16]} />
          </mesh>
          {/* Forearm */}
          <mesh position={[-0.05, -0.52, 0]} material={m.armor}>
            <cylinderGeometry args={[0.04, 0.035, 0.26, 16]} />
          </mesh>
          {/* Hand */}
          <group position={[-0.05, -0.68, 0]} onClick={(e) => handleClick(e, 'hands')}>
            <mesh material={m.secondary}>
              <boxGeometry args={[0.06, 0.08, 0.04]} />
            </mesh>
            {([-0.02, 0, 0.02] as number[]).map((x, i) => (
              <mesh key={i} position={[x, -0.06, 0]} material={m.gold}>
                <boxGeometry args={[0.012, 0.04, 0.012]} />
              </mesh>
            ))}
          </group>
          {/* Internal wiring — visible when exploded */}
          {isExploded && (
            <mesh position={[-0.05, -0.35, 0]} material={m.wires}>
              <cylinderGeometry args={[0.01, 0.01, 0.45, 8]} />
            </mesh>
          )}
        </group>
      </AnimGroup>

      {/* ── RIGHT ARM ── */}
      <AnimGroup base={PARTS.rightArm.base} explode={PARTS.rightArm.explode} isExploded={isExploded}>
        <group onClick={(e) => handleClick(e, 'arms')}>
          <mesh position={[0.05, -0.18, 0]} material={m.secondary}>
            <cylinderGeometry args={[0.045, 0.04, 0.26, 16]} />
          </mesh>
          <mesh position={[0.05, -0.34, 0]} material={m.gold}>
            <sphereGeometry args={[0.055, 16, 16]} />
          </mesh>
          <mesh position={[0.05, -0.52, 0]} material={m.armor}>
            <cylinderGeometry args={[0.04, 0.035, 0.26, 16]} />
          </mesh>
          <group position={[0.05, -0.68, 0]} onClick={(e) => handleClick(e, 'hands')}>
            <mesh material={m.secondary}>
              <boxGeometry args={[0.06, 0.08, 0.04]} />
            </mesh>
            {([-0.02, 0, 0.02] as number[]).map((x, i) => (
              <mesh key={i} position={[x, -0.06, 0]} material={m.gold}>
                <boxGeometry args={[0.012, 0.04, 0.012]} />
              </mesh>
            ))}
          </group>
          {isExploded && (
            <mesh position={[0.05, -0.35, 0]} material={m.wires}>
              <cylinderGeometry args={[0.01, 0.01, 0.45, 8]} />
            </mesh>
          )}
        </group>
      </AnimGroup>

      {/* ── LEFT LEG ── */}
      <AnimGroup base={PARTS.leftLeg.base} explode={PARTS.leftLeg.explode} isExploded={isExploded}>
        <group onClick={(e) => handleClick(e, 'legs')}>
          <mesh material={m.gold}><sphereGeometry args={[0.065, 16, 16]} /></mesh>
          <mesh position={[0, -0.22, 0]} material={m.armor}><boxGeometry args={[0.1, 0.36, 0.12]} /></mesh>
          <mesh position={[0, -0.44, 0]} rotation={[0, 0, Math.PI / 2]} material={m.gold}>
            <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
          </mesh>
          <mesh position={[0, -0.66, 0]} material={m.secondary}><boxGeometry args={[0.08, 0.36, 0.1]} /></mesh>
          <group position={[0, -0.87, 0.04]} onClick={(e) => handleClick(e, 'feet')}>
            <mesh material={m.secondary}><boxGeometry args={[0.11, 0.04, 0.22]} /></mesh>
            <mesh position={[0, -0.025, 0]}>
              <boxGeometry args={[0.11, 0.01, 0.22]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
          </group>
          {isExploded && (
            <mesh position={[0, -0.44, 0]} material={m.npu}>
              <sphereGeometry args={[0.04, 12, 12]} />
            </mesh>
          )}
        </group>
      </AnimGroup>

      {/* ── RIGHT LEG ── */}
      <AnimGroup base={PARTS.rightLeg.base} explode={PARTS.rightLeg.explode} isExploded={isExploded}>
        <group onClick={(e) => handleClick(e, 'legs')}>
          <mesh material={m.gold}><sphereGeometry args={[0.065, 16, 16]} /></mesh>
          <mesh position={[0, -0.22, 0]} material={m.armor}><boxGeometry args={[0.1, 0.36, 0.12]} /></mesh>
          <mesh position={[0, -0.44, 0]} rotation={[0, 0, Math.PI / 2]} material={m.gold}>
            <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
          </mesh>
          <mesh position={[0, -0.66, 0]} material={m.secondary}><boxGeometry args={[0.08, 0.36, 0.1]} /></mesh>
          <group position={[0, -0.87, 0.04]} onClick={(e) => handleClick(e, 'feet')}>
            <mesh material={m.secondary}><boxGeometry args={[0.11, 0.04, 0.22]} /></mesh>
            <mesh position={[0, -0.025, 0]}>
              <boxGeometry args={[0.11, 0.01, 0.22]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
          </group>
          {isExploded && (
            <mesh position={[0, -0.44, 0]} material={m.npu}>
              <sphereGeometry args={[0.04, 12, 12]} />
            </mesh>
          )}
        </group>
      </AnimGroup>

      {/* ── MOTORS at shoulder joints (appear when exploded) ── */}
      {isExploded && ([-0.28, 0.28] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 1.39, 0]} material={m.npu} onClick={(e) => handleClick(e, 'motors')}>
          <torusGeometry args={[0.07, 0.02, 10, 20]} />
        </mesh>
      ))}

      {/* ── GROUND RING ── */}
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.62, 32]} />
        <meshBasicMaterial color="#eb3b1c" opacity={isExploded ? 0.55 : 0.3} transparent />
      </mesh>
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.17, 32]} />
        <meshBasicMaterial color="#97D7FF" opacity={isExploded ? 0.45 : 0.2} transparent />
      </mesh>

      {/* ── EXPLODED: subtle scan lines / connecting axis dots ── */}
      {isExploded && (
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#97D7FF" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
}

