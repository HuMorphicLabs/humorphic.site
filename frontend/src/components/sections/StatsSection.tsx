'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TELEMETRY_STATS } from '@/config/site';
import {
  CLUB_LEADERSHIP,
  TEAMS_DATA,
  MEMBERSHIP_DIRECTORY,
  TOTAL_UNIQUE_MEMBERS,
  UniqueMemberDirectoryEntry,
} from '@/config/teamData';
import {
  Box,
  Cpu,
  Clock,
  Layers,
  Users,
  Activity,
  ShieldCheck,
  UserCheck,
  Search,
  CheckCircle2,
  FolderGit2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const iconsMap: Record<string, any> = {
  Box,
  Cpu,
  Clock,
  Layers,
  Users,
  Activity,
};

export function StatsSection() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [activeMainTab, setActiveMainTab] = useState<'metrics' | 'team'>('metrics');
  const [teamSubView, setTeamSubView] = useState<'directory' | 'teams'>('directory');
  const [directoryFilter, setDirectoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const duration = 1800;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts(
        TELEMETRY_STATS.map((stat) =>
          stat.target ? Math.round(stat.target * Math.min(progress, 1)) : 0
        )
      );

      if (step >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Filtered members in directory view
  const filteredMembers = useMemo(() => {
    return MEMBERSHIP_DIRECTORY.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.teams.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        member.designation.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (directoryFilter === 'ALL') return true;
      if (directoryFilter === 'LEADS') return member.isClubLead || member.isTeamLead;
      if (directoryFilter === 'GENERAL') return member.teams.includes('General Club Member');
      return member.teams.some((t) =>
        t.toLowerCase().includes(directoryFilter.toLowerCase())
      );
    });
  }, [searchQuery, directoryFilter]);

  const directoryFilters = [
    { id: 'ALL', label: `ALL (${TOTAL_UNIQUE_MEMBERS})` },
    { id: 'LEADS', label: 'LEADERSHIP & LEADS' },
    { id: 'stimulation', label: 'STIMULATION' },
    { id: 'ai', label: 'AI' },
    { id: 'web', label: 'WEB DEV' },
    { id: 'documentation', label: 'DOCUMENTATION' },
    { id: 'media', label: 'MEDIA' },
    { id: 'GENERAL', label: 'GENERAL' },
  ];

  return (
    <section id="stats" className="py-20 relative overflow-hidden bg-cyber-bg">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-humorphic-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3 reveal-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-humorphic-orange tracking-wider bg-cyber-card/80 border border-humorphic-orange/30 px-3 py-1 rounded-full shadow-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-humorphic-orange animate-pulse" />
            06 // TELEMETRY &amp; METRICS // [PROJECT_STATS]
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-wide uppercase reveal-blur-sharp">
            ROBOT AT A <span className="text-humorphic-orange">GLANCE</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Key empirical engineering metrics, fabrication volumes, testing benchmarks, and verified club team directory for Humorphic Lab.
          </p>
        </div>

        {/* Primary Tabs Navigation (Telemetry Metrics vs Team Members) */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl border border-cyber-border bg-cyber-card/80 backdrop-blur-xl">
            <button
              onClick={() => setActiveMainTab('metrics')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                activeMainTab === 'metrics'
                  ? 'bg-humorphic-orange text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>TELEMETRY METRICS</span>
            </button>
            <button
              onClick={() => setActiveMainTab('team')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                activeMainTab === 'team'
                  ? 'bg-humorphic-orange text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>TEAM MEMBERS ({TOTAL_UNIQUE_MEMBERS})</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </button>
          </div>
        </div>

        {/* TAB 1: TELEMETRY METRICS (6 STAT CARDS) */}
        {activeMainTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 reveal-stagger-parent">
              {TELEMETRY_STATS.map((stat, idx) => {
                const Icon = iconsMap[stat.iconName] || Activity;
                const isTeamCard = stat.label === 'Team Members';

                return (
                  <Card
                    key={stat.label}
                    glow="orange"
                    onClick={() => {
                      if (isTeamCard) setActiveMainTab('team');
                    }}
                    className={`p-5 text-center flex flex-col items-center justify-between group transition-all ${
                      isTeamCard
                        ? 'cursor-pointer border-humorphic-orange/40 hover:border-humorphic-orange shadow-glow-sm hover:scale-[1.02]'
                        : 'hover:border-humorphic-orange/60'
                    }`}
                  >
                    <div className="p-3 rounded-lg bg-cyber-bg border border-white/10 text-humorphic-orange mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="space-y-1 my-auto">
                      <div className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                        {stat.textVal ? (
                          stat.textVal
                        ) : (
                          <>
                            {counts[idx]}
                            <span className="text-sm text-humorphic-gold ml-0.5">
                              {stat.suffix}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="text-xs font-mono font-semibold text-slate-300">
                        {stat.label}
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 pt-3 border-t border-white/5 w-full mt-3 flex items-center justify-center gap-1">
                      <span>{stat.sub}</span>
                    </div>

                    {isTeamCard && (
                      <div className="mt-2 text-[10px] font-mono text-humorphic-gold flex items-center gap-1 font-semibold group-hover:underline">
                        <span>VIEW DIRECTORY</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Quick banner linking to Team Members tab */}
            <div className="rounded-xl border border-cyber-border/80 bg-cyber-card/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="p-2.5 rounded-lg bg-cyber-bg border border-humorphic-orange/40 text-humorphic-orange">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-display font-bold text-white flex items-center gap-2">
                    <span>HUMORPHIC LAB MEMBERSHIP DIRECTORY</span>
                    <Badge variant="active" pulse>
                      {TOTAL_UNIQUE_MEMBERS} UNIQUE MEMBERS
                    </Badge>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Club Leadership • 6 Functional Teams • Defined Responsibilities
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveMainTab('team')}
                className="px-4 py-2 rounded-lg bg-cyber-bg border border-humorphic-orange/60 text-xs font-mono text-humorphic-gold hover:text-white hover:bg-humorphic-orange/20 transition-all flex items-center gap-2 shadow-glow"
              >
                <span>OPEN TEAM MEMBERS TAB</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TEAM MEMBERS TAB (LEADERSHIP, TEAMS, DIRECTORY) */}
        {activeMainTab === 'team' && (
          <div className="space-y-10 animate-fade-in">
            
            {/* 1. CLUB LEADERSHIP BLOCK */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-humorphic-orange" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-humorphic-orange font-bold">
                    01 // CLUB LEADERSHIP &amp; SUPERVISION
                  </h3>
                </div>
                <Badge variant="active">VERIFIED LEADERSHIP</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* HoD Card */}
                <Card glow="gold" className="p-6 bg-cyber-card/90 border-humorphic-gold/40">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#086288] to-[#FFEFC4] flex items-center justify-center font-display font-black text-[#05131D] text-lg shadow-glow-cream flex-shrink-0">
                      RP
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FFEFC4]/10 border border-[#FFEFC4]/40 text-[10px] font-mono text-[#FFEFC4] uppercase tracking-wider font-semibold">
                        <Sparkles className="h-3 w-3" />
                        {CLUB_LEADERSHIP.hod.roleTitle}
                      </div>
                      <h4 className="text-xl font-display font-bold text-white">
                        {CLUB_LEADERSHIP.hod.name}
                      </h4>
                      <div className="text-xs text-slate-300 font-sans pt-1">
                        <strong className="text-slate-200">Responsibilities:</strong>
                        <ul className="mt-1 space-y-1">
                          {CLUB_LEADERSHIP.hod.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-400 font-mono text-[11px]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Club Lead Card */}
                <Card glow="orange" className="p-6 bg-cyber-card/90 border-[#97D7FF]/40">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#086288] to-[#97D7FF] flex items-center justify-center font-display font-black text-[#05131D] text-lg shadow-glow-sky flex-shrink-0">
                      AT
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#086288]/20 border border-[#97D7FF]/50 text-[10px] font-mono text-[#97D7FF] uppercase tracking-wider font-semibold">
                        <UserCheck className="h-3 w-3" />
                        {CLUB_LEADERSHIP.clubLead.roleTitle}
                      </div>
                      <h4 className="text-xl font-display font-bold text-white">
                        {CLUB_LEADERSHIP.clubLead.name}
                      </h4>
                      <div className="text-xs text-slate-300 font-sans pt-1">
                        <strong className="text-slate-200">Responsibilities:</strong>
                        <ul className="mt-1 space-y-1">
                          {CLUB_LEADERSHIP.clubLead.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-400 font-mono text-[11px]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* 2. SUB-VIEW SWITCHER: DIRECTORY VS TEAMS */}
            <div className="border-t border-cyber-border/80 pt-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    02 // MEMBERSHIP &amp; STRUCTURE
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {teamSubView === 'directory'
                      ? `COMPLETE MEMBERSHIP DIRECTORY (${TOTAL_UNIQUE_MEMBERS} UNIQUE MEMBERS)`
                      : 'FUNCTIONAL TEAMS & RESPONSIBILITIES (6 TEAMS)'}
                  </h3>
                </div>

                <div className="flex items-center gap-2 p-1 rounded-lg bg-cyber-card border border-cyber-border">
                  <button
                    onClick={() => setTeamSubView('directory')}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                      teamSubView === 'directory'
                        ? 'bg-humorphic-orange/20 border border-humorphic-orange text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ALL 18 MEMBERS
                  </button>
                  <button
                    onClick={() => setTeamSubView('teams')}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                      teamSubView === 'teams'
                        ? 'bg-humorphic-orange/20 border border-humorphic-orange text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    TEAMS &amp; ROLES (6)
                  </button>
                </div>
              </div>

              {/* DIRECTORY SUB-VIEW */}
              {teamSubView === 'directory' && (
                <div className="space-y-6">
                  {/* Filters & Search */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {directoryFilters.map((flt) => (
                        <button
                          key={flt.id}
                          onClick={() => setDirectoryFilter(flt.id)}
                          className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-all border ${
                            directoryFilter === flt.id
                              ? 'bg-humorphic-orange/20 border-humorphic-orange text-white shadow-glow'
                              : 'bg-cyber-card/60 border-cyber-border text-slate-400 hover:text-white hover:border-slate-500'
                          }`}
                        >
                          {flt.label}
                        </button>
                      ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative min-w-[240px]">
                      <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search member or team..."
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-cyber-card/80 border border-cyber-border text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-humorphic-orange"
                      />
                    </div>
                  </div>

                  {/* 18 Members Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMembers.map((member) => (
                      <Card
                        key={member.id}
                        glow={member.isClubLead ? 'gold' : member.isTeamLead ? 'orange' : 'none'}
                        className="p-4 flex flex-col justify-between border-cyber-border/80 bg-cyber-card/70 hover:border-slate-500 transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-10 w-10 rounded-lg flex items-center justify-center font-display font-black text-xs shadow-md ${
                                  member.isClubLead
                                    ? 'bg-gradient-to-br from-[#086288] to-[#FFEFC4] text-[#05131D]'
                                    : member.isTeamLead
                                    ? 'bg-gradient-to-br from-[#086288] to-[#97D7FF] text-[#05131D]'
                                    : 'bg-cyber-surface border border-cyber-border text-slate-200'
                                }`}
                              >
                                {member.initials}
                              </div>
                              <div>
                                <h4 className="text-sm font-display font-bold text-white">
                                  {member.name}
                                </h4>
                                <div className="text-[10px] font-mono text-slate-400">
                                  {member.designation}
                                </div>
                              </div>
                            </div>

                            {/* Badge */}
                            {member.isClubLead && (
                              <span className="px-2 py-0.5 rounded bg-[#FFEFC4]/20 text-[#FFEFC4] border border-[#FFEFC4]/40 text-[9px] font-mono font-bold uppercase tracking-wider">
                                CLUB LEAD
                              </span>
                            )}
                            {member.isTeamLead && (
                              <span className="px-2 py-0.5 rounded bg-[#086288]/25 text-[#97D7FF] border border-[#97D7FF]/50 text-[9px] font-mono font-bold uppercase tracking-wider">
                                TEAM LEAD
                              </span>
                            )}
                            {!member.isClubLead && !member.isTeamLead && member.teams.includes('General Club Member') && (
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-mono uppercase tracking-wider">
                                GENERAL
                              </span>
                            )}
                          </div>

                          {/* Associated Teams Tags */}
                          <div className="space-y-1 pt-2 border-t border-white/5">
                            <div className="text-[10px] font-mono text-slate-500 uppercase">
                              Assigned Teams:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {member.teams.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-cyber-surface border border-white/10 text-[10px] font-mono text-slate-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
                          <span>HUMORPHIC LAB</span>
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="h-1 w-1 rounded-full bg-emerald-400" />
                            ACTIVE
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {filteredMembers.length === 0 && (
                    <div className="p-8 text-center text-xs font-mono text-slate-400 bg-cyber-card/40 rounded-xl border border-cyber-border">
                      No club members matched the filter or search query.
                    </div>
                  )}

                  {/* Summary Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-cyber-border bg-cyber-card/40 text-xs font-mono text-slate-400">
                    <div>
                      DIRECTORY TOTAL: <strong className="text-white">{TOTAL_UNIQUE_MEMBERS} UNIQUE MEMBERS</strong>
                    </div>
                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        NO DUPLICATE MEMBERS
                      </span>
                      <span>•</span>
                      <span>ALL 18 VERIFIED</span>
                    </div>
                  </div>
                </div>
              )}

              {/* FUNCTIONAL TEAMS SUB-VIEW */}
              {teamSubView === 'teams' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TEAMS_DATA.map((team) => (
                    <Card
                      key={team.id}
                      glow={team.isLeadAssigned ? 'orange' : 'none'}
                      className="p-6 flex flex-col justify-between border-cyber-border/80 bg-cyber-card/80 space-y-4"
                    >
                      <div>
                        {/* Team Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-base font-display font-bold text-white">
                            {team.name}
                          </h4>
                          <span className="text-[10px] font-mono bg-cyber-surface px-2 py-0.5 rounded border border-white/10 text-slate-400 flex-shrink-0">
                            {team.memberNames.length} Members
                          </span>
                        </div>

                        {/* Team Lead Indicator */}
                        <div className="mb-4">
                          {team.isLeadAssigned ? (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#086288]/20 border border-[#97D7FF]/50 text-xs font-mono text-[#FFEFC4]">
                              <UserCheck className="h-3.5 w-3.5 text-[#97D7FF]" />
                              <span>TEAM LEAD: <strong className="text-white">{team.lead}</strong></span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                              <span>TEAM LEAD: <strong className="text-slate-300">Lead Not Assigned</strong></span>
                            </div>
                          )}
                        </div>

                        {/* Team Members List */}
                        <div className="space-y-1.5 mb-4">
                          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                            Team Members:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {team.memberNames.map((name, idx) => {
                              const isThisLead = team.isLeadAssigned && team.lead === name;
                              return (
                                <span
                                  key={idx}
                                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                                    isThisLead
                                      ? 'bg-[#086288]/30 border border-[#97D7FF] text-[#FFEFC4] font-semibold shadow-glow-sky'
                                      : 'bg-cyber-surface border border-cyber-border text-slate-200'
                                  }`}
                                >
                                  {name}
                                  {isThisLead && ' ★'}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Responsibilities */}
                        <div className="space-y-2 pt-3 border-t border-white/10">
                          <div className="text-[11px] font-mono text-[#97D7FF] uppercase tracking-wider font-semibold">
                            Core Responsibilities:
                          </div>
                          <ul className="space-y-1.5">
                            {team.responsibilities.map((resp, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-slate-300 font-sans leading-relaxed"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>HUMORPHIC LAB BAY</span>
                        <span className="text-emerald-400">ACTIVE DIVISION</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
