import type { OracleCard } from "./types";

export const CARDS: OracleCard[] = [
  {
    id: "aperture",
    name: "The Aperture",
    fragment:
      "A hole in a dark wall, the size of an eye. Light does not flood. It is invited, one question wide.",
    sigil: "aperture",
    toward: { threshold: 2, craft: 1 },
    away: { shadow: 2, descent: 1 },
    rest: { sovereignty: 1 },
  },
  {
    id: "thread",
    name: "The Thread",
    fragment:
      "A gold filament across a palm. Someone has already been through the maze. The gift is not the maze. It is the method.",
    sigil: "thread",
    toward: { craft: 2, devotion: 1, eros: 1 },
    away: { sovereignty: 2 },
    rest: { threshold: 1 },
  },
  {
    id: "moth",
    name: "The Moth",
    fragment:
      "Psychē is soul, and butterfly. The moth is the same word after dark. A small body throws itself at a light it cannot hold. Some call it death. Some call it worship. The card does not decide.",
    sigil: "moth",
    toward: { eros: 2, devotion: 2 },
    away: { sovereignty: 2, craft: 1 },
    rest: { threshold: 1, shadow: 1 },
  },
  {
    id: "well",
    name: "The Well",
    fragment:
      "A circle of dark water that has been thinking longer than you have. To look in is already a kind of drinking.",
    sigil: "well",
    toward: { descent: 2, shadow: 1 },
    away: { quest: 2 },
    rest: { craft: 1, return: 1 },
  },
  {
    id: "key",
    name: "The Key",
    fragment:
      "Cold metal, a bit too ornate. It will open one door and make every other door feel like a mistake.",
    sigil: "key",
    toward: { threshold: 2, sovereignty: 1 },
    away: { devotion: 1, descent: 1 },
    rest: { craft: 1, trickster: 1 },
  },
  {
    id: "mask",
    name: "The Mask",
    fragment:
      "A face that is not a lie so much as a tool. The danger is only if it has grown warmer than your own skin.",
    sigil: "mask",
    toward: { trickster: 2, shadow: 1 },
    away: { eros: 2 },
    rest: { sovereignty: 1, craft: 1 },
  },
  {
    id: "crown",
    name: "The Unworn Crown",
    fragment:
      "Gold, a little dented, left on a stool. Authority as an object you can pick up, or walk past.",
    sigil: "crown",
    toward: { sovereignty: 3 },
    away: { devotion: 2 },
    rest: { threshold: 1, shadow: 1 },
  },
  {
    id: "seed",
    name: "The Seed",
    fragment:
      "Smaller than a fingernail and heavier than an argument. Whatever it becomes will not consult you at every stage.",
    sigil: "seed",
    toward: { craft: 1, return: 2, descent: 1 },
    away: { quest: 1, trickster: 1 },
    rest: { devotion: 1 },
  },
  {
    id: "cup",
    name: "The Cup",
    fragment:
      "A bowl of something sweet that might also be a vow. To drink is to be included. To refuse is also a relationship.",
    sigil: "cup",
    toward: { eros: 2, devotion: 1 },
    away: { sovereignty: 1, shadow: 1 },
    rest: { threshold: 1 },
  },
  {
    id: "blade",
    name: "The Blade",
    fragment:
      "Not raised. Resting. A line that can become a cut or a boundary. The card asks which you have been postponing.",
    sigil: "blade",
    toward: { sovereignty: 2, quest: 1 },
    away: { eros: 1, devotion: 1 },
    rest: { craft: 1, shadow: 1 },
  },
  {
    id: "serpent",
    name: "The Serpent",
    fragment:
      "A coil of knowledge that will cost a garden. Shedding is not death. It only feels like it from inside the old skin.",
    sigil: "serpent",
    toward: { shadow: 2, craft: 1, threshold: 1 },
    away: { return: 1, devotion: 1 },
    rest: { descent: 1 },
  },
  {
    id: "boat",
    name: "The Boat",
    fragment:
      "A hull, a rope, no crew listed. Home is a direction, not a guarantee. The sea does not care about your itinerary.",
    sigil: "boat",
    toward: { quest: 2, return: 1 },
    away: { craft: 1, sovereignty: 1 },
    rest: { threshold: 1, descent: 1 },
  },
  {
    id: "bridge",
    name: "The Bridge",
    fragment:
      "Boards over a distance that would like to remain a distance. Crossing is a politics of the body. So is not crossing.",
    sigil: "bridge",
    toward: { threshold: 2, eros: 1, quest: 1 },
    away: { shadow: 1, descent: 1 },
    rest: { devotion: 1 },
  },
  {
    id: "scale",
    name: "The Scale",
    fragment:
      "A feather on one side. A heart on the other. The card is not a verdict. It is the invitation to become light enough.",
    sigil: "scale",
    toward: { sovereignty: 1, craft: 1, threshold: 2 },
    away: { trickster: 2 },
    rest: { devotion: 1 },
  },
  {
    id: "flame",
    name: "The Stolen Flame",
    fragment:
      "Heat that was not supposed to be yours. Civilization in a fennel stalk. The liver is a later question.",
    sigil: "flame",
    toward: { craft: 2, devotion: 1, sovereignty: 1 },
    away: { return: 1, eros: 1 },
    rest: { shadow: 1 },
  },
  {
    id: "moon",
    name: "The Moon’s Hour",
    fragment:
      "A face that changes and calls it honesty. What is full in you will wane. What is dark in you is not empty.",
    sigil: "moon",
    toward: { descent: 1, return: 2, eros: 1 },
    away: { quest: 1, sovereignty: 1 },
    rest: { craft: 1 },
  },
  {
    id: "owl",
    name: "The Owl",
    fragment:
      "A cool mind in a hot wood. Seeing in the dark is a craft. So is not confusing night-vision with a lack of feeling.",
    sigil: "owl",
    toward: { craft: 2, sovereignty: 1 },
    away: { eros: 1, trickster: 1 },
    rest: { threshold: 1, shadow: 1 },
  },
  {
    id: "bone",
    name: "The Bone",
    fragment:
      "What remains when the story has been eaten. Not morbid: structural. The next life will have to be built on this.",
    sigil: "bone",
    toward: { descent: 2, shadow: 2 },
    away: { eros: 1, quest: 1 },
    rest: { craft: 1, sovereignty: 1 },
  },
];

export const CARD_BY_ID = Object.fromEntries(CARDS.map((c) => [c.id, c]));

export const SIGN_WEATHER: Record<string, string> = {
  seed: "seed",
  key: "key",
  thread: "thread",
  cup: "cup",
  stone: "bone",
  mirror: "scale",
  box: "well",
  gap: "aperture",
  return: "bridge",
  lamp: "moth",
  well: "well",
  thrust: "moth",
};

export type Weather = { name: string; line: string; cardId: string };

export type Look = { cardId: string; choice: "toward" | "away" | "rest" };

/** Card → gold in the field. A looking tugs the next orbit. */
export const CARD_SIGN: Record<string, string> = {
  seed: "seed",
  key: "key",
  thread: "thread",
  cup: "cup",
  bone: "stone",
  scale: "mirror",
  well: "box",
  aperture: "key",
  moth: "cup",
  flame: "cup",
  bridge: "thread",
};

export function lookWeather(look: Look): Weather | null {
  const card = CARD_BY_ID[look.cardId];
  if (!card) return null;
  const line =
    look.choice === "toward"
      ? "Taken. The lamp pulls a little more."
      : look.choice === "away"
        ? "Left. The seam is a little wider."
        : "Held. The first ellipse wants to close.";
  return { name: card.name, line, cardId: card.id };
}

export function weatherFor(event: string): Weather | null {
  const cardId = SIGN_WEATHER[event];
  if (!cardId) return null;
  const card = CARD_BY_ID[cardId];
  if (!card) return null;
  return { name: card.name, line: card.fragment, cardId: card.id };
}

