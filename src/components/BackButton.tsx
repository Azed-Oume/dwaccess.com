// src/components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const opacity = hovered ? 1 : scrolled ? 0.45 : 0.85;

  return (
    <button
      onClick={() => router.back()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Retour à la page précédente"
      style={{
        position: "fixed",
        bottom: "28px",
        left: "24px",
        zIndex: 50,
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        borderRadius: "999px",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        opacity,
        transition: "opacity 0.25s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
        color: hovered ? "var(--gold)" : "var(--fg)",
        border: `1px solid ${hovered ? "var(--gold)" : "var(--border)"}`,
        background: "rgba(13, 31, 51, 0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: hovered ? "0 0 0 1px var(--gold-line), 0 4px 16px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      Retour
    </button>
  );
}
