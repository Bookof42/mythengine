import {
  CIPHER,
  CIPHER_PLATES,
  FACE_LABEL,
  letterTiles,
  faceValue,
  FACES,
  isSeal,
  type Face,
} from "@/lib/cipher";
import { cn } from "@/lib/utils";

export function CipherPlate() {
  return (
    <section id="cipher" className="mt-16">
      <p className="text-center text-sm tracking-[0.42em] text-gold uppercase">
        42 // Cipher
      </p>
      <h2 className="display mt-4 w-full text-center text-4xl text-fg sm:text-6xl lg:text-7xl">
        Four faces. No fifth.
      </h2>
      <p className="font-garamond mx-auto mt-6 max-w-4xl text-center text-xl text-fg/90 sm:text-2xl">
        Elon asked if he was an avatar in someone's game. She looked up Game.
        Then Myth. Myth was reverse ordinal 42. She named the room mythengine.
        Reverse reduction 42. Adams had already hung the towel: Don't Panic,
        full reduction 42. Question lights the same reverse-reduction face.
        Game does not. A miss is drawn as carefully as a hit.
      </p>

      <ul className="mt-20 space-y-24">
        {CIPHER_PLATES.map((plate) => {
          const tiles = letterTiles(plate.word, plate.face);
          const total = faceValue(plate.word, plate.face);
          return (
            <li key={plate.word} className="text-center">
              <p className="text-sm tracking-[0.42em] text-gold uppercase">
                42 // Cipher
              </p>
              <h3 className="display mt-5 text-5xl tracking-[0.12em] text-fg sm:text-7xl lg:text-8xl">
                {plate.display}
              </h3>
              <p className="mt-4 text-sm tracking-[0.32em] text-gold uppercase">
                {FACE_LABEL[plate.face]}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                {tiles.map((tile, i) => (
                  <div
                    key={`${tile.letter}-${i}`}
                    className="flex min-w-[2.6rem] flex-col items-center border border-gold/40 px-2.5 py-2 sm:min-w-[3.2rem] sm:px-3 sm:py-3"
                  >
                    <span className="display text-xl tracking-[0.18em] text-fg sm:text-3xl">
                      {tile.letter}
                    </span>
                    <span className="mt-1 text-xs tabular-nums text-gold sm:text-sm">
                      {tile.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="display mt-6 text-3xl text-gold sm:text-4xl">{total}</p>
              <p className="font-garamond mx-auto mt-4 max-w-3xl text-lg text-muted sm:text-xl">
                {plate.note}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-faint">
                {FACES.map((face: Face) => {
                  const n = faceValue(plate.word, face);
                  const lit = isSeal(n);
                  return (
                    <span
                      key={face}
                      className={cn(lit ? "text-gold" : "text-faint")}
                    >
                      {FACE_LABEL[face]} {n}
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
          className="inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
        >
          bookof42.grok.me/cipher
        </a>
      </p>
    </section>
  );
}
