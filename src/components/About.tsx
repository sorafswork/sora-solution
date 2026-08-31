import { motion } from "motion/react";
import { Compass, Eye, Gem } from "lucide-react";
import { Reveal, SectionLabel, SplitLines } from "./Reveal";
import { Tilt3D } from "./Tilt3D";
import { Cube3D } from "./Illustration3D";


const PILLARS = [
  {
    icon: Compass,
    title: "MISSION",
    copy: "Empower every business with premium digital experiences that spark growth.",
  },
  {
    icon: Eye,
    title: "VISION",
    copy: "Become a globally trusted studio known for craft, care, and consistency.",
  },
  {
    icon: Gem,
    title: "VALUES",
    copy: "Integrity, creativity, transparency, and obsessive attention to detail.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 hidden opacity-70 lg:block"
      >
        <Cube3D size={110} />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 xl:px-12">
        <SectionLabel>Who we are</SectionLabel>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="display-lg">
            <SplitLines lines={["MORE THAN A", "DIGITAL AGENCY."]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              SoRa Innovative Solution blends technology, creativity, and strategy to help brands
              build a striking online identity and grow with confidence.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3" style={{ perspective: 1200 }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt3D max={8} className="glass overflow-hidden rounded-3xl p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
                style={{ background: "color-mix(in oklab, var(--accent) 45%, transparent)" }}
              />
              <p.icon className="h-7 w-7 text-accent" aria-hidden />
              <h3 className="mt-8 font-display text-3xl font-extrabold tracking-tight">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
