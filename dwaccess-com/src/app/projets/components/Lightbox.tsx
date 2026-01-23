// dwaccess-com/src/app/projets/components/Lightbox.tsx

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Lightbox.css";

type Props = {
  open: boolean;
  images: string[];
  index: number;
  title?: string;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function mid(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export default function Lightbox({ open, images, index, title, onClose, onChangeIndex }: Props) {
  const total = images.length;
  const src = open ? images[index] ?? null : null;

  const canPrev = open && index > 0;
  const canNext = open && index < total - 1;

  // DOM refs
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Transform refs (pas de re-render)
  const scaleRef = useRef(1);
  const txRef = useRef(0);
  const tyRef = useRef(0);

  // Drag refs
  const draggingRef = useRef(false);
  const lastMoveRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });

  // Inertia animation
  const inertiaRafRef = useRef<number | null>(null);

  // Pinch refs
  const pinchingRef = useRef(false);
  const pinchStartRef = useRef<{
    d: number;
    scale: number;
    center: { x: number; y: number };
  } | null>(null);

  // Controls auto-hide
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimerRef = useRef<number | null>(null);

  // UI state (pour re-render le curseur grab/grabbing proprement)
  const [isDragging, setIsDragging] = useState(false);

  // Bounds
  const boundsRef = useRef<{ maxX: number; maxY: number }>({ maxX: 0, maxY: 0 });

  const isZoomed = () => scaleRef.current > 1.01;

  const alt = useMemo(() => {
    if (!open) return "";
    if (!title) return `Visuel ${index + 1}`;
    return `${title} — visuel ${index + 1}`;
  }, [open, title, index]);

  const stopInertia = () => {
    if (inertiaRafRef.current) {
      cancelAnimationFrame(inertiaRafRef.current);
      inertiaRafRef.current = null;
    }
  };

  const setVars = (scale: number, tx: number, ty: number) => {
    scaleRef.current = scale;
    txRef.current = tx;
    tyRef.current = ty;

    const el = containerRef.current;
    if (!el) return;

    el.style.setProperty("--lb-scale", String(scale));
    el.style.setProperty("--lb-tx", `${tx}px`);
    el.style.setProperty("--lb-ty", `${ty}px`);
  };

  const recalcBounds = () => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // Approximation simple et stable : plus on zoom, plus on autorise de pan
    const extraX = (scaleRef.current - 1) * rect.width * 0.5;
    const extraY = (scaleRef.current - 1) * rect.height * 0.5;

    boundsRef.current = {
      maxX: Math.max(0, extraX),
      maxY: Math.max(0, extraY),
    };
  };

  const clampToBounds = (tx: number, ty: number) => {
    const { maxX, maxY } = boundsRef.current;
    return {
      x: clamp(tx, -maxX, maxX),
      y: clamp(ty, -maxY, maxY),
    };
  };

  const hardResetTransform = () => {
    stopInertia();
    pinchingRef.current = false;
    pinchStartRef.current = null;
    draggingRef.current = false;
    lastMoveRef.current = null;
    velocityRef.current = { vx: 0, vy: 0 };
    setIsDragging(false);

    setVars(1, 0, 0);
    recalcBounds();
  };

  const goPrev = () => {
    if (!canPrev) return;
    onChangeIndex(index - 1);
  };

  const goNext = () => {
    if (!canNext) return;
    onChangeIndex(index + 1);
  };

  const showControls = () => {
    setControlsVisible(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setControlsVisible(false), 2000);
  };

  // Init (open/index) : reset transform + show controls
  useEffect(() => {
    if (!open) return;
    hardResetTransform();
    showControls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  // Cleanup timer + inertie à la fermeture/démontage
  useEffect(() => {
    if (!open) return;
    return () => {
      stopInertia();
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
      setIsDragging(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Resize -> recalcul bounds + clamp
  useEffect(() => {
    if (!open) return;

    const onResize = () => {
      recalcBounds();
      const clamped = clampToBounds(txRef.current, tyRef.current);
      setVars(scaleRef.current, clamped.x, clamped.y);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Scroll lock + clavier
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, total]);

  // Preload next/prev
  useEffect(() => {
    if (!open) return;

    const preload = (s?: string) => {
      if (!s) return;
      const img = new Image();
      img.src = s;
    };

    preload(images[index - 1]);
    preload(images[index + 1]);
  }, [open, index, images]);

  // Inertie
  const startInertia = () => {
    stopInertia();

    // Si pas de vitesse, inutile de lancer
    const { vx, vy } = velocityRef.current;
    if (Math.hypot(vx, vy) < 0.02) return;

    const friction = 0.92; // plus proche de 1 = plus long
    const minSpeed = 0.06;

    const step = () => {
      const cur = velocityRef.current;

      const nextVx = cur.vx * friction;
      const nextVy = cur.vy * friction;

      let tx = txRef.current + nextVx * 16; // ~16ms
      let ty = tyRef.current + nextVy * 16;

      const clamped = clampToBounds(tx, ty);
      tx = clamped.x;
      ty = clamped.y;

      setVars(scaleRef.current, tx, ty);
      velocityRef.current = { vx: nextVx, vy: nextVy };

      const speed = Math.hypot(nextVx, nextVy);
      if (speed < minSpeed) {
        inertiaRafRef.current = null;
        return;
      }

      inertiaRafRef.current = requestAnimationFrame(step);
    };

    inertiaRafRef.current = requestAnimationFrame(step);
  };

  // Molette zoom (desktop)
  const onWheel = (e: React.WheelEvent) => {
    if (!open) return;
    e.preventDefault();
    showControls();

    stopInertia();

    const delta = -e.deltaY;
    const nextScale = clamp(scaleRef.current + delta * 0.0016, 1, 3);

    const el = containerRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const cx = e.clientX - (r.left + r.width / 2);
    const cy = e.clientY - (r.top + r.height / 2);

    const prevScale = scaleRef.current;
    const scaleRatio = nextScale / prevScale;

    let tx = txRef.current - cx * (scaleRatio - 1);
    let ty = tyRef.current - cy * (scaleRatio - 1);

    setVars(nextScale, tx, ty);
    recalcBounds();

    const clamped = clampToBounds(txRef.current, tyRef.current);
    setVars(scaleRef.current, clamped.x, clamped.y);

    // Si on revient à 1, on remet proprement
    if (nextScale === 1) {
      setVars(1, 0, 0);
      recalcBounds();
    }
  };

  // Double click zoom
  const onDoubleClick = () => {
    if (!open) return;
    showControls();

    stopInertia();

    if (isZoomed()) {
      setVars(1, 0, 0);
      recalcBounds();
      return;
    }

    setVars(2, 0, 0);
    recalcBounds();
  };

  // Mouse drag (desktop)
  const onMouseDown = (e: React.MouseEvent) => {
    showControls();
    if (!isZoomed()) return;

    stopInertia();
    draggingRef.current = true;
    setIsDragging(true);

    lastMoveRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    velocityRef.current = { vx: 0, vy: 0 };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return;

    const prev = lastMoveRef.current;
    const nowT = performance.now();
    if (!prev) {
      lastMoveRef.current = { x: e.clientX, y: e.clientY, t: nowT };
      return;
    }

    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    const dt = Math.max(1, nowT - prev.t);

    velocityRef.current = { vx: dx / dt, vy: dy / dt };

    const clamped = clampToBounds(txRef.current + dx, tyRef.current + dy);
    setVars(scaleRef.current, clamped.x, clamped.y);

    lastMoveRef.current = { x: e.clientX, y: e.clientY, t: nowT };
  };

  const endMouseDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);

    if (!isZoomed()) return;
    startInertia();
  };

  // Touch (mobile) : pinch + pan (si zoom)
  const onTouchStart = (e: React.TouchEvent) => {
    showControls();
    stopInertia();

    if (e.touches.length === 2) {
      pinchingRef.current = true;

      const a = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      const b = { x: e.touches[1].clientX, y: e.touches[1].clientY };

      pinchStartRef.current = {
        d: dist(a, b),
        scale: scaleRef.current,
        center: mid(a, b),
      };

      // pendant un pinch, on évite de “réutiliser” une ancienne vitesse
      velocityRef.current = { vx: 0, vy: 0 };
      return;
    }

    // 1 doigt
    pinchingRef.current = false;
    pinchStartRef.current = null;

    lastMoveRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: performance.now() };
    velocityRef.current = { vx: 0, vy: 0 };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    showControls();

    // Pinch zoom
    if (e.touches.length === 2 && pinchStartRef.current) {
      e.preventDefault();

      const a = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      const b = { x: e.touches[1].clientX, y: e.touches[1].clientY };
      const start = pinchStartRef.current;

      const newD = dist(a, b);
      const nextScale = clamp(start.scale * (newD / start.d), 1, 3);

      const c = mid(a, b);

      // Ajuste pan : garder le centre stable
      const prevScale = scaleRef.current;
      const ratio = nextScale / prevScale;

      let tx = txRef.current;
      let ty = tyRef.current;

      tx = tx - (c.x - window.innerWidth / 2) * (ratio - 1);
      ty = ty - (c.y - window.innerHeight / 2) * (ratio - 1);

      setVars(nextScale, tx, ty);
      recalcBounds();

      const clamped = clampToBounds(txRef.current, tyRef.current);
      setVars(scaleRef.current, clamped.x, clamped.y);

      // update start pour continuité
      pinchStartRef.current = { ...start, d: newD, scale: nextScale, center: c };
      return;
    }

    // Pan 1 doigt si zoom
    if (!isZoomed()) return;

    const prev = lastMoveRef.current;
    const nowT = performance.now();
    if (!prev) {
      lastMoveRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: nowT };
      return;
    }

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const dx = x - prev.x;
    const dy = y - prev.y;
    const dt = Math.max(1, nowT - prev.t);

    velocityRef.current = { vx: dx / dt, vy: dy / dt };

    const clamped = clampToBounds(txRef.current + dx, tyRef.current + dy);
    setVars(scaleRef.current, clamped.x, clamped.y);

    lastMoveRef.current = { x, y, t: nowT };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    showControls();

    // fin pinch
    if (e.touches.length < 2) {
      pinchingRef.current = false;
      pinchStartRef.current = null;
      // évite inertie “fantôme” après pinch
      // (la vitesse sera recalculée au prochain pan)
      velocityRef.current = { vx: 0, vy: 0 };
    }

    if (isZoomed()) {
      startInertia();
    }
  };

  if (!open || !src) return null;

  const controlsClass = controlsVisible ? "lb-controls lb-controls--show" : "lb-controls";

  const closeCls =
    "lb-btn lb-btn--pill z-10 lb-btn--close bg-green-300 border border-white/15 text-white hover:bg-black/80";
  const navBtnBase =
    "lb-btn lb-btn--pill z-10 bg-green-300 border border-white/15 text-white hover:bg-green-500";

  return (
    <div
      className="lb-overlay"
      role="dialog"
      aria-modal="true"
      onMouseMove={showControls}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lb-shell">
        <div className={controlsClass}>
          {/* CLOSE */}
          <button onClick={onClose} className={closeCls} aria-label="Fermer">
            ✕
          </button>

          {/* PREV */}
          <button
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Précédent"
            className={["lb-nav lb-nav--left", navBtnBase, canPrev ? "" : "lb-disabled"].join(" ")}
          >
            <span className="lb-arrow">◀︎</span>
          </button>

          {/* NEXT */}
          <button
            onClick={goNext}
            disabled={!canNext}
            aria-label="Suivant"
            className={["lb-nav lb-nav--right", navBtnBase, canNext ? "" : "lb-disabled"].join(" ")}
          >
            <span className="lb-arrow">▶︎</span>
          </button>
        </div>

        {/* FRAME */}
        <div className="lb-frame" onWheel={onWheel}>
          <div
            ref={containerRef}
            className={[
              "lb-stage",
              isZoomed()
                ? isDragging
                  ? "lightbox-cursor-grabbing"
                  : "lightbox-cursor-grab"
                : "lightbox-cursor-zoom-in",
            ].join(" ")}
            onDoubleClick={onDoubleClick}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endMouseDrag}
            onMouseLeave={endMouseDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img src={src} alt={alt} className="lb-image" draggable={false} />
          </div>
        </div>

        {/* CAPTION */}
        <div className={controlsVisible ? "lb-caption lb-caption--show" : "lb-caption"}>
          <p className="lb-caption-title">
            {title} — visuel {index + 1}
          </p>
          <p className="lb-caption-hint">
            Molette/Pinch pour zoom • Double-clic pour zoom • Drag pour déplacer • ESC pour fermer
          </p>
        </div>

        {/* THUMBS */}
        <div className={controlsVisible ? "lb-thumbs lb-thumbs--show" : "lb-thumbs"}>
          <div className="lb-thumbs-inner">
            {images.map((thumb, i) => {
              const active = i === index;
              return (
                <button
                  key={`${thumb}-${i}`}
                  onClick={() => onChangeIndex(i)}
                  className={active ? "lb-thumb lb-thumb--active" : "lb-thumb"}
                  aria-label={`Aller au visuel ${i + 1}`}
                >
                  <img src={thumb} alt="" className="lb-thumb-img" draggable={false} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
