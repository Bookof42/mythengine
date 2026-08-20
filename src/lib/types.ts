import type { SignKind } from "./signs";

export const ARCHETYPES = [
  "descent",
  "eros",
  "quest",
  "sovereignty",
  "trickster",
  "craft",
  "devotion",
  "shadow",
  "threshold",
  "return",
] as const;

export type Archetype = (typeof ARCHETYPES)[number];

export type Weights = Partial<Record<Archetype, number>>;

export type Tradition =
  | "Greek"
  | "Norse"
  | "Egyptian"
  | "African"
  | "Japanese"
  | "Chinese"
  | "Hindu"
  | "Maya"
  | "Aztec"
  | "Celtic"
  | "Sumerian"
  | "Mesopotamian"
  | "Persian"
  | "Arabic"
  | "Polynesian"
  | "Inuit"
  | "Northwest Coast"
  | "Levantine";

export type Myth = {
  id: string;
  name: string;
  tradition: Tradition;
  origin: string;
  short: string;
  full: string;
  psychology: string;
  reflection: string;
  weights: Weights;
  questions: string[];
  sigil: SigilKind;
};

export type SigilKind =
  | "aperture"
  | "thread"
  | "key"
  | "well"
  | "moth"
  | "crown"
  | "mask"
  | "seed"
  | "blade"
  | "cup"
  | "bone"
  | "star"
  | "boat"
  | "serpent"
  | "bird"
  | "mountain"
  | "moon"
  | "flame"
  | "bridge"
  | "scale"
  | "owl"
  | "wall";

export type Mechanic = "scene" | "card" | "path";

export type SceneChoice = {
  id: string;
  label: string;
  after: string;
  weights: Weights;
};

export type Scene = {
  id: string;
  title: string;
  body: string;
  art: string;
  choices: SceneChoice[];
};

export type OracleCard = {
  id: string;
  name: string;
  fragment: string;
  sigil: SigilKind;
  toward: Weights;
  away: Weights;
  rest: Weights;
};

export type PathFork = {
  id: string;
  prompt: string;
  left: { label: string; weights: Weights };
  center: { label: string; weights: Weights };
  right: { label: string; weights: Weights };
};

export type PlayStep =
  | { kind: "scene"; id: string }
  | { kind: "card"; id: string }
  | { kind: "path"; id: string };

export type StepRecord = {
  kind: Mechanic;
  itemId: string;
  choice: string;
};

export type SessionResult = {
  id: string;
  startedAt: string;
  finishedAt: string;
  mythId: string;
  question: string;
  weights: Record<Archetype, number>;
  steps: StepRecord[];
  signs?: SignKind[];
};

export type OmenMark = {
  date: string;
  omenId: string;
  response: "noticed" | "carried" | "released";
};

export type BirthPattern = {
  date: string;
  time?: string;
  place?: string;
};

export type OmenMoon = "new" | "waxing" | "full" | "waning" | "any";
