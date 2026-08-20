import type { PathFork } from "./types";

export const PATHS: PathFork[] = [
  {
    id: "ford",
    prompt: "The water is faster than it looked from the hill.",
    left: { label: "I find a shallower place", weights: { craft: 2, quest: 1 } },
    center: { label: "I wade in here", weights: { threshold: 2, descent: 1 } },
    right: { label: "I sit until the current changes", weights: { devotion: 2, shadow: 1 } },
  },
  {
    id: "temple",
    prompt: "Three doors in a wall that has no windows. Incense, or dust, or both.",
    left: { label: "The door with a mark I recognize", weights: { return: 2, craft: 1 } },
    center: { label: "The unmarked door", weights: { threshold: 2, quest: 1 } },
    right: { label: "I do not enter. I walk the wall.", weights: { sovereignty: 2, shadow: 1 } },
  },
  {
    id: "ridge",
    prompt: "The path splits on a spine of stone. Weather on the left, weather on the right, a cairn in the middle.",
    left: { label: "The windward face", weights: { quest: 2, sovereignty: 1 } },
    center: { label: "I add a stone and rest", weights: { devotion: 1, craft: 1, threshold: 1 } },
    right: { label: "The sheltered descent", weights: { descent: 2, return: 1 } },
  },
  {
    id: "market",
    prompt: "A night market. Someone is selling a name. Someone else is giving water away.",
    left: { label: "I buy the name", weights: { trickster: 2, sovereignty: 1 } },
    center: { label: "I take the water", weights: { devotion: 2, eros: 1 } },
    right: { label: "I pass through without stopping", weights: { quest: 1, craft: 1, shadow: 1 } },
  },
  {
    id: "garden",
    prompt: "A walled garden at the wrong hour. Fruit. A locked shed. A bench that has been waiting.",
    left: { label: "I pick what is ripe", weights: { eros: 2, sovereignty: 1 } },
    center: { label: "I sit on the bench", weights: { threshold: 2, return: 1 } },
    right: { label: "I try the shed", weights: { shadow: 2, craft: 1 } },
  },
  {
    id: "shore",
    prompt: "A boat, a road inland, the long curve of the beach. Dawn is a rumor.",
    left: { label: "I take the boat", weights: { quest: 2, trickster: 1 } },
    center: { label: "I walk the waterline", weights: { eros: 1, threshold: 2 } },
    right: { label: "I go inland", weights: { return: 2, craft: 1 } },
  },
  {
    id: "stair",
    prompt: "A stair that goes up into dark and down into a cooler dark. A landing with a window.",
    left: { label: "I climb", weights: { quest: 2, sovereignty: 1 } },
    center: { label: "I stay at the window", weights: { craft: 1, threshold: 2 } },
    right: { label: "I go down", weights: { descent: 2, shadow: 1 } },
  },
  {
    id: "lanterns",
    prompt: "Three lanterns on a fork. One gold, one teal, one unlit.",
    left: { label: "I follow the gold", weights: { eros: 2, devotion: 1 } },
    center: { label: "I follow the teal", weights: { craft: 1, threshold: 2 } },
    right: { label: "I take the unlit path and carry my own", weights: { sovereignty: 2, quest: 1 } },
  },
];

export const PATH_BY_ID = Object.fromEntries(PATHS.map((p) => [p.id, p]));
