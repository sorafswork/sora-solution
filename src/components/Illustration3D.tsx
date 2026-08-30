import { motion, useReducedMotion } from "motion/react";

const FACES: { transform: string; label?: string }[] = [
  { transform: "rotateY(0deg) translateZ(70px)" },
  { transform: "rotateY(90deg) translateZ(70px)" },
  { transform: "rotateY(180deg) translateZ(70px)" },
  { transform: "rotateY(-90deg) translateZ(70px)" },
  { transform: "rotateX(90deg) translateZ(70px)" },
  { transform: "rotateX(-90deg) translateZ(70px)" },
];

/** Rotating wireframe cube built from CSS 3D faces. */
export function Cube3D({ size = 140 }: { size?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="scene grid place-items-center" style={{ width: size * 2, height: size * 2 }}>
      <motion.div
        className="relative"
        style={{ width: 140, height: 140, transformStyle: "preserve-3d" }}
        animate={reduce ? {} : { rotateX: [12, -12, 12], rotateY: [0, 360] }}
        transition={{
          rotateY: { duration: 18, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {FACES.map((f, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute inset-0 rounded-xl border border-accent/40"
            style={{
              transform: f.transform,
              background: "color-mix(in oklab, var(--accent) 7%, transparent)",
              backdropFilter: "blur(2px)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/** Concentric orbit rings with travelling nodes. */
export function Orbit3D({ size = 300 }: { size?: number }) {
  const reduce = useReducedMotion();
  const rings = [
    { s: 1, dur: 22, rx: 68, tone: 0.5 },
    { s: 0.72, dur: 16, rx: 58, tone: 0.35 },
    { s: 0.46, dur: 11, rx: 44, tone: 0.22 },
  ];
  return (
    <div className="scene relative grid place-items-center" style={{ width: size, height: size }}>
      <div
        aria-hidden
        className="absolute inset-[26%] rounded-full blur-3xl"
        style={{ background: "color-mix(in oklab, var(--accent) 30%, transparent)" }}
      />
      {rings.map((r, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-full border border-accent/35"
          style={{
            width: size * r.s,
            height: size * r.s,
            transform: `rotateX(${r.rx}deg)`,
            transformStyle: "preserve-3d",
          }}
          animate={reduce ? {} : { rotateZ: 360 }}
          transition={{ duration: r.dur, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
            style={{ boxShadow: "0 0 18px 2px color-mix(in oklab, var(--accent) 70%, transparent)" }}
          />
        </motion.div>
      ))}
      <motion.div
        aria-hidden
        className="relative h-14 w-14 rounded-full"
        style={{
          background: "linear-gradient(140deg, var(--accent), var(--accent-2))",
          boxShadow: "0 0 60px -6px color-mix(in oklab, var(--accent) 80%, transparent)",
        }}
        animate={reduce ? {} : { scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/** Stacked parallax glass panels — a "digital layers" illustration. */
export function Layers3D({ labels = ["DESIGN", "BUILD", "GROW"] }: { labels?: string[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="scene relative h-[260px] w-full max-w-[420px]">
      {labels.map((label, i) => (
        <motion.div
          key={label}
          className="glass absolute left-1/2 top-1/2 flex h-24 w-[86%] items-center justify-between rounded-2xl px-6"
          style={{
            transform: `translate(-50%, -50%) translateY(${(i - 1) * 62}px) rotateX(52deg) rotateZ(-28deg)`,
            transformStyle: "preserve-3d",
            zIndex: labels.length - i,
          }}
          animate={reduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          <span className="font-display text-xl font-extrabold tracking-tight">{label}</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
            0{i + 1}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
