import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/omen")({
  beforeLoad: () => {
    throw redirect({ to: "/codex", hash: "pattern" });
  },
});
