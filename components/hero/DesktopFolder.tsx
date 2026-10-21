"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Zap,
  Bot,
  Building2,
  Rocket,
  Search,
  ArrowRight,
  X,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export type FolderColor = "teal" | "violet" | "mint" | "sky" | "coral" | "amber";

export interface FolderData {
  id: string;
  slug: string;
  label: string;
  iconName: "BarChart3" | "Zap" | "Bot" | "Building2" | "Rocket" | "Search";
  customIconUrl?: string;
  color: FolderColor;
  outcome: string;
  metric: string;
}

export const PLACEHOLDER_FOLDERS: FolderData[] = [
  {
    id: "1",
    slug: "onboarding-friction-score",
    label: "Onboarding Friction Score",
    iconName: "BarChart3",
    color: "teal",
    outcome:
      "Simulates a first-time contributor: reads setup docs, runs commands in an isolated sandbox, and scores onboarding friction.",
    metric: "CLI-first · parse → execute → score",
  },
  {
    id: "2",
    slug: "zenos",
    label: "Zenos",
    iconName: "Zap",
    color: "violet",
    outcome:
      "A developer-first operating system for deep work. Consolidates timer, tasks, notes, music, and ambient spaces into one screen.",
    metric: "v1 shipped · React, Vite & Tailwind",
  },
  {
    id: "3",
    slug: "alienhouse-internship",
    label: "AlienHouse Internship",
    iconName: "Building2",
    color: "sky",
    outcome:
      "PM Intern (Dec 2025 to Apr 2026). Built internal product systems for client management, service delivery, and team workflows.",
    metric: "Dec 2025 – Apr 2026 · Part-time, Remote",
  },
  {
    id: "4",
    slug: "founders-club",
    label: "Founders Club",
    iconName: "Rocket",
    customIconUrl: "/FC-logo-short.webp",
    color: "coral",
    outcome:
      "Operations, Marketing, HRM and QC across flagship hackathons, Bootcamp campaigns, and institutional outreach initiatives.",
    metric: "SRMIST (DEI) · Operations, Mktg & QC",
  },
  {
    id: "5",
    slug: "product-teardowns",
    label: "Product Teardowns",
    iconName: "Search",
    color: "amber",
    outcome:
      "Deep-dives into products I admire — what works, what doesn't, and what I'd change.",
    metric: "UX & product deconstructions",
  },
];

const FOLDER_THEMES: Record<
  FolderColor,
  {
    back: string;
    front: string;
    stroke: string;
    icon: string;
    glow: string;
    darkGlow: string;
  }
> = {
  teal: {
    back: "fill-teal-500/20 dark:fill-teal-400/25",
    front: "fill-teal-500/35 dark:fill-teal-400/40",
    stroke: "stroke-teal-600/40 dark:stroke-teal-400/60",
    icon: "text-teal-700 dark:text-teal-300",
    glow: "rgba(15,118,110,0.15)",
    darkGlow: "rgba(45,212,191,0.30)",
  },
  violet: {
    back: "fill-violet-500/20 dark:fill-violet-400/25",
    front: "fill-violet-500/35 dark:fill-violet-400/40",
    stroke: "stroke-violet-600/40 dark:stroke-violet-400/60",
    icon: "text-violet-700 dark:text-violet-300",
    glow: "rgba(139,92,246,0.15)",
    darkGlow: "rgba(167,139,250,0.30)",
  },
  mint: {
    back: "fill-emerald-500/20 dark:fill-emerald-400/25",
    front: "fill-emerald-500/35 dark:fill-emerald-400/40",
    stroke: "stroke-emerald-600/40 dark:stroke-emerald-400/60",
    icon: "text-emerald-700 dark:text-emerald-300",
    glow: "rgba(16,185,129,0.15)",
    darkGlow: "rgba(52,211,153,0.30)",
  },
  sky: {
    back: "fill-sky-500/20 dark:fill-sky-400/25",
    front: "fill-sky-500/35 dark:fill-sky-400/40",
    stroke: "stroke-sky-600/40 dark:stroke-sky-400/60",
    icon: "text-sky-700 dark:text-sky-300",
    glow: "rgba(14,165,233,0.15)",
    darkGlow: "rgba(56,189,248,0.30)",
  },
  coral: {
    back: "fill-rose-500/20 dark:fill-rose-400/25",
    front: "fill-rose-500/35 dark:fill-rose-400/40",
    stroke: "stroke-rose-600/40 dark:stroke-rose-400/60",
    icon: "text-rose-700 dark:text-rose-300",
    glow: "rgba(244,63,94,0.15)",
    darkGlow: "rgba(251,113,133,0.30)",
  },
  amber: {
    back: "fill-amber-500/20 dark:fill-amber-400/25",
    front: "fill-amber-500/35 dark:fill-amber-400/40",
    stroke: "stroke-amber-600/40 dark:stroke-amber-400/60",
    icon: "text-amber-700 dark:text-amber-300",
    glow: "rgba(245,158,11,0.15)",
    darkGlow: "rgba(251,191,36,0.30)",
  },
};

function renderFolderIcon(name: FolderData["iconName"], className: string) {
  const size = 16;
  switch (name) {
    case "BarChart3":
      return <BarChart3 size={size} className={className} />;
    case "Zap":
      return <Zap size={size} className={className} />;
    case "Bot":
      return <Bot size={size} className={className} />;
    case "Building2":
      return <Building2 size={size} className={className} />;
    case "Rocket":
      return <Rocket size={size} className={className} />;
    case "Search":
      return <Search size={size} className={className} />;
    default:
      return <BarChart3 size={size} className={className} />;
  }
}

interface DesktopFolderProps {
  folder: FolderData;
  index: number;
  onOpen?: (folder: FolderData) => void;
}

export default function DesktopFolder({ folder, index, onOpen }: DesktopFolderProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickCount = useRef(0);

  const theme = FOLDER_THEMES[folder.color] || FOLDER_THEMES.teal;

  // First-load hint check for index 0
  useEffect(() => {
    if (index === 0) {
      try {
        const seen = sessionStorage.getItem("jpl_folder_hint");
        if (!seen) {
          setShowHint(true);
        }
      } catch (e) {
        // Safe fallback if sessionStorage is blocked
      }
    }
  }, [index]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    try {
      sessionStorage.setItem("jpl_folder_hint", "true");
    } catch (e) {}
  }, []);

  const handleClick = useCallback(() => {
    dismissHint();
    if (folder.slug === "product-teardowns") {
      window.location.href = "/teardowns";
      return;
    }

    clickCount.current += 1;

    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        if (clickCount.current === 1) {
          if (onOpen) {
            onOpen(folder);
          } else {
            setPreviewOpen(true);
          }
        }
        clickCount.current = 0;
      }, 200);
    } else if (clickCount.current === 2) {
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickCount.current = 0;
      window.location.href = `/work/${folder.slug}`;
    }
  }, [folder, onOpen, dismissHint]);

  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      dismissHint();
      if (folder.slug === "product-teardowns") {
        window.location.href = "/teardowns";
        return;
      }
      if (onOpen) {
        onOpen(folder);
      } else {
        setPreviewOpen(true);
      }
    },
    [folder, onOpen, dismissHint]
  );

  return (
    <div className="relative w-24 flex flex-col items-center">
      {/* First-load hint on folder #0 */}
      <AnimatePresence>
        {showHint && index === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-medium shadow-lg pointer-events-none flex items-center gap-1.5"
          >
            <HelpCircle size={12} />
            <span>Click to open a case study</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Folder button */}
      <motion.button
        className="w-full flex flex-col items-center gap-1.5 p-2 rounded-2xl cursor-pointer focus-visible:outline-accent group relative select-none"
        onClick={handleClick}
        onTouchEnd={handleTouch}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -4, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 20, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
          delay: 0.6 + index * 0.08,
        }}
        aria-label={`Open ${folder.label} case study`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            dismissHint();
            if (folder.slug === "product-teardowns") {
              window.location.href = "/teardowns";
            } else {
              setPreviewOpen(true);
            }
          }
        }}
      >
        {/* If customIconUrl is provided, render the brand logo directly instead of the folder symbol */}
        {folder.customIconUrl ? (
          <div className="relative w-16 h-14 flex items-center justify-center">
            {/* Soft ambient glow */}
            <div
              className="absolute inset-1 rounded-2xl opacity-50 blur-md pointer-events-none"
              style={{ background: theme.glow }}
            />
            <motion.img
              src={folder.customIconUrl}
              alt={folder.label}
              className="relative w-14 h-14 object-contain drop-shadow-md select-none"
              animate={{
                scale: isHovered ? 1.1 : 1,
                y: isHovered ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            />
          </div>
        ) : (
          /* Glossy SVG Folder with 3D Front Flap */
          <div className="relative w-16 h-14" style={{ perspective: "400px" }}>
            <svg
              width="64"
              height="56"
              viewBox="0 0 64 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-md overflow-visible"
            >
              {/* Soft ambient glow in dark mode */}
              <circle
                cx="32"
                cy="28"
                r="24"
                className="hidden dark:block opacity-40 blur-md pointer-events-none"
                fill={theme.glow}
              />

              {/* Folder Back with Tab */}
              <path
                d="M4 10C4 7.79 5.79 6 8 6H24L30 12H56C58.21 12 60 13.79 60 16V48C60 50.21 58.21 52 56 52H8C5.79 52 4 50.21 4 48V10Z"
                className={`${theme.back} ${theme.stroke} backdrop-blur-md`}
                strokeWidth="1.2"
              />

              {/* Document sheet sticking out */}
              <rect
                x="12"
                y="10"
                width="40"
                height="28"
                rx="3"
                className="fill-surface/90 stroke-border-glass"
                strokeWidth="0.8"
              />
              <line
                x1="18"
                y1="16"
                x2="32"
                y2="16"
                className="stroke-text-tertiary/40"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="18"
                y1="21"
                x2="44"
                y2="21"
                className="stroke-text-tertiary/30"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Front Flap (3D tilt on hover) */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-10 origin-bottom"
              animate={{
                rotateX: isHovered ? -18 : 0,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              <svg
                width="64"
                height="40"
                viewBox="0 0 64 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-sm"
              >
                {/* Front flap body */}
                <path
                  d="M2 4C2 1.79 3.79 0 6 0H58C60.21 0 62 1.79 62 4V34C62 36.21 60.21 38 58 38H6C3.79 38 2 36.21 2 34V4Z"
                  className={`${theme.front} ${theme.stroke} backdrop-blur-md`}
                  strokeWidth="1.2"
                />
                {/* Glossy top edge highlight */}
                <path
                  d="M6 1H58"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>

              {/* Lucide emblem centered on the front flap */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1 rounded-full bg-surface/70 dark:bg-black/30 backdrop-blur-xs border border-white/20 shadow-xs flex items-center justify-center overflow-hidden">
                  {renderFolderIcon(folder.iconName, theme.icon)}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Folder Label with soft pill background on hover */}
        <span className="text-[11px] font-medium text-text-primary text-center leading-tight px-1.5 py-0.5 rounded-md transition-colors duration-200 group-hover:bg-surface/85 group-hover:shadow-xs group-hover:backdrop-blur-sm line-clamp-2 w-full">
          {folder.label}
        </span>
      </motion.button>

      {/* Fallback Preview Card Modal (when not using top-level drawer) */}
      <AnimatePresence>
        {!onOpen && previewOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewOpen(false)}
            />

            {/* Preview card */}
            <motion.div
              className="absolute z-50 top-full mt-2 left-1/2 w-72 glass-heavy rounded-2xl overflow-hidden shadow-xl border border-border-glass"
              initial={{ opacity: 0, y: -10, x: "-50%", scale: 0.92 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: -10, x: "-50%", scale: 0.92 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {/* Chrome bar */}
              <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border-glass bg-surface/40">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="p-1 rounded-md hover:bg-surface text-text-tertiary hover:text-text-primary transition-colors"
                  aria-label="Close preview"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-surface/70 border border-border-glass shrink-0 flex items-center justify-center">
                    {folder.customIconUrl ? (
                      <img
                        src={folder.customIconUrl}
                        alt={folder.label}
                        className="w-4 h-4 object-contain"
                      />
                    ) : (
                      renderFolderIcon(folder.iconName, theme.icon)
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-text-primary leading-snug">
                      {folder.label}
                    </h3>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-tertiary mt-0.5">
                      Case Study
                    </p>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {folder.outcome}
                </p>

                <div className="pt-1">
                  <span className="text-[11px] font-mono font-semibold text-accent px-2 py-1 rounded-md bg-accent-muted border border-accent/15">
                    {folder.metric}
                  </span>
                </div>

                <div className="pt-2 border-t border-border-glass">
                  <Link
                    href={`/work/${folder.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group/link"
                  >
                    Open full case study
                    <ArrowRight
                      size={13}
                      className="group-hover/link:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
