"use client";

import { motion } from "framer-motion";
import { Hammer, Sparkles, Terminal } from "lucide-react";

interface BuildingWidgetProps {
  projectName?: string;
  status?: string;
  update?: string;
}

export default function BuildingWidget({
  projectName = "Josh's Product Lab · v2.0",
  status = "In Development",
  update = "Polishing desktop OS interface & shipping interactive case studies.",
}: BuildingWidgetProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
      dragElastic={0.15}
      whileHover={{ scale: 1.02, cursor: "grab" }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className="glass-heavy rounded-3xl p-3.5 w-56 shadow-lg select-none border border-border-glass group relative"
      tabIndex={0}
      aria-label="Currently Building Widget"
    >
      {/* Header */}
      <div className="flex items-center justify-between text-xs text-text-tertiary mb-2 font-mono whitespace-nowrap">
        <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-text-secondary">
          <Hammer size={12} className="text-accent" />
          NOW BUILDING
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {status}
        </span>
      </div>

      {/* Project Title */}
      <h4 className="font-display font-bold text-sm text-text-primary leading-tight mt-1">
        {projectName}
      </h4>

      {/* One-line update */}
      <p className="text-xs text-text-secondary leading-relaxed mt-1 line-clamp-2">
        {update}
      </p>

      {/* Monospace tech footer */}
      <div className="flex items-center gap-1 text-[10px] font-mono text-text-tertiary mt-2.5 pt-2 border-t border-border-glass/60">
        <Terminal size={10} />
        <span>Next.js 14 · Tailwind · Framer</span>
      </div>

      <div className="absolute top-1 right-2 text-[9px] text-text-tertiary opacity-0 group-hover:opacity-60 transition-opacity">
        drag me
      </div>
    </motion.div>
  );
}
