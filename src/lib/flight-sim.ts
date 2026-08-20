import { addWeights, emptyWeights } from "./engine";
import { weatherFor, type Weather } from "./cards";
import { carried, emptyHeld, type SignKind } from "./signs";
import type { Archetype, StepRecord } from "./types";

const RING_R = 340;
const RING_T = 46;
const GAP = 0.46;
const LAMP_R = 36;
const STEP = 1 / 120;
/** Standard gravitational parameter μ = GM of the lamp. */
export const MU = 500 * 140 * 140;
const SOFT = 28 * 28;
const THRUST = 108;
const TRAIL_MAX = 220;
const PREDICT = 160;

export type Pt = { x: number; y: number };

export type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: SignKind;
};

export type FlightSim = {
  t: number;
  moth: { x: number; y: number; vx: number; vy: number; angle: number };
  lamp: { x: number; y: number };
  motes: Mote[];
  sparks: { x: number; y: number; vx: number; vy: number; life: number; gold: boolean }[];
  trail: Pt[];
  predict: Pt[];
  cam: { x: number; y: number };
  gapAngle: number;
  thrusting: boolean;
  flapPulse: number;
  inside: boolean;
  entered: boolean;
  exited: boolean;
  burned: boolean;
  inWell: boolean;
  lampTime: number;
  wellTime: number;
  orbitTime: number;
  trauma: number;
  energy: number;
  ecc: number;
  bound: boolean;
  periapsis: number;
  apoapsis: number;
  held: Record<SignKind, boolean>;
  giftT: number;
  boxReady: boolean;
  lastTaken: SignKind | null;
  everThrust: boolean;
  mothSpoken: boolean;
  weather: Weather | null;
  weights: Record<Archetype, number>;
  records: StepRecord[];
  done: boolean;
  doneT: number;
  hint: string;
};

export type FlightInput = {
  aim: { x: number; y: number } | null;
  keys: { x: number; y: number };
  thrust: boolean;
};

function wrap(a: number) {
  return Math.atan2(Math.sin(a), Math.cos(a));
}

function gravity(x: number, y: number) {
  const r2 = x * x + y * y + SOFT;
  const r = Math.sqrt(r2);
  const a = -MU / (r2 * r);
  return { ax: x * a, ay: y * a, r: Math.sqrt(x * x + y * y) };
}

function elements(x: number, y: number, vx: number, vy: number) {
  const r = Math.hypot(x, y) || 1;
  const v2 = vx * vx + vy * vy;
  const energy = 0.5 * v2 - MU / r;
  const h = x * vy - y * vx;
  const ecc = Math.sqrt(Math.max(0, 1 + (2 * energy * h * h) / (MU * MU)));
  const bound = energy < 0;
  const a = bound ? -MU / (2 * energy) : 0;
  const periapsis = bound ? a * (1 - ecc) : r;
  const apoapsis = bound ? a * (1 + ecc) : Infinity;
  return { energy, ecc, bound, periapsis, apoapsis, r, v2, h };
}

function circular(radius: number, angle: number, ccw = true) {
  const v = Math.sqrt(MU / radius);
  const s = ccw ? 1 : -1;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    vx: -Math.sin(angle) * v * s,
    vy: Math.cos(angle) * v * s,
  };
}

export function createFlight(): FlightSim {
  const r0 = 500;
  const vc = Math.sqrt(MU / r0);
  const moth = {
    x: -r0,
    y: 0,
    vx: 0,
    vy: -vc * 0.9,
    angle: -Math.PI / 2,
  };
  return {
    t: 0,
    moth,
    lamp: { x: 0, y: 0 },
    motes: [
      { ...circular(215, 0.6), kind: "seed" },
      { ...circular(255, 2.3), kind: "key" },
      { ...circular(400, 4.2), kind: "thread" },
      { ...circular(175, 3.4), kind: "cup" },
      { ...circular(330, 5.1), kind: "stone" },
      { ...circular(455, 1.15), kind: "mirror" },
    ],
    sparks: [],
    trail: [],
    predict: [],
    cam: { x: moth.x * 0.42, y: 80 },
    gapAngle: -Math.PI / 2,
    thrusting: false,
    flapPulse: 0,
    inside: false,
    entered: false,
    exited: false,
    burned: false,
    inWell: false,
    lampTime: 0,
    wellTime: 0,
    orbitTime: 0,
    trauma: 0,
    energy: 0,
    ecc: 0,
    bound: true,
    periapsis: RING_R,
    apoapsis: r0,
    held: emptyHeld(),
    giftT: 0,
    boxReady: false,
    lastTaken: null,
    everThrust: false,
    mothSpoken: false,
    weather: null,
    weights: emptyWeights(),
    records: [],
    done: false,
    doneT: 0,
    hint: "Hold to burn.",
  };
}

function burst(
  sim: FlightSim,
  x: number,
  y: number,
  gold: boolean,
  n = 18,
) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 50 + Math.random() * 180;
    sim.sparks.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.4 + Math.random() * 0.5,
      gold,
    });
  }
}

function mark(sim: FlightSim, itemId: string, choice: string) {
  sim.records.push({ kind: "path", itemId, choice });
}

function predictPath(sim: FlightSim) {
  let x = sim.moth.x;
  let y = sim.moth.y;
  let vx = sim.moth.vx;
  let vy = sim.moth.vy;
  const pts: Pt[] = [{ x, y }];
  const dt = 1 / 40;
  const n = sim.held.thread ? PREDICT * 2 : PREDICT;
  for (let i = 0; i < n; i++) {
    const g = gravity(x, y);
    if (g.r < LAMP_R) break;
    vx += g.ax * dt;
    vy += g.ay * dt;
    x += vx * dt;
    y += vy * dt;
    if (i % 2 === 0) pts.push({ x, y });
  }
  sim.predict = pts;
}

function speak(sim: FlightSim, event: string) {
  const w = weatherFor(event);
  if (!w) return;
  sim.weather = w;
  sim.hint = w.name;
  sim.giftT = 4.4;
  mark(sim, w.cardId, "weather");
}

function stateHint(sim: FlightSim) {
  if (sim.done) return "You returned. The myth names itself.";
  if (!sim.everThrust) return "Hold to burn.";
  if (carried(sim.held).length === 0 && !sim.entered) return "Take the gold.";
  if (!sim.entered && !sim.exited && !sim.burned) return "Find the gap in the ring.";
  if (sim.burned && sim.inWell) return "Descent is still a path. Find the gap.";
  if (sim.entered && !sim.exited) return "Inside. Return through the gap.";
  if (sim.exited) return "You returned.";
  if (!sim.bound) return "Unbound. A hyperbola has no home.";
  if (sim.held.seed && sim.ecc < 0.18) return "Held. The work is ordinary.";
  if (sim.ecc > 0.55) return "A long ellipse. Periapsis wants the lamp.";
  return "An ellipse. Burns at periapsis raise apoapsis.";
}

export function stepFlight(sim: FlightSim, dt: number, input: FlightInput) {
  const steps = Math.min(8, Math.max(1, Math.round(dt / STEP)));
  const h = dt / steps;
  for (let i = 0; i < steps; i++) physics(sim, h, input);
  sim.trail.push({ x: sim.moth.x, y: sim.moth.y });
  if (sim.trail.length > TRAIL_MAX) sim.trail.shift();
  predictPath(sim);
  const k = 1 - Math.exp(-3.2 * dt);
  const lookX = sim.held.mirror ? sim.moth.x * 0.42 : sim.moth.x + sim.moth.vx * 0.22;
  const lookY = sim.held.mirror ? sim.moth.y * 0.55 : sim.moth.y + sim.moth.vy * 0.22;
  sim.cam.x += (lookX - sim.cam.x) * k;
  sim.cam.y += (lookY - sim.cam.y) * k;
}

function physics(sim: FlightSim, dt: number, input: FlightInput) {
  if (sim.done) {
    sim.doneT += dt;
    return;
  }
  sim.t += dt;
  sim.gapAngle += dt * (sim.held.key ? 0.045 : 0.08);
  sim.trauma = Math.max(0, sim.trauma - dt * 1.6);
  sim.flapPulse = Math.max(0, sim.flapPulse - dt * 4);
  sim.giftT = Math.max(0, sim.giftT - dt);
  if (sim.giftT <= 0) sim.weather = null;

  const m = sim.moth;
  const g = gravity(m.x, m.y);
  let ax = g.ax;
  let ay = g.ay;

  sim.thrusting = false;
  if (input.thrust || input.keys.x || input.keys.y) {
    sim.thrusting = true;
    sim.everThrust = true;
    sim.flapPulse = 1;
    if (!sim.mothSpoken) {
      sim.mothSpoken = true;
      speak(sim, "thrust");
    }
    let tx = 0;
    let ty = 0;
    const sp0 = Math.hypot(m.vx, m.vy) || 1;
    if (input.aim) {
      tx = input.aim.x - m.x;
      ty = input.aim.y - m.y;
      tx += input.keys.x * 90;
      ty += input.keys.y * 90;
    } else {
      tx = input.keys.x;
      ty = input.keys.y;
      if (sp0 > 12 && input.keys.y) {
        tx = input.keys.x + (m.vx / sp0) * -input.keys.y;
        ty = (m.vy / sp0) * -input.keys.y;
      }
    }
    const td = Math.hypot(tx, ty) || 1;
    ax += (tx / td) * THRUST;
    ay += (ty / td) * THRUST;
  }

  if (sim.held.seed) {
    const r = Math.hypot(m.x, m.y) || 1;
    const vc = Math.sqrt(MU / r);
    const hsign = m.x * m.vy - m.y * m.vx >= 0 ? 1 : -1;
    const cvx = (-m.y / r) * vc * hsign;
    const cvy = (m.x / r) * vc * hsign;
    m.vx += (cvx - m.vx) * 0.5 * dt;
    m.vy += (cvy - m.vy) * 0.5 * dt;
  }

  if (sim.inWell) {
    ax += -m.vx * 1.1;
    ay += -m.vy * 1.1 + 40;
  }

  m.vx += ax * dt;
  m.vy += ay * dt;
  m.x += m.vx * dt;
  m.y += m.vy * dt;
  const sp = Math.hypot(m.vx, m.vy);
  if (sp > 6) m.angle = Math.atan2(m.vy, m.vx);

  const el = elements(m.x, m.y, m.vx, m.vy);
  sim.energy = el.energy;
  sim.ecc = el.ecc;
  sim.bound = el.bound;
  sim.periapsis = el.periapsis;
  sim.apoapsis = el.apoapsis;

  const gap = GAP + (sim.held.key ? 0.28 : 0);
  const pr = el.r;
  const ang = Math.atan2(m.y, m.x);
  const inGap = Math.abs(wrap(ang - sim.gapAngle)) < gap;
  const inWall = pr > RING_R - RING_T / 2 && pr < RING_R + RING_T / 2 && !inGap;
  if (inWall) {
    const inner = RING_R - RING_T / 2;
    const outer = RING_R + RING_T / 2;
    const target = Math.abs(pr - inner) < Math.abs(pr - outer) ? inner : outer;
    const nx = m.x / pr;
    const ny = m.y / pr;
    m.x = nx * target;
    m.y = ny * target;
    const vr = m.vx * nx + m.vy * ny;
    m.vx -= nx * vr * (sim.held.stone ? 1.25 : 1.85);
    m.vy -= ny * vr * (sim.held.stone ? 1.25 : 1.85);
    sim.trauma = Math.min(1, sim.trauma + (sim.held.stone ? 0.08 : 0.2));
    burst(sim, m.x, m.y, false, 7);
  }

  const wasInside = sim.inside;
  sim.inside = pr < RING_R - RING_T / 2;
  if (!wasInside && sim.inside && inGap) {
    sim.entered = true;
    sim.weights = addWeights(sim.weights, { threshold: 2, quest: 1 });
    mark(sim, "gap", "enter");
    burst(sim, m.x, m.y, true, 22);
    sim.trauma = Math.min(1, sim.trauma + 0.3);
    speak(sim, "gap");
  }
  if (wasInside && !sim.inside && inGap) {
    sim.exited = true;
    sim.weights = addWeights(sim.weights, { return: 2, threshold: 1 });
    mark(sim, "gap", "return");
    burst(sim, m.x, m.y, true, 24);
    speak(sim, "return");
  }

  if (pr < LAMP_R && !sim.burned) {
    sim.burned = true;
    sim.trauma = 1;
    sim.weights = addWeights(sim.weights, { descent: 3, eros: 1, shadow: 1 });
    mark(sim, "lamp", sim.held.cup ? "oil" : "periapsis");
    burst(sim, m.x, m.y, true, 30);
    if (sim.held.cup) {
      speak(sim, "cup");
    } else {
      sim.inWell = true;
      const nx = m.x / pr;
      const ny = m.y / pr;
      m.vx = -nx * 40 + m.vy * 0.2;
      m.vy = 180;
      speak(sim, "well");
    }
  }

  sim.inWell = m.y > 470 || (sim.inWell && m.y > 140);
  if (Math.hypot(m.x - WELL.x, m.y - WELL.y) < WELL.r) {
    sim.inWell = true;
  }
  if (sim.inWell) sim.wellTime += dt;
  if (sim.inWell && sim.wellTime > 0.8 && !sim.boxReady && !sim.held.box) {
    sim.boxReady = true;
    sim.motes.push({ ...circular(90, Math.PI / 2), kind: "box", y: WELL.y - 40 });
    sim.hint = "A box at the mouth of the well.";
    speak(sim, "box");
  }

  if (sim.inside && sim.ecc < 0.22 && pr < 280) {
    sim.orbitTime += dt;
    sim.lampTime += dt;
  }

  for (let i = sim.motes.length - 1; i >= 0; i--) {
    const mote = sim.motes[i]!;
    const mg = gravity(mote.x, mote.y);
    mote.vx += mg.ax * dt;
    mote.vy += mg.ay * dt;
    mote.x += mote.vx * dt;
    mote.y += mote.vy * dt;
    if (Math.hypot(mote.x - m.x, mote.y - m.y) < 48) {
      takeSign(sim, mote.kind);
      burst(sim, mote.x, mote.y, true, 16);
      sim.motes.splice(i, 1);
    }
  }

  for (let i = sim.sparks.length - 1; i >= 0; i--) {
    const s = sim.sparks[i]!;
    s.life -= dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    if (s.life <= 0) sim.sparks.splice(i, 1);
  }

  if (sim.giftT <= 0) sim.hint = stateHint(sim);

  const ready =
    (sim.entered && sim.exited) ||
    (sim.burned && sim.exited) ||
    (sim.burned && sim.wellTime > 5 && sim.entered);
  if (ready && !sim.done) {
    if (sim.orbitTime > 3) sim.weights = addWeights(sim.weights, { devotion: 2, eros: 1 });
    if (sim.ecc > 0.5) sim.weights = addWeights(sim.weights, { quest: 1, threshold: 1 });
    if (!sim.bound) sim.weights = addWeights(sim.weights, { sovereignty: 2 });
    if (sim.wellTime > 1) sim.weights = addWeights(sim.weights, { descent: 1, return: 1 });
    if (sim.held.seed && sim.held.key && sim.held.thread) {
      sim.weights = addWeights(sim.weights, { return: 1, craft: 1, devotion: 1 });
    }
    sim.done = true;
    sim.hint = "You returned. The myth names itself.";
  }
}

function takeSign(sim: FlightSim, kind: SignKind) {
  sim.held[kind] = true;
  sim.lastTaken = kind;
  mark(sim, kind, "take");
  speak(sim, kind);
  if (kind === "seed") sim.weights = addWeights(sim.weights, { craft: 2, devotion: 1 });
  else if (kind === "key") sim.weights = addWeights(sim.weights, { threshold: 2, quest: 1 });
  else if (kind === "thread") sim.weights = addWeights(sim.weights, { eros: 2, devotion: 1 });
  else if (kind === "cup") sim.weights = addWeights(sim.weights, { eros: 2, descent: 1 });
  else if (kind === "stone") sim.weights = addWeights(sim.weights, { craft: 1, return: 1 });
  else if (kind === "mirror") sim.weights = addWeights(sim.weights, { shadow: 1, return: 2 });
  else sim.weights = addWeights(sim.weights, { descent: 2, shadow: 2 });
}

export const RING = { r: RING_R, t: RING_T, gap: GAP };
export const WELL = { x: 0, y: 560, r: 86 };
