'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import {
  CLUB_LEADERSHIP,
  MEMBERSHIP_DIRECTORY,
  TEAMS_DATA,
  TOTAL_UNIQUE_MEMBERS,
} from '@/config/teamData';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, ShieldCheck, Users, Layers } from 'lucide-react';

export interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeamModal({ isOpen, onClose }: TeamModalProps) {
  const [modalTab, setModalTab] = useState<'directory' | 'teams'>('directory');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      subtitle="HUMORPHIC LAB // [OFFICIAL_ROSTER]"
      title="CLUB LEADERSHIP & MEMBERS"
      maxWidth="4xl"
    >
      <div className="space-y-6">
        
        {/* Leadership Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-white/10">
          <div className="p-4 rounded-xl border border-humorphic-gold/40 bg-cyber-bg/80 flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-humorphic-wine to-humorphic-gold flex items-center justify-center font-display font-black text-white text-sm shadow-glow flex-shrink-0">
              RP
            </div>
            <div>
              <span className="text-[10px] font-mono text-humorphic-gold uppercase tracking-wider block">
                {CLUB_LEADERSHIP.hod.roleTitle}
              </span>
              <h4 className="text-base font-display font-bold text-white">
                {CLUB_LEADERSHIP.hod.name}
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {CLUB_LEADERSHIP.hod.responsibilities[0]}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-humorphic-orange/40 bg-cyber-bg/80 flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-humorphic-orange to-humorphic-gold flex items-center justify-center font-display font-black text-white text-sm shadow-glow flex-shrink-0">
              AT
            </div>
            <div>
              <span className="text-[10px] font-mono text-humorphic-orange uppercase tracking-wider block">
                {CLUB_LEADERSHIP.clubLead.roleTitle}
              </span>
              <h4 className="text-base font-display font-bold text-white">
                {CLUB_LEADERSHIP.clubLead.name}
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {CLUB_LEADERSHIP.clubLead.responsibilities[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalTab('directory')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                modalTab === 'directory'
                  ? 'bg-humorphic-orange/20 border-humorphic-orange text-white'
                  : 'bg-cyber-bg/60 border-cyber-border text-slate-400 hover:text-white'
              }`}
            >
              MEMBERSHIP DIRECTORY ({TOTAL_UNIQUE_MEMBERS})
            </button>
            <button
              onClick={() => setModalTab('teams')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
                modalTab === 'teams'
                  ? 'bg-humorphic-orange/20 border-humorphic-orange text-white'
                  : 'bg-cyber-bg/60 border-cyber-border text-slate-400 hover:text-white'
              }`}
            >
              TEAMS &amp; RESPONSIBILITIES (6)
            </button>
          </div>

          <Badge variant="active" pulse>
            {TOTAL_UNIQUE_MEMBERS} UNIQUE MEMBERS
          </Badge>
        </div>

        {/* Modal Directory View */}
        {modalTab === 'directory' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-1">
            {MEMBERSHIP_DIRECTORY.map((member) => (
              <div
                key={member.id}
                className="p-3.5 rounded-lg border border-cyber-border bg-cyber-bg/70 flex flex-col justify-between hover:border-slate-500 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className={`h-8 w-8 rounded-md flex items-center justify-center font-display font-bold text-xs text-white ${
                      member.isClubLead
                        ? 'bg-humorphic-gold text-cyber-bg font-black'
                        : member.isTeamLead
                        ? 'bg-humorphic-orange'
                        : 'bg-cyber-surface border border-white/10 text-slate-300'
                    }`}
                  >
                    {member.initials}
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-display font-bold text-white truncate">
                      {member.name}
                    </h5>
                    <span className="text-[10px] font-mono text-humorphic-gold block truncate">
                      {member.designation}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/5">
                  {member.teams.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-cyber-card border border-white/5 text-[9px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Teams View */}
        {modalTab === 'teams' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-1">
            {TEAMS_DATA.map((team) => (
              <div
                key={team.id}
                className="p-4 rounded-xl border border-cyber-border bg-cyber-bg/70 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-display font-bold text-white">
                    {team.name}
                  </h4>
                  <span className="text-[10px] font-mono text-humorphic-gold bg-cyber-surface px-2 py-0.5 rounded border border-white/10">
                    {team.memberNames.length} Members
                  </span>
                </div>

                <div className="text-xs font-mono">
                  {team.isLeadAssigned ? (
                    <span className="text-humorphic-gold font-semibold">
                      Team Lead: {team.lead}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">
                      Team Lead: Lead Not Assigned
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {team.memberNames.map((name, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-cyber-card border border-white/10 text-[10px] font-mono text-slate-300"
                    >
                      {name}
                    </span>
                  ))}
                </div>

                <ul className="space-y-1 pt-2 border-t border-white/5">
                  {team.responsibilities.map((r, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-1.5 text-[11px] text-slate-300 font-sans"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </Modal>
  );
}
