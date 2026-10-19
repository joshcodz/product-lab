"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

export interface FolderData {
  id: string;
  slug: string;
  label: string;
  emblem: string; // emoji or short text for the folder emblem
  color: string; // tailwind bg class for the emblem circle
  outcome: string;
  metric: string;
}

// Placeholder folders — will be admin-editable
export const PLACEHOLDER_FOLDERS: FolderData[] = [
  {
    id: "1",
    slug: "onboarding-friction-score",
    label: "Onboarding Friction Score",
    emblem: "📊",
    color: "bg-peach",
    outcome: "Reduced new-user drop-off by mapping every friction point in the first 5 minutes.",
    metric: "40% fewer support tickets [PLACEHOLDER]",
  },
  {
    id: "2",
    slug: "zenos",
    label: "Zenos",
    emblem: "⚡",
    color: "bg-lavender",
    outcome: "Built a real-time collaboration tool for student teams from zero to working prototype.",
    metric: "Prototype in 48h [PLACEHOLDER]",
  },
  {
    id: "3",
    slug: "personal-assistant-app",
    label: "Personal Assistant App",
    emblem: "🤖",
    color: "bg-mint",
    outcome: "AI-powered task management that learns from your patterns.",
    metric: "200+ beta users [PLACEHOLDER]",
  },
  {
    id: "4",
    slug: "alienhouse-internship",
    label: "AlienHouse Internship",
    emblem: "🏢",
    color: "bg-sky",
    outcome: "Shipped 3 features as PM intern, working with a cross-functional team of 8.",
    metric: "3 features shipped [PLACEHOLDER]",
  },
  {
    id: "5",
    slug: "founders-club",
    label: "Founders Club",
    emblem: "🚀",
    color: "bg-peach",
    outcome: "Led the product and tech direction for SRMIST's premier entrepreneurship community.",
    metric: "50+ members, 10+ events [PLACEHOLDER]",
  },
  {
    id: "6",
    slug: "product-teardowns",
    label: "Product Teardowns",
    emblem: "🔍",
    color: "bg-lavender",
    outcome: "Deep-dives into products I admire — what works, what doesn't, and what I'd change.",
    metric: "6 teardowns published [PLACEHOLDER]",
  },
];

function FolderIcon({ emblem, color }: { emblem: string; color: string }) {
  return (
    <svg width="64" height="56" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
      {/* Folder back */}
      <path
        d="M4 8C4 5.79 5.79 4 8 4H22L28 10H56C58.21 10 60 11.79 60 14V48C60 50.21 58.21 52 56 52H8C5.79 52 4 50.21 4 48V8Z"
        className="fill-surface"
        opacity="0.7"
      />
      {/* Folder front */}
      <path
        d="M2 16C2 13.79 3.79 12 6 12H58C60.21 12 62 13.79 62 16V48C62 50.21 60.21 52 58 52H6C3.79 52 2 50.21 2 48V16Z"
        className="fill-surface"
        opacity="0.9"
      />
      {/* Folder tab */}
      <path
        d="M4 8C4 5.79 5.79 4 8 4H20C21.1 4 22.14 4.53 22.8 5.4L26 10H4V8Z"
        className="fill-accent/20"
      />
      {/* Emblem circle */}
      <circle cx="32" cy="34" r="12" className={`${color} opacity-60`} />
      {/* Emblem text */}
      <text x="32" y="39" textAnchor="middle" fontSize="14" className="select-none">
        {emblem}
      </text>
    </svg>
  );
}

interface DesktopFolderProps {
  folder: FolderData;
  index: number;
}

export default function DesktopFolder({ folder, index }: DesktopFolderProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCount = useRef(0);

  const handleClick = useCallback(() => {
    clickCount.current += 1;

    if (clickCount.current === 1) {
      // Single click — wait to see if it's a double click
      clickTimer.current = setTimeout(() => {
        if (clickCount.current === 1) {
          setPreviewOpen(true);
        }
        clickCount.current = 0;
      }, 250);
    } else if (clickCount.current === 2) {
      // Double click — navigate
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickCount.current = 0;
      window.location.href = `/work/${folder.slug}`;
    }
  }, [folder.slug]);

  // On touch, single tap opens preview
  const handleTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setPreviewOpen(true);
  }, []);

  return (
    <div className="relative">
      {/* Folder icon */}
      <motion.button
        className="flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-pointer focus-visible:outline-accent group"
        onClick={handleClick}
        onTouchEnd={handleTouch}
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.8 + index * 0.1,
        }}
        aria-label={`Open ${folder.label} case study`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") setPreviewOpen(true);
        }}
      >
        <motion.div
          whileHover={{
            rotate: [0, -3, 3, -2, 0],
            transition: { duration: 0.4 },
          }}
        >
          <FolderIcon emblem={folder.emblem} color={folder.color} />
        </motion.div>
        <span className="text-[11px] font-medium text-text-primary text-center max-w-[80px] leading-tight drop-shadow-sm">
          {folder.label}
        </span>
      </motion.button>

      {/* Preview window */}
      <AnimatePresence>
        {previewOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewOpen(false)}
            />

            {/* Preview card */}
            <motion.div
              className="absolute z-50 top-full mt-2 left-1/2 w-72 glass-heavy rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: -10, x: "-50%", scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: -10, x: "-50%", scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-border-glass">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="p-0.5 rounded hover:bg-bg-secondary/50 text-text-tertiary"
                  aria-label="Close preview"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-display font-bold text-base text-text-primary">
                  {folder.label}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {folder.outcome}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-accent px-2 py-1 rounded-md bg-accent-muted">
                    {folder.metric}
                  </span>
                </div>
                <Link
                  href={`/work/${folder.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors group/link"
                >
                  Open case study
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
