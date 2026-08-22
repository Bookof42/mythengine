export type DiagramKind = "path" | "triptych" | "spine" | "ladder" | "ring" | "maze";

export type MythFace = {
  quote: string;
  core: string;
  beats: string[];
  practice: string;
};

const KINDS: DiagramKind[] = ["triptych", "path", "ring", "ladder", "spine"];

/** Varied on purpose. Neighboring tales should not share a mouth. */
const DIAGRAM: Record<string, DiagramKind> = {
  persephone: "maze",
  psyche: "path",
  odysseus: "ring",
  ariadne: "maze",
  orpheus: "maze",
  prometheus: "maze",
  athena: "ring",
  dionysus: "path",
  odin: "maze",
  freyja: "ring",
  loki: "spine",
  sigurd: "path",
  isis: "ring",
  osiris: "ladder",
  thoth: "ring",
  maat: "maze",
  anansi: "path",
  sundiata: "triptych",
  makeda: "ring",
  chameleon: "path",
  amaterasu: "maze",
  momotaro: "path",
  weaver: "maze",
  nuwa: "triptych",
  "crane-wife": "ladder",
  sita: "spine",
  arjuna: "path",
  draupadi: "maze",
  hanuman: "ring",
  savitri: "ladder",
  quetzalcoatl: "spine",
  ixchel: "path",
  brigid: "triptych",
  salmon: "ring",
  blodeuwedd: "ladder",
  cuchulainn: "spine",
  inanna: "maze",
  gilgamesh: "triptych",
  raven: "ring",
  sedna: "maze",
  maui: "spine",
  scheherazade: "maze",
};

export function diagramOf(id: string): DiagramKind {
  if (DIAGRAM[id]) return DIAGRAM[id]!;
  let n = 0;
  for (const c of id) n += c.charCodeAt(0);
  return KINDS[n % KINDS.length]!;
}

/** Pull quote, core, beats, one practice. Affective, cognitive, behavioral. */
export const MYTH_FACES: Record<string, MythFace> = {
  persephone: {
    quote: "She had eaten the seeds.",
    core: "What you take in the dark becomes part of you. Return is never a full return.",
    beats: ["The ground opens", "Six seeds", "Queen of two worlds"],
    practice: "Name the season you are actually in. Do not decorate winter as spring.",
  },
  psyche: {
    quote: "She lifted the lamp.",
    core: "Love in the dark is not yet love you can inhabit. Looking costs. Then the work.",
    beats: ["A palace, no face", "Oil on the god", "Tasks, help, a box", "Daylight"],
    practice: "Look once. Then do the next small task you have been calling impossible.",
  },
  odysseus: {
    quote: "Nobody. That’s my name.",
    core: "Cunning gets you across the sea. Home still has to recognize you without the costume.",
    beats: ["Troy’s trick", "A nymph, a forever", "The bow at the door"],
    practice: "In one room today, use your real name. See what changes.",
  },
  ariadne: {
    quote: "Take this thread.",
    core: "Knowing the maze is not the same as being allowed to leave it.",
    beats: ["The labyrinth", "The beach", "A crown in the sky"],
    practice: "Keep one length of thread for yourself. Do not hand it over by noon.",
  },
  orpheus: {
    quote: "He looked back.",
    core: "Art can open the underworld. Trust still has to walk out without checking.",
    beats: ["The song that stops death", "The path up", "The glance"],
    practice: "Finish one thing without looking back to see if it is working.",
  },
  prometheus: {
    quote: "I stole the fire.",
    core: "A gift taken from the gods still has to be lived with. The liver is a later question.",
    beats: ["The fennel stalk", "The gift to mortals", "The rock"],
    practice: "Use one stolen heat for someone else, not for the story of having it.",
  },
  athena: {
    quote: "I am the city thinking.",
    core: "Craft and strategy are a kind of care. Wisdom that will not get its hands dirty is only pose.",
    beats: ["The olive", "The aegis", "The loom"],
    practice: "Mend one useful thing. Let that be the thinking.",
  },
  dionysus: {
    quote: "Twice-born.",
    core: "Ecstasy without a container wrecks the house. The god of wine is also the god of the chorus.",
    beats: ["The thigh", "The vine", "The mask"],
    practice: "Let one joy have a rim. Do not spill it to prove it is real.",
  },
  odin: {
    quote: "I hung on the windy tree.",
    core: "Knowledge that costs nothing is gossip. He paid an eye, and nine nights.",
    beats: ["The hanging", "The runes", "The ravens"],
    practice: "Give up one certainty you were using as a shield.",
  },
  freyja: {
    quote: "She weeps gold.",
    core: "Desire is not a stain. It is a weather the north already named.",
    beats: ["The necklace", "The falcon cloak", "The search"],
    practice: "Want one thing out loud. Do not apologize for the wanting.",
  },
  loki: {
    quote: "Then I will be the problem.",
    core: "The glitch in the hall is sometimes the only honest speech. Binding him does not unmake the need.",
    beats: ["The flyting", "The binding", "The last laugh"],
    practice: "Say the one true inconvenient thing, then stop. Do not become the fire.",
  },
  sigurd: {
    quote: "I tasted the dragon’s heart.",
    core: "Killing the monster is not the end. Understanding its blood may be the harder meal.",
    beats: ["The sword", "Fafnir", "The birds speaking"],
    practice: "Listen once to the thing you defeated. It may still be talking.",
  },
  isis: {
    quote: "I will gather the pieces.",
    core: "Love as craft: find what was scattered, and make a life that can stand.",
    beats: ["The chest on the Nile", "Thirteen pieces", "The wings"],
    practice: "Put one scattered piece back where it belongs. Not all of them. One.",
  },
  osiris: {
    quote: "The djed stands.",
    core: "A king can be dismembered and still become the grain. Stability after ruin is a practice.",
    beats: ["The coffin", "The flood", "The pillar"],
    practice: "Name one thing in you that survived being taken apart.",
  },
  thoth: {
    quote: "I wrote it so it would stay.",
    core: "Memory that is only spoken blows away. The ibis keeps the account.",
    beats: ["The moon", "The reed", "The weighing"],
    practice: "Write one true line and leave it where you can find it tomorrow.",
  },
  maat: {
    quote: "The heart against the feather.",
    core: "Truth is light enough to weigh. A heavy heart is not depth. It is something unconfessed.",
    beats: ["The hall", "The scale", "The feather"],
    practice: "Put one lie down. See how much lighter the afternoon is.",
  },
  anansi: {
    quote: "The stories belong to the sky. I brought them down.",
    core: "Wit can steal wisdom for the people. The mouth still has to belong to more than the thief.",
    beats: ["The pot of stories", "The sky god’s price", "The web"],
    practice: "Tell one story that is not about your cleverness.",
  },
  sundiata: {
    quote: "The crippled child will walk.",
    core: "Exile and a slow body are not the end of kingship. The griot keeps the name until the legs remember.",
    beats: ["The iron rod", "Exile", "The return"],
    practice: "Do the thing your early weakness was supposed to forbid. Once.",
  },
  makeda: {
    quote: "I came to test him with hard questions.",
    core: "Wisdom travels. It does not have to kneel to be in the room.",
    beats: ["The journey", "The riddles", "The gold"],
    practice: "Ask one hard question you have been softening so someone would like you.",
  },
  chameleon: {
    quote: "I was delayed.",
    core: "A message that arrives late can still change a world. Do not confuse speed with truth.",
    beats: ["The errand", "The delay", "The other messenger"],
    practice: "Finish one delayed message. Send it before night.",
  },
  amaterasu: {
    quote: "The cave is not the sun.",
    core: "Withholding your light punishes more than the offender. Someone has to make the mouth of the cave interesting again.",
    beats: ["The insult", "The cave", "The laugh"],
    practice: "Bring one small brightness back into a room you left in protest.",
  },
  momotaro: {
    quote: "I was born from a peach.",
    core: "An unusual origin is allowed. Companions still have to be fed.",
    beats: ["The peach", "The dog, the monkey, the bird", "The island"],
    practice: "Pack food for the odd companions you actually have.",
  },
  weaver: {
    quote: "Once a year the magpies make a bridge.",
    core: "Two callings can be real. They do not have to become one life. A crossing is enough.",
    beats: ["The loom", "The herd", "The seventh night"],
    practice: "Keep one date you have been fusing into everything else.",
  },
  nuwa: {
    quote: "I patched the sky with colored stone.",
    core: "The world does not need your perfection. It needs a mend you can live under.",
    beats: ["The broken pillar", "The five-colored stones", "The seam"],
    practice: "Mend visibly. Leave the stitch where it can be seen.",
  },
  "crane-wife": {
    quote: "Do not look at me while I weave.",
    core: "A gift that requires secrecy will not survive curiosity dressed as love.",
    beats: ["The wounded crane", "The cloth", "The door"],
    practice: "Honor one privacy that is feeding you. Do not pick it apart tonight.",
  },
  sita: {
    quote: "The fire will speak for me.",
    core: "Purity tests are a politics. Dignity is a different fire.",
    beats: ["The exile", "The ashoka grove", "The ordeal"],
    practice: "Refuse one test that was never yours to take.",
  },
  arjuna: {
    quote: "I will not fight.",
    core: "The chariot is a pause, not a pep talk. Duty without seeing is just momentum.",
    beats: ["The field", "The bow lowered", "The speech"],
    practice: "Stop at the brink of one action and ask whose war it is.",
  },
  draupadi: {
    quote: "I was gambled.",
    core: "A hall that can stake a person is already on fire. There is no cosmetic peace.",
    beats: ["The dice", "The hair", "The vow"],
    practice: "Name one place you are being treated as a stake. Step out of the game.",
  },
  hanuman: {
    quote: "I forgot my strength.",
    core: "Devotion is not smallness. Someone may have to remind you of your size.",
    beats: ["The leap", "The mountain", "The chest opened"],
    practice: "Do the large kind thing you have been calling someone else’s job.",
  },
  savitri: {
    quote: "I will walk with Death.",
    core: "Love that argues with the end of the story is not denial. It is a second will.",
    beats: ["The chosen husband", "The forest", "The bargaining"],
    practice: "Stay with one hard thing an hour longer than you meant to.",
  },
  quetzalcoatl: {
    quote: "I brought the bones.",
    core: "Creation from the underworld is messy. A drunk god can still plant a people.",
    beats: ["The descent", "The bones", "The flight"],
    practice: "Use one imperfect offering. Do not wait to be sober and golden.",
  },
  ixchel: {
    quote: "I keep the waters and the weave.",
    core: "Moon, medicine, and making are one craft. Destruction is in the same hands.",
    beats: ["The rabbit moon", "The flood", "The loom"],
    practice: "Tend one cycle: water, rest, or work. Not all three today.",
  },
  brigid: {
    quote: "Three fires.",
    core: "Making, saying, and healing. If one goes out from neglect, the house cools.",
    beats: ["The forge", "The poem", "The well"],
    practice: "Feed the fire you have been starving. One log.",
  },
  salmon: {
    quote: "He burned his thumb and knew.",
    core: "Wisdom often arrives through an accident of service, not through the person who planned to be wise.",
    beats: ["Seven years’ wait", "The blister", "The thumb to the tooth"],
    practice: "Notice one accidental knowing. Write it before you explain it away.",
  },
  blodeuwedd: {
    quote: "They made me of flowers.",
    core: "A life manufactured for someone else’s need will grow its own night. The owl is not only a punishment.",
    beats: ["Oak, broom, meadowsweet", "The other man", "The owl"],
    practice: "Ask whether one role you inhabit was grown or assembled. Say the answer once.",
  },
  cuchulainn: {
    quote: "I am the hound of Culann.",
    core: "A warrior who cannot put the warp-spasm down will burn the people he meant to guard.",
    beats: ["The boy-deed", "The warp-spasm", "The cooling"],
    practice: "Cool one victory. Water, not another fight.",
  },
  inanna: {
    quote: "At each gate, a garment.",
    core: "You cannot take every glory into the next chamber. Subtraction is the ticket.",
    beats: ["The descent", "Seven gates", "The hook", "The return"],
    practice: "Unhook one status you were wearing into a room that did not ask for it.",
  },
  gilgamesh: {
    quote: "You will not find the life you seek.",
    core: "The plant of forever is lost. The walls of the city remain. Enough can be inhabited.",
    beats: ["The friend", "The wilderness", "The flood-story", "The walls"],
    practice: "Walk the walls of what you actually built. Count that as life.",
  },
  raven: {
    quote: "I stole the sun.",
    core: "A messy messenger can deliver a necessary noon. Motive may be hunger. The day is still day.",
    beats: ["The box of light", "The trick", "The sky"],
    practice: "Let one good thing out of the box, even if your reasons are mixed.",
  },
  sedna: {
    quote: "Comb my hair.",
    core: "When the source of food is snarled, going down gently is the work. Not another hunt.",
    beats: ["The cut fingers", "The sea animals", "The comb"],
    practice: "Sit with one snarled thing. Comb. Do not hunt.",
  },
  maui: {
    quote: "I snared the sun.",
    core: "A trickster can lengthen the day for everyone. Death is the one fish he cannot land.",
    beats: ["The jawbone", "The sun", "The last fish"],
    practice: "Lengthen one ordinary day for someone else. Not for the legend.",
  },
  scheherazade: {
    quote: "Let me tell you a story.",
    core: "A life can be saved by unfinished narrative. Dawn is a cliff. One more night is a craft.",
    beats: ["The king", "The first night", "Dawn"],
    practice: "Leave one story unfinished on purpose. Come back to it.",
  },
};
