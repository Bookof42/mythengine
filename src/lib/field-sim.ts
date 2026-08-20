import { addWeights, emptyWeights } from "./engine";
import { SCENES } from "./scenes";
import type { Archetype, StepRecord, Weights } from "./types";
import { seededRandom, shuffle } from "./utils";

export const GOAL = 5;

export type Mote = {
  id: number;
  kind: "door" | "shadow";
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label?: string;
  sceneId?: string;
  choiceId?: string;
  weights?: Weights;
  after?: string;
  spin: number;
};

export type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  gold: boolean;
};

export type FieldSim = {
  w: number;
  h: number;
  t: number;
  player: { x: number; y: number; vx: number; vy: number; angle: number };
  motes: Mote[];
  sparks: Spark[];
  stations: string[];
  index: number;
  title: string;
  afterText: string;
  afterT: number;
  captures: number;
  weights: Record<Archetype, number>;
  records: StepRecord[];
  trauma: number;
  nextId: number;
  done: boolean;
};

export function createField(w: number, h: number, seed = 1): FieldSim {
  const rand = seededRandom(seed);
  const stations = shuffle(SCENES, rand)
    .slice(0, GOAL)
    .map((s) => s.id);
  const sim: FieldSim = {
    w,
    h,
    t: 0,
    player: { x: w / 2, y: h * 0.78, vx: 0, vy: 0, angle: -Math.PI / 2 },
    motes: [],
    sparks: [],
    stations,
    index: 0,
    title: "",
    afterText: "",
    afterT: 0,
    captures: 0,
    weights: emptyWeights(),
    records: [],
    trauma: 0,
    nextId: 1,
    done: false,
  };
  layStation(sim);
  return sim;
}

export function resizeField(sim: FieldSim, w: number, h: number) {
  const sx = w / sim.w;
  const sy = h / sim.h;
  sim.w = w;
  sim.h = h;
  sim.player.x *= sx;
  sim.player.y *= sy;
  for (const m of sim.motes) {
    m.x *= sx;
    m.y *= sy;
  }
}

function layStation(sim: FieldSim) {
  const scene = SCENES.find((s) => s.id === sim.stations[sim.index]);
  sim.motes = sim.motes.filter((m) => m.kind === "shadow");
  sim.afterText = "";
  sim.afterT = 0;
  if (!scene) {
    sim.done = true;
    sim.title = "";
    return;
  }
  sim.title = scene.title;
  const n = scene.choices.length;
  scene.choices.forEach((choice, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    sim.motes.push({
      id: sim.nextId++,
      kind: "door",
      x: sim.w * (0.18 + t * 0.64),
      y: sim.h * 0.5,
      vx: 0,
      vy: 0,
      r: 42,
      label: choice.label,
      sceneId: scene.id,
      choiceId: choice.id,
      weights: choice.weights,
      after: choice.after,
      spin: 0,
    });
  });
  if (sim.motes.filter((m) => m.kind === "shadow").length < 1) {
    sim.motes.push({
      id: sim.nextId++,
      kind: "shadow",
      x: sim.w * 0.85,
      y: sim.h * 0.22,
      vx: -20,
      vy: 18,
      r: 16,
      spin: 0,
    });
  }
}

function burst(sim: FieldSim, x: number, y: number, gold: boolean) {
  for (let i = 0; i < 16; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 50 + Math.random() * 140;
    sim.sparks.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.45 + Math.random() * 0.4,
      gold,
    });
  }
}

export type FieldInput = {
  pointer: { x: number; y: number } | null;
  keys: { x: number; y: number };
};

export function stepField(sim: FieldSim, dt: number, input: FieldInput) {
  if (sim.done) return;
  sim.t += dt;
  sim.trauma = Math.max(0, sim.trauma - dt * 1.8);

  if (sim.afterT > 0) {
    sim.afterT -= dt;
    if (sim.afterT <= 0) {
      sim.index += 1;
      if (sim.index >= sim.stations.length) {
        sim.done = true;
        sim.title = "";
        sim.afterText = "";
        return;
      }
      layStation(sim);
    }
  }

  const p = sim.player;
  let tx = p.x;
  let ty = p.y;
  if (input.pointer) {
    tx = input.pointer.x;
    ty = input.pointer.y;
  }
  tx += input.keys.x * 160;
  ty += input.keys.y * 160;
  p.vx += (tx - p.x) * 9 * dt;
  p.vy += (ty - p.y) * 9 * dt;
  p.vx *= 0.86;
  p.vy *= 0.86;
  p.x += p.vx;
  p.y += p.vy;
  p.x = Math.max(20, Math.min(sim.w - 20, p.x));
  p.y = Math.max(20, Math.min(sim.h - 20, p.y));
  p.angle = Math.atan2(p.vy, p.vx);

  for (const m of sim.motes) {
    m.spin += dt;
    if (m.kind === "shadow") {
      const dx = p.x - m.x;
      const dy = p.y - m.y;
      const d = Math.hypot(dx, dy) || 1;
      m.vx += (dx / d) * 22 * dt;
      m.vy += (dy / d) * 22 * dt;
      m.vx *= 0.995;
      m.vy *= 0.995;
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      if (m.x < -30) m.x = sim.w + 20;
      if (m.x > sim.w + 30) m.x = -20;
      if (m.y < -30) m.y = sim.h + 20;
      if (m.y > sim.h + 30) m.y = -20;
    } else {
      m.y = sim.h * 0.5 + Math.sin(sim.t * 1.4 + m.id) * 8;
    }
  }

  if (sim.afterT > 0) return;

  for (let i = sim.motes.length - 1; i >= 0; i--) {
    const m = sim.motes[i]!;
    const d = Math.hypot(m.x - p.x, m.y - p.y);
    if (d > m.r + 12) continue;
    if (m.kind === "door") {
      sim.captures += 1;
      sim.weights = addWeights(sim.weights, m.weights ?? {});
      sim.records.push({
        kind: "scene",
        itemId: m.sceneId ?? "door",
        choice: m.choiceId ?? "enter",
      });
      sim.afterText = m.after ?? "";
      sim.afterT = 1.7;
      sim.trauma = Math.min(1, sim.trauma + 0.4);
      burst(sim, m.x, m.y, true);
      sim.motes = sim.motes.filter((x) => x.kind === "shadow");
      break;
    }
    sim.trauma = Math.min(1, sim.trauma + 0.55);
    burst(sim, m.x, m.y, false);
    p.vx += (p.x - m.x) * 0.9;
    p.vy += (p.y - m.y) * 0.9;
    sim.motes.splice(i, 1);
  }

  for (let i = sim.sparks.length - 1; i >= 0; i--) {
    const s = sim.sparks[i]!;
    s.life -= dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.vx *= 0.96;
    s.vy *= 0.96;
    if (s.life <= 0) sim.sparks.splice(i, 1);
  }
}
