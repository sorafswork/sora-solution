import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/site-data";
import { SectionLabel } from "./Reveal";

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[i]!;

  return (
    <section id="testimonials" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <SectionLabel>Client voices</SectionLabel>

        <div className="relative mt-14 min-h-[300px] sm:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">
                <span className="accent-text">“</span>
                {t.quote}
                <span className="accent-text">”</span>
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 font-display text-sm font-bold accent-text"
                  aria-hidden
                >
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t.role}
                  </span>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-3">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show testimonial from ${item.name}`}
              aria-current={idx === i}
              className={`h-1 w-14 rounded-full transition-colors ${
                idx === i ? "bg-accent" : "bg-border hover:bg-accent/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
