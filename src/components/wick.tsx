import { cn } from "@/lib/utils";

export function Wick({ className, size = 56 }: { className?: string; size?: number }) {
  return (
    <img
      src="/art/wick.jpg"
      alt=""
      width={size}
      height={size}
      className={cn("wick-float pointer-events-none select-none rounded-full object-cover", className)}
      draggable={false}
    />
  );
}

export function EngineMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("text-teal", className)} aria-hidden>
      <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      <circle cx="24" cy="24" r="5" fill="none" stroke="var(--color-gold)" strokeWidth="1.4" />
      <circle cx="24" cy="24" r="2.2" fill="var(--color-gold)" />
    </svg>
  );
}

/** @deprecated identity lives on EngineMark — kept as an alias for older imports */
export const ApertureMark = EngineMark;
