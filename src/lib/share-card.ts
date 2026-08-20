import type { Myth } from "./types";

export async function drawShareCard(myth: Myth): Promise<Blob> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No canvas");

  ctx.fillStyle = "#050506";
  ctx.fillRect(0, 0, width, height);

  const g = ctx.createRadialGradient(540, 520, 40, 540, 560, 520);
  g.addColorStop(0, "rgba(142,196,192,0.18)");
  g.addColorStop(1, "rgba(5,5,6,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#8EC4C0";
  ctx.lineWidth = 2;
  circle(ctx, 540, 430, 180);
  ctx.globalAlpha = 0.7;
  circle(ctx, 540, 430, 120);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "#E4D0A0";
  ctx.lineWidth = 2.4;
  circle(ctx, 540, 430, 62);
  ctx.fillStyle = "#E4D0A0";
  ctx.beginPath();
  ctx.arc(540, 430, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#E4D0A0";
  ctx.font = "500 28px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("THE MYTH YOU ARE LIVING", 540, 700);

  ctx.fillStyle = "#EDE6D6";
  ctx.font = "600 72px Georgia, serif";
  wrap(ctx, myth.name, 540, 790, 820, 78);

  ctx.fillStyle = "#8EC4C0";
  ctx.font = "500 28px Georgia, serif";
  ctx.fillText(myth.origin, 540, 900);

  ctx.fillStyle = "#9AA8A6";
  ctx.font = "400 28px Georgia, serif";
  wrap(ctx, myth.short, 540, 980, 780, 40, 4);

  ctx.fillStyle = "#E4D0A0";
  ctx.font = "500 22px Georgia, serif";
  ctx.fillText("Mythengine  ·  42", 540, 1288);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("blob"))), "image/png");
  });
}

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  max: number,
  lineH: number,
  maxLines = 6,
) {
  const words = text.split(" ");
  let line = "";
  let row = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > max) {
      ctx.fillText(line, x, y + row * lineH);
      line = word;
      row += 1;
      if (row >= maxLines) return;
    } else line = test;
  }
  if (line) ctx.fillText(line, x, y + row * lineH);
}

export async function downloadShareCard(myth: Myth) {
  const blob = await drawShareCard(myth);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mythengine-${myth.id}.png`;
  a.click();
  URL.revokeObjectURL(url);
  return blob;
}
