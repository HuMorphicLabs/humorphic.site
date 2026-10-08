'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import {
  Brain,
  Activity,
  Cpu,
  Eye,
  UserCheck,
  Mic,
  Server,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const FEATURES_DATA = [
  {
    tag: 'AI-CORE // 01',
    title: 'AI & Intelligent Control',
    desc: 'Deep reinforcement learning executing adaptive decision-making onboard high-speed neural processing units.',
    icon: Brain,
    specs: [
      { label: 'Inference Latency:', val: '< 1.8 ms' },
      { label: 'Architecture:', val: 'PyTorch Custom Tensor Core' },
      { label: 'Performance:', val: '12.8 TFLOPS Onboard NPU' },
    ],
  },
  {
    tag: 'KINEMATICS // 02',
    title: 'Robotic Movement',
    desc: 'Biomorphic gait generation with zero-moment-point equilibrium across irregular terrains and obstacles.',
    icon: Activity,
    specs: [
      { label: 'Degrees of Freedom:', val: '32 Articulated DOF' },
      { label: 'Max Stride Speed:', val: '4.8 m/s Bipedal Pace' },
      { label: 'Balance Loop:', val: '1,000 Hz Whole-Body Control' },
    ],
  },
  {
    tag: 'ACTUATION // 03',
    title: 'Servo Motor Control',
    desc: 'Sub-millimeter closed-loop torque and position feedback control running at high microsecond frequencies.',
    icon: Cpu,
    specs: [
      { label: 'Feedback Frequency:', val: '2 kHz Closed Loop' },
      { label: 'Position Sensing:', val: '18-Bit Magnetic Encoders' },
      { label: 'Reducers:', val: 'Zero-Backlash Harmonic Strain' },
    ],
  },
  {
    tag: 'PERCEPTION // 04',
    title: 'Computer Vision',
    desc: 'Spatial point-cloud generation and multi-spectral depth transformers for instant 3D mapping.',
    icon: Eye,
    specs: [
      { label: 'Frame Rate:', val: '60 FPS Stereo Perception' },
      { label: 'Field of View:', val: '120° Horizontal / 90° Vertical' },
      { label: 'Spatial AI:', val: '3D Point-Cloud Segmenter' },
    ],
  },
  {
    tag: 'BIOMORPHIC // 05',
    title: 'Human-like Motion',
    desc: 'Variable-impedance elastic actuation replicating natural biological muscle compliance and fluid gestures.',
    icon: UserCheck,
    specs: [
      { label: 'Joint Compliance:', val: 'Series Elastic Actuators' },
      { label: 'Force Feedback:', val: '6-Axis Torque-Sensing Wrist' },
      { label: 'Safety:', val: 'Instant Impedance Softening' },
    ],
  },
  {
    tag: 'CYBERNETICS // 06',
    title: 'Voice / Interaction',
    desc: 'Multi-directional beamforming microphone array paired with low-latency dialogue and voice synthesis.',
    icon: Mic,
    specs: [
      { label: 'Mic Hardware:', val: '6-Mic Spatial Array' },
      { label: 'Speech Latency:', val: '< 45 ms Response Time' },
      { label: 'Local Model:', val: 'Onboard Offline Whisper ASR' },
    ],
  },
  {
    tag: 'SYSTEM // 07',
    title: 'Real-time Processing',
    desc: 'Ultra-low latency dual-bus computing matrix coordinating motor actuation and high-speed sensor streams.',
    icon: Server,
    specs: [
      { label: 'Kernel OS:', val: 'Deterministic RTOS Micro-Kernel' },
      { label: 'Bus Standard:', val: 'CAN-FD @ 8 Mbps Bitrate' },
      { label: 'Co-Processors:', val: 'Dual NPU + Multi-core ARM' },
    ],
  },
  {
    tag: 'HARDWARE // 08',
    title: 'Modular Robotic Design',
    desc: 'Standardized quick-release carbon fiber limbs and plug-and-play bus connectors for rapid iteration.',
    icon: Layers,
    specs: [
      { label: 'Limb Mounts:', val: 'Toolless Quick-Release Latch' },
      { label: 'Chassis Frame:', val: 'Carbon Fiber Composite Matrix' },
      { label: 'Power Bus:', val: 'Universal Hot-Swap Protocol' },
    ],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange" />
            01 // SUBSYSTEM CAPABILITIES // [FULL_MATRIX]
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
            ROBOTIC <span className="text-humorphic-orange">FEATURE</span> ARCHITECTURE
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Advanced cybernetic subsystems engineered for physical intelligence, biomorphic motion, and real-time environment interaction.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feat) => {
            const Icon = feat.icon;
            return (
              <Card
                key={feat.tag}
                glow="orange"
                className="group flex flex-col justify-between hover:border-humorphic-orange/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-cyber-bg border border-humorphic-orange/40 text-humorphic-orange group-hover:scale-110 transition-transform shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-humorphic-gold transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                </div>

                {/* Technical Telemetry List */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {feat.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">{sp.label}</span>
                      <span className="text-humorphic-gold font-semibold">{sp.val}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
