import type { PlayStep, Scene } from "./types";

export type PlotWalk = {
  id: string;
  name: string;
  night: string;
  scenes: Scene[];
};

export const PLOT_WALKS: PlotWalk[] = [
  {
    id: "sundiata",
    name: "Sundiata",
    night: "A delayed king",
    scenes: [
      {
        id: "sundiata-laugh",
        title: "A laugh becomes a cosmology",
        body: "You are late to walk. Someone laughs. The laugh is not weather. It is a verdict pretending to be a joke. The iron in you has not stood yet.",
        art: "/art/myths/sundiata.jpg",
        choices: [
          { id: "wait", label: "Let the delay be a seed, not a verdict", after: "", weights: { descent: 2, sovereignty: 1 } },
          { id: "rise", label: "Stand, even if the legs have not agreed", after: "", weights: { quest: 2, sovereignty: 2 } },
          { id: "hear", label: "Hear the laugh without making it a god", after: "", weights: { shadow: 2, trickster: 1 } },
        ],
      },
      {
        id: "sundiata-exile",
        title: "The road that is not yet a throne",
        body: "Exile is a long tutorial. Helpers arrive who do not need you to be a king yet. The griot keeps the name when you cannot.",
        art: "/art/scene-wood.jpg",
        choices: [
          { id: "accept", label: "Accept help without making it a humiliation", after: "", weights: { devotion: 2, craft: 1 } },
          { id: "alone", label: "Walk as if the name were already enough", after: "", weights: { sovereignty: 2, shadow: 1 } },
          { id: "listen", label: "Let someone else keep the story a while", after: "", weights: { craft: 2, return: 1 } },
        ],
      },
      {
        id: "sundiata-return",
        title: "The iron remembers",
        body: "Return is not revenge dressed as destiny. It is a delayed body arriving in time. A people is not a prize screen.",
        art: "/art/scene-door.jpg",
        choices: [
          { id: "rule", label: "Take the seat and keep the delay in it", after: "", weights: { sovereignty: 3, return: 2 } },
          { id: "share", label: "Give the name back to those who carried it", after: "", weights: { devotion: 2, return: 2 } },
          { id: "look", label: "Look at the one who laughed, and do not become the laugh", after: "", weights: { shadow: 1, sovereignty: 2, return: 1 } },
        ],
      },
    ],
  },
  {
    id: "arjuna",
    name: "Arjuna",
    night: "The chariot as a pause",
    scenes: [
      {
        id: "arjuna-field",
        title: "Cousins in the dust",
        body: "The bow is ready. The field is family. No walkthrough covers this. A pause sits in the chariot like a third person.",
        art: "/art/myths/arjuna.jpg",
        choices: [
          { id: "drop", label: "Lower the bow", after: "", weights: { descent: 2, shadow: 1, eros: 1 } },
          { id: "ask", label: "Ask the pause what it wants", after: "", weights: { threshold: 2, quest: 1 } },
          { id: "old", label: "Fight the old war anyway", after: "", weights: { quest: 2, shadow: 2 } },
        ],
      },
      {
        id: "arjuna-talk",
        title: "A conversation, not a pep talk",
        body: "The voice beside you does not make the killing pretty. It asks what you are, in the middle of a duty you cannot decorate.",
        art: "/art/scene-fire.jpg",
        choices: [
          { id: "hear", label: "Stay in the pause until a question arrives", after: "", weights: { craft: 2, threshold: 2 } },
          { id: "duty", label: "Take up the work without a speech", after: "", weights: { quest: 2, sovereignty: 1 } },
          { id: "refuse", label: "Refuse a cosmology that needs this field", after: "", weights: { shadow: 2, sovereignty: 2 } },
        ],
      },
      {
        id: "arjuna-bow",
        title: "The bow, in daylight",
        body: "Action after looking is not the same as action instead of looking. The field is still a field.",
        art: "/art/scene-well.jpg",
        choices: [
          { id: "act", label: "Act, having seen", after: "", weights: { quest: 2, return: 2, craft: 1 } },
          { id: "lay", label: "Lay the bow down in public", after: "", weights: { sovereignty: 2, eros: 1, return: 1 } },
          { id: "carry", label: "Carry the pause into the next hour", after: "", weights: { devotion: 2, return: 2 } },
        ],
      },
    ],
  },
  {
    id: "scheherazade",
    name: "Scheherazade",
    night: "The last night, unfinished",
    scenes: [
      {
        id: "scheherazade-volunteer",
        title: "You volunteer",
        body: "A knife has become a calendar. You walk toward it with a story instead of a plea. Dawn is the only judge.",
        art: "/art/myths/scheherazade.jpg",
        choices: [
          { id: "open", label: "Open a tale and leave a door ajar", after: "", weights: { craft: 3, trickster: 1 } },
          { id: "name", label: "Name the knife as a habit, not a fate", after: "", weights: { sovereignty: 2, shadow: 1 } },
          { id: "sleep", label: "Ask for one night of ordinary sleep", after: "", weights: { eros: 2, return: 1 } },
        ],
      },
      {
        id: "scheherazade-ajar",
        title: "Curiosity instead of blood",
        body: "The listener is still a king. The tale is still unfinished. You are not only a wife delaying a knife. You are a maker of time.",
        art: "/art/scene-chair.jpg",
        choices: [
          { id: "continue", label: "Continue, and stop before the end", after: "", weights: { craft: 2, threshold: 2 } },
          { id: "face", label: "Look at the listener as a person, not a plot", after: "", weights: { eros: 2, return: 1 } },
          { id: "end", label: "End the tale and take the morning", after: "", weights: { sovereignty: 2, shadow: 1 } },
        ],
      },
      {
        id: "scheherazade-dawn",
        title: "A thousand and one",
        body: "Dawn, again. The knife has forgotten its job. You may sleep. You may also be only the storyteller. Both are in the room.",
        art: "/art/threshold.jpg",
        choices: [
          { id: "sleep", label: "Sleep. Let the tale rest", after: "", weights: { return: 3, eros: 1 } },
          { id: "keep", label: "Keep telling, now that no one is dying for it", after: "", weights: { craft: 2, devotion: 2 } },
          { id: "leave", label: "Leave the palace with the mornings you bought", after: "", weights: { sovereignty: 2, return: 2 } },
        ],
      },
    ],
  },
];

export const PLOT_SCENES: Scene[] = PLOT_WALKS.flatMap((w) => w.scenes);

export const PLOT_BY_ID = Object.fromEntries(PLOT_WALKS.map((w) => [w.id, w]));

export function buildPlotSequence(id: string): PlayStep[] {
  const walk = PLOT_BY_ID[id];
  if (!walk) return [];
  return walk.scenes.map((s) => ({ kind: "scene" as const, id: s.id }));
}
