import { motion } from "motion/react";
import { WORLD_SERVICES } from "@/lib/site-data";
import { Reveal, SectionLabel, SplitLines } from "./Reveal";
import { Tilt3D } from "./Tilt3D";

export function ServicesWorld() {
  return (
    <section id="services" className="relative overflow-hidden py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionLabel>The digital world</SectionLabel>
        <h2 className="display-lg mt-6 max-w-4xl">
          <SplitLines lines={["EVERYTHING YOUR", "BRAND NEEDS."]} />
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WORLD_SERVICES.map((s, i) => (
            <motion.article
              key={s.n}
              data-cursor="EXPLORE"
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Tilt3D max={9} className="group h-full isolate overflow-hidden rounded-2xl border border-border/70 bg-card/50">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-45 transition-all duration-700 group-hover:scale-110 group-hover:opacity-70"
                  style={{ filter: "grayscale(1) contrast(1.1)" }}
                />
                <div
                  className="absolute inset-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-90"
                  style={{ background: "linear-gradient(140deg, var(--accent), transparent 70%)", opacity: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className="absolute left-5 top-4 font-mono text-[11px] tracking-[0.3em] text-accent">
                  {s.n}
                </span>
              </div>
              <div className="relative -mt-8 p-6">
                <h3 className="font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <span className="mt-6 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
              </Tilt3D>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-sm text-muted-foreground">
            Also delivering SEO, UI/UX design, social media and e-commerce development.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
