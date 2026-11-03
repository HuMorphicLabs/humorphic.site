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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-display uppercase tracking-wider transition-all duration-200 relative ${
                activeMainTab === 'team'
                  ? 'bg-[#03071E] text-[#FFBA08] border border-[#FFBA08]/50 shadow-[0_0_20px_rgba(244,172,6,0.3)] font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-gradient-to-r after:from-[#F4AC06] after:via-[#FFBA08] after:to-[#F4AC06] after:rounded-full'
                  : 'text-slate-400 hover:text-white hover:border-[#F4AC06]/30'
              }`}
            >
              <Users className={`h-4 w-4 ${activeMainTab === 'team' ? 'text-[#F4AC06]' : ''}`} />
              <span className="font-display">TEAM MEMBERS ({TOTAL_UNIQUE_MEMBERS})</span>
              <span className={`h-1.5 w-1.5 rounded-full ${activeMainTab === 'team' ? 'bg-[#F4AC06]' : 'bg-emerald-400'} animate-pulse ml-0.5`} />
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
          <div className="team-members-tab-theme space-y-10 animate-fade-in relative">
            {/* Ambient subtle robotics glow */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-gradient-to-b from-[#6A040F]/15 via-[#F4AC06]/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* 1. CLUB LEADERSHIP BLOCK */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#F4AC06]" />
                  <h3 className="text-xs font-display uppercase tracking-widest text-[#FFBA08] font-bold">
                    01 // CLUB LEADERSHIP &amp; SUPERVISION
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide bg-[#FFBA08]/10 text-[#FFBA08] border border-[#FFBA08]/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,186,8,0.15)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFBA08] animate-pulse" />
                  VERIFIED LEADERSHIP
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* HoD Card */}
                <div className="relative rounded-2xl border border-[#F4AC06]/25 bg-gradient-to-b from-[#03071E] via-[#040924] to-[#03071E] p-6 backdrop-blur-xl tm-card-lead-glow hover:border-[#FFBA08]/60 group transition-all duration-300">
                  {/* Subtle robotics corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FFBA08]/40 rounded-tl-sm pointer-events-none group-hover:border-[#FFBA08] transition-colors" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FFBA08]/40 rounded-br-sm pointer-events-none group-hover:border-[#FFBA08] transition-colors" />

                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#6A040F] via-[#3d0309] to-[#03071E] border border-[#FFBA08]/50 flex items-center justify-center font-display font-black text-[#FFBA08] text-xl shadow-[0_0_18px_rgba(255,186,8,0.25)] flex-shrink-0 group-hover:scale-105 transition-transform">
                      RP
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFBA08]/10 border border-[#FFBA08]/30 text-[10px] font-sans text-[#FFBA08] uppercase tracking-wider font-semibold">
                        <Sparkles className="h-3 w-3 text-[#F4AC06]" />
                        {CLUB_LEADERSHIP.hod.roleTitle}
                      </div>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight group-hover:text-[#FFBA08] transition-colors">
                        {CLUB_LEADERSHIP.hod.name}
                      </h4>
                      <div className="text-xs text-slate-300 font-sans pt-1">
                        <strong className="text-slate-200 font-semibold">Responsibilities:</strong>
                        <ul className="mt-1.5 space-y-1.5">
                          {CLUB_LEADERSHIP.hod.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 font-sans text-xs leading-relaxed">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#F4AC06] flex-shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Club Lead Card */}
                <div className="relative rounded-2xl border border-[#F4AC06]/25 bg-gradient-to-b from-[#03071E] via-[#040924] to-[#03071E] p-6 backdrop-blur-xl tm-card-lead-glow hover:border-[#FFBA08]/60 group transition-all duration-300">
                  {/* Subtle robotics corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#F4AC06]/40 rounded-tl-sm pointer-events-none group-hover:border-[#FFBA08] transition-colors" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#F4AC06]/40 rounded-br-sm pointer-events-none group-hover:border-[#FFBA08] transition-colors" />

                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#6A040F] via-[#3d0309] to-[#03071E] border border-[#F4AC06]/50 flex items-center justify-center font-display font-black text-[#FFBA08] text-xl shadow-[0_0_18px_rgba(244,172,6,0.25)] flex-shrink-0 group-hover:scale-105 transition-transform">
                      AT
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4AC06]/10 border border-[#F4AC06]/30 text-[10px] font-sans text-[#FFBA08] uppercase tracking-wider font-semibold">
                        <UserCheck className="h-3 w-3 text-[#F4AC06]" />
                        {CLUB_LEADERSHIP.clubLead.roleTitle}
                      </div>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight group-hover:text-[#FFBA08] transition-colors">
                        {CLUB_LEADERSHIP.clubLead.name}
                      </h4>
                      <div className="text-xs text-slate-300 font-sans pt-1">
                        <strong className="text-slate-200 font-semibold">Responsibilities:</strong>
                        <ul className="mt-1.5 space-y-1.5">
                          {CLUB_LEADERSHIP.clubLead.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 font-sans text-xs leading-relaxed">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#F4AC06] flex-shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SUB-VIEW SWITCHER: DIRECTORY VS TEAMS */}
            <div className="border-t border-white/10 pt-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-display text-[#F4AC06] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-[#F4AC06]" />
                    02 // MEMBERSHIP &amp; STRUCTURE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                    {teamSubView === 'directory' ? (
                      <>
                        COMPLETE MEMBERSHIP DIRECTORY (
                        <span className="text-[#FFBA08]">{TOTAL_UNIQUE_MEMBERS} UNIQUE MEMBERS</span>)
                      </>
                    ) : (
                      <>
                        FUNCTIONAL TEAMS &amp; RESPONSIBILITIES (
                        <span className="text-[#FFBA08]">6 TEAMS</span>)
                      </>
                    )}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#03071E] border border-white/10 shadow-inner">
                  <button
                    onClick={() => setTeamSubView('directory')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase transition-all duration-200 relative ${
                      teamSubView === 'directory'
                        ? 'bg-gradient-to-r from-[#6A040F]/40 to-[#03071E] border border-[#FFBA08]/60 text-[#FFBA08] shadow-[0_0_15px_rgba(244,172,6,0.25)] font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1.5px] after:bg-[#FFBA08]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ALL 18 MEMBERS
                  </button>
                  <button
                    onClick={() => setTeamSubView('teams')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase transition-all duration-200 relative ${
                      teamSubView === 'teams'
                        ? 'bg-gradient-to-r from-[#6A040F]/40 to-[#03071E] border border-[#FFBA08]/60 text-[#FFBA08] shadow-[0_0_15px_rgba(244,172,6,0.25)] font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1.5px] after:bg-[#FFBA08]'
                        : 'text-slate-400 hover:text-slate-200'
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
                      {directoryFilters.map((flt) => {
                        const isActive = directoryFilter === flt.id;
                        return (
                          <button
                            key={flt.id}
                            onClick={() => setDirectoryFilter(flt.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-sans tracking-wide transition-all border ${
                              isActive
                                ? 'bg-gradient-to-r from-[#6A040F]/40 to-[#03071E] border-[#FFBA08] text-[#FFBA08] shadow-[0_0_12px_rgba(244,172,6,0.25)] font-semibold'
                                : 'bg-[#03071E]/80 border-white/10 text-slate-400 hover:text-white hover:border-[#F4AC06]/40'
                            }`}
                          >
                            {flt.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Search Input */}
                    <div className="relative min-w-[240px]">
                      <Search className="h-4 w-4 text-[#F4AC06] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search member or team..."
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#03071E] border border-white/15 text-xs font-sans text-white placeholder-slate-500 focus:outline-none focus:border-[#F4AC06] focus:ring-1 focus:ring-[#F4AC06]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* 18 Members Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="relative rounded-xl border border-[#F4AC06]/20 bg-gradient-to-b from-[#03071E] via-[#04081f] to-[#03071E] p-5 flex flex-col justify-between tm-card-glow hover:border-[#FFBA08]/60 hover:-translate-y-1 transition-all duration-300 group"
                      >
                        {/* Corner robotics accent */}
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#FFBA08]/30 rounded-tl-sm pointer-events-none group-hover:border-[#FFBA08] transition-colors" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#FFBA08]/30 rounded-br-sm pointer-events-none group-hover:border-[#FFBA08] transition-colors" />

                        <div>
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-11 w-11 rounded-lg flex items-center justify-center font-display font-black text-sm shadow-md transition-transform group-hover:scale-105 flex-shrink-0 ${
                                  member.isClubLead
                                    ? 'bg-gradient-to-br from-[#6A040F] via-[#3a0309] to-[#03071E] border border-[#FFBA08] text-[#FFBA08] shadow-[0_0_12px_rgba(255,186,8,0.25)]'
                                    : member.isTeamLead
                                    ? 'bg-gradient-to-br from-[#6A040F]/60 via-[#26050b] to-[#03071E] border border-[#F4AC06]/70 text-[#F4AC06] shadow-[0_0_10px_rgba(244,172,6,0.2)]'
                                    : 'bg-[#03071E] border border-white/15 text-slate-200'
                                }`}
                              >
                                {member.initials}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-base font-display font-bold text-white tracking-tight truncate group-hover:text-[#FFBA08] transition-colors">
                                  {member.name}
                                </h4>
                                <div className="text-xs font-sans text-slate-400 mt-0.5 truncate">
                                  {member.designation}
                                </div>
                              </div>
                            </div>

                            {/* Badge */}
                            {member.isClubLead && (
                              <span className="px-2 py-0.5 rounded-full bg-[#FFBA08]/15 text-[#FFBA08] border border-[#FFBA08]/40 text-[9px] font-sans font-bold uppercase tracking-wider flex-shrink-0 shadow-[0_0_8px_rgba(255,186,8,0.15)]">
                                CLUB LEAD
                              </span>
                            )}
                            {member.isTeamLead && (
                              <span className="px-2 py-0.5 rounded-full bg-[#F4AC06]/15 text-[#F4AC06] border border-[#F4AC06]/40 text-[9px] font-sans font-bold uppercase tracking-wider flex-shrink-0 shadow-[0_0_8px_rgba(244,172,6,0.15)]">
                                TEAM LEAD
                              </span>
                            )}
                            {!member.isClubLead && !member.isTeamLead && member.teams.includes('General Club Member') && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 text-[9px] font-sans uppercase tracking-wider flex-shrink-0">
                                GENERAL
                              </span>
                            )}
                          </div>

                          {/* Associated Teams Tags */}
                          <div className="space-y-1.5 pt-3 border-t border-white/5">
                            <div className="text-[10px] font-sans text-slate-400 font-medium uppercase tracking-wider">
                              Assigned Teams:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {member.teams.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded-md bg-[#03071E] border border-white/10 text-[11px] font-sans text-slate-300 hover:border-[#F4AC06]/40 transition-colors"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-sans text-slate-500">
                          <span className="font-display tracking-wider text-slate-400">HUMORPHIC LAB</span>
                          <span className="text-[#F4AC06] flex items-center gap-1.5 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#F4AC06] animate-pulse" />
                            ACTIVE
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredMembers.length === 0 && (
                    <div className="p-8 text-center text-xs font-sans text-slate-400 bg-[#03071E]/90 rounded-xl border border-white/10">
                      No club members matched the filter or search query.
                    </div>
                  )}

                  {/* Summary Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-[#F4AC06]/20 bg-[#03071E]/90 text-xs font-sans text-slate-400 shadow-sm">
                    <div className="font-display tracking-wide">
                      DIRECTORY TOTAL: <strong className="text-[#FFBA08] font-bold">{TOTAL_UNIQUE_MEMBERS} UNIQUE MEMBERS</strong>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-sans">
                      <span className="text-[#F4AC06] flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#F4AC06]" />
                        NO DUPLICATE MEMBERS
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-300">ALL 18 VERIFIED</span>
                    </div>
                  </div>
                </div>
              )}

              {/* FUNCTIONAL TEAMS SUB-VIEW */}
              {teamSubView === 'teams' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TEAMS_DATA.map((team) => (
                    <div
                      key={team.id}
                      className="relative rounded-2xl border border-[#F4AC06]/20 bg-gradient-to-b from-[#03071E] via-[#04081f] to-[#03071E] p-6 flex flex-col justify-between tm-card-glow hover:border-[#FFBA08]/50 transition-all duration-300 space-y-5 group"
                    >
                      {/* Corner robotics accents */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#FFBA08]/30 rounded-tl-sm pointer-events-none group-hover:border-[#FFBA08] transition-colors" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#FFBA08]/30 rounded-br-sm pointer-events-none group-hover:border-[#FFBA08] transition-colors" />

                      <div>
                        {/* Team Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h4 className="text-lg font-display font-bold text-white tracking-tight group-hover:text-[#FFBA08] transition-colors">
                            {team.name}
                          </h4>
                          <span className="text-xs font-sans bg-[#03071E] px-2.5 py-0.5 rounded-full border border-[#F4AC06]/30 text-[#FFBA08] flex-shrink-0 font-medium">
                            {team.memberNames.length} Members
                          </span>
                        </div>

                        {/* Team Lead Indicator */}
                        <div className="mb-4">
                          {team.isLeadAssigned ? (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#6A040F]/30 border border-[#F4AC06]/40 text-xs font-sans text-[#FFBA08] shadow-[0_0_10px_rgba(244,172,6,0.15)]">
                              <UserCheck className="h-4 w-4 text-[#F4AC06]" />
                              <span>TEAM LEAD: <strong className="text-white font-display font-semibold">{team.lead}</strong></span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/60 text-xs font-sans text-slate-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                              <span>TEAM LEAD: <strong className="text-slate-300">Lead Not Assigned</strong></span>
                            </div>
                          )}
                        </div>

                        {/* Team Members List */}
                        <div className="space-y-2 mb-4">
                          <div className="text-xs font-sans text-slate-400 uppercase tracking-wider font-semibold">
                            Team Members:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {team.memberNames.map((name, idx) => {
                              const isThisLead = team.isLeadAssigned && team.lead === name;
                              return (
                                <span
                                  key={idx}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-sans transition-all ${
                                    isThisLead
                                      ? 'bg-[#6A040F]/40 border border-[#FFBA08] text-[#FFBA08] font-semibold shadow-[0_0_10px_rgba(255,186,8,0.2)]'
                                      : 'bg-[#03071E] border border-white/10 text-slate-200 hover:border-[#F4AC06]/40'
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
                          <div className="text-xs font-display text-[#FFBA08] uppercase tracking-wider font-bold">
                            Core Responsibilities:
                          </div>
                          <ul className="space-y-1.5">
                            {team.responsibilities.map((resp, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-slate-300 font-sans leading-relaxed"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#F4AC06] flex-shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-sans text-slate-500">
                        <span className="font-display tracking-wider text-slate-400">HUMORPHIC LAB BAY</span>
                        <span className="text-[#F4AC06] font-medium flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#F4AC06]" />
                          ACTIVE DIVISION
                        </span>
                      </div>
                    </div>
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
