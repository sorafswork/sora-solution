import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PROCESS } from "@/lib/site-data";
import { SectionLabel, SplitLines } from "./Reveal";

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 90%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative section-y">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionLabel>Work process</SectionLabel>
        <h2 className="display-lg mt-6 max-w-3xl">
          <SplitLines lines={["FROM IDEA", "TO LAUNCH."]} />
        </h2>

        <div ref={ref} className="relative mt-10 pl-10 sm:pl-20">
...
          <ol className="space-y-10">
            {PROCESS.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <span
                  className="absolute -left-[38px] top-3 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[62px]"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-accent">{p.n}</span>
                  <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
