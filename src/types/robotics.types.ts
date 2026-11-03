export interface AnatomySpec {
  key: string;
  val: string;
}

export interface AnatomySubsystem {
  id: string;
  code: string;
  status: string;
  title: string;
  desc: string;
  specs: AnatomySpec[];
  targetCoords?: [number, number, number]; // 3D camera target [x, y, z]
}

export interface ChallengeCaseStudy {
  id: string;
  caseId: string;
  title: string;
  desc: string;
  why: string;
  solution: string;
}

export interface TimelineMilestone {
  step: number;
  phase: string;
  title: string;
  desc: string;
}

export interface TelemetryStat {
  label: string;
  sub: string;
  target?: number;
  suffix?: string;
  textVal?: string;
  iconName: string;
}

export interface TechItem {
  name: string;
  desc: string;
  pill: string;
  iconName: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}
