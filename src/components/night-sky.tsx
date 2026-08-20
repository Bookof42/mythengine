import { useEffect, useRef } from "react";

type Speck = {
  x: number;
  y: number;
  z: number;
  r: number;
  gold: boolean;
  tw: number;
};

function seed(n: number, z: number, r: number): Speck[] {
  const out: Speck[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      x: Math.random(),
      y: Math.random(),
      z,
      r: r * (0.6 + Math.random() * 0.8),
      gold: Math.random() > 0.28,
      tw: Math.random() * Math.PI * 2,
    });
  }
  return out;
}

export function NightSky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const far = seed(22, 0.1, 0.7);
    const mid = seed(10, 0.32, 0.95);
    const near = seed(4, 0.62, 1.2);
    const all = [...far, ...mid, ...near];
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let t = 0;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const onScroll = () => {
      ty = Math.max(-0.45, Math.min(0.45, window.scrollY / 900 - 0.2));
    };

    const loop = () => {
      t += 0.016;
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const s of all) {
        const ox = px * 48 * s.z;
        const oy = py * 32 * s.z;
        const x = s.x * w + ox;
        const y = s.y * h + oy;
        const pulse = 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(t * 0.8 + s.tw));
        const a = (0.12 + s.z * 0.22) * pulse;
        ctx.beginPath();
        ctx.fillStyle = s.gold
          ? `rgba(228,208,160,${a})`
          : `rgba(142,196,192,${a * 0.7})`;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      aria-hidden
    />
  );
}
