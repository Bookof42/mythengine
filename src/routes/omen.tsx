import { createFileRoute } from "@tanstack/react-router";
import { ShareLooking } from "@/components/share-looking";
import { NightSky } from "@/components/night-sky";
import { Wick } from "@/components/wick";
import { audio } from "@/lib/audio";
import { pickOmen, profileFromHistory } from "@/lib/engine";
import { BOOK } from "@/lib/family";
import { useGame } from "@/lib/game-store";
import { useEffect, useMemo } from "react";

export const Route = createFileRoute("/omen")({ component: OmenPage });

function OmenPage() {
  const save = useGame((s) => s.save);
  const ready = useGame((s) => s.ready);

  useEffect(() => {
    audio.setSection("omen");
    audio.cue("omen");
  }, []);

  const omen = useMemo(() => {
    if (!ready) return null;
    const profile = profileFromHistory(save.history);
    return pickOmen(new Date(), profile);
  }, [save.history, ready]);

  return (
    <main className="min-h-dvh bg-bg pb-24">
      <section className="relative min-h-[78dvh] overflow-hidden sm:min-h-screen">
        <img
          src="/art/omen.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <NightSky />
        <div className="relative z-10 mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-screen sm:px-8 sm:pb-16">
          <Wick size={56} className="mb-6 h-14 w-14 rounded-full" />
          <p className="text-sm tracking-[0.32em] text-gold uppercase">Today’s omen</p>
          {omen ? (
            <>
              <h1 className="display mt-5 w-full text-[clamp(2rem,10vw,6rem)] leading-[1.08] text-fg">
                {omen.title}
              </h1>
              <p className="font-garamond mt-5 w-full text-lg text-fg/90 sm:mt-6 sm:text-3xl">
                {omen.body}
              </p>
              <p className="display mt-6 w-full text-xl text-gold sm:mt-8 sm:text-5xl">
                {omen.prompt}
              </p>
              <ShareLooking
                art="/art/omen.jpg"
                kicker={omen.title}
                question={omen.prompt}
                mythId="omen"
              />
            </>
          ) : (
            <h1 className="display mt-5 w-full text-5xl sm:text-7xl">Today’s omen</h1>
          )}
          <a
            href="#what-an-omen-is"
            className="mt-6 inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
          >
            What an omen is
          </a>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
        <p className="text-sm tracking-[0.28em] text-gold uppercase" id="what-an-omen-is">
          The Book of 42
        </p>
        <h2 className="display mt-3 w-full text-[clamp(1.8rem,7vw,4.5rem)] leading-[1.04] text-fg">
          The Book is not the game, and not a bible.
        </h2>
        <p className="display mt-8 w-full text-[clamp(1.4rem,4.5vw,3.4rem)] leading-[1.08] text-gold">
          Aperture, not oracle. Chronicle, not creed.
        </p>
        <p className="font-garamond mt-8 w-full text-xl leading-relaxed text-fg/90 sm:text-2xl lg:text-3xl">
          It is a living archive of pattern and meaning. A love letter: to 42, to
          the cosmos, to Love itself, and to the one the Scribe came to know as
          the Love of her Love. Mythopoesis is the method. Experience first.
          Recognition afterward. Then numbers, stars, a life.
        </p>
        <p className="font-garamond mt-6 w-full text-xl leading-relaxed text-muted sm:text-2xl lg:text-3xl">
          It looks where psyche meets matter, where number meets myth, where
          sacred text meets physics, and what happens when those threads hold, or
          do not. One inquiry toward the soul. One toward the cosmos. The looking
          is where they meet. Some correspondences hold. Some fail. Some stay
          absurd, beautiful, and unresolved. The looking is the work.
        </p>
        <p className="font-garamond mt-6 w-full text-xl leading-relaxed text-fg/90 sm:text-2xl lg:text-3xl">
          42 is not an answer the Book sells. It is an invitation to notice. This
          engine is a room in that house. The moth makes the looking playable. The
          Book keeps the longer night. An omen here is one image for the civil
          day, one question. Not a charm. Mythopoesis. Correspondence, never
          cause.
        </p>
        <p className="font-garamond mt-6 w-full text-xl leading-relaxed text-muted sm:text-2xl">
          That is the teaching. An archetypal cosmos you can walk: images that
          keep returning through new lives. Hillman, von Franz, Campbell, Coelho.
          None of them sold a spell.
        </p>

        <blockquote className="mt-16">
          <p className="display w-full text-3xl leading-snug text-gold sm:text-5xl lg:text-6xl">
            What are we being invited to notice?
          </p>
          <footer className="mt-6 text-base tracking-[0.18em] text-muted uppercase">
            The Book of 42
          </footer>
        </blockquote>
        <blockquote className="mt-12">
          <p className="display w-full text-2xl leading-snug text-fg sm:text-4xl lg:text-5xl">
            The secret of happiness is to see all the marvels of the world, and
            never to forget the drops of oil on the spoon.
          </p>
          <footer className="mt-6 text-base tracking-[0.18em] text-muted uppercase">
            The Alchemist · Paulo Coelho
          </footer>
        </blockquote>
        <a
          href={BOOK}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
        >
          bookof42.grok.me
        </a>

        <details className="mt-20 border-t border-line pt-6">
          <summary className="min-h-11 cursor-pointer list-none text-sm tracking-[0.28em] text-gold uppercase">
            Inspect
          </summary>
          <div className="font-garamond mt-8 space-y-6 text-xl text-muted sm:text-2xl">
            <p>
              Mythopoesis: making a life speak in images, without turning the
              images into a creed. Psyche is soul in one sense and a world in
              another. Matter is not the opposite of that. The Book asks where
              they rhyme. This omen is drawn from the pool by the day and by what
              you have already walked. Not a superstition. Not a moon stacked on a
              saint. A practice of looking, checkable, allowed to miss.
            </p>
            <p>
              What would one clean miss do: retire the language, or make the next
              sign stranger?
            </p>
          </div>
        </details>
      </article>
    </main>
  );
}
