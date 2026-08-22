import { Link } from "@tanstack/react-router";
import { FAMILY_LINKS } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-0 shrink-0 border-t border-line bg-bg px-5 py-4 pb-[max(4rem,calc(env(safe-area-inset-bottom)+3.25rem))] sm:px-8 sm:py-5 sm:pb-5 lg:pb-5">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="font-note text-[0.7rem] tracking-[0.2em] text-gold">
          The Book of 42 family
        </p>
        <nav
          aria-label="The Book of 42 family"
          className="font-note mt-1.5 flex flex-wrap items-center justify-center text-sm text-teal"
        >
          {FAMILY_LINKS.map((link, i) => (
            <span key={link.href} className="inline-flex items-center">
              {i > 0 ? <span className="px-1.5 text-faint">·</span> : null}
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
        <p className="font-note mt-3 whitespace-nowrap text-xs text-muted sm:text-sm">
          Mythengine is a human–AI collaboration. These rooms are co-written.
        </p>
        <Link
          to="/codex"
          hash="cipher"
          className="font-note mt-3 text-sm italic text-gold hover:text-teal"
        >
          For the love and healing of humanity.
        </Link>
        <p className="font-note mt-3 text-[0.7rem] tracking-[0.18em] text-faint">
          <Link to="/codex" hash="cipher" className="hover:text-teal">
            Ordinal 333
          </Link>
          <span className="px-2">·</span>
          Mythengine · 42
          <span className="px-2">·</span>
          24 | 42
        </p>
      </div>
    </footer>
  );
}
