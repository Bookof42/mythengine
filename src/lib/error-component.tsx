import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-gold" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth="1.5" />
      </span>
      <h1 className="display text-2xl">Something snagged the thread</h1>
      <p className="max-w-md text-sm break-words text-muted">
        {error.message || "An unexpected error occurred. Try returning to the threshold."}
      </p>
      <a href="/" className="mt-4 text-sm text-teal hover:text-gold">
        Return
      </a>
    </main>
  );
}
