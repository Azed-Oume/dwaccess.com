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

  return (
    <article className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:ring-1 hover:ring-violet-400/20">
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
          className={`mt-6 grid gap-3 ${p.images.length === 1 ? "grid-cols-1" : ""} ${p.images.length === 2 ? "grid-cols-2" : ""} ${p.images.length === 3 ? "grid-cols-1 sm:grid-cols-3" : ""} ${p.images.length >= 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : ""} ${p.images.length >= 5 ? "lg:grid-cols-5" : ""}`}
        >
          {p.images.map((src, idx) => (
            <div key={`${src}-${idx}`} className="space-y-2">
              <ImgThumb src={src} alt={`${p.title} - visuel ${idx + 1}`} onClick={() => onOpenImage(projectIdx, idx)} />
              {p.option && p.option[idx] ? <p className="text-xs text-white/70 text-center">{p.option[idx]}</p> : null}
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
