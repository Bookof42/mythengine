import { audio } from "@/lib/audio";
import { useGame } from "@/lib/game-store";
import { useEffect } from "react";

export function Threshold() {
  const begin = useGame((s) => s.begin);
  const beginPsyche = useGame((s) => s.beginPsyche);

  useEffect(() => {
    audio.setSection("threshold");
  }, []);

  return (
    <main className="h-dvh overflow-hidden bg-bg">
      <section className="hero-stage relative h-full w-full overflow-hidden">
        <picture className="hero-shot pointer-events-none absolute inset-0 block h-full w-full">
          <source media="(max-width: 1023px)" srcSet="/art/hero-mobile.jpg" />
          <img
            src="/art/hero.jpg"
            alt=""
            fetchPriority="high"
            decoding="sync"
            className="hero-ken absolute inset-0 h-full w-full max-w-none object-cover object-center"
          />
        </picture>
        <button
          type="button"
          onClick={() => begin()}
          className="absolute inset-0 z-10 block"
          aria-label="Play the field"
        />
        <h1 className="sr-only">Mythengine</h1>
        <nav
          aria-label="Enter"
          className="absolute inset-x-0 bottom-0 z-20 border-t border-line bg-bg"
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
