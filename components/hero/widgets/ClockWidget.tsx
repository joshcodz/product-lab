"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function ClockWidget() {
  const [time, setTime] = useState<string>("");
  const [period, setPeriod] = useState<string>("PM");
  const [seconds, setSeconds] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const str = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const parts = str.split(" ");
      const timeParts = (parts[0] || "12:00:00").split(":");
      setTime(`${timeParts[0]}:${timeParts[1]}`);
      setSeconds(timeParts[2] || "00");
      setPeriod(parts[1] || "PM");
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
      className="glass-heavy rounded-2xl p-3 w-48 shadow-lg select-none border border-border-glass group relative"
      tabIndex={0}
      aria-label="World clock widget for Chennai"
    >
      <div className="flex items-center justify-between text-xs text-text-tertiary mb-2 font-mono whitespace-nowrap">
        <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-text-secondary">
          <Clock size={12} className="text-accent" />
          CHENNAI
        </span>
        <span className="text-[10px] text-text-tertiary font-mono">
          {dateStr}
        </span>
      </div>

      <div className="flex items-baseline gap-1 my-1 font-mono tabular-nums whitespace-nowrap">
        <span className="text-3xl font-extrabold text-text-primary tracking-tight">
          {time || "05:30"}
        </span>
        <span className="text-xs font-bold text-accent">
          {period}
        </span>
        <span className="text-xs text-text-tertiary font-medium">
          :{seconds || "00"}
        </span>
      </div>

      <div className="text-[10px] font-mono text-text-tertiary font-medium mt-1">
        IST · UTC+5:30
      </div>

      <div className="absolute top-1 right-2 text-[9px] text-text-tertiary opacity-0 group-hover:opacity-60 transition-opacity">
        drag me
      </div>
    </motion.div>
  );
}
