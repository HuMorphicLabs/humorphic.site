import {
  AnatomySubsystem,
  ChallengeCaseStudy,
  TimelineMilestone,
  TelemetryStat,
  TechItem,
  TeamMember,
} from '@/types/robotics.types';

export const SITE_CONFIG = {
  name: 'HUMORPHIC LAB',
  subtitle: 'AUTONOMOUS ROBOTICS & CYBERNETICS',
  description: 'Autonomous robotics research space transforming mathematical ideas into sentient physical actuators through biomorphic kinematics and deep perception engines.',
  version: 'v5.04.1',
  coords: '37.7749° N, 122.4194° W',
  tier: 'LAB-3 CYBERNETICS BAY',
  status: 'SYS::ACTV',
};

export const ANATOMY_SUBSYSTEMS: Record<string, AnatomySubsystem> = {
  head: {
    id: 'head',
    code: 'ANAT-01 :: VISION & PERCEPTION',
    status: '[ACTIVE]',
    title: 'HEAD & VISION SENSOR BAY',
    desc: 'Integrates dual 4K stereo depth cameras, spatial LiDAR sensor array, 6-microphone directional beam, and primary perception co-processors.',
    specs: [
      { key: 'Perception:', val: '4K Stereo Depth Matrix' },
      { key: 'LiDAR Mesh:', val: '360° Real-time Point-Cloud' },
      { key: 'Audio Array:', val: '6-Mic Directional Beam' },
      { key: 'Cooling:', val: 'Convective Forced Air' },
    ],
    targetCoords: [0, 1.6, 0],
  },
  torso: {
    id: 'torso',
    code: 'ANAT-02 :: CORE COMPUTER & IMU',
    status: '[OPERATIONAL]',
    title: 'TORSO & CORE COMPUTING HUB',
    desc: 'Houses dual 12.8 TFLOPS neural processing units, 9-axis spatial IMU balance sensor, and main CAN-FD real-time system router.',
    specs: [
      { key: 'NPU Compute:', val: 'Dual Tensor Core NPU' },
      { key: 'IMU Sensing:', val: '9-Axis Gyro/Accelerometer' },
      { key: 'Bus Routing:', val: '8 Mbps CAN-FD Interface' },
      { key: 'Chassis:', val: 'Carbon Composite Frame' },
    ],
    targetCoords: [0, 1.1, 0],
  },
  arms: {
    id: 'arms',
    code: 'ANAT-03 :: MANIPULATION SYSTEM',
    status: '[CALIBRATED]',
    title: '7-DOF DUAL ARTICULATED ARMS',
    desc: 'Twin 7-DOF dual kinematic manipulators engineered with zero-backlash harmonic drives for high-payload dynamic lifting.',
    specs: [
      { key: 'Kinematics:', val: '7-DOF Articulated Joint' },
      { key: 'Max Payload:', val: '12 kg Per Arm' },
      { key: 'Reducers:', val: 'Harmonic Strain Wave' },
      { key: 'Precision:', val: '± 0.05 mm Repeatability' },
    ],
    targetCoords: [0.6, 1.0, 0],
  },
  hands: {
    id: 'hands',
    code: 'ANAT-04 :: TACTILE BIO-GRIPPERS',
    status: '[ONLINE]',
    title: '5-FINGER BIO-MIMETIC HANDS',
    desc: 'Under-actuated bio-mimetic hands featuring fingertip tactile pressure matrices and variable-impedance compliant grip.',
    specs: [
      { key: 'Fingers:', val: '5 Fully Articulated Digits' },
      { key: 'Tactile Sensors:', val: '16 Pressure Nodes' },
      { key: 'Grip Force:', val: 'Soft Compliant Touch' },
      { key: 'Feedback:', val: 'Micro-Force Sensing' },
    ],
    targetCoords: [0.8, 0.6, 0.2],
  },
  waist: {
    id: 'waist',
    code: 'ANAT-05 :: TORQUE & YAW ACTUATOR',
    status: '[ACTIVE]',
    title: 'WAIST PITCH & YAW JOINT',
    desc: 'High-torque dual harmonic drive waist joint providing torso pitch and yaw rotation for core stabilization.',
    specs: [
      { key: 'Peak Torque:', val: '180 Nm Harmonic Drive' },
      { key: 'Yaw Range:', val: '± 90° Torso Rotation' },
      { key: 'Encoders:', val: '18-Bit Absolute Optical' },
      { key: 'Equilibrium:', val: 'Zero-Moment-Point Loop' },
    ],
    targetCoords: [0, 0.75, 0],
  },
  legs: {
    id: 'legs',
    code: 'ANAT-06 :: BIPEDAL STRIDE SYSTEM',
    status: '[NOMINAL]',
    title: '6-DOF BIPEDAL LEG MECHANISM',
    desc: 'High-power planetary gear leg linkage capable of absorbing severe ground impact during dynamic running and jumping.',
    specs: [
      { key: 'Leg DOF:', val: '6 Degrees of Freedom' },
      { key: 'Peak Torque:', val: '320 Nm Hip/Knee Actuators' },
      { key: 'Top Speed:', val: '4.8 m/s Bipedal Stride' },
      { key: 'Shock Absorb:', val: 'Series Elastic Dampeners' },
    ],
    targetCoords: [0.3, 0.35, 0],
  },
  feet: {
    id: 'feet',
    code: 'ANAT-07 :: GROUND FORCE MATRIX',
    status: '[CALIBRATED]',
    title: '6-AXIS FOOT LOAD CELL ARRAY',
    desc: 'Ankle and sole multi-axis force/torque load cells capturing ground reaction vectors at 2,000 Hz for instant balance tuning.',
    specs: [
      { key: 'Load Sensing:', val: '6-Axis Ankle Load Cell' },
      { key: 'Sampling:', val: '2,000 Hz Force Vector' },
      { key: 'Traction:', val: 'High-Friction Tread' },
      { key: 'Flex Joint:', val: 'Ankle Pitch & Roll' },
    ],
    targetCoords: [0.3, -0.2, 0.1],
  },
  motors: {
    id: 'motors',
    code: 'ANAT-08 :: BRUSHLESS ACTUATORS',
    status: '[READY]',
    title: 'FRAMELESS BRUSHLESS SERVOS',
    desc: 'Custom-wound high torque-density frameless BLDC motors paired with zero-backlash strain wave gearboxes.',
    specs: [
      { key: 'Efficiency:', val: '98% Peak Energy Yield' },
      { key: 'Backlash:', val: '< 1 Arc-Minute Play' },
      { key: 'Thermal:', val: 'Integrated Thermistors' },
      { key: 'Drive Voltage:', val: '48V DC Power Bus' },
    ],
    targetCoords: [-0.4, 1.2, 0],
  },
  battery: {
    id: 'battery',
    code: 'ANAT-09 :: SMART POWER SYSTEM',
    status: '[CHARGED]',
    title: '700Wh LI-ION POWER BUS',
    desc: 'High-density 700Wh Li-Ion battery pack with active cell balancing, temperature monitoring, and 48V DC power rail.',
    specs: [
      { key: 'Capacity:', val: '700 Wh Smart Pack' },
      { key: 'Runtime:', val: '3.5 Hours Active Stride' },
      { key: 'Voltage Rail:', val: '48V High-Current Bus' },
      { key: 'Protection:', val: 'Active Thermal BMS' },
    ],
    targetCoords: [0, 0.95, -0.2],
  },
};

export const CHALLENGES_LIST: ChallengeCaseStudy[] = [
  {
    id: 'motor-alignment',
    caseId: 'CASE STUDY // LOG-01',
    title: 'Motor Alignment & Gear Backlash',
    desc: 'Achieving ultra-precise mechanical alignment of high-torque brushless motors with zero gear backlash across 32 joint axes.',
    why: 'Microscopic angular misalignments create mechanical resonance, rapid gear tooth wear, thermal spikes, and trajectory jitter.',
    solution: 'We engineer custom optical magnetic encoders with 18-bit resolution and CNC-machined zero-backlash harmonic gear housing inserts.',
  },
  {
    id: 'mechanical-design',
    caseId: 'CASE STUDY // LOG-02',
    title: 'Structural Mass & Inertia Optimization',
    desc: 'Maximizing structural chassis stiffness while minimizing limb weight to reduce rotational inertia during fast movement.',
    why: 'Heavier limbs demand exponentially higher actuator torque, leading to thermal overload, higher battery draw, and clumsy walking.',
    solution: 'We utilize topology-optimized carbon fiber composite frames and hollow titanium shafts to reduce joint mass by 42%.',
  },
  {
    id: 'balance',
    caseId: 'CASE STUDY // LOG-03',
    title: 'Dynamic Bipedal Equilibrium Control',
    desc: 'Maintaining upright stability under sudden push disturbances, uneven ground, and friction changes.',
    why: 'Bipedal walking is inherently unstable; double-support and single-support phases shift the center of mass rapidly.',
    solution: 'We implement Whole-Body Control (WBC) combined with Model Predictive Control (MPC) operating at 1,000 Hz feedback loops.',
  },
  {
    id: 'power',
    caseId: 'CASE STUDY // LOG-04',
    title: 'High-Current Thermal & Power Rail',
    desc: 'Delivering up to 80A peak current to 32 joint actuators without voltage sag or overheating internal electronic drivers.',
    why: 'High current bursts generate massive resistive heat inside compact limb housings during rapid acceleration.',
    solution: 'We designed a 48V direct-DC power bus paired with phase-change heat dissipation plates and active thermal throttle protection.',
  },
  {
    id: 'servo',
    caseId: 'CASE STUDY // LOG-05',
    title: 'Multi-Axis Joint Zero Calibration',
    desc: 'Calibrating absolute zero-position across 32 independent joint axes simultaneously upon system boot.',
    why: 'Mechanical tolerances and thermal expansion cause slight zero-point drift over continuous operating hours.',
    solution: 'Automated boot-up self-calibration protocol using optical index marks and soft-contact torque sensing.',
  },
  {
    id: 'software-hardware',
    caseId: 'CASE STUDY // LOG-06',
    title: 'Real-Time Hardware-in-the-Loop Sync',
    desc: 'Interfacing high-level AI vision transformers with low-level microsecond motor control loops.',
    why: 'Communication latencies over 5ms between vision co-processors and motor drivers cause erratic oscillatory motion.',
    solution: 'Embedded CAN-FD real-time bus running custom micro-kernel RTOS drivers with strict deterministic scheduling.',
  },
  {
    id: 'ai-control',
    caseId: 'CASE STUDY // LOG-07',
    title: 'Generalizable Terrain Adaptation AI',
    desc: 'Training neural networks to walk on unmapped stairs, loose gravel, and wet surfaces seamlessly.',
    why: 'Pure simulation models struggle with real-world friction variations and unpredictable surface dynamics.',
    solution: 'Sim-to-Real domain randomization training with real-time tactile force feedback fine-tuning on the physical robot.',
  },
  {
    id: 'movement',
    caseId: 'CASE STUDY // LOG-08',
    title: 'Safe Human-Robot Physical Coexistence',
    desc: 'Ensuring the robot poses no collision threat during direct human interaction or shared workspace operations.',
    why: 'Traditional industrial robots are rigid and dangerous if contact occurs without soft energy absorption.',
    solution: 'Variable elastic joints and instant torque limitation safety cut-offs trigger soft impedance within 2ms of touch.',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  { step: 1, phase: 'PHASE 01 // FOUNDATIONS', title: 'Concept & Research', desc: 'Formulated biomorphic movement equations, kinematic balance physics, and core system specifications for our 32-DOF humanoid platform.' },
  { step: 2, phase: 'PHASE 02 // CAD MODELING', title: 'CAD & Designing', desc: 'Engineered full 3D parametric CAD models in SolidWorks, completing FEA structural stress and mass moment of inertia analyses on all joints.' },
  { step: 3, phase: 'PHASE 03 // FABRICATION', title: 'Parts Manufacturing', desc: 'Precision CNC machined aircraft-grade 7075 aluminum joints, molded carbon fiber shells, and custom multilayer power distribution PCBs.' },
  { step: 4, phase: 'PHASE 04 // STRUCTURAL BUILD', title: 'Mechanical Assembly', desc: 'Built out the physical 32-DOF articulated skeleton, integrating harmonic strain wave gearboxes, bearings, and internal wiring channels.' },
  { step: 5, phase: 'PHASE 05 // CALIBRATION', title: 'Motor Alignment', desc: 'Aligned 18-bit absolute optical magnetic encoders across all joint axes, performing zero-offset indexing and thermal torque testing.' },
  { step: 6, phase: 'PHASE 06 // CYBERNETICS', title: 'Electronics Integration', desc: 'Wired 8Mbps CAN-FD real-time control bus network, connected 700Wh smart Li-Ion battery pack, and flashed RTOS micro-kernel motor drivers.' },
  { step: 7, phase: 'PHASE 07 // INTELLIGENCE', title: 'Software & Control', desc: 'Deployed Whole-Body Control (WBC) balance loops at 1,000 Hz, stereo depth point-cloud transformers, and real-time path planners.' },
  { step: 8, phase: 'PHASE 08 // VALIDATION', title: 'Testing & Improvements', desc: 'Conducted 3,200+ empirical walking trials, terrain disturbance recovery tests, dynamic push recovery, and continuous optimization.' },
];

export const TELEMETRY_STATS: TelemetryStat[] = [
  { label: 'Components Built', sub: 'Custom machined & 3D printed parts', target: 450, suffix: '+', iconName: 'Box' },
  { label: 'Motors & Actuators', sub: 'High-torque harmonic brushless servos', target: 32, suffix: ' DOF', iconName: 'Cpu' },
  { label: 'Development Hours', sub: 'R&D, simulation & empirical testing', target: 12500, suffix: '+ hrs', iconName: 'Clock' },
  { label: 'Prototype Version', sub: 'Latest active revision architecture', textVal: 'v5.04', iconName: 'Layers' },
  { label: 'Team Members', sub: 'Roboticists, AI researchers & engineers', target: 18, suffix: ' Eng', iconName: 'Users' },
  { label: 'Tests Completed', sub: 'Kinematic, balance & terrain runs', target: 3200, suffix: '+', iconName: 'Activity' },
];

export const TECH_STACK: TechItem[] = [
  { name: 'Arduino', desc: 'Low-level sensor reading, analog signal conditioning, and localized actuator prototyping.', pill: 'MICROCONTROLLER', iconName: 'Cpu' },
  { name: 'ESP32', desc: 'High-speed dual-core wireless telemetry micro-nodes and low-latency Wi-Fi / BLE communication.', pill: 'WIRELESS NODE', iconName: 'Wifi' },
  { name: 'Raspberry Pi', desc: 'Secondary Linux co-processor handling system diagnostics, logging, and edge network routing.', pill: 'EDGE COMPUTING', iconName: 'HardDrive' },
  { name: 'C / C++', desc: 'Real-time control loops, CAN-FD protocol drivers, and microsecond deterministic motor execution.', pill: 'LOW-LEVEL FIRMWARE', iconName: 'Code' },
  { name: 'Python', desc: 'Neural network training, point-cloud vision model inference, and data telemetry analytics.', pill: 'AI & DATA ENGINE', iconName: 'Terminal' },
  { name: 'CAD / 3D Design', desc: 'Parametric chassis design, carbon fiber layout, and joint stress simulation in SolidWorks.', pill: '3D ENGINEERING', iconName: 'Box' },
  { name: 'Servo Motors', desc: 'Harmonic strain wave brushless servos with 18-bit magnetic encoders for high torque density.', pill: 'HARMONIC ACTUATION', iconName: 'Zap' },
  { name: 'AI / Computer Vision', desc: 'Spatial 3D point-cloud transformers, obstacle segmenters, and visual odometry algorithms.', pill: 'PERCEPTION AI', iconName: 'Eye' },
];

export * from './teamData';

import {
  CLUB_LEADERSHIP,
  TEAMS_DATA,
  MEMBERSHIP_DIRECTORY,
  TOTAL_UNIQUE_MEMBERS,
} from './teamData';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: CLUB_LEADERSHIP.hod.name,
    role: CLUB_LEADERSHIP.hod.roleTitle,
    bio: CLUB_LEADERSHIP.hod.responsibilities.join(' '),
    initials: 'RP',
  },
  {
    name: CLUB_LEADERSHIP.clubLead.name,
    role: CLUB_LEADERSHIP.clubLead.roleTitle,
    bio: CLUB_LEADERSHIP.clubLead.responsibilities.join(' '),
    initials: 'AT',
  },
  {
    name: 'Juned Khan',
    role: 'Team Lead - Stimulation & Virtual Testing',
    bio: 'Robot simulation, virtual testing, motor movement validation, and troubleshooting technical issues.',
    initials: 'JK',
  },
  {
    name: 'Sachin Vishwakarma',
    role: 'Team Lead - Artificial Intelligence (AI)',
    bio: 'AI research, intelligent behavior exploration, software development, and robotics AI integration.',
    initials: 'SV',
  },
  {
    name: 'Vanshika Vishwakarma',
    role: 'Team Lead - Web Development',
    bio: 'Designing and developing the Humorphic Lab website, responsive layouts, animations, and project updates.',
    initials: 'VV',
  },
];
