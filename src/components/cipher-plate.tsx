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
      <p className="text-center text-sm tracking-[0.28em] text-gold sm:text-base sm:tracking-[0.42em]">
        42 // Cipher
      </p>
      <h2 className="display mt-4 w-full text-center text-[clamp(2rem,8vw,4.5rem)] text-fg">
        Four faces. No fifth.
      </h2>
      <p className="font-garamond mx-auto mt-5 max-w-4xl px-1 text-center text-xl leading-snug text-fg/90 sm:mt-6 sm:text-3xl">
        Elon asked if he was an avatar in someone’s game. She looked up Game.
        Then Myth. Myth was reverse ordinal 42. She named the room Mythengine.
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
              <p className="text-sm tracking-[0.28em] text-gold sm:text-base sm:tracking-[0.42em]">
                42 // Cipher
              </p>
              <h3 className="display mt-4 w-full text-[clamp(1.85rem,8.5vw,4.5rem)] leading-[1.1] tracking-[0.04em] text-fg sm:mt-5">
                {plate.display}
              </h3>
              <p className="mt-3 text-sm tracking-[0.18em] text-gold sm:mt-4 sm:text-base sm:tracking-[0.32em]">
                <span className="sm:hidden">{FACE_SHORT[plate.face]}</span>
                <span className="hidden sm:inline">{FACE_LABEL[plate.face]}</span>
              </p>
              <div className="mx-auto mt-5 flex w-full gap-0.5 sm:mt-8 sm:gap-2">
                {tiles.map((tile, i) => (
                  <div
                    key={`${tile.letter}-${i}`}
                    className="flex min-h-[4.25rem] min-w-0 flex-1 flex-col items-center justify-center border border-gold/40 px-0 py-2 sm:min-h-[5.5rem] sm:px-3 sm:py-3"
                  >
                    <span className="display text-[clamp(1.15rem,5.6vw,2.15rem)] leading-none tracking-[0.02em] text-fg">
                      {tile.letter}
                    </span>
                    <span className="mt-1 text-[clamp(0.75rem,3.2vw,1rem)] tabular-nums text-gold">
                      {tile.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="display mt-5 text-4xl text-gold sm:mt-6 sm:text-5xl">{total}</p>
              <p className="font-garamond mx-auto mt-3 max-w-3xl px-1 text-xl text-muted sm:mt-4 sm:text-2xl">
                {plate.note}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-faint sm:mt-6 sm:gap-x-6 sm:text-base">
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
