"use client";

import { useEffect, useRef, useState } from "react";
import {
  Palette,
  Sun,
  Moon,
  Sparkles,
  Check,
  X,
  Clock,
  Waves,
  Grid,
  CircleDot,
} from "lucide-react";
import { useTheme, type Wallpaper } from "./ThemeProvider";

interface ThemeSettingsPopoverProps {
  align?: "left" | "right";
  className?: string;
}

export default function ThemeSettingsPopover({
  align = "right",
  className = "",
}: ThemeSettingsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    resolvedTheme,
    setTheme,
    toggleTheme,
    wallpaper,
    setWallpaper,
    grain,
    toggleGrain,
    timeOfDay,
  } = useTheme();

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isDark = resolvedTheme === "dark";

  const wallpapers: Array<{
    id: Wallpaper;
    name: string;
    description: string;
    icon: React.ReactNode;
    getGradient: (dark: boolean) => string;
    bgSize?: string;
  }> = [
    {
      id: "mesh",
      name: "Mesh",
      description: "Corner pastels",
      icon: <Sparkles size={13} />,
      getGradient: (dark) =>
        dark
          ? "radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 60%), radial-gradient(circle at 0% 0%, #5c3a2a 0%, transparent 60%), radial-gradient(circle at 100% 0%, #3d3460 0%, transparent 60%), radial-gradient(circle at 0% 100%, #1e4c34 0%, transparent 60%), radial-gradient(circle at 100% 100%, #1e3a5c 0%, transparent 60%), #0f1a2e"
          : "radial-gradient(circle at 0% 0%, #fdd8c9 0%, transparent 60%), radial-gradient(circle at 100% 0%, #ddd5f3 0%, transparent 60%), radial-gradient(circle at 0% 100%, #c5edd6 0%, transparent 60%), radial-gradient(circle at 100% 100%, #bde0fe 0%, transparent 60%), #fef0e8",
    },
    {
      id: "aurora",
      name: "Aurora",
      description: "Drifting blooms",
      icon: <Waves size={13} />,
      getGradient: (dark) =>
        dark
          ? "radial-gradient(ellipse at 25% 30%, #3d3460 0%, transparent 70%), radial-gradient(ellipse at 75% 70%, #1e4c34 0%, transparent 70%), #0f1a2e"
          : "radial-gradient(ellipse at 25% 30%, #ddd5f3 0%, transparent 70%), radial-gradient(ellipse at 75% 70%, #c5edd6 0%, transparent 70%), #fef0e8",
    },
    {
      id: "dots",
      name: "Dots",
      description: "24px grid on mesh",
      icon: <Grid size={13} />,
      bgSize: "10px 10px, 100% 100%",
      getGradient: (dark) =>
        dark
          ? "radial-gradient(circle, rgba(45, 212, 191, 0.45) 1.5px, transparent 1.5px), radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.25) 0%, transparent 60%), radial-gradient(circle at 0% 0%, #5c3a2a 0%, transparent 60%), #0f1a2e"
          : "radial-gradient(circle, rgba(13, 148, 136, 0.35) 1.5px, transparent 1.5px), radial-gradient(circle at 0% 0%, #fdd8c9 0%, transparent 60%), radial-gradient(circle at 100% 100%, #bde0fe 0%, transparent 60%), #fef0e8",
    },
    {
      id: "time-of-day",
      name: "Time of Day",
      description: `${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} mood`,
      icon: <Clock size={13} />,
      getGradient: (dark) => {
        if (dark) {
          switch (timeOfDay) {
            case "morning":
              return "linear-gradient(135deg, rgba(92, 58, 42, 0.7) 0%, rgba(30, 58, 92, 0.7) 100%), #0f1a2e";
            case "afternoon":
              return "linear-gradient(135deg, rgba(30, 76, 52, 0.7) 0%, rgba(30, 58, 92, 0.7) 100%), #0f1a2e";
            case "evening":
              return "linear-gradient(135deg, rgba(61, 52, 96, 0.7) 0%, rgba(92, 58, 42, 0.7) 100%), #0f1a2e";
            default:
              return "radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.3) 0%, transparent 65%), linear-gradient(135deg, #16202e 0%, #0f1a2e 100%)";
          }
        }
        switch (timeOfDay) {
          case "morning":
            return "linear-gradient(135deg, #fdd8c9 0%, #bde0fe 100%)";
          case "afternoon":
            return "linear-gradient(135deg, #c5edd6 0%, #bde0fe 100%)";
          case "evening":
            return "linear-gradient(135deg, #ddd5f3 0%, #fdd8c9 100%)";
          default:
            return "radial-gradient(circle at 50% 50%, rgba(13, 148, 136, 0.3) 0%, transparent 65%), linear-gradient(135deg, #1f2e3d 0%, #0f1a2e 100%)";
        }
      },
    },
  ];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`p-2 rounded-lg transition-all duration-150 flex items-center justify-center ${
          isOpen
            ? "bg-accent text-text-inverted shadow-sm"
            : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
        }`}
        aria-label="Wallpaper and Theme Settings"
        title="Wallpaper & Appearance"
        aria-expanded={isOpen}
      >
        <Palette size={18} />
      </button>

      {/* Popover Panel */}
      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } top-full mt-2 w-72 sm:w-80 rounded-2xl glass-heavy p-4 shadow-xl border border-border z-50 animate-in fade-in zoom-in-95 duration-150`}
          role="dialog"
          aria-label="Appearance & Wallpaper Settings"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border mb-3.5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-accent/10 text-accent">
                <Palette size={14} />
              </span>
              <span className="text-xs font-semibold tracking-wide text-text-primary uppercase">
                Wallpapers & Style
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-text-tertiary hover:text-text-primary hover:bg-bg-secondary transition-colors"
              aria-label="Close settings"
            >
              <X size={14} />
            </button>
          </div>

          {/* Quick Theme Toggle: Segmented Control */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-bg-secondary/70 border border-border/50 mb-3.5">
            <span className="text-xs font-medium text-text-secondary flex items-center gap-1.5 pl-1">
              {isDark ? <Moon size={14} className="text-accent" /> : <Sun size={14} className="text-amber-500" />}
              Appearance
            </span>
            <div className="flex items-center p-0.5 rounded-lg bg-surface border border-border shadow-xs">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  !isDark
                    ? "bg-accent text-white shadow-xs font-semibold"
                    : "text-text-tertiary hover:text-text-primary"
                }`}
                aria-pressed={!isDark}
              >
                <Sun size={12} />
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  isDark
                    ? "bg-accent text-white shadow-xs font-semibold"
                    : "text-text-tertiary hover:text-text-primary"
                }`}
                aria-pressed={isDark}
              >
                <Moon size={12} />
                Dark
              </button>
            </div>
          </div>

          {/* Wallpaper Thumbnails */}
          <div className="mb-3.5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                Wallpaper
              </label>
              <span className="text-[11px] font-medium text-accent">
                {wallpapers.find((w) => w.id === wallpaper)?.name || "Mesh"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {wallpapers.map((wp) => {
                const isActive = wallpaper === wp.id;
                const gradient = wp.getGradient(isDark);

                return (
                  <button
                    key={wp.id}
                    onClick={() => setWallpaper(wp.id)}
                    className={`group relative text-left p-2 rounded-xl border transition-all duration-150 flex flex-col gap-1.5 ${
                      isActive
                        ? "border-accent ring-2 ring-accent/30 bg-surface shadow-md"
                        : "border-border hover:border-text-tertiary bg-surface/60 hover:bg-surface"
                    }`}
                    aria-pressed={isActive}
                  >
                    {/* Visual Thumbnail */}
                    <div
                      className="w-full h-12 rounded-lg border border-black/5 dark:border-white/10 relative overflow-hidden flex items-end justify-end p-1 shadow-inner"
                      style={{
                        background: gradient,
                        backgroundSize: wp.bgSize || "auto",
                      }}
                    >
                      {isActive && (
                        <span className="w-4 h-4 rounded-full bg-accent text-text-inverted flex items-center justify-center shadow-sm">
                          <Check size={10} strokeWidth={3} />
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-medium text-text-primary flex items-center gap-1">
                        {wp.name}
                      </span>
                      <span className="text-[10px] text-text-tertiary">
                        {wp.icon}
                      </span>
                    </div>

                    <span className="text-[10px] text-text-secondary leading-tight line-clamp-1">
                      {wp.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grain Toggle Switch */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between p-2 rounded-xl bg-bg-secondary/70 border border-border/50">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-accent/10 text-accent">
                  <CircleDot size={14} />
                </span>
                <div>
                  <div className="text-xs font-medium text-text-primary">
                    Film Grain Overlay
                  </div>
                  <div className="text-[10px] text-text-secondary">
                    SVG noise texture ({grain ? "Active" : "Disabled"})
                  </div>
                </div>
              </div>

              {/* Accessible Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={grain}
                onClick={toggleGrain}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  grain ? "bg-accent" : "bg-text-tertiary/40"
                }`}
                aria-label="Toggle film grain overlay"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    grain ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
