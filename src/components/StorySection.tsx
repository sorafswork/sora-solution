import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { JOURNEY } from "@/lib/site-data";
import { Reveal, SplitLines } from "./Reveal";

export function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.06, 1, 1.6]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.8, 0.35]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 sm:py-44">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="display-lg">
              <SplitLines lines={["EVERY GREAT", "BUSINESS", "STARTS SMALL."]} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lg text-muted-foreground">
                A small idea becomes a digital vision.
              </p>
            </Reveal>

            <ol className="mt-14 space-y-1">
              {JOURNEY.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-5 border-b border-border/50 py-4"
                >
                  <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                  <span className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
                    {step}
                  </span>
                  <span className="ml-auto h-px flex-1 max-w-[40%] bg-gradient-to-r from-accent/60 to-transparent" />
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="relative flex h-[420px] items-center justify-center lg:h-[620px]">
            <motion.div
              style={{ scale, rotate, opacity: glow }}
              className="h-56 w-56 rounded-[38%_62%_58%_42%/48%_38%_62%_52%] sm:h-72 sm:w-72"
            >
              <div
                className="h-full w-full rounded-[inherit]"
                style={{
                  background:
                    "conic-gradient(from 140deg, color-mix(in oklab, var(--accent) 90%, transparent), color-mix(in oklab, var(--accent-2) 70%, transparent), transparent 75%)",
                  filter: "blur(6px)",
                }}
              />
            </motion.div>
            <motion.div
              style={{ scale }}
              className="absolute h-40 w-40 rounded-full border border-accent/40 sm:h-56 sm:w-56"
            />
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="display-lg mt-20 max-w-4xl">
            WE TURN IDEAS INTO <span className="accent-text">DIGITAL EXPERIENCES.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
