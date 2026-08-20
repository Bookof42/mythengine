import { createFileRoute } from "@tanstack/react-router";
import { PlayFlow } from "@/components/game/play-flow";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PlayFlow />;
}
