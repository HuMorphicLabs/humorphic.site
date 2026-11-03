'use client';

import React, { useEffect, useState } from 'react';
import { X, Cpu, Zap, Shield, Activity, Radio, Wifi, Eye, Battery } from 'lucide-react';
import { ANATOMY_SUBSYSTEMS } from '@/config/site';

export interface ExplodedHUDProps {
  isExploded: boolean;
  selectedPart: string | null;
  onClose: () => void;
  onSelectPart: (partId: string) => void;
}

// ── Internal components list shown in HUD ──────────────────────────────────────
const INTERNAL_SYSTEMS = [
  { id: 'battery', label: 'POWER BUS', icon: Battery,   color: '#16a34a', status: 'ONLINE',    value: '700Wh / 48V' },
  { id: 'torso',   label: 'CORE NPU',  icon: Cpu,       color: '#7c3aed', status: 'ACTIVE',    value: '12.8 TFLOPS' },
  { id: 'motors',  label: 'SERVOS',    icon: Zap,       color: '#FFEFC4', status: 'CALIBRATED', value: '32 DOF' },
  { id: 'head',    label: 'VISION AI', icon: Eye,       color: '#00f0ff', status: 'SCANNING',  value: '4K Stereo' },
  { id: 'arms',    label: 'MANIPULAT', icon: Radio,     color: '#97D7FF', status: 'READY',     value: '±0.05 mm' },
  { id: 'waist',   label: 'IMU GYRO',  icon: Activity,  color: '#f59e0b', status: 'LOCKED',    value: '9-Axis' },
  { id: 'legs',    label: 'BIPEDAL',   icon: Shield,    color: '#eb3b1c', status: 'NOMINAL',   value: '4.8 m/s' },
  { id: 'feet',    label: 'LOAD CELL', icon: Wifi,      color: '#a78bfa', status: 'SENSING',   value: '2,000 Hz' },
];

// ── Scanline line component ────────────────────────────────────────────────────
function ScanBars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-[0.04]"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(151,215,255,0.5) 2px, rgba(151,215,255,0.5) 4px)',
      }}
    />
  );
}

// ── Animated blinking dot ──────────────────────────────────────────────────────
function BlinkDot({ color = '#97D7FF' }: { color?: string }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full animate-ping"
      style={{ backgroundColor: color, animationDuration: '1.4s' }}
    />
  );
}

// ── Telemetry bar ──────────────────────────────────────────────────────────────
function TelemetryBar({ label, value, color, pct }: { label: string; value: string; color: string; pct: number }) {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="space-y-0.5">
      <div className="flex justify-between text-[9px] font-mono">
        <span className="text-slate-400 tracking-widest">{label}</span>
        <span style={{ color }} className="font-bold">{value}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${fill}%`, backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
        />
      </div>
    </div>
  );
}

// ── Main HUD component ─────────────────────────────────────────────────────────
export function ExplodedHUD({ isExploded, selectedPart, onClose, onSelectPart }: ExplodedHUDProps) {
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);

  // Delayed mount for entrance animation
  useEffect(() => {
    if (isExploded) {
      const t = setTimeout(() => setVisible(true), 60);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isExploded]);

  // Fake telemetry ticker
  useEffect(() => {
    if (!isExploded) return;
    const id = setInterval(() => setTick((n) => n + 1), 1200);
    return () => clearInterval(id);
  }, [isExploded]);

  if (!isExploded) return null;

  const currentSub = selectedPart ? ANATOMY_SUBSYSTEMS[selectedPart] : null;
  const sysInfo = selectedPart ? INTERNAL_SYSTEMS.find((s) => s.id === selectedPart) : null;

  return (
    <div
      className={`
        pointer-events-auto
        fixed inset-0 z-[80] flex items-start justify-end
        transition-opacity duration-500
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ pointerEvents: 'none' }}
    >
      {/* ── RIGHT PANEL ─────────────────────────────────────────────────── */}
      <div
        className={`
          pointer-events-auto
          relative m-4 mt-20 w-72
          rounded-xl border border-[#97D7FF]/30 bg-[#030c14]/90 backdrop-blur-2xl
          shadow-[0_0_50px_rgba(8,98,136,0.35)]
          transition-all duration-500
          ${visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
        `}
        style={{ fontFamily: 'monospace' }}
      >
        <ScanBars />

        {/* Header */}
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-[#97D7FF]/20">
          <div className="flex items-center gap-2">
            <BlinkDot color="#eb3b1c" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#97D7FF]">EXPLODED VIEW</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-0.5 rounded"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* System header */}
        <div className="px-4 py-2 border-b border-white/5">
          <div className="text-[8px] tracking-[0.3em] text-slate-500 mb-0.5">UNIT DESIGNATION</div>
          <div className="text-xs text-white font-bold tracking-wider">HUMORPHIC // HMR-5.04</div>
          <div className="text-[9px] text-emerald-400 mt-0.5">[SYS::DECONSTRUCTED :: INTERNALS_ACTIVE]</div>
        </div>

        {/* Telemetry bars */}
        <div className="px-4 py-3 border-b border-white/5 space-y-2">
          <div className="text-[8px] tracking-[0.3em] text-slate-500 mb-2">LIVE TELEMETRY</div>
          <TelemetryBar label="CPU LOAD"     value={`${48 + (tick % 3) * 7}%`}   color="#97D7FF" pct={48 + (tick % 3) * 7} />
          <TelemetryBar label="POWER DRAW"   value={`${320 + (tick % 5) * 12}W`} color="#FFEFC4" pct={62 + (tick % 4) * 5} />
          <TelemetryBar label="THERMAL"      value={`${38 + (tick % 4) * 2}°C`}  color="#eb3b1c" pct={38 + (tick % 4) * 2} />
          <TelemetryBar label="BATTERY"      value="87%"                          color="#16a34a" pct={87} />
        </div>

        {/* Internal systems list */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="text-[8px] tracking-[0.3em] text-slate-500 mb-2">INTERNAL SUBSYSTEMS</div>
          <div className="space-y-1">
            {INTERNAL_SYSTEMS.map((sys) => {
              const Icon = sys.icon;
              const isSelected = selectedPart === sys.id;
              return (
                <button
                  key={sys.id}
                  onClick={() => onSelectPart(sys.id)}
                  className={`
                    w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left
                    transition-all duration-200
                    ${isSelected
                      ? 'bg-[#086288]/40 border border-[#97D7FF]/50'
                      : 'border border-transparent hover:bg-white/5 hover:border-white/10'
                    }
                  `}
                >
                  <Icon className="h-3 w-3 flex-shrink-0" style={{ color: sys.color }} />
                  <span className="text-[9px] font-bold tracking-widest text-slate-300 flex-1">{sys.label}</span>
                  <span className="text-[8px]" style={{ color: sys.color }}>{sys.status}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected part detail */}
        {currentSub && (
          <div className="px-4 py-3">
            <div className="text-[8px] tracking-[0.3em] text-slate-500 mb-1">ACTIVE MODULE</div>
            <div className="text-[10px] font-bold text-[#97D7FF] mb-1">{currentSub.code}</div>
            <div className="text-[9px] text-slate-300 leading-relaxed mb-2">{currentSub.desc}</div>
            <div className="grid grid-cols-2 gap-1.5">
              {currentSub.specs.map((sp, i) => (
                <div key={i} className="bg-white/5 rounded px-1.5 py-1">
                  <div className="text-[7px] text-slate-500">{sp.key}</div>
                  <div className="text-[8px] text-[#FFEFC4] font-bold">{sp.val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer ticker */}
        <div className="px-4 py-2 border-t border-white/5">
          <div className="text-[7px] text-slate-600 tracking-wider">
            {`TICK_${String(tick).padStart(4, '0')} // SEQ::${(tick * 137 % 9999).toString().padStart(4, '0')} // FRAME_OK`}
          </div>
        </div>
      </div>

      {/* ── LEFT CORNER BADGE ───────────────────────────────────────────── */}
      <div
        className={`
          pointer-events-none
          fixed left-4 top-20
          transition-all duration-500
          ${visible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
        `}
      >
        <div className="rounded-xl border border-[#eb3b1c]/40 bg-[#030c14]/85 backdrop-blur-xl px-4 py-3 shadow-[0_0_30px_rgba(235,59,28,0.2)]">
          <div className="flex items-center gap-2 mb-1">
            <BlinkDot color="#eb3b1c" />
            <span className="text-[9px] font-bold tracking-[0.3em] text-[#eb3b1c]">EXPLODED VIEW ACTIVE</span>
          </div>
          <div className="text-[8px] text-slate-400 tracking-wider">CLICK PARTS TO INSPECT</div>
          <div className="text-[8px] text-slate-400 tracking-wider">CLICK BUTTON TO REASSEMBLE</div>
        </div>
      </div>
    </div>
  );
}

