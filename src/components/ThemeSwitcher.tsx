import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { THEMES, useTheme } from "@/lib/theme";

export function ThemeSwitcher({ variant = "floating" }: { variant?: "floating" | "inline" }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={wrap} className={variant === "floating" ? "fixed bottom-6 right-6 z-[90]" : "relative"}>
      <button
        type="button"
        data-cursor="link"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Change color theme"
        onClick={() => setOpen((v) => !v)}
        className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-all duration-300 hover:accent-glow"
      >
        <Palette className="h-3.5 w-3.5 text-accent" aria-hidden />
        Theme
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Color experience"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`glass absolute z-50 w-72 rounded-2xl p-3 ${
              variant === "floating" ? "bottom-14 right-0" : "right-0 top-12"
            }`}
          >
            <p className="eyebrow px-2 pb-2 pt-1">Color Experience</p>
            <ul className="space-y-1">
              {THEMES.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setTheme(t.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                      theme === t.id ? "bg-accent/12" : "hover:bg-foreground/5"
                    }`}
                  >
                    <span className="flex -space-x-1.5">
                      {t.swatch.map((c) => (
                        <span
                          key={c}
                          className="h-5 w-5 rounded-full border border-white/20"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{t.name}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">{t.feeling}</span>
                    </span>
                    {theme === t.id && <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
