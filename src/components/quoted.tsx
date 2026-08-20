import type { QuotedLine } from "@/lib/meaning";
import { cn } from "@/lib/utils";

export function Quoted({
  line,
  gold = false,
  flush = false,
}: {
  line: QuotedLine;
  gold?: boolean;
  flush?: boolean;
}) {
  return (
    <figure className={cn("mt-10", flush ? "text-left sm:text-center" : "text-center")}>
      <blockquote>
        <p
          className={
            gold
              ? "display text-3xl leading-snug text-gold sm:text-5xl"
              : "font-garamond text-2xl leading-snug text-fg sm:text-4xl"
          }
        >
          {`“${line.text}”`}
        </p>
      </blockquote>
      <figcaption className="mt-3 text-base text-muted sm:text-lg">
        <a
          href={line.href}
          target="_blank"
          rel="noreferrer"
          className="text-teal hover:text-gold"
        >
          {line.cite} · {line.source}
        </a>
      </figcaption>
    </figure>
  );
}
