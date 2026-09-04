import { motion } from "motion/react";
import { useState } from "react";
import { WORLD_SERVICES, type WorldService } from "@/lib/site-data";
import { Reveal, SectionLabel, SplitLines } from "./Reveal";
import { ServiceModal } from "./ServiceModal";
import { Tilt3D } from "./Tilt3D";

export function ServicesWorld() {
  const [active, setActive] = useState<WorldService | null>(null);

  return (
    <section id="services" className="relative overflow-hidden section-y">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <SectionLabel>The digital world</SectionLabel>
        <h2 className="display-lg mt-6 max-w-4xl">
          <SplitLines lines={["EVERYTHING YOUR", "BRAND NEEDS."]} />
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WORLD_SERVICES.map((s, i) => (
            <motion.article
              key={s.n}
              data-cursor="OPEN"
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Tilt3D max={9} className="group h-full isolate overflow-hidden rounded-2xl border border-border/70 bg-card/50">
              <button
                type="button"
                onClick={() => setActive(s)}
                aria-haspopup="dialog"
                aria-label={`View ${s.title} details`}
                className="block h-full w-full text-left"
              >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.title} service preview`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                  style={{ filter: "saturate(1.35) contrast(1.08)" }}
                />
                <video
                  src={s.video}
                  poster={s.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-95 motion-reduce:hidden"
                  style={{ filter: "saturate(1.35) contrast(1.08)" }}
                />
                <div
                  className="absolute inset-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-70"
                  style={{ background: "linear-gradient(140deg, var(--accent), transparent 70%)", opacity: 0.35 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className="absolute left-5 top-4 font-mono text-[11px] tracking-[0.3em] text-accent">
                  {s.n}
                </span>
                <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/60 opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="relative -mt-5 p-6">
                <h3 className="font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  View details
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-4 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
              </button>
              </Tilt3D>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-5 text-sm text-muted-foreground">
            Also delivering SEO, UI/UX design, social media and e-commerce development.
          </p>
        </Reveal>
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}
