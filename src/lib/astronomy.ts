import type { Weights } from "./types";

export type MoonName =
  | "new"
  | "waxing crescent"
  | "first quarter"
  | "waxing gibbous"
  | "full"
  | "waning gibbous"
  | "last quarter"
  | "waning crescent";

export type Element = "fire" | "earth" | "air" | "water";

export type SunSign = {
  name: string;
  element: Element;
  modality: "cardinal" | "fixed" | "mutable";
};

const SIGNS: SunSign[] = [
  { name: "Aries", element: "fire", modality: "cardinal" },
  { name: "Taurus", element: "earth", modality: "fixed" },
  { name: "Gemini", element: "air", modality: "mutable" },
  { name: "Cancer", element: "water", modality: "cardinal" },
  { name: "Leo", element: "fire", modality: "fixed" },
  { name: "Virgo", element: "earth", modality: "mutable" },
  { name: "Libra", element: "air", modality: "cardinal" },
  { name: "Scorpio", element: "water", modality: "fixed" },
  { name: "Sagittarius", element: "fire", modality: "mutable" },
  { name: "Capricorn", element: "earth", modality: "cardinal" },
  { name: "Aquarius", element: "air", modality: "fixed" },
  { name: "Pisces", element: "water", modality: "mutable" },
];

/** Approximate tropical sun longitude in degrees (good to ~1°). */
export function sunLongitude(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const day =
    (Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
      start) /
    86400000;
  const deg = (280.46 + 0.9856474 * day) % 360;
  return deg < 0 ? deg + 360 : deg;
}

export function sunSignFromDate(date: Date): SunSign {
  const lon = sunLongitude(date);
  const idx = Math.floor(lon / 30) % 12;
  return SIGNS[idx] ?? SIGNS[0]!;
}

export function julianDay(date: Date) {
  return date.getTime() / 86400000 + 2440587.5;
}

/** 0 = new, 0.5 = full. */
export function moonPhase(date: Date) {
  const synodic = 29.530588853;
  const knownNew = 2451550.1;
  let p = (julianDay(date) - knownNew) / synodic;
  p = p - Math.floor(p);
  if (p < 0) p += 1;
  return p;
}

export function moonName(date: Date): MoonName {
  const p = moonPhase(date);
  const i = Math.floor(p * 8 + 0.5) % 8;
  const names: MoonName[] = [
    "new",
    "waxing crescent",
    "first quarter",
    "waxing gibbous",
    "full",
    "waning gibbous",
    "last quarter",
    "waning crescent",
  ];
  return names[i]!;
}

export function moonWeather(name: MoonName) {
  switch (name) {
    case "new":
      return "A new moon is a dark clock. The omen is a first mark on a blank page.";
    case "waxing crescent":
      return "A crescent is a beginning you can already see.";
    case "first quarter":
      return "A first-quarter moon is a sky half lit. The day is already in motion.";
    case "waxing gibbous":
      return "The light is filling. The omen may ask more of you than a thin moon would.";
    case "full":
      return "A full moon is glare as much as gift. Some truths need a softer hour.";
    case "waning gibbous":
      return "The light is leaving. What you keep now is a choice.";
    case "last quarter":
      return "A last-quarter moon is release weather. Something can be put down.";
    case "waning crescent":
      return "A thin leftover light. The omen is small on purpose.";
  }
}

export function moonBucket(date: Date): "new" | "waxing" | "full" | "waning" {
  const name = moonName(date);
  if (name === "new") return "new";
  if (name === "full") return "full";
  if (name.includes("waxing") || name === "first quarter") return "waxing";
  return "waning";
}

export function seasonFromDate(date: Date) {
  const m = date.getUTCMonth();
  if (m === 11 || m < 2) return "winter";
  if (m < 5) return "spring";
  if (m < 8) return "summer";
  return "autumn";
}

export function weekdayWord(date: Date) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()]!;
}

export function birthBoostFromSign(sign: SunSign, moon: MoonName): Weights {
  const byElement: Record<Element, Weights> = {
    fire: { quest: 1.2, sovereignty: 0.8 },
    earth: { craft: 1.2, devotion: 0.8 },
    air: { trickster: 1, threshold: 1 },
    water: { descent: 1, eros: 1 },
  };
  const boost: Weights = { ...byElement[sign.element] };
  if (moon === "full") {
    boost.shadow = (boost.shadow ?? 0) + 0.5;
    boost.sovereignty = (boost.sovereignty ?? 0) + 0.4;
  }
  if (moon === "new") {
    boost.descent = (boost.descent ?? 0) + 0.5;
    boost.craft = (boost.craft ?? 0) + 0.3;
  }
  return boost;
}
