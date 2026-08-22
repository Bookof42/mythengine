import { useState, type ReactNode } from "react";

export function QuietClip({
  id,
  start,
  title,
  href,
  caption,
  poster,
}: {
  id: string;
  start?: number;
  title: string;
  href: string;
  caption: ReactNode;
  poster?: string;
}) {
  const [on, setOn] = useState(false);
  const qs = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (start) qs.set("start", String(start));

  return (
    <figure className="mt-6 w-full">
      <div className="relative aspect-video w-full overflow-hidden bg-bg">
        {on ? (
          <iframe
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${id}?${qs.toString()}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setOn(true)}
            className="absolute inset-0 grid place-items-center"
            aria-label={`Play ${title}`}
          >
            <img
              src={poster ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
            />
            <span className="absolute inset-0 bg-bg/25" />
            <span className="display relative text-xl tracking-[0.2em] text-gold sm:text-2xl">
              Play
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-center text-base text-muted">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-teal hover:text-gold"
        >
          {caption}
        </a>
      </figcaption>
    </figure>
  );
}
