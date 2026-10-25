export interface WorkPhoto {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  tag: string;
  date: string;
  image: string;
  originalFileName: string;
  description: string;
  specs: { label: string; val: string }[];
}

/**
 * =========================================================================
 * HUMORPHIC LAB - "OUR WORK" AUTHENTIC PHOTO GALLERY REGISTRY
 * =========================================================================
 * 
 * HOW TO ADD MORE PHOTOS IN THE FUTURE:
 * 1. Place your new photo file in `frontend/public/images/work/`
 * 2. Add an entry to the `OUR_WORK_PHOTOS` array below with its path and details.
 * 3. The gallery will automatically render the new photo with full lightbox
 *    inspection and responsive layout!
 * =========================================================================
 */
export const OUR_WORK_PHOTOS: WorkPhoto[] = [
  {
    id: 'work-01',
    title: 'Articulated Dual Arm Kinematics & Chassis Bench',
    category: 'ASSEMBLY',
    categoryLabel: 'Mechanical Assembly',
    tag: 'HARDWARE RIG // LOG-01',
    date: 'OCTOBER 2026',
    image: '/images/work/arm-assembly.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-25 at 6.45.11 PM.jpeg',
    description:
      'Top-down precision bench alignment of dual articulated robotic limbs featuring aircraft-grade aluminum linkages, high-torque digital servo actuators, internal harness routing, and custom 3D biomorphic end-effectors.',
    specs: [
      { label: 'Actuation:', val: 'High-Torque Metal Gear Servos' },
      { label: 'Linkages:', val: 'CNC Aluminum Dual Brackets' },
      { label: 'Grippers:', val: 'Biomorphic 3D Printed Claws' },
      { label: 'Stage:', val: 'Benchtop Axis Calibration' },
    ],
  },
  {
    id: 'work-02',
    title: 'Bimanual Gripper & Central Chassis Test',
    category: 'GRIPPERS',
    categoryLabel: 'Kinematics & Grippers',
    tag: 'CHASSIS TEST // LOG-02',
    date: 'OCTOBER 2026',
    image: '/images/work/gripper-testing.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-25 at 6.45.14 PM.jpeg',
    description:
      'Symmetrical bimanual end-effector clearance and closure testing on the core torso frame, validating coordinated dual-arm clamping and structural load integrity.',
    specs: [
      { label: 'Configuration:', val: 'Bimanual Symmetrical Clasp' },
      { label: 'Chassis:', val: 'Rigid Box-Section Core Frame' },
      { label: 'End-Effectors:', val: 'Dual Compliant Grippers' },
      { label: 'Testing:', val: 'Zero-Collision Clearance Check' },
    ],
  },
  {
    id: 'work-03',
    title: 'Full Platform Integration & Stand Mount',
    category: 'INTEGRATION',
    categoryLabel: 'Lab Integration',
    tag: 'SYSTEMS BENCH // LOG-03',
    date: 'OCTOBER 2026',
    image: '/images/work/lab-integration.jpeg',
    originalFileName: 'WhatsApp Image 2026-10-25 at 6.47.22 PM.jpeg',
    description:
      'Full physical rig integration on the lab test stand under the Humorphic Lab technical blueprints, wiring the main logic harness, motor signal leads, and real-time power distribution boards.',
    specs: [
      { label: 'Mounting:', val: 'Vertical Dual-Gantry Test Rig' },
      { label: 'Electronics:', val: 'Embedded Control & Driver Matrix' },
      { label: 'Wiring:', val: 'Direct Multi-Axis Signal Harness' },
      { label: 'Facility:', val: 'Humorphic Lab Robotics Bay' },
    ],
  },
];
