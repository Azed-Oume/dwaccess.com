// dwaccess-com/src/app/projets/components/ProjectCard.tsx

"use client";

import React from "react";
import ImgThumb from "./ImgThumb";
import type { Project } from "@/content/projects";

export default function ProjectCard({
  project,
  projectIdx,
  onOpenImage,
}: {
  project: Project;
  projectIdx: number;
  onOpenImage: (projectIdx: number, imgIdx: number) => void;
}) {
  const p = project;

  const content = (
    <>
      <div>
        <h2 className="text-lg font-semibold text-white">{p.title}</h2>
        <p className="mt-2 text-sm text-white/70">{p.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/70">
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
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/25 transition"
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {p.images?.length ? (
        <div
          className={p.portrait ? "mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4" : `mt-6 grid gap-3 ${p.images.length === 1 ? "grid-cols-1" : ""} ${p.images.length === 2 ? "grid-cols-2" : ""} ${p.images.length === 3 ? "grid-cols-1 sm:grid-cols-3" : ""} ${p.images.length >= 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""} ${p.images.length >= 5 ? "lg:grid-cols-5" : ""}`}
        >
          {p.images.map((src, idx) => (
            <div key={`${src}-${idx}`} className="space-y-2">
              <ImgThumb src={src} alt={`${p.title} - visuel ${idx + 1}`} onClick={() => onOpenImage(projectIdx, idx)} portrait={p.portrait} />
              {p.option && p.option[idx] ? <p className="text-xs text-white/70 text-center">{p.option[idx]}</p> : null}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );

  if (!p.video) return <article className="badge-article">{content}</article>;

  // Avec vidéo : deux blocs séparés, chacun avec sa bordure — la carte sur 2/3 à gauche, la vidéo sur 1/3 à droite ;
  // sur mobile, le bloc vidéo passe au-dessus de la carte.
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <article className="badge-article min-w-0 lg:col-span-2">{content}</article>

      <aside className="badge-article order-first flex items-center justify-center lg:order-none">
        <figure id={p.video.id} className="w-full max-w-xs scroll-mt-28">
          <video
            controls
            playsInline
            preload="none"
            poster={p.video.poster}
            className="aspect-[9/16] w-full rounded-2xl border border-white/10 bg-black object-cover"
          >
            <source src={p.video.src} type="video/mp4" />
            Votre navigateur ne peut pas lire cette vidéo.{" "}
            <a href={p.video.src} className="underline">
              Télécharger la vidéo
            </a>
          </video>
          {p.video.caption ? (
            <figcaption className="mt-2 text-center text-xs text-white/70">{p.video.caption}</figcaption>
          ) : null}
        </figure>
      </aside>
    </div>
  );
}
