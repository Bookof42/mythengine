import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="relative grid min-h-dvh place-items-center px-6">
      <img
        src="/art/omen.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-bg/70" />
      <div className="relative w-full max-w-sm rounded-[var(--radius-xl)] border border-line bg-bg/80 p-7">
        <p className="display text-sm tracking-[0.3em] text-gold">Mythengine</p>
        <h1 className="display mt-3 text-3xl">Keep a journal</h1>
        <p className="mt-3 text-sm text-muted">
          Play works without an account. Sign in only if you want your lived myths
          to travel with you.
        </p>
        <div className="mt-6 space-y-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                variant="ghost"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
        <Link to="/" className="mt-6 inline-flex min-h-11 items-center text-sm text-teal">
          Return to the threshold
        </Link>
      </div>
    </main>
  );
}
