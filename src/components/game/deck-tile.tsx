import { CARD_BY_ID } from "@/lib/cards";
import { KIT } from "@/lib/kit";
import { Sigil } from "@/components/sigil";
import type { OracleCard } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

const PROP: Record<string, string> = {
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

type Look = "toward" | "away" | "rest";

export function DeckTile({ card }: { card: OracleCard }) {
  const [flipped, setFlipped] = useState(false);
  const [look, setLook] = useState<Look | null>(null);
  const prop = PROP[card.id];

  return (
    <li className="flex flex-col items-center">
      <button
        type="button"
        className={cn("card-stage w-full max-w-[16rem]", flipped && "pointer-events-none")}
        onClick={() => {
          if (!flipped) setFlipped(true);
        }}
        aria-label={flipped ? card.name : `Turn ${card.name}`}
      >
        <span
          className={cn(
            "relative mx-auto block aspect-[3/4] w-full card-3d",
            flipped && "is-flipped",
          )}
        >
          <span className="card-face absolute inset-0 overflow-hidden rounded-[18px] border border-gold/40">
            <img src="/art/card-back.jpg" alt="" className="h-full w-full object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-bg/25">
              <span className="display text-xs tracking-[0.3em] text-gold">TURN</span>
            </span>
          </span>
          <span className="card-face is-back absolute inset-0 overflow-hidden rounded-[18px] border border-teal/35 bg-surface p-5">
            <span className="flex h-full flex-col items-center justify-center text-center">
              {prop ? (
                <img src={prop} alt="" className="h-14 w-14 object-contain" />
              ) : (
                <Sigil kind={card.sigil} className="h-12 w-12" />
              )}
              <span className="display mt-3 block text-2xl text-fg">{card.name}</span>
              <span className="font-garamond mt-2 block text-base text-muted">
                {card.fragment}
              </span>
            </span>
          </span>
        </span>
      </button>
      {flipped && !look ? (
        <div className="mt-4 flex w-full flex-col items-center gap-1">
          {(["away", "rest", "toward"] as const).map((id) => (
            <button
              key={id}
              type="button"
              className="display min-h-11 text-lg text-gold hover:text-teal"
              onClick={() => setLook(id)}
            >
              {id === "away" ? "I turn away" : id === "rest" ? "I rest with it" : "I am drawn"}
            </button>
          ))}
        </div>
      ) : null}
      {look ? (
        <p className="mt-3 text-sm tracking-[0.2em] text-teal uppercase">
          {look === "toward" ? "Drawn" : look === "away" ? "Turned away" : "At rest"}
        </p>
      ) : null}
    </li>
  );
}

export function knownCard(id: string) {
  return CARD_BY_ID[id];
}
