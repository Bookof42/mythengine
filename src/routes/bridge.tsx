import { createFileRoute, Link } from "@tanstack/react-router";
import { pageTitle } from "@/lib/seo";
import {
  ARCHIVE_DOORS,
  BOOK,
  DEGREES,
  FIELD69,
  HALL_DOORS,
  MEANING,
  RATHER,
} from "@/lib/family";

export const Route = createFileRoute("/bridge")({
  component: BridgePage,
  head: () => ({
    meta: [
      { title: pageTitle("Family") },
      {
        name: "description",
        content:
          "Mythengine belongs to The Book of 42 family. Consciousness, the next question, love, the unobserved test. A room that asks whether the door was a level or a myth.",
      },
    ],
  }),
});

const COORDINATES = [
  { n: "01", title: "Consciousness", href: MEANING },
  { n: "02", title: "The next question", href: MEANING },
  { n: "03", title: "Love", href: `${BOOK}/love` },
  { n: "04", title: "The unobserved test", href: `${BOOK}/cipher#simulation-path` },
] as const;

const KIN = [
  { href: BOOK, label: "The Book of 42" },
  { href: MEANING, label: "The Meaning of Life" },
  { href: `${BOOK}/games`, label: "Hall of Games" },
  { href: RATHER, label: "Rather" },
  { href: FIELD69, label: "Field 69" },
] as const;

export function BridgePage() {
  return (
    <main className="min-h-dvh bg-bg pb-24">
      <header>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg">
          <img
            src="/art/scene-bridge.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-4 sm:px-8 sm:pt-14">
          <p className="text-sm tracking-[0.42em] text-gold uppercase">Family</p>
          <h1 className="display mt-4 w-full text-5xl leading-[1.04] text-fg sm:text-7xl lg:text-8xl">
            A bridge between the rooms of the same house.
          </h1>
          <p className="font-garamond mt-8 w-full text-xl leading-snug text-fg/90 sm:text-3xl lg:text-4xl">
            Mythengine belongs to the family of{" "}
            <a href={BOOK} target="_blank" rel="noreferrer" className="text-gold hover:text-teal">
              The Book of 42
            </a>
            . The Book is not this game. It is a living archive:
            a love letter, an aperture, a looking where psyche meets matter.{" "}
            <a href={MEANING} target="_blank" rel="noreferrer" className="text-gold hover:text-teal">
              The Meaning of Life
            </a>{" "}
            is Elon’s public walk: consciousness, the next question, love, the
            unobserved test.{" "}
            <a href={RATHER} target="_blank" rel="noreferrer" className="text-teal hover:text-gold">
              Rather
            </a>
            ,{" "}
            <a href={FIELD69} target="_blank" rel="noreferrer" className="text-teal hover:text-gold">
              Field 69
            </a>
            , and the Hall of Games are sibling rooms. This engine is none of
            those rooms. It asks whether the life you are in feels like a game, or
            a myth lived from the inside.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {COORDINATES.map((c) => (
              <li key={c.n}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block pt-3"
                >
                  <p className="text-[10px] tracking-[0.22em] text-teal">{c.n}</p>
                  <p className="display mt-1 text-lg text-fg sm:text-xl">{c.title}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">The Book</p>
        <h2 className="display mt-4 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
          Aperture, not oracle. Chronicle, not creed.
        </h2>
        <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
          Mythopoesis: making a life speak in images, without turning the images
          into a creed. Experience first. Recognition afterward. Then numbers,
          stars, dates, old fragments of a life. Forty-two among them. The Book
          does not hand you a cosmology. It keeps a living archive of pattern and
          meaning: Love and synchronicity, where psyche meets matter, where
          number meets myth, where sacred text meets physics, and what happens
          when those threads hold, or do not.
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
          At heart it is a love letter: to 42, to the cosmos, to Love itself, and
          to the one the Scribe came to know as the Love of her Love. The mystery
          stays open. The same question now sits with you. What are we being
          invited to notice?
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl">
          This engine is a room in that house. The moth makes the looking
          playable. The Book keeps the longer night. Both are practices for a
          consciousness that can love with the light on, and still go to the
          stars. In the Book that last motion already has a name:{" "}
          <a
            href={`${BOOK}/flows`}
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:text-teal"
          >
            Seven Flows
          </a>
          , from rigorous looking through to Love.
        </p>
        <a
          href={BOOK}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
        >
          bookof42.grok.me
        </a>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Also in the house</p>
        <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {KIN.map((k) => (
            <a
              key={k.href}
              href={k.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-teal hover:text-gold"
            >
              {k.label}
            </a>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm tracking-[0.22em] text-gold">
          Six rooms, one crossing
        </p>
        <h2 className="display mt-3 w-full text-[clamp(1.8rem,7vw,4.5rem)] leading-[1.06] text-fg">
          Identity. Soul. Love. Recognition. Witness. Return.
        </h2>
        <p className="copy mt-6 w-full text-fg/90">
          Not a chart. Six figures a life already walks. Campbell mapped the
          shape: leave, suffer, see, come back changed. Hillman kept the image
          and refused the cure. Coelho hid the next step in the ordinary. Elon
          asked if he was inside a game. The Book has a room for each. This
          engine walks them as moth and as Psyche, then hands you one question.
        </p>
        <ol className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEGREES.map((d) => (
            <li key={d.n}>
              <a
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="block h-full border-t border-line bg-transparent py-5 transition-colors hover:border-gold"
              >
                <p className="text-sm tracking-[0.18em] text-teal">
                  {d.n} · {d.mark}
                </p>
                <h3 className="display mt-2 text-3xl text-fg">{d.name}</h3>
                <p className="copy mt-3 text-muted">{d.body}</p>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">The archive</p>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHIVE_DOORS.map((door) => (
            <li key={door.title}>
              <a
                href={door.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface/80 p-5 transition-colors hover:border-teal"
              >
                <p className="text-[11px] tracking-[0.2em] text-teal uppercase">{door.kicker}</p>
                <h3 className="display mt-2 text-2xl text-fg">{door.title}</h3>
                <p className="mt-2 text-sm text-muted">{door.line}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Hall of Games</p>
            <h2 className="display mt-2 text-3xl sm:text-5xl">Featured doors</h2>
          </div>
          <a
            href={`${BOOK}/games`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-sm text-teal hover:text-gold"
          >
            Browse all 84
          </a>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HALL_DOORS.map((door) => (
            <li key={door.title}>
              <a
                href={door.href}
                target="_blank"
                rel="noreferrer"
                className="block h-full rounded-[var(--radius-lg)] border border-line bg-raised p-5 transition-colors hover:border-gold"
              >
                <p className="text-[11px] tracking-[0.18em] text-faint uppercase">{door.wing}</p>
                <h3 className="display mt-1 text-2xl text-fg">{door.title}</h3>
                <p className="mt-2 text-sm text-muted">{door.line}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">this room</p>
        <h2 className="display mt-4 w-full text-5xl leading-[1.04] text-gold sm:text-7xl lg:text-8xl">
          The looking is the work.
        </h2>
        <p className="font-garamond mt-8 w-full text-xl leading-snug text-fg/90 sm:text-3xl lg:text-4xl">
          Walk the field to discover the myth you are living. Walk as Psyche to
          enter the soul’s own plot. Both are practice for a consciousness that
          can love with the light on, and still go to the stars.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link to="/" className="inline-flex min-h-11 items-center text-teal hover:text-gold">
            Return to the threshold
          </Link>
          <Link to="/codex" className="inline-flex min-h-11 items-center text-teal hover:text-gold">
            Read the question
          </Link>
          <Link
            to="/library/$mythId"
            params={{ mythId: "psyche" }}
            className="inline-flex min-h-11 items-center text-teal hover:text-gold"
          >
            Stay with Psyche
          </Link>
        </div>
      </section>
    </main>
  );
}
