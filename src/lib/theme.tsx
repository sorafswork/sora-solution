import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "obsidian" | "royal" | "burgundy" | "emerald" | "copper" | "mono";

export type ThemeDef = {
  id: ThemeId;
  name: string;
  feeling: string;
  swatch: [string, string, string];
};

export const THEMES: ThemeDef[] = [
  { id: "obsidian", name: "Obsidian Gold", feeling: "Luxury · Executive", swatch: ["#0A0A0A", "#F4B400", "#FFD66B"] },
  { id: "royal", name: "Royal Purple + Gold", feeling: "Creative · Futuristic", swatch: ["#08050F", "#7C3AED", "#F4B400"] },
  { id: "burgundy", name: "Burgundy + Champagne", feeling: "Fashion · Elegant", swatch: ["#0B0708", "#7F1D1D", "#F5E6C8"] },
  { id: "emerald", name: "Emerald + Gold", feeling: "Growth · Business", swatch: ["#050A08", "#10B981", "#D4AF37"] },
  { id: "copper", name: "Charcoal + Copper", feeling: "Industrial · Modern", swatch: ["#090909", "#B87333", "#D99A5B"] },
  { id: "mono", name: "Monochrome", feeling: "Minimal · Editorial", swatch: ["#050505", "#FFFFFF", "#A3A3A3"] },
];

const STORAGE_KEY = "sora-theme";

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId) => void };
const ThemeContext = createContext<Ctx>({ theme: "obsidian", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("obsidian");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) setThemeState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    window.localStorage.setItem(STORAGE_KEY, t);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/** Reads the live accent color as an rgb string, for canvas painting. */
export function useAccentColor() {
  const { theme } = useTheme();
  const [color, setColor] = useState("rgb(244,180,0)");
  useEffect(() => {
    const id = window.setTimeout(() => {
      const probe = document.createElement("span");
      probe.style.color = "var(--accent)";
      probe.style.display = "none";
      document.body.appendChild(probe);
      setColor(getComputedStyle(probe).color);
      probe.remove();
    }, 60);
    return () => window.clearTimeout(id);
  }, [theme]);
  return color;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
