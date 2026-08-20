import type { Scene } from "./types";
import { CARDS } from "./cards";
import { pickOne, seededRandom } from "./utils";

export type PsycheBeat = {
  id: string;
  beat: string;
  gameWord: string;
  scene: Scene;
};

export const PSYCHE_STATIONS: PsycheBeat[] = [
  {
    id: "psyche-palace",
    beat: "Conditions",
    gameWord: "Rules",
    scene: {
      id: "psyche-palace",
      title: "A palace, and no map",
      body: "You wake inside a life already made: food, music, a bed that knows you. By night the beloved comes. By day he is gone. This is the known world. The god has not yet shown a face. The adventure waits in the one rule you have been given: do not look.",
      art: "/art/myths/psyche.jpg",
      choices: [
        {
          id: "receive",
          label: "Receive the palace without asking its name",
          after: "The rooms keep arriving. Wonder is a kind of consent.",
          weights: { eros: 2, devotion: 1, threshold: 1 },
        },
        {
          id: "inventory",
          label: "Walk the rooms and count what is yours",
          after: "Silk, fruit, a window that does not open onto a street you know. Inventory is not ingratitude. It is the beginning of a self.",
          weights: { craft: 2, sovereignty: 1 },
        },
        {
          id: "ask",
          label: "Ask, in the dark, who is here",
          after: "The answer is a hand. Not a face. The game has not yet told you it is a game.",
          weights: { quest: 1, eros: 2, threshold: 1 },
        },
      ],
    },
  },
  {
    id: "psyche-prohibition",
    beat: "Prohibition",
    gameWord: "Quest",
    scene: {
      id: "psyche-prohibition",
      title: "Do not look",
      body: "A rule arrives the way weather does: already true before you were briefed. You may have everything except a face. Love, for now, is a voice and a weight on the sheets. The lamp is in the room. It has not yet become a plot.",
      art: "/art/hero.jpg",
      choices: [
        {
          id: "keep",
          label: "Keep the dark as a vow",
          after: "Some knowledge is a later room. You stay in this one on purpose.",
          weights: { devotion: 3, eros: 1 },
        },
        {
          id: "test",
          label: "Test the edge of the rule with a question",
          after: "The prohibition does not argue. It simply remains, which is how rules become fate.",
          weights: { craft: 1, threshold: 2, trickster: 1 },
        },
        {
          id: "resent",
          label: "Resent being loved where you cannot see",
          after: "The resentment is information. Unconscious love is still love. It is not the same as being met.",
          weights: { shadow: 2, sovereignty: 1, eros: 1 },
        },
      ],
    },
  },
  {
    id: "psyche-lamp",
    beat: "The lamp",
    gameWord: "Failure",
    scene: {
      id: "psyche-lamp",
      title: "Oil, a flame",
      body: "Voices from the old life plant a story: monster, trick, you are a fool in a beautiful prison. Night comes. The lamp is in your hand. In Apuleius this is the crisis. In a game it is the tutorial you were never given, taken by force.",
      art: "/art/omen.jpg",
      choices: [
        {
          id: "lift",
          label: "Lift the lamp",
          after: "Gold, wings, a face. Hot oil. He wakes. Looking is not free. It is how soul begins.",
          weights: { eros: 2, shadow: 1, threshold: 2, craft: 1 },
        },
        {
          id: "almost",
          label: "Light it, then set it down unlifted",
          after: "The flame exists. You do not use it. Some almosts are wisdom. Some are delay wearing a veil.",
          weights: { shadow: 1, devotion: 2, craft: 1 },
        },
        {
          id: "refuse",
          label: "Refuse the old voices and keep the dark",
          after: "You protect the spell. You also postpone becoming someone who can love with the light on.",
          weights: { devotion: 2, descent: 1 },
        },
      ],
    },
  },
  {
    id: "psyche-loss",
    beat: "Loss",
    gameWord: "Inventory",
    scene: {
      id: "psyche-loss",
      title: "He flees",
      body: "The palace is a field. The voice is gone. What remains is not a prize screen. It is a list: a burned hand, a name you now know, a love that will not continue as a secret. You are holding what the night left behind.",
      art: "/art/myths/orpheus.jpg",
      choices: [
        {
          id: "follow",
          label: "Follow the wound",
          after: "Direction returns as longing. The quest was never the palace. The quest is the face, in daylight.",
          weights: { quest: 3, eros: 2 },
        },
        {
          id: "grieve",
          label: "Sit with the empty rooms until they are empty",
          after: "Grief is not the opposite of the walk. It is the walk’s first honest inventory.",
          weights: { descent: 2, shadow: 1, devotion: 1 },
        },
        {
          id: "blame",
          label: "Blame the looking",
          after: "You may be right. You may also be protecting a smaller life that wanted to stay unlit.",
          weights: { shadow: 2, trickster: 1 },
        },
      ],
    },
  },
  {
    id: "psyche-tasks",
    beat: "Impossible tasks",
    gameWord: "Boss",
    scene: {
      id: "psyche-tasks",
      title: "Aphrodite’s assignments",
      body: "Sort the seeds. Fetch the golden wool. Fill a jar from a river that hates you. Beauty from the underworld. No one offers a walkthrough. The tasks are not punishments so much as the curriculum of becoming someone who can bear what they have seen.",
      art: "/art/myths/inanna.jpg",
      choices: [
        {
          id: "begin",
          label: "Begin the work you cannot finish alone",
          after: "Hands in the grain. The pile does not care about your dignity. Soul-making rarely does.",
          weights: { craft: 3, devotion: 1, quest: 1 },
        },
        {
          id: "bargain",
          label: "Bargain the tasks down to something reasonable",
          after: "The goddess of the plot does not do reasonable. Initiation that fits your schedule is a hobby.",
          weights: { trickster: 2, sovereignty: 1 },
        },
        {
          id: "refuse-task",
          label: "Refuse to be trained by the one who hates you",
          after: "A fair protest. The work may still be yours, even if the examiner is unkind.",
          weights: { sovereignty: 2, shadow: 1 },
        },
      ],
    },
  },
  {
    id: "psyche-helpers",
    beat: "Helpers",
    gameWord: "Party",
    scene: {
      id: "psyche-helpers",
      title: "Ants, a reed, an eagle",
      body: "Help arrives from below your pride: insects that can sort, a reed that knows the sheep, a bird that can fly where you cannot. The walker is not solitary. This is a picnic that learned how to travel. Campbell would call them supernatural aid. A game would call them party members.",
      art: "/art/myths/ariadne.jpg",
      choices: [
        {
          id: "accept",
          label: "Accept help without making it a humiliation",
          after: "The ants do not need your myth of self-sufficiency. The pile diminishes.",
          weights: { devotion: 2, craft: 1, return: 1 },
        },
        {
          id: "credit",
          label: "Take the credit so you can keep walking",
          after: "Useful, a little false. Some seasons require a story you can stand in.",
          weights: { trickster: 2, sovereignty: 1, quest: 1 },
        },
        {
          id: "alone",
          label: "Send the helpers away and try to be the only one",
          after: "The seeds remain. Heroism that cannot be helped is often a fear of being seen mid-task.",
          weights: { shadow: 2, sovereignty: 1 },
        },
      ],
    },
  },
  {
    id: "psyche-underworld",
    beat: "Underworld",
    gameWord: "Dungeon",
    scene: {
      id: "psyche-underworld",
      title: "Do not open the box",
      body: "A tower tells you how to go down and come back. Bread for the dog. Coins for the ferryman. A box of beauty you must not open. The last prohibition is the first one, wearing better clothes. You are in the cellar where life is stored.",
      art: "/art/myths/persephone.jpg",
      choices: [
        {
          id: "carry",
          label: "Carry the box closed",
          after: "Discipline as love. The underworld lets you pass because you remembered the instructions.",
          weights: { craft: 2, descent: 2, return: 1 },
        },
        {
          id: "open",
          label: "Open it. You have come too far not to look",
          after: "Sleep, a stolen glance at glory. Even here the lamp-hand remembers itself. Help will have to come from above.",
          weights: { eros: 2, shadow: 2, threshold: 1 },
        },
        {
          id: "empty",
          label: "Go down with nothing extra, not even the errand",
          after: "A different descent: not for a prize, for the fact of below. The dead still want their coins.",
          weights: { descent: 3, shadow: 1 },
        },
      ],
    },
  },
  {
    id: "psyche-return",
    beat: "Return",
    gameWord: "Transform",
    scene: {
      id: "psyche-return",
      title: "With the light on",
      body: "The union that follows is not the palace restored. It is the same love, conscious. Wings, in the old telling, because soul has done the work of becoming visible to itself. You do not get the system explained. You get a life you can inhabit in daylight.",
      art: "/art/threshold.jpg",
      choices: [
        {
          id: "stay",
          label: "Stay, and let the looking be mutual",
          after: "Return is not rewind. It is the same world, newly able to bear a face.",
          weights: { return: 3, eros: 2, devotion: 1 },
        },
        {
          id: "teach",
          label: "Keep the tasks as a craft you can offer",
          after: "The seeds, the wool, the jar: curriculum. Someone else is still in the dark palace.",
          weights: { craft: 2, devotion: 2, return: 1 },
        },
        {
          id: "stars",
          label: "Look up. The story was always larger than the pair",
          after: "Consciousness expanding is not an escape from love. It is love noticing it has a sky.",
          weights: { quest: 2, return: 2, sovereignty: 1 },
        },
      ],
    },
  },
];

export const PSYCHE_SCENES: Scene[] = PSYCHE_STATIONS.map((s) => s.scene);

export const PSYCHE_BY_ID = Object.fromEntries(
  PSYCHE_STATIONS.map((s) => [s.id, s]),
);

export function buildPsycheSequence(
  night: "short" | "long" = "long",
  seed = Date.now() % 2147483646,
) {
  const stations =
    night === "short"
      ? PSYCHE_STATIONS.filter((s) =>
          ["psyche-lamp", "psyche-loss", "psyche-return"].includes(s.id),
        )
      : PSYCHE_STATIONS;
  const earned: Record<string, string> = {
    "psyche-lamp": "flame",
    "psyche-tasks": "seed",
    "psyche-underworld": "well",
  };
  const steps: { kind: "scene" | "card"; id: string }[] = [];
  const gift =
    night === "short" ? pickOne(CARDS, seededRandom(seed)).id : null;
  for (const station of stations) {
    steps.push({ kind: "scene", id: station.id });
    if (night === "short") {
      if (station.id === "psyche-lamp" && gift) {
        steps.push({ kind: "card", id: gift });
      }
    } else {
      const card = earned[station.id];
      if (card) steps.push({ kind: "card", id: card });
    }
  }
  return steps;
}
