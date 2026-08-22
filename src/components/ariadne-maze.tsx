import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/** Ariadne already knows the architecture. A small labyrinth, gold thread. */
const ROWS = [
  "#########",
  "#S#     #",
  "# ### # #",
  "#   # # #",
  "### # # #",
  "#     #E#",
  "# ##### #",
  "#       #",
  "#########",
];

type Cell = { r: number; c: number };

function find(ch: string): Cell {
  for (let r = 0; r < ROWS.length; r++) {
    const c = ROWS[r]!.indexOf(ch);
    if (c >= 0) return { r, c };
  }
  return { r: 1, c: 1 };
}

const START = find("S");
const END = find("E");

function walkable(r: number, c: number) {
  const ch = ROWS[r]?.[c];
  return ch === " " || ch === "S" || ch === "E";
}

function key(cell: Cell) {
  return `${cell.r},${cell.c}`;
}

export function AriadneMaze() {
  const [at, setAt] = useState<Cell>(START);
  const [trail, setTrail] = useState<Cell[]>([START]);
  const done = at.r === END.r && at.c === END.c;
  const seen = useMemo(() => new Set(trail.map(key)), [trail]);

  const neighbors = useMemo(() => {
    const out: Cell[] = [];
    for (const [dr, dc] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ] as const) {
      const r = at.r + dr;
      const c = at.c + dc;
      if (walkable(r, c)) out.push({ r, c });
    }
    return out;
  }, [at]);

  const step = (r: number, c: number) => {
    if (done) return;
    if (!walkable(r, c)) return;
    if (Math.abs(r - at.r) + Math.abs(c - at.c) !== 1) return;
    const next = { r, c };
    setAt(next);
    setTrail((t) => [...t, next]);
  };

  const reset = () => {
    setAt(START);
    setTrail([START]);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      };
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      step(at.r + d[0], at.c + d[1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [at, done]);

  return (
    <div className="mx-auto mt-10 max-w-sm">
      <div
        className="grid aspect-square w-full gap-px bg-bg"
        style={{ gridTemplateColumns: `repeat(${ROWS[0]!.length}, 1fr)` }}
        role="application"
        aria-label="Ariadne’s labyrinth. Move to a neighboring opening."
      >
        {ROWS.flatMap((row, r) =>
          [...row].map((ch, c) => {
            const open = walkable(r, c);
            const here = at.r === r && at.c === c;
            const lit = seen.has(`${r},${c}`);
            const end = r === END.r && c === END.c;
            const near = neighbors.some((n) => n.r === r && n.c === c);
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                disabled={!open}
                onClick={() => step(r, c)}
                className={cn(
                  "min-h-0 rounded-[2px]",
                  open ? "min-h-11 bg-raised/80" : "bg-bg",
                  lit && open && "bg-gold/25",
                  near && !here && "bg-teal/45",
                  here && "bg-gold",
                  end && !here && "ring-1 ring-teal/70",
                )}
                aria-label={
                  here ? "You are here" : end ? "The heart" : open ? "Path" : "Wall"
                }
              />
            );
          }),
        )}
      </div>
      <p className="font-garamond mt-4 text-center text-xl text-muted sm:text-2xl">
        {done
          ? "The thread holds."
          : "Neighboring openings only. The thread follows."}
      </p>
      {done ? (
        <button
          type="button"
          onClick={reset}
          className="display mx-auto mt-3 block min-h-11 text-lg text-gold hover:text-teal"
        >
          Again
        </button>
      ) : null}
    </div>
  );
}
