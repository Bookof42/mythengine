import { useEffect, useState, type ComponentType } from "react";
import { currentScreen, useGame } from "@/lib/game-store";
import { Threshold } from "./threshold";

const loadField = () =>
  import("./field-view").then((m) => m.FieldView);
const loadSteps = () =>
  import("./steps").then((m) => m.PlayStepView);
const loadReveal = () =>
  import("./reveal").then((m) => m.RevealScreen);

export function PlayFlow() {
  const ready = useGame((s) => s.ready);
  const save = useGame((s) => s.save);
  if (!ready) return <Threshold />;
  const screen = currentScreen(save);
  if (screen === "play") {
    if (save.current?.mode === "psyche" || save.current?.mode === "walk") {
      return <ClientChunk loader={loadSteps} />;
    }
    return <ClientChunk loader={loadField} />;
  }
  if (save.current?.screen === "reveal") {
    return <ClientChunk loader={loadReveal} />;
  }
  return <Threshold />;
}

function ClientChunk({
  loader,
}: {
  loader: () => Promise<ComponentType>;
}) {
  const [View, setView] = useState<ComponentType | null>(null);
  useEffect(() => {
    let live = true;
    void loader().then((C) => {
      if (live) setView(() => C);
    });
    return () => {
      live = false;
    };
  }, [loader]);
  if (!View) return <Threshold />;
  return <View />;
}
