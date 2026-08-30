import { motion } from "motion/react";
import { BADGES, EXTRA_SERVICES } from "@/lib/site-data";
import { SectionLabel, SplitLines } from "./Reveal";
import { Orbit3D } from "./Illustration3D";

export function WhySora() {
  return (
    <section className="relative overflow-hidden section-y">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionLabel>Why SoRa</SectionLabel>
            <h2 className="display-lg mt-6 max-w-3xl">
              <SplitLines lines={["BUILT ON QUALITY.", "BACKED BY CARE."]} />
            </h2>
          </div>
          <div className="hidden justify-center lg:flex">
            <Orbit3D size={320} />
          </div>
        </div>


        <div className="mt-10 flex flex-wrap gap-3" style={{ perspective: 900 }}>
          {BADGES.map((b, i) => (
            <motion.span
              key={b}
              initial={{ opacity: 0, y: 24, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="glass rounded-full px-6 py-3.5 text-sm font-medium"
              style={{ boxShadow: "0 18px 40px -30px color-mix(in oklab, var(--accent) 90%, transparent)" }}
            >
              {b}
            </motion.span>
          ))}
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {EXTRA_SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group bg-background p-8 transition-colors duration-500 hover:bg-card"
            >
              <h3 className="font-display text-xl font-bold tracking-tight group-hover:text-accent">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
