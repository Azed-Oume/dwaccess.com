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
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Transform refs (pas de re-render)
  const scaleRef = useRef(1);
  const txRef = useRef(0);
  const tyRef = useRef(0);

  // Drag state refs
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
    tx: number;
    ty: number;
  } | null>(null);

  // Controls auto-hide
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimerRef = useRef<number | null>(null);

  // Bounds (simple + efficace)
  const boundsRef = useRef<{ maxX: number; maxY: number }>({ maxX: 0, maxY: 0 });

  const isZoomed = () => scaleRef.current > 1.01;

  const alt = useMemo(() => {
    if (!open) return "";
    if (!title) return `Visuel ${index + 1}`;
    return `${title} — visuel ${index + 1}`;
  }, [open, title, index]);

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
    // Approximation propre : quand on zoom, on autorise un déplacement proportionnel à (scale - 1)
    // -> évite de mesurer image/contain, reste fluide et stable.
    const extraX = (scaleRef.current - 1) * rect.width * 0.5;
    const extraY = (scaleRef.current - 1) * rect.height * 0.5;

    boundsRef.current = {
      maxX: Math.max(0, extraX),
      maxY: Math.max(0, extraY),
    };
  };

  const clampToBounds = (tx: number, ty: number) => {
    const { maxX, maxY } = boundsRef.current;
    const clampedX = clamp(tx, -maxX, maxX);
    const clampedY = clamp(ty, -maxY, maxY);
    return { x: clampedX, y: clampedY };
  };

  const stopInertia = () => {
    if (inertiaRafRef.current) {
      cancelAnimationFrame(inertiaRafRef.current);
      inertiaRafRef.current = null;
    }
  };

  const resetView = () => {
    stopInertia();
    pinchingRef.current = false;
    pinchStartRef.current = null;
    draggingRef.current = false;
    lastMoveRef.current = null;
    velocityRef.current = { vx: 0, vy: 0 };

    setVars(1, 0, 0);
    recalcBounds();
  };

  const goPrev = () => {
    if (!canPrev) return;
    resetView();
    onChangeIndex(index - 1);
  };

  const goNext = () => {
    if (!canNext) return;
    resetView();
    onChangeIndex(index + 1);
  };

  const showControls = () => {
    setControlsVisible(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setControlsVisible(false), 2000);
  };

  // Init quand open / index change
  useEffect(() => {
    if (!open) return;
    resetView();
    showControls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  // Resize -> recalcul bounds
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
      if (e.key === "0") resetView();
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

  // Molette zoom (desktop)
  const onWheel = (e: React.WheelEvent) => {
    if (!open) return;
    e.preventDefault();
    showControls();

    stopInertia();

    const delta = -e.deltaY;
    const next = clamp(scaleRef.current + delta * 0.0016, 1, 3);

    // zoom centré sur la souris (effet premium)
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = e.clientX - (r.left + r.width / 2);
    const cy = e.clientY - (r.top + r.height / 2);

    const prevScale = scaleRef.current;
    const scaleRatio = next / prevScale;

    // Ajuste le pan pour garder le point sous la souris plus stable
    let tx = txRef.current - cx * (scaleRatio - 1);
    let ty = tyRef.current - cy * (scaleRatio - 1);

    setVars(next, tx, ty);
    recalcBounds();

    const clamped = clampToBounds(txRef.current, tyRef.current);
    setVars(scaleRef.current, clamped.x, clamped.y);

    if (next === 1) resetView();
  };

  // Double click zoom
  const onDoubleClick = () => {
    if (!open) return;
    showControls();

    stopInertia();

    if (isZoomed()) {
      resetView();
      return;
    }

    setVars(2, 0, 0);
    recalcBounds();
  };

  // Inertie
  const startInertia = () => {
    stopInertia();

    const friction = 0.92; // plus proche de 1 = plus long
    const minSpeed = 0.06;

    const step = () => {
      const { vx, vy } = velocityRef.current;

      const nextVx = vx * friction;
      const nextVy = vy * friction;

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

  // Mouse drag (desktop)
  const onMouseDown = (e: React.MouseEvent) => {
    showControls();
    if (!isZoomed()) return;

    stopInertia();
    draggingRef.current = true;
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

    // vitesse px/ms
    velocityRef.current = { vx: dx / dt, vy: dy / dt };

    let tx = txRef.current + dx;
    let ty = tyRef.current + dy;

    const clamped = clampToBounds(tx, ty);
    setVars(scaleRef.current, clamped.x, clamped.y);

    lastMoveRef.current = { x: e.clientX, y: e.clientY, t: nowT };
  };

  const endMouseDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    // inertie uniquement si zoomé
    if (!isZoomed()) return;
    startInertia();
  };

  // Touch (mobile) : pinch + pan + swipe (si pas zoom)
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
        tx: txRef.current,
        ty: tyRef.current,
      };
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

    if (e.touches.length === 2 && pinchStartRef.current) {
      e.preventDefault(); // important mobile

      const a = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      const b = { x: e.touches[1].clientX, y: e.touches[1].clientY };
      const start = pinchStartRef.current;

      const newD = dist(a, b);
      const nextScale = clamp(start.scale * (newD / start.d), 1, 3);

      // centre pinch
      const c = mid(a, b);

      // Ajuste pan pour garder le centre stable (effet premium)
      const prevScale = scaleRef.current;
      const ratio = nextScale / prevScale;

      const dxCenter = c.x - start.center.x;
      const dyCenter = c.y - start.center.y;

      let tx = txRef.current + dxCenter;
      let ty = tyRef.current + dyCenter;

      // compensation zoom autour du centre
      tx = tx - (c.x - window.innerWidth / 2) * (ratio - 1);
      ty = ty - (c.y - window.innerHeight / 2) * (ratio - 1);

      setVars(nextScale, tx, ty);
      recalcBounds();

      const clamped = clampToBounds(txRef.current, tyRef.current);
      setVars(scaleRef.current, clamped.x, clamped.y);

      // update start center pour continuité
      pinchStartRef.current = { ...start, center: c, d: newD, scale: nextScale, tx: txRef.current, ty: tyRef.current };
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
    }

    // inertie si zoom
    if (isZoomed()) {
      startInertia();
      return;
    }

    // Swipe navigation si pas zoom
    // (petit swipe horizontal)
    if (!lastMoveRef.current) return;
    // rien de plus ici : ta navigation swipe est déjà gérée dans la lightbox via boutons,
    // on garde simple pour éviter effets secondaires.
  };

  if (!open || !src) return null;

  const controlsClass = controlsVisible ? "lb-controls lb-controls--show" : "lb-controls";

  const closeCls =
    "lb-btn lb-btn--pill z-10 lb-btn--close bg-green-300 border border-white/15 text-white hover:bg-black/80";
  const counterCls =
    "lb-pill z-10 bg-green-300 border border-white/15 text-white/80";
  const resetCls =
    "lb-btn lb-btn--pill z-10 bg-green-300 border border-white text-white/80 hover:bg-black/80";
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

          {/* COUNTER */}
          <div className={counterCls}>
            {index + 1} / {total}
          </div>

          {/* RESET */}
          <button onClick={resetView} className={resetCls} aria-label="Reset">
            Reset
          </button>

          {/* PREV */}
          <button
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Précédent"
            className={[
              "lb-nav lb-nav--left",
              navBtnBase,
              canPrev ? "" : "lb-disabled",
            ].join(" ")}
          >
            <span className="lb-arrow">◀︎</span>
          </button>

          {/* NEXT */}
          <button
            onClick={goNext}
            disabled={!canNext}
            aria-label="Suivant"
            className={[
              "lb-nav lb-nav--right",
              navBtnBase,
              canNext ? "" : "lb-disabled",
            ].join(" ")}
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
                ? draggingRef.current
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
            <img ref={imgRef} src={src} alt={alt} className="lb-image" draggable={false} />
          </div>
        </div>

        {/* CAPTION */}
        <div className={controlsVisible ? "lb-caption lb-caption--show" : "lb-caption"}>
          <p className="lb-caption-title">{title} — visuel {index + 1}</p>
          <p className="lb-caption-hint">Molette/Pinch pour zoom • Double-clic pour zoom • Drag pour déplacer • ESC pour fermer</p>
        </div>

        {/* THUMBS */}
        <div className={controlsVisible ? "lb-thumbs lb-thumbs--show" : "lb-thumbs"}>
          <div className="lb-thumbs-inner">
            {images.map((thumb, i) => {
              const active = i === index;
              return (
                <button
                  key={`${thumb}-${i}`}
                  onClick={() => {
                    resetView();
                    onChangeIndex(i);
                  }}
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
