import type { SigilKind } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = { kind: SigilKind; className?: string };

export function Sigil({ kind, className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {glyph(kind)}
    </svg>
  );
}

function glyph(kind: SigilKind) {
  switch (kind) {
    case "aperture":
      return (
        <>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="14" />
          <circle cx="32" cy="32" r="5" fill="currentColor" stroke="none" />
        </>
      );
    case "thread":
      return <path d="M12 44c8-18 12 6 20-8 8-14 8 14 20-6" />;
    case "key":
      return (
        <>
          <circle cx="24" cy="24" r="8" />
          <path d="M30 30 L50 50 M44 50 h6 M40 46 h6" />
        </>
      );
    case "well":
      return (
        <>
          <ellipse cx="32" cy="24" rx="16" ry="7" />
          <path d="M16 24 v10 c0 10 32 10 32 0 V24" />
        </>
      );
    case "moth":
      return (
        <>
          <path d="M32 18 v28" />
          <path d="M32 28 C18 14 10 30 32 40 C54 30 46 14 32 28" />
        </>
      );
    case "crown":
      return <path d="M12 42 L16 22 L26 34 L32 16 L38 34 L48 22 L52 42 Z" />;
    case "mask":
      return (
        <>
          <path d="M14 28 c0-12 34-12 36 0 v6 c0 10-8 16-18 16 s-18-6-18-16z" />
          <path d="M24 32 h0.1 M40 32 h0.1" />
        </>
      );
    case "seed":
      return <path d="M32 12 C20 28 20 44 32 52 C44 44 44 28 32 12Z" />;
    case "blade":
      return <path d="M18 46 L42 14 M16 50 h10 M40 16 l8 8" />;
    case "cup":
      return <path d="M20 18 h24 v6 c0 12-6 18-12 18 s-12-6-12-18z M26 42 h12 v6" />;
    case "bone":
      return <path d="M18 22 c-4-4 4-10 8-6 L38 38 c4 4-2 10-6 6 Z M20 18 h0.1 M42 44 h0.1" />;
    case "star":
      return <path d="M32 10 L36 26 L52 26 L40 36 L44 52 L32 42 L20 52 L24 36 L12 26 L28 26 Z" />;
    case "boat":
      return (
        <>
          <path d="M12 38 c8 10 32 10 40 0" />
          <path d="M32 38 V16 L44 38" />
        </>
      );
    case "serpent":
      return <path d="M14 40 c8-18 12 8 20-6 8-14 10 10 16-8" />;
    case "bird":
      return <path d="M10 36 c12-4 18-16 22-22 4 6 10 18 22 22-10 2-16 8-22 8s-12-6-22-8z" />;
    case "mountain":
      return <path d="M8 46 L24 18 L32 32 L40 22 L56 46 Z" />;
    case "moon":
      return <path d="M36 12 a20 20 0 1 0 0 40 a16 16 0 0 1 0-40" />;
    case "flame":
      return <path d="M32 52 c12 0 16-12 16-20 0-12-16-22-16-32 0 10-16 20-16 32 0 8 4 20 16 20z" />;
    case "bridge":
      return (
        <>
          <path d="M8 40 c12-18 36-18 48 0" />
          <path d="M8 40 h48 M16 40 v6 M48 40 v6" />
        </>
      );
    case "scale":
      return (
        <>
          <path d="M32 12 v36 M20 48 h24" />
          <path d="M32 20 L16 32 h10 Z M32 20 L48 32 h-10 Z" />
        </>
      );
    case "owl":
      return (
        <>
          <circle cx="32" cy="30" r="16" />
          <circle cx="26" cy="28" r="4" />
          <circle cx="38" cy="28" r="4" />
          <path d="M32 34 l3 5 h-6 z" />
        </>
      );
    case "wall":
      return (
        <>
          <rect x="12" y="16" width="40" height="32" />
          <path d="M12 32 h40 M32 16 v32" />
        </>
      );
    default:
      return <circle cx="32" cy="32" r="16" />;
  }
}
