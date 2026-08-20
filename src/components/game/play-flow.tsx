import { currentScreen, useGame } from "@/lib/game-store";
import { FieldView } from "./field-view";
import { RevealScreen } from "./reveal";
import { PlayStepView } from "./steps";
import { Threshold } from "./threshold";

export function PlayFlow() {
  const ready = useGame((s) => s.ready);
  const save = useGame((s) => s.save);
  if (!ready) return <Threshold />;
  const screen = currentScreen(save);
  if (screen === "play") {
    if (save.current?.mode === "psyche") return <PlayStepView />;
    return <FieldView />;
  }
  if (save.current?.screen === "reveal") return <RevealScreen />;
  return <Threshold />;
}