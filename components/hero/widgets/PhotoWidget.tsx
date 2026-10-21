"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";

export default function PhotoWidget() {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt tracking (max 6deg)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.15, 0, 0.15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "600px" }} ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
        dragElastic={0.15}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03, cursor: "grab" }}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        initial={{ rotate: -2 }}
        className="glass-heavy rounded-3xl p-3 w-48 shadow-lg select-none border border-border-glass group relative overflow-hidden"
        tabIndex={0}
        aria-label="Photo widget"
      >
        {/* Soft Glare on 3D Tilt */}
        <motion.div
          style={{ opacity: glareOpacity }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none z-20"
        />

        {/* Decorative washi tape on top */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-peach/50 dark:bg-peach/30 backdrop-blur-md rounded-sm border border-white/30 -rotate-2 z-30 pointer-events-none shadow-xs" />

        {/* Photo frame */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2.5 bg-gradient-to-tr from-accent/20 via-lavender/30 to-mint/20 border border-border-glass">
          <img
            src="/josh.jpg"
            alt="Josh"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-[10px] text-white font-medium border border-white/10">
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
    </div>
  );
}
