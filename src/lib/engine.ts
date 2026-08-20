import { CARDS, CARD_BY_ID } from "./cards";
import { MYTHS, MYTH_BY_ID } from "./myths";
import { OMENS, type Omen } from "./omens";
import { PATHS, PATH_BY_ID } from "./paths";
import { SCENES, SCENE_BY_ID } from "./scenes";
import {
  ARCHETYPES,
  type Archetype,
  type Mechanic,
  type Myth,
  type PlayStep,
  type SessionResult,
  type StepRecord,
  type Weights,
} from "./types";
import { hashString, pickOne, seededRandom, shuffle, todayKey } from "./utils";

export type Priors = {
  mythCounts: Record<string, number>;
  contentPlays: Record<string, number>;
};

export function emptyWeights(): Record<Archetype, number> {
  return Object.fromEntries(ARCHETYPES.map((a) => [a, 0])) as Record<
    Archetype,
    number
  >;
}

export function addWeights(
  base: Record<Archetype, number>,
  extra: Weights | Record<Archetype, number>,
  scale = 1,
): Record<Archetype, number> {
  const next = { ...base };
  for (const key of Object.keys(extra) as Archetype[]) {
    next[key] = (next[key] ?? 0) + (extra[key] ?? 0) * scale;
  }
  return next;
}

export function vectorNorm(w: Record<Archetype, number>) {
  let s = 0;
  for (const a of ARCHETYPES) s += (w[a] ?? 0) ** 2;
  return Math.sqrt(s) || 1;
}

export function cosine(
  a: Record<Archetype, number>,
  b: Weights | Record<Archetype, number>,
) {
  let dot = 0;
  for (const k of ARCHETYPES) dot += (a[k] ?? 0) * (b[k] ?? 0);
  return dot / (vectorNorm(a) * vectorNorm(addWeights(emptyWeights(), b)));
}

export function dominantArchetypes(
  w: Record<Archetype, number>,
  n = 3,
): Archetype[] {
  return [...ARCHETYPES]
    .sort((x, y) => (w[y] ?? 0) - (w[x] ?? 0))
    .slice(0, n);
}

function contentKey(mechanic: Mechanic, id: string) {
  return `${mechanic}:${id}`;
}

function pickUnused<T extends { id: string }>(
  pool: T[],
  mechanic: Mechanic,
  used: Set<string>,
  rand: () => number,
  priors?: Priors,
): T {
  const fresh = pool.filter((item) => !used.has(item.id));
  const source = fresh.length ? fresh : pool;
  if (!priors) return pickOne(source, rand);
  const ranked = [...source].sort((a, b) => {
    const pa = priors.contentPlays[contentKey(mechanic, a.id)] ?? 0;
    const pb = priors.contentPlays[contentKey(mechanic, b.id)] ?? 0;
    return pa - pb;
  });
  const lowest = ranked.slice(0, Math.max(2, Math.ceil(ranked.length / 3)));
  return pickOne(lowest, rand);
}

export function buildSequence(seed: number, priors?: Priors | null): PlayStep[] {
  const rand = seededRandom(seed);
  const n = 7 + Math.floor(rand() * 3);
  const bag: Mechanic[] = ["scene", "scene", "card", "card", "path", "path"];
  const extra: Mechanic[] = ["scene", "card", "path"];
  while (bag.length < n) bag.push(pickOne(extra, rand));
  const kinds = shuffle(bag, rand).slice(0, n);
  for (let i = 2; i < kinds.length; i += 1) {
    if (kinds[i] === kinds[i - 1] && kinds[i] === kinds[i - 2]) {
      kinds[i] = pickOne(
        extra.filter((k) => k !== kinds[i]),
        rand,
      );
    }
  }

  const used = {
    scene: new Set<string>(),
    card: new Set<string>(),
    path: new Set<string>(),
  };
  const p = priors ?? undefined;
  return kinds.map((kind) => {
    if (kind === "scene") {
      const scene = pickUnused(SCENES, "scene", used.scene, rand, p);
      used.scene.add(scene.id);
      return { kind, id: scene.id };
    }
    if (kind === "card") {
      const card = pickUnused(CARDS, "card", used.card, rand, p);
      used.card.add(card.id);
      return { kind, id: card.id };
    }
    const path = pickUnused(PATHS, "path", used.path, rand, p);
    used.path.add(path.id);
    return { kind, id: path.id };
  });
}

export function resolveChoiceWeights(
  step: PlayStep,
  choice: string,
): Weights {
  if (step.kind === "scene") {
    const scene = SCENE_BY_ID[step.id];
    return scene?.choices.find((c) => c.id === choice)?.weights ?? {};
  }
  if (step.kind === "card") {
    const card = CARD_BY_ID[step.id];
    if (!card) return {};
    if (choice === "toward") return card.toward;
    if (choice === "away") return card.away;
    return card.rest;
  }
  const path = PATH_BY_ID[step.id];
  if (!path) return {};
  if (choice === "left") return path.left.weights;
  if (choice === "right") return path.right.weights;
  return path.center.weights;
}

export function matchMyth(
  weights: Record<Archetype, number>,
  opts: {
    seed: number;
    excludeIds?: string[];
    priors?: Priors | null;
    birthBoost?: Weights;
  },
): Myth {
  const rand = seededRandom(opts.seed + 17);
  const player = opts.birthBoost
    ? addWeights(weights, opts.birthBoost, 0.35)
    : weights;
  const exclude = new Set(opts.excludeIds ?? []);
  const scored = MYTHS.map((myth) => {
    let s = cosine(player, myth.weights);
    const count = opts.priors?.mythCounts[myth.id] ?? 0;
    // Inverse-frequency: keep the field from collapsing onto five popular myths.
    s += 0.05 / (1 + count);
    if (exclude.has(myth.id)) s -= 0.08;
    s += (rand() - 0.5) * 0.02;
    return { myth, s };
  }).sort((a, b) => b.s - a.s);

  const best = scored[0]!.s;
  const near = scored.filter((row) => best - row.s < 0.08);
  return pickOne(near, rand).myth;
}

export function pickQuestion(myth: Myth, seed: number) {
  const rand = seededRandom(seed + 42);
  return pickOne(Object.values(myth.questions), rand);
}

export function profileFromHistory(
  history: SessionResult[],
): Record<Archetype, number> {
  const w = emptyWeights();
  const recent = history.slice(-5);
  if (!recent.length) return w;
  for (const session of recent) addWeights(w, session.weights);
  return w;
}

export function pickOmen(
  date: Date,
  profile: Record<Archetype, number>,
): Omen {
  const rand = seededRandom(hashString(`${todayKey(date)}:omen:v2`));
  const scored = OMENS.map((omen) => ({
    omen,
    s: cosine(profile, omen.weights) + rand() * 0.15,
  }));
  scored.sort((a, b) => b.s - a.s);
  return scored[0]!.omen;
}

export function describeStep(step: PlayStep) {
  if (step.kind === "scene") return SCENE_BY_ID[step.id];
  if (step.kind === "card") return CARD_BY_ID[step.id];
  return PATH_BY_ID[step.id];
}

export { MYTH_BY_ID };
