import {
  CIPHER,
  CIPHER_PLATES,
  FACE_LABEL,
  FACE_SHORT,
  letterTiles,
  faceValue,
  FACES,
  isSeal,
  type Face,
} from "@/lib/cipher";
import { cn } from "@/lib/utils";

export function CipherPlate() {
  return (
    <section id="cipher" className="mt-12 sm:mt-16">
      <p className="text-center text-[0.7rem] tracking-[0.28em] text-gold uppercase sm:text-sm sm:tracking-[0.42em]">
        42 // Cipher
      </p>
      <h2 className="display mt-4 w-full text-center text-[clamp(2rem,8vw,4.5rem)] text-fg">
        Four faces. No fifth.
      </h2>
      <p className="font-garamond mx-auto mt-5 max-w-4xl px-1 text-center text-base leading-relaxed text-fg/90 sm:mt-6 sm:text-2xl">
        Elon asked if he was an avatar in someone’s game. She looked up Game.
        Then Myth. Myth was reverse ordinal 42. She named the room mythengine.
        Reverse reduction 42. Adams had already hung the towel: Don’t Panic,
        full reduction 42. Question lights the same reverse-reduction face.
        Game does not. A miss is drawn as carefully as a hit.
      </p>

      <ul className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
        {CIPHER_PLATES.map((plate) => {
          const tiles = letterTiles(plate.word, plate.face);
          const total = faceValue(plate.word, plate.face);
          return (
            <li key={plate.word} className="text-center">
              <p className="text-[0.7rem] tracking-[0.28em] text-gold uppercase sm:text-sm sm:tracking-[0.42em]">
                42 // Cipher
              </p>
              <h3
                className="display mt-4 w-full text-fg sm:mt-5"
                style={{
                  fontSize: `min(4.5rem, calc(100% / ${Math.max(tiles.length, 4)} * 0.9))`,
                  letterSpacing: "0.04em",
                  lineHeight: 1.1,
                }}
              >
                {plate.display}
              </h3>
              <p className="mt-3 text-[0.65rem] tracking-[0.18em] text-gold uppercase sm:mt-4 sm:text-sm sm:tracking-[0.32em]">
                <span className="sm:hidden">{FACE_SHORT[plate.face]}</span>
                <span className="hidden sm:inline">{FACE_LABEL[plate.face]}</span>
              </p>
              <div className="mx-auto mt-5 flex w-full gap-px sm:mt-8 sm:gap-2">
                {tiles.map((tile, i) => (
                  <div
                    key={`${tile.letter}-${i}`}
                    className="flex min-w-0 flex-1 flex-col items-center border border-gold/40 px-0 py-1.5 sm:px-3 sm:py-3"
                  >
                    <span
                      className="display text-fg"
                      style={{
                        fontSize: `min(1.85rem, calc(100% * 0.55))`,
                        letterSpacing: "0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {tile.letter}
                    </span>
                    <span className="mt-0.5 text-[0.6rem] tabular-nums text-gold sm:text-sm">
                      {tile.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="display mt-5 text-2xl text-gold sm:mt-6 sm:text-4xl">{total}</p>
              <p className="font-garamond mx-auto mt-3 max-w-3xl px-1 text-base text-muted sm:mt-4 sm:text-xl">
                {plate.note}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.7rem] text-faint sm:mt-6 sm:gap-x-6 sm:text-sm">
                {FACES.map((face: Face) => {
                  const n = faceValue(plate.word, face);
                  const lit = isSeal(n);
                  return (
                    <span
                      key={face}
                      className={cn(lit ? "text-gold" : "text-faint")}
                    >
                      <span className="sm:hidden">{FACE_SHORT[face]}</span>
                      <span className="hidden sm:inline">{FACE_LABEL[face]}</span>{" "}
                      {n}
                    </span>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-16 text-center">
        <a
          href={CIPHER}
          target="_blank"
          rel="noreferrer"
          className="text-base text-teal hover:text-gold sm:text-lg"
        >
          bookof42.grok.me/cipher
        </a>
      </p>
    </section>
  );
}
