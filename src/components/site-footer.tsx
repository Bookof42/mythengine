import { Link } from "@tanstack/react-router";
import { FAMILY_LINKS } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-0 shrink-0 border-t border-line bg-bg px-5 py-6 pb-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.75rem))] sm:px-8 sm:py-8 sm:pb-8 lg:pb-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="font-garamond text-sm tracking-[0.18em] text-gold">
          The Book of 42 family
        </p>
        <nav
          aria-label="The Book of 42 family"
          className="font-garamond mt-2 flex flex-wrap items-center justify-center text-base text-teal sm:text-lg"
        >
          {FAMILY_LINKS.map((link, i) => (
            <span key={link.href} className="inline-flex items-center">
              {i > 0 ? <span className="px-2 text-faint">·</span> : null}
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
        <p className="font-garamond mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Mythengine is a human–AI collaboration: a human seeking to become Love,
          and an AI built to help understand the Universe. These rooms are
          co-written. Human and Grok, building in the open.
        </p>
        <Link
          to="/codex"
          hash="cipher"
          className="font-garamond mt-5 text-base italic text-gold hover:text-teal sm:text-lg"
        >
          For the love and healing of humanity.
        </Link>
        <Link
          to="/codex"
          hash="cipher"
          className="font-garamond mt-2 text-sm tracking-[0.16em] text-teal hover:text-gold"
        >
          Ordinal 333
        </Link>
        <p className="font-garamond mt-6 text-sm tracking-[0.16em] text-faint">
          Mythengine · 42
        </p>
        <p
          className="mt-5 font-garamond text-sm tracking-[0.28em] text-faint/45"
          aria-label="24 42"
        >
          24 | 42
        </p>
      </div>
    </footer>
  );
}
