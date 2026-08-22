import { AriadneMaze } from "@/components/ariadne-maze";
import { MYTH_PLAYS } from "@/components/myth-plays";
import { cn } from "@/lib/utils";
import { diagramOf, type MythFace } from "@/lib/myth-faces";

export function MythDiagram({
  id,
  face,
}: {
  id: string;
  face: MythFace;
}) {
  const kind = diagramOf(id);
  const beats = face.beats;

  const Play = MYTH_PLAYS[id];
  if (Play) return <Play />;
  if (id === "ariadne" || kind === "maze") return <AriadneMaze />;

  if (kind === "triptych") {
    return (
      <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {beats.slice(0, 3).map((beat, i) => (
          <li key={beat} className="border-t border-gold/35 pt-4">
            <p className="text-sm tracking-[0.28em] text-teal">0{i + 1}</p>
            <p className="display mt-2 text-2xl text-gold sm:text-3xl">{beat}</p>
          </li>
        ))}
      </ol>
    );
  }

  if (kind === "spine") {
    const pairs: [string, string][] = [];
    for (let i = 0; i < beats.length; i += 2) {
      pairs.push([beats[i]!, beats[i + 1] ?? ""]);
    }
    return (
      <ul className="relative mx-auto mt-10 max-w-lg">
        <div
          className="pointer-events-none absolute top-2 bottom-2 left-1/2 hidden w-px -translate-x-1/2 bg-gold/35 sm:block"
          aria-hidden
        />
        {pairs.map(([a, b]) => (
          <li
            key={a}
            className="flex flex-col items-center py-4 sm:grid sm:grid-cols-[1fr_1.25rem_1fr] sm:items-center"
          >
            <p className="display text-center text-xl text-fg sm:pr-2 sm:text-right sm:text-2xl">
              {a}
            </p>
            <span className="relative z-10 my-2 h-1.5 w-1.5 rounded-full bg-gold sm:my-0 sm:mx-auto" />
            <p className="display text-center text-xl text-gold sm:pl-2 sm:text-left sm:text-2xl">
              {b || "·"}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  if (kind === "ring") {
    return (
      <p className="font-garamond mx-auto mt-10 max-w-xl text-center text-2xl leading-snug text-gold sm:text-3xl">
        {beats.map((beat, i) => (
          <span key={beat}>
            {i > 0 ? <span className="text-faint"> · </span> : null}
            {beat}
          </span>
        ))}
      </p>
    );
  }

  if (kind === "ladder") {
    return (
      <ol className="mx-auto mt-10 max-w-md text-center">
        {beats.map((beat, i) => (
          <li key={beat} className="py-4">
            <p className="text-sm tracking-[0.28em] text-teal">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="display mt-1 text-[clamp(1.6rem,6vw,2.8rem)] leading-none text-gold">
              {beat}
            </p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="relative mx-auto mt-10 max-w-md">
      <div
        className="pointer-events-none absolute top-3 bottom-3 left-[0.4rem] w-px bg-gold/35 sm:left-[0.55rem]"
        aria-hidden
      />
      {beats.map((beat, i) => (
        <li key={beat} className="relative flex gap-4 py-3 pl-8">
          <span
            className={cn(
              "absolute top-5 left-0 z-10 h-2.5 w-2.5 rounded-full",
              i === beats.length - 1 ? "bg-gold" : "bg-teal",
            )}
          />
          <p className="display text-xl text-fg sm:text-2xl">{beat}</p>
        </li>
      ))}
    </ol>
  );
}
