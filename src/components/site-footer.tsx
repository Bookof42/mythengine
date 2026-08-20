import { Link } from "@tanstack/react-router";
import { FAMILY_LINKS, HOUSE_LINKS, PLAY_LINKS } from "@/lib/nav";
import { useGame } from "@/lib/game-store";
import { useNavigate } from "@tanstack/react-router";

export function SiteFooter() {
  const begin = useGame((s) => s.begin);
  const navigate = useNavigate();
  const play = () => {
    begin();
    void navigate({ to: "/" });
  };

  return (
    <footer className="mt-auto shrink-0 border-t border-line bg-bg px-4 py-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2">
        <p className="display text-xs tracking-[0.22em] text-gold">
          The Book of 42 family
        </p>
        <nav
          aria-label="The Book of 42 family"
          className="flex flex-wrap items-center gap-x-1 text-xs text-teal"
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
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="display shrink-0 text-xs tracking-[0.22em] text-muted">
            mythengine · 42
          </p>
          <nav
            aria-label="This house"
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted"
          >
            <button type="button" onClick={play} className="hover:text-gold">
              Play
            </button>
            {[...PLAY_LINKS, ...HOUSE_LINKS].map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-gold">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
