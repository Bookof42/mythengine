import { BOOK, FIELD69, MEANING, RATHER } from "./family";

export const PLAY_LINKS = [
  { to: "/library", label: "Library", line: "Forty-two mirrors." },
  { to: "/omen", label: "Omen", line: "A daily aperture." },
] as const;

export const HOUSE_LINKS = [
  { to: "/codex", label: "Codex", line: "Is life a game or a myth." },
  { to: "/bridge", label: "The bridge", line: "The family of 42." },
] as const;

export const HEADER_LINKS = [
  { to: "/library", label: "Library" },
  { to: "/codex", label: "Codex" },
  { to: "/bridge", label: "Bridge" },
  { to: "/omen", label: "Omen" },
] as const;

export const FAMILY_LINKS = [
  { href: BOOK, label: "The Book of 42" },
  { href: MEANING, label: "themeaningoflife" },
  { href: RATHER, label: "rather" },
  { href: FIELD69, label: "field69" },
] as const;
