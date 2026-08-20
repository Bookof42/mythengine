import { createFileRoute, Link } from "@tanstack/react-router";
import { pageTitle } from "@/lib/seo";
import { MYTHS, mythArt } from "@/lib/myths";
import { WithApuleius } from "@/components/with-apuleius";
import { useMemo, useState } from "react";
import type { Myth, Tradition } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library/")({
  component: LibraryGrid,
  head: () => ({
    meta: [
      { title: pageTitle("Library") },
      {
        name: "description",
        content:
          "Forty-two old plots still happening. Read them without flying. Psyche is the hinge. The rest are mirrors.",
      },
    ],
  }),
});

function LibraryGrid() {
  const [q, setQ] = useState("");
  const [tradition, setTradition] = useState<Tradition | "all">("all");
  const traditions = useMemo(() => {
    return Array.from(new Set(MYTHS.map((m) => m.tradition))).sort();
  }, []);
  const list = MYTHS.filter((m) => {
    const hay = `${m.name} ${m.origin} ${m.short}`.toLowerCase();
    const okQ = !q || hay.includes(q.toLowerCase());
    const okT = tradition === "all" || m.tradition === tradition;
    return okQ && okT;
  });
  const hinge = list.find((m) => m.id === "psyche");
  const rest = list.filter((m) => m.id !== "psyche");
  const last = rest[rest.length - 1];
  const middle = rest.slice(0, -1);

  return (
    <main className="min-h-dvh bg-bg pb-20">
      <section className="relative min-h-[70dvh] overflow-hidden sm:min-h-screen">
        <img
          src="/art/library.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-screen sm:px-8 sm:pb-16">
          <p className="text-base tracking-[0.32em] text-gold uppercase sm:text-sm sm:tracking-[0.42em]">Archive</p>
          <h1 className="display mt-4 w-full text-[clamp(2.4rem,12vw,6rem)] leading-[1.05] text-fg">
            The myth library
          </h1>
          <p className="font-garamond mt-5 w-full text-xl leading-snug text-fg/90 sm:mt-6 sm:text-2xl lg:text-3xl">
            Myth is not an old story about somebody else. It is the plot you are
            already inside. You may read these rooms without flying. You may fly
            and never open this door. Either way you have already left home.
          </p>
          <p className="font-garamond mt-4 w-full text-xl leading-snug text-muted sm:mt-5 sm:text-2xl lg:text-3xl">
            These are not types. They are images. Do not take a number and go
            home improved. Stand in front of one until it looks back.
          </p>
          <p className="display mt-6 w-full text-[clamp(1.6rem,7vw,3.75rem)] text-gold sm:mt-8">
            Forty-two, because the Answer arrived first.
          </p>
          <p className="font-garamond mt-3 w-full text-xl leading-snug text-fg/90 sm:mt-4 sm:text-2xl">
            The Question is still outstanding. Don’t Panic. The towel is in the
            Codex. The mice have not been consulted. Psyche is the hinge. The rest
            are mirrors, and one of them is you, which is awkward, and also the
            point.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <label className="sr-only" htmlFor="lib-search">
          Search myths
        </label>
        <input
          id="lib-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or image"
          className="min-h-12 w-full border-0 border-b border-line bg-transparent px-0 text-xl text-fg placeholder:text-faint focus:border-gold focus:outline-none"
        />
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={() => setTradition("all")}
            className={cn(
              "min-h-11 text-base tracking-wide",
              tradition === "all" ? "text-gold" : "text-muted hover:text-fg",
            )}
          >
            All
          </button>
          {traditions.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTradition(t)}
              className={cn(
                "min-h-11 text-base tracking-wide",
                tradition === t ? "text-gold" : "text-muted hover:text-fg",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm tracking-[0.2em] text-faint">
          {list.length} of 42
        </p>
      </div>

      {list.length === 0 ? (
        <p className="font-garamond mx-auto mt-16 max-w-xl px-5 text-center text-xl text-muted">
          No mirror by that name.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 bg-bg sm:grid-cols-2">
          {hinge ? (
            <li className="bg-bg sm:col-span-2">
              <MythDoor myth={hinge} featured />
            </li>
          ) : null}
          {middle.map((myth) => (
            <li key={myth.id} className="bg-bg">
              <MythDoor myth={myth} />
            </li>
          ))}
          {last ? (
            <li className="bg-bg sm:col-span-2">
              <MythDoor myth={last} closing />
            </li>
          ) : null}
        </ul>
      )}

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-base tracking-[0.22em] text-gold">The shadow</p>
        <h2 className="display mt-4 w-full text-[clamp(2rem,9vw,4.5rem)] text-fg">
          Not the villain. The figure the tale will not leave out.
        </h2>
        <p className="font-garamond mt-6 w-full text-xl leading-snug text-fg/90 sm:mt-8 sm:text-2xl lg:text-3xl">
          Jung called it the shadow: what the persona will not claim. von Franz
          found it in the rejected sibling, the animal, the witch who is also the
          helper. Hillman said do not improve it. Personify it. Let it have an
          image.
        </p>
        <p className="font-garamond mt-6 w-full text-xl text-muted sm:text-2xl">
          Campbell’s guardian at the threshold is often this. Adams, being Adams,
          would add that the mice have a shadow too, and it is probably
          bureaucracy. In Inspect, each plot keeps one. Not a type. The other in
          the room.
        </p>
      </section>
    </main>
  );
}

function MythDoor({
  myth,
  featured = false,
  closing = false,
}: {
  myth: Myth;
  featured?: boolean;
  closing?: boolean;
}) {
  const wide = featured || closing;
  return (
    <Link
      to="/library/$mythId"
      params={{ mythId: myth.id }}
      className={cn(
        "group relative block overflow-hidden bg-bg",
        wide ? "min-h-[62vh] sm:min-h-[70vh]" : "min-h-[52vh] sm:min-h-[58vh]",
      )}
    >
      <img
        src={mythArt(myth.id)}
        alt=""
        decoding="async"
        className="absolute inset-0 h-full w-full bg-bg object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        {featured ? (
          <span className="block text-sm tracking-[0.22em] text-gold">
            The hinge
          </span>
        ) : null}
        {closing ? (
          <span className="block text-sm tracking-[0.22em] text-gold">
            The last night
          </span>
        ) : null}
        <span className="display mt-1 block text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">{myth.name}</span>
        <span className="mt-1 block text-sm tracking-[0.14em] text-teal">
          {myth.origin}
        </span>
        {wide ? (
          <span className="font-garamond mt-4 block max-w-3xl text-xl text-fg/90 sm:text-2xl">
            <WithApuleius text={myth.short} />
          </span>
        ) : (
          <span className="font-garamond mt-3 block text-lg text-fg/90 sm:text-xl">
            <WithApuleius text={myth.short} />
          </span>
        )}
      </span>
    </Link>
  );
}
