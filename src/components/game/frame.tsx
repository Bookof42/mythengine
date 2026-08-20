import { cn } from "@/lib/utils";

export function ArtFrame({
  src,
  children,
  align = "end",
  dim = "bg-bg/60",
}: {
  src: string;
  children: React.ReactNode;
  align?: "end" | "center";
  dim?: string;
}) {
  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className={cn("absolute inset-0 vignette", dim)} />
      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-16 sm:px-8 sm:pt-20",
          align === "center" ? "justify-center" : "justify-end",
        )}
      >
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
    <div
      className="mb-6 flex items-center justify-center gap-2"
      aria-hidden
    >
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

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
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
