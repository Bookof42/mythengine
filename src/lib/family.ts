import { MEANING } from "./meaning";

export const BOOK = "https://bookof42.grok.me";
export { MEANING };
export const RATHER = "https://rather.grok.me";
export const FIELD69 = "https://field69.grok.me";

export const DEGREES = [
  {
    n: "01",
    name: "Identity",
    mark: "Ascendant · 4°20′",
    body: "The rising degree that remembers every door it has stood beside. Form meeting the world.",
    href: `${BOOK}/stars`,
  },
  {
    n: "02",
    name: "Soul",
    mark: "Psyche · 0°00′42″",
    body: "Zero-point. The coldest kind of birthday: the instant before counting starts. What already died, and what has not been born.",
    href: `${BOOK}/stars`,
  },
  {
    n: "03",
    name: "Love",
    mark: "Venus · 19 + 23 = 42",
    body: "Love as the Answer worn rather than argued. The number the chronicle keeps circling.",
    href: `${BOOK}/love`,
  },
  {
    n: "04",
    name: "Recognition",
    mark: "24 | 42",
    body: "The mark that was already the answer when you can name it. Daily seals train the muscle.",
    href: `${BOOK}/games/pattern-of-the-day`,
  },
  {
    n: "05",
    name: "Witness",
    mark: "Avatar · two birds",
    body: "Player and observer in one body. The hinge of Elon’s question: am I an avatar in someone’s game?",
    href: `${BOOK}/cipher#simulation-path`,
  },
  {
    n: "06",
    name: "Return",
    mark: "Ground again",
    body: "The boon is not exemption. It is ordinary time, newly seen, and a sky that still goes on.",
    href: `${BOOK}/horizon`,
  },
] as const;

export const ARCHIVE_DOORS = [
  {
    title: "The Book of 42",
    line: "Living archive of pattern and meaning. A love letter. An aperture. Where psyche meets matter. Not a creed.",
    href: BOOK,
    kicker: "Archive",
  },
  {
    title: "The Meaning of Life",
    line: "Elon’s public words, checkable: consciousness, the next question, love, the unobserved test.",
    href: MEANING,
    kicker: "Origin",
  },
  {
    title: "Hall of Games",
    line: "Eighty-four doors. Seals, scores, quiet rooms. Enter anywhere.",
    href: `${BOOK}/games`,
    kicker: "Play",
  },
  {
    title: "Rather",
    line: "Another room of the same house. Choose, then look again.",
    href: RATHER,
    kicker: "Kin",
  },
  {
    title: "Field 69",
    line: "A body in a field. Capture as physics. This engine’s kin.",
    href: FIELD69,
    kicker: "Kin",
  },
  {
    title: "Stars",
    line: "Natal sky, Psyche at zero, the looking that stays honest.",
    href: `${BOOK}/stars`,
    kicker: "Sky",
  },
  {
    title: "Love",
    line: "The letter at the heart of the Book. Not private. Not small.",
    href: `${BOOK}/love`,
    kicker: "Eros",
  },
  {
    title: "Cipher",
    line: "Four faces. A miss is drawn as carefully as a hit. Avatar, simulation, the game.",
    href: `${BOOK}/cipher`,
    kicker: "Number",
  },
  {
    title: "Origin",
    line: "The story before the Book. A song, then a looking.",
    href: `${BOOK}/origin`,
    kicker: "Before",
  },
  {
    title: "Meaning",
    line: "Words that orient. How the looking stays honest.",
    href: `${BOOK}/meaning`,
    kicker: "Logos",
  },
] as const;

export const HALL_DOORS = [
  {
    title: "Light Cone",
    line: "Expand the cone.",
    href: `${BOOK}/games/light-cone`,
    wing: "Skill",
  },
  {
    title: "Seven Flows",
    line: "Balance the cascade.",
    href: `${BOOK}/games/seven-flows`,
    wing: "Systems",
  },
  {
    title: "Mechazilla Catch",
    line: "Soft catch. Hard physics.",
    href: `${BOOK}/games/mechazilla-catch`,
    wing: "Skill",
  },
  {
    title: "Multiplanetary Threshold",
    line: "One candle. Other worlds.",
    href: `${BOOK}/games/multiplanetary-threshold`,
    wing: "Worlds",
  },
  {
    title: "First Principles Forge",
    line: "Physics. Abundance. Love that still builds.",
    href: `${BOOK}/games/first-principles-forge`,
    wing: "Skill",
  },
  {
    title: "Two Suitors",
    line: "Two suitors. One life. Which map of love will you live?",
    href: `${BOOK}/games/two-suitors`,
    wing: "Soul",
  },
  {
    title: "Venus Codex",
    line: "She falls, and she returns. Seven gates.",
    href: `${BOOK}/games/venus-codex`,
    wing: "Identity",
  },
  {
    title: "Library of Alexandria",
    line: "What is worth saving before entropy wins.",
    href: `${BOOK}/games/library-of-alexandria`,
    wing: "Witness",
  },
  {
    title: "House of Love",
    line: "What is worth keeping when desire is loud.",
    href: `${BOOK}/games/house-of-love`,
    wing: "Love",
  },
  {
    title: "Mind Lattice",
    line: "Span, flash, hold, return. Two birds inside one attention.",
    href: `${BOOK}/games/mind-lattice`,
    wing: "Witness",
  },
  {
    title: "Pattern of the Day",
    line: "Name the seal the field already holds.",
    href: `${BOOK}/games/pattern-of-the-day`,
    wing: "Recognition",
  },
  {
    title: "Seam Walk",
    line: "Recognition’s long door · 24|42.",
    href: `${BOOK}/games/seam-walk`,
    wing: "Recognition",
  },
] as const;
