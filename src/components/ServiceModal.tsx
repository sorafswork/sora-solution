import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { WorldService } from "@/lib/site-data";

export function ServiceModal({
  service,
  onClose,
}: {
  service: WorldService | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          key="service-modal"
          role="dialog"
          aria-modal="true"
          aria-label={service.title}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            aria-label="Close service details"
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.94, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 32, scale: 0.96, rotateX: 4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border/70 bg-card shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative h-56 overflow-hidden sm:h-72">
              <video
                src={service.video}
                poster={service.image}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover motion-reduce:hidden"
                style={{ filter: "saturate(1.4) contrast(1.08)" }}
              />
              <img
                src={service.image}
                alt={`${service.title} illustration`}
                className="h-full w-full object-cover motion-reduce:block hidden"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              <span className="absolute left-6 top-5 font-mono text-xs tracking-[0.35em] text-accent">
                {service.n}
              </span>
              <h3 className="absolute bottom-4 left-6 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                {service.title}
              </h3>
            </div>

            <div className="p-6 sm:p-10">
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {service.detail}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.points.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-4"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6.5L4.8 9 10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm leading-snug">{point}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-foreground transition-transform hover:scale-105"
                >
                  Start a project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <button
                  onClick={onClose}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Back to services
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
