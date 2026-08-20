import { Sigil } from "@/components/sigil";
import { Button } from "@/components/ui/button";
import { livingMyth, useGame } from "@/lib/game-store";
import { mythArt } from "@/lib/myths";
import { SIGN_ICONS } from "@/lib/kit";
import { SIGN, type SignKind } from "@/lib/signs";
import { ArtFrame } from "./frame";

export function RevealScreen() {
  const save = useGame((s) => s.save);
  const begin = useGame((s) => s.begin);
  const myth = livingMyth(save);
  const question = save.current?.question;
  const taken = (save.history.at(-1)?.signs ?? []) as SignKind[];
  if (!myth) return null;

  return (
    <ArtFrame src={mythArt(myth.id)} align="end" dim="bg-bg/45">
      <p className="text-sm tracking-[0.32em] text-gold uppercase">You returned</p>
      <p className="mt-3 text-base tracking-[0.22em] text-teal uppercase">{myth.name}</p>
      {question ? (
        <h1 className="display mt-4 max-w-4xl text-4xl leading-[1.08] text-fg sm:text-6xl">
          {question}
        </h1>
      ) : (
        <h1 className="display mt-4 text-4xl text-fg sm:text-6xl">{myth.name}</h1>
      )}
      <p className="font-garamond mt-6 max-w-3xl text-xl text-fg/90 sm:text-2xl">
        The myth names the weather you flew. Not fate. A question you can carry.
      </p>
      {taken.length ? (
        <ul className="mt-8 flex flex-wrap gap-3">
          {taken.map((k) => (
            <li key={k} className="flex items-center gap-2">
              <img src={SIGN_ICONS[k]} alt="" className="h-8 w-8" />
              <span className="text-sm text-gold">{SIGN[k].title}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-10 flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/35">
          <Sigil kind={myth.sigil} className="h-7 w-7" />
        </span>
        <Button className="min-h-12 px-8 tracking-[0.18em] uppercase" onClick={() => begin()}>
          Play the field
        </Button>
      </div>
    </ArtFrame>
  );
}