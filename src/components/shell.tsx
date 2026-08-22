import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useGame } from "@/lib/game-store";
import { FAMILY_LINKS, HEADER_LINKS, HOUSE_LINKS, PLAY_LINKS } from "@/lib/nav";
import { audio } from "@/lib/audio";
import { cn } from "@/lib/utils";
import { SiteFooter } from "./site-footer";
import { TypeScale } from "./type-scale";
import { AudioToggle } from "./audio-toggle";
import { EngineMark } from "./wick";

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [menuHint, setMenuHint] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const hydrate = useGame((s) => s.hydrate);
  const ready = useGame((s) => s.ready);
  const begin = useGame((s) => s.begin);
  const beginPsyche = useGame((s) => s.beginPsyche);
  const inRooms = useGame((s) => s.save.current?.screen === "play");
  const house = useGame((s) => s.house);
  const playing = inRooms && pathname === "/";
  const vacuum = pathname === "/" && !playing && !house;

  useEffect(() => {
    if (!ready) hydrate();
  }, [ready, hydrate]);

  useEffect(() => {
    const arm = () => audio.unlock();
    window.addEventListener("pointerdown", arm);
    window.addEventListener("keydown", arm);
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!house || vacuum) return;
    try {
      if (sessionStorage.getItem("mythengine-menu") === "1") return;
      sessionStorage.setItem("mythengine-menu", "1");
    } catch {
      /* ignore */
    }
    setMenuHint(true);
    const id = window.setTimeout(() => setMenuHint(false), 2400);
    return () => window.clearTimeout(id);
  }, [house, vacuum]);

  const startPlay = () => {
    if (!inRooms) begin();
    void navigate({ to: "/" });
    setOpen(false);
  };

  const startPsyche = () => {
    beginPsyche();
    void navigate({ to: "/" });
    setOpen(false);
  };

  const openHouse = useGame((s) => s.openHouse);
  const goHouse = () => {
    openHouse();
    void navigate({ to: "/" });
    setOpen(false);
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else void navigate({ to: "/" });
    setOpen(false);
  };

  const atHome = pathname === "/";

  return (
    <div className="grain relative flex min-h-dvh flex-col bg-bg text-fg">
      {playing || vacuum ? null : (
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-2 bg-gradient-to-b from-bg/80 to-transparent px-2 pt-[max(0.7rem,env(safe-area-inset-top))] pb-8 sm:gap-3 sm:px-6">
        <div className="pointer-events-auto flex min-w-0 items-center gap-1 sm:gap-2">
          {atHome ? null : (
            <button
              type="button"
              onClick={goBack}
              className="flex h-11 min-w-11 items-center gap-0.5 pr-1 text-gold hover:text-teal"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5 shrink-0" />
              <span className="font-note text-sm tracking-[0.08em] sm:text-base">Back</span>
            </button>
          )}
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 text-teal"
            aria-label="Mythengine home"
          >
            <EngineMark className="header-mark h-8 w-8 sm:h-9 sm:w-9" />
            <span
              className={cn(
                "header-mark display truncate tracking-[0.14em] text-gold sm:text-lg sm:tracking-[0.2em]",
                atHome ? "text-sm" : "hidden text-sm sm:inline",
              )}
            >
              Mythengine
            </span>
          </Link>
        </div>
        <nav
          aria-label="House"
          className="pointer-events-auto absolute top-[max(0.7rem,env(safe-area-inset-top))] left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7"
        >
          <button
            type="button"
            onClick={startPlay}
            className="text-base text-gold hover:text-teal font-note tracking-[0.06em]"
          >
            Field
          </button>
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "font-note text-base tracking-[0.06em] text-muted hover:text-gold",
                pathname === link.to && "text-gold",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="pointer-events-auto flex items-center gap-1">
          <AudioToggle />
          <TypeScale className="mr-0.5" />
          <button
            type="button"
            className={cn(
              "grid h-11 w-11 place-items-center text-gold hover:text-fg",
              menuHint && "menu-hint",
            )}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      )}

      {open ? (
        <div className="fixed inset-0 z-40 bg-bg/96">
          <div className="mx-auto flex h-dvh max-w-md flex-col px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between">
              <p className="display text-base tracking-[0.22em] text-gold">Mythengine</p>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center text-muted hover:text-fg"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-4 flex-1 overflow-y-auto overscroll-contain">
              {!atHome ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="display min-h-12 w-full text-left text-3xl text-gold"
                >
                  Back
                </button>
              ) : null}
              <button
                type="button"
                onClick={goHouse}
                className={cn(
                  "display w-full text-left text-fg hover:text-teal",
                  atHome ? "min-h-12 text-3xl text-gold" : "mt-1 min-h-11 text-2xl",
                )}
              >
                Home
              </button>
              <button
                type="button"
                onClick={startPlay}
                className="display mt-6 min-h-12 w-full text-left text-2xl text-gold sm:text-3xl"
              >
                {inRooms ? "The field" : "Field"}
              </button>
              <button
                type="button"
                onClick={startPsyche}
                className="display mt-1 min-h-11 w-full text-left text-xl text-fg hover:text-teal"
              >
                A Short Night
              </button>
              <button
                type="button"
                onClick={() => {
                  beginPsyche("long");
                  void navigate({ to: "/" });
                  setOpen(false);
                }}
                className="display mt-1 min-h-11 w-full text-left text-xl text-fg hover:text-teal"
              >
                The Long Night
              </button>

              <p className="display mt-8 text-xs tracking-[0.22em] text-faint">House</p>
              <ul className="mt-1">
                {PLAY_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={cn(
                        "display flex min-h-11 items-center text-2xl text-fg hover:text-teal",
                        pathname === link.to && "text-gold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="display mt-6 text-xs tracking-[0.22em] text-faint">Rooms</p>
              <ul className="mt-1">
                {HOUSE_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={cn(
                        "display flex min-h-11 items-center text-2xl text-muted hover:text-teal",
                        pathname === link.to && "text-gold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-1 pb-4">
                {FAMILY_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-note inline-flex min-h-11 items-center text-lg text-teal hover:text-gold"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      ) : null}

      <div className="relative z-10 w-full flex-1">
        {children}
        {playing || vacuum ? null : <SiteFooter />}
      </div>
      {playing || vacuum ? null : (
        <MobileDock pathname={pathname} onHouse={goHouse} />
      )}
    </div>
  );
}

function MobileDock({
  pathname,
  onHouse,
}: {
  pathname: string;
  onHouse: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/92 backdrop-blur-md lg:hidden">
      <nav
        aria-label="Rooms"
        className="flex items-center justify-center gap-8 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1"
      >
        <button
          type="button"
          onClick={onHouse}
          className="flex min-h-12 min-w-[4.2rem] items-center justify-center text-gold"
        >
          <span className="font-note text-sm tracking-[0.1em]">House</span>
        </button>
        {HEADER_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "flex min-h-12 min-w-[4.5rem] items-center justify-center text-sm tracking-[0.14em]",
              pathname === link.to || pathname.startsWith(`${link.to}/`)
                ? "text-gold"
                : "text-muted",
            )}
          >
            <span className="font-note">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}


