import { createFileRoute, Link } from "@tanstack/react-router";
import { getConstellation } from "@/lib/server/events";
import { MYTHS } from "@/lib/myths";
import { useGame } from "@/lib/game-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { hashString } from "@/lib/utils";

export const Route = createFileRoute("/constellation")({
  component: ConstellationPage,
});

function ConstellationPage() {
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);
  const query = useQuery({
    queryKey: ["constellation"],
    queryFn: () => getConstellation(),
    enabled: live,
  });
  const history = useGame((s) => s.save.history);
  const ready = useGame((s) => s.ready);
  const remote = live ? (query.data ?? []) : [];
  const localBoost = useMemo(() => {
    if (!ready) return {} as Record<string, number>;
    const map: Record<string, number> = {};
    for (const h of history) map[h.mythId] = (map[h.mythId] ?? 0) + 1;
    return map;
  }, [history, ready]);

  const stars = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const myth of MYTHS) counts[myth.id] = 0;
    for (const row of remote) counts[row.myth_id] = Number(row.count) || 0;
    for (const [id, n] of Object.entries(localBoost)) {
      counts[id] = (counts[id] ?? 0) + n;
    }
    return MYTHS.map((myth, i) => {
      const seed = hashString(myth.id);
      const x = 8 + ((seed % 840) / 840) * 84;
      const y = 10 + (((seed >> 8) % 700) / 700) * 72;
      const jitter = (i % 5) * 0.6;
      return {
        myth,
        count: counts[myth.id] ?? 0,
        x: Math.min(92, x + jitter),
        y: Math.min(88, y + (i % 3)),
      };
    });
  }, [remote, localBoost]);

  const max = Math.max(1, ...stars.map((s) => s.count));
  const total = stars.reduce((a, s) => a + s.count, 0);
  const lit = stars.filter((s) => s.count > 0).sort((a, b) => b.count - a.count);

  return (
    <main className="mx-auto min-h-dvh max-w-5xl px-5 pb-16 pt-24 sm:px-8">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Living map</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">Constellation</h1>
      <p className="mt-3 max-w-xl text-muted">
        Where walks have clustered. Not a ranking. A sky of what is being lived.
        {total
          ? ` ${total} walk${total === 1 ? "" : "s"} so far.`
          : " The sky is still mostly dark, which is honest."}
      </p>
      <div className="relative mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface">
        <img
          src="/art/omen.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <svg viewBox="0 0 100 70" className="relative h-[420px] w-full sm:h-[520px]">
          {stars.map((star) => {
            const r = 0.55 + (star.count / max) * 1.8;
            const opacity = star.count ? 0.55 + (star.count / max) * 0.45 : 0.18;
            return (
              <g key={star.myth.id}>
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={r + 0.9}
                  fill="none"
                  stroke="var(--color-teal)"
                  strokeOpacity={star.count ? 0.35 : 0.08}
                />
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={r}
                  fill={star.count ? "var(--color-gold)" : "var(--color-teal)"}
                  opacity={opacity}
                />
              </g>
            );
          })}
        </svg>
      </div>
      {lit.length ? (
        <ul className="mt-8 columns-1 gap-6 sm:columns-2">
          {lit.map((s) => (
            <li key={s.myth.id} className="mb-2 break-inside-avoid text-sm">
              <Link
                to="/library/$mythId"
                params={{ mythId: s.myth.id }}
                className="text-fg hover:text-teal"
              >
                {s.myth.name}
              </Link>
              <span className="text-faint"> · {s.count}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-faint">
          Walk once and a star will take a little more light.
        </p>
      )}
    </main>
  );
}
