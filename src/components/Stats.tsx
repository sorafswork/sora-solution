import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site-data";
import { SectionLabel } from "./Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-border/60 section-y">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionLabel>By the numbers</SectionLabel>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
            >
              <p className="font-display text-6xl font-extrabold tracking-tighter accent-text sm:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
