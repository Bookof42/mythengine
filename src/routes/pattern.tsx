import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  birthBoostFromSign,
  moonName,
  seasonFromDate,
  sunSignFromDate,
} from "@/lib/astronomy";
import { useGame } from "@/lib/game-store";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/pattern")({ component: PatternPage });

function PatternPage() {
  const save = useGame((s) => s.save);
  const ready = useGame((s) => s.ready);
  const setBirth = useGame((s) => s.setBirth);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [use, setUse] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setDate(save.birth?.date ?? "");
    setTime(save.birth?.time ?? "");
    setPlace(save.birth?.place ?? "");
    setUse(save.usePattern);
  }, [ready, save.birth, save.usePattern]);

  const parsed = date ? new Date(`${date}T${time || "12:00"}`) : null;
  const valid = parsed && !Number.isNaN(parsed.getTime());
  const sign = valid ? sunSignFromDate(parsed) : null;
  const moon = valid ? moonName(parsed) : null;
  const season = valid ? seasonFromDate(parsed) : null;
  const boost = sign && moon ? birthBoostFromSign(sign, moon) : null;

  return (
    <main className="mx-auto min-h-dvh max-w-xl px-5 pb-16 pt-24 sm:px-8">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Optional layer</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">Go deeper into your pattern</h1>
      <p className="mt-4 text-muted">
        This is not a natal chart and not a prediction. It is a seasonal
        signature: sun, moon phase, the weather of a beginning: offered as
        another layer of looking. Agency stays with you. The walk works without it.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setBirth(date, time, place, use);
        }}
      >
        <Field label="Birth date" htmlFor="bd">
          <input
            id="bd"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="min-h-11 w-full rounded-[var(--radius-md)] border border-line bg-surface px-3 text-fg"
          />
        </Field>
        <Field label="Time, if you have it" htmlFor="bt">
          <input
            id="bt"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="min-h-11 w-full rounded-[var(--radius-md)] border border-line bg-surface px-3 text-fg"
          />
        </Field>
        <Field label="Place you name as beginning" htmlFor="bp">
          <input
            id="bp"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="A city, a country, a kitchen"
            className="min-h-11 w-full rounded-[var(--radius-md)] border border-line bg-surface px-3 text-fg placeholder:text-faint"
          />
        </Field>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-1"
            checked={use}
            onChange={(e) => setUse(e.target.checked)}
          />
          Let this quietly color future walks: as invitation, never as fate.
        </label>
        <Button type="submit">Keep this pattern</Button>
      </form>

      {sign && moon && season ? (
        <section className="mt-10 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <p className="text-xs tracking-[0.24em] text-gold uppercase">A reading, not a sentence</p>
          <p className="display mt-3 text-2xl">
            {sign.name} sun · {moon} moon · {season}
          </p>
          <p className="mt-4 text-sm text-muted">
            {sign.element[0]!.toUpperCase() + sign.element.slice(1)} and {sign.modality}{" "}
            weather. In this engine that leans the walk slightly toward{" "}
            {boost
              ? Object.keys(boost).join(", ")
              : "nothing in particular"}
            . Slightly. You can still choose the unlit path.
          </p>
          {place ? (
            <p className="mt-3 text-sm text-faint">
              You named {place}. The pattern is the life lived there, not a
              coordinate.
            </p>
          ) : null}
          {time ? (
            <p className="mt-3 text-sm text-faint">
              A time was given. We do not invent a rising sign from it without
              sky math we do not have here. The hour is kept as atmosphere.
            </p>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
