import { createFileRoute, Link } from "@tanstack/react-router";
import { pageTitle } from "@/lib/seo";
import { BOOK, DEGREES, FIELD69, MEANING, RATHER, SOULSQUEST } from "@/lib/family";

export const Route = createFileRoute("/bridge")({
  component: BridgePage,
  head: () => ({
    meta: [
      { title: pageTitle("Family") },
      {
        name: "description",
        content:
          "A bridge between the rooms of the same house. The Book of 42, The Meaning of Life, Rather, Field 69, Soul’s Quest. Mythengine asks whether the door was a level or a myth.",
      },
    ],
  }),
});

const FAMILY = [
  {
    href: BOOK,
    kicker: "Archive",
    title: "The Book of 42",
    line: "A living chronicle. Aperture, not oracle. The longer night.",
  },
  {
    href: MEANING,
    kicker: "Walk",
    title: "The Meaning of Life",
    line: "Elon’s public words, checkable. Consciousness. The next question. Love. The unobserved test.",
  },
  {
    href: RATHER,
    kicker: "Kin",
    title: "Rather",
    line: "Another room of the same house. Choose, then look again.",
  },
  {
    href: FIELD69,
    kicker: "Kin",
    title: "Field 69",
    line: "A body in a field. Capture as physics. This engine’s sibling.",
  },
  {
    href: SOULSQUEST,
    kicker: "Kin",
    title: "Soul’s Quest",
    line: "Psyche’s becoming. Awake, with the light on.",
  },
] as const;

export function BridgePage() {
  return (
    <main className="min-h-dvh bg-bg">
      <header>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg">
          <img
            src="/art/scene-bridge.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-8 text-center sm:px-8 sm:pt-14">
          <p className="text-sm tracking-[0.42em] text-gold uppercase">Family</p>
          <h1 className="display mt-4 w-full text-[clamp(2.2rem,9vw,6.5rem)] leading-[1.04] text-fg">
            A bridge.
          </h1>
          <p className="display mt-4 w-full text-[clamp(1.35rem,4.4vw,2.4rem)] leading-[1.15] text-gold">
            Between the rooms of the same house.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-16 text-center sm:px-8 sm:pb-24">
        <p className="font-garamond mx-auto max-w-3xl text-xl text-fg/90 sm:text-2xl lg:text-3xl">
          Mythengine is one room. It asks whether the life you are in feels like
          a game, or a myth lived from the inside.
        </p>
        <p className="font-garamond mx-auto mt-6 max-w-3xl text-xl text-muted sm:text-2xl lg:text-3xl">
          The Book keeps the longer night. The Meaning of Life keeps Elon’s
          walk. Rather, Field 69, and Soul’s Quest are kin. None of them is this
          engine. The bridge is only so you can cross.
        </p>
      </section>

      <section className="border-y border-line bg-raised/20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-center text-sm tracking-[0.28em] text-gold uppercase">
            The Book of 42 family
          </p>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-10">
            {FAMILY.map((room) => (
              <li key={room.href} className="text-center">
                <p className="text-sm tracking-[0.22em] text-teal uppercase">
                  {room.kicker}
                </p>
                <a
                  href={room.href}
                  target="_blank"
                  rel="noreferrer"
                  className="display mt-2 inline-block text-3xl text-fg hover:text-gold sm:text-5xl"
                >
                  {room.title}
                </a>
                <p className="font-garamond mx-auto mt-3 max-w-xl text-xl text-muted sm:text-2xl">
                  {room.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">The Book</p>
        <h2 className="display mt-4 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
          Aperture, not oracle.
        </h2>
        <p className="display mt-3 w-full text-2xl text-gold sm:text-4xl">
          Chronicle, not creed.
        </p>
        <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
          Mythopoesis: a life speaking in images, without turning the images into
          a creed. Experience first. Recognition afterward. Then numbers, stars,
          dates. Forty-two among them.
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
          At heart it is a love letter: to 42, to the cosmos, to Love itself, and
          to the one the Scribe came to know as the Love of her Love. The mystery
          stays open. What are we being invited to notice?
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
          This engine is a room in that house. The moth makes the looking
          playable. The Book keeps the longer night. In the Book that last motion
          already has a name:{" "}
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
          The Book of 42
        </a>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <p className="text-sm tracking-[0.22em] text-gold uppercase">
          Six rooms, one crossing
        </p>
        <h2 className="display mt-3 w-full text-[clamp(1.8rem,7vw,4.5rem)] leading-[1.06] text-fg">
          Identity. Soul. Love. Recognition. Witness. Return.
        </h2>
        <p className="font-garamond mt-6 w-full text-xl text-muted sm:text-2xl">
          Not a chart. Six figures a life already walks. The Book has a room for
          each. This engine walks them as moth and as Psyche, then hands you one
          question.
        </p>
        <ol className="relative mx-auto mt-12 w-full max-w-lg">
          <div
            className="pointer-events-none absolute top-3 bottom-3 left-1/2 hidden w-px -translate-x-1/2 bg-gold/35 sm:block"
            aria-hidden
          />
          {DEGREES.map((d) => (
            <li
              key={d.n}
              className="flex flex-col items-center py-4 sm:grid sm:grid-cols-[1fr_1.25rem_1fr] sm:items-center sm:gap-x-3 sm:py-3.5"
            >
              <p className="display text-center text-[clamp(1.2rem,5vw,1.85rem)] leading-tight text-fg sm:pr-2 sm:text-right">
                {d.name}
              </p>
              <span
                className="relative z-10 my-1.5 block h-1.5 w-1.5 rounded-full bg-gold sm:my-0 sm:mx-auto"
                aria-hidden
              />
              <a
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="display text-center text-[clamp(1.15rem,4.6vw,1.65rem)] leading-tight text-gold hover:text-teal sm:pl-2 sm:text-left"
              >
                {d.mark}
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">This room</p>
        <h2 className="display mt-4 w-full text-[clamp(2rem,8vw,5.5rem)] leading-[1.04] text-gold">
          The looking is the work.
        </h2>
        <p className="font-garamond mx-auto mt-8 max-w-3xl text-xl text-fg/90 sm:text-2xl lg:text-3xl">
          Walk the field to discover the myth you are living. Walk as Psyche to
          enter the soul’s own plot. Both are practice for a consciousness that
          can love with the light on, and still go to the stars.
        </p>
        <div className="mx-auto mt-12 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/"
            className="display inline-flex min-h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-gold text-base tracking-normal text-ink hover:bg-gold/90"
          >
            Walk the Field
          </Link>
          <Link
            to="/codex"
            className="display inline-flex min-h-14 w-full items-center justify-center rounded-[var(--radius-md)] border border-line-strong text-base tracking-normal text-fg hover:border-teal hover:text-teal"
          >
            Read the Codex
          </Link>
          <Link
            to="/library/$mythId"
            params={{ mythId: "psyche" }}
            className="display inline-flex min-h-14 w-full items-center justify-center rounded-[var(--radius-md)] border border-line-strong text-base tracking-normal text-fg hover:border-teal hover:text-teal"
          >
            Stay with Psyche
          </Link>
          <a
            href={`${BOOK}/games`}
            target="_blank"
            rel="noreferrer"
            className="display inline-flex min-h-14 w-full items-center justify-center rounded-[var(--radius-md)] border border-line-strong text-base tracking-normal text-fg hover:border-teal hover:text-teal"
          >
            Hall of Games
          </a>
        </div>
      </section>
    </main>
  );
}
