export const SIGNS = [
  "seed",
  "key",
  "thread",
  "cup",
  "stone",
  "mirror",
  "box",
] as const;

export type SignKind = (typeof SIGNS)[number];

export const SIGN = {
  seed: {
    title: "Seed",
    line: "Psyche's grain. Coelho's ordinary work. The ellipse steadies.",
    earn: "Taken from orbit.",
  },
  key: {
    title: "Key",
    line: "Campbell's threshold. The gap remembers you.",
    earn: "Taken from orbit.",
  },
  thread: {
    title: "Thread",
    line: "Ariadne. Hillman: the path can be seen.",
    earn: "Taken from orbit.",
  },
  cup: {
    title: "Cup",
    line: "Oil. You can bear periapsis without falling.",
    earn: "Taken from orbit.",
  },
  stone: {
    title: "Stone",
    line: "A pebble from the desert. The ring hurts less.",
    earn: "Taken from orbit.",
  },
  mirror: {
    title: "Mirror",
    line: "You see the moth and the lamp in one frame.",
    earn: "Taken from orbit.",
  },
  box: {
    title: "Box",
    line: "Psyche's casket. It waits at the mouth of the well.",
    earn: "Taken after descent.",
  },
} as const;

export const SEALS = ["aperture"] as const;
export type SealKind = (typeof SEALS)[number];

export const SEAL = {
  aperture: {
    title: "Aperture",
    line: "Return carrying four signs. The 42 seal.",
  },
} as const;

export function emptyHeld(): Record<SignKind, boolean> {
  return {
    seed: false,
    key: false,
    thread: false,
    cup: false,
    stone: false,
    mirror: false,
    box: false,
  };
}

export function carried(held: Record<SignKind, boolean>): SignKind[] {
  return SIGNS.filter((k) => held[k]);
}
