import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TECHNOLOGIES } from "@/lib/site-data";
import { useReducedMotion } from "@/lib/theme";
import { SectionLabel, SplitLines } from "./Reveal";

type Point = { x: number; y: number; z: number };

function fibonacciSphere(count: number): Point[] {
  const pts: Point[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    pts.push({ x: Math.cos(phi) * r, y, z: Math.sin(phi) * r });
  }
  return pts;
}

export function TechSphere() {
  const reduced = useReducedMotion();
  const [angle, setAngle] = useState(0);
  const [tilt, setTilt] = useState(0.35);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const raf = useRef(0);

  useEffect(() => {
    if (reduced) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setAngle((a) => a + dt * 0.28);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduced]);

  const points = fibonacciSphere(TECHNOLOGIES.length);
  const radius = 210;

  return (
    <section id="tech" className="relative overflow-hidden section-y">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionLabel>Tech universe</SectionLabel>
          <h2 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-7xl">
            <SplitLines lines={["Tools that", "orbit the craft."]} />
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            We pick technology for longevity, speed and maintainability — never for hype. Every
            build ships on a stack your team can grow with.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {TECHNOLOGIES.slice(0, 8).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative mx-auto aspect-square w-full max-w-[520px]"
          style={{ perspective: "1200px" }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setTilt(0.15 + ((e.clientY - r.top) / r.height) * 0.6);
          }}
        >
          <div className="absolute inset-[18%] rounded-full bg-accent/10 blur-3xl" aria-hidden />
          <div className="absolute inset-0" aria-hidden={reduced ? undefined : true}>
            {mounted && TECHNOLOGIES.map((tech, i) => {
              const p = points[i]!;
              const ca = Math.cos(angle);
              const sa = Math.sin(angle);
              const x = p.x * ca - p.z * sa;
              const z = p.x * sa + p.z * ca;
              const y = p.y * Math.cos(tilt) - z * Math.sin(tilt);
              const zz = p.y * Math.sin(tilt) + z * Math.cos(tilt);
              const scale = 0.62 + (zz + 1) * 0.28;
              return (
                <span
                  key={tech}
                  className="absolute left-1/2 top-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em]"
                  style={{
                    transform: `translate3d(calc(-50% + ${x * radius}px), calc(-50% + ${
                      y * radius
                    }px), 0) scale(${scale})`,
                    opacity: 0.25 + (zz + 1) * 0.37,
                    color: zz > 0.35 ? "var(--accent)" : "var(--foreground)",
                  }}
                >
                  {tech}
                </span>
              );
            })}
          </div>
          <motion.div
            className="pointer-events-none absolute inset-[26%] rounded-full border border-accent/30"
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
