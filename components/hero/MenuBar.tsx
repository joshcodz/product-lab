"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import ThemeSettingsPopover from "../ThemeSettingsPopover";

interface MenuBarProps {
  statusBadge?: string;
  statusHeadline?: string;
}

export default function MenuBar({
  statusBadge = "Open to internships",
  statusHeadline = "Josh · Product Manager",
}: MenuBarProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 z-40 h-8 flex items-center justify-between px-4 glass-heavy text-xs font-medium select-none border-b border-border-glass">
      {/* Left: Name & title */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-text-primary tracking-tight">
          {statusHeadline}
        </span>
      </div>

      {/* Right: Status badge, date/time, Sun/Moon switch, settings popover */}
      <div className="flex items-center gap-3 text-text-secondary">
        <span className="hidden sm:flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {statusBadge}
          </span>
        </span>

        <span className="hidden md:inline font-mono text-[11px] text-text-tertiary">
          {date}
        </span>

        <span className="font-mono tabular-nums text-[11px] text-text-secondary font-medium">
          {time}
        </span>

        <div className="h-3 w-px bg-border" />

        {/* Sun/Moon Toggle with tooltip 'Switch theme' */}
        <button
          onClick={toggleTheme}
          aria-label="Switch theme"
          title="Switch theme"
          className="p-1 rounded-md hover:bg-surface/80 text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-accent relative group"
        >
          {resolvedTheme === "dark" ? (
            <Sun size={14} className="text-amber-400" />
          ) : (
            <Moon size={14} className="text-text-secondary" />
          )}
          <span className="absolute -bottom-8 right-0 px-2 py-0.5 rounded bg-black/85 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Switch theme
          </span>
        </button>

        {/* Wallpaper & grain settings popover */}
        <ThemeSettingsPopover align="right" />
      </div>
    </div>
  );
}
