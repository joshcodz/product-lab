"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";
export type Wallpaper = "mesh" | "aurora" | "dots" | "time-of-day";
export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  wallpaper: Wallpaper;
  setWallpaper: (wallpaper: Wallpaper) => void;
  grain: boolean;
  setGrain: (grain: boolean) => void;
  toggleGrain: () => void;
  timeOfDay: TimeOfDay;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "jpl-theme";
const WALLPAPER_KEY = "jpl-wallpaper";
const GRAIN_KEY = "jpl-grain";

const VALID_WALLPAPERS: Wallpaper[] = ["mesh", "aurora", "dots", "time-of-day"];

export function getCurrentTimeOfDay(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [wallpaper, setWallpaperState] = useState<Wallpaper>("mesh");
  const [grain, setGrainState] = useState<boolean>(true);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");

  // Read stored preferences on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
      if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
        setThemeState(storedTheme);
      }

      const storedWp = localStorage.getItem(WALLPAPER_KEY) as Wallpaper | null;
      if (storedWp && VALID_WALLPAPERS.includes(storedWp)) {
        setWallpaperState(storedWp);
        document.documentElement.setAttribute("data-wallpaper", storedWp);
      } else {
        document.documentElement.setAttribute("data-wallpaper", "mesh");
      }

      const storedGrain = localStorage.getItem(GRAIN_KEY);
      if (storedGrain === "false") {
        setGrainState(false);
        document.documentElement.setAttribute("data-grain", "false");
      } else {
        setGrainState(true);
        document.documentElement.setAttribute("data-grain", "true");
      }
    } catch {
      // Ignore localStorage access failures in restricted environments
    }
  }, []);

  // Resolve theme & sync class on <html>
  useEffect(() => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(resolved);

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
    }
  }, [theme]);

  // Listen for system theme changes when in "system" mode
  useEffect(() => {
    if (theme !== "system" || typeof window === "undefined") return;

    try {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        const resolved = e.matches ? "dark" : "light";
        setResolvedTheme(resolved);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(resolved);
      };

      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } catch {
      // Ignore media query error
    }
  }, [theme]);

  // Time-of-day re-check: initial + every 10 minutes (600,000 ms)
  useEffect(() => {
    const updateTime = () => {
      const tod = getCurrentTimeOfDay();
      setTimeOfDay(tod);
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-time", tod);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  const setWallpaper = useCallback((wp: Wallpaper) => {
    if (!VALID_WALLPAPERS.includes(wp)) return;
    setWallpaperState(wp);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-wallpaper", wp);
    }
    try {
      localStorage.setItem(WALLPAPER_KEY, wp);
    } catch {}
  }, []);

  const setGrain = useCallback((enabled: boolean) => {
    setGrainState(enabled);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-grain", enabled ? "true" : "false");
    }
    try {
      localStorage.setItem(GRAIN_KEY, enabled ? "true" : "false");
    } catch {}
  }, []);

  const toggleGrain = useCallback(() => {
    setGrain(!grain);
  }, [grain, setGrain]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        wallpaper,
        setWallpaper,
        grain,
        setGrain,
        toggleGrain,
        timeOfDay,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
