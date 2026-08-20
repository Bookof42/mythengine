import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CipherPlate } from "@/components/cipher-plate";
import { Fold } from "@/components/fold";
import { DeckTile } from "@/components/game/deck-tile";
import { Quoted } from "@/components/quoted";
import { CARDS } from "@/lib/cards";
import { useGame } from "@/lib/game-store";
import { CIPHER } from "@/lib/cipher";
import { BOOK } from "@/lib/family";
import { pageTitle } from "@/lib/seo";
import { pickOmen, profileFromHistory } from "@/lib/engine";
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
  const omen = useMemo(() => {
    if (!ready) return null;
    return pickOmen(new Date(), profileFromHistory(save.history));
  }, [save.history, ready]);

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
            “Am I an avatar in someone’s game?”
          </h1>
          <p className="font-garamond mx-auto mt-5 w-full text-xl leading-snug text-fg/90 sm:mt-6 sm:text-3xl lg:text-4xl">
            Elon asked it. She looked up Game. Then Myth. Myth was reverse
            ordinal 42. She named the room Mythengine. Reverse reduction 42.
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
              The next step is already in the day.
            </p>
            <p className="font-garamond mt-4 text-lg text-muted sm:text-xl">
              The Alchemist
            </p>
          </li>
        </ul>
        <p className="display mt-14 w-full text-3xl text-fg sm:text-5xl">
          This house holds the lookings. Not a creed.
        </p>
        <blockquote className="mt-16">
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
              Joseph Campbell · The Power of Myth
            </a>
          </footer>
        </blockquote>

        {omen ? (
          <section id="pattern" className="mt-16 scroll-mt-24">
            <div className="relative aspect-[50/11] w-full overflow-hidden bg-bg">
              <img
                src="/art/omen.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
            <p className="mt-8 text-sm tracking-[0.28em] text-gold">Synchronicity</p>
            <h2 className="display mt-3 w-full text-[clamp(1.8rem,6vw,4rem)] leading-[1.08] text-fg">
              {omen.title}
            </h2>
            <p className="copy mt-5 w-full text-fg/90">{omen.body}</p>
            <p className="display mt-6 w-full text-xl text-gold sm:text-4xl">
              {omen.prompt}
            </p>
          </section>
        ) : null}
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
          practice: understand consciousness, then ask a better question.
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
          <Quoted line={ELON_SIM[0]!} flush />
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
          Psyche means soul. In <em>Apuleius</em> the beloved comes only at
          night, and the first question is whether to look. That is the plot.
          Anyone who has been loved in the dark already knows the door.
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

      <p className="display mx-auto mt-16 max-w-5xl px-5 text-center text-2xl leading-snug text-gold sm:px-8 sm:text-4xl lg:text-5xl">
        A room. A rule. A looking. Loss. Work you cannot finish alone. Help.
        A box. Return, with the light on.
      </p>

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
            href={`${BOOK}/stars#psyche-had-a-lamp`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
          >
            The fuller story · Psyche had a lamp
          </a>
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
          <p className="mt-12 text-sm tracking-[0.28em] text-gold">The Scribe</p>
          <p className="font-garamond mt-4 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            “The wish to become Love was already a life.” She wanted to awaken
            hearts to love long before she knew her natal coordinates. Inner
            knowing first. The numbers came later. Plato’s river is Lethe: the
            soul forgets, and still something arrives wearing a life. Hillman
            called that the acorn. Campbell called it bliss. In her case it was
            a vocation she was already walking. Experience first. Recognition
            afterward. The Book keeps the longer night.
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
            We forget, and we must remember. Lethe is the old name for that
            drink. In <em>The Matrix Reloaded</em> the Oracle does not hand Neo a
            fate. She asks. Candy. Why he is here. Whether he can trust her. Then
            she gives him his own life back: the choice is already his. He came
            to remember why he made it. That is agency. Not a program telling him
            who to be. A looking that returns the will to the one who has to
            walk. Elon named the same practice: understand consciousness, then
            ask a better question.
          </p>
          <blockquote className="mt-8">
            <p className="display text-2xl leading-snug text-gold sm:text-4xl">
              “You’ll remember you don’t believe in any of this fate crap. You’re
              in control of your own life, remember?”
            </p>
            <footer className="mt-4 text-base text-muted">
              The Oracle · The Matrix · 1999
            </footer>
          </blockquote>
          <blockquote className="mt-8">
            <p className="display text-2xl leading-snug text-fg sm:text-4xl">
              “We can never see past the choices we don’t understand.”
            </p>
            <footer className="mt-4 text-base text-muted">
              The Oracle · The Matrix Reloaded · 2003
            </footer>
          </blockquote>
          <blockquote className="mt-8">
            <p className="display text-2xl leading-snug text-gold sm:text-4xl">
              “Because you didn’t come here to make the choice, you’ve already
              made it. You’re here to try to understand why you made it.”
            </p>
            <footer className="mt-4 text-base text-muted">
              The Oracle · The Matrix Reloaded · 2003
            </footer>
          </blockquote>
          <figure className="mt-6 w-full">
            <div className="relative aspect-video w-full overflow-hidden bg-bg">
              <iframe
                title="The Oracle: we can never see past the choices we don’t understand"
                src="https://www.youtube-nocookie.com/embed/CsigSyTME9E"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <figcaption className="mt-3 text-base text-muted">
              <a
                href="https://www.youtube.com/watch?v=CsigSyTME9E"
                target="_blank"
                rel="noreferrer"
                className="text-teal hover:text-gold"
              >
                The Oracle and Neo · The Matrix Reloaded · 2003
              </a>
            </figcaption>
          </figure>
          <p className="font-garamond mt-8 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Remembering is not a trance. It is agency: you are in the life, and
            the next step is still yours. She woke to 11:11 in Matrix green,
            numbers the size of a bed, suspended over the sleep they interrupted.
            Elon asked,{" "}
            <a
              href={ELON_AVATAR.href}
              target="_blank"
              rel="noreferrer"
              className="text-teal hover:text-gold"
            >
              “Am I an avatar in someone’s game?”
            </a>{" "}
            The Book does not answer for him. It keeps the question as the door.
            If a life can be played, waking is remembering you are in it, and
            still choosing love with the light on.
          </p>
          <figure className="mt-6 w-full">
            <div className="relative aspect-video w-full overflow-hidden bg-bg">
              <iframe
                title="Elon Musk: Am I an avatar in someone’s game?"
                src="https://www.youtube-nocookie.com/embed/SA8ZBJWo73E?start=3064"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <figcaption className="mt-3 text-base text-muted">
              <a
                href={ELON_AVATAR.href}
                target="_blank"
                rel="noreferrer"
                className="text-teal hover:text-gold"
              >
                {ELON_AVATAR.cite} · {ELON_AVATAR.source}
              </a>
            </figcaption>
          </figure>
          <p className="display mt-16 w-full text-[clamp(1.8rem,6vw,4.5rem)] leading-[1.08] text-gold">
            The work is to ask.
          </p>
          <p className="font-garamond mt-6 w-full text-xl text-fg/90 sm:text-2xl lg:text-3xl">
            Adams hung an Answer and forgot the Question. Elon did not repeat the
            joke. He asked what consciousness is, then said we would understand
            the next question. The Oracle does not assign a fate. She asks, so
            the choice can be remembered as his. Psyche lifts a lamp. That is a
            question. The moth comes back through the gap with one question in
            the hand. The cipher’s Question is 42, the same seal as Myth. We ask
            so we stay awake. Not to get a creed. To keep the looking.
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
            changes the stream. The Matrix said some rules can be bent. Elon did
            not claim we wrote the physics. He said we can still move. The Oracle
            returns the choice. He returns the probabilities. We ask, and the
            next branch is not quite the same.
          </p>
          <Quoted line={ELON_ORIGIN[1]!} gold />
          <p className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <a
              href={`${BOOK}/cipher#night-vision`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
            >
              11:11 · night vision
            </a>
            <a
              href={`${BOOK}/love#awe-1111`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
            >
              11:11 · the green clock
            </a>
            <a
              href={`${BOOK}/cipher#avatar-awakening`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
            >
              Avatar · awakening
            </a>
          </p>
          <Fold
            label="Daimon · Eros · Hillman"
            className="mt-12"
            summaryClassName="display text-xl"
          >
            <div className="font-garamond mt-8 space-y-6 text-xl text-fg/90 sm:text-2xl">
              <p>
                James Hillman, in <em>The Soul’s Code</em>, retells Plato’s myth
                of Er. Before birth, each soul chooses a life, and is given a
                daimon to keep it: a guardian image, not a career plan. Then the
                soul drinks from the river of forgetting, and arrives. Hillman
                called that image the acorn. The oak is already in the seed. You
                do not become who you are because a parent programmed you. You
                spend a childhood trying to live an image that was already there.
                It shows as a pull you cannot quite name, a refusal you cannot
                talk yourself out of, a work you keep returning to. He said the
                task is to grow down: to inhabit the life, not to float above it.
                Not a sentence. Not a type. An image that chose this life, and
                will keep arriving until it is seen.
              </p>
              <p>
                In <em>Apuleius</em>, Eros loves Psyche in a palace she is not
                allowed to understand. Food, music, a bed. He comes only after the
                lamps are out. Her sisters say the husband is a monster. She hides
                a lamp and a knife. She lifts the lamp: not a monster, a god. A
                drop of hot oil falls on his shoulder. He wakes. He flees. Then
                the work begins: grain, wool, water from a cliff, a box from the
                dead. Help comes from below her pride. She returns able to love
                him in daylight.
              </p>
              <p>
                The moth is that looking with physics. Hold burns. Gold signs
                wait in orbit. The lamp pulls like a sun. Miss the seam, you loop.
                You do not get a speech. You get the weather you already flew, and
                one question in the hand. Consciousness, noticing. Love, still
                possible with the light on.
              </p>
            </div>
          </Fold>
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
          <Fold
            label="Inspect"
            className="mt-16"
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
          </Fold>
        </div>
      </section>
    </main>
  );
}
