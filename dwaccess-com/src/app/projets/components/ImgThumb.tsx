// dwaccess-com/src/app/projets/components/ImgThumb.tsx

"use client";

import React from "react";

export default function ImgThumb({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 text-left focus:outline-none focus:ring-2 focus:ring-violet-400/30"
      aria-label={`Agrandir l'image : ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-48 w-full rounded-xl object-cover sm:h-56 transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        loading="lazy"
      />
    </button>
  );
}
