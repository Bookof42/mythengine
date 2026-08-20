import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useGame } from "@/lib/game-store";
import { MYTH_BY_ID } from "@/lib/myths";
import { SIGN_ICONS, KIT } from "@/lib/kit";
import { SEAL, SIGN, SIGNS } from "@/lib/signs";
import { loadJournal } from "@/lib/server/events";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const ready = useGame((s) => s.ready);
  const history = useGame((s) => s.save.history);
  const signs = useGame((s) => s.save.signs);
  const seals = useGame((s) => s.save.seals);
  const { user, isPending } = useCurrentUserState();
  const remote = useQuery({
    queryKey: ["journal", user?.id],
    queryFn: () => loadJournal(),
    enabled: Boolean(user),
  });

  const rows = ready
    ? [
        ...history.map((h) => ({
          id: h.id,
          mythId: h.mythId,
          question: h.question,
          at: h.finishedAt,
        })),
        ...(remote.data ?? []).map((h) => ({
          id: h.id,
          mythId: h.myth_id,
          question: h.question,
          at: h.finished_at,
        })),
      ]
        .filter((row, i, all) => all.findIndex((x) => x.id === row.id) === i)
        .sort((a, b) => (a.at < b.at ? 1 : -1))
    : [];

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-5 pb-16 pt-24 sm:px-8">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Private</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">Journal</h1>
      <p className="mt-3 text-muted">
        Myths you have lived in this engine, and the questions they handed back.
        Stored on this device
        {user ? " and with your account." : "."}
      </p>
      <section className="mt-10">
        <p className="text-[10px] tracking-[0.28em] text-faint uppercase">Shelf</p>
        <p className="mt-2 text-sm text-muted">
          What you have carried. Not a score. A set of images that entered you.
        </p>
        <ul className="mt-5 flex flex-wrap gap-4">
          {SIGNS.map((k) => {
            const have = signs?.includes(k);
            return (
              <li key={k} className={`w-20 ${have ? "opacity-100" : "opacity-30"}`}>
                <img src={SIGN_ICONS[k]} alt="" className="h-14 w-14" />
                <p className="mt-1 text-[11px] text-gold">{SIGN[k].title}</p>
              </li>
            );
          })}
          <li className={`w-20 ${seals?.includes("aperture") ? "opacity-100" : "opacity-30"}`}>
            <img src={KIT.icons.aperture} alt="" className="h-14 w-14" />
            <p className="mt-1 text-[11px] text-gold">{SEAL.aperture.title}</p>
          </li>
        </ul>
      </section>
      {isPending ? (
        <div className="mt-6 h-8 w-40 animate-pulse rounded bg-raised" />
      ) : (
        <>
          <SignedOut>
            <Link to="/login" className="mt-4 inline-flex min-h-11 text-sm text-teal">
              Sign in to carry this journal elsewhere
            </Link>
          </SignedOut>
          <SignedIn>
            <p className="mt-4 text-sm text-teal">Signed in. Walks can sync.</p>
          </SignedIn>
        </>
      )}
      {rows.length === 0 ? (
        <p className="mt-10 text-muted">No walks yet. The threshold is waiting.</p>
      ) : (
        <ol className="mt-10 space-y-4">
          {rows.map((row) => {
            const myth = MYTH_BY_ID[row.mythId];
            return (
              <li
                key={row.id}
                className="rounded-[var(--radius-lg)] border border-line bg-surface p-5"
              >
                <p className="text-xs text-faint">
                  {new Date(row.at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <Link
                  to="/library/$mythId"
                  params={{ mythId: row.mythId }}
                  className="display mt-1 block text-2xl text-fg hover:text-teal"
                >
                  {myth?.name ?? row.mythId}
                </Link>
                <p className="mt-2 text-sm text-muted">{row.question}</p>
              </li>
            );
          })}
        </ol>
      )}
    </main>
  );
}
