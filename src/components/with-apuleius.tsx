const MARKS = [
  "The Writer’s Journey",
  "The Writer's Journey",
  "The Hero with a Thousand Faces",
  "The Matrix Reloaded",
  "The Power of Myth",
  "The Soul’s Code",
  "The Soul's Code",
  "The Alchemist",
  "Don’t Panic",
  "illo tempore",
  "Apuleius",
  "psychē",
] as const;

const MARK_RE = new RegExp(
  `(${MARKS.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g",
);

export function WithApuleius({ text }: { text: string }) {
  return (
    <>
      {text.split(MARK_RE).map((part, i) =>
        (MARKS as readonly string[]).includes(part) ? (
          <em key={`${part}-${i}`}>{part}</em>
        ) : (
          part
        ),
      )}
    </>
  );
}
