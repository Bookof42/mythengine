import type { Scene } from "./types";
import { PSYCHE_SCENES } from "./psyche-quest";

export const SCENES: Scene[] = [
  {
    id: "sea",
    title: "A storm at sea",
    body: "The boat is smaller than the weather. Water comes in green-black sheets. The tiller kicks in your hands as if it had its own opinion.",
    art: "/art/scene-sea.jpg",
    choices: [
      {
        id: "hold",
        label: "I keep the tiller",
        after: "Your arms shake and then they do not. The boat does not thank you. It continues.",
        weights: { sovereignty: 2, quest: 1 },
      },
      {
        id: "below",
        label: "I go below",
        after: "In the dark hull the storm becomes a sound. You wait with whatever is already living in you.",
        weights: { descent: 2, shadow: 1 },
      },
      {
        id: "speak",
        label: "I speak to the storm",
        after: "The weather does not become polite. Something in you, however, is no longer only cargo.",
        weights: { trickster: 1, threshold: 2, eros: 1 },
      },
    ],
  },
  {
    id: "door",
    title: "A locked door",
    body: "The corridor ends in wood older than your errand. A keyhole holds a thin gold light, as if a day were happening on the other side without you.",
    art: "/art/scene-door.jpg",
    choices: [
      {
        id: "knock",
        label: "I knock",
        after: "The knock sounds too loud, then too small. You have announced that you exist.",
        weights: { threshold: 2, quest: 1 },
      },
      {
        id: "wait",
        label: "I wait without knocking",
        after: "Minutes. The light in the keyhole does not blink. Patience becomes a kind of knocking.",
        weights: { devotion: 2, craft: 1 },
      },
      {
        id: "leave",
        label: "I walk away",
        after: "The door keeps its secret. Yours, for once, you keep too.",
        weights: { sovereignty: 1, shadow: 1, return: 1 },
      },
    ],
  },
  {
    id: "coin",
    title: "The last coin",
    body: "A stranger's hands, open. One coin left in the world, or so it feels. Their palms are weather. They do not explain the request.",
    art: "/art/scene-coin.jpg",
    choices: [
      {
        id: "give",
        label: "I give it",
        after: "The coin leaves. Your pocket is a cleared table. Something unclenches that was not about money.",
        weights: { devotion: 2, eros: 1 },
      },
      {
        id: "ask",
        label: "I ask their name first",
        after: "They tell you, or they don't. Either way you have refused to let the moment be only a transaction.",
        weights: { threshold: 2, craft: 1 },
      },
      {
        id: "keep",
        label: "I keep it",
        after: "The hands close without theater. You remain solvent and slightly more alone.",
        weights: { sovereignty: 2, shadow: 1 },
      },
    ],
  },
  {
    id: "well",
    title: "A well at dusk",
    body: "Stone, a circle of dark water, a moon the size of a coin. The courtyard has gone quiet in that way that means it is listening.",
    art: "/art/scene-well.jpg",
    choices: [
      {
        id: "drink",
        label: "I drink",
        after: "It tastes like rain that has been thinking. You are included in the well now.",
        weights: { descent: 1, eros: 1, return: 1 },
      },
      {
        id: "token",
        label: "I drop a token in",
        after: "The sound arrives late, from farther than the masonry should allow.",
        weights: { devotion: 2, threshold: 1 },
      },
      {
        id: "look",
        label: "I look in and do not touch",
        after: "Your face is a rumor on the water. You let it stay a rumor.",
        weights: { shadow: 2, craft: 1 },
      },
    ],
  },
  {
    id: "wood",
    title: "A fork in the woods",
    body: "Two paths around a standing stone. One holds the last gold of the day. The other has already become night. The stone does not vote.",
    art: "/art/scene-wood.jpg",
    choices: [
      {
        id: "lit",
        label: "I take the lit path",
        after: "You can see your feet. You will have to invent the dark later.",
        weights: { quest: 1, return: 1, craft: 1 },
      },
      {
        id: "dark",
        label: "I take the unlit path",
        after: "The trees close. Your other senses, unemployed all afternoon, report for duty.",
        weights: { descent: 2, shadow: 1, threshold: 1 },
      },
      {
        id: "sit",
        label: "I sit with the stone",
        after: "Neither path is offended. For a while you are the third way.",
        weights: { threshold: 2, sovereignty: 1 },
      },
    ],
  },
  {
    id: "letter",
    title: "A letter with no address",
    body: "Wax the color of old honey. No name. It has the weight of a decision someone else already made.",
    art: "/art/scene-letter.jpg",
    choices: [
      {
        id: "open",
        label: "I open it",
        after: "The sentence inside is shorter than you feared and harder than you hoped.",
        weights: { threshold: 2, craft: 1, shadow: 1 },
      },
      {
        id: "keep",
        label: "I keep it sealed",
        after: "It lives in your coat like a quiet animal. Potential remains potential.",
        weights: { shadow: 1, eros: 1, devotion: 1 },
      },
      {
        id: "burn",
        label: "I give it to the fire",
        after: "The wax runs. Whatever it wanted of you will have to find another door.",
        weights: { sovereignty: 2, trickster: 1 },
      },
    ],
  },
  {
    id: "bridge",
    title: "A bridge in fog",
    body: "Boards, a rope rail, a lantern somewhere ahead that may be a star. You cannot see the water. You can hear it thinking.",
    art: "/art/scene-bridge.jpg",
    choices: [
      {
        id: "cross",
        label: "I cross",
        after: "Midspan, there is no country. Then there is a farther country.",
        weights: { quest: 2, threshold: 2 },
      },
      {
        id: "wait",
        label: "I wait for a companion",
        after: "Fog, breath, the idea of another set of feet. Whether they come is a later story.",
        weights: { eros: 1, devotion: 2 },
      },
      {
        id: "back",
        label: "I turn back",
        after: "The known shore is still the known shore. You know what you are not doing.",
        weights: { return: 2, shadow: 1 },
      },
    ],
  },
  {
    id: "chair",
    title: "An empty chair",
    body: "A table set for more than is present. The cup has a gold rim. The chair is pulled out as if someone had meant to sit and then remembered a different life.",
    art: "/art/scene-chair.jpg",
    choices: [
      {
        id: "sit",
        label: "I sit",
        after: "The wood accepts you. Absence makes a little room, then includes you in it.",
        weights: { threshold: 1, sovereignty: 1, return: 1 },
      },
      {
        id: "set",
        label: "I set another place",
        after: "Fork, cloth, the ritual of expecting. The room becomes slightly more future.",
        weights: { devotion: 2, eros: 1 },
      },
      {
        id: "leave",
        label: "I leave it empty",
        after: "Some vacancies are altars. You bow to that without becoming the vacancy.",
        weights: { descent: 1, shadow: 1, craft: 1 },
      },
    ],
  },
  {
    id: "fire",
    title: "A fire going out",
    body: "The last flame is the size of a thought. Smoke the color of wet slate. The room is about to remember it is cold.",
    art: "/art/scene-fire.jpg",
    choices: [
      {
        id: "feed",
        label: "I feed it",
        after: "A stick, a breath. Heat returns like a shy animal. You have taken a side.",
        weights: { devotion: 2, craft: 1, eros: 1 },
      },
      {
        id: "ember",
        label: "I take an ember and go",
        after: "It lives in a cup of ash in your hands. The original hearth becomes history.",
        weights: { quest: 2, threshold: 1 },
      },
      {
        id: "die",
        label: "I let it die",
        after: "Darkness is honest. You stand in a finished thing and do not apologize.",
        weights: { descent: 2, sovereignty: 1 },
      },
    ],
  },
  {
    id: "mirror",
    title: "A mirror that will not show you",
    body: "Glass, a dark oval, a mist that might be teal. Where a face should be, an aperture of light. The wall around it is ordinary, which makes it worse.",
    art: "/art/scene-mirror.jpg",
    choices: [
      {
        id: "look",
        label: "I look anyway",
        after: "You watch a brightness that is not a face. Something in you tries on not being a portrait.",
        weights: { shadow: 2, threshold: 2 },
      },
      {
        id: "cover",
        label: "I cover it",
        after: "Cloth over glass. The room becomes a room again. You will uncover it on a day you choose.",
        weights: { sovereignty: 2, craft: 1 },
      },
      {
        id: "speak",
        label: "I speak to it",
        after: "Your voice comes back thinner, as if it had crossed a border. The light does not interrupt.",
        weights: { trickster: 1, eros: 1, descent: 1 },
      },
    ],
  },
  {
    id: "animal",
    title: "An animal in the road",
    body: "Dusk. Something with eyes the color of the last of the day. It does not startle. It is not lost so much as stationed.",
    art: "/art/scene-wood.jpg",
    choices: [
      {
        id: "stop",
        label: "I stop completely",
        after: "The engine of your errand idles. For a minute the animal is the appointment.",
        weights: { threshold: 2, devotion: 1 },
      },
      {
        id: "follow",
        label: "I follow it",
        after: "Off the road, into a logic that does not use signs. Your shoes learn a different grammar.",
        weights: { quest: 2, trickster: 1, shadow: 1 },
      },
      {
        id: "around",
        label: "I go around and on",
        after: "The eyes stay in the mirror of the day. You keep the hour you had promised someone.",
        weights: { craft: 1, sovereignty: 1, return: 1 },
      },
    ],
  },
  {
    id: "child-stone",
    title: "A stone held out",
    body: "A child, or someone using the size of a child: offers you a river stone as if it were a key. They wait to see whether you understand the game.",
    art: "/art/scene-well.jpg",
    choices: [
      {
        id: "take",
        label: "I take it",
        after: "It is heavier than its size. You have accepted a fact that has not yet explained itself.",
        weights: { threshold: 1, eros: 1, craft: 1 },
      },
      {
        id: "ask",
        label: "I ask what it is",
        after: "They shrug, which is a complete theology. The stone remains a stone, and also not.",
        weights: { craft: 2, trickster: 1 },
      },
      {
        id: "refuse",
        label: "I do not take it",
        after: "They pocket it without insult. Some gifts are allowed to remain with their giver.",
        weights: { sovereignty: 2, shadow: 1 },
      },
    ],
  },
];

export const SCENE_BY_ID: Record<string, Scene> = Object.fromEntries(
  [...SCENES, ...PSYCHE_SCENES].map((s) => [s.id, s]),
);
