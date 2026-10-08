// ----------------------------------------------------
// HUMORPHIC LAB - CORE ROBOTICS ENGINE & INTERACTION
// ----------------------------------------------------

// Configuration
const FRAME_COUNT = 300;
const FRAME_PATH_PREFIX = 'robo photo 2/extracted/ezgif-frame-';
const FRAME_EXT = '.jpg';

// Main Elements
const canvas = document.getElementById('robotCanvas');
const ctx = canvas.getContext('2d', { alpha: false });
const loader = document.getElementById('loader');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const bgFxCanvas = document.getElementById('bgFxCanvas');
const bgCtx = bgFxCanvas ? bgFxCanvas.getContext('2d') : null;

// State
const images = new Array(FRAME_COUNT);
let loadedCount = 0;
let currentFrame = 0;
let targetFrame = 0;
let isReady = false;
let animationFrameId = null;
let lastRenderedIndex = -1;

// ----------------------------------------------------
// ANATOMY HUD DATA MAP (9 COMPONENTS)
// ----------------------------------------------------
const ANATOMY_DATA = {
  head: {
    code: 'ANAT-01 :: VISION & PERCEPTION',
    status: '[ACTIVE]',
    title: 'HEAD & VISION SENSOR BAY',
    desc: 'Integrates dual 4K stereo depth cameras, spatial LiDAR sensor array, 6-microphone array, and primary perception co-processors.',
    specs: [
      { key: 'Perception:', val: '4K Stereo Depth Matrix' },
      { key: 'LiDAR Mesh:', val: '360° Real-time Point-Cloud' },
      { key: 'Audio Array:', val: '6-Mic Directional Beam' },
      { key: 'Cooling:', val: 'Convective Forced Air' }
    ]
  },
  torso: {
    code: 'ANAT-02 :: CORE COMPUTER & IMU',
    status: '[OPERATIONAL]',
    title: 'TORSO & CORE COMPUTING HUB',
    desc: 'Houses dual 12.8 TFLOPS neural processing units, 9-axis spatial IMU balance sensor, and main CAN-FD real-time system router.',
    specs: [
      { key: 'NPU Compute:', val: 'Dual Tensor Core NPU' },
      { key: 'IMU Sensing:', val: '9-Axis Gyro/Accelerometer' },
      { key: 'Bus Routing:', val: '8 Mbps CAN-FD Interface' },
      { key: 'Chassis:', val: 'Carbon Composite Frame' }
    ]
  },
  arms: {
    code: 'ANAT-03 :: MANIPULATION SYSTEM',
    status: '[CALIBRATED]',
    title: '7-DOF DUAL ARTICULATED ARMS',
    desc: 'Twin 7-DOF dual kinematic manipulators engineered with zero-backlash harmonic drives for high-payload dynamic lifting.',
    specs: [
      { key: 'Kinematics:', val: '7-DOF Articulated Joint' },
      { key: 'Max Payload:', val: '12 kg Per Arm' },
      { key: 'Reducers:', val: 'Harmonic Strain Wave' },
      { key: 'Precision:', val: '± 0.05 mm Repeatability' }
    ]
  },
  hands: {
    code: 'ANAT-04 :: TACTILE BIO-GRIPPERS',
    status: '[ONLINE]',
    title: '5-FINGER BIO-MIMETIC HANDS',
    desc: 'Under-actuated bio-mimetic hands featuring fingertip tactile pressure matrices and variable-impedance compliant grip.',
    specs: [
      { key: 'Fingers:', val: '5 Fully Articulated Digits' },
      { key: 'Tactile Sensors:', val: '16 Pressure Nodes' },
      { key: 'Grip Force:', val: 'Soft Compliant Touch' },
      { key: 'Feedback:', val: 'Micro-Force Sensing' }
    ]
  },
  waist: {
    code: 'ANAT-05 :: TORQUE & YAW ACTUATOR',
    status: '[ACTIVE]',
    title: 'WAIST PITCH & YAW JOINT',
    desc: 'High-torque dual harmonic drive waist joint providing torso pitch and yaw rotation for core stabilization.',
    specs: [
      { key: 'Peak Torque:', val: '180 Nm Harmonic Drive' },
      { key: 'Yaw Range:', val: '± 90° Torso Rotation' },
      { key: 'Encoders:', val: '18-Bit Absolute Optical' },
      { key: 'Equilibrium:', val: 'Zero-Moment-Point Loop' }
    ]
  },
  legs: {
    code: 'ANAT-06 :: BIPEDAL STRIDE SYSTEM',
    status: '[NOMINAL]',
    title: '6-DOF BIPEDAL LEG MECHANISM',
    desc: 'High-power planetary gear leg linkage capable of absorbing severe ground impact during dynamic running and jumping.',
    specs: [
      { key: 'Leg DOF:', val: '6 Degrees of Freedom' },
      { key: 'Peak Torque:', val: '320 Nm Hip/Knee Actuators' },
      { key: 'Top Speed:', val: '4.8 m/s Bipedal Stride' },
      { key: 'Shock Absorb:', val: 'Series Elastic Dampeners' }
    ]
  },
  feet: {
    code: 'ANAT-07 :: GROUND FORCE MATRIX',
    status: '[CALIBRATED]',
    title: '6-AXIS FOOT LOAD CELL ARRAY',
    desc: 'Ankle and sole multi-axis force/torque load cells capturing ground reaction vectors at 2,000 Hz for instant balance tuning.',
    specs: [
      { key: 'Load Sensing:', val: '6-Axis Ankle Load Cell' },
      { key: 'Sampling:', val: '2,000 Hz Force Vector' },
      { key: 'Traction:', val: 'High-Friction Tread' },
      { key: 'Flex Joint:', val: 'Ankle Pitch & Roll' }
    ]
  },
  motors: {
    code: 'ANAT-08 :: BRUSHLESS ACTUATORS',
    status: '[READY]',
    title: 'FRAMELESS BRUSHLESS SERVOS',
    desc: 'Custom-wound high torque-density frameless BLDC motors paired with zero-backlash strain wave gearboxes.',
    specs: [
      { key: 'Efficiency:', val: '98% Peak Energy Yield' },
      { key: 'Backlash:', val: '&lt; 1 Arc-Minute Play' },
      { key: 'Thermal:', val: 'Integrated Thermistors' },
      { key: 'Drive Voltage:', val: '48V DC Power Bus' }
    ]
  },
  battery: {
    code: 'ANAT-09 :: SMART POWER SYSTEM',
    status: '[CHARGED]',
    title: '700Wh LI-ION POWER BUS',
    desc: 'High-density 700Wh Li-Ion battery pack with active cell balancing, temperature monitoring, and 48V DC power rail.',
    specs: [
      { key: 'Capacity:', val: '700 Wh Smart Pack' },
      { key: 'Runtime:', val: '3.5 Hours Active Stride' },
      { key: 'Voltage Rail:', val: '48V High-Current Bus' },
      { key: 'Protection:', val: 'Active Thermal BMS' }
    ]
  }
};

// ----------------------------------------------------
// CHALLENGES CASE STUDY DATA MAP (8 TABS)
// ----------------------------------------------------
const CHALLENGES_DATA = {
  'motor-alignment': {
    caseId: 'CASE STUDY // LOG-01',
    title: 'Motor Alignment & Gear Backlash',
    desc: 'Achieving ultra-precise mechanical alignment of high-torque brushless motors with zero gear backlash across 32 joint axes.',
    why: 'Microscopic angular misalignments create mechanical resonance, rapid gear tooth wear, thermal spikes, and trajectory jitter.',
    solution: 'We engineer custom optical magnetic encoders with 18-bit resolution and CNC-machined zero-backlash harmonic gear housing inserts.'
  },
  'mechanical-design': {
    caseId: 'CASE STUDY // LOG-02',
    title: 'Structural Mass & Inertia Optimization',
    desc: 'Maximizing structural chassis stiffness while minimizing limb weight to reduce rotational inertia during fast movement.',
    why: 'Heavier limbs demand exponentially higher actuator torque, leading to thermal overload, higher battery draw, and clumsy walking.',
    solution: 'We utilize topology-optimized carbon fiber composite frames and hollow titanium shafts to reduce joint mass by 42%.'
  },
  'balance': {
    caseId: 'CASE STUDY // LOG-03',
    title: 'Dynamic Bipedal Equilibrium Control',
    desc: 'Maintaining upright stability under sudden push disturbances, uneven ground, and friction changes.',
    why: 'Bipedal walking is inherently unstable; double-support and single-support phases shift the center of mass rapidly.',
    solution: 'We implement Whole-Body Control (WBC) combined with Model Predictive Control (MPC) operating at 1,000 Hz feedback loops.'
  },
  'power': {
    caseId: 'CASE STUDY // LOG-04',
    title: 'High-Current Thermal & Power Rail',
    desc: 'Delivering up to 80A peak current to 32 joint actuators without voltage sag or overheating internal electronic drivers.',
    why: 'High current bursts generate massive resistive heat inside compact limb housings during rapid acceleration.',
    solution: 'We designed a 48V direct-DC power bus paired with phase-change heat dissipation plates and active thermal throttle protection.'
  },
  'servo': {
    caseId: 'CASE STUDY // LOG-05',
    title: 'Multi-Axis Joint Zero Calibration',
    desc: 'Calibrating absolute zero-position across 32 independent joint axes simultaneously upon system boot.',
    why: 'Mechanical tolerances and thermal expansion cause slight zero-point drift over continuous operating hours.',
    solution: 'Automated boot-up self-calibration protocol using optical index marks and soft-contact torque sensing.'
  },
  'software-hardware': {
    caseId: 'CASE STUDY // LOG-06',
    title: 'Real-Time Hardware-in-the-Loop Sync',
    desc: 'Interfacing high-level AI vision transformers with low-level microsecond motor control loops.',
    why: 'Communication latencies over 5ms between vision co-processors and motor drivers cause erratic oscillatory motion.',
    solution: 'Embedded CAN-FD real-time bus running custom micro-kernel RTOS drivers with strict deterministic scheduling.'
  },
  'ai-control': {
    caseId: 'CASE STUDY // LOG-07',
    title: 'Generalizable Terrain Adaptation AI',
    desc: 'Training neural networks to walk on unmapped stairs, loose gravel, and wet surfaces seamlessly.',
    why: 'Pure simulation models struggle with real-world friction variations and unpredictable surface dynamics.',
    solution: 'Sim-to-Real domain randomization training with real-time tactile force feedback fine-tuning on the physical robot.'
  },
  'movement': {
    caseId: 'CASE STUDY // LOG-08',
    title: 'Safe Human-Robot Physical Coexistence',
    desc: 'Ensuring the robot poses no collision threat during direct human interaction or shared workspace operations.',
    why: 'Traditional industrial robots are rigid and dangerous if contact occurs without soft energy absorption.',
    solution: 'Variable elastic joints and instant torque limitation safety cut-offs trigger soft impedance within 2ms of touch.'
  }
};

// Helper to format frame numbers (001, 002, ..., 300)
function getFrameUrl(index) {
  const paddedNumber = String(index + 1).padStart(3, '0');
  return encodeURI(`${FRAME_PATH_PREFIX}${paddedNumber}${FRAME_EXT}`);
}

// Auto-sample studio backdrop color from frame 1 for seamless edge blending
function sampleStudioColor(img) {
  try {
    const offscreen = document.createElement('canvas');
    offscreen.width = 16;
    offscreen.height = 16;
    const offCtx = offscreen.getContext('2d');
    offCtx.drawImage(img, 0, 0, 16, 16);
    const pixel = offCtx.getImageData(2, 2, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    document.body.style.backgroundColor = color;
    canvas.style.backgroundColor = color;
  } catch (e) {
    console.warn('Could not sample edge color:', e);
  }
}

// Canvas resize handling
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;

  const neededWidth = Math.round(displayWidth * dpr);
  const neededHeight = Math.round(displayHeight * dpr);

  if (canvas.width !== neededWidth || canvas.height !== neededHeight) {
    canvas.width = neededWidth;
    canvas.height = neededHeight;
  }

  if (bgFxCanvas) {
    bgFxCanvas.width = displayWidth;
    bgFxCanvas.height = displayHeight;
  }

  lastRenderedIndex = -1;
  renderFrame(Math.round(currentFrame));
}

// Render a specific frame index with aspect containment
function renderFrame(index) {
  const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
  const img = images[clampedIndex];

  if (!img || !img.complete || img.naturalWidth === 0) {
    return;
  }

  if (clampedIndex === lastRenderedIndex && ctx) {
    return;
  }
  lastRenderedIndex = clampedIndex;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  ctx.fillStyle = document.body.style.backgroundColor || '#92a7bc';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth, drawHeight, offsetX, offsetY;

  if (canvasRatio > imgRatio) {
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  } else {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// Background Particle FX Animation
const particles = Array.from({ length: 35 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: Math.random() * 2 + 1,
  speedX: (Math.random() - 0.5) * 0.4,
  speedY: (Math.random() - 0.5) * 0.4,
  opacity: Math.random() * 0.5 + 0.2
}));

function animateBackgroundFx() {
  if (!bgCtx || !bgFxCanvas) return;

  bgCtx.clearRect(0, 0, bgFxCanvas.width, bgFxCanvas.height);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = bgFxCanvas.width;
    if (p.x > bgFxCanvas.width) p.x = 0;
    if (p.y < 0) p.y = bgFxCanvas.height;
    if (p.y > bgFxCanvas.height) p.y = 0;

    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(247, 200, 115, ${p.opacity})`;
    bgCtx.fill();
  });

  requestAnimationFrame(animateBackgroundFx);
}

// Smooth continuous physics interpolation loop (LERP)
function animationLoop() {
  const delta = targetFrame - currentFrame;
  const lerpFactor = 0.085;

  if (Math.abs(delta) > 0.005) {
    currentFrame += delta * lerpFactor;
    renderFrame(Math.round(currentFrame));
  } else if (currentFrame !== targetFrame) {
    currentFrame = targetFrame;
    renderFrame(Math.round(currentFrame));
  }

  animationFrameId = requestAnimationFrame(animationLoop);
}

// Update target frame from window scroll position
function updateScrollTarget() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) {
    targetFrame = 0;
    return;
  }
  const scrollFraction = Math.max(0, Math.min(1, window.scrollY / maxScroll));
  targetFrame = scrollFraction * (FRAME_COUNT - 1);

  // Update timeline progress bar height if present
  updateTimelineProgress();
}

// Timeline progress height calculator
function updateTimelineProgress() {
  const timelineSection = document.getElementById('journeySection');
  const progressBar = document.getElementById('timelineProgress');

  if (timelineSection && progressBar) {
    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalHeight = rect.height;

    let progress = (windowHeight - rect.top) / (totalHeight + windowHeight * 0.5);
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.height = `${progress * 100}%`;
  }
}

// ----------------------------------------------------
// HERO SECTION TYPING ANIMATION
// ----------------------------------------------------
function initHeroTyping() {
  const heroDesc = document.getElementById('heroDescription');
  if (!heroDesc) return;

  const textToType = heroDesc.dataset.typing || heroDesc.textContent.trim();
  const typedContainer = heroDesc.querySelector('.typed-content');
  
  if (!typedContainer) return;
  typedContainer.textContent = '';

  let charIndex = 0;
  const typingSpeed = 16; // 16ms per character

  function typeChar() {
    if (charIndex < textToType.length) {
      typedContainer.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, typingSpeed);
    }
  }

  // Start typing after short preloader delay
  setTimeout(typeChar, 350);
}

// Preload all 300 frames with chunked concurrency
async function preloadFrames() {
  const concurrency = 16;
  let queueIndex = 0;

  async function loadWorker() {
    while (queueIndex < FRAME_COUNT) {
      const index = queueIndex++;
      await new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);

        img.onload = () => {
          images[index] = img;
          loadedCount++;

          const percent = Math.round((loadedCount / FRAME_COUNT) * 100);
          if (progressBar) progressBar.style.width = `${percent}%`;
          if (progressPercent) progressPercent.textContent = `${percent}%`;

          if (index === 0) {
            sampleStudioColor(img);
            resizeCanvas();
            renderFrame(0);
          }

          resolve();
        };

        img.onerror = () => {
          console.warn(`Failed to load frame ${index}`);
          loadedCount++;
          resolve();
        };
      });
    }
  }

  const workers = Array.from({ length: concurrency }, () => loadWorker());
  await Promise.all(workers);

  isReady = true;
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
    initHeroTyping();
  }, 200);

  updateScrollTarget();
  currentFrame = targetFrame;
  renderFrame(Math.round(currentFrame));
  animationLoop();
  animateBackgroundFx();
}

// ----------------------------------------------------
// INTERACTIVE COMPONENT HANDLERS & ANIMATIONS
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Assign stagger indexes to grid children dynamically
  document.querySelectorAll('.stagger-parent').forEach((parent) => {
    Array.from(parent.children).forEach((child, idx) => {
      child.style.setProperty('--stagger-index', idx);
    });
  });

  // 2. Navigation smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if open
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
        }
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // 3. Action Buttons setup
  const btnExplore = document.getElementById('btnExplore');
  const btnTeam = document.getElementById('btnTeam');
  const btnNeural = document.getElementById('btnNeural');
  const btnExploreCta = document.getElementById('btnExploreCta');
  const btnFinalExplore = document.getElementById('btnFinalExplore');
  const btnFinalTeam = document.getElementById('btnFinalTeam');
  const btnFinalJourney = document.getElementById('btnFinalJourney');
  
  const robotFeaturesSection = document.getElementById('robotFeaturesSection');
  const anatomySection = document.getElementById('anatomySection');
  const journeySection = document.getElementById('journeySection');
  const teamModal = document.getElementById('teamModal');
  const btnCloseTeamModal = document.getElementById('btnCloseTeamModal');

  if (btnExplore && robotFeaturesSection) {
    btnExplore.addEventListener('click', () => {
      robotFeaturesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnExploreCta && anatomySection) {
    btnExploreCta.addEventListener('click', () => {
      anatomySection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnFinalExplore && robotFeaturesSection) {
    btnFinalExplore.addEventListener('click', () => {
      robotFeaturesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnFinalJourney && journeySection) {
    btnFinalJourney.addEventListener('click', () => {
      journeySection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Team Modal Handlers
  const openTeamModal = () => {
    if (teamModal) teamModal.classList.add('open');
  };

  const closeTeamModal = () => {
    if (teamModal) teamModal.classList.remove('open');
  };

  if (btnTeam) btnTeam.addEventListener('click', openTeamModal);
  if (btnFinalTeam) btnFinalTeam.addEventListener('click', openTeamModal);
  if (btnCloseTeamModal) btnCloseTeamModal.addEventListener('click', closeTeamModal);

  if (teamModal) {
    teamModal.addEventListener('click', (e) => {
      if (e.target === teamModal) closeTeamModal();
    });
  }

  if (btnNeural) {
    btnNeural.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. ANATOMY HUD INTERACTION
  const anatomyPins = document.querySelectorAll('.anatomy-pin');
  const anatomyCode = document.getElementById('anatomyCode');
  const anatomyStatus = document.getElementById('anatomyStatus');
  const anatomyTitle = document.getElementById('anatomyTitle');
  const anatomyDesc = document.getElementById('anatomyDesc');
  const anatomySpecsGrid = document.getElementById('anatomySpecsGrid');

  function updateAnatomyHud(key) {
    const data = ANATOMY_DATA[key];
    if (!data) return;

    // Highlight pins
    anatomyPins.forEach((pin) => {
      if (pin.dataset.component === key) {
        pin.classList.add('active');
      } else {
        pin.classList.remove('active');
      }
    });

    // Fade transition for panel content
    const panel = document.getElementById('anatomyInfoPanel');
    if (panel) panel.style.opacity = '0.4';

    setTimeout(() => {
      if (anatomyCode) anatomyCode.textContent = data.code;
      if (anatomyStatus) anatomyStatus.textContent = data.status;
      if (anatomyTitle) anatomyTitle.textContent = data.title;
      if (anatomyDesc) anatomyDesc.textContent = data.desc;

      if (anatomySpecsGrid) {
        anatomySpecsGrid.innerHTML = data.specs
          .map(
            (s) => `
          <div class="spec-item">
            <span class="spec-key">${s.key}</span>
            <span class="spec-val">${s.val}</span>
          </div>
        `
          )
          .join('');
      }

      if (panel) panel.style.opacity = '1';
    }, 150);
  }

  anatomyPins.forEach((pin) => {
    pin.addEventListener('mouseenter', () => {
      const componentKey = pin.dataset.component;
      updateAnatomyHud(componentKey);
    });

    pin.addEventListener('click', () => {
      const componentKey = pin.dataset.component;
      updateAnatomyHud(componentKey);
    });
  });

  // 5. CHALLENGES TABS INTERACTION
  const tabBtns = document.querySelectorAll('#challengeTabsNav .tab-btn');
  const challengeCaseId = document.getElementById('challengeCaseId');
  const challengeTitle = document.getElementById('challengeTitle');
  const challengeDesc = document.getElementById('challengeDesc');
  const challengeWhy = document.getElementById('challengeWhy');
  const challengeSolution = document.getElementById('challengeSolution');
  const challengeDisplayContent = document.getElementById('challengeDisplayContent');

  function switchChallengeTab(tabKey) {
    const data = CHALLENGES_DATA[tabKey];
    if (!data) return;

    tabBtns.forEach((btn) => {
      if (btn.dataset.tab === tabKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (challengeDisplayContent) challengeDisplayContent.style.opacity = '0.3';

    setTimeout(() => {
      if (challengeCaseId) challengeCaseId.textContent = data.caseId;
      if (challengeTitle) challengeTitle.textContent = data.title;
      if (challengeDesc) challengeDesc.textContent = data.desc;
      if (challengeWhy) challengeWhy.textContent = data.why;
      if (challengeSolution) challengeSolution.textContent = data.solution;

      if (challengeDisplayContent) challengeDisplayContent.style.opacity = '1';
    }, 150);
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabKey = btn.dataset.tab;
      switchChallengeTab(tabKey);
    });
  });

  // 6. ANIMATED STATS COUNTER WITH INTERSECTION OBSERVER
  const statCounters = document.querySelectorAll('.stat-counter');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statCounters.forEach((counter) => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOutProgress * target);

        counter.textContent = currentVal.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(statsSection);
  }

  // 7. ENHANCED SCROLL REVEAL INTERSECTION OBSERVER
  const revealTargets = document.querySelectorAll(
    '.reveal-blur-sharp, .reveal-fade-up, .reveal-on-scroll, .stagger-parent'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
});

// Canvas Direct Drag-to-Scrub
let isDragging = false;
let startY = 0;
let startScrollY = 0;

canvas.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.btn') || e.target.closest('.glass-panel') || e.target.closest('.anatomy-pin')) return;
  isDragging = true;
  startY = e.clientY;
  startScrollY = window.scrollY;
  canvas.classList.add('grabbing');
  canvas.setPointerCapture(e.pointerId);
});

canvas.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  const scrollRatio = (document.documentElement.scrollHeight - window.innerHeight) / (window.innerHeight * 0.8);
  window.scrollTo({
    top: startScrollY - deltaY * scrollRatio,
    behavior: 'auto'
  });
});

canvas.addEventListener('pointerup', (e) => {
  if (isDragging) {
    isDragging = false;
    canvas.classList.remove('grabbing');
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (_) {}
  }
});

canvas.addEventListener('pointercancel', (e) => {
  if (isDragging) {
    isDragging = false;
    canvas.classList.remove('grabbing');
  }
});

// Global Event Listeners
window.addEventListener('scroll', updateScrollTarget, { passive: true });
window.addEventListener('resize', resizeCanvas, { passive: true });

// Keyboard scrubbing
window.addEventListener('keydown', (e) => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const step = maxScroll / 40;

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    window.scrollBy({ top: step, behavior: 'smooth' });
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    window.scrollBy({ top: -step, behavior: 'smooth' });
  }
});

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
  preloadFrames();
});
