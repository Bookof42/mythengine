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
import { type Weather } from "@/lib/cards";
import { SIGNS, carried, emptyHeld, type SignKind } from "@/lib/signs";
import { Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function load(src: string) {
  const img = new Image();
  img.src = src;
  return img;
}

const mothFrames = KIT.mascot.moth.map(load);
const skyImg = load(KIT.field);
const wellImg = load(KIT.props.well);
const signImgs = Object.fromEntries(
  SIGNS.map((k) => [k, load(SIGN_ICONS[k])]),
) as Record<SignKind, HTMLImageElement>;

export function FieldView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<FlightSim | null>(null);
  const inputRef = useRef<FlightInput>({
    aim: null,
    keys: { x: 0, y: 0 },
    thrust: false,
  });
  const finishArcade = useGame((s) => s.finishArcade);
  const abandon = useGame((s) => s.abandon);
  const muted = useGame((s) => s.save.muted);
  const setMuted = useGame((s) => s.setMuted);
  const finished = useRef(false);
  const [hint, setHint] = useState("Hold to burn.");
  const [telem, setTelem] = useState("Hold · Take · Return");
  const [held, setHeld] = useState(emptyHeld());
  const [lastTaken, setLastTaken] = useState<SignKind | null>(null);
  const [ending, setEnding] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    audio.unlock();
    audio.setSection("play");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sim = createFlight();
    simRef.current = sim;
    finished.current = false;
    const input = inputRef.current;
    const keys = new Set<string>();

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);

    const worldFromEvent = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      return {
        x: e.clientX - w / 2 + sim.cam.x,
        y: e.clientY - h / 2 + sim.cam.y,
      };
    };
    const syncKeys = () => {
      input.keys = {
        x:
          (keys.has("ArrowRight") || keys.has("KeyD") ? 1 : 0) -
          (keys.has("ArrowLeft") || keys.has("KeyA") ? 1 : 0),
        y:
          (keys.has("ArrowDown") || keys.has("KeyS") ? 1 : 0) -
          (keys.has("ArrowUp") || keys.has("KeyW") ? 1 : 0),
      };
      input.thrust =
        input.aim !== null ||
        keys.has("Space") ||
        keys.has("KeyW") ||
        input.keys.x !== 0 ||
        input.keys.y !== 0;
    };

    const onPoint = (e: PointerEvent) => {
      if (e.type === "pointermove" && e.buttons === 0) return;
      input.aim = worldFromEvent(e);
      input.thrust = true;
    };
    const onUp = () => {
      input.aim = null;
      syncKeys();
    };
    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (e.code === "Space") e.preventDefault();
      if (down) keys.add(e.code);
      else keys.delete(e.code);
      syncKeys();
    };
    window.addEventListener("pointerdown", onPoint);
    window.addEventListener("pointermove", onPoint);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

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
    let lastWeather = sim.weather?.cardId ?? "";
    let lastTelem = "";
    let lastHeld = "000";
    let lastGate = "";
    let lastEnding = false;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (input.aim) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // refresh aim against current camera while holding
      }
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
      const weatherKey = sim.weather?.cardId ?? "";
      if (weatherKey !== lastWeather) {
        lastWeather = weatherKey;
        setWeather(sim.weather);
      }
      const heldKey = SIGNS.map((k) => (sim.held[k] ? "1" : "0")).join("");
      if (heldKey !== lastHeld) {
        if (lastHeld !== "000" && /1/.test(heldKey) && heldKey !== lastHeld) {
          audio.cue("take");
        }
        lastHeld = heldKey;
        setHeld({ ...sim.held });
        setLastTaken(sim.lastTaken);
      }
      const gate = `${sim.entered ? 1 : 0}${sim.exited ? 1 : 0}${sim.burned ? 1 : 0}`;
      if (gate !== lastGate) {
        if (lastGate && gate > lastGate) audio.cue("gap");
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
      }
      drawWorld(ctx, sim, window.innerWidth, window.innerHeight);
      if (sim.done && sim.doneT > 2.8 && !finished.current) {
        finished.current = true;
        finishArcade(sim.weights, sim.records, carried(sim.held));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointerdown", onPoint);
      window.removeEventListener("pointermove", onPoint);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      delete window.__controlsTest;
    };
  }, [finishArcade]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-bg"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 50 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        style={{ touchAction: "none" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 pt-[max(0.6rem,env(safe-area-inset-top))] sm:px-5">
        <button
          type="button"
          className="pointer-events-auto grid h-11 w-11 place-items-center text-gold/80 hover:text-gold"
          onClick={() => abandon()}
          aria-label="Leave the field"
        >
          <X className="h-5 w-5" />
        </button>
        <img src={KIT.icons.aperture} alt="" className="h-8 w-8 opacity-80" />
        <button
          type="button"
          className="pointer-events-auto grid h-11 w-11 place-items-center text-gold/80 hover:text-gold"
          onClick={() => setMuted(!muted)}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-24 z-10 px-6 text-center">
        {weather ? (
          <>
            <p className="display text-2xl text-gold sm:text-4xl">{weather.name}</p>
            <p className="font-garamond mx-auto mt-3 max-w-2xl text-lg text-fg/90 sm:text-xl">
              {weather.line}
            </p>
          </>
        ) : (
          <p className="font-garamond text-xl text-gold sm:text-2xl">{hint}</p>
        )}
      </div>
      <div className="pointer-events-none absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full border border-gold/25 bg-bg/55 px-3 py-2 backdrop-blur-sm sm:gap-2">
        {SIGNS.map((k) => (
          <img
            key={k}
            src={SIGN_ICONS[k]}
            alt={k}
            className={`h-9 w-9 sm:h-11 sm:w-11 transition-all ${
              held[k]
                ? lastTaken === k
                  ? "scale-125 opacity-100 drop-shadow-[0_0_10px_rgba(228,208,160,0.85)]"
                  : "opacity-100"
                : "opacity-20"
            }`}
          />
        ))}
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-6 z-10 px-6 text-center text-sm tracking-[0.22em] text-muted uppercase sm:text-base">
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

  if (skyImg.complete && skyImg.naturalWidth) {
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
  drawPath(ctx, sim.trail, "rgba(142,196,192,0.45)", 1.6);

  if (wellImg.complete) {
    ctx.globalAlpha = 0.9;
    ctx.drawImage(wellImg, WELL.x - 88, WELL.y - 70, 176, 176);
    ctx.globalAlpha = 1;
  }

  const lg = ctx.createRadialGradient(0, 0, 8, 0, 0, 220);
  lg.addColorStop(0, "rgba(228,208,160,0.55)");
  lg.addColorStop(0.35, "rgba(228,208,160,0.12)");
  lg.addColorStop(1, "rgba(228,208,160,0)");
  ctx.fillStyle = lg;
  ctx.beginPath();
  ctx.arc(0, 0, 220, 0, Math.PI * 2);
  ctx.fill();

  for (const mote of sim.motes) {
    const icon = signImgs[mote.kind];
    const pulse = 1 + 0.14 * Math.sin(sim.t * 4.2 + mote.x * 0.01);
    const r = 42 * pulse;
    const g = ctx.createRadialGradient(mote.x, mote.y, 0, mote.x, mote.y, r * 1.6);
    g.addColorStop(0, "rgba(228,208,160,0.85)");
    g.addColorStop(0.45, "rgba(228,208,160,0.28)");
    g.addColorStop(1, "rgba(228,208,160,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(mote.x, mote.y, r * 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(228,208,160,0.7)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(mote.x, mote.y, r * 0.72, 0, Math.PI * 2);
    ctx.stroke();
    if (icon?.complete) {
      const s = 52 * pulse;
      ctx.drawImage(icon, mote.x - s / 2, mote.y - s / 2, s, s);
    }
  }

  for (const s of sim.sparks) {
    ctx.globalAlpha = Math.max(0, s.life);
    ctx.fillStyle = s.gold ? "#e4d0a0" : "#8ec4c0";
    ctx.fillRect(s.x, s.y, 2.2, 2.2);
  }
  ctx.globalAlpha = 1;

  const moth = mothFrames[Math.floor(sim.t * (sim.thrusting ? 16 : 7)) % 4];
  if (moth?.complete) {
    ctx.save();
    ctx.translate(sim.moth.x, sim.moth.y);
    ctx.rotate(sim.moth.angle);
    const size = 92 + sim.flapPulse * 10;
    const mg = ctx.createRadialGradient(0, 0, 6, 0, 0, size * 0.55);
    mg.addColorStop(0, "rgba(228,208,160,0.35)");
    mg.addColorStop(1, "rgba(228,208,160,0)");
    ctx.fillStyle = mg;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.55, 0, Math.PI * 2);
    ctx.fill();
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
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, r - t / 2 + i * (t / 2), a0, a1);
    ctx.strokeStyle =
      i === 1 ? "rgba(228,208,160,0.8)" : "rgba(142,196,192,0.28)";
    ctx.lineWidth = i === 1 ? 3.2 : 1.4;
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
