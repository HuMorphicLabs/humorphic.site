'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface HumanoidRobotProps {
  selectedPart?: string | null;
  onSelectPart?: (partId: string) => void;
  wireframe?: boolean;
}

export function HumanoidRobot({
  selectedPart,
  onSelectPart,
  wireframe = false,
}: HumanoidRobotProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  // Animation refs
  const robotGroup = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Materials
  const baseArmorMaterial = new THREE.MeshStandardMaterial({
    color: '#0f172a',
    metalness: 0.85,
    roughness: 0.25,
    wireframe,
  });

  const secondaryMetalMaterial = new THREE.MeshStandardMaterial({
    color: '#334155',
    metalness: 0.9,
    roughness: 0.35,
    wireframe,
  });

  const goldJointMaterial = new THREE.MeshStandardMaterial({
    color: '#f7c873',
    metalness: 0.95,
    roughness: 0.2,
    wireframe,
  });

  const getHighlightMaterial = (partId: string, defaultMat: THREE.Material) => {
    const isSelected = selectedPart === partId;
    const isHovered = hoveredPart === partId;

    if (isSelected) {
      return new THREE.MeshStandardMaterial({
        color: '#eb3b1c',
        emissive: '#eb3b1c',
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2,
        wireframe,
      });
    }

    if (isHovered) {
      return new THREE.MeshStandardMaterial({
        color: '#f7c873',
        emissive: '#f7c873',
        emissiveIntensity: 0.35,
        metalness: 0.8,
        roughness: 0.2,
        wireframe,
      });
    }

    return defaultMat;
  };

  // Idle movement & kinematics loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle breathing / idle motion
    if (robotGroup.current) {
      robotGroup.current.position.y = Math.sin(t * 1.5) * 0.015;
    }

    // Gentle head scanning
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.6) * 0.08;
      headRef.current.rotation.x = Math.sin(t * 1.2) * 0.03;
    }

    // Arm idle sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.03;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(t * 1.5) * 0.03;
    }

    // Core pulsing glow
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat && mat.emissive) {
        mat.emissiveIntensity = 0.5 + Math.sin(t * 3.0) * 0.3;
      }
    }
  });

  const handleClick = (e: any, partId: string) => {
    e.stopPropagation();
    onSelectPart?.(partId);
  };

  const handlePointerOver = (e: any, partId: string) => {
    e.stopPropagation();
    setHoveredPart(partId);
  };

  const handlePointerOut = () => {
    setHoveredPart(null);
  };

  return (
    <group ref={robotGroup} position={[0, 0, 0]}>
      
      {/* ================= HEAD ================= */}
      <group
        ref={headRef}
        position={[0, 1.62, 0]}
        onClick={(e) => handleClick(e, 'head')}
        onPointerOver={(e) => handlePointerOver(e, 'head')}
        onPointerOut={handlePointerOut}
      >
        {/* Cranium */}
        <mesh position={[0, 0, 0]} material={getHighlightMaterial('head', baseArmorMaterial)}>
          <sphereGeometry args={[0.16, 24, 24]} />
        </mesh>
        {/* Face Visor Plate */}
        <mesh position={[0, 0, 0.12]} material={getHighlightMaterial('head', secondaryMetalMaterial)}>
          <boxGeometry args={[0.22, 0.12, 0.08]} />
        </mesh>
        {/* Glowing 4K Vision Matrix Sensor Bar */}
        <mesh position={[0, 0.02, 0.165]}>
          <boxGeometry args={[0.16, 0.03, 0.02]} />
          <meshStandardMaterial
            color="#eb3b1c"
            emissive="#eb3b1c"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>
        {/* Stereo Depth Cameras (Left and Right) */}
        <mesh position={[-0.05, 0.02, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.02, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.05, 0.02, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.02, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
        </mesh>
        {/* Neck Actuator */}
        <mesh position={[0, -0.12, 0]} material={goldJointMaterial}>
          <cylinderGeometry args={[0.06, 0.07, 0.08, 16]} />
        </mesh>
      </group>

      {/* ================= TORSO & CORE COMPUTER ================= */}
      <group
        position={[0, 1.25, 0]}
        onClick={(e) => handleClick(e, 'torso')}
        onPointerOver={(e) => handlePointerOver(e, 'torso')}
        onPointerOut={handlePointerOut}
      >
        {/* Chest Carbon Composite Plate */}
        <mesh material={getHighlightMaterial('torso', baseArmorMaterial)}>
          <boxGeometry args={[0.46, 0.42, 0.28]} />
        </mesh>
        {/* Back Spine Reinforcement */}
        <mesh position={[0, 0, -0.13]} material={secondaryMetalMaterial}>
          <boxGeometry args={[0.14, 0.46, 0.08]} />
        </mesh>

        {/* Neural Processing Energy Core (Battery/NPU) */}
        <mesh
          ref={coreRef}
          position={[0, 0.02, 0.14]}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={(e) => handleClick(e, 'battery')}
        >
          <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
          <meshStandardMaterial
            color="#eb3b1c"
            emissive="#eb3b1c"
            emissiveIntensity={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Shoulder Mounts */}
        <mesh position={[-0.28, 0.14, 0]} material={goldJointMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[0.28, 0.14, 0]} material={goldJointMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
      </group>

      {/* ================= WAIST YAW ACTUATOR ================= */}
      <group
        position={[0, 0.92, 0]}
        onClick={(e) => handleClick(e, 'waist')}
        onPointerOver={(e) => handlePointerOver(e, 'waist')}
        onPointerOut={handlePointerOut}
      >
        <mesh material={getHighlightMaterial('waist', secondaryMetalMaterial)}>
          <cylinderGeometry args={[0.14, 0.16, 0.16, 24]} />
        </mesh>
        {/* Gold Harmonic Drive Ring */}
        <mesh material={goldJointMaterial}>
          <torusGeometry args={[0.15, 0.02, 12, 24]} />
        </mesh>
        {/* Pelvis Block */}
        <mesh position={[0, -0.1, 0]} material={baseArmorMaterial}>
          <boxGeometry args={[0.38, 0.14, 0.24]} />
        </mesh>
      </group>

      {/* ================= LEFT ARM ================= */}
      <group
        ref={leftArmRef}
        position={[-0.32, 1.35, 0]}
        onClick={(e) => handleClick(e, 'arms')}
        onPointerOver={(e) => handlePointerOver(e, 'arms')}
        onPointerOut={handlePointerOut}
      >
        {/* Upper Arm */}
        <mesh position={[-0.05, -0.18, 0]} material={getHighlightMaterial('arms', secondaryMetalMaterial)}>
          <cylinderGeometry args={[0.045, 0.04, 0.26, 16]} />
        </mesh>
        {/* Elbow Harmonic Actuator */}
        <mesh position={[-0.05, -0.34, 0]} material={goldJointMaterial}>
          <sphereGeometry args={[0.055, 16, 16]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.05, -0.52, 0]} material={getHighlightMaterial('arms', baseArmorMaterial)}>
          <cylinderGeometry args={[0.04, 0.035, 0.26, 16]} />
        </mesh>

        {/* Hand */}
        <group
          position={[-0.05, -0.68, 0]}
          onClick={(e) => handleClick(e, 'hands')}
          onPointerOver={(e) => handlePointerOver(e, 'hands')}
          onPointerOut={handlePointerOut}
        >
          <mesh material={getHighlightMaterial('hands', secondaryMetalMaterial)}>
            <boxGeometry args={[0.06, 0.08, 0.04]} />
          </mesh>
          {/* Bio Fingers */}
          {[-0.02, 0, 0.02].map((x, i) => (
            <mesh key={i} position={[x, -0.06, 0]} material={goldJointMaterial}>
              <boxGeometry args={[0.012, 0.04, 0.012]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= RIGHT ARM ================= */}
      <group
        ref={rightArmRef}
        position={[0.32, 1.35, 0]}
        onClick={(e) => handleClick(e, 'arms')}
        onPointerOver={(e) => handlePointerOver(e, 'arms')}
        onPointerOut={handlePointerOut}
      >
        {/* Upper Arm */}
        <mesh position={[0.05, -0.18, 0]} material={getHighlightMaterial('arms', secondaryMetalMaterial)}>
          <cylinderGeometry args={[0.045, 0.04, 0.26, 16]} />
        </mesh>
        {/* Elbow Actuator */}
        <mesh position={[0.05, -0.34, 0]} material={goldJointMaterial}>
          <sphereGeometry args={[0.055, 16, 16]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.05, -0.52, 0]} material={getHighlightMaterial('arms', baseArmorMaterial)}>
          <cylinderGeometry args={[0.04, 0.035, 0.26, 16]} />
        </mesh>

        {/* Hand */}
        <group
          position={[0.05, -0.68, 0]}
          onClick={(e) => handleClick(e, 'hands')}
          onPointerOver={(e) => handlePointerOver(e, 'hands')}
          onPointerOut={handlePointerOut}
        >
          <mesh material={getHighlightMaterial('hands', secondaryMetalMaterial)}>
            <boxGeometry args={[0.06, 0.08, 0.04]} />
          </mesh>
          {/* Bio Fingers */}
          {[-0.02, 0, 0.02].map((x, i) => (
            <mesh key={i} position={[x, -0.06, 0]} material={goldJointMaterial}>
              <boxGeometry args={[0.012, 0.04, 0.012]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= LEFT LEG ================= */}
      <group
        position={[-0.14, 0.76, 0]}
        onClick={(e) => handleClick(e, 'legs')}
        onPointerOver={(e) => handlePointerOver(e, 'legs')}
        onPointerOut={handlePointerOut}
      >
        {/* Hip Joint Node */}
        <mesh material={goldJointMaterial}>
          <sphereGeometry args={[0.065, 16, 16]} />
        </mesh>
        {/* Thigh */}
        <mesh position={[0, -0.22, 0]} material={getHighlightMaterial('legs', baseArmorMaterial)}>
          <boxGeometry args={[0.1, 0.36, 0.12]} />
        </mesh>
        {/* Knee Harmonic Actuator & Shock Piston */}
        <mesh position={[0, -0.44, 0]} rotation={[0, 0, Math.PI / 2]} material={goldJointMaterial}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        </mesh>
        {/* Shin & Calf */}
        <mesh position={[0, -0.66, 0]} material={getHighlightMaterial('legs', secondaryMetalMaterial)}>
          <boxGeometry args={[0.08, 0.36, 0.1]} />
        </mesh>

        {/* Foot Load Cell Assembly */}
        <group
          position={[0, -0.87, 0.04]}
          onClick={(e) => handleClick(e, 'feet')}
          onPointerOver={(e) => handlePointerOver(e, 'feet')}
          onPointerOut={handlePointerOut}
        >
          <mesh material={getHighlightMaterial('feet', secondaryMetalMaterial)}>
            <boxGeometry args={[0.11, 0.04, 0.22]} />
          </mesh>
          {/* Sole Traction Plate */}
          <mesh position={[0, -0.025, 0]}>
            <boxGeometry args={[0.11, 0.01, 0.22]} />
            <meshStandardMaterial color="#020617" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* ================= RIGHT LEG ================= */}
      <group
        position={[0.14, 0.76, 0]}
        onClick={(e) => handleClick(e, 'legs')}
        onPointerOver={(e) => handlePointerOver(e, 'legs')}
        onPointerOut={handlePointerOut}
      >
        {/* Hip Joint Node */}
        <mesh material={goldJointMaterial}>
          <sphereGeometry args={[0.065, 16, 16]} />
        </mesh>
        {/* Thigh */}
        <mesh position={[0, -0.22, 0]} material={getHighlightMaterial('legs', baseArmorMaterial)}>
          <boxGeometry args={[0.1, 0.36, 0.12]} />
        </mesh>
        {/* Knee Actuator */}
        <mesh position={[0, -0.44, 0]} rotation={[0, 0, Math.PI / 2]} material={goldJointMaterial}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        </mesh>
        {/* Shin */}
        <mesh position={[0, -0.66, 0]} material={getHighlightMaterial('legs', secondaryMetalMaterial)}>
          <boxGeometry args={[0.08, 0.36, 0.1]} />
        </mesh>

        {/* Foot Load Cell Assembly */}
        <group
          position={[0, -0.87, 0.04]}
          onClick={(e) => handleClick(e, 'feet')}
          onPointerOver={(e) => handlePointerOver(e, 'feet')}
          onPointerOut={handlePointerOut}
        >
          <mesh material={getHighlightMaterial('feet', secondaryMetalMaterial)}>
            <boxGeometry args={[0.11, 0.04, 0.22]} />
          </mesh>
          {/* Sole Traction */}
          <mesh position={[0, -0.025, 0]}>
            <boxGeometry args={[0.11, 0.01, 0.22]} />
            <meshStandardMaterial color="#020617" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Base Grid Contact Plate / Shadow Ring */}
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.62, 32]} />
        <meshBasicMaterial color="#eb3b1c" opacity={0.3} transparent />
      </mesh>
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.12, 32]} />
        <meshBasicMaterial color="#f7c873" opacity={0.2} transparent />
      </mesh>
    </group>
  );
}
