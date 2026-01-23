// dwaccess-com/src/app/projets/ProjectsListClient.tsx

"use client";

import React from "react";
import type { Project } from "@/content/projects";

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <img
        src={src}
        alt={alt}
        className="h-48 w-full object-cover sm:h-56"
        loading="lazy"
      />
    </div>
  );
}

function Carousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = React.useState(0);

  const canPrev = index > 0;
  const canNext = index < images.length - 1;

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function next() {
    setIndex((i) => Math.min(images.length - 1, i + 1));
  }

  // swipe mobile (simple)
  const startX = React.useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const x0 = startX.current;
    const x1 = e.changedTouches[0]?.clientX ?? null;
    startX.current = null;

    if (x0 == null || x1 == null) return;

    const dx = x1 - x0;
    if (Math.abs(dx) < 50) return;

    if (dx > 0) prev();
    else next();
  }

  return (
    <div className="mt-6">
      <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Img src={images[index]} alt={`${title} - visuel ${index + 1}`} />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
          <button
            type="button"
            onClick={prev}
            disabled={!canPrev}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur hover:bg-black/55 disabled:opacity-40"
            aria-label="Image précédente"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur hover:bg-black/55 disabled:opacity-40"
            aria-label="Image suivante"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full border ${
              i === index
                ? "border-white/60 bg-white/70"
                : "border-white/20 bg-white/10 hover:bg-white/20"
            }`}
            aria-label={`Aller à l'image ${i + 1}`}
          />
        ))}
      </div>

      <p className="mt-2 text-center text-xs text-white/50">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

export default function ProjectsListClient({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <article
          key={p.title}
          className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
        >
          {/* TEXTE EN HAUT */}
          <div>
            <h2 className="text-lg font-semibold text-white">{p.title}</h2>
            <p className="mt-2 text-sm text-white/70">{p.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/70"
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm text-white/70">
              <span className="font-medium text-white">Point clé :</span> {p.highlight}
            </p>

            {p.links?.length ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* IMAGES EN BAS */}
          {p.images?.length ? (
            p.images.length > 3 ? (
              <Carousel images={p.images} title={p.title} />
            ) : (
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {p.images.map((src, idx) => (
                  <Img key={src} src={src} alt={`${p.title} - visuel ${idx + 1}`} />
                ))}
              </div>
            )
          ) : null}
        </article>
      ))}
    </div>
  );
}
