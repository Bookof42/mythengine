/** Four faces of the Book’s English cipher. No fifth face. */

export const FACES = [
  "ordinal",
  "reverseOrdinal",
  "reduction",
  "reverseReduction",
] as const;

export type Face = (typeof FACES)[number];

export const FACE_LABEL: Record<Face, string> = {
  ordinal: "English Ordinal",
  reverseOrdinal: "Reverse Ordinal",
  reduction: "Full Reduction",
  reverseReduction: "Reverse Reduction",
};

export const FACE_SHORT: Record<Face, string> = {
  ordinal: "Ordinal",
  reverseOrdinal: "Reverse",
  reduction: "Reduction",
  reverseReduction: "Rev. Reduction",
};

export const BOOK_SEALS = [21, 24, 42, 69, 84, 96, 142, 420] as const;

const A = "a".charCodeAt(0);

export function letters(input: string) {
  return input.toLowerCase().replace(/[^a-z]/g, "");
}

function alpha(ch: string) {
  return ch.charCodeAt(0) - A + 1;
}

function pythag(n: number) {
  return ((n - 1) % 9) + 1;
}

export function ordinal(input: string) {
  return [...letters(input)].reduce((sum, ch) => sum + alpha(ch), 0);
}

export function reverseOrdinal(input: string) {
  return [...letters(input)].reduce((sum, ch) => sum + (27 - alpha(ch)), 0);
}

export function reduction(input: string) {
  return [...letters(input)].reduce((sum, ch) => sum + pythag(alpha(ch)), 0);
}

export function reverseReduction(input: string) {
  return [...letters(input)].reduce(
    (sum, ch) => sum + pythag(27 - alpha(ch)),
    0,
  );
}

export function faceValue(input: string, face: Face) {
  switch (face) {
    case "ordinal":
      return ordinal(input);
    case "reverseOrdinal":
      return reverseOrdinal(input);
    case "reduction":
      return reduction(input);
    case "reverseReduction":
      return reverseReduction(input);
  }
}

export function isSeal(n: number) {
  return (BOOK_SEALS as readonly number[]).includes(n);
}

export type WordFaces = {
  word: string;
  values: Record<Face, number>;
};

export function readWord(word: string): WordFaces {
  return {
    word,
    values: {
      ordinal: ordinal(word),
      reverseOrdinal: reverseOrdinal(word),
      reduction: reduction(word),
      reverseReduction: reverseReduction(word),
    },
  };
}

export function letterTiles(word: string, face: Face) {
  return [...letters(word)].map((ch) => {
    const n = alpha(ch);
    const value =
      face === "ordinal"
        ? n
        : face === "reverseOrdinal"
          ? 27 - n
          : face === "reduction"
            ? pythag(n)
            : pythag(27 - n);
    return { letter: ch.toUpperCase(), value };
  });
}

export const CIPHER_WORDS = [
  "Myth",
  "mythengine",
  "Question",
  "Don’t Panic",
] as const;

export const CIPHER_READINGS = CIPHER_WORDS.map(readWord);

export type CipherPlateSpec = {
  word: string;
  display: string;
  face: Face;
  note: string;
};

export const CIPHER_PLATES: CipherPlateSpec[] = [
  {
    word: "Myth",
    display: "MYTH",
    face: "reverseOrdinal",
    note: "She checked Game. She checked Myth. Myth laughed.",
  },
  {
    word: "mythengine",
    display: "MYTHENGINE",
    face: "reverseReduction",
    note: "The title. Reverse reduction, the same seal.",
  },
  {
    word: "Question",
    display: "QUESTION",
    face: "reverseReduction",
    note: "Adams gave the culture an Answer. The cipher returns the Question.",
  },
  {
    word: "Don’t Panic",
    display: "DON’T PANIC",
    face: "reduction",
    note: "The towel. Meaning not included.",
  },
];

export const CIPHER = "https://bookof42.grok.me/cipher";
export const CIPHER_SIMULATION = `${CIPHER}#simulation-path`;
