import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CipherPlate } from "@/components/cipher-plate";
import { DeckTile } from "@/components/game/deck-tile";
import { Quoted } from "@/components/quoted";
import { CARDS } from "@/lib/cards";
import { useGame } from "@/lib/game-store";
import { CIPHER } from "@/lib/cipher";
import { BOOK } from "@/lib/family";
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
  const dayCard = CARDS[Math.floor(Date.now() / 86_400_000) % CARDS.length]!;

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
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-4 text-center sm:px-8 sm:pt-14">
          <p className="text-sm tracking-[0.42em] text-gold uppercase">Codex</p>
          <h1 className="display mt-4 w-full text-[clamp(1.45rem,7.2vw,5.5rem)] leading-[1.12] text-fg">
            Am I an avatar in someone’s game?
          </h1>
          <p className="font-garamond mx-auto mt-5 w-full text-base text-fg/90 sm:mt-6 sm:text-2xl lg:text-3xl">
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
        <p className="text-sm tracking-[0.28em] text-gold uppercase">The point</p>
        <h2 className="display mt-4 w-full text-[clamp(1.7rem,8vw,4.5rem)] leading-[1.08] text-fg">
          Not a type. A question you can carry.
        </h2>
        <p className="font-garamond mt-6 w-full text-lg text-fg/90 sm:mt-8 sm:text-3xl lg:text-4xl">
          You enter a field with mass. You take images. You return through a gap.
          The engine names the myth you are already living. Weather, not fate. One
          question instead of an answer.
        </p>
        <ul className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-16">
          <li>
            <p className="text-sm tracking-[0.28em] text-teal uppercase">Campbell</p>
            <p className="display mt-3 text-2xl text-gold sm:text-3xl lg:text-4xl">
              The shape of a life that leaves, suffers, returns.
            </p>
            <p className="font-garamond mt-4 text-lg text-muted sm:text-xl">
              Myth is not an old story about somebody else. You can wear the shape
              without turning it into a cosmology.
            </p>
          </li>
          <li>
            <p className="text-sm tracking-[0.28em] text-teal uppercase">von Franz</p>
            <p className="display mt-3 text-2xl text-gold sm:text-3xl lg:text-4xl">
              The tale is the psyche, already walking.
            </p>
            <p className="font-garamond mt-4 text-lg text-muted sm:text-xl">
              You do not decode a type. You notice which figure is living you, and
              how exact the fairy tale already is.
            </p>
          </li>
          <li>
            <p className="text-sm tracking-[0.28em] text-teal uppercase">Hillman</p>
            <p className="display mt-3 text-2xl text-gold sm:text-3xl lg:text-4xl">
              The soul is in the image.
            </p>
            <p className="font-garamond mt-4 text-lg text-muted sm:text-xl">
              Deepen it. Do not cure it. A looking is not a diagnosis.
            </p>
          </li>
          <li>
            <p className="text-sm tracking-[0.28em] text-teal uppercase">Coelho</p>
            <p className="display mt-3 text-2xl text-gold sm:text-3xl lg:text-4xl">
              Omens hide in the ordinary.
            </p>
            <p className="font-garamond mt-4 text-lg text-muted sm:text-xl">
              The marvels, and the oil on the spoon. Correspondence. Never a rite.
            </p>
          </li>
        </ul>
        <p className="display mt-14 w-full text-3xl text-fg sm:text-5xl">
          This house holds the lookings. Not a creed.
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
            onClick={() => go(() => beginPsyche("short"))}
            className="rounded-[var(--radius-lg)] border border-line bg-surface/70 p-6 text-left hover:border-gold sm:p-8"
          >
            <p className="text-sm tracking-[0.22em] text-teal uppercase">Walk 02</p>
            <p className="display mt-2 text-3xl text-fg sm:text-5xl">Psyche</p>
            <p className="mt-3 text-lg text-muted sm:text-xl">
              A short night: lamp, loss, return. Or the long night of eight, if
              you ask.
            </p>
          </button>
        </div>
      </section>

      <section className="border-y border-line bg-raised/20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm tracking-[0.28em] text-faint uppercase">The deck</p>
          <h2 className="display mt-3 w-full text-4xl text-gold sm:text-6xl lg:text-7xl">
            One card. The rest wait.
          </h2>
          <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            A looking for the civil day. Tap to turn. Toward, away, or rest. The
            other seventeen stay in the night.
          </p>
          <div className="mx-auto mt-12 max-w-md">
            <DeckTile card={dayCard} />
          </div>
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

      <section id="meaning" className="mt-24">
        <div className="relative aspect-[50/11] w-full overflow-hidden bg-bg">
          <img
            src="/art/kindred.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
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
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <p className="text-sm tracking-[0.42em] text-gold uppercase">
          Psyche means soul
        </p>
        <h2 className="display mt-4 w-full whitespace-nowrap text-[clamp(1.35rem,5.2vw,5.5rem)] leading-none text-fg">
          You do not get the system first.
        </h2>
        <p className="font-garamond mt-8 w-full text-2xl text-fg/90 sm:text-3xl lg:text-4xl">
          Psyche is the Greek word for soul. In <em>Apuleius</em> the figure is a
          woman. The walk is not a women’s genre. Any soul that has been loved
          in the dark has to decide whether to lift the lamp.
        </p>
      </section>

      <p className="display mx-auto mt-16 max-w-5xl px-5 text-center text-2xl leading-snug text-gold sm:px-8 sm:text-4xl lg:text-5xl">
        A room. A rule. A looking. Loss. Work you cannot finish alone. Help.
        A box. Return, with the light on.
      </p>

      <section className="mx-auto mt-24 max-w-6xl px-5 text-center sm:px-8">
        <p className="text-sm tracking-[0.32em] text-faint uppercase">
          In the Scribe’s birth data
        </p>
        <h2 className="display mt-4 text-4xl text-gold sm:text-6xl lg:text-7xl">
          Psyche · 0°00′42″
        </h2>
        <p className="font-garamond mx-auto mt-8 max-w-3xl text-xl text-fg/90 sm:text-2xl">
          One Psyche names the soul. Another circles the Sun. In the Scribe’s
          own numbers, Psyche is measured 42 arcseconds across a threshold. A
          spacecraft is on its way to asteroid 16 Psyche, asking what that world
          really is. This is not a horoscope handing you a quest. It is a rhyme
          the Book noticed: myth, measurement, a life. Correspondence. Never
          assignment.
        </p>
        <p className="font-garamond mx-auto mt-6 max-w-3xl text-lg text-muted sm:text-xl">
          The chart rounded the degree to zero. The seconds say otherwise. Soul
          holds the door between what already died and what has not been born.
          This engine makes that door playable. The Book keeps the longer night.
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

      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">The player</p>
        <h2 className="display mt-4 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
          The moth is not a mascot.
        </h2>
        <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
          It is an old image of a soul that flies at night. The butterfly got the
          daylight and the wedding. The moth kept the lamp, the risk, and the
          hour when looking costs.
        </p>
        <details className="mt-12 border-t border-line pt-6">
          <summary className="min-h-11 cursor-pointer list-none text-sm tracking-[0.28em] text-gold uppercase">
            Roots
          </summary>
          <div className="font-garamond mt-8 space-y-6 text-xl text-muted sm:text-2xl">
            <p>
              In Greek, <em>psychē</em> is soul, breath, and butterfly. In
              <em>Apuleius</em> the soul grows wings. Linnaeus later gave the
              bagworm moths the family name Psychidae: the same word, night side.
              This house flies the night side. Psyche is the plot. The moth is the
              body that still has to approach.
            </p>
            <p>
              Folklore, in many rooms, makes the moth a messenger: a soul visiting,
              a last goodbye, sometimes a death at the candle. The black witch moth
              of the Americas is told that way, and also as a farewell. Hawai‘i
              holds both. Celtic night-lore often gives moths to the dead. None of
              that is a booking. It is a pattern: a small winged thing at a flame,
              and a human being who cannot help reading it.
            </p>
            <p>
              The physics is older than the omen. Phototaxis. A body throws itself
              at a light it cannot hold. Some call it death. Some call it worship.
              The engine does not decide. It gives the moth mass, a lamp that pulls
              like a sun, and a seam to return through. Inverse square is the myth
              made playable.
            </p>
            <p>
              Hillman would keep the image and refuse the cure. The moth is not a
              personality. It is how consciousness looks when it wants what might
              burn it, and still flies. Adams would add that this is a terrible
              design for a species, and an excellent design for a game. Don’t
              Panic. The towel is still in the Codex.
            </p>
          </div>
        </details>
      </section>

      <section className="mt-24 border-y border-line bg-raised/20">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-sm tracking-[0.28em] text-teal uppercase">Two walks</p>
          <h2 className="display mt-4 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
            The moth has mass. Psyche has a plot.
          </h2>
          <p className="font-garamond mt-8 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            Hold, take, return. Or lift the lamp. Both are practice for a
            consciousness that can love with the light on, and still go to the
            stars.
          </p>
          <details className="mt-12 border-t border-line pt-6">
            <summary className="min-h-11 cursor-pointer list-none text-sm tracking-[0.28em] text-gold uppercase">
              Daimon · Eros · Hillman
            </summary>
            <div className="font-garamond mt-8 space-y-6 text-xl text-fg/90 sm:text-2xl">
              <p>
                Hillman called the daimon the image that chose the life. Not a
                career. Not fate. An acorn, not a program. It does not explain
                itself. It keeps arriving until it is seen.
              </p>
              <p>
                Eros, in <em>Apuleius</em>, comes only in the dark. Then a lamp.
                Then a face. Then a question that was not in the room before the
                light. The oil burns because seeing is not free, and because
                something in the house is no longer asleep.
              </p>
              <p>
                The moth does this with mass. It does not solve the lamp. It
                approaches. If there is an awakening, it looks like that: not a
                speech, a better question left in the hand. Consciousness,
                noticing. The next question, unforced. Love, still possible with
                the light on.
              </p>
            </div>
          </details>
          <p className="display mt-14 w-full text-center text-3xl text-gold sm:text-5xl lg:text-6xl">
            For the love and healing of humanity.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="min-h-14 text-base tracking-[0.18em] uppercase" onClick={() => go(begin)}>
              Walk the field
            </Button>
            <Button variant="ghost" className="min-h-14 text-base" onClick={() => go(() => beginPsyche("short"))}>
              A short night
            </Button>
            <Button variant="ghost" className="min-h-14 text-base" onClick={() => go(() => beginPsyche("long"))}>
              The long night
            </Button>
          </div>
          <Link
            to="/bridge"
            className="mt-8 inline-flex min-h-11 w-full items-center justify-center text-lg text-teal hover:text-gold"
          >
            The family of 42
          </Link>
        </div>
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
            42. Question lights the same reverse-reduction face. Don’t Panic
            lights full reduction 42. Game does not. Lighting means
            correspondence under a named method. A miss is drawn as carefully as
            a hit.
          </p>
          <p>
            The longer gematria plates live in the Book’s{" "}
            <a
              href={CIPHER}
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              Cipher
            </a>
            : Computer and Humanity as twins, the Adams towel, the rest. This
            page only shows the four faces that light 42 for this engine.
          </p>
          <p>
            <a
              href={MEANING}
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              The Meaning of Life
            </a>{" "}
            is a different room. It walks through things Elon has said in
            public: consciousness, the next question, love, the unobserved test.
            The lines quoted above are his. Each one is linked so you can read
            the original. This engine does not claim those lines are the meaning
            of life. It claims they are checkable, and kin.
          </p>
        </div>
      </details>
    </main>
  );
}
