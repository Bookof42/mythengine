import { Sigil } from "@/components/sigil";
import { Button } from "@/components/ui/button";
import { CARD_BY_ID } from "@/lib/cards";
import { KIT } from "@/lib/kit";
import { PATH_BY_ID } from "@/lib/paths";
import { PSYCHE_BY_ID } from "@/lib/psyche-quest";
import { PLOT_BY_ID } from "@/lib/plot-walks";
import { SCENE_BY_ID } from "@/lib/scenes";
import { useGame } from "@/lib/game-store";
import type { PlayStep } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { ArtFrame, PathDots } from "./frame";
import { WithApuleius } from "@/components/with-apuleius";

export function PlayStepView() {
  const current = useGame((s) => s.save.current);
  const choose = useGame((s) => s.choose);
  const continueAfter = useGame((s) => s.continueAfter);
  const flipCard = useGame((s) => s.flipCard);

  useEffect(() => {
    if (current?.afterText) continueAfter();
  }, [current?.afterText, continueAfter]);

  if (!current) return null;
  const step = current.steps[current.index];
  if (!step) return null;
  if (current.afterText) return null;
  const psyche = current.mode === "psyche" ? PSYCHE_BY_ID[step.id] : undefined;
  const plotNight =
    current.mode === "walk" && current.mythId
      ? PLOT_BY_ID[current.mythId]?.night
      : undefined;

  if (step.kind === "scene") {
    return (
      <SceneView
        step={step}
        onChoose={choose}
        total={current.steps.length}
        index={current.index}
        psyche={psyche}
        plotNight={plotNight}
      />
    );
  }
  if (step.kind === "card") {
    return (
      <CardView
        step={step}
        flipped={Boolean(current.cardFlipped)}
        onFlip={flipCard}
        onChoose={choose}
        total={current.steps.length}
        index={current.index}
        earned={current.mode === "psyche"}
      />
    );
  }
  return <PathView step={step} onChoose={choose} total={current.steps.length} index={current.index} />;
}

const STATION_PROP: Record<string, string> = {
  "psyche-palace": KIT.icons.aperture,
  "psyche-prohibition": KIT.icons.key,
  "psyche-lamp": KIT.props.lamp,
  "psyche-loss": KIT.icons.mirror,
  "psyche-tasks": KIT.icons.seed,
  "psyche-helpers": KIT.icons.thread,
  "psyche-underworld": KIT.props.well,
  "psyche-return": KIT.icons.aperture,
};

const CARD_PROP: Record<string, string> = {
  flame: KIT.props.lamp,
  seed: KIT.icons.seed,
  well: KIT.props.well,
  key: KIT.icons.key,
  thread: KIT.icons.thread,
  moth: KIT.mascot.seal,
  aperture: KIT.icons.aperture,
  cup: KIT.icons.cup,
  bone: KIT.icons.stone,
  scale: KIT.icons.mirror,
  bridge: KIT.props.threshold,
};

function artFor(step: PlayStep) {
  if (step.kind === "scene") return SCENE_BY_ID[step.id]?.art ?? "/art/threshold.jpg";
  if (step.kind === "card") return "/art/card-back.jpg";
  return "/art/path.jpg";
}

function StationChrome({
  total,
  index,
  psyche,
  plotNight,
  prop,
}: {
  total: number;
  index: number;
  psyche?: (typeof PSYCHE_BY_ID)[string];
  plotNight?: string;
  prop?: string;
}) {
  return (
    <div className="mb-5">
      {prop ? (
        <img src={prop} alt="" className="mb-4 h-16 w-16 bg-transparent object-contain sm:h-20 sm:w-20" />
      ) : null}
      {psyche ? (
        <p className="mb-3 text-base tracking-[0.2em] text-gold">
          {psyche.beat}
        </p>
      ) : null}
      {plotNight ? (
        <p className="mb-3 text-base tracking-[0.2em] text-gold">{plotNight}</p>
      ) : null}
      <PathDots total={total} index={index} />
    </div>
  );
}

function SceneView({
  step,
  onChoose,
  total,
  index,
  psyche,
  plotNight,
}: {
  step: PlayStep;
  onChoose: (id: string) => void;
  total: number;
  index: number;
  psyche?: (typeof PSYCHE_BY_ID)[string];
  plotNight?: string;
}) {
  const scene = SCENE_BY_ID[step.id];
  if (!scene) return null;
  return (
    <ArtFrame src={scene.art}>
      <StationChrome
        total={total}
        index={index}
        psyche={psyche}
        plotNight={plotNight}
        prop={STATION_PROP[step.id]}
      />
      <h2 className="display mt-2 w-full text-[clamp(1.6rem,8vw,4.5rem)] leading-[1.08] text-fg">
        {scene.title}
      </h2>
      <p className="copy mt-4 w-full text-fg/90 sm:mt-5">
        <WithApuleius text={scene.body} />
      </p>
      <ul className="mt-10 flex w-full flex-col gap-2">
        {scene.choices.map((choice) => (
          <li key={choice.id}>
            <button
              type="button"
              className="flex w-full min-h-14 items-center py-3 text-left sm:min-h-16"
              onClick={() => onChoose(choice.id)}
            >
              <span className="display text-xl leading-snug text-gold hover:text-teal sm:text-3xl lg:text-4xl">
                {choice.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </ArtFrame>
  );
}

function CardView({
  step,
  flipped,
  onFlip,
  onChoose,
  total,
  index,
  earned = false,
}: {
  step: PlayStep;
  flipped: boolean;
  onFlip: () => void;
  onChoose: (id: string) => void;
  total: number;
  index: number;
  earned?: boolean;
}) {
  const card = CARD_BY_ID[step.id];
  if (!card) return null;

  return (
    <ArtFrame src="/art/card-back.jpg" align="center" dim="bg-bg/70" fit="card">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <PathDots total={total} index={index} />
        <p className="mb-4 text-sm tracking-[0.28em] text-gold uppercase">
          {earned ? "The station offers a card" : "A card"}
        </p>
        <div className="card-stage w-full max-w-xl">
          <button
            type="button"
            className={cn(
              "relative mx-auto block aspect-[16/10] w-full",
              "card-3d",
              flipped && "is-flipped",
            )}
            onClick={() => {
              if (!flipped) onFlip();
            }}
            aria-label={flipped ? card.name : "Tap the card"}
          >
            <div className="card-face absolute inset-0 overflow-hidden rounded-[18px] border border-gold/40">
              <img src="/art/card-back.jpg" alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-bg/20">
                <p className="display text-sm tracking-[0.3em] text-gold">TURN</p>
              </div>
            </div>
            <div className="card-face is-back absolute inset-0 overflow-hidden rounded-[18px] border border-teal/40 bg-raised/90 p-5">
              <div className="flex h-full flex-col items-center justify-center text-center">
                {CARD_PROP[card.id] ? (
                  <img
                    src={CARD_PROP[card.id]}
                    alt=""
                    className="h-16 w-16 object-contain mix-blend-screen sm:h-20 sm:w-20"
                  />
                ) : (
                  <Sigil kind={card.sigil} className="h-14 w-14" />
                )}
                <h2 className="display mt-3 text-2xl text-fg sm:text-3xl">{card.name}</h2>
                <p className="font-garamond mt-2 max-w-md text-lg text-fg/90 sm:text-xl">
                  {card.fragment}
                </p>
              </div>
            </div>
          </button>
        </div>
        {flipped ? (
          <ul className="enter mt-6 flex w-full items-center justify-center gap-8">
            {(
              [
                ["away", "Leave"],
                ["rest", "Hold"],
                ["toward", "Take"],
              ] as const
            ).map(([id, label]) => (
              <li key={id}>
                <button
                  type="button"
                  className="display min-h-12 text-xl text-gold hover:text-teal sm:text-2xl"
                  onClick={() => onChoose(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-base text-faint">Tap the card.</p>
        )}
      </div>
    </ArtFrame>
  );
}

function PathView({
  step,
  onChoose,
  total,
  index,
}: {
  step: PlayStep;
  onChoose: (id: string) => void;
  total: number;
  index: number;
}) {
  const path = PATH_BY_ID[step.id];
  if (!path) return null;
  return (
    <ArtFrame src="/art/path.jpg">
      <PathDots total={total} index={index} />
      <p className="text-sm tracking-[0.28em] text-gold uppercase">A fork</p>
      <h2 className="display mt-2 w-full text-3xl leading-[1.05] text-fg sm:text-6xl">
        {path.prompt}
      </h2>
      <ul className="mt-10 flex w-full flex-col gap-2">
        {(
          [
            ["left", path.left.label],
            ["center", path.center.label],
            ["right", path.right.label],
          ] as const
        ).map(([id, label]) => (
          <li key={id}>
            <button
              type="button"
              className="flex w-full min-h-14 items-center py-3 text-left sm:min-h-16"
              onClick={() => onChoose(id)}
            >
              <span className="display text-xl leading-snug text-gold hover:text-teal sm:text-3xl">
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </ArtFrame>
  );
}
