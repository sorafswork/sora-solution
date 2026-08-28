import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BarChart3, Megaphone, MousePointerClick, Search, Share2, TrendingUp } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

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
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="grain relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionLabel>Digital marketing</SectionLabel>
        <Reveal delay={0.1}>
          <p className="mt-8 font-display text-2xl font-bold tracking-tight sm:text-4xl">
            WE DON'T JUST BUILD WEBSITES.
          </p>
        </Reveal>

        <motion.div style={{ x }} className="mt-14 space-y-2">
          {WORDS.map((word, i) => (
            <motion.p
              key={word}
              initial={{ opacity: 0, x: -60, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl"
              style={{ opacity: 1 }}
            >
              <span className="text-muted-foreground/40">WE BUILD </span>
              <span className={i === WORDS.length - 1 ? "accent-text" : ""}>{word}</span>
            </motion.p>
          ))}
        </motion.div>

        <div className="mt-24 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CHANNELS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              whileHover={{ y: -8 }}
              className="glass flex flex-col gap-4 rounded-2xl p-5"
            >
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
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="display-lg mt-28 max-w-5xl">
            WE DON'T JUST BUILD YOUR WEBSITE.{" "}
            <span className="accent-text">WE HELP BUILD YOUR BUSINESS.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
