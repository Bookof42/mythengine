import { audio } from "@/lib/audio";
import { useGame } from "@/lib/game-store";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export function Threshold() {
  const house = useGame((s) => s.house);
  const openHouse = useGame((s) => s.openHouse);
  const begin = useGame((s) => s.begin);
  const beginPsyche = useGame((s) => s.beginPsyche);

  useEffect(() => {
    audio.setSection("threshold");
  }, []);

  if (!house) {
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
          <div className="hero-sparkles" aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <button
            type="button"
            onClick={() => openHouse()}
            className="absolute inset-0 z-10 block"
            aria-label="Tap to enter Mythengine"
          />
          <h1 className="sr-only">Mythengine</h1>
          <p className="pointer-events-none absolute inset-x-0 bottom-10 z-20 text-center text-sm tracking-[0.28em] text-gold/80">
            Tap to enter
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-bg pb-16">
      <section className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
        <picture>
          <source media="(max-width: 1023px)" srcSet="/art/hero-mobile.jpg" />
          <img
            src="/art/hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
      </section>
      <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8 sm:pt-14">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">Mythengine</p>
        <h1 className="display mt-3 text-[clamp(2.2rem,10vw,5.5rem)] leading-[1.04] text-fg">
          A field you fly. A night you walk.
        </h1>
        <p className="font-garamond mt-6 text-2xl text-fg/90 sm:text-3xl">
          Is life a game, or a myth lived from the inside?
        </p>

        <ul className="mt-12 space-y-8">
          <li>
            <button
              type="button"
              onClick={() => begin()}
              className="w-full text-left"
            >
              <p className="display text-3xl text-gold sm:text-4xl">Field</p>
              <p className="font-garamond mt-1 text-xl text-muted sm:text-2xl">
                Inverse square. Gold to take. A gap that brightens when you
                carry something.
              </p>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => beginPsyche("short")}
              className="w-full text-left"
            >
              <p className="display text-3xl text-fg sm:text-4xl">A Short Night</p>
              <p className="font-garamond mt-1 text-xl text-muted sm:text-2xl">
                Psyche. Lamp, loss, return. A station may offer a card.
              </p>
            </button>
          </li>
          <li>
            <Link to="/library" className="block">
              <p className="display text-3xl text-fg sm:text-4xl">Library</p>
              <p className="font-garamond mt-1 text-xl text-muted sm:text-2xl">
                Forty-two old plots still happening. Read without flying. Fly
                without reading.
              </p>
            </Link>
          </li>
          <li>
            <Link to="/codex" className="block">
              <p className="display text-3xl text-fg sm:text-4xl">Codex</p>
              <p className="font-garamond mt-1 text-xl text-muted sm:text-2xl">
                Am I an avatar in someone’s game? Cipher. Kindred. The walk
                Elon named in public.
              </p>
            </Link>
          </li>
          <li>
            <Link to="/bridge" className="block">
              <p className="display text-3xl text-fg sm:text-4xl">Bridge</p>
              <p className="font-garamond mt-1 text-xl text-muted sm:text-2xl">
                The Book of 42 family. Soul’s Quest. Field 69. The Meaning of
                Life.
              </p>
            </Link>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => beginPsyche("long")}
          className="display mt-12 min-h-11 text-lg text-teal hover:text-gold"
        >
          The Long Night · eight stations, if you ask
        </button>
        <p className="font-garamond mt-10 text-xl text-muted sm:text-2xl">
          Adams hung a towel: <em>Don’t Panic</em>. Elon asked if he was an
          avatar. Cipher keeps the count.
        </p>
      </div>
    </main>
  );
}
