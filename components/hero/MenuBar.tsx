"use client";

import { useEffect, useState } from "react";

interface MenuBarProps {
  statusBadge?: string;
  statusHeadline?: string;
}

export default function MenuBar({
  statusBadge = "Open to internships",
  statusHeadline = "Josh · Aspiring PM",
}: MenuBarProps) {
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
    <div className="absolute top-0 left-0 right-0 z-40 h-8 flex items-center justify-between px-4 glass-heavy text-xs font-medium select-none">
      {/* Left: Name & title */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-text-primary">
          {statusHeadline}
        </span>
      </div>

      {/* Right: Status + time/date */}
      <div className="flex items-center gap-4 text-text-secondary">
        <span className="hidden sm:flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {statusBadge}
          </span>
        </span>
        <span>{date}</span>
        <span className="font-mono tabular-nums">{time}</span>
      </div>
    </div>
  );
}
