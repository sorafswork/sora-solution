import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/lib/site-data";
import { SectionLabel, SplitLines } from "./Reveal";
import { Tilt3D } from "./Tilt3D";

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] ${flip ? "lg:[direction:rtl]" : ""}`}
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="VIEW PROJECT →"
        className="group relative block [direction:ltr]"
        style={{ perspective: 1500 }}
        whileHover={{ scale: 1.01 }}
      >
        <Tilt3D
          max={7}
          lift={-8}
          className="overflow-hidden rounded-2xl border border-border/70 bg-card accent-glow"
        >
          <div className="flex items-center gap-1.5 border-b border-border/60 bg-card px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="mx-auto max-w-[60%] truncate rounded-full bg-foreground/5 px-4 py-1 font-mono text-[10px] text-muted-foreground">
              {project.url.replace(/^https?:\/\//, "")}
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} website preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-30" />
          </div>
        </Tilt3D>
      </motion.a>

      <div className="[direction:ltr]">
        <p className="font-mono text-[11px] tracking-[0.3em] text-accent">{project.n}</p>
        <h3 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {project.category}
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{project.description}</p>
        {project.services && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="group mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          View project
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
        </a>
      </div>
    </motion.article>
  );
}

export function Portfolio() {
  const [active, setActive] = useState("ALL");
  const list = active === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="works" className="relative section-y">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <SectionLabel>Our work</SectionLabel>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg">
            <SplitLines lines={["OUR WORK"]} />
          </h2>
          <p className="max-w-sm text-base text-muted-foreground">
            Real businesses. Real digital experiences.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              data-cursor="link"
              className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                active === c
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent/60 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 space-y-16">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProjectShowcase key={p.n} project={p} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
