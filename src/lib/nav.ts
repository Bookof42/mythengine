import { BOOK, FIELD69, MEANING, RATHER, SOULSQUEST } from "./family";

export const PLAY_LINKS = [
  { to: "/library", label: "Library", line: "Forty-two mirrors." },
] as const;

export const HOUSE_LINKS = [
  { to: "/codex", label: "Codex", line: "Is life a game or a myth." },
  { to: "/bridge", label: "The bridge", line: "The family of 42." },
] as const;

export const HEADER_LINKS = [
  { to: "/library", label: "Library" },
  { to: "/codex", label: "Codex" },
  { to: "/bridge", label: "Bridge" },
] as const;

export const FAMILY_LINKS = [
  { href: BOOK, label: "The Book of 42" },
  { href: MEANING, label: "The Meaning of Life" },
  { href: RATHER, label: "Rather" },
  { href: FIELD69, label: "Field 69" },
  { href: SOULSQUEST, label: "Soul’s Quest" },
] as const;
