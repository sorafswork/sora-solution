import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [mode, setMode] = useState<"default" | "link" | "label">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("cursor-none-desktop");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (el) {
        const value = el.dataset["cursor"]!;
        if (value === "link") {
          setMode("link");
          setLabel(null);
        } else {
          setMode("label");
          setLabel(value);
        }
      } else {
        setMode("default");
        setLabel(null);
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none-desktop");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent transition-opacity"
        style={{ opacity: mode === "label" ? 0 : 1 }}
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-accent/70 font-mono uppercase tracking-[0.2em] text-accent transition-[width,height,background-color,font-size] duration-300 ease-out"
        style={{
          width: mode === "label" ? 116 : mode === "link" ? 52 : 30,
          height: mode === "label" ? 116 : mode === "link" ? 52 : 30,
          fontSize: 9,
          backgroundColor:
            mode === "default" ? "transparent" : "color-mix(in oklab, var(--accent) 14%, transparent)",
        }}
      >
        {mode === "label" ? label : null}
      </div>
    </div>
  );
}
