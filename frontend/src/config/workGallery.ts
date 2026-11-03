export interface WorkPhoto {
  id: string;
  title: string;
  category: 'BIPEDAL' | 'KINEMATICS' | 'SYSTEMS';
  categoryLabel: string;
  tag: string;
  date: string;
  image: string;
  originalFileName: string;
  description: string;
  orientation: 'portrait' | 'landscape';
  specs: { label: string; val: string }[];
}

/**
 * =========================================================================
 * HUMORPHIC LAB - "OUR WORK" AUTHENTIC PHOTO GALLERY REGISTRY
 * =========================================================================
 * 
 * Photographic records documenting the physical fabrication and laboratory
 * testing of Humorphic Lab humanoid robotics hardware.
 * =========================================================================
 */
export const OUR_WORK_PHOTOS: WorkPhoto[] = [
  {
    id: 'work-01',
    title: 'Full Bipedal Humanoid Prototype & Posture Calibration',
    category: 'BIPEDAL',
    categoryLabel: 'Bipedal Locomotion',
    tag: 'BIPEDAL PROTO // LOG-01',
    date: 'OCTOBER 2026',
    image: '/images/work/bipedal-prototype-standing.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-13 at 3.07.57 PM.jpeg',
    orientation: 'portrait',
    description:
      'Full-body upright bipedal humanoid prototype standing on the lab workbench in front of technical blueprints. Demonstrates multi-axis articulated lower limbs, high-torque servo stacks, dual arms with biomorphic end-effectors, and central box chassis.',
    specs: [
      { label: 'Kinematics:', val: '12+ Active Articulated Axes' },
      { label: 'Actuation:', val: 'Synchronized High-Torque Servos' },
      { label: 'Chassis:', val: 'Aircraft Aluminum & Box Core' },
      { label: 'Stage:', val: 'Upright Posture & Balance Test' },
    ],
  },
  {
    id: 'work-02',
    title: 'Dual-Leg Servo Actuation Stack & CNC Joints',
    category: 'BIPEDAL',
    categoryLabel: 'Leg Kinematics & Actuators',
    tag: 'ACTUATION MATRIX // LOG-02',
    date: 'OCTOBER 2026',
    image: '/images/work/bipedal-leg-actuators.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-27 at 11.07.33 AM.jpeg',
    orientation: 'portrait',
    description:
      'High-precision bench inspection of the synchronized dual bipedal leg transmission stack. Features paired DSSERVO RDS3218 20kg high-torque digital servos and ROBOKITS RKI-1206 dual-shaft metal units housed inside CNC aluminum U-brackets with dual ball bearings.',
    specs: [
      { label: 'Motor Units:', val: 'DSSERVO 20Kg & ROBOKITS RKI' },
      { label: 'Joints:', val: 'CNC Dual-Bearing U-Channels' },
      { label: 'Wiring:', val: 'Direct High-Current Signal Harness' },
      { label: 'Articulation:', val: 'Multi-DOF Knee & Ankle Pivot' },
    ],
  },
  {
    id: 'work-03',
    title: 'Articulated Dual Arm Kinematics & Chassis Bench',
    category: 'KINEMATICS',
    categoryLabel: 'Mechanical Assembly',
    tag: 'ARM KINEMATICS // LOG-03',
    date: 'OCTOBER 2026',
    image: '/images/work/arm-assembly.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-25 at 6.45.11 PM.jpeg',
    orientation: 'landscape',
    description:
      'Precision top-down workbench alignment of dual articulated robotic limbs on the main box torso frame, featuring aircraft-grade aluminum linkages, digital servo actuators, internal harness routing, and custom 3D biomorphic end-effectors.',
    specs: [
      { label: 'Actuation:', val: 'High-Torque Metal Gear Servos' },
      { label: 'Linkages:', val: 'CNC Aluminum Dual Brackets' },
      { label: 'Grippers:', val: 'Biomorphic 3D Printed Claws' },
      { label: 'Stage:', val: 'Benchtop Axis Calibration' },
    ],
  },
  {
    id: 'work-04',
    title: 'Bimanual Gripper Clearance & Coordinated Clasp Test',
    category: 'KINEMATICS',
    categoryLabel: 'Kinematics & Grippers',
    tag: 'END-EFFECTORS // LOG-04',
    date: 'OCTOBER 2026',
    image: '/images/work/gripper-testing.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-25 at 6.45.14 PM.jpeg',
    orientation: 'landscape',
    description:
      'Symmetrical bimanual end-effector clearance and closure testing on the core torso frame, validating coordinated dual-arm clamping, angular collision avoidance, and compliant load-bearing grasp.',
    specs: [
      { label: 'Configuration:', val: 'Bimanual Symmetrical Clasp' },
      { label: 'Chassis:', val: 'Rigid Box-Section Core Frame' },
      { label: 'End-Effectors:', val: 'Dual Compliant Grippers' },
      { label: 'Testing:', val: 'Zero-Collision Clearance Check' },
    ],
  },
  {
    id: 'work-05',
    title: 'Live Telemetry GUI & Active Joint Tuning',
    category: 'SYSTEMS',
    categoryLabel: 'Telemetry & Controls',
    tag: 'REALTIME GUI // LOG-05',
    date: 'OCTOBER 2026',
    image: '/images/work/telemetry-bench-testing.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-27 at 11.07.34 AM.jpeg',
    orientation: 'landscape',
    description:
      'Live laboratory calibration session connecting the suspended humanoid torso rig to real-time laptop telemetry software. Shows multi-channel angular sliders commanding live digital servo positions through breadboard microcontroller logic.',
    specs: [
      { label: 'Software:', val: 'Custom Angular Telemetry Dashboard' },
      { label: 'Control:', val: 'Microcontroller Bus & Signal Leads' },
      { label: 'Environment:', val: 'Humorphic Lab Hardware Bay' },
      { label: 'Calibration:', val: 'Dynamic Multi-Axis Response' },
    ],
  },
  {
    id: 'work-06',
    title: 'Full Platform Integration & Stand Mount',
    category: 'SYSTEMS',
    categoryLabel: 'Lab Rig Integration',
    tag: 'SYSTEMS BENCH // LOG-06',
    date: 'OCTOBER 2026',
    image: '/images/work/lab-integration.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-25 at 6.47.22 PM.jpeg / 2026-10-27 at 11.07.36 AM.jpeg',
    orientation: 'landscape',
    description:
      'Full physical rig integration on the lab test stand under the Humorphic Lab technical blueprints, wiring the main logic harness, motor signal leads, dual gantry suspension, and real-time power distribution boards.',
    specs: [
      { label: 'Mounting:', val: 'Vertical Dual-Gantry Test Rig' },
      { label: 'Electronics:', val: 'Embedded Control & Driver Matrix' },
      { label: 'Wiring:', val: 'Direct Multi-Axis Signal Harness' },
      { label: 'Facility:', val: 'Humorphic Lab Robotics Bay' },
    ],
  },
];
