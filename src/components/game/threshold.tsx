import { audio } from "@/lib/audio";
import { NightSky } from "@/components/night-sky";
import { useGame } from "@/lib/game-store";
import { useEffect } from "react";

export function Threshold() {
  const begin = useGame((s) => s.begin);
  const beginPsyche = useGame((s) => s.beginPsyche);

  useEffect(() => {
    audio.setSection("threshold");
  }, []);

  return (
    <main className="min-h-dvh bg-bg">
      <section className="hero-stage relative h-dvh min-h-[100dvh] w-full overflow-hidden">
        <button
          type="button"
          onClick={() => begin()}
          className="hero-frame absolute inset-0 block w-full"
          aria-label="Play the field"
        >
          <img
            src="/art/hero.jpg"
            alt="mythengine: a moth, a lamp, a sky held in gold rings"
            fetchPriority="high"
            decoding="sync"
            className="hero-ken pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="hero-rings" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>
          <NightSky />
        </button>
        <h1 className="sr-only">mythengine</h1>
        <nav
          aria-label="Enter"
          className="absolute inset-x-0 bottom-0 z-20 border-t border-line/50 bg-bg/55 backdrop-blur-[2px]"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-3">
            <button
              type="button"
              onClick={() => begin()}
              className="min-h-16 px-2 py-3 text-center hover:bg-raised/40 sm:min-h-20 sm:px-6 sm:text-left"
            >
              <p className="display text-[0.7rem] leading-tight text-gold sm:text-2xl">
                <span className="sm:hidden">Field</span>
                <span className="hidden sm:inline">Enter the field</span>
              </p>
              <p className="mt-0.5 hidden text-sm text-muted sm:block">
                The moth has mass.
              </p>
            </button>
            <button
              type="button"
              onClick={() => beginPsyche("short")}
              className="min-h-16 border-x border-line/50 px-2 py-3 text-center hover:bg-raised/40 sm:min-h-20 sm:px-6 sm:text-left"
            >
              <p className="display text-[0.7rem] leading-tight text-fg sm:text-2xl">
                <span className="sm:hidden">Psyche</span>
                <span className="hidden sm:inline">A short night</span>
              </p>
              <p className="mt-0.5 hidden text-sm text-muted sm:block">
                Walk as Psyche.
              </p>
            </button>
            <button
              type="button"
              onClick={() => beginPsyche("long")}
              className="min-h-16 px-2 py-3 text-center hover:bg-raised/40 sm:min-h-20 sm:px-6 sm:text-left"
            >
              <p className="display text-[0.7rem] leading-tight text-fg sm:text-2xl">
                <span className="sm:hidden">Long night</span>
                <span className="hidden sm:inline">The long night</span>
              </p>
              <p className="mt-0.5 hidden text-sm text-muted sm:block">
                Eight stations. If you ask.
              </p>
            </button>
          </div>
        </nav>
      </section>
    </main>
  );
}
