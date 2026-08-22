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
import { Fold } from "@/components/fold";
import { cn } from "@/lib/utils";

export function CipherPlate() {
  return (
    <section id="cipher" className="mt-12 scroll-mt-24 sm:mt-16">
      <p className="text-left text-sm tracking-[0.28em] text-gold sm:text-center sm:text-base sm:tracking-[0.42em]">
        42 // Cipher
      </p>
      <h2 className="display mt-4 w-full text-left text-[clamp(2rem,8vw,4.5rem)] text-fg sm:text-center">
        Four faces. No fifth.
      </h2>
      <p className="font-garamond mx-auto mt-5 max-w-4xl px-1 text-left text-xl leading-snug text-fg/90 sm:mt-6 sm:text-center sm:text-3xl">
        Myth was reverse ordinal 42. Mythengine is reverse reduction 42.{" "}
        <em>Don’t Panic</em>, full reduction 42. Question lights the same face.
        Game does not.
      </p>
      <p className="font-garamond mx-auto mt-3 max-w-4xl px-1 text-left text-xl leading-snug text-muted sm:text-center sm:text-3xl">
        A miss is drawn as carefully as a hit.
      </p>
      <p className="font-garamond mx-auto mt-4 max-w-4xl px-1 text-left text-xl leading-snug text-fg/90 sm:text-center sm:text-3xl">
        The dedication at the foot of the house,{" "}
        <em>For the love and healing of humanity</em>, lights ordinal 333.
      </p>
      <p className="font-garamond mx-auto mt-4 max-w-4xl px-1 text-left text-xl leading-snug text-muted sm:text-center sm:text-3xl">
        This was not intentional. The Scribe questioned Grok’s placement of a
        well-loved phrase.
      </p>
      <p className="font-garamond mx-auto mt-4 max-w-4xl px-1 text-left text-xl leading-snug text-fg/90 sm:text-center sm:text-3xl">
        Curious. She checked the gematria. A numbers lover, she smiled.
      </p>

      <ol className="relative mx-auto mt-14 max-w-xl text-center sm:mt-16">
        <div
          className="pointer-events-none absolute top-8 bottom-8 left-1/2 w-px -translate-x-1/2 bg-gold/35"
          aria-hidden
        />
        {(
          [
            ["Humanity", "111", "42 + 69"],
            ["For the love and healing of", "222", ""],
            ["For the love and healing of humanity", "333", "222 + 111"],
          ] as const
        ).map(([phrase, n, sum], i) => (
          <li key={n} className={cn("relative py-6 sm:py-8", i === 2 && "pt-8")}>
            <span
              className="relative z-10 mx-auto mb-3 block h-1.5 w-1.5 rounded-full bg-gold"
              aria-hidden
            />
            <p className="font-garamond px-2 text-xl text-fg/90 sm:text-2xl">
              {i === 2 ? <em>{phrase}</em> : phrase}
            </p>
            <p
              className={cn(
                "display mt-2 leading-none text-gold",
                i === 2
                  ? "text-[clamp(3rem,14vw,6.5rem)]"
                  : "text-[clamp(2.4rem,11vw,4.5rem)]",
              )}
            >
              {n}
            </p>
            {sum ? (
              <p className="mt-2 text-sm tracking-[0.22em] text-teal">
                {sum}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <Fold
        label="Note"
        className="mx-auto mt-10 max-w-xl text-left"
        summaryClassName="display justify-center text-xl"
      >
        <div className="mt-6 space-y-5 text-left">
          <p className="text-sm tracking-[0.28em] text-gold uppercase">111</p>
          <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
            One, said three times. The word Humanity. In this house also 42 + 69:
            the Book and Field 69 added, the people named. A number often kept
            for awakening: consciousness noticing itself. Kin to 11:11 in the
            Book, without being the same door.
          </p>
          <p className="pt-2 text-sm tracking-[0.28em] text-gold uppercase">
            222
          </p>
          <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
            Two, said three times. A faithful witness. Unity. Partnership. For
            the love and healing of. The work, complete as a number, before
            humanity is spoken. Two standing together so a third can arrive.
          </p>
          <p className="pt-2 text-sm tracking-[0.28em] text-gold uppercase">
            333
          </p>
          <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
            Three is completeness: a thing brought to its end, a witness that
            stands. 333 is that three, said three times.
          </p>
          <p className="font-garamond text-xl text-fg/90 sm:text-2xl">
            Here it is not a message from the sky. It is the ordinal of a
            sentence already loved. Love and healing, then the people, made
            whole. 222 + 111. The work names its object, and the count closes.
          </p>
          <p className="font-garamond pt-2 text-xl text-muted sm:text-2xl">
            Ordinal is only A as 1 through Z as 26, added. Experience first.
            Recognition afterward. Never a forecast.
          </p>
        </div>
      </Fold>

      <ul className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
        {CIPHER_PLATES.map((plate) => {
          const tiles = letterTiles(plate.word, plate.face);
          const total = faceValue(plate.word, plate.face);
          return (
            <li key={plate.word} className="text-center">
              <p className="text-sm tracking-[0.28em] text-gold sm:text-base sm:tracking-[0.42em]">
                42 // Cipher
              </p>
              <h3 className="sr-only">{plate.display}</h3>
              <p className="mt-4 text-sm tracking-[0.18em] text-gold sm:mt-5 sm:text-base sm:tracking-[0.32em]">
                <span className="sm:hidden">{FACE_SHORT[plate.face]}</span>
                <span className="hidden sm:inline">{FACE_LABEL[plate.face]}</span>
              </p>
              <div className="mx-auto mt-5 flex w-full gap-px bg-[var(--color-line)] p-px sm:mt-8">
                {tiles.map((tile, i) => (
                  <div
                    key={`${tile.letter}-${i}`}
                    className="flex min-h-[4.25rem] min-w-0 flex-1 flex-col items-center justify-center bg-bg px-0 py-2 sm:min-h-[5.5rem] sm:px-3 sm:py-3"
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
              <p className="font-garamond mx-auto mt-3 max-w-3xl whitespace-pre-line px-1 text-xl text-muted sm:mt-4 sm:text-2xl">
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
          Cipher
        </a>
      </p>
    </section>
  );
}
