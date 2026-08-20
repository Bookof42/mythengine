import { create } from "zustand";
import { audio } from "./audio";
import {
  addWeights,
  buildSequence,
  emptyWeights,
  matchMyth,
  pickQuestion,
  resolveChoiceWeights,
  type Priors,
} from "./engine";
import { buildPsycheSequence } from "./psyche-quest";
import { buildPlotSequence } from "./plot-walks";
import { MYTH_BY_ID } from "./myths";
import {
  asFullWeights,
  loadSave,
  persistSave,
  type PlaySnapshot,
  type SaveState,
} from "./save";
import { birthBoostFromSign, moonName, sunSignFromDate } from "./astronomy";
import type { Archetype, OmenMark, SessionResult, Myth } from "./types";
import { type SignKind } from "./signs";
import { getPriors, recordOmen, recordPlay, saveJournal } from "./server/events";

type Screen = "threshold" | "play" | "reveal" | "question" | "after";

type GameStore = {
  ready: boolean;
  save: SaveState;
  priors: Priors | null;
  hydrate: () => void;
  refreshPriors: () => Promise<void>;
  begin: () => void;
  beginPsyche: (night?: "short" | "long") => void;
  beginWalk: (mythId: string) => void;
  choose: (choice: string) => void;
  continueAfter: () => void;
  flipCard: () => void;
  toQuestion: () => void;
  toAfter: () => void;
  abandon: () => void;
  stepBack: () => void;
  setMuted: (muted: boolean) => void;
  setBirth: (date: string, time: string, place: string, use: boolean) => void;
  markOmen: (omenId: string, response: OmenMark["response"]) => void;
  finishArcade: (
    weights: Record<Archetype, number>,
    records: SessionResult["steps"],
    signs?: SignKind[],
    trail?: { x: number; y: number }[],
  ) => void;
};

function write(save: SaveState) {
  persistSave(save);
  return save;
}

function screenOf(save: SaveState): Screen {
  if (!save.current) return "threshold";
  // Only a live room resumes. Reveal, question, after are the end of a walk.
  // Opening the app onto a sermon is how the game disappeared.
  if (save.current.screen === "play") return "play";
  return "threshold";
}

function finishSession(save: SaveState, priors: Priors | null): SaveState {
  const current = save.current;
  if (!current) return save;
  const exclude = save.history.slice(-2).map((h) => h.mythId);
  let myth: Myth | undefined =
    current.mode === "psyche"
      ? MYTH_BY_ID.psyche
      : current.mode === "walk" && current.mythId
        ? MYTH_BY_ID[current.mythId]
        : undefined;
  if (!myth) {
    let birthBoost = undefined;
    if (save.usePattern && save.birth?.date) {
      const d = new Date(save.birth.date + "T12:00:00");
      if (!Number.isNaN(d.getTime())) {
        birthBoost = birthBoostFromSign(sunSignFromDate(d), moonName(d));
      }
    }
    myth = matchMyth(current.weights, {
      seed: current.seed,
      excludeIds: exclude,
      priors,
      birthBoost,
    });
  }
  const question = pickQuestion(myth, current.seed);
  const nextCurrent: PlaySnapshot = {
    ...current,
    screen: "reveal",
    mythId: myth.id,
    question,
    afterText: undefined,
  };
  return { ...save, current: nextCurrent };
}

export const useGame = create<GameStore>((set, get) => ({
  ready: false,
  save: {
    version: 2,
    history: [],
    omens: [],
    usePattern: false,
    muted: true,
    anonId: "",
    signs: [],
    seals: [],
  },
  priors: null,

  hydrate: () => {
    let save = loadSave();
    // Always open the house. A saved flight was trapping the whole site
    // on one canvas and hiding the other rooms.
    if (save.current) {
      save = write({ ...save, current: undefined });
    }
    audio.setMuted(save.muted);
    set({ save, ready: true });
    void get().refreshPriors();
  },

  refreshPriors: async () => {
    try {
      const priors = await getPriors();
      set({ priors });
    } catch {
      /* preview/offline: local engine is enough */
    }
  },

  begin: () => {
    audio.unlock();
    get().setMuted(false);
    audio.cue("begin");
    audio.setSection("play");
    const seed = Date.now() % 2147483646;
    const current: PlaySnapshot = {
      seed,
      sessionId: crypto.randomUUID(),
      steps: [],
      index: 0,
      weights: emptyWeights(),
      records: [],
      startedAt: new Date().toISOString(),
      screen: "play",
      cardFlipped: false,
      mode: "field",
    };
    const save = write({ ...get().save, current });
    set({ save });
  },

  beginPsyche: (night = "short") => {
    audio.unlock();
    get().setMuted(false);
    audio.cue("begin");
    audio.setSection("play");
    const seed = Date.now() % 2147483646;
    const steps = buildPsycheSequence(night, seed);
    const current: PlaySnapshot = {
      seed,
      sessionId: crypto.randomUUID(),
      steps,
      index: 0,
      weights: emptyWeights(),
      records: [],
      startedAt: new Date().toISOString(),
      screen: "play",
      cardFlipped: false,
      mode: "psyche",
    };
    const save = write({ ...get().save, current });
    set({ save });
  },

  beginWalk: (mythId: string) => {
    const steps = buildPlotSequence(mythId);
    if (!steps.length) return;
    audio.unlock();
    get().setMuted(false);
    audio.cue("begin");
    audio.setSection("play");
    const seed = Date.now() % 2147483646;
    const current: PlaySnapshot = {
      seed,
      sessionId: crypto.randomUUID(),
      steps,
      index: 0,
      weights: emptyWeights(),
      records: [],
      startedAt: new Date().toISOString(),
      screen: "play",
      cardFlipped: false,
      mode: "walk",
      mythId,
    };
    const save = write({ ...get().save, current });
    set({ save });
  },

  flipCard: () => {
    const { save } = get();
    if (!save.current) return;
    audio.cue("flip");
    const next = write({
      ...save,
      current: { ...save.current, cardFlipped: true },
    });
    set({ save: next });
  },

  choose: (choice: string) => {
    const { save } = get();
    const current = save.current;
    if (!current || current.screen !== "play") return;
    const step = current.steps[current.index];
    if (!step) return;
    audio.cue("choose");
    const added = resolveChoiceWeights(step, choice);
    const weights = addWeights(current.weights, added);
    const records = [
      ...current.records,
      { kind: step.kind, itemId: step.id, choice },
    ];
    const nextCurrent: PlaySnapshot = {
      ...current,
      weights,
      records,
      afterText: undefined,
      cardFlipped: false,
    };
    const next = write({ ...save, current: nextCurrent });
    set({ save: next });
    get().continueAfter();
  },

  continueAfter: () => {
    const { save, priors } = get();
    const current = save.current;
    if (!current || current.screen !== "play") return;
    const last = current.index >= current.steps.length - 1;
    if (last) {
      audio.cue("reveal");
      audio.setSection("reveal");
      const next = write(finishSession(save, priors));
      set({ save: next });
      const result = next.current;
      if (result?.mythId && result.question) {
        const session: SessionResult = {
          id: result.sessionId ?? crypto.randomUUID(),
          startedAt: result.startedAt,
          finishedAt: new Date().toISOString(),
          mythId: result.mythId,
          question: result.question,
          weights: asFullWeights(result.weights),
          steps: result.records,
        };
        const withHistory = write({
          ...next,
          history: [...next.history, session].slice(-40),
        });
        set({ save: withHistory });
        void recordPlay({
          data: {
            id: session.id,
            mythId: session.mythId,
            weights: session.weights,
            steps: session.steps,
          },
        }).then(() => get().refreshPriors()).catch(() => undefined);
        void saveJournal({ data: session }).catch(() => undefined);
      }
      return;
    }
    audio.cue("step");
    const next = write({
      ...save,
      current: {
        ...current,
        index: current.index + 1,
        afterText: undefined,
        cardFlipped: false,
      },
    });
    set({ save: next });
  },

  toQuestion: () => {
    const { save } = get();
    if (!save.current) return;
    audio.setSection("question");
    const next = write({
      ...save,
      current: { ...save.current, screen: "question" },
    });
    set({ save: next });
  },

  toAfter: () => {
    const { save } = get();
    if (!save.current) return;
    audio.setSection("quiet");
    const next = write({
      ...save,
      current: { ...save.current, screen: "after" },
    });
    set({ save: next });
  },

  abandon: () => {
    audio.setSection("threshold");
    const next = write({ ...get().save, current: undefined });
    set({ save: next });
  },

  stepBack: () => {
    const { save } = get();
    const current = save.current;
    if (!current) return;
    if (current.screen !== "play") {
      get().abandon();
      return;
    }
    if (current.cardFlipped) {
      const next = write({
        ...save,
        current: { ...current, cardFlipped: false },
      });
      set({ save: next });
      return;
    }
    if (current.index <= 0) {
      get().abandon();
      return;
    }
    const records = current.records.slice(0, -1);
    let weights = emptyWeights();
    for (const record of records) {
      const step = current.steps.find(
        (s) => s.kind === record.kind && s.id === record.itemId,
      );
      if (step) weights = addWeights(weights, resolveChoiceWeights(step, record.choice));
    }
    const next = write({
      ...save,
      current: {
        ...current,
        index: current.index - 1,
        records,
        weights,
        afterText: undefined,
        cardFlipped: false,
      },
    });
    set({ save: next });
  },

  finishArcade: (weights, records, signs = [], trail = []) => {
    const { save, priors } = get();
    if (!save.current) return;
    const nextSave = {
      ...save,
      current: { ...save.current, weights, records },
    };
    audio.cue("reveal");
    audio.setSection("reveal");
    const finished = write(finishSession(nextSave, priors));
    set({ save: finished });
    const result = finished.current;
    if (result?.mythId && result.question) {
      const session: SessionResult = {
        id: result.sessionId ?? crypto.randomUUID(),
        startedAt: result.startedAt,
        finishedAt: new Date().toISOString(),
        mythId: result.mythId,
        question: result.question,
        weights: asFullWeights(result.weights),
        steps: result.records,
        signs,
      };
      const shelf = [...new Set([...finished.signs, ...signs])];
      const ghost = trail.filter((_, i) => i % 4 === 0).slice(-48);
      const seals =
        signs.length >= 4 && finished.current?.records.some((r) => r.choice === "return")
          ? [...new Set([...finished.seals, "aperture" as const])]
          : finished.seals;
      const withHistory = write({
        ...finished,
        signs: shelf,
        seals,
        lastTrail: ghost,
        lastKept: signs[0],
        history: [...finished.history, session].slice(-40),
      });
      set({ save: withHistory });
      void recordPlay({
        data: {
          id: session.id,
          mythId: session.mythId,
          weights: session.weights,
          steps: session.steps,
        },
      })
        .then(() => get().refreshPriors())
        .catch(() => undefined);
      void saveJournal({ data: session }).catch(() => undefined);
    }
  },

  setMuted: (muted) => {
    audio.setMuted(muted);
    const next = write({ ...get().save, muted });
    set({ save: next });
  },

  setBirth: (date, time, place, use) => {
    const birth = date
      ? { date, time: time || undefined, place: place || undefined }
      : undefined;
    const next = write({ ...get().save, birth, usePattern: use && Boolean(date) });
    set({ save: next });
  },

  markOmen: (omenId, response) => {
    const { save } = get();
    const date = new Date().toISOString().slice(0, 10);
    const omens = save.omens.filter((o) => o.date !== date);
    omens.push({ date, omenId, response });
    const next = write({ ...save, omens });
    set({ save: next });
    void recordOmen({ data: { omenId, response } }).catch(() => undefined);
  },
}));

export function currentScreen(save: SaveState): Screen {
  return screenOf(save);
}

export function livingMyth(save: SaveState) {
  const id = save.current?.mythId;
  return id ? MYTH_BY_ID[id] : undefined;
}
