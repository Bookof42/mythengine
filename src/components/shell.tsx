import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useGame } from "@/lib/game-store";
import { FAMILY_LINKS, HEADER_LINKS, HOUSE_LINKS, PLAY_LINKS } from "@/lib/nav";
import { audio } from "@/lib/audio";
import { cn } from "@/lib/utils";
import { SiteFooter } from "./site-footer";
import { EngineMark } from "./wick";

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const muted = useGame((s) => s.save.muted);
  const setMuted = useGame((s) => s.setMuted);
  const hydrate = useGame((s) => s.hydrate);
  const ready = useGame((s) => s.ready);
  const begin = useGame((s) => s.begin);
  const beginPsyche = useGame((s) => s.beginPsyche);
  const inRooms = useGame((s) => s.save.current?.screen === "play");
  const playing = inRooms;

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

  const goHome = () => {
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
    <div className="grain relative flex min-h-screen flex-col overflow-x-hidden bg-bg text-fg">
      {playing ? null : (
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 px-3 pt-[max(0.7rem,env(safe-area-inset-top))] sm:px-6">
        <Link
          to="/"
          className="pointer-events-auto flex items-center gap-2 text-teal"
          aria-label="mythengine home"
        >
          <EngineMark className="header-mark h-8 w-8 sm:h-9 sm:w-9" />
          <span className="header-mark display text-base tracking-[0.2em] text-gold sm:text-lg">
            mythengine
          </span>
        </Link>
        <nav className="pointer-events-auto hidden items-center gap-4 lg:flex xl:gap-6">
          <button
            type="button"
            onClick={startPlay}
            className="text-base text-gold hover:text-teal"
          >
            Play the field
          </button>
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-base text-muted hover:text-gold",
                pathname === link.to && "text-gold",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="pointer-events-auto flex items-center">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center text-gold/80 hover:text-gold"
            onClick={() => setMuted(!muted)}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center text-gold hover:text-fg"
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
              <p className="display text-base tracking-[0.22em] text-gold">mythengine</p>
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
                onClick={goHome}
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
                {inRooms ? "Back to the field" : "Play the field"}
              </button>
              <button
                type="button"
                onClick={startPsyche}
                className="display mt-1 min-h-11 w-full text-left text-xl text-fg hover:text-teal"
              >
                Walk as Psyche
              </button>

              <p className="mt-8 text-[10px] tracking-[0.28em] text-faint uppercase">House</p>
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

              <p className="mt-6 text-[10px] tracking-[0.28em] text-faint uppercase">Rooms</p>
              <ul className="mt-1">
                {HOUSE_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={cn(
                        "flex min-h-11 items-center text-base text-muted hover:text-fg",
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
                    className="inline-flex min-h-11 items-center text-sm text-teal hover:text-gold"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="border-t border-line pt-3 text-sm text-muted">
              <AuthSlot />
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-screen flex-1 flex-col">{children}</div>
      {playing ? null : <SiteFooter />}
    </div>
  );
}

function AuthSlot() {
  const { isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-8 w-32 animate-pulse rounded-full bg-raised" />;
  }
  return (
    <div className="flex items-center justify-between gap-3">
      <SignedIn>
        <div className="text-fg">
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <Link to="/login" className="text-teal hover:text-gold">
          Sign in to keep a journal across devices
        </Link>
      </SignedOut>
    </div>
  );
}
