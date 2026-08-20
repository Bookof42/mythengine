import { createFileRoute } from "@tanstack/react-router";
import { Wick } from "@/components/wick";
import { audio } from "@/lib/audio";
import { pickOmen, profileFromHistory } from "@/lib/engine";
import { OMEN_BY_ID } from "@/lib/omens";
import { useGame } from "@/lib/game-store";
import { todayKey } from "@/lib/utils";
import { useEffect, useMemo } from "react";

export const Route = createFileRoute("/omen")({ component: OmenPage });

function OmenPage() {
  const save = useGame((s) => s.save);
  const ready = useGame((s) => s.ready);
  const markOmen = useGame((s) => s.markOmen);

  useEffect(() => {
    audio.setSection("omen");
    audio.cue("omen");
  }, []);

  const today = todayKey();
  const existing = ready ? save.omens.find((o) => o.date === today) : undefined;
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
        <div className="relative z-10 mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-screen sm:px-8 sm:pb-16">
          <Wick size={56} className="mb-6 h-14 w-14 rounded-full" />
          <p className="text-sm tracking-[0.32em] text-gold uppercase">Today's omen</p>
          {omen ? (
            <>
              <h1 className="display mt-5 w-full text-5xl leading-[1.04] text-fg sm:text-7xl lg:text-8xl">
                {omen.title}
              </h1>
              <p className="font-garamond mt-6 w-full text-2xl text-fg/90 sm:text-3xl">
                {omen.body}
              </p>
              <p className="display mt-8 w-full text-3xl text-gold sm:text-5xl">
                {omen.prompt}
              </p>
            </>
          ) : (
            <h1 className="display mt-5 w-full text-5xl sm:text-7xl">Today's omen</h1>
          )}

          {existing ? (
            <p className="mt-8 text-lg text-teal sm:text-xl">
              You {existing.response} this omen. There is no streak to protect.
            </p>
          ) : omen ? (
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-10">
              <button
                type="button"
                className="min-h-12 text-left text-lg tracking-wide text-teal hover:text-gold"
                onClick={() => markOmen(omen.id, "noticed")}
              >
                I noticed
              </button>
              <button
                type="button"
                className="min-h-12 text-left text-lg tracking-wide text-gold hover:text-teal"
                onClick={() => markOmen(omen.id, "carried")}
              >
                I will carry it
              </button>
              <button
                type="button"
                className="min-h-12 text-left text-lg tracking-wide text-muted hover:text-gold"
                onClick={() => markOmen(omen.id, "released")}
              >
                I release it
              </button>
            </div>
          ) : null}
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
          What an omen is
        </p>
        <h2 className="display mt-3 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
          Pattern recognition, not a rite.
        </h2>
        <p className="font-garamond mt-8 w-full text-xl leading-relaxed text-fg/90 sm:text-2xl lg:text-3xl">
          In Paulo Coelho's <em>The Alchemist</em>, a shepherd is taught to notice:
          a hawk, two stones, oil on a spoon. The story is not a church. It is a
          practice of looking. This page is one image for the civil day, one
          question, nothing you must believe. You may notice it, carry it, or
          release it. Missed days are not a failure. Correspondence, never cause.
        </p>

        <blockquote className="mt-16">
          <p className="display w-full text-3xl leading-snug text-gold sm:text-5xl lg:text-6xl">
            The secret of happiness is to see all the marvels of the world, and
            never to forget the drops of oil on the spoon.
          </p>
          <footer className="mt-6 text-base tracking-[0.18em] text-muted uppercase">
            The Alchemist · Paulo Coelho
          </footer>
        </blockquote>

        <details className="mt-20 border-t border-line pt-6">
          <summary className="min-h-11 cursor-pointer list-none text-sm tracking-[0.28em] text-gold uppercase">
            Inspect
          </summary>
          <div className="font-garamond mt-8 space-y-6 text-xl text-muted sm:text-2xl">
            <p>
              The omen is drawn from the pool by the day and by what you have
              already walked in this engine. It is not timed to a moon, a saint,
              or a planet as if those were the same language. Coelho is cited
              because he named a noticing. The sky is not a booking.
            </p>
            <p>
              What would one clean miss do: retire the language, or make the next
              sign stranger?
            </p>
          </div>
        </details>

        <ConstellationDots marks={ready ? save.omens : []} />
      </article>
    </main>
  );
}

function ConstellationDots({
  marks,
}: {
  marks: { date: string; omenId: string; response: string }[];
}) {
  if (!marks.length) return null;
  return (
    <div className="mt-16">
      <p className="mb-3 text-base text-faint">
        {marks.length} day{marks.length === 1 ? "" : "s"} noticed.
      </p>
      <div className="flex flex-wrap gap-1.5">
        {marks.slice(-42).map((m) => {
          const omen = OMEN_BY_ID[m.omenId];
          const color =
            m.response === "carried"
              ? "bg-gold"
              : m.response === "noticed"
                ? "bg-teal"
                : "bg-faint";
          return (
            <span
              key={m.date}
              title={`${m.date} · ${omen?.title ?? m.omenId}`}
              className={`h-2 w-2 rounded-full ${color}`}
            />
          );
        })}
      </div>
    </div>
  );
}
