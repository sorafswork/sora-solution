import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BarChart3, Megaphone, MousePointerClick, Search, Share2, TrendingUp } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { Tilt3D } from "./Tilt3D";

const WORDS = ["ATTENTION.", "TRUST.", "CONVERSIONS.", "GROWTH."];

const CHANNELS = [
  { icon: Share2, label: "Social Media" },
  { icon: Megaphone, label: "Content" },
  { icon: Search, label: "SEO" },
  { icon: MousePointerClick, label: "Google Ads" },
  { icon: BarChart3, label: "Analytics" },
  { icon: TrendingUp, label: "Conversion" },
];

export function Marketing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const [w, setW] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setW((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="grain relative overflow-hidden section-y">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionLabel>Digital marketing</SectionLabel>
        <Reveal delay={0.1}>
          <p className="mt-6 font-display text-xl font-bold tracking-tight sm:text-3xl">
            WE DON'T JUST BUILD WEBSITES.
          </p>
        </Reveal>

        <motion.div style={{ x }} className="mt-6 flex flex-wrap items-baseline gap-x-5">
          <span className="display-lg text-muted-foreground/40">WE BUILD</span>
          <span className="relative inline-block min-w-[7ch] align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[w]}
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="display-lg accent-text inline-block whitespace-nowrap"
                style={{ transformOrigin: "50% 100%" }}
              >
                {WORDS[w]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>


        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CHANNELS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
            >
              <Tilt3D max={10} className="glass flex h-full flex-col gap-4 rounded-2xl p-5">
              <c.icon className="h-5 w-5 text-accent" aria-hidden />
              <span className="text-sm font-medium">{c.label}</span>
              <div className="flex h-10 items-end gap-1">
                {[40, 60, 45, 80, 100].map((v, j) => (
                  <motion.span
                    key={j}
                    className="flex-1 rounded-sm bg-accent/45"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${v}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.08, duration: 0.7 }}
                  />
                ))}
              </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-12 max-w-4xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            WE DON'T JUST BUILD YOUR WEBSITE.{" "}
            <span className="accent-text">WE HELP BUILD YOUR BUSINESS.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
