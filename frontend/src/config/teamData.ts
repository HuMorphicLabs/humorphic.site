/**
 * =========================================================================
 * HUMORPHIC LAB - OFFICIAL TEAM & MEMBERSHIP DATA SOURCE
 * =========================================================================
 * 
 * Strict compliance with lab records:
 * - Total Unique Club Members: 18
 * - Club Leadership: HoD (Rajneesh Pachouri) & Club Lead (Akshansh Tamrakar)
 * - 6 Functional Teams with assigned/unassigned leads and responsibilities
 * - General Club Members designation
 * =========================================================================
 */

export interface LeadershipRole {
  roleTitle: string;
  name: string;
  responsibilities: string[];
}

export interface TeamStructure {
  id: string;
  name: string;
  lead: string;
  isLeadAssigned: boolean;
  memberNames: string[];
  responsibilities: string[];
}

export interface UniqueMemberDirectoryEntry {
  id: string;
  name: string;
  initials: string;
  isClubLead?: boolean;
  isTeamLead?: boolean;
  leadOfTeam?: string;
  teams: string[];
  designation: string;
}

export const CLUB_LEADERSHIP: {
  clubName: string;
  hod: LeadershipRole;
  clubLead: LeadershipRole;
} = {
  clubName: 'Humorphic Lab',
  hod: {
    roleTitle: 'Head of Department (HoD)',
    name: 'Rajneesh Pachouri',
    responsibilities: [
      'Overall supervision, guidance, and monitoring of club activities.',
    ],
  },
  clubLead: {
    roleTitle: 'Club Lead',
    name: 'Akshansh Tamrakar',
    responsibilities: [
      'Coordination among teams, task allocation, progress tracking, and management of club activities.',
    ],
  },
};

export const TEAMS_DATA: TeamStructure[] = [
  {
    id: 'simulation',
    name: 'Stimulation & Virtual Testing Team',
    lead: 'Juned Khan',
    isLeadAssigned: true,
    memberNames: [
      'Aryaman Kesarwani',
      'Juned Khan',
      'Pavan Sen',
      'Shubham Vishwakarma',
    ],
    responsibilities: [
      'Robot simulation and virtual testing.',
      'Testing motor movements and validating robot behaviour.',
      'Identifying errors and troubleshooting technical issues.',
      'Verifying system performance before physical implementation.',
    ],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence (AI) Team',
    lead: 'Sachin Vishwakarma',
    isLeadAssigned: true,
    memberNames: [
      'Priyangi Soni',
      'Rama Vishwakarma',
      'Rishi Vishwakarma',
      'Rupesh Sahu',
      'Sachin Vishwakarma',
    ],
    responsibilities: [
      'AI research and development.',
      'Exploring intelligent behaviour and automation for robotics.',
      'Developing and testing AI-related software.',
      'Integrating AI capabilities into robotics projects.',
    ],
  },
  {
    id: 'web-dev',
    name: 'Web Development Team',
    lead: 'Vanshika Vishwakarma',
    isLeadAssigned: true,
    memberNames: [
      'Arohi Chaurasia',
      'Himesh Dutt',
      'Shivani Vishwakarma',
      'Vanshika Vishwakarma',
    ],
    responsibilities: [
      'Designing and developing the Humorphic Lab website.',
      'Maintaining website content and project information.',
      'Implementing responsive layouts, animations, and UI improvements.',
      'Updating the website with team activities and project progress.',
    ],
  },
  {
    id: 'documentation',
    name: 'Technical Documentation Team',
    lead: 'Lead Not Assigned',
    isLeadAssigned: false,
    memberNames: [
      'Anshul Richhariya',
      'Arohi Chaurasia',
      'Priyangi Soni',
      'Shivani Vishwakarma',
      'Vanshika Vishwakarma',
    ],
    responsibilities: [
      'Preparing technical reports and project documentation.',
      'Maintaining records of robot assembly and development.',
      'Documenting technical challenges, errors, and solutions.',
      'Organising research material and project progress reports.',
    ],
  },
  {
    id: 'media',
    name: 'Media & Communication Team',
    lead: 'Lead Not Assigned',
    isLeadAssigned: false,
    memberNames: [
      'Anshul Richhariya',
      'Rahul Tamrakar',
    ],
    responsibilities: [
      'Capturing photographs and videos of club activities.',
      'Editing project videos and preparing media content.',
      'Documenting important milestones and team activities.',
      'Managing project updates and club communication.',
    ],
  },
  {
    id: 'general',
    name: 'General Club Members',
    lead: 'N/A',
    isLeadAssigned: false,
    memberNames: [
      'Devkinandan',
      'Rohit Basrani',
      'Sahil Rai Kajar',
    ],
    responsibilities: [
      'Contributing to club activities, hardware prototyping, and general lab operations.',
    ],
  },
];

/**
 * EXACT 18 UNIQUE CLUB MEMBERS DIRECTORY
 * Alphabetically maintained directory.
 */
export const MEMBERSHIP_DIRECTORY: UniqueMemberDirectoryEntry[] = [
  {
    id: 'member-01',
    name: 'Arohi Chaurasia',
    initials: 'AC',
    teams: ['Web Development Team', 'Technical Documentation Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-02',
    name: 'Akshansh Tamrakar',
    initials: 'AT',
    isClubLead: true,
    teams: ['Club Leadership'],
    designation: 'Club Lead',
  },
  {
    id: 'member-03',
    name: 'Anshul Richhariya',
    initials: 'AR',
    teams: ['Technical Documentation Team', 'Media & Communication Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-04',
    name: 'Devkinandan',
    initials: 'DK',
    teams: ['General Club Member'],
    designation: 'General Club Member',
  },
  {
    id: 'member-05',
    name: 'Juned Khan',
    initials: 'JK',
    isTeamLead: true,
    leadOfTeam: 'Stimulation & Virtual Testing Team',
    teams: ['Stimulation & Virtual Testing Team'],
    designation: 'Team Lead - Stimulation & Virtual Testing',
  },
  {
    id: 'member-06',
    name: 'Himesh Dutt',
    initials: 'HD',
    teams: ['Web Development Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-07',
    name: 'Pavan Sen',
    initials: 'PS',
    teams: ['Stimulation & Virtual Testing Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-08',
    name: 'Priyangi Soni',
    initials: 'PS',
    teams: ['Artificial Intelligence (AI) Team', 'Technical Documentation Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-09',
    name: 'Rahul Tamrakar',
    initials: 'RT',
    teams: ['Media & Communication Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-10',
    name: 'Rama Vishwakarma',
    initials: 'RV',
    teams: ['Artificial Intelligence (AI) Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-11',
    name: 'Rishi Vishwakarma',
    initials: 'RV',
    teams: ['Artificial Intelligence (AI) Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-12',
    name: 'Rohit Basrani',
    initials: 'RB',
    teams: ['General Club Member'],
    designation: 'General Club Member',
  },
  {
    id: 'member-13',
    name: 'Rupesh Sahu',
    initials: 'RS',
    teams: ['Artificial Intelligence (AI) Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-14',
    name: 'Sachin Vishwakarma',
    initials: 'SV',
    isTeamLead: true,
    leadOfTeam: 'Artificial Intelligence (AI) Team',
    teams: ['Artificial Intelligence (AI) Team'],
    designation: 'Team Lead - Artificial Intelligence (AI)',
  },
  {
    id: 'member-15',
    name: 'Sahil Rai Kajar',
    initials: 'SK',
    teams: ['General Club Member'],
    designation: 'General Club Member',
  },
  {
    id: 'member-16',
    name: 'Shivani Vishwakarma',
    initials: 'SV',
    teams: ['Web Development Team', 'Technical Documentation Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-17',
    name: 'Shubham Vishwakarma',
    initials: 'SV',
    teams: ['Stimulation & Virtual Testing Team'],
    designation: 'Team Member',
  },
  {
    id: 'member-18',
    name: 'Vanshika Vishwakarma',
    initials: 'VV',
    isTeamLead: true,
    leadOfTeam: 'Web Development Team',
    teams: ['Web Development Team', 'Technical Documentation Team'],
    designation: 'Team Lead - Web Development',
  },
];

export const TOTAL_UNIQUE_MEMBERS = MEMBERSHIP_DIRECTORY.length; // 18
