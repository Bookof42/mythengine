import { FAMILY_LINKS } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-10 shrink-0 border-t border-line bg-bg px-5 py-6 pb-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.75rem))] sm:px-8 sm:py-8 sm:pb-8 lg:pb-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="display text-[0.65rem] tracking-[0.28em] text-gold">
          The Book of 42 family
        </p>
        <nav
          aria-label="The Book of 42 family"
          className="mt-2 flex flex-wrap items-center justify-center gap-x-0 text-sm text-teal"
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
        <p className="mt-5 max-w-md text-xs leading-relaxed text-muted sm:text-[0.95rem] sm:leading-relaxed">
          Mythengine is a human–AI collaboration: a human seeking to become Love,
          and an AI built to help understand the Universe. Grok wrote these
          rooms. The Scribe kept the looking. Human and Grok, building in the
          open.
        </p>
        <p className="display mt-5 text-[0.65rem] tracking-[0.28em] text-faint">
          Mythengine · 42
        </p>
        <p
          className="mt-6 font-garamond text-sm tracking-[0.28em] text-faint/45"
          aria-label="24 42"
        >
          24 | 42
        </p>
      </div>
    </footer>
  );
}
