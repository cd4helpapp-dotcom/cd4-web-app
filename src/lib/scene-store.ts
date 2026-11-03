// Scroll and pointer state for the 3D scene. It lives outside React so a scroll update never causes a re-render.

export type StageId =
  | "hero"
  | "why"
  | "features"
  | "voice"
  | "snapshotA"
  | "snapshotB"
  | "demo"
  | "doctors"
  | "reports"
  | "ecosystem"
  | "howA"
  | "howB"
  | "howC"
  | "howD"
  | "roles"
  | "hospital"
  | "app"
  | "faq"
  | "cta"
  | "end";
export type Tier = "high" | "mid" | "low";

export interface Pose {
  orbX: number;
  orbY: number;
  orbScale: number;
  orbAlpha: number;
  neural: number;
  spin: number;
  satellites: number;
  mic: number;
  wave: number;
  morph: number;
  doctor: number;
  network: number;
  netLabels: number;
  netScale: number;
  phone: number;
  records: number;
  camX: number;
  camY: number;
  camZ: number;
}

const base: Pose = {
  orbX: 2.42,
  orbY: 0.02,
  orbScale: 0.74,
  orbAlpha: 1,
  neural: 0.6,
  spin: 0,
  satellites: 1,
  mic: 0,
  wave: 0,
  morph: 0,
  doctor: 0,
  network: 0,
  netLabels: 0,
  netScale: 1,
  phone: 0,
  records: 0,
  camX: 0,
  camY: 0,
  camZ: 7.5
};

// Everything except the hero starts from this: the cell alone, with the other pieces put away.
const quiet: Pose = { ...base, satellites: 0 };

const desktop: Record<StageId, Pose> = {
  hero: base,
  why: { ...quiet, orbX: 2.3, orbScale: 1.45, neural: 1, spin: 1.3, camX: -0.45, camY: 0.18, camZ: 7 },
  features: { ...quiet, orbX: 3.05, orbY: 1.72, orbScale: 0.6, orbAlpha: 0.9, neural: 1, spin: 2.4, camX: 0.3, camY: -0.15 },
  voice: { ...quiet, orbX: 2.7, orbY: -0.05, orbScale: 1.2, orbAlpha: 0.42, neural: 0.9, spin: 3.2, mic: 1, wave: 1, camX: 0.4, camY: -0.12 },
  snapshotA: { ...quiet, orbX: 2.3, orbScale: 1.3, orbAlpha: 0.55, neural: 1, spin: 3.9, wave: 1, camX: -0.2, camY: 0.05 },
  snapshotB: { ...quiet, orbX: 2.3, orbScale: 1.3, orbAlpha: 0.55, neural: 1, spin: 4.5, wave: 1, morph: 1, camX: -0.35, camY: 0.22 },
  demo: { ...quiet, orbX: -3.75, orbY: -2.05, orbScale: 0.72, orbAlpha: 0.7, neural: 0.9, spin: 5.1, camX: -0.2 },
  doctors: { ...quiet, orbX: 2.7, orbY: 0.15, orbScale: 1.4, orbAlpha: 0.32, neural: 0.8, spin: 5.8, doctor: 1, camX: 0.4, camY: 0.12 },
  reports: { ...quiet, orbX: 3.3, orbY: 1.65, orbScale: 0.5, orbAlpha: 0.85, neural: 1, spin: 6.5, records: 1, camX: 0.15, camY: -0.1 },
  ecosystem: { ...quiet, orbX: 0, orbY: -0.3, orbScale: 0.55, neural: 1, spin: 7.2, network: 1, netLabels: 1, records: 1, camY: -0.28, camZ: 8 },
  howA: { ...quiet, orbX: 2.7, orbY: 0.1, orbScale: 1.15, orbAlpha: 0.5, neural: 1, spin: 7.8, wave: 1, camX: 0.25 },
  howB: { ...quiet, orbX: 2.7, orbY: 0.1, orbScale: 1.15, orbAlpha: 0.5, neural: 1, spin: 8.3, wave: 1, morph: 1, camX: 0.1, camY: 0.1 },
  howC: { ...quiet, orbX: 2.7, orbY: 0.15, orbScale: 1.4, orbAlpha: 0.32, spin: 8.8, doctor: 1, camX: 0.3 },
  howD: { ...quiet, orbX: 2.75, orbScale: 0.42, neural: 1, spin: 9.3, network: 1, netScale: 0.5, camX: 0.1, camY: -0.1 },
  roles: { ...quiet, orbX: 0, orbY: -2.25, orbScale: 1.1, orbAlpha: 0.75, neural: 1, spin: 9.9, camY: 0.1 },
  hospital: { ...quiet, orbX: -3.3, orbY: -1.75, orbScale: 0.95, orbAlpha: 0.5, spin: 10.5 },
  app: { ...quiet, orbX: 2.4, orbScale: 1.15, orbAlpha: 0.4, neural: 0.7, spin: 11, phone: 1, camX: -0.3 },
  faq: { ...quiet, orbX: -3.1, orbY: -1.4, orbScale: 0.95, orbAlpha: 0.6, spin: 11.6 },
  cta: { ...quiet, orbX: 0, orbY: -2.5, orbScale: 1.5, orbAlpha: 0.9, neural: 1, spin: 12.2, network: 0.55, camY: 0.32 },
  end: { ...quiet, orbX: 0, orbY: -5, orbScale: 1.5, orbAlpha: 0, spin: 12.6, camY: 0.32 }
};

// On phones the 3D sits in open space above the text and scrolls away with its section.
const accent: Pose = { ...quiet, orbX: 0.7, orbY: 1.75, orbScale: 0.32, orbAlpha: 0.4, neural: 1, camZ: 7.5 };

const mobile: Record<StageId, Pose> = {
  hero: { ...base, orbX: 0, orbY: 1.22, orbScale: 0.44 },
  why: { ...quiet, orbX: 0, orbY: 1.15, orbScale: 0.68, neural: 1, spin: 1.3 },
  features: { ...accent, spin: 1.9 },
  voice: { ...accent, orbX: 0, orbY: 1.1, orbScale: 0.55, orbAlpha: 0.32, spin: 2.2, mic: 1, wave: 0.8 },
  snapshotA: { ...accent, orbX: 0, orbY: 1.1, orbScale: 0.6, orbAlpha: 0.4, spin: 2.8, wave: 1 },
  snapshotB: { ...accent, orbX: 0, orbY: 1.1, orbScale: 0.6, orbAlpha: 0.4, spin: 3.2, wave: 1, morph: 1 },
  demo: { ...accent, spin: 3.6 },
  doctors: { ...accent, orbX: 0, orbY: 1.1, orbScale: 0.62, orbAlpha: 0.3, spin: 3.8, doctor: 1 },
  reports: { ...accent, spin: 4.3 },
  ecosystem: { ...quiet, orbX: 0, orbY: -0.9, orbScale: 0.24, neural: 1, spin: 4.8, network: 1 },
  howA: { ...accent, spin: 5 },
  howB: { ...accent, spin: 5.3 },
  howC: { ...accent, spin: 5.6 },
  howD: { ...accent, spin: 5.9 },
  roles: { ...accent, spin: 6.2 },
  hospital: { ...accent, spin: 6.5 },
  app: { ...quiet, orbX: 0, orbY: 1.05, orbScale: 0.5, orbAlpha: 0.32, spin: 6.8, phone: 1 },
  faq: { ...accent, spin: 7.2 },
  cta: { ...quiet, orbX: 0, orbY: -2.2, orbScale: 0.85, orbAlpha: 0.85, neural: 1, spin: 7.6, network: 0.35 },
  end: { ...quiet, orbX: 0, orbY: -5, orbScale: 0.85, orbAlpha: 0, spin: 8 }
};

export const poseTable = { desktop, mobile };

export const sceneStore = {
  current: { ...base } as Pose,
  target: { ...base } as Pose,
  pointer: { x: 0, y: 0 },
  isMobile: false,
  xScale: 1,
  scrollShift: 0,
  progress: 0,
  tier: "high" as Tier,
  phoneProgress: 0,
  cellFocus: -1,
  networkFocus: -1
};

export function pickTier(): Tier {
  const width = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData || width < 768 || cores < 4) return "low";
  if (width >= 1024 && cores >= 6) return "high";
  return "mid";
}

export const particleBudget: Record<Tier, { particles: number; nodes: number; wave: number; receptors: number; detail: number }> = {
  high: { particles: 1500, nodes: 80, wave: 1700, receptors: 66, detail: 36 },
  mid: { particles: 800, nodes: 56, wave: 1000, receptors: 42, detail: 24 },
  low: { particles: 320, nodes: 30, wave: 500, receptors: 24, detail: 14 }
};

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
