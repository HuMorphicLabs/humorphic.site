'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Send, CheckCircle2, Bot } from 'lucide-react';

export interface NeuralLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NeuralLinkModal({ isOpen, onClose }: NeuralLinkModalProps) {
  const [callsign, setCallsign] = useState('');
  const [email, setEmail] = useState('');
  const [focus, setFocus] = useState('Kinematics & WBC');
  const [transmission, setTransmission] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSent(false);
    setCallsign('');
    setEmail('');
    setTransmission('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      subtitle="NEURAL LINK PROTOCOL // [DIRECT_UPLINK]"
      title="INITIATE COLLABORATION"
      maxWidth="lg"
    >
      {isSent ? (
        <div className="text-center py-8 space-y-4">
          <div className="h-16 w-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            TRANSMISSION RECEIVED
          </h3>
          <p className="text-sm text-slate-300 font-sans max-w-sm mx-auto leading-relaxed">
            Neural packet routed to Humorphic Robotics Lab co-processors. An engineer will interface with you shortly.
          </p>
          <div className="pt-4">
            <Button variant="primary" onClick={handleReset}>
              CLOSE LINK
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-slate-400 font-sans mb-4">
            Connect directly with our engineering division for research partnerships, 3D model asset integration, or hardware inquiries.
          </p>

          <Input
            label="Callsign / Full Name"
            placeholder="e.g. Commander Sarah Vance"
            value={callsign}
            onChange={(e) => setCallsign(e.target.value)}
            required
          />

          <Input
            label="Communication Node / Email"
            type="email"
            placeholder="e.g. researcher@lab.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
              Research Focus
            </label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="block w-full rounded-md border border-cyber-border bg-cyber-card/90 px-3 py-2 text-sm text-slate-100 shadow-inner backdrop-blur-md focus:border-humorphic-orange focus:outline-none focus:ring-1 focus:ring-humorphic-orange"
            >
              <option value="Kinematics & WBC">Whole-Body Control (WBC) & Kinematics</option>
              <option value="Perception & LiDAR">Spatial LiDAR & 3D Vision AI</option>
              <option value="Harmonic Actuation">Zero-Backlash Actuators & BLDC Servos</option>
              <option value="3D Model Assets">3D GLTF/GLB Model Licensing & Dataset</option>
              <option value="General Inquiries">Lab Visit & Research Collaboration</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
              Transmission Payload / Message
            </label>
            <textarea
              rows={3}
              required
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              placeholder="Outline your research parameters, payload specifications, or inquiry..."
              className="block w-full rounded-md border border-cyber-border bg-cyber-card/90 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-inner backdrop-blur-md focus:border-humorphic-orange focus:outline-none focus:ring-1 focus:ring-humorphic-orange"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<Send className="h-4 w-4" />}
            >
              BROADCAST TRANSMISSION
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
