'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { TEAM_MEMBERS } from '@/config/site';

export interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeamModal({ isOpen, onClose }: TeamModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      subtitle="HUMORPHIC ROBOTICS TEAM // [RESEARCHERS]"
      title="MEET THE ENGINEERS"
      maxWidth="4xl"
    >
      <p className="text-sm text-slate-300 font-sans mb-8">
        The multidisciplinary team of roboticists, AI scientists, and mechanical engineers building the future of physical intelligence.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="rounded-xl border border-cyber-border bg-cyber-bg/60 p-6 flex flex-col justify-between hover:border-humorphic-orange/60 transition-colors"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-humorphic-orange to-humorphic-gold flex items-center justify-center font-display font-black text-white text-base shadow-glow">
                  {member.initials}
                </div>
                <div>
                  <h4 className="text-base font-display font-bold text-white">
                    {member.name}
                  </h4>
                  <span className="text-xs font-mono text-humorphic-gold">
                    {member.role}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {member.bio}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>CYBERNETICS BAY LAB-3</span>
              <span className="text-emerald-400">ONLINE</span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
