import { useEffect, useState } from "react";
import { ELON_ORIGIN, ELON_SIM, ELON_WALK, type QuotedLine } from "@/lib/meaning";
import { cn } from "@/lib/utils";

const KEY = "mythengine-kindred-v3";

type Station = {
  line: QuotedLine;
  label: string;
  beat: string;
  room: 0 | 1 | 2;
};

const STATIONS: Station[] = [
  { line: ELON_ORIGIN[0]!, label: "Consciousness", beat: "Leave", room: 0 },
  { line: ELON_ORIGIN[1]!, label: "The next question", beat: "Cross", room: 0 },
  { line: ELON_WALK[0]!, label: "Love", beat: "Suffer", room: 1 },
  { line: ELON_WALK[1]!, label: "Awareness", beat: "Descend", room: 1 },
  { line: ELON_SIM[0]!, label: "Unobserved", beat: "Return", room: 2 },
];

const ROOMS = [
  { n: "01", title: "Departure", hint: "Leave the known. Cross a threshold." },
  { n: "02", title: "Initiation", hint: "Ordeal. The self unmade." },
  { n: "03", title: "Return", hint: "A boon that is not loot. A capacity." },
] as const;

export function useKindred() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    try {
      const n = Number(localStorage.getItem(KEY) ?? "1");
      if (n >= 0 && n < STATIONS.length) setActive(n);
    } catch {
      /* ignore */
    }
  }, []);

  const pick = (i: number) => {
    setActive(i);
    try {
      localStorage.setItem(KEY, String(i));
    } catch {
      /* ignore */
    }
  };

  return { active, pick, station: STATIONS[active]!, stations: STATIONS };
}

export function KindredSky() {
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-md overflow-hidden bg-bg sm:max-w-lg">
      <img
        src="/art/kindred-portrait.jpg"
        alt="A moth on a vertical path of five lights."
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}

export function KindredMonomyth({
  active,
  pick,
}: {
  active: number;
  pick: (i: number) => void;
}) {
  return (
    <ol className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
      {ROOMS.map((room, ri) => (
        <li key={room.n} className="border-t border-gold/35 pt-4 text-center sm:text-left">
          <p className="text-sm tracking-[0.28em] text-teal">{room.n}</p>
          <p className="display mt-2 text-2xl text-gold sm:text-3xl">{room.title}</p>
          <p className="font-garamond mt-2 text-lg text-muted sm:text-xl">{room.hint}</p>
          <ul className="mt-4 space-y-2">
            {STATIONS.map((s, i) =>
              s.room === ri ? (
                <li key={s.line.id}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    className={cn(
                      "display min-h-11 w-full text-xl sm:text-left",
                      i === active ? "text-gold" : "text-fg/80 hover:text-gold",
                    )}
                  >
                    {s.label}
                  </button>
                </li>
              ) : null,
            )}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export function KindredPath({
  active,
  pick,
  stations,
}: {
  active: number;
  pick: (i: number) => void;
  stations: Station[];
}) {
  return (
    <ol className="mx-auto mt-14 max-w-3xl space-y-12 text-center">
      {stations.map((s, i) => {
        const line = s.line;
        const on = i === active;
        return (
          <li key={line.id}>
            <button
              type="button"
              onClick={() => pick(i)}
              className="w-full text-center"
            >
              <p
                className={
                  line.text.length > 80
                    ? cn(
                        "font-garamond text-xl leading-snug sm:text-2xl",
                        on ? "text-gold" : "text-fg/70",
                      )
                    : cn(
                        "display text-2xl leading-snug sm:text-4xl",
                        on ? "text-gold" : "text-fg/70",
                      )
                }
              >
                “{line.text}”
              </p>
            </button>
            <a
              href={line.href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-base text-teal hover:text-gold sm:text-lg"
            >
              {line.cite} · {line.source}
            </a>
          </li>
        );
      })}
      <li>
        <p className="font-garamond text-xl text-muted sm:text-2xl">
          None of these is the next question. They are stations on the walk that
          makes one possible. He said we will understand it. It is still
          outstanding.
        </p>
      </li>
    </ol>
  );
}
