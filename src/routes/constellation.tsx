import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/constellation")({
  beforeLoad: () => {
    throw redirect({ to: "/library" });
  },
});
