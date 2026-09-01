import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 xl:px-12 transition-all duration-500 sm:px-8 ${
          scrolled ? "my-3 rounded-2xl py-3 glass" : "py-6"
        }`}
      >
        <a href="#top" data-cursor="link" className="flex items-center gap-3">
          <img src="/brand/sora-logo.png" alt="SoRa Innovative Solution logo" className="h-9 w-9 object-contain" />
          <span className="hidden text-sm font-semibold uppercase tracking-[0.18em] sm:block">
            SoRa
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="link"
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <ThemeSwitcher variant="inline" />
          </div>
          <a
            href="#contact"
            data-cursor="link"
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground transition-transform duration-300 hover:scale-[1.04] sm:inline-flex"
          >
            Start Project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="glass rounded-full p-2.5 lg:hidden"
          >
            <Menu className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[110] flex flex-col bg-background px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <img src="/brand/sora-logo.png" alt="" className="h-9 w-9 object-contain" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="glass rounded-full p-2.5">
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-5 flex flex-1 flex-col justify-center gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5 }}
                  className="display-lg block border-b border-border/60 py-3 text-foreground"
                  style={{ fontSize: "clamp(2rem, 11vw, 3.4rem)" }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center justify-between gap-3 pb-4">
              <ThemeSwitcher variant="inline" />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground"
              >
                Start Project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
