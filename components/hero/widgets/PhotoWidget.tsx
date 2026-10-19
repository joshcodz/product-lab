"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";

export default function PhotoWidget() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
      dragElastic={0.15}
      whileHover={{ scale: 1.02, cursor: "grab", rotate: 0 }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      initial={{ rotate: -2 }}
      className="glass-heavy rounded-2xl p-2.5 w-44 shadow-lg select-none border border-border-glass group relative"
      tabIndex={0}
      aria-label="Photo widget"
    >
      {/* Decorative tape on top */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-peach/40 backdrop-blur-md rounded-sm border border-white/20 -rotate-3 z-10 pointer-events-none shadow-xs" />

      {/* Photo frame */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-gradient-to-tr from-accent/20 via-lavender/30 to-mint/20 border border-border-glass">
        <img
          src="/josh.jpg"
          alt="Josh"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Caption & details */}
      <div className="px-1 text-center">
        <div className="flex items-center justify-center gap-1 text-xs font-bold text-text-primary">
          <span>Josh</span>
          <Sparkles size={12} className="text-accent" />
        </div>
        <p className="text-[11px] text-text-secondary mt-0.5 leading-tight font-medium">
          Building 0→1 products @ SRMIST
        </p>
        <div className="flex items-center justify-center gap-1 text-[10px] text-text-tertiary font-mono mt-1">
          <MapPin size={10} />
          <span>Founders Club · AlienHouse</span>
        </div>
      </div>

      <div className="absolute top-1 right-2 text-[9px] text-text-tertiary opacity-0 group-hover:opacity-60 transition-opacity">
        drag me
      </div>
    </motion.div>
  );
}
