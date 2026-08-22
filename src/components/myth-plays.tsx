import { useMemo, useState, type ReactElement } from "react";
import { cn } from "@/lib/utils";

function Again({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="display mx-auto mt-4 block min-h-11 text-lg text-gold hover:text-teal"
    >
      Once more
    </button>
  );
}

/** Draupadi. The hall throws. You are not the player. */
export function DraupadiDice() {
  const [faces, setFaces] = useState([1, 4, 2, 6]);
  const [thrown, setThrown] = useState(false);
  const throwDice = () => {
    setFaces([1, 2, 3, 4].map(() => 1 + Math.floor(Math.random() * 6)));
    setThrown(true);
  };
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <div className="flex justify-center gap-3">
        {faces.map((n, i) => (
          <span
            key={i}
            className="display grid h-14 w-14 place-items-center rounded-lg bg-gold text-2xl text-bg"
          >
            {n}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={throwDice}
        className="display mt-6 min-h-11 text-xl text-gold hover:text-teal"
      >
        Throw
      </button>
      {thrown ? (
        <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
          The hall has already thrown.
        </p>
      ) : (
        <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
          Four dice. The sabha is waiting.
        </p>
      )}
    </div>
  );
}

/** Persephone. One fruit. The year splits. Not a counter. */
export function PersephoneSeeds() {
  const [eaten, setEaten] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-md text-center">
      <button
        type="button"
        onClick={() => setEaten(true)}
        className="mx-auto block"
        aria-label={eaten ? "Eaten" : "A pomegranate. Eat."}
      >
        <span
          className={cn(
            "mx-auto block h-28 w-28 rounded-full transition-colors",
            eaten
              ? "bg-gold/85"
              : "bg-[radial-gradient(circle_at_32%_28%,#d46a6a,#5c1822_72%)] ring-1 ring-gold/45",
          )}
        />
      </button>
      {eaten ? (
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <p className="display text-2xl text-muted">Below</p>
            <p className="font-garamond mt-1 text-lg text-faint">Half the year</p>
          </div>
          <div>
            <p className="display text-2xl text-gold">Bloom</p>
            <p className="font-garamond mt-1 text-lg text-faint">Half the year</p>
          </div>
        </div>
      ) : (
        <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
          A pomegranate. What you take in the dark stays.
        </p>
      )}
    </div>
  );
}

/** Orpheus. The law is not to look. */
export function OrpheusPath() {
  const [step, setStep] = useState(0);
  const [looked, setLooked] = useState(false);
  const top = 5;
  const out = step >= top && !looked;
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <ol className="mx-auto flex max-w-[10rem] flex-col-reverse gap-2">
        {Array.from({ length: top }, (_, i) => (
          <li
            key={i}
            className={cn(
              "h-3 w-full",
              i < step ? "bg-gold" : "bg-raised ring-1 ring-gold/25",
            )}
          />
        ))}
      </ol>
      {looked ? (
        <>
          <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
            He looked back. She was there. Then she was not.
          </p>
          <Again
            onClick={() => {
              setStep(0);
              setLooked(false);
            }}
          />
        </>
      ) : out ? (
        <>
          <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
            Daylight. He did not check.
          </p>
          <Again onClick={() => setStep(0)} />
        </>
      ) : (
        <div className="mt-6 flex justify-center gap-8">
          <button
            type="button"
            onClick={() => setStep((n) => n + 1)}
            className="display min-h-11 text-xl text-gold hover:text-teal"
          >
            Climb
          </button>
          <button
            type="button"
            onClick={() => setLooked(true)}
            className="display min-h-11 text-xl text-muted hover:text-gold"
          >
            Look
          </button>
        </div>
      )}
    </div>
  );
}

/** Inanna. Seven gates. Something comes off at each. */
export function InannaGates() {
  const [gate, setGate] = useState(0);
  const names = [
    "Crown",
    "Beads",
    "Beads",
    "Breastplate",
    "Ring",
    "Rod",
    "Garment",
  ];
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <p className="display text-3xl text-gold">{gate}/7</p>
      {gate < 7 ? (
        <>
          <p className="font-garamond mt-3 text-xl text-muted sm:text-2xl">
            {names[gate]}. The gate does not argue.
          </p>
          <button
            type="button"
            onClick={() => setGate((n) => n + 1)}
            className="display mt-5 min-h-11 text-xl text-gold hover:text-teal"
          >
            Pass
          </button>
        </>
      ) : (
        <>
          <p className="font-garamond mt-3 text-xl text-muted sm:text-2xl">
            Naked, below. The return will cost a replacement.
          </p>
          <Again onClick={() => setGate(0)} />
        </>
      )}
    </div>
  );
}

/** Maat. Heart against a feather. */
export function MaatScale() {
  const [weighed, setWeighed] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <div className="flex items-end justify-center gap-8">
        <span className="display text-2xl text-muted">Heart</span>
        <span className="h-px w-16 bg-gold" />
        <span className="display text-2xl text-gold">Feather</span>
      </div>
      <button
        type="button"
        onClick={() => setWeighed(true)}
        className="display mt-6 min-h-11 text-xl text-gold hover:text-teal"
      >
        Weigh
      </button>
      {weighed ? (
        <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
          Truth is the lighter thing. The heart has to match it.
        </p>
      ) : (
        <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
          Heart. Feather.
        </p>
      )}
    </div>
  );
}

/** Weaver. Two callings. A bridge once a year. */
export function WeaverBridge() {
  const [crossed, setCrossed] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <div className="flex items-center justify-center gap-6">
        <span className="display text-xl text-muted">Loom</span>
        <span className={cn("h-px w-16", crossed ? "bg-gold" : "bg-line")} />
        <span className="display text-xl text-muted">Herd</span>
      </div>
      <button
        type="button"
        onClick={() => setCrossed(true)}
        className="display mt-6 min-h-11 text-xl text-gold hover:text-teal"
      >
        Keep the night
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {crossed ? "Magpies. One night." : "Loom. Herd."}
      </p>
    </div>
  );
}

/** Odin. Nine nights. An eye. */
export function OdinRunes() {
  const [hung, setHung] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setHung(true)}
        className="display min-h-16 text-3xl text-gold"
      >
        {hung ? "ᚨ ᚱ ᚢ ᚾ" : "Hang"}
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {hung ? "Nine nights. An eye." : "The windy tree."}
      </p>
      {hung ? <Again onClick={() => setHung(false)} /> : null}
    </div>
  );
}

/** Prometheus. Heat in a stalk. */
export function PrometheusFlame() {
  const [lit, setLit] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setLit(true)}
        className={cn(
          "mx-auto block h-24 w-6 rounded-full",
          lit ? "bg-gold shadow-[0_0_24px_#e4d0a0]" : "bg-raised ring-1 ring-gold/40",
        )}
        aria-label="The fennel"
      />
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {lit
          ? "Civilization in a stalk. The liver is a later question."
          : "A fennel. Heat that was not supposed to be yours."}
      </p>
    </div>
  );
}

/** Scheherazade. Dawn is the judge. */
export function ScheherazadeNight() {
  const [nights, setNights] = useState(0);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <p className="display text-4xl text-gold">{nights || "·"}</p>
      <button
        type="button"
        onClick={() => setNights((n) => n + 1)}
        className="display mt-4 min-h-11 text-xl text-gold hover:text-teal"
      >
        Leave a door ajar
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {nights
          ? "Dawn, again. The knife has forgotten its job."
          : "A tale, unfinished. Curiosity instead of blood."}
      </p>
    </div>
  );
}

/** Amaterasu. The world gets interesting. */
export function AmaterasuCave() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "mx-auto block h-24 w-24 rounded-full",
          open ? "bg-gold" : "bg-bg ring-1 ring-gold/40",
        )}
        aria-label="The cave"
      />
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {open
          ? "She sees herself. The light returns because the world became interesting."
          : "A cave. The crops fail. Laughter at the door."}
      </p>
    </div>
  );
}

/** Sedna. Comb. Go down gently. */
export function SednaComb() {
  const [knots, setKnots] = useState(5);
  const strands = useMemo(
    () => [
      "M 40 40 C 60 120, 80 160, 70 230",
      "M 70 36 C 90 110, 100 170, 110 240",
      "M 100 32 C 120 100, 130 180, 125 242",
      "M 130 38 C 140 120, 160 170, 150 236",
      "M 160 42 C 170 110, 190 175, 180 238",
    ],
    [],
  );
  const combY = 40 + (5 - knots) * 28;
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setKnots((n) => Math.max(0, n - 1))}
        className="mx-auto block w-full"
        aria-label="Comb"
      >
        <svg viewBox="0 0 220 280" className="mx-auto h-56 w-auto">
          <defs>
            <linearGradient id="sedna-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3e6c4" />
              <stop offset="55%" stopColor="#e4d0a0" />
              <stop offset="100%" stopColor="#8a7344" />
            </linearGradient>
            <linearGradient id="sedna-hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8EC4C0" />
              <stop offset="100%" stopColor="#e4d0a0" />
            </linearGradient>
          </defs>
          <ellipse cx="110" cy="248" rx="78" ry="10" fill="#8EC4C0" opacity="0.18" />
          {strands.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="url(#sedna-hair)"
              strokeWidth="1.7"
              strokeLinecap="round"
              opacity={0.85}
            />
          ))}
          <g transform={`translate(168 ${combY}) rotate(-18)`}>
            <rect x="0" y="0" width="14" height="52" rx="4" fill="url(#sedna-gold)" />
            <rect x="3" y="-10" width="8" height="12" rx="2" fill="#f3e6c4" />
            {Array.from({ length: 8 }, (_, i) => (
              <rect
                key={i}
                x={-18 + i * 4}
                y="50"
                width="2.2"
                height="28"
                rx="1"
                fill="url(#sedna-gold)"
              />
            ))}
          </g>
        </svg>
      </button>
      {knots > 0 ? (
        <p className="font-garamond mt-2 text-xl text-muted sm:text-2xl">
          Touch the comb. Go down gently.
        </p>
      ) : (
        <p className="font-garamond mt-2 text-xl text-muted sm:text-2xl">
          The hair lies smooth. The animals can come.
        </p>
      )}
    </div>
  );
}

/** Arjuna. The chariot is a pause. */
export function ArjunaChariot() {
  const [hour, setHour] = useState<"none" | "wait" | "draw">("none");
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <div className="flex items-end justify-center gap-6">
        <span className="h-16 w-10 rounded-full bg-gold/80" />
        <span className="mb-3 h-2 w-16 bg-gold/50" />
        <span className="h-16 w-10 rounded-full bg-gold/80" />
      </div>
      {hour === "none" ? (
        <div className="mt-6 flex justify-center gap-8">
          <button
            type="button"
            onClick={() => setHour("wait")}
            className="display min-h-11 text-xl text-gold hover:text-teal"
          >
            Wait
          </button>
          <button
            type="button"
            onClick={() => setHour("draw")}
            className="display min-h-11 text-xl text-muted hover:text-gold"
          >
            Draw
          </button>
        </div>
      ) : hour === "wait" ? (
        <>
          <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
            The bow is in the hand. The hour is not yet a speech.
          </p>
          <Again onClick={() => setHour("none")} />
        </>
      ) : (
        <>
          <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
            The string sings. The poem can still begin.
          </p>
          <Again onClick={() => setHour("none")} />
        </>
      )}
    </div>
  );
}

/** Odysseus. Two shores. */
export function OdysseusShores() {
  const [shore, setShore] = useState<"none" | "forever" | "name">("none");
  return (
    <div className="mx-auto mt-10 max-w-lg text-center">
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setShore("forever")}
          className={cn(
            "min-h-28 border px-3 py-6",
            shore === "forever" ? "border-gold text-gold" : "border-line text-muted hover:text-gold",
          )}
        >
          <p className="display text-2xl">A forever</p>
          <p className="font-garamond mt-2 text-lg">A goddess. A bed.</p>
        </button>
        <button
          type="button"
          onClick={() => setShore("name")}
          className={cn(
            "min-h-28 border px-3 py-6",
            shore === "name" ? "border-gold text-gold" : "border-line text-muted hover:text-gold",
          )}
        >
          <p className="display text-2xl">A name</p>
          <p className="font-garamond mt-2 text-lg">A mortal room. A weaving.</p>
        </button>
      </div>
      {shore === "forever" ? (
        <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
          Almost enough. He weeps for a life that is already his.
        </p>
      ) : shore === "name" ? (
        <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
          He leaves paradise because the door still has his name on it.
        </p>
      ) : (
        <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
          Two shores. One man.
        </p>
      )}
    </div>
  );
}

/** Sundiata. The iron remembers. */
export function SundiataIron() {
  const [stood, setStood] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setStood(true)}
        className="mx-auto block"
        aria-label="Stand"
      >
        <span
          className={cn(
            "mx-auto block w-3 rounded-full bg-gold transition-all",
            stood ? "h-28" : "h-10 opacity-60",
          )}
        />
      </button>
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {stood
          ? "The iron remembers. A delayed body arriving in time."
          : "Late to walk. The staff is still a seed."}
      </p>
    </div>
  );
}

/** Anansi. The treasure is the right to tell. */
export function AnansiWeb() {
  const [held, setHeld] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setHeld(true)}
        className="display mx-auto min-h-16 text-3xl text-gold"
      >
        {held ? "The stories came down." : "Bargain with the sky."}
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {held
          ? "The mouth still belongs to the sky. You only borrowed it."
          : "Impossible catches. Cunning, not force."}
      </p>
    </div>
  );
}

/** Sītā. The fire is a legal question. */
export function SitaFire() {
  const [move, setMove] = useState<"none" | "fire" | "earth">("none");
  return (
    <div className="mx-auto mt-10 max-w-md text-center">
      <span className="mx-auto block h-20 w-12 rounded-full bg-[radial-gradient(circle_at_50%_20%,#e4d0a0,#8a3a12_70%)]" />
      {move === "none" ? (
        <div className="mt-6 flex justify-center gap-8">
          <button
            type="button"
            onClick={() => setMove("fire")}
            className="display min-h-11 text-xl text-gold hover:text-teal"
          >
            Let the fire speak
          </button>
          <button
            type="button"
            onClick={() => setMove("earth")}
            className="display min-h-11 text-xl text-muted hover:text-gold"
          >
            Return to the earth
          </button>
        </div>
      ) : move === "fire" ? (
        <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
          A king’s reputation is treated as more fragile than a woman’s truth.
          The fire was never hers to take.
        </p>
      ) : (
        <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
          She goes back to the ground that knew her. Dignity is a different fire.
        </p>
      )}
    </div>
  );
}

/** Gilgamesh. Walk the walls. Look. */
export function GilgameshWalls() {
  const [sides, setSides] = useState(0);
  const walked = sides >= 4;
  return (
    <div className="mx-auto mt-10 max-w-xs text-center">
      <button
        type="button"
        onClick={() => setSides((n) => Math.min(4, n + 1))}
        className="relative mx-auto block h-36 w-36"
        aria-label="Walk the walls"
      >
        <span className={cn("absolute inset-x-4 top-3 h-1", sides > 0 ? "bg-gold" : "bg-line")} />
        <span className={cn("absolute inset-y-4 right-3 w-1", sides > 1 ? "bg-gold" : "bg-line")} />
        <span className={cn("absolute inset-x-4 bottom-3 h-1", sides > 2 ? "bg-gold" : "bg-line")} />
        <span className={cn("absolute inset-y-4 left-3 w-1", sides > 3 ? "bg-gold" : "bg-line")} />
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {walked
          ? "Uruk. The plant went to a snake. The walls remain."
          : "Walk the walls."}
      </p>
    </div>
  );
}

/** Loki. Bound. The writhing is the earthquake. */
export function LokiBound() {
  const [shook, setShook] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setShook(true)}
        className={cn("mx-auto block h-1 w-40 bg-gold", shook && "animate-pulse")}
        aria-label="The bond"
      />
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {shook
          ? "The earth moves."
          : "Bound. Poison. A bowl held over a face."}
      </p>
    </div>
  );
}

/** Maui. Fish up an island. */
export function MauiHook() {
  const [up, setUp] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setUp(true)}
        className="mx-auto block"
        aria-label="The hook"
      >
        <span
          className={cn(
            "mx-auto block w-24 rounded-t-full bg-teal/50 transition-all",
            up ? "h-20" : "h-6",
          )}
        />
      </button>
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {up
          ? "Land where there was water. A trick that becomes a country."
          : "A hook. Pull."}
      </p>
    </div>
  );
}

/** Cú Chulainn. Cool the victory. */
export function CuchulainnCool() {
  const [hot, setHot] = useState(true);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setHot(false)}
        className={cn(
          "mx-auto block h-16 w-16 rounded-full",
          hot ? "bg-gold" : "bg-teal/70",
        )}
        aria-label="The warp"
      />
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {hot
          ? "The warp is still on him."
          : "Water."}
      </p>
    </div>
  );
}

/** Quetzalcoatl. Bones, then a people. */
export function QuetzalcoatlBones() {
  const [planted, setPlanted] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setPlanted(true)}
        className="display min-h-16 text-3xl text-gold"
      >
        {planted ? "A people." : "Bring the bones."}
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {planted
          ? "Bones in the ground. Morning."
          : "The underworld keeps what it is owed."}
      </p>
    </div>
  );
}

/** Isis. One piece back. */
export function IsisGather() {
  const [one, setOne] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <div className="flex justify-center gap-2">
        {Array.from({ length: 7 }, (_, i) => (
          <span
            key={i}
            className={cn("h-8 w-6 bg-gold/30", one && i === 3 && "bg-gold")}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOne(true)}
        className="display mt-5 min-h-11 text-xl text-gold hover:text-teal"
      >
        Gather one
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {one
          ? "One piece. The rest can wait."
          : "Scattered."}
      </p>
    </div>
  );
}

/** Osiris. After ruin, grain. */
export function OsirisGrain() {
  const [grain, setGrain] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setGrain(true)}
        className={cn(
          "mx-auto block h-4 w-28",
          grain ? "bg-gold" : "bg-raised ring-1 ring-gold/30",
        )}
        aria-label="The body"
      />
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {grain
          ? "Dismembered, then food."
          : "A king taken apart."}
      </p>
    </div>
  );
}

/** Makeda. The hard question. */
export function MakedaAsk() {
  const [asked, setAsked] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setAsked(true)}
        className="display min-h-16 text-2xl text-gold"
      >
        {asked ? "She does not soften it." : "Ask."}
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {asked ? "The riddle stands." : "A throne. A long road."}
      </p>
    </div>
  );
}

/** Hanuman. He forgot his size. */
export function HanumanLeap() {
  const [leapt, setLeapt] = useState(false);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setLeapt(true)}
        className={cn(
          "mx-auto block rounded-full bg-gold transition-all",
          leapt ? "h-4 w-28" : "h-10 w-10",
        )}
        aria-label="Leap"
      />
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {leapt
          ? "The ocean is a step."
          : "He forgot his strength."}
      </p>
    </div>
  );
}

/** Sāvitrī. Walk with Death. */
export function SavitriWalk() {
  const [hour, setHour] = useState(0);
  return (
    <div className="mx-auto mt-10 max-w-sm text-center">
      <button
        type="button"
        onClick={() => setHour((n) => n + 1)}
        className="display min-h-11 text-xl text-gold hover:text-teal"
      >
        Walk with him
      </button>
      <p className="font-garamond mt-4 text-xl text-muted sm:text-2xl">
        {hour === 0
          ? "The chosen husband. The forest. Death is already walking."
          : hour < 3
            ? "Stay. One hour longer than you meant to."
            : "She is still walking."}
      </p>
    </div>
  );
}

/** The late messenger. Timing, not the animal. */
export function LateMessenger() {
  const [first, setFirst] = useState<"none" | "slow" | "fast">("none");
  return (
    <div className="mx-auto mt-10 max-w-md text-center">
      <div className="flex justify-center gap-8">
        <button
          type="button"
          onClick={() => setFirst("slow")}
          className="display min-h-11 text-xl text-muted hover:text-gold"
        >
          The slow word
        </button>
        <button
          type="button"
          onClick={() => setFirst("fast")}
          className="display min-h-11 text-xl text-gold hover:text-teal"
        >
          The fast word
        </button>
      </div>
      <p className="font-garamond mt-5 text-xl text-muted sm:text-2xl">
        {first === "none"
          ? "Two messages. Death entered because the first arrived second."
          : first === "fast"
            ? "The fast word arrived first."
            : "The slow word is still walking."}
      </p>
    </div>
  );
}

export const MYTH_PLAYS: Record<string, () => ReactElement> = {
  draupadi: DraupadiDice,
  persephone: PersephoneSeeds,
  orpheus: OrpheusPath,
  inanna: InannaGates,
  maat: MaatScale,
  weaver: WeaverBridge,
  odin: OdinRunes,
  prometheus: PrometheusFlame,
  scheherazade: ScheherazadeNight,
  amaterasu: AmaterasuCave,
  sedna: SednaComb,
  arjuna: ArjunaChariot,
  odysseus: OdysseusShores,
  sundiata: SundiataIron,
  anansi: AnansiWeb,
  sita: SitaFire,
  gilgamesh: GilgameshWalls,
  loki: LokiBound,
  maui: MauiHook,
  cuchulainn: CuchulainnCool,
  quetzalcoatl: QuetzalcoatlBones,
  isis: IsisGather,
  osiris: OsirisGrain,
  makeda: MakedaAsk,
  hanuman: HanumanLeap,
  savitri: SavitriWalk,
  chameleon: LateMessenger,
};
