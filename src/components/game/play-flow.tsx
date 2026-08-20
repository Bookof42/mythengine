import { lazy, Suspense } from "react";
import { currentScreen, useGame } from "@/lib/game-store";
import { Threshold } from "./threshold";

const FieldView = lazy(() =>
  import("./field-view").then((m) => ({ default: m.FieldView })),
);
const RevealScreen = lazy(() =>
  import("./reveal").then((m) => ({ default: m.RevealScreen })),
);
const PlayStepView = lazy(() =>
  import("./steps").then((m) => ({ default: m.PlayStepView })),
);

export function PlayFlow() {
  const ready = useGame((s) => s.ready);
  const save = useGame((s) => s.save);
  if (!ready) return <Threshold />;
  const screen = currentScreen(save);
  if (screen === "play") {
    const room =
      save.current?.mode === "psyche" || save.current?.mode === "walk" ? (
        <PlayStepView />
      ) : (
        <FieldView />
      );
    return <Suspense fallback={<Threshold />}>{room}</Suspense>;
  }
  if (save.current?.screen === "reveal") {
    return (
      <Suspense fallback={<Threshold />}>
        <RevealScreen />
      </Suspense>
    );
  }
  return <Threshold />;
}
