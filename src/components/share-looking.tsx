import { saveCard, shareOnX, type SharePayload } from "@/lib/share-plate";
import { useState } from "react";

export function ShareLooking(props: SharePayload & { mythId: string }) {
  const [x, setX] = useState<"idle" | "busy" | "done">("idle");
  const [card, setCard] = useState<"idle" | "busy" | "done">("idle");
  return (
    <div className="flex flex-wrap items-center gap-5">
      <button
        type="button"
        className="min-h-11 text-sm tracking-[0.22em] text-gold uppercase hover:text-teal"
        disabled={x === "busy"}
        onClick={() => {
          setX("busy");
          void shareOnX(props)
            .then(() => setX("done"))
            .catch(() => setX("idle"));
        }}
      >
        {x === "busy" ? "Opening X" : x === "done" ? "On X" : "Share on X"}
      </button>
      <button
        type="button"
        className="min-h-11 text-sm tracking-[0.22em] text-muted uppercase hover:text-gold"
        disabled={card === "busy"}
        onClick={() => {
          setCard("busy");
          void saveCard(props)
            .then(() => setCard("done"))
            .catch(() => setCard("idle"));
        }}
      >
        {card === "busy" ? "Making the card" : card === "done" ? "Card saved" : "Save the card"}
      </button>
    </div>
  );
}
