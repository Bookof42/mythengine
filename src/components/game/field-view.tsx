import { useGame } from "@/lib/game-store";
import {
  createFlight,
  RING,
  WELL,
  stepFlight,
  type FlightInput,
  type FlightSim,
} from "@/lib/flight-sim";
import { KIT, SIGN_ICONS } from "@/lib/kit";
import { audio } from "@/lib/audio";
import { SIGNS, carried, emptyHeld, type SignKind } from "@/lib/signs";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function load(src: string) {
  if (typeof Image === "undefined") return null;
  const img = new Image();
  img.src = src;
  return img;
}

const mothFrames = KIT.mascot.moth.map(load);
const skyImg = load(KIT.field);
const wellImg = load(KIT.props.well);
const lampImg = load(KIT.props.lamp);
const signImgs = Object.fromEntries(
  SIGNS.map((k) => [k, load(SIGN_ICONS[k])]),
) as Record<SignKind, HTMLImageElement>;

export function FieldView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holdRef = useRef<HTMLButtonElement>(null);
  const simRef = useRef<FlightSim | null>(null);
  const inputRef = useRef<FlightInput>({
    aim: null,
    keys: { x: 0, y: 0 },
    thrust: false,
  });
  const finishArcade = useGame((s) => s.finishArcade);
  const abandon = useGame((s) => s.abandon);
  const lastTrail = useGame((s) => s.save.lastTrail);
  const lastKept = useGame((s) => s.save.lastKept);
  const finished = useRef(false);
  const [hint, setHint] = useState("Hold to burn.");
  const [telem, setTelem] = useState("Hold · Take · Return");
  const [held, setHeld] = useState(emptyHeld());
  const [lastTaken, setLastTaken] = useState<SignKind | null>(null);
  const [ending, setEnding] = useState(false);
  const [hintOn, setHintOn] = useState(true);

  useEffect(() => {
    if (!hint) {
      setHintOn(false);
      return;
    }
    setHintOn(true);
    const id = window.setTimeout(() => setHintOn(false), 4200);
    return () => window.clearTimeout(id);
  }, [hint]);

  useEffect(() => {
    audio.unlock();
    audio.setSection("play");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sim = createFlight({ ghost: lastTrail, kept: lastKept });
    simRef.current = sim;
    finished.current = false;
    const input = inputRef.current;
    const keys = new Set<string>();
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    const pad = { hold: false };

    const view = () => {
      const vv = window.visualViewport;
      return {
        w: Math.round(vv?.width ?? window.innerWidth),
        h: Math.round(vv?.height ?? window.innerHeight),
      };
    };

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { w, h } = view();
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);
    window.visualViewport?.addEventListener("resize", fit);

    const worldFromEvent = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left - rect.width / 2 + sim.cam.x,
        y: e.clientY - rect.top - rect.height / 2 + sim.cam.y,
      };
    };
    const syncKeys = () => {
      input.keys = {
        x:
          (keys.has("ArrowRight") || keys.has("KeyD") ? 1 : 0) -
          (keys.has("ArrowLeft") || keys.has("KeyA") ? 1 : 0),
        y:
          pad.hold || keys.has("Space") || keys.has("KeyW") || keys.has("ArrowUp")
            ? -1
            : keys.has("KeyS") || keys.has("ArrowDown")
              ? 1
              : 0,
      };
      if (pad.hold) input.keys.y = -1;
      input.thrust =
        input.aim !== null ||
        pad.hold ||
        keys.has("Space") ||
        keys.has("KeyW") ||
        input.keys.x !== 0 ||
        input.keys.y !== 0;
    };

    const onPoint = (e: PointerEvent) => {
      if (coarse) return;
      if (e.type === "pointermove" && e.buttons === 0) return;
      input.aim = worldFromEvent(e);
      input.thrust = true;
    };
    const onUp = () => {
      if (coarse) return;
      input.aim = null;
      syncKeys();
    };
    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (e.code === "Space") e.preventDefault();
      if (down) keys.add(e.code);
      else keys.delete(e.code);
      syncKeys();
    };
    if (!coarse) {
      canvas.addEventListener("pointerdown", onPoint);
      canvas.addEventListener("pointermove", onPoint);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
    }
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

    const padEl = holdRef.current;
    const onPadDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      pad.hold = true;
      input.aim = null;
      syncKeys();
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        /* */
      }
    };
    const onPadUp = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "pointerleave") return;
      pad.hold = false;
      input.aim = null;
      syncKeys();
    };
    const padOpts: AddEventListenerOptions = { passive: false };
    padEl?.addEventListener("pointerdown", onPadDown, padOpts);
    padEl?.addEventListener("pointerup", onPadUp, padOpts);
    padEl?.addEventListener("pointercancel", onPadUp, padOpts);
    padEl?.addEventListener("lostpointercapture", onPadUp);
    const noScroll = (e: TouchEvent) => e.preventDefault();
    canvas.parentElement?.addEventListener("touchmove", noScroll, { passive: false });

    window.__controlsTest = {
      getYaw: () => sim.moth.angle,
      getSpeed: () => Math.hypot(sim.moth.vx, sim.moth.vy),
      setKeys: (codes) => {
        keys.clear();
        for (const c of codes) keys.add(c);
        syncKeys();
      },
    };

    let last = performance.now();
    let raf = 0;
    let lastHint = sim.hint;
    let lastTelem = "";
    let lastHeld = "000";
    let lastGate = "";
    let lastEnding = false;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      stepFlight(sim, dt, input);
      audio.setFlight({
        speed: Math.hypot(sim.moth.vx, sim.moth.vy),
        lamp: Math.hypot(sim.moth.x, sim.moth.y),
        well: sim.inWell,
        flap: sim.flapPulse > 0.4,
      });
      if (sim.hint !== lastHint) {
        lastHint = sim.hint;
        setHint(sim.hint);
      }
      const heldKey = SIGNS.map((k) => (sim.held[k] ? "1" : "0")).join("");
      if (heldKey !== lastHeld) {
        if (lastHeld !== "000" && /1/.test(heldKey) && heldKey !== lastHeld) {
          audio.cue("take");
          try {
            navigator.vibrate?.(12);
          } catch {
            /* */
          }
        }
        lastHeld = heldKey;
        setHeld({ ...sim.held });
        setLastTaken(sim.lastTaken);
      }
      const gate = `${sim.entered ? 1 : 0}${sim.exited ? 1 : 0}${sim.burned ? 1 : 0}`;
      if (gate !== lastGate) {
        if (lastGate && gate > lastGate) {
          audio.cue("gap");
          try {
            navigator.vibrate?.(18);
          } catch {
            /* */
          }
        }
        lastGate = gate;
      }
      const taught =
        sim.everThrust && carried(sim.held).length > 0 && (sim.entered || sim.exited);
      const peri = Number.isFinite(sim.periapsis) ? sim.periapsis.toFixed(0) : "∞";
      const telemLine = taught
        ? `e ${sim.ecc.toFixed(2)} · ${sim.bound ? "bound" : "escaping"} · peri ${peri}`
        : "Hold · Take · Return";
      if (telemLine !== lastTelem) {
        lastTelem = telemLine;
        setTelem(telemLine);
      }
      if (sim.done && !lastEnding) {
        lastEnding = true;
        setEnding(true);
        audio.cue("reveal");
        sim.hint = "You returned.";
      }
      const { w, h } = view();
      drawWorld(ctx, sim, w, h);
      if (sim.done && sim.doneT > 5.2 && !finished.current) {
        finished.current = true;
        finishArcade(sim.weights, sim.records, carried(sim.held), sim.trail);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.visualViewport?.removeEventListener("resize", fit);
      canvas.removeEventListener("pointerdown", onPoint);
      canvas.removeEventListener("pointermove", onPoint);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      padEl?.removeEventListener("pointerdown", onPadDown);
      padEl?.removeEventListener("pointerup", onPadUp);
      padEl?.removeEventListener("pointercancel", onPadUp);
      padEl?.removeEventListener("lostpointercapture", onPadUp);
      canvas.parentElement?.removeEventListener("touchmove", noScroll);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      delete window.__controlsTest;
    };
  }, [finishArcade]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden overscroll-none bg-bg touch-none"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100dvh",
        zIndex: 50,
        touchAction: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        style={{ touchAction: "none" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center px-2 pt-[max(0.4rem,env(safe-area-inset-top))] sm:px-5">
        <button
          type="button"
          className="pointer-events-auto flex h-11 items-center gap-0.5 pr-2 text-gold/80 hover:text-gold"
          onClick={() => abandon()}
          aria-label="Back"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-[max(2.6rem,calc(env(safe-area-inset-top)+1.8rem))] z-10 px-4 text-center transition-opacity duration-700 sm:top-16 sm:px-6",
          hintOn && hint ? "opacity-100" : "opacity-0",
        )}
      >
        <p className="display text-sm text-gold/80 sm:text-xl">{hint}</p>
      </div>
      <div className="pointer-events-none absolute bottom-[max(1.1rem,calc(env(safe-area-inset-bottom)+0.5rem))] left-2 right-[4.6rem] z-10 flex justify-center gap-1 sm:left-1/2 sm:right-auto sm:bottom-8 sm:w-auto sm:-translate-x-1/2 sm:gap-2">
        {SIGNS.map((k) => (
          <img
            key={k}
            src={SIGN_ICONS[k]}
            alt={k}
            className={`h-6 w-6 sm:h-10 sm:w-10 transition-all ${
              held[k]
                ? lastTaken === k
                  ? "scale-110 opacity-100"
                  : "opacity-100"
                : "opacity-25"
            }`}
          />
        ))}
      </div>
      <button
        ref={holdRef}
        id="field-hold"
        type="button"
        className="absolute right-0 bottom-0 z-20 flex h-28 w-28 items-end justify-end p-4 text-gold touch-none sm:right-6 sm:bottom-8 sm:h-28 sm:w-28 sm:p-3"
        style={{ touchAction: "none" }}
        aria-label="Hold to burn"
      >
        <span className="grid h-[4.4rem] w-[4.4rem] place-items-center rounded-full border border-gold/50 bg-bg/55 sm:h-20 sm:w-20">
          <span className="display text-[0.62rem] tracking-[0.18em] uppercase sm:text-sm">Hold</span>
        </span>
      </button>
      <p className="pointer-events-none absolute inset-x-0 bottom-[max(0.15rem,env(safe-area-inset-bottom))] z-10 hidden px-4 text-center text-[0.6rem] tracking-[0.14em] text-muted sm:block sm:bottom-2">
        {telem}
      </p>
      {ending ? (
        <div className="pointer-events-none absolute inset-0 z-20 bg-bg/70" />
      ) : null}
    </div>
  );
}

function drawWorld(
  ctx: CanvasRenderingContext2D,
  sim: FlightSim,
  w: number,
  h: number,
) {
  const shake = sim.trauma * sim.trauma * 12;
  ctx.save();
  ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  ctx.fillStyle = "#050506";
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w / 2 - sim.cam.x, h / 2 - sim.cam.y);

  if (skyImg?.complete && skyImg.naturalWidth) {
    const fw = 2000;
    const fh = 1125;
    ctx.globalAlpha = 0.72;
    ctx.drawImage(skyImg, -fw / 2, -fh * 0.62, fw, fh);
    ctx.globalAlpha = 1;
  }

  const well = ctx.createLinearGradient(0, 280, 0, 900);
  well.addColorStop(0, "rgba(5,5,6,0)");
  well.addColorStop(1, "rgba(2,6,10,0.92)");
  ctx.fillStyle = well;
  ctx.fillRect(-900, 300, 1800, 800);

  drawRing(ctx, sim);
  drawPath(
    ctx,
    sim.predict,
    sim.held.thread ? "rgba(228,208,160,0.55)" : "rgba(228,208,160,0.28)",
    sim.held.thread ? 2.1 : 1.2,
  );
  drawPath(ctx, sim.ghost, "rgba(228,208,160,0.16)", 1.3);
  drawPath(ctx, sim.trail, "rgba(142,196,192,0.45)", 1.6);

  if (wellImg?.complete) {
    ctx.globalAlpha = 0.9;
    ctx.drawImage(wellImg, WELL.x - 88, WELL.y - 70, 176, 176);
    ctx.globalAlpha = 1;
  }

  const lg = ctx.createRadialGradient(0, 0, 4, 0, 0, 72);
  lg.addColorStop(0, "rgba(228,208,160,0.22)");
  lg.addColorStop(0.45, "rgba(228,208,160,0.06)");
  lg.addColorStop(1, "rgba(228,208,160,0)");
  ctx.fillStyle = lg;
  ctx.beginPath();
  ctx.arc(0, 0, 72, 0, Math.PI * 2);
  ctx.fill();
  if (lampImg?.complete && lampImg.naturalWidth) {
    ctx.drawImage(lampImg, -18, -22, 36, 44);
  }

  let nearest: (typeof sim.motes)[number] | null = null;
  let nearestD = Infinity;
  for (const mote of sim.motes) {
    const d = Math.hypot(mote.x - sim.moth.x, mote.y - sim.moth.y);
    if (d < nearestD) {
      nearestD = d;
      nearest = mote;
    }
  }
  for (const mote of sim.motes) {
    const icon = signImgs[mote.kind];
    const near = mote === nearest;
    const pulse = near
      ? 1.12 + 0.2 * Math.abs(Math.sin(sim.t * 3.4))
      : 1 + 0.04 * Math.sin(sim.t * 2.2 + mote.x * 0.01);
    const r = (near ? 38 : 24) * pulse;
    const g = ctx.createRadialGradient(mote.x, mote.y, 0, mote.x, mote.y, r);
    g.addColorStop(0, near ? "rgba(228,208,160,0.55)" : "rgba(228,208,160,0.22)");
    g.addColorStop(1, "rgba(228,208,160,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(mote.x, mote.y, r, 0, Math.PI * 2);
    ctx.fill();
    if (near) {
      ctx.beginPath();
      ctx.arc(
        mote.x,
        mote.y,
        22 + 10 * Math.abs(Math.sin(sim.t * 3.4)),
        0,
        Math.PI * 2,
      );
      ctx.strokeStyle = "rgba(228,208,160,0.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    if (icon?.complete) {
      const s = (near ? 44 : 34) * (near ? pulse : 1);
      ctx.drawImage(icon, mote.x - s / 2, mote.y - s / 2, s, s);
    }
  }

  for (const s of sim.sparks) {
    ctx.globalAlpha = Math.max(0, s.life);
    ctx.fillStyle = s.gold ? "#e4d0a0" : "#8eaaa4";
    ctx.fillRect(s.x, s.y, 2.2, 2.2);
  }
  ctx.globalAlpha = 1;

  const moth = mothFrames[Math.floor(sim.t * (sim.thrusting ? 16 : 7)) % 4];
  if (moth?.complete) {
    ctx.save();
    ctx.translate(sim.moth.x, sim.moth.y);
    ctx.rotate(sim.moth.angle);
    const size = 92 + sim.flapPulse * 10;
    ctx.drawImage(moth, -size * 0.55, -size / 2, size, size);
    ctx.restore();
  }

  ctx.restore();

  const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.75);
  vig.addColorStop(0, "rgba(5,5,6,0)");
  vig.addColorStop(1, "rgba(5,5,6,0.55)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

function drawPath(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[],
  color: string,
  width: number,
) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0]!.x, pts[0]!.y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i]!.x, pts[i]!.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function drawRing(ctx: CanvasRenderingContext2D, sim: FlightSim) {
  const { r, t } = RING;
  const gap = RING.gap + (sim.held.key ? 0.28 : 0);
  const a0 = sim.gapAngle + gap;
  const a1 = sim.gapAngle - gap + Math.PI * 2;
  const open = carried(sim.held).length > 0;
  const beat = open ? 0.45 + 0.55 * Math.abs(Math.sin(sim.t * 2.6)) : 0.12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(0, 0, r - t / 2, a0, a1);
  ctx.strokeStyle = "rgba(228,208,160,0.5)";
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, r - t / 2, sim.gapAngle - gap, sim.gapAngle + gap);
  ctx.strokeStyle = `rgba(228,208,160,${open ? 0.28 + beat * 0.5 : 0.06})`;
  ctx.lineWidth = open ? 8 + beat * 6 : 3;
  ctx.stroke();
  if (open) {
    ctx.beginPath();
    ctx.arc(0, 0, r - t / 2, a0, a0 + 0.16);
    ctx.strokeStyle = `rgba(228,208,160,${0.7 + beat * 0.3})`;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, r - t / 2, a1 - 0.16, a1);
    ctx.stroke();
  }
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setKeys?: (codes: string[]) => void;
    };
  }
}
