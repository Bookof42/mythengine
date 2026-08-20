import type { SignKind, SealKind } from "./signs";
import type {
  Archetype,
  BirthPattern,
  OmenMark,
  PlayStep,
  SessionResult,
  StepRecord,
  Weights,
} from "./types";
import { ARCHETYPES } from "./types";

const KEY = "mythengine.save.v1";
const LEGACY_KEY = "aperture.save.v1";
const SAVE_VERSION = 1;

export type PlaySnapshot = {
  seed: number;
  sessionId?: string;
  steps: PlayStep[];
  index: number;
  weights: Record<Archetype, number>;
  records: StepRecord[];
  startedAt: string;
  afterText?: string;
  cardFlipped?: boolean;
  screen: "play" | "reveal" | "question" | "after";
  mythId?: string;
  question?: string;
  mode?: "field" | "psyche" | "walk";
};

export type SaveState = {
  version: number;
  history: SessionResult[];
  omens: OmenMark[];
  birth?: BirthPattern;
  usePattern: boolean;
  muted: boolean;
  current?: PlaySnapshot;
  anonId: string;
  signs: SignKind[];
  seals: SealKind[];
  lastTrail?: { x: number; y: number }[];
  lastKept?: SignKind;
};

const defaults = (): SaveState => ({
  version: SAVE_VERSION,
  history: [],
  omens: [],
  usePattern: false,
  muted: false,
  anonId: "",
  signs: [],
  seals: [],
});

function migrate(raw: SaveState): SaveState {
  const base = defaults();
  return {
    ...base,
    ...raw,
    version: SAVE_VERSION,
    history: Array.isArray(raw.history) ? raw.history : [],
    omens: Array.isArray(raw.omens) ? raw.omens : [],
    usePattern: Boolean(raw.usePattern),
    muted: Boolean(raw.muted),
    anonId: raw.anonId || "",
    signs: Array.isArray(raw.signs) ? raw.signs : [],
    seals: Array.isArray(raw.seals) ? raw.seals : [],
  };
}

export function loadSave(): SaveState {
  const empty = defaults();
  if (typeof window === "undefined") return empty;
  try {
    const raw =
      window.localStorage.getItem(KEY) ?? window.localStorage.getItem(LEGACY_KEY);
    if (!raw) {
      const fresh = { ...empty, anonId: crypto.randomUUID() };
      persistSave(fresh);
      return fresh;
    }
    const parsed = JSON.parse(raw) as SaveState;
    const next = migrate(parsed);
    if (!next.anonId) {
      next.anonId = crypto.randomUUID();
      persistSave(next);
    }
    return next;
  } catch {
    return { ...empty, anonId: crypto.randomUUID() };
  }
}

export function persistSave(state: SaveState) {
  if (typeof window === "undefined") return;
  try {
    const blob = JSON.stringify(state);
    window.localStorage.setItem(KEY, blob);
  } catch {
    /* private mode / quota — keep playing in memory */
  }
}

export function emptyArchetypeRecord(): Record<Archetype, number> {
  return Object.fromEntries(ARCHETYPES.map((a) => [a, 0])) as Record<
    Archetype,
    number
  >;
}

export function asFullWeights(
  w: Weights | Record<Archetype, number>,
): Record<Archetype, number> {
  const next = emptyArchetypeRecord();
  for (const a of ARCHETYPES) next[a] = w[a] ?? 0;
  return next;
}
