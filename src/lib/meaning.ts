export const MEANING = "https://themeaningoflife.grok.me";

export type QuotedLine = {
  id: string;
  text: string;
  cite: string;
  source: string;
  href: string;
};

/** Elon's public coordinates, as the meaning-of-life walk cites them. Checkable. */
export const ELON_ORIGIN: QuotedLine[] = [
  {
    id: "consciousness",
    text: "To understand the nature of consciousness",
    cite: "Elon Musk",
    source: "On X · October 2019",
    href: "https://x.com/elonmusk/status/1180552829498322945",
  },
  {
    id: "next",
    text: "We will understand the next question",
    cite: "Elon Musk",
    source: "Same thread · follow-on",
    href: "https://x.com/elonmusk/status/1180553336082157568",
  },
];

export const ELON_WALK: QuotedLine[] = [
  {
    id: "love",
    text: "Love is the answer",
    cite: "Elon Musk",
    source: "JRE #1169 · 7 September 2018",
    href: "https://www.youtube.com/watch?v=ycPr5-27vSI&t=7200s",
  },
  {
    id: "awareness",
    text: "Awareness awakening",
    cite: "Elon Musk",
    source: "On X · 4 May 2022",
    href: "https://x.com/elonmusk/status/1521734378442788865",
  },
  {
    id: "journey",
    text: "If heat death of the universe is the destination, it really is about the journey",
    cite: "Elon Musk",
    source: "On X · 2017",
    href: "https://x.com/elonmusk/status/890719930836550656",
  },
  {
    id: "entropy",
    text: "In the end, it's all about entropy",
    cite: "Elon Musk",
    source: "Reply on X to John Carmack · 13 August 2021",
    href: "https://x.com/elonmusk/status/1426315521360896001",
  },
];

export const ELON_AVATAR: QuotedLine = {
  id: "avatar",
  text: "Am I an avatar in someone's game?",
  cite: "Elon Musk",
  source: "Everyday Astronaut · Starbase Tour Part 2 · Summer 2021",
  href: "https://youtu.be/SA8ZBJWo73E?t=3064",
};

export const ELON_SIM: QuotedLine[] = [
  {
    id: "vetting",
    text: "We could be intelligences in a world simulator, where we are assessed for goodness/safety before being released into the \"real world\". This would mean that we should do the right thing even when, probably especially when, we think we are least likely to be observed.",
    cite: "Elon Musk",
    source: "Conversation with Grok, shared as The Meaning of Life",
    href: "https://x.com/elonmusk/status/2024209490049208594",
  },
  {
    id: "simulator-god",
    text: "The creator of the simulation could be viewed as God. In that scenario, prayers could be answered by the Simulator.",
    cite: "Elon Musk",
    source: "Same conversation · The Meaning of Life",
    href: "https://x.com/elonmusk/status/2024209490049208594",
  },
  {
    id: "stream",
    text: "Look at the future from a standpoint of the probabilities. It's like a branching stream of probabilities, and there are actions that we can take that affect those probabilities.",
    cite: "Elon Musk",
    source: "TED2017 · The future we're building",
    href: "https://www.ted.com/talks/elon_musk_the_future_we_re_building_and_boring",
  },
];
