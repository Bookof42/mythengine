import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CipherPlate } from "@/components/cipher-plate";
import { DeckTile } from "@/components/game/deck-tile";
import { Quoted } from "@/components/quoted";
import { CARDS } from "@/lib/cards";
import { useGame } from "@/lib/game-store";
import { CIPHER } from "@/lib/cipher";
import {
  ELON_ORIGIN,
  ELON_SIM,
  ELON_WALK,
  ELON_AVATAR,
  MEANING,
} from "@/lib/meaning";

export const Route = createFileRoute("/codex")({ component: CodexPage });

const BONES = [
  ["Conditions", "Rules"],
  ["Prohibition", "Quest"],
  ["The lamp", "Failure"],
  ["Loss", "Inventory"],
  ["Tasks", "Boss"],
  ["Helpers", "Party"],
  ["Underworld", "Dungeon"],
  ["Return", "Transform"],
] as const;

export function CodexPage() {
  const begin = useGame((s) => s.begin);
  const beginPsyche = useGame((s) => s.beginPsyche);
  const navigate = useNavigate();
  const go = (fn: () => void) => {
    fn();
    void navigate({ to: "/" });
  };

  return (
    <main className="min-h-dvh bg-bg pb-24">
      <header>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg">
          <img
            src="/art/hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-4 sm:px-8 sm:pt-14">
          <p className="text-sm tracking-[0.42em] text-gold uppercase">Codex</p>
          <h1 className="display mt-4 w-full text-5xl leading-[1.04] text-fg sm:text-7xl lg:text-8xl">
            Am I an avatar in someone's game?
          </h1>
          <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Elon asked it. She looked up Game. Then Myth. Myth was reverse
            ordinal 42. She named the room mythengine. Reverse reduction 42.
            Adams had already hung the towel.
          </p>
          <p className="mt-6">
            <a
              href={ELON_AVATAR.href}
              target="_blank"
              rel="noreferrer"
              className="text-lg text-teal hover:text-gold"
            >
              {ELON_AVATAR.cite} · {ELON_AVATAR.source}
            </a>
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm tracking-[0.28em] text-faint uppercase">The point</p>
        <h2 className="display mt-3 w-full text-4xl leading-[1.04] text-gold sm:text-6xl lg:text-7xl">
          Not a type. A question you can carry.
        </h2>
        <p className="font-garamond mt-8 w-full text-2xl text-fg/90 sm:text-3xl">
          You enter a field with mass. You take images. You return through a gap.
          The engine names the myth you are already living, not as fate, as
          weather, and hands you one question instead of an answer.
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-muted sm:text-2xl">
          Campbell mapped the shape. Hillman said the soul is in the image. Coelho
          hid omens in the ordinary. Elon asked if he was an avatar in someone's
          game. This house holds all four without turning any of them into a creed.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => go(begin)}
            className="rounded-[var(--radius-lg)] border border-gold/40 bg-surface/70 p-6 text-left hover:border-gold sm:p-8"
          >
            <p className="text-sm tracking-[0.22em] text-teal uppercase">Walk 01</p>
            <p className="display mt-2 text-3xl text-gold sm:text-5xl">The field</p>
            <p className="mt-3 text-lg text-muted sm:text-xl">
              A moth with mass. A lamp that pulls like a sun. Signs in orbit.
              Physics as myth. This is the game.
            </p>
          </button>
          <button
            type="button"
            onClick={() => go(beginPsyche)}
            className="rounded-[var(--radius-lg)] border border-line bg-surface/70 p-6 text-left hover:border-gold sm:p-8"
          >
            <p className="text-sm tracking-[0.22em] text-teal uppercase">Walk 02</p>
            <p className="display mt-2 text-3xl text-fg sm:text-5xl">Psyche</p>
            <p className="mt-3 text-lg text-muted sm:text-xl">
              Eight stations. No system first. Conditions, lamp, tasks, descent,
              return. The old plot, playable.
            </p>
          </button>
        </div>
      </section>

      <section className="border-y border-line bg-raised/20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm tracking-[0.28em] text-faint uppercase">The deck</p>
          <h2 className="display mt-3 w-full text-4xl text-gold sm:text-6xl lg:text-7xl">
            Eighteen cards. Images, not tests.
          </h2>
          <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            They had a place before the field learned gravity. They still do. A
            card is a looking. Tap to turn. Toward, away, or rest. The same
            grammar as a moth taking a sign.
          </p>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <DeckTile key={card.id} card={card} />
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm tracking-[0.28em] text-faint uppercase">The same bones</p>
        <h2 className="display mt-3 w-full text-4xl leading-[1.04] text-gold sm:text-6xl lg:text-7xl">
          A life can wear both.
        </h2>
        <p className="font-garamond mt-8 w-full text-2xl text-fg/90 sm:text-3xl">
          Neither has to become a literal cosmology. Both are how consciousness
          learns by entering experience. Myth gives the trials a face. A game
          gives the trials a body. You walk them from the inside.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          <p className="col-span-2 text-sm tracking-[0.22em] text-faint uppercase sm:col-span-4 sm:grid sm:grid-cols-2">
            <span>Myth</span>
            <span className="hidden sm:inline">Game</span>
          </p>
          {BONES.map(([myth, game]) => (
            <div key={myth} className="contents">
              <p className="display border-t border-line pt-4 text-2xl text-fg sm:text-3xl">
                {myth}
              </p>
              <p className="display border-t border-line pt-4 text-2xl text-gold sm:text-3xl">
                {game}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <CipherPlate />
      </div>

      <section id="meaning" className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">Kindred</p>
        <h2 className="display mt-3 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
          The meaning of life
        </h2>
        <p className="font-garamond mt-8 w-full text-2xl text-fg/90 sm:text-3xl">
          Adams gave the culture an Answer. Forty-two. Meaning not included.
          When someone asked Elon, he did not repeat the joke. He named a
          practice.
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-muted sm:text-2xl">
          Consciousness. Then the next question. Then love. Then doing the right
          thing especially when you think you are least likely to be observed.
          This engine is kin to that walk. Not a finished answer. A room that
          asks whether the door you just walked was a level or a myth. The
          coordinates are his, public, and{" "}
          <a
            href={MEANING}
            target="_blank"
            rel="noreferrer"
            className="text-teal hover:text-gold"
          >
            walkable
          </a>
          .
        </p>
        <div className="mt-4">
          {ELON_ORIGIN.map((line) => (
            <Quoted key={line.id} line={line} gold />
          ))}
          <Quoted line={ELON_WALK[0]!} />
          <Quoted line={ELON_SIM[0]!} />
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">
          Psyche means soul
        </p>
        <h2 className="display mt-3 w-full text-4xl sm:text-6xl lg:text-7xl">
          You do not get the system first.
        </h2>
        <p className="font-garamond mt-8 w-full text-2xl text-fg/90 sm:text-3xl">
          Psyche is the Greek word for soul. In <em>Apuleius</em> the figure is a
          woman. The walk is not a women's genre. Any soul that has been loved
          in the dark has to decide whether to lift the lamp.
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-muted sm:text-2xl">
          A room. A rule. A looking. Loss. Work you cannot finish alone. Help
          from below your pride. A box you were told not to open. Return, with
          the light on. The bones are already on the table above. This is the
          old plot, entered from the inside.
        </p>
        <p className="display mt-12 w-full text-4xl text-gold sm:text-6xl">
          Psyche · 0°00′42″
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl">
          In the Book of 42 the chart rounded the degree to zero. The seconds
          say otherwise. Soul holds the door between what already died and what
          has not been born. This engine makes that door playable.
        </p>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <p className="display w-full text-4xl leading-[1.08] text-fg sm:text-6xl lg:text-7xl">
          Two walks. The moth has mass. Psyche has a plot.
        </p>
        <p className="font-garamond mt-10 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
          Hold, take, return. Or lift the lamp. Both are practice for a
          consciousness that can love with the light on, and still go to the
          stars.
        </p>
        <p className="display mt-14 w-full text-3xl text-gold sm:text-5xl">
          For the love and healing of humanity.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button className="min-h-14 text-base tracking-[0.18em] uppercase" onClick={() => go(begin)}>
            Walk the field
          </Button>
          <Button variant="ghost" className="min-h-14 text-base" onClick={() => go(beginPsyche)}>
            Walk as Psyche
          </Button>
        </div>
        <Link
          to="/bridge"
          className="mt-6 inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
        >
          The family of 42
        </Link>
      </section>

      <details className="mx-auto mt-20 max-w-6xl border-t border-line px-5 pt-6 sm:px-8">
        <summary className="min-h-11 cursor-pointer list-none text-sm tracking-[0.28em] text-gold uppercase">
          Inspect
        </summary>
        <div className="font-garamond mt-8 space-y-6 text-xl text-muted sm:text-2xl">
          <p>
            Four faces, frozen: English Ordinal (A=1 to Z=26), Reverse Ordinal
            (A=26 to Z=1), Full Reduction (the 1–9 cycle), Reverse Reduction
            (flip A and Z first, then the cycle). Strip spaces and punctuation.
            Case does not matter. Seals: 21, 24, 42, 69, 84, 96, 142, 420.
          </p>
          <p>
            Myth lights reverse ordinal 42. mythengine lights reverse reduction
            42. Question lights the same reverse-reduction face. Don't Panic
            lights full reduction 42. Game does not. Lighting means
            correspondence under a named method. A miss is drawn as carefully as
            a hit.
          </p>
          <p>
            Longer plates live in the{" "}
            <a
              href={CIPHER}
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              Cipher
            </a>
            . Elon's coordinates are{" "}
            <a
              href={MEANING}
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              the meaning of life
            </a>
            . The name is the source.
          </p>
        </div>
      </details>
    </main>
  );
}
