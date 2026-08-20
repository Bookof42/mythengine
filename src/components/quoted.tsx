import type { QuotedLine } from "@/lib/meaning";

export function Quoted({
  line,
  gold = false,
}: {
  line: QuotedLine;
  gold?: boolean;
}) {
  return (
    <figure className="mt-10 text-center">
      <blockquote>
        <p
          className={
            gold
              ? "display text-3xl leading-snug text-gold sm:text-5xl"
              : "font-garamond text-2xl leading-snug text-fg sm:text-4xl"
          }
        >
          {line.text}
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
