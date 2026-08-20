export type SharePayload = {
  art: string;
  kicker: string;
  question: string;
  name?: string;
};

type Kind = "x" | "card";

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else line = next;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("plate art"));
    img.src = src;
  });
}

export async function composeSharePlate(payload: SharePayload, kind: Kind = "x") {
  const w = kind === "card" ? 1080 : 1200;
  const h = kind === "card" ? 1350 : 630;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("plate");

  ctx.fillStyle = "#050506";
  ctx.fillRect(0, 0, w, h);

  try {
    const img = await loadImage(payload.art);
    const scale = Math.max(w / img.width, h / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  } catch {
    /* night only */
  }

  const floor = ctx.createLinearGradient(0, h * (kind === "card" ? 0.38 : 0.28), 0, h);
  floor.addColorStop(0, "rgba(5,5,6,0)");
  floor.addColorStop(0.4, "rgba(5,5,6,0.55)");
  floor.addColorStop(1, "rgba(5,5,6,0.94)");
  ctx.fillStyle = floor;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#e4d0a0";
  ctx.font = "500 18px 'DM Sans', sans-serif";
  ctx.fillText("MYTHENGINE  ·  42", 64, 72);

  ctx.fillStyle = "#8ec4c0";
  ctx.font = "500 16px 'DM Sans', sans-serif";
  ctx.fillText("THE WEATHER", 64, kind === "card" ? h - 420 : 390);

  ctx.fillStyle = "#e4d0a0";
  ctx.font = "300 36px Fraunces, Georgia, serif";
  ctx.fillText(payload.kicker, 64, kind === "card" ? h - 360 : 430);

  ctx.fillStyle = "#ede6d6";
  ctx.font = kind === "card" ? "300 48px Fraunces, Georgia, serif" : "300 40px Fraunces, Georgia, serif";
  const lines = wrapLines(ctx, payload.question, w - 128, kind === "card" ? 5 : 3);
  const startY = kind === "card" ? h - 290 : 490;
  lines.forEach((line, i) => {
    ctx.fillText(line, 64, startY + i * (kind === "card" ? 58 : 50));
  });

  ctx.fillStyle = "#e4d0a0";
  ctx.font = "500 16px 'DM Sans', sans-serif";
  ctx.fillText("DON’T PANIC", 64, h - 48);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("blob"))),
      "image/jpeg",
      0.92,
    );
  });
  return blob;
}

export function carryHref(mythId: string, question: string) {
  const origin = window.location.origin;
  const q = new URLSearchParams({ m: mythId, q: question });
  return `${origin}/carry?${q.toString()}`;
}

export function tweetHref(question: string, url: string) {
  const intent = new URL("https://twitter.com/intent/tweet");
  intent.searchParams.set("text", `${question}\n\nmythengine · 42`);
  intent.searchParams.set("url", url);
  return intent.toString();
}

function downloadBlob(blob: Blob, name: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

export async function shareOnX(payload: SharePayload & { mythId: string }) {
  const blob = await composeSharePlate(payload, "x");
  downloadBlob(blob, "mythengine-x.jpg");
  const url = carryHref(payload.mythId, payload.question);
  window.open(tweetHref(payload.question, url), "_blank", "noopener,noreferrer");
}

export async function saveCard(payload: SharePayload) {
  const blob = await composeSharePlate(payload, "card");
  downloadBlob(blob, "mythengine-card.jpg");
}
