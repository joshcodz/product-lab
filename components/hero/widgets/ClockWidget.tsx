"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function ClockWidget() {
  const [time, setTime] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setSeconds(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          second: "2-digit",
        })
      );
      setDateStr(
        now.toLocaleDateString("en-US", {
          timeZone: "Asia/Kolkata",
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
      dragElastic={0.15}
      whileHover={{ scale: 1.02, cursor: "grab" }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className="glass-heavy rounded-2xl p-3 w-44 shadow-lg select-none border border-border-glass group relative"
      tabIndex={0}
      aria-label="World clock widget for Chennai"
    >
      <div className="flex items-center justify-between text-xs text-text-tertiary mb-2 font-mono">
        <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-text-secondary">
          <Clock size={12} className="text-accent" />
          CHENNAI
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface/50 border border-border-glass">
          IST (UTC+5:30)
        </span>
      </div>

      <div className="flex items-baseline gap-1 my-1">
        <span className="font-mono text-3xl font-extrabold text-text-primary tracking-tight">
          {time || "12:00 PM"}
        </span>
        <span className="font-mono text-xs text-accent font-semibold">
          :{seconds || "00"}
        </span>
      </div>

      <div className="text-xs text-text-secondary font-medium">
        {dateStr || "Loading..."}
      </div>

      <div className="absolute top-1 right-2 text-[9px] text-text-tertiary opacity-0 group-hover:opacity-60 transition-opacity">
        drag me
      </div>
    </motion.div>
  );
}
