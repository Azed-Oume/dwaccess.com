// dwaccess-com/src/app/projets/ProjetsClient.tsx

"use client";

import React, { useMemo, useState } from "react";
import { projects } from "@/content/projects";
import ProjectCard from "./components/ProjectCard";
import Lightbox from "./components/Lightbox";

export default function ProjetsClient() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeProject = useMemo(() => projects[activeProjectIndex], [activeProjectIndex]);
  const images = activeProject?.images ?? [];
  const title = activeProject?.title ?? "Projet";

  const openLightbox = (projectIdx: number, imgIdx: number) => {
    setActiveProjectIndex(projectIdx);
    setActiveImageIndex(imgIdx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const changeIndex = (next: number) => {
    // sécurité
    if (!images.length) return;
    const safe = Math.max(0, Math.min(images.length - 1, next));
    setActiveImageIndex(safe);
  };

  return (
    <section className="section-home">
      <div className="mx-auto max-w-6xl">
        <div className="badge-bg">
          <span className="badge-dot-4" />
          Projets
        </div>
        <h1 className="badge-title">Projets</h1>
        <p className="badge-text">
          Des projets concrets, conçus pour résoudre de vrais besoins : SaaS, outils internes, plateformes métiers et applications web. <br />
          Architecture solide, interfaces modernes, performances optimisées et mises en production réelles.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {["Rigueur", "Simplicité", "Efficacité"].map((x) => (
              <span key={x} className="rounded-full bg-white/80 border border-white/20 px-4 py-2 text-sm font-medium text-black">
                {x}
              </span>
            ))}
        </div>

        <section className="mt-12 space-y-8">
          {projects.map((p, projectIdx) => (
            <ProjectCard key={p.title} project={p} projectIdx={projectIdx} onOpenImage={openLightbox} />
          ))}
        </section>
      </div>

      <Lightbox
        open={lightboxOpen}
        images={images}
        index={activeImageIndex}
        title={title}
        onClose={closeLightbox}
        onChangeIndex={changeIndex}
      />
    </section>
  );
}
