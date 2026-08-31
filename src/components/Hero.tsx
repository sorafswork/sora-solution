import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { ArrowDown, ArrowRight, BarChart3, Sparkles } from "lucide-react";
import { SplitLines } from "./Reveal";

function Panel({
  depth,
  className,
  children,
  mx,
  my,
}: {
  depth: number;
  className?: string;
  children: React.ReactNode;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 60);
      my.set((e.clientY / window.innerHeight - 0.5) * 60);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section id="top" className="grain relative flex min-h-[88svh] items-center overflow-hidden pt-24 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--accent) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--accent) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "radial-gradient(circle at 50% 40%, black, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full blur-[130px]"
        style={{ background: "color-mix(in oklab, var(--accent) 22%, transparent)" }}
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] gap-10 px-5 pb-10 sm:px-8 xl:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to SoRa Innovative Solution
          </motion.p>

          <h1 className="display-xl mt-7">
            <SplitLines
              lines={["BUILDING DIGITAL", "EXPERIENCES THAT"]}
              delay={0.25}
            />
            <span className="block overflow-hidden">
              <motion.span
                className="accent-text block"
                initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                INSPIRE GROWTH.
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="mt-9 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9 }}
          >
            <p className="text-lg font-medium">Your Vision. Our Innovation.</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Premium websites, branding, graphic design, content and digital marketing strategies
              that turn ambitious ideas into measurable growth.
            </p>
          </motion.div>

          <motion.div
            className="mt-11 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
          >
            <a
              href="#contact"
              data-cursor="link"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#works"
              data-cursor="link"
              className="group inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-accent hover:text-accent"
            >
              View our work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden />
            </a>
          </motion.div>
        </div>

        {/* 3D-ish floating environment */}
        <motion.div
          className="relative hidden h-[560px] lg:block"
          style={{ perspective: 1400 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          <Panel mx={mx} my={my} depth={0.6} className="absolute left-4 top-10 w-[380px]">
            <div
              className="glass overflow-hidden rounded-xl accent-glow"
              style={{ transform: "rotateY(-16deg) rotateX(6deg)" }}
            >
              <div className="flex items-center gap-1.5 border-b border-border/60 px-3 py-2.5">
                <span className="h-2 w-2 rounded-full bg-accent/80" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                <span className="ml-3 font-mono text-[9px] tracking-widest text-muted-foreground">
                  sorainnovativesolution.in
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div className="h-3 w-2/3 rounded bg-accent/60" />
                <div className="h-2 w-full rounded bg-foreground/12" />
                <div className="h-2 w-4/5 rounded bg-foreground/12" />
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-14 rounded-lg bg-foreground/6" />
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel mx={mx} my={my} depth={-1.1} className="absolute right-0 top-0 w-[230px]">
            <div className="glass rounded-xl p-4" style={{ transform: "rotateY(14deg)" }}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  Growth
                </span>
                <BarChart3 className="h-3.5 w-3.5 text-accent" aria-hidden />
              </div>
              <div className="mt-4 flex h-20 items-end gap-1.5">
                {[30, 48, 40, 66, 58, 88, 100].map((v, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-t bg-accent/70"
                    initial={{ height: 0 }}
                    animate={{ height: `${v}%` }}
                    transition={{ delay: 1 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
            </div>
          </Panel>

          <Panel mx={mx} my={my} depth={1.6} className="absolute bottom-16 right-10 w-[300px]">
            <div className="glass rounded-xl p-5" style={{ transform: "rotateY(-10deg) rotateX(-6deg)" }}>
              <p className="font-display text-3xl font-extrabold tracking-tight">Aa</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Brand system · Type · Grid
              </p>
              <div className="mt-4 flex gap-2">
                <span className="h-6 w-6 rounded-full bg-accent" />
                <span className="h-6 w-6 rounded-full bg-accent-2" />
                <span className="h-6 w-6 rounded-full bg-foreground/20" />
                <span className="h-6 w-6 rounded-full bg-foreground/10" />
              </div>
            </div>
          </Panel>

          <Panel mx={mx} my={my} depth={-2} className="absolute bottom-6 left-0 w-[190px]">
            <div className="glass flex items-center gap-3 rounded-full px-4 py-3">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">UI / UX · WebGL</span>
            </div>
          </Panel>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-accent to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
