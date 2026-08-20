export const SEO = {
  name: "Mythengine",
  title: "Mythengine",
  description:
    "Is life a game, or a myth we live from the inside? Fly a moth through a field with mass, or walk as Psyche. Forty-two mirrors. One question.",
  url: "https://mythengine.grok.me",
  locale: "en",
} as const;

export function pageTitle(room?: string) {
  return room ? `${room} · ${SEO.name}` : SEO.name;
}
