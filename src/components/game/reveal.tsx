import { Sigil } from "@/components/sigil";
import { ShareLooking } from "@/components/share-looking";
import { Button } from "@/components/ui/button";
import { livingMyth, useGame } from "@/lib/game-store";
import { mythArt } from "@/lib/myths";
import { SIGN_ICONS } from "@/lib/kit";
import { SIGN, carriedSentence, emptyHeld, type SignKind } from "@/lib/signs";
import { ArtFrame } from "./frame";

export function RevealScreen() {
  const save = useGame((s) => s.save);
  const begin = useGame((s) => s.begin);
  const myth = livingMyth(save);
  const question = save.current?.question;
  const taken = (save.history.at(-1)?.signs ?? []) as SignKind[];
  if (!myth) return null;
  const looking = question ?? myth.reflection;
  const held = emptyHeld();
  for (const k of taken) held[k] = true;
  const reason = carriedSentence(held, myth.name);

  return (
    <ArtFrame src={mythArt(myth.id)} align="end" dim="bg-bg/45">
      <p className="display text-2xl text-gold sm:text-4xl">{myth.name}</p>
      <h1 className="display mt-4 w-full text-4xl leading-[1.08] text-fg sm:text-6xl">
        {looking}
      </h1>
      <p className="copy mt-6 w-full text-fg/90">{reason}</p>
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
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/35">
          <Sigil kind={myth.sigil} className="h-7 w-7" />
        </span>
        <Button className="display min-h-12 px-8 text-base tracking-normal" onClick={() => begin()}>
          Walk the Field
        </Button>
        <ShareLooking
          art={mythArt(myth.id)}
          kicker={myth.name}
          question={looking}
          mythId={myth.id}
        />
      </div>
    </ArtFrame>
  );
}
