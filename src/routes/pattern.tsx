import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pattern")({
  beforeLoad: () => {
    throw redirect({ to: "/codex" });
  },
});
