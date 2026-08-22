import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CipherPlate } from "@/components/cipher-plate";
import { Fold } from "@/components/fold";
import { QuietClip } from "@/components/quiet-clip";
import { DeckTile } from "@/components/game/deck-tile";
import { KindredMonomyth, KindredPath, KindredSky, useKindred } from "@/components/kindred-path";
import { Quoted } from "@/components/quoted";
import { CARDS } from "@/lib/cards";
import { useGame } from "@/lib/game-store";
import { CIPHER } from "@/lib/cipher";
import { BOOK, SOULSQUEST } from "@/lib/family";
import { pageTitle } from "@/lib/seo";
import { pickOmen } from "@/lib/engine";
import { OMEN_MYTH } from "@/lib/omens";
import { MYTH_BY_ID } from "@/lib/myths";
import { useMemo } from "react";
import {
  ELON_ORIGIN,
  ELON_SIM,
  ELON_WALK,
  ELON_AVATAR,
  MEANING,
} from "@/lib/meaning";

export const Route = createFileRoute("/codex")({
  component: CodexPage,
  head: () => ({
    meta: [
      { title: pageTitle("Codex") },
      {
        name: "description",
        content:
          "Am I an avatar in someone’s game? Elon asked it. Myth was reverse ordinal 42. Mythengine is reverse reduction 42.",
      },
    ],
  }),
});

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
  const save = useGame((s) => s.save);
  const ready = useGame((s) => s.ready);
  const navigate = useNavigate();
  const go = (fn: () => void) => {
    fn();
    void navigate({ to: "/" });
  };
  const dayCard = CARDS[Math.floor(Date.now() / 86_400_000) % CARDS.length]!;
  const omen = useMemo(() => pickOmen(new Date()), []);
  const kindred = useKindred();

  return (
    <main className="min-h-dvh bg-bg">
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
            “Am I an avatar in someone’s game?”
          </h1>
          <p className="font-garamond mx-auto mt-5 w-full text-xl leading-snug text-fg/90 sm:mt-6 sm:text-3xl lg:text-4xl">
            Elon asked it.
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
              The next step is already in the day.
            </p>
            <p className="font-garamond mt-4 text-lg text-muted sm:text-xl">
              The ordinary is already wearing a sign.
            </p>
          </li>
        </ul>
        <p className="display mt-14 w-full text-3xl text-fg sm:text-5xl">
          This house holds the lookings. Not a creed.
        </p>
        <Fold
          label="von Franz"
          className="mt-10 text-left"
          summaryClassName="display text-2xl sm:text-3xl"
        >
          <div className="mt-8 space-y-6">
            <p className="display text-2xl text-gold sm:text-4xl">
              “Fairy tales are the purest and simplest expression of collective
              unconscious psychic processes.”
            </p>
            <p className="text-lg text-teal">
              Marie-Louise von Franz · <em>The Interpretation of Fairy Tales</em>
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              She sat with tales until the skeleton showed. Amplification, not
              allegory. Not a type you can wear like a coat.
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              If she ate six seeds, she ate six seeds. The fruit is the analysis.
            </p>
            <p className="font-garamond text-xl text-muted sm:text-2xl">
              This house is mostly myth, which wears more culture. The looking
              does not change. Notice which figure is living you. Then go make
              supper.
            </p>
          </div>
        </Fold>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => go(begin)}
            className="rounded-[var(--radius-lg)] border border-gold/40 bg-surface/70 p-6 text-left hover:border-gold sm:p-8"
          >
            <p className="text-sm tracking-[0.22em] text-teal uppercase">Walk 01</p>
            <p className="display mt-2 text-3xl text-gold sm:text-5xl">The field</p>
            <p className="mt-3 text-lg text-muted sm:text-xl">
              A moth with mass. Gold to take. A gap that brightens when you
              carry something.
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
              Lamp, loss, return. A station may offer a card.
            </p>
          </button>
        </div>
        {omen ? (
          <section id="pattern" className="mt-16 scroll-mt-24">
            <div className="relative aspect-video w-full overflow-hidden bg-bg">
              <img
                src="/art/omen.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
            <p className="mt-8 text-sm tracking-[0.28em] text-gold">
              Synchronicity
            </p>
            <h2 className="display mt-3 w-full text-[clamp(1.8rem,6vw,4rem)] leading-[1.08] text-fg">
              Inner and outer rhyme.
            </h2>
            <p className="font-garamond mt-5 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
              Jung used the word for a coincidence that means something, without
              one thing causing the other. Two events land together. The meaning
              is in the togetherness. Psyche and the world, briefly in the same
              room. Not a forecast. A noticing.
            </p>
            <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl">
              If today’s image fits, you noticed. If it does not, let it go. The
              looking still happened.
            </p>
            <p className="mt-10 text-sm tracking-[0.22em] text-teal">
              Today · one door from the forty-two
            </p>
            <h3 className="display mt-3 w-full text-[clamp(1.6rem,5vw,3.2rem)] leading-[1.08] text-gold">
              {omen.title}
            </h3>
            <p className="font-garamond mt-4 w-full text-xl text-fg/90 sm:text-2xl">
              {omen.body}
            </p>
            {OMEN_MYTH[omen.id] && MYTH_BY_ID[OMEN_MYTH[omen.id]!] ? (
              <p className="mt-6">
                <Link
                  to="/library/$mythId"
                  params={{ mythId: OMEN_MYTH[omen.id]! }}
                  className="text-lg text-teal hover:text-gold"
                >
                  {MYTH_BY_ID[OMEN_MYTH[omen.id]!]!.name}, in the library
                </Link>
              </p>
            ) : null}
            <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl">
              The civil day chooses which tale stands in the doorway. Tomorrow,
              another. If it does not fit, let it go.
            </p>
          </section>
        ) : null}
      </section>

      <section className="border-y border-line bg-raised/20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm tracking-[0.28em] text-faint uppercase">The deck</p>
          <h2 className="display mt-3 w-full text-4xl text-gold sm:text-6xl lg:text-7xl">
            One card. The rest wait.
          </h2>
          <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            A looking for the civil day. Tap to turn. Toward, away, or rest. The
            rest of the deck waits in the night.
          </p>
          <div className="mx-auto mt-12 max-w-md">
            <DeckTile card={dayCard} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24">
        <p className="text-sm tracking-[0.28em] text-faint uppercase">The same bones</p>
        <h2 className="display mt-3 w-full text-4xl leading-[1.04] text-gold sm:text-6xl lg:text-7xl">
          A life can wear both.
        </h2>
        <p className="font-garamond mx-auto mt-8 max-w-3xl text-2xl text-fg/90 sm:text-3xl">
          A game has rules, thresholds, losses. A myth has trials, helpers,
          returns.
        </p>
        <p className="font-garamond mx-auto mt-4 max-w-3xl text-xl text-muted sm:text-2xl">
          Neither has to become a cosmology. Both are how consciousness learns by
          entering experience.
        </p>
        <div className="relative mx-auto mt-14 w-full max-w-lg">
          <div
            className="pointer-events-none absolute top-8 bottom-2 left-1/2 w-px -translate-x-1/2 bg-gold/35"
            aria-hidden
          />
          <div className="grid grid-cols-[1fr_1.25rem_1fr] items-end gap-x-2 pb-3 sm:gap-x-3">
            <p className="pr-2 text-right text-[0.65rem] tracking-[0.28em] text-muted uppercase">
              Myth
            </p>
            <span aria-hidden />
            <p className="pl-2 text-left text-[0.65rem] tracking-[0.28em] text-gold uppercase">
              Game
            </p>
          </div>
          <ul>
            {BONES.map(([myth, game]) => (
              <li
                key={myth}
                className="grid grid-cols-[1fr_1.25rem_1fr] items-center gap-x-2 py-3.5 sm:gap-x-3 sm:py-4"
              >
                <p className="display pr-2 text-right text-[clamp(1.05rem,4.4vw,1.85rem)] leading-tight text-fg">
                  {myth}
                </p>
                <span
                  className="relative z-10 mx-auto block h-1.5 w-1.5 rounded-full bg-gold"
                  aria-hidden
                />
                <p className="display pl-2 text-left text-[clamp(1.05rem,4.4vw,1.85rem)] leading-tight text-gold">
                  {game}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="display mt-16 w-full text-[clamp(1.6rem,6vw,3.8rem)] leading-[1.12] text-gold">
          Is life a game, or a myth we live from the inside?
        </p>
        <p className="display mt-8 w-full text-[clamp(1.35rem,4.4vw,2.15rem)] leading-[1.2] text-fg">
          One question, not an answer.
        </p>
        <Fold
          label="More"
          className="mx-auto mt-12 max-w-3xl text-left"
          summaryClassName="display justify-center text-xl"
        >
          <div className="mt-10 space-y-5 text-left">
            <p className="display text-2xl leading-snug text-gold sm:text-3xl">
              Two old technologies for the same problem.
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              How a consciousness enters an experience it does not yet
              understand.
            </p>
            <p className="pt-4 text-sm tracking-[0.28em] text-gold uppercase">
              Game
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              A world that admits it is made. A start. A rule. A fail state. A
              score you can see.
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              Huizinga called play a magic circle. Inside it the ordinary is
              suspended, and the new law is binding because you agreed. He put
              the card-table and the temple in the same list. This house sits on
              that comma.
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              A game tells you that looking is a move. You can die and still be
              the one who died. Elon’s question lives here: if I am an avatar,
              whose session is this, and what are the win conditions when no one
              is watching?
            </p>
            <p className="pt-4 text-sm tracking-[0.28em] text-gold uppercase">
              Myth
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              A world that does not admit it is made. It happens in{" "}
              <em>illo tempore</em>, the time of the first time. You do not beat
              it. You undergo it.
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              Campbell called it the monomyth: one shape under many tales.
              People now call that the hero’s journey. He mapped it in{" "}
              <em>The Hero with a Thousand Faces</em>.
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              Leave home. Cross a threshold. Suffer what unmakes you. Meet
              helpers. Descend. Return with a boon that is not loot. A capacity
              you did not have when you left.
            </p>
            <p className="font-garamond text-xl text-muted sm:text-2xl">
              He was not drawing a level map. He was describing a sequence a
              life can wear.
            </p>
            <ol className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              {(
                [
                  ["01", "Departure", ["Leave home", "Cross a threshold"]],
                  ["02", "Initiation", ["Ordeal", "Helpers", "Descend"]],
                  ["03", "Return", ["A boon that is not loot", "A capacity"]],
                ] as const
              ).map(([n, title, beats]) => (
                <li
                  key={n}
                  className="border-t border-gold/35 pt-4 text-center sm:text-left"
                >
                  <p className="text-sm tracking-[0.28em] text-teal">{n}</p>
                  <p className="display mt-2 text-2xl text-gold sm:text-3xl">
                    {title}
                  </p>
                  <ul className="font-garamond mt-3 space-y-1 text-lg text-fg/90 sm:text-xl">
                    {beats.map((beat) => (
                      <li key={beat}>{beat}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <p className="font-garamond mt-6 text-lg text-muted sm:text-xl">
              Three rooms. You leave the first. You do not beat the second. You
              come back able to inhabit the third.
            </p>
            <Fold
              label="The seventeen"
              className="mt-6 text-left"
              summaryClassName="display text-xl"
            >
              <div className="mt-6 space-y-6 text-left">
                <p className="font-garamond text-xl text-muted sm:text-2xl">
                  Not every tale wears every station. Psyche does not. The moth
                  does not. That is allowed. His language is of its century. The
                  images are not the gender of the player.
                </p>
                <p className="text-sm tracking-[0.28em] text-gold uppercase">
                  Departure
                </p>
                <ul className="font-garamond space-y-3 text-xl text-fg/90 sm:text-2xl">
                  <li>The Call to Adventure · the known world thins. Something asks.</li>
                  <li>Refusal of the Call · fear, duty, a life that already works.</li>
                  <li>Supernatural Aid · a helper, a tool, a word you did not invent.</li>
                  <li>Crossing of the First Threshold · you leave. The guardians are real.</li>
                  <li>Belly of the Whale · swallowed. The old self is not available.</li>
                </ul>
                <p className="pt-2 text-sm tracking-[0.28em] text-gold uppercase">
                  Initiation
                </p>
                <ul className="font-garamond space-y-3 text-xl text-fg/90 sm:text-2xl">
                  <li>The Road of Trials · tests. Failures that count.</li>
                  <li>
                    Meeting with the Goddess · the image of life as it might be
                    loved.
                  </li>
                  <li>
                    Woman as the Temptress · the lure that would stop the work: a
                    palace, a face you are not ready to see.
                  </li>
                  <li>
                    Atonement with the Father · reconcile with the power that made
                    the rules. Not always a man. Often the law of the house.
                  </li>
                  <li>Apotheosis · a widening. You are more than the person who left.</li>
                  <li>
                    The Ultimate Boon · what you came for. Here: a capacity, not
                    loot.
                  </li>
                </ul>
                <p className="pt-2 text-sm tracking-[0.28em] text-gold uppercase">
                  Return
                </p>
                <ul className="font-garamond space-y-3 text-xl text-fg/90 sm:text-2xl">
                  <li>Refusal of the Return · why go back.</li>
                  <li>The Magic Flight · sometimes the boon is chased. You run with it.</li>
                  <li>
                    Rescue from Without · help from the world you left. Pride does
                    not finish this.
                  </li>
                  <li>
                    Crossing of the Return Threshold · ordinary time, newly seen.
                  </li>
                  <li>
                    Master of Two Worlds · palace and daylight. Game and myth.
                    Both.
                  </li>
                  <li>
                    Freedom to Live · the work is not anxiety. It is inhabiting.{" "}
                    <em>Don’t Panic.</em> Love with the light on.
                  </li>
                </ul>
              </div>
            </Fold>
            <Fold
              label="The twelve"
              className="mt-4 text-left"
              summaryClassName="display text-xl"
            >
              <div className="mt-6 space-y-5 text-left">
                <p className="font-garamond text-xl text-muted sm:text-2xl">
                  Vogler cut Campbell for a clock.{" "}
                  <em>The Writer’s Journey</em>. The film-school cousin. Same
                  three rooms. Twelve beats. Still not a quiz.
                </p>
                <ul className="font-garamond space-y-3 text-xl text-fg/90 sm:text-2xl">
                  <li>Ordinary World · the life before the looking.</li>
                  <li>Call to Adventure · something asks.</li>
                  <li>Refusal of the Call · the palace is enough. The lamp stays dark.</li>
                  <li>Meeting the Mentor · a helper. A towel. Ants. A reed.</li>
                  <li>Crossing the Threshold · the lamp. The well’s lip.</li>
                  <li>Tests, Allies, Enemies · signs in orbit. Sisters. Tasks.</li>
                  <li>Approach to the Inmost Cave · the underworld. The box. The seam.</li>
                  <li>The Ordeal · oil. Loss. Miss, and you loop.</li>
                  <li>Reward · a face. A question. Gold you can carry.</li>
                  <li>The Road Back · you still have to return.</li>
                  <li>Resurrection · a last death of the old self. Daylight.</li>
                  <li>
                    Return with the Elixir · a capacity, not loot. Love with the
                    light on.
                  </li>
                </ul>
              </div>
            </Fold>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              Von Franz said the tale is already walking. Hillman said deepen
              the image. Do not decode a type.
            </p>
            <p className="display pt-4 text-2xl leading-snug text-gold sm:text-3xl">
              Both are initiation, in different clothes.
            </p>
            <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
              Three rooms on the table. The seventeen wait in the fold, for the
              curious. Kindred walks the three. None of them is a cosmology.
            </p>
            <p className="font-garamond text-xl text-muted sm:text-2xl">
              A life can leave, suffer, and come back able. That is already fun,
              if you refuse to turn it into a religion.
            </p>
          </div>
        </Fold>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <CipherPlate />
      </div>

      <section id="ask" className="mt-24">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <p className="text-sm tracking-[0.28em] text-gold uppercase">
            Question · Myth
          </p>
          <h2 className="display mt-4 w-full text-[clamp(2rem,8vw,5.5rem)] leading-[1.06] text-fg">
            What questions will you ask?
          </h2>
          <p className="font-garamond mx-auto mt-6 max-w-3xl text-xl text-muted sm:text-2xl">
            Adams gave the culture an Answer. Consciousness is how a better
            Question arrives.
          </p>
        </div>
        <div className="relative mt-10 aspect-video w-full overflow-hidden bg-bg">
          <img
            src="/art/question.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="mx-auto max-w-3xl px-5 pt-10 text-center sm:px-8">
          <p className="font-garamond text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Myth lights reverse ordinal 42. Question lights reverse reduction
            42. The same seal, two clothes. What if a life that is a myth is a
            life that keeps asking?
          </p>
          <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
            The overlap is not an answer. It is a door.
          </p>
          <p className="font-garamond mt-6 text-xl text-muted sm:text-2xl">
            The vesica is kin to{" "}
            <a
              href={SOULSQUEST}
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              Soul’s Quest
            </a>
            . There a moth sits in the door. Here the door is empty, so a
            question can still enter.
          </p>
        </div>
      </section>

      <section id="meaning" className="mt-24">
        <KindredSky />
        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">Kindred</p>
        <h2 className="display mt-3 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
          The meaning of life
        </h2>
        <p className="font-garamond mt-8 w-full text-xl text-muted sm:text-2xl">
          The painting is the walk. Three rooms: leave, initiation, return. The
          names sit under it, where they can be read.
        </p>
        <KindredMonomyth active={kindred.active} pick={kindred.pick} />
        <p className="font-garamond mt-8 w-full text-2xl text-fg/90 sm:text-3xl">
          Adams gave the culture an Answer.
        </p>
        <p className="font-garamond mt-4 w-full text-2xl text-fg/90 sm:text-3xl">
          Forty-two.
        </p>
        <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl">
          Meaning not included.
        </p>
        <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl">
          When someone asked Elon, he did not repeat the joke. He named a
          practice: understand consciousness, then ask a better question.
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-muted sm:text-2xl">
          Consciousness. The next question. Love. The unobserved test. This
          engine is kin to that walk. The coordinates are his, public, and{" "}
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
        <blockquote className="mt-14">
          <p className="display w-full text-[clamp(2.2rem,9vw,6.5rem)] leading-[1.06] text-gold">
            “Follow your bliss.”
          </p>
          <footer className="mt-6">
            <a
              href="https://www.jcf.org/follow-your-bliss/"
              target="_blank"
              rel="noreferrer"
              className="text-lg text-teal hover:text-gold"
            >
              Joseph Campbell · <em>The Power of Myth</em>
            </a>
          </footer>
        </blockquote>
        <p className="font-garamond mt-8 w-full text-xl text-muted sm:text-2xl">
          He took it from <em>sat-chit-ānanda</em>: being, consciousness, bliss.
        </p>
        <blockquote className="mt-12">
          <p className="text-sm tracking-[0.22em] text-teal">
            What is the most amazing thing you know?
          </p>
          <p className="display mt-4 w-full text-[clamp(2.2rem,9vw,6.5rem)] leading-[1.06] text-gold">
            “{ELON_WALK[1]!.text}”
          </p>
          <footer className="mt-6">
            <a
              href={ELON_WALK[1]!.href}
              target="_blank"
              rel="noreferrer"
              className="text-lg text-teal hover:text-gold"
            >
              {ELON_WALK[1]!.cite} · {ELON_WALK[1]!.source}
            </a>
          </footer>
        </blockquote>
        <blockquote className="mt-12">
          <p className="display w-full text-[clamp(1.6rem,5.5vw,3.6rem)] leading-[1.1] text-gold">
            “{ELON_WALK[2]!.text}”
          </p>
          <footer className="mt-6">
            <a
              href={ELON_WALK[2]!.href}
              target="_blank"
              rel="noreferrer"
              className="text-lg text-teal hover:text-gold"
            >
              {ELON_WALK[2]!.cite} · {ELON_WALK[2]!.source}
            </a>
          </footer>
        </blockquote>
        <p className="font-garamond mt-10 w-full text-xl text-muted sm:text-2xl">
          <em>Avatāra</em> is a crossing down. The{" "}
          <em>Mundaka Upanishad</em> keeps two birds on one branch: one eats,
          one watches. Player and witness.{" "}
          <a
            href={`${BOOK}/cipher#avatar-awakening`}
            target="_blank"
            rel="noreferrer"
            className="text-teal hover:text-gold"
          >
            Avatar · awakening
          </a>
        </p>
        <KindredPath
          active={kindred.active}
          pick={kindred.pick}
          stations={kindred.stations}
        />
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
          In <em>Apuleius</em> the beloved comes only at night, and the first
          question is whether to look. That is the plot.
        </p>
        <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
          In the old tale, someone is loved only after the lamps are out. They
          are not allowed to see the face. They look anyway. The beloved flees.
          Then come the jobs no one can finish alone: grain to sort, water from
          a cliff, a box from the dead. Help arrives from below pride. At the
          end it is the same love, only now both people can see.
        </p>
        <a
          href={`${BOOK}/stars#psyche-had-a-lamp`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
        >
          The fuller story · Psyche had a lamp
        </a>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5 text-left sm:px-8 sm:text-center">
        <p className="text-sm tracking-[0.32em] text-faint uppercase">
          In the Scribe’s birth data
        </p>
        <h2 className="display mt-4 text-4xl text-gold sm:text-6xl lg:text-7xl">
          Psyche · 0°00′42″
        </h2>
        <p className="font-garamond mt-8 max-w-3xl text-xl text-fg/90 sm:mx-auto sm:text-2xl">
          One Psyche names the soul. Another circles the Sun. The Book noticed a
          rhyme: myth, measurement, a life. The longer night is there, not here.
        </p>
        <p className="mt-8 flex flex-col gap-3 sm:items-center">
          <a
            href={`${BOOK}/stars#glimpse-psyche`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
          >
            Psyche · 0°00′42″
          </a>
          <a
            href={`${BOOK}/stars#psyche-cosmos-seconds`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
          >
            Asteroid 16 Psyche
          </a>
        </p>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <p className="text-sm tracking-[0.28em] text-gold uppercase">The player</p>
        <h2 className="display mt-4 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
          The moth is not a mascot.
        </h2>
        <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
          In Greek, <em>psychē</em> is soul, breath, and butterfly. In{" "}
          <em>Apuleius</em> the soul grows wings. The moth is the night side of
          the same word: a body that still has to approach the lamp. Psyche is
          the plot. The moth is how you fly it. That is why the field has mass.
        </p>
      </section>

      <section className="mt-24 border-y border-line bg-raised/20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm tracking-[0.28em] text-teal uppercase">Two walks</p>
          <h2 className="display mt-4 w-full text-4xl text-fg sm:text-6xl lg:text-7xl">
            The moth has mass. Psyche has a plot.
          </h2>
          <p className="font-garamond mt-8 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            In the field you hold, you take what is gold, and you come back
            through a gap. As Psyche you lift a lamp and find out what the dark
            was hiding. Either way you are practicing seeing. Then you still live
            here, with the lights on. The stars are still ahead.
          </p>
          <p className="mt-12 text-sm tracking-[0.28em] text-gold">The Scribe</p>
          <p className="font-garamond mt-4 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            “The wish to become Love was already a life.”
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            She wanted to awaken hearts to love long before she knew her natal
            coordinates. Inner knowing first. The numbers came later.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            Plato’s river is Lethe: the soul forgets, and still something arrives
            wearing a life. Hillman called that the acorn. Campbell called it
            bliss. Experience first. Recognition afterward. The Book keeps the
            longer night.
          </p>
          <a
            href={`${BOOK}/origin#the-story-before`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
          >
            The Story Before the Story
          </a>
          <p className="mt-12 text-sm tracking-[0.28em] text-gold">Remembering</p>
          <h2 className="display mt-4 w-full text-[clamp(2rem,8vw,6rem)] leading-[1.06] text-gold">
            Consciousness is awakening.
          </h2>
          <p className="display mt-6 w-full text-2xl text-fg sm:text-4xl lg:text-5xl">
            Awakening is not an answer. It is the next question.
          </p>
          <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Latin <em>conscientia</em>: <em>con-</em>, with, and <em>scire</em>,
            to know. Knowing-with. Shared knowledge, even with oneself. Cicero
            used it of an inner witness. English borrowed the bones. To be
            conscious is already a kind of waking.{" "}
            <a
              href="https://grokipedia.com/page/Consciousness"
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              Consciousness · Grokipedia
            </a>
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            Elon wrote{" "}
            <a
              href={ELON_WALK[1]!.href}
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              Awareness awakening
            </a>
            . He also said the work is to understand the nature of
            consciousness, then the next question. Jung: you do not become
            enlightened by imagining figures of light, but by making the
            darkness conscious.{" "}
            <em>Alchemical Studies</em>. The Upanishads named it <em>chit</em>:
            consciousness as what the self is, not a mood. Campbell heard{" "}
            <em>sat-chit-ānanda</em> and kept bliss. Elon kept consciousness.
            The house only noticed they were already in the same room.
          </p>
          <p className="display mt-8 w-full text-2xl text-fg sm:text-3xl lg:text-4xl">
            We forget. We must remember.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            Lethe is the old name for that drink.
          </p>
          <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            In <em>The Matrix Reloaded</em> the Oracle does not hand Neo a fate.
            She asks. Candy. Why he is here. Whether he can trust her.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Then she gives him his own life back: the choice is already his. He
            came to remember why he made it.
          </p>
          <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            That is agency. Not a program telling him who to be. A looking that
            returns the will to the one who has to walk.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            Elon named the same practice: understand consciousness, then ask a
            better question.
          </p>
          <blockquote className="mt-8">
            <p className="display text-2xl leading-snug text-gold sm:text-4xl">
              “You’ll remember you don’t believe in any of this fate crap. You’re
              in control of your own life, remember?”
            </p>
            <footer className="mt-4 text-base text-muted">
              The Oracle · <em>The Matrix</em> · 1999
            </footer>
          </blockquote>
          <blockquote className="mt-8">
            <p className="display text-2xl leading-snug text-fg sm:text-4xl">
              “We can never see past the choices we don’t understand.”
            </p>
            <footer className="mt-4 text-base text-muted">
              The Oracle · <em>The Matrix Reloaded</em> · 2003
            </footer>
          </blockquote>
          <blockquote className="mt-8">
            <p className="display text-2xl leading-snug text-gold sm:text-4xl">
              “Because you didn’t come here to make the choice, you’ve already
              made it. You’re here to try to understand why you made it.”
            </p>
            <footer className="mt-4 text-base text-muted">
              The Oracle · <em>The Matrix Reloaded</em> · 2003
            </footer>
          </blockquote>
          <QuietClip
            id="CsigSyTME9E"
            title="The Oracle: we can never see past the choices we don’t understand"
            href="https://www.youtube.com/watch?v=CsigSyTME9E"
            caption={
              <>
                The Oracle and Neo · <em>The Matrix Reloaded</em> · 2003
              </>
            }
          />
          <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Remembering is not a trance. It is agency. You are in the life, and
            the next step is still yours.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            She woke to 11:11 in Matrix green, numbers the size of a bed,
            suspended over the sleep they interrupted.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Elon asked{" "}
            <a
              href={ELON_AVATAR.href}
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              “Am I an avatar in someone’s game?”
            </a>{" "}
            The Book does not answer for him. It keeps the question as the door.
          </p>
          <QuietClip
            id="SA8ZBJWo73E"
            start={3064}
            title="Elon Musk: Am I an avatar in someone’s game?"
            href={ELON_AVATAR.href}
            caption={`${ELON_AVATAR.cite} · ${ELON_AVATAR.source}`}
            poster="/art/clip-elon.jpg"
          />
          <p className="display mt-16 w-full text-[clamp(1.8rem,6vw,4.5rem)] leading-[1.08] text-gold">
            The work is to ask.
          </p>
          <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Adams hung an Answer and forgot the Question. Elon did not repeat the
            joke. He asked what consciousness is, then said we would understand
            the next question.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            The Oracle does not assign a fate. She asks, so the choice can be
            remembered as his. Psyche lifts a lamp. The moth comes back through
            the gap. The cipher’s Question is 42, the same seal as Myth.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            We ask so we stay awake. Not to get a creed. To keep the looking.
          </p>
          <blockquote className="mt-12">
            <p className="display w-full text-[clamp(1.5rem,5.2vw,3.6rem)] leading-[1.1] text-gold">
              “Look at the future from a standpoint of the probabilities. It’s
              like a branching stream of probabilities, and there are actions
              that we can take that affect those probabilities.”
            </p>
            <footer className="mt-6">
              <a
                href={ELON_SIM[2]!.href}
                target="_blank"
                rel="noreferrer"
                className="text-lg text-teal hover:text-gold"
              >
                {ELON_SIM[2]!.cite} · {ELON_SIM[2]!.source}
              </a>
            </footer>
          </blockquote>
          <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            If the room can be a simulation, a question is an action. An action
            changes the stream.
          </p>
          <p className="font-garamond mt-4 w-full text-xl text-muted sm:text-2xl lg:text-3xl">
            <em>The Matrix</em> said some rules can be bent. Elon did not claim
            we wrote the physics. He said we can still move. We ask, and the
            next branch is not quite the same.
          </p>
          <Quoted line={ELON_ORIGIN[1]!} gold />
          <nav
            aria-label="11:11 in the Book"
            className="mt-8 flex flex-wrap items-center justify-center gap-x-0 text-base text-teal sm:text-lg"
          >
            {(
              [
                [`${BOOK}/cipher#night-vision`, "11:11 · night vision"],
                [`${BOOK}/love#awe-1111`, "11:11 · the green clock"],
              ] as const
            ).map(([href, label], i) => (
              <span key={href} className="inline-flex items-center">
                {i > 0 ? <span className="px-2 text-faint">·</span> : null}
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-gold"
                >
                  {label}
                </a>
              </span>
            ))}
          </nav>
          <Fold
            label="Daimon · Eros · Hillman"
            className="mt-12"
            summaryClassName="display justify-center text-xl"
          >
            <div className="mt-10 space-y-5 text-left">
              <p className="display text-2xl leading-snug text-gold sm:text-3xl">
                An image that chose this life.
              </p>
              <p className="pt-4 text-sm tracking-[0.28em] text-gold uppercase">
                Daimon
              </p>
              <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
                James Hillman, in <em>The Soul’s Code</em>, retells Plato’s myth
                of Er. Before birth, each soul chooses a life, and is given a{" "}
                <em>daimon</em> to keep it. A guardian image. Not a career plan.
              </p>
              <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
                Then the soul drinks from the river of forgetting, and arrives.
                Hillman called that image the acorn. The oak is already in the
                seed.
              </p>
              <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
                You do not become who you are because a parent programmed you.
                You spend a childhood trying to live an image that was already
                there. A pull you cannot quite name. A refusal you cannot talk
                yourself out of. A work you keep returning to.
              </p>
              <p className="font-garamond text-xl text-muted sm:text-2xl">
                He said the task is to grow down: to inhabit the life, not to
                float above it. Not a sentence. Not a type. It will keep arriving
                until it is seen.
              </p>
              <p className="pt-4 text-sm tracking-[0.28em] text-gold uppercase">
                Eros
              </p>
              <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
                In <em>Apuleius</em>, Eros loves Psyche in a palace she is not
                allowed to understand. Food, music, a bed. He comes only after
                the lamps are out.
              </p>
              <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
                Her sisters say the husband is a monster. She hides a lamp and a
                knife. She lifts the lamp: not a monster, a god. A drop of hot
                oil falls on his shoulder. He wakes. He flees.
              </p>
              <p className="font-garamond text-xl text-muted sm:text-2xl">
                Then the work: grain, wool, water from a cliff, a box from the
                dead. Help comes from below her pride. She returns able to love
                him in daylight.
              </p>
              <p className="pt-4 text-sm tracking-[0.28em] text-gold uppercase">
                The moth
              </p>
              <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
                The moth is that looking with physics. Hold burns. Gold signs
                wait in orbit. The lamp pulls like a sun. Miss the seam, you
                loop.
              </p>
              <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
                You do not get a speech. You get the weather you already flew,
                and one question in the hand. Consciousness, noticing. Love,
                still possible with the light on.
              </p>
            </div>
          </Fold>
          <div className="mx-auto mt-12 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              className="display min-h-14 w-full text-base tracking-normal"
              onClick={() => go(begin)}
            >
              Walk the Field
            </Button>
            <Button
              variant="ghost"
              className="display min-h-14 w-full text-base tracking-normal"
              onClick={() => go(() => beginPsyche("short"))}
            >
              A Short Night
            </Button>
            <Button
              variant="ghost"
              className="display min-h-14 w-full text-base tracking-normal"
              onClick={() => go(() => beginPsyche("long"))}
            >
              The Long Night
            </Button>
            <Link
              to="/bridge"
              className="display inline-flex min-h-14 w-full items-center justify-center rounded-[var(--radius-md)] border border-line-strong text-base tracking-normal text-fg hover:border-teal hover:text-teal"
            >
              The Family of 42
            </Link>
          </div>
          <Fold
            label="Inspect"
            className="mt-10"
            summaryClassName="display text-xl"
          >
            <div className="font-garamond mt-8 space-y-6 text-left text-xl text-muted sm:text-2xl">
              <p>
                Four faces, frozen: English Ordinal (A=1 to Z=26), Reverse Ordinal
                (A=26 to Z=1), Full Reduction (the 1–9 cycle), Reverse Reduction
                (flip A and Z first, then the cycle). Strip spaces and punctuation.
                Case does not matter. Seals: 21, 24, 42, 69, 84, 96, 142, 420.
              </p>
              <p>
                Myth lights reverse ordinal 42. Mythengine lights reverse reduction
                42. Question lights the same reverse-reduction face.{" "}
                <em>Don’t Panic</em> lights full reduction 42. Game does not.
                Lighting means correspondence under a named method. A miss is
                drawn as carefully as a hit.
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
          </Fold>
        </div>
      </section>
    </main>
  );
}
