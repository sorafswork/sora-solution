import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FAQS } from "@/lib/site-data";
import { Reveal, SectionLabel, SplitLines } from "./Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-6xl">
            <SplitLines lines={["Questions,", "answered."]} />
          </h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    data-cursor="link"
                  >
                    <span className="font-display text-lg font-semibold tracking-tight sm:text-2xl">
                      {f.q}
                    </span>
                    <span
                      className={`shrink-0 text-2xl leading-none transition-transform duration-500 ${
                        isOpen ? "rotate-45 accent-text" : "text-muted-foreground"
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
