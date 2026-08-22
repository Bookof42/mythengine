import { useGame } from "@/lib/game-store";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export function ArtFrame({
  src,
  children,
  align = "end",
  fit = "cover",
}: {
  src: string;
  children: React.ReactNode;
  align?: "end" | "center";
  dim?: string;
  fit?: "cover" | "contain" | "card";
}) {
  const stepBack = useGame((s) => s.stepBack);
  return (
    <main className={cn("walk-frame", fit === "contain" && "walk-contain", fit === "card" && "walk-card")}>
      <div className="walk-art">
        <img src={src} alt="" />
      </div>
      <button
        type="button"
        onClick={() => stepBack()}
        className="absolute left-2 top-[max(0.5rem,env(safe-area-inset-top))] z-30 flex h-11 items-center gap-0.5 pr-2 text-gold hover:text-teal sm:left-5"
        aria-label="Back"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="display text-sm tracking-[0.12em]">Back</span>
      </button>
      <div className={cn("walk-copy", align === "center" && "walk-copy-center")}>
        {children}
      </div>
    </main>
  );
}

export function PathDots({
  total,
  index,
}: {
  total: number;
  index: number;
}) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full",
            i < index
              ? "h-2 w-2 bg-gold"
              : i === index
                ? "h-2.5 w-2.5 bg-teal pulse-ring"
                : "h-1.5 w-1.5 bg-faint/50",
          )}
        />
      ))}
    </div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-line bg-bg/78 p-5 shadow-[var(--shadow-soft)] sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}
