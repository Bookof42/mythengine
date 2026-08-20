import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShareLooking } from "@/components/share-looking";
import { WithApuleius } from "@/components/with-apuleius";
import { QUESTION_VOICES } from "@/lib/myth-questions";
import { getMyth, mythArt } from "@/lib/myths";
import { PLOT_BY_ID } from "@/lib/plot-walks";
import { useGame } from "@/lib/game-store";

export const Route = createFileRoute("/library/$mythId")({
  component: MythPage,
});

function MythPage() {
  const { mythId } = Route.useParams();
  const myth = getMyth(mythId);
  const beginPsyche = useGame((s) => s.beginPsyche);
  const beginWalk = useGame((s) => s.beginWalk);
  const navigate = useNavigate();
  const plot = myth ? PLOT_BY_ID[myth.id] : undefined;
  if (!myth) {
    return (
      <main className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <h1 className="display text-3xl">This story is not in the archive.</h1>
          <Link to="/library" className="mt-6 inline-flex min-h-11 text-teal">
            Return to the library
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-bg pb-24">
      <section className="relative min-h-[62vh] overflow-hidden sm:min-h-[78vh]">
        <img
          src={mythArt(myth.id)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-[78vh] sm:px-8 sm:pb-16">
          <Link to="/library" className="text-sm text-teal hover:text-gold">
            Library
          </Link>
          <p className="mt-6 text-[11px] tracking-[0.28em] text-teal uppercase">
            {myth.origin}
          </p>
          <h1 className="display mt-3 max-w-5xl text-5xl leading-[1.02] text-fg sm:text-7xl lg:text-8xl">
            {myth.name}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 pt-10 sm:px-8">
        <p className="font-garamond text-2xl text-fg sm:text-3xl">
          <WithApuleius text={myth.short} />
        </p>
        <div className="font-garamond mt-10 space-y-6 text-lg leading-relaxed text-fg/92 sm:text-xl">
          {myth.full.split("\n\n").map((para) => (
            <p key={para.slice(0, 48)}>
              <WithApuleius text={para} />
            </p>
          ))}
        </div>

        <p className="display mx-auto mt-16 max-w-xl text-center text-2xl text-gold sm:text-3xl">
          {myth.reflection}
        </p>
        <div className="mt-8 flex justify-center">
          <ShareLooking
            art={mythArt(myth.id)}
            kicker={myth.name}
            question={myth.questions.coelho}
            mythId={myth.id}
          />
        </div>

        <details className="mt-16 border-t border-line pt-6">
          <summary className="min-h-11 cursor-pointer list-none text-[11px] tracking-[0.28em] text-gold uppercase">
            Inspect
          </summary>
          <div className="font-garamond mt-6 space-y-6 text-base text-muted sm:text-lg">
            <p>{myth.psychology}</p>
            <p className="text-sm tracking-[0.22em] text-gold uppercase">
              The shadow
            </p>
            <p className="text-fg/90">{myth.shadow}</p>
            <p className="text-sm tracking-[0.22em] text-gold uppercase">
              Four lookings
            </p>
            <ul className="space-y-5">
              {QUESTION_VOICES.map(([key, label]) => (
                <li key={key}>
                  <p className="text-xs tracking-[0.22em] text-teal uppercase">{label}</p>
                  <p className="mt-1 text-fg/90">{myth.questions[key]}</p>
                </li>
              ))}
            </ul>
          </div>
        </details>

        {myth.id === "psyche" ? (
          <section className="mt-16">
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
              Play the structure
            </p>
            <p className="font-garamond mt-4 text-lg text-fg/90">
              A short night: lamp, loss, return. The long night: eight stations.
              No explanation first.
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <button
                type="button"
                className="min-h-11 text-sm tracking-wide text-gold hover:text-teal"
                onClick={() => {
                  beginPsyche("short");
                  void navigate({ to: "/" });
                }}
              >
                A short night
              </button>
              <button
                type="button"
                className="min-h-11 text-sm tracking-wide text-muted hover:text-gold"
                onClick={() => {
                  beginPsyche("long");
                  void navigate({ to: "/" });
                }}
              >
                The long night
              </button>
            </div>
          </section>
        ) : null}

        {plot ? (
          <section className="mt-16">
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
              Enter the plot
            </p>
            <p className="font-garamond mt-4 text-lg text-fg/90">{plot.night}</p>
            <button
              type="button"
              className="mt-6 min-h-11 text-sm tracking-wide text-gold hover:text-teal"
              onClick={() => {
                beginWalk(plot.id);
                void navigate({ to: "/" });
              }}
            >
              Three stations
            </button>
          </section>
        ) : null}
      </article>
    </main>
  );
}
