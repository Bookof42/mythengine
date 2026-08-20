import { createFileRoute, Link } from "@tanstack/react-router";
import { getMyth, mythArt } from "@/lib/myths";
import { ShareLooking } from "@/components/share-looking";

export const Route = createFileRoute("/carry")({
  validateSearch: (s: Record<string, unknown>) => ({
    m: typeof s.m === "string" ? s.m : "psyche",
    q: typeof s.q === "string" ? s.q : "",
  }),
  component: CarryPage,
});

function CarryPage() {
  const { m, q } = Route.useSearch();
  const myth = getMyth(m);
  const question = q || myth?.reflection || "A question you can carry.";
  const name =
    myth?.name ??
    (m === "pattern" || m === "omen" ? "Today’s pattern" : "Mythengine");
  const art =
    myth?.id
      ? mythArt(myth.id)
      : m === "pattern" || m === "omen"
        ? "/art/omen.jpg"
        : "/art/hero.jpg";

  return (
    <main className="min-h-dvh bg-bg">
      <section className="relative min-h-dvh overflow-hidden">
        <img src={art} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-16 pt-24 sm:px-8">
          <p className="text-sm tracking-[0.42em] text-gold uppercase">
            Mythengine · 42
          </p>
          <p className="mt-4 text-sm tracking-[0.22em] text-teal uppercase">{name}</p>
          <h1 className="display mt-4 w-full text-4xl leading-[1.08] text-fg sm:text-6xl lg:text-7xl">
            {question}
          </h1>
          <p className="display mt-8 text-2xl text-gold sm:text-3xl">Don’t Panic</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ShareLooking
              art={art}
              kicker={name}
              question={question}
              mythId={m}
            />
            <Link to="/" className="text-lg text-teal hover:text-gold">
              Enter the field
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
