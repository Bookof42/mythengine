import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const KEY = "book42-text-scale";

const STEPS = [
  { id: "md", label: "A", title: "Default text size", factor: "1", className: "text-[0.75rem]" },
  { id: "lg", label: "A", title: "Large text, about 18 percent", factor: "1.18", className: "text-[0.92rem]" },
  { id: "xl", label: "A", title: "AAA. Extra large text, about 42 percent. Kind to a phone.", factor: "1.42", className: "text-[1.12rem]" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

function apply(id: StepId) {
  if (typeof document === "undefined") return;
  const factor = STEPS.find((s) => s.id === id)?.factor ?? "1";
  const root = document.documentElement;
  root.dataset.textScale = id;
  root.style.setProperty("--text-scale", factor);
}

function read(): StepId {
  try {
    const s = localStorage.getItem(KEY);
    if (s === "lg" || s === "xl" || s === "md") return s;
  } catch {
    /* */
  }
  return "md";
}

export function TypeScale({ className }: { className?: string }) {
  const [step, setStep] = useState<StepId>("md");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = read();
    setStep(next);
    apply(next);
    setReady(true);
  }, []);

  const choose = (id: StepId) => {
    setStep(id);
    apply(id);
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* */
    }
  };

  return (
    <div
      role="group"
      aria-label="Text size"
      className={cn(
        "inline-flex items-end gap-0.5 rounded-full border border-line bg-bg/70 px-1 py-0.5",
        className,
      )}
    >
      {STEPS.map((s) => {
        const on = ready && step === s.id;
        return (
          <button
            key={s.id}
            type="button"
            title={s.title}
            aria-label={s.title}
            aria-pressed={on}
            onClick={() => choose(s.id)}
            className={cn(
              "font-note min-h-8 min-w-7 px-1 leading-none rounded-full sm:min-h-9 sm:min-w-8 sm:px-1.5",
              s.className,
              on ? "bg-gold/15 text-gold" : "text-muted hover:text-gold",
            )}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
