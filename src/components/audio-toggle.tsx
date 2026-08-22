import { Volume2, VolumeX } from "lucide-react";
import { audio } from "@/lib/audio";
import { useGame } from "@/lib/game-store";
import { cn } from "@/lib/utils";

export function AudioToggle({ className }: { className?: string }) {
  const muted = useGame((s) => s.save.muted);
  const setMuted = useGame((s) => s.setMuted);

  return (
    <button
      type="button"
      className={cn(
        "grid h-11 w-11 place-items-center text-gold hover:text-fg",
        className,
      )}
      onClick={() => {
        audio.unlock();
        setMuted(!muted);
      }}
      aria-label={muted ? "Sound off" : "Sound on"}
      aria-pressed={!muted}
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  );
}
