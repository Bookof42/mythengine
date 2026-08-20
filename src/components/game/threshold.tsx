import { Button } from "@/components/ui/button";
import { audio } from "@/lib/audio";
import { CIPHER, CIPHER_READINGS, FACES, FACE_SHORT, isSeal } from "@/lib/cipher";
import { moonName, weekdayWord } from "@/lib/astronomy";
import { pickOmen, profileFromHistory } from "@/lib/engine";
import { useGame } from "@/lib/game-store";
import { SIGN_ICONS } from "@/lib/kit";
import { SIGN, SIGNS } from "@/lib/signs";
import { HOUSE_LINKS, PLAY_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

const DIRECTION = [
  {
    n: "01",
    title: "Hold",
    body: "You are already in an orbit. Hold to burn. The lamp is a sun, inverse square.",
  },
  {
    n: "02",
    title: "Take",
    body: "The gold in orbit is yours. Seed, key, thread, cup, stone, mirror. Each one changes how you fly.",
  },
  {
    n: "03",
    title: "Return",
    body: "Find the gap in the ring. Enter. Come back. The myth names itself.",
  },
] as const;

const OMENS = SIGNS.map((id) => ({
  id,
  title: SIGN[id].title,
  line: SIGN[id].line,
}));

export function Threshold() {
  const begin = useGame((s) => s.begin);
  const beginPsyche = useGame((s) => s.beginPsyche);
  const save = useGame((s) => s.save);
  const ready = useGame((s) => s.ready);

  useEffect(() => {
    audio.setSection("threshold");
  }, []);

  const omen = useMemo(() => {
    if (!ready) return null;
    return pickOmen(new Date(), profileFromHistory(save.history));
  }, [ready, save.history]);
  const sky = ready
    ? `${weekdayWord(new Date())} · ${moonName(new Date())} moon`
    : null;

  return (
    <main>
      <section className="hero-stage relative w-full min-h-[56.25vw] sm:min-h-[100vh]">
        <button
          type="button"
          onClick={() => begin()}
          className="hero-frame absolute inset-0 block w-full"
          aria-label="Play the field"
        >
          <img
            src="/art/hero.jpg"
            alt="mythengine: a moth, a lamp, a sky held in gold rings"
            className="hero-ken pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="hero-rings" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-stars" aria-hidden />
        </button>
        <div className="hero-floor" />

        <h1 className="sr-only">mythengine</h1>

        <div className="relative z-10 mx-auto flex min-h-[56.25vw] w-full max-w-md flex-col items-center justify-end px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-24 text-center sm:min-h-[100vh]">
          <div className="enter enter-delay-3 flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <Button
              className="min-h-12 w-full text-sm tracking-[0.22em] uppercase sm:w-auto sm:px-8"
              onClick={() => begin()}
            >
              Enter the field
            </Button>
            <button
              type="button"
              onClick={() => beginPsyche()}
              className="min-h-11 text-sm text-gold/80 hover:text-gold"
            >
              Walk as Psyche
            <span className="mt-0.5 block text-[10px] tracking-[0.18em] text-gold/50">
              Psyche means soul
            </span>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[10px] tracking-[0.28em] text-faint uppercase">Welcome</p>
        <h2 className="display mt-2 text-3xl text-gold sm:text-5xl">
          The looking is the work.
        </h2>
        <p className="font-garamond mt-5 text-lg text-fg/90 sm:text-xl">
          Two walks. The moth is the game: hold, take, return. Psyche is the old
          plot: eight stations, no system first. Both live in this house.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8 sm:pb-24">
        <p className="text-[10px] tracking-[0.28em] text-faint uppercase">How to enter</p>
        <ol className="mt-8 space-y-8">
          {DIRECTION.map((step) => (
            <li key={step.n} className="grid grid-cols-[3.5rem_1fr] gap-4">
              <p className="display text-2xl text-teal">{step.n}</p>
              <div>
                <p className="display text-2xl text-fg">{step.title}</p>
                <p className="mt-1 text-sm text-muted sm:text-base">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-raised/30">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <p className="text-[10px] tracking-[0.28em] text-faint uppercase">What you can carry</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {OMENS.map((o) => (
              <li key={o.id} className="flex flex-col items-start gap-3">
                <img src={SIGN_ICONS[o.id]} alt="" className="h-14 w-14" />
                <p className="display text-xl text-gold">{o.title}</p>
                <p className="text-sm text-muted">{o.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="text-[10px] tracking-[0.28em] text-faint uppercase">Chart</p>
        <h2 className="display mt-2 text-3xl text-gold sm:text-4xl">Four faces. No fifth.</h2>
        <p className="font-garamond mt-4 text-lg text-fg/90">
          Myth in reverse ordinal is 42. mythengine in reverse reduction is 42. Game misses on purpose. A miss is drawn as carefully as a hit.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="text-[10px] tracking-[0.16em] text-faint uppercase">
                <th className="pb-3 font-normal">Word</th>
                {FACES.map((face) => (
                  <th key={face} className="pb-3 font-normal">
                    {FACE_SHORT[face]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CIPHER_READINGS.map((row) => (
                <tr key={row.word} className="border-t border-line">
                  <td className="display py-3 text-fg">{row.word}</td>
                  {FACES.map((face) => {
                    const n = row.values[face];
                    return (
                      <td
                        key={face}
                        className={cn(
                          "display py-3 tabular-nums",
                          isSeal(n) ? "text-gold" : "text-muted",
                        )}
                      >
                        {n}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6">
          <a
            href={CIPHER}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-teal hover:text-gold"
          >
            Cipher · the living lab
          </a>
        </p>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="text-[10px] tracking-[0.28em] text-faint uppercase">Today</p>
            <p className="mt-1 text-sm text-teal">{sky}</p>
            <h2 className="display mt-2 text-2xl text-fg sm:text-3xl">
              {omen ? omen.title : "Today's omen"}
            </h2>
            {omen ? (
              <p className="mt-2 max-w-md text-sm text-muted">{omen.prompt}</p>
            ) : null}
          </div>
          <Link to="/omen" className="text-sm text-gold hover:text-teal">
            Open the omen
          </Link>
        </div>
      </section>

      <section className="border-t border-line px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <span className="text-[10px] tracking-[0.22em] text-faint uppercase">Also</span>
          {[...PLAY_LINKS, ...HOUSE_LINKS].map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-gold">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
