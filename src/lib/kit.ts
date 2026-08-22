export const KIT = {
  palette: {
    bg: "#050506",
    gold: "#e4d0a0",
    teal: "#8EC4C0",
    stone: "#12181c",
  },
  field: "/art/field.jpg",
  mascot: {
    moth: [
      "/art/sprites/moth-1.png",
      "/art/sprites/moth-2.png",
      "/art/sprites/moth-3.png",
      "/art/sprites/moth-4.png",
    ],
    painterly: "/art/kit/mascot/painterly.png",
    seal: "/art/kit/mascot/seal.png",
  },
  icons: {
    aperture: "/art/kit/icons/aperture.png",
    lamp: "/art/kit/icons/lamp.png",
    seed: "/art/kit/icons/seed.png",
    key: "/art/kit/icons/key.png",
    thread: "/art/kit/icons/thread.png",
    cup: "/art/kit/icons/cup.png",
    stone: "/art/kit/icons/stone.png",
    mirror: "/art/kit/icons/mirror.png",
    box: "/art/kit/icons/box.png",
  },
  buttons: {
    normal: "/art/kit/buttons/normal.jpg",
    hover: "/art/kit/buttons/hover.jpg",
    pressed: "/art/kit/buttons/pressed.jpg",
  },
  panels: {
    dialog: "/art/kit/panels/dialog.jpg",
  },
  props: {
    lamp: "/art/kit/props/lamp.png",
    well: "/art/kit/props/well.png",
    threshold: "/art/kit/props/threshold.png",
    ring: "/art/kit/props/ring.png",
  },
} as const;

import type { SignKind } from "./signs";

export const SIGN_ICONS: Record<SignKind, string> = {
  seed: KIT.icons.seed,
  key: KIT.icons.key,
  thread: KIT.icons.thread,
  cup: KIT.icons.cup,
  stone: KIT.icons.stone,
  mirror: KIT.icons.mirror,
  box: KIT.icons.box,
};

export const HELPER_ICONS = {
  seed: KIT.icons.seed,
  key: KIT.icons.key,
  thread: KIT.icons.thread,
} as const;
