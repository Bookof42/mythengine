import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ARCHIVE_DOORS,
  BOOK,
  DEGREES,
  FIELD69,
  HALL_DOORS,
  MEANING,
  RATHER,
} from "@/lib/family";

export const Route = createFileRoute("/bridge")({ component: BridgePage });

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
      <header className="relative min-h-dvh overflow-hidden">
        <img
          src="/art/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/25" />
        <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16">
          <p className="text-[11px] tracking-[0.42em] text-gold uppercase">Family</p>
          <h1 className="display mt-4 w-full text-5xl leading-[1.04] text-fg sm:text-7xl lg:text-8xl">
            A bridge between the rooms of the same house.
          </h1>
          <p className="font-garamond mt-8 w-full text-xl leading-snug text-fg/90 sm:text-3xl lg:text-4xl">
            mythengine sits inside the family of{" "}
            <a href={BOOK} target="_blank" rel="noreferrer" className="text-gold hover:text-teal">
              The Book of 42
            </a>{" "}
            and{" "}
            <a href={MEANING} target="_blank" rel="noreferrer" className="text-gold hover:text-teal">
              The Meaning of Life
            </a>
            . That walk is Elon's coordinates, checkable: consciousness, the next
            question, love, the unobserved test. This engine is the room that asks
            whether the door you just walked was a level or a myth.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {COORDINATES.map((c) => (
              <li key={c.n}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block border-t border-gold/40 pt-3"
                >
                  <p className="text-[10px] tracking-[0.22em] text-teal">{c.n}</p>
                  <p className="display mt-1 text-lg text-fg sm:text-xl">{c.title}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

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
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
          Six degrees, one crossing
        </p>
        <h2 className="display mt-3 max-w-3xl text-3xl sm:text-5xl">
          Identity. Soul. Love. Recognition. Witness. Return.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Walked in six rooms of the Book, and in every walk of this engine.
        </p>
        <ol className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEGREES.map((d) => (
            <li key={d.n}>
              <a
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="block h-full rounded-[var(--radius-lg)] border border-line bg-surface p-5 transition-colors hover:border-teal"
              >
                <p className="text-[11px] tracking-[0.22em] text-teal">
                  {d.n} · {d.mark}
                </p>
                <h3 className="display mt-2 text-2xl text-fg">{d.name}</h3>
                <p className="mt-2 text-sm text-muted">{d.body}</p>
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
          enter the soul's own plot. Both are practice for a consciousness that
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
