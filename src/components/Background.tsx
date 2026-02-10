// src/components/Background.tsx
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(900px_500px_at_85%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_500px_at_60%_85%,rgba(34,211,238,0.12),transparent_55%)]" />

      {/* Noise (subtil) */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
    </div>
  );
}

