import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import type { Priors } from "@/lib/engine";
import type { SessionResult, StepRecord } from "@/lib/types";

/**
 * Recursive improvement loop (foundational, not a bolt-on):
 *
 * 1. Every completed session writes anonymized weights, myth, and step choices.
 * 2. `constellation` is the living aggregate of which myths are being lived.
 * 3. `content_stats` tracks which scenes/cards/paths are over-served.
 * 4. `content_to_myth` records which choices tend to surface which myths —
 *    a prior for later matching and for editorial review of lopsided items.
 * 5. The client fetches `getPriors` on load and uses inverse-frequency so the
 *    engine prefers under-lived myths when scores are close, and underused
 *    content when building a sequence.
 * 6. Omen responses (`noticed` / `carried` / `released`) tell us which daily
 *    prompts actually land.
 *
 * No birth data, names, or free-text ever leave the device in this path.
 */

type PlayPayload = {
  id: string;
  mythId: string;
  weights: Record<string, number>;
  steps: StepRecord[];
};

export const getPriors = createServerFn({ method: "GET" }).handler(
  async (): Promise<Priors> => {
    const sql = await getSql();
    const myths = await sql<{ myth_id: string; count: number }>`
      select myth_id, count from constellation
    `;
    const content = await sql<{
      mechanic: string;
      item_id: string;
      plays: number;
    }>`
      select mechanic, item_id, sum(plays)::int as plays
      from content_stats
      group by mechanic, item_id
    `;
    const mythCounts: Record<string, number> = {};
    for (const row of myths) mythCounts[row.myth_id] = Number(row.count) || 0;
    const contentPlays: Record<string, number> = {};
    for (const row of content) {
      contentPlays[`${row.mechanic}:${row.item_id}`] = Number(row.plays) || 0;
    }
    return { mythCounts, contentPlays };
  },
);

export const getConstellation = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    return sql<{ myth_id: string; count: number }>`
      select myth_id, count from constellation order by count desc
    `;
  },
);

export const recordPlay = createServerFn({ method: "POST" })
  .validator((input: PlayPayload) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const kinds = data.steps.map((s) => s.kind);
    const inserted = await sql<{ id: string }>`
      insert into play_events (id, myth_id, session_len, weights, step_kinds)
      values (
        ${data.id},
        ${data.mythId},
        ${data.steps.length},
        ${JSON.stringify(data.weights)}::jsonb,
        ${JSON.stringify(kinds)}::jsonb
      )
      on conflict (id) do nothing
      returning id
    `;
    if (!inserted.length) return { ok: true as const };
    await sql`
      insert into constellation (myth_id, count) values (${data.mythId}, 1)
      on conflict (myth_id) do update set count = constellation.count + 1
    `;
    for (const step of data.steps) {
      await sql`
        insert into content_stats (mechanic, item_id, choice, plays)
        values (${step.kind}, ${step.itemId}, ${step.choice}, 1)
        on conflict (mechanic, item_id, choice)
        do update set plays = content_stats.plays + 1
      `;
      await sql`
        insert into content_to_myth (mechanic, item_id, choice, myth_id, plays)
        values (${step.kind}, ${step.itemId}, ${step.choice}, ${data.mythId}, 1)
        on conflict (mechanic, item_id, choice, myth_id)
        do update set plays = content_to_myth.plays + 1
      `;
    }
    return { ok: true as const };
  });

export const recordOmen = createServerFn({ method: "POST" })
  .validator((input: { omenId: string; response: string }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into omen_events (omen_id, response)
      values (${data.omenId}, ${data.response})
    `;
    return { ok: true as const };
  });

export const saveJournal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: SessionResult) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into user_journal (
        id, user_id, started_at, finished_at, myth_id, question, weights, steps
      ) values (
        ${data.id},
        ${context.userId},
        ${data.startedAt},
        ${data.finishedAt},
        ${data.mythId},
        ${data.question},
        ${JSON.stringify(data.weights)}::jsonb,
        ${JSON.stringify(data.steps)}::jsonb
      )
      on conflict (id) do nothing
    `;
    return { ok: true as const };
  });

export const loadJournal = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<{
      id: string;
      started_at: string;
      finished_at: string;
      myth_id: string;
      question: string;
      weights: Record<string, number>;
      steps: StepRecord[];
    }>`
      select id, started_at, finished_at, myth_id, question, weights, steps
      from user_journal
      where user_id = ${context.userId}
      order by finished_at desc
    `;
  });
