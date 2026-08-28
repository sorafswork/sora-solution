import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAccentColor, useReducedMotion } from "@/lib/theme";

type Particle = { x: number; y: number; z: number; ox: number; oy: number };

export function Intro({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accent = useAccentColor();
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0); // 0 particles, 1 logo, 2 tagline, 3 exit
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      onDone();
      return;
    }
    const timers = [
      window.setTimeout(() => setStage(1), 1900),
      window.setTimeout(() => setStage(2), 2900),
      window.setTimeout(() => setStage(3), 4400),
      window.setTimeout(() => {
        setVisible(false);
        onDone();
      }, 5200),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reduced, onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 500 : 1100;
    const pts: Particle[] = Array.from({ length: count }, () => {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      return {
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
        ox: (Math.random() - 0.5) * 6,
        oy: (Math.random() - 0.5) * 6,
      };
    });

    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const gather = Math.min(1, Math.max(0, (t - 0.35) / 1.4));
      const ease = 1 - Math.pow(1 - gather, 3);
      const camera = 1 + Math.min(t / 4, 1) * 1.4;
      const radius = Math.min(w, h) * 0.24 * camera;
      ctx.clearRect(0, 0, w, h);
      const rot = t * 0.55;

      for (const p of pts) {
        const x = p.x * Math.cos(rot) - p.z * Math.sin(rot);
        const z = p.x * Math.sin(rot) + p.z * Math.cos(rot);
        const depth = 1 / (2.2 - z);
        const sx = w / 2 + (x * radius + p.ox * (1 - ease) * w * 0.4) * depth * 2;
        const sy = h / 2 + (p.y * radius + p.oy * (1 - ease) * h * 0.4) * depth * 2;
        const alpha = (0.15 + depth * 0.8) * (0.25 + ease * 0.75) * (stage >= 3 ? 0.25 : 1);
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.4, depth * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = accent.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [accent, reduced, stage]);

  const skip = () => {
    setStage(3);
    setVisible(false);
    onDone();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.12, filter: "blur(14px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="relative flex flex-col items-center gap-6 text-center">
            <motion.img
              src="/brand/sora-logo.png"
              alt="SoRa Innovative Solution"
              width={140}
              height={140}
              className="h-24 w-24 object-contain sm:h-32 sm:w-32"
              initial={{ opacity: 0, scale: 0.72 }}
              animate={stage >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: "drop-shadow(0 0 40px color-mix(in oklab, var(--accent) 45%, transparent))" }}
            />
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Innovate • Create • Deliver
            </motion.p>
          </div>
          <button
            onClick={skip}
            className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-accent"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
