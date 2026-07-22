import { useEffect, useState } from "react";

export type ThemeId = "graphite-blue" | "onyx-emerald" | "slate-cyan" | "mono-signal";

export const THEMES: {
  id: ThemeId;
  name: string;
  tagline: string;
  swatches: string[];
  accent: string;
}[] = [
  {
    id: "graphite-blue",
    name: "Graphite + Electric Blue",
    tagline: "Neutral graphite command deck with a signal-blue primary.",
    swatches: ["#0a0a0a", "#1a1a1a", "#2d2d2d", "#3B82F6"],
    accent: "#3B82F6",
  },
  {
    id: "onyx-emerald",
    name: "Onyx + Emerald Signal",
    tagline: "Deep onyx with vivid emerald status accents.",
    swatches: ["#0d0d0d", "#181818", "#242424", "#22c55e"],
    accent: "#22c55e",
  },
  {
    id: "slate-cyan",
    name: "Slate + Cyan Ops",
    tagline: "Cool slate surfaces with a bright cyan route line.",
    swatches: ["#0e1116", "#161b22", "#1f2630", "#22d3ee"],
    accent: "#22d3ee",
  },
  {
    id: "mono-signal",
    name: "Mono + Multi-Signal",
    tagline: "Pure monochrome UI with multi-color chart signals.",
    swatches: ["#0a0a0a", "#1a1a1a", "#333333", "#f5f5f5"],
    accent: "#f5f5f5",
  },
];

const STORAGE_KEY = "parcelone-theme-v2";
const DEFAULT: ThemeId = "slate-cyan";

export function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = id;
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemeId | null) ?? DEFAULT;
    setThemeState(saved);
    applyTheme(saved);
  }, []);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    localStorage.setItem(STORAGE_KEY, id);
    applyTheme(id);
  };

  return { theme, setTheme };
}
