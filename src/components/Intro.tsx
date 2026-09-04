import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/theme";

export function Intro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0); // 0 video, 1 logo, 2 tagline, 3 exit
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      onDone();
      return;
    }
    const timers = [
      window.setTimeout(() => setStage(1), 2400),
      window.setTimeout(() => setStage(2), 3600),
      window.setTimeout(() => setStage(3), 9200),
      window.setTimeout(() => {
        setVisible(false);
        onDone();
      }, 10000),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reduced, onDone]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.play().catch(() => {});
  }, [reduced]);

  const skip = () => {
    setStage(3);
    setVisible(false);
    onDone();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.12, filter: "blur(14px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.video
            ref={videoRef}
            src="/brand/sora-intro.mp4"
            muted
            playsInline
            autoPlay
            preload="auto"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: stage >= 3 ? 0.25 : 0.85, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_92%)]" />
          <div className="absolute inset-0 bg-background/35" />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <motion.img
              src="/brand/sora-logo.png"
              alt="SoRa Innovative Solution"
              width={140}
              height={140}
              className="h-24 w-24 object-contain sm:h-32 sm:w-32"
              initial={{ opacity: 0, scale: 0.72 }}
              animate={stage >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: "drop-shadow(0 0 40px color-mix(in oklab, var(--accent) 45%, transparent))" }}
            />
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Innovate • Create • Deliver
            </motion.p>
            <motion.p
              className="max-w-md text-sm text-muted-foreground sm:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Web design, brand identity and digital marketing — engineered for growth.
            </motion.p>
          </div>

          <button
            onClick={skip}
            className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-accent"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
