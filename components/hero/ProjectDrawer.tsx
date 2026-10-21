"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3,
  Zap,
  Bot,
  Building2,
  Rocket,
  Search,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { FolderData, FolderColor } from "./DesktopFolder";

interface ProjectDrawerProps {
  folder: FolderData | null;
  allFolders: FolderData[];
  onClose: () => void;
  onSelectFolder: (folder: FolderData) => void;
}

const THEME_ACCENTS: Record<
  FolderColor,
  {
    bg: string;
    border: string;
    text: string;
    glow: string;
    badge: string;
  }
> = {
  teal: {
    bg: "bg-teal-500/10 dark:bg-teal-400/15",
    border: "border-teal-500/30 dark:border-teal-400/40",
    text: "text-teal-700 dark:text-teal-300",
    glow: "rgba(20, 184, 166, 0.25)",
    badge: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/20",
  },
  violet: {
    bg: "bg-violet-500/10 dark:bg-violet-400/15",
    border: "border-violet-500/30 dark:border-violet-400/40",
    text: "text-violet-700 dark:text-violet-300",
    glow: "rgba(139, 92, 246, 0.25)",
    badge: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/20",
  },
  mint: {
    bg: "bg-emerald-500/10 dark:bg-emerald-400/15",
    border: "border-emerald-500/30 dark:border-emerald-400/40",
    text: "text-emerald-700 dark:text-emerald-300",
    glow: "rgba(16, 185, 129, 0.25)",
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  sky: {
    bg: "bg-sky-500/10 dark:bg-sky-400/15",
    border: "border-sky-500/30 dark:border-sky-400/40",
    text: "text-sky-700 dark:text-sky-300",
    glow: "rgba(14, 165, 233, 0.25)",
    badge: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/20",
  },
  coral: {
    bg: "bg-rose-500/10 dark:bg-rose-400/15",
    border: "border-rose-500/30 dark:border-rose-400/40",
    text: "text-rose-700 dark:text-rose-300",
    glow: "rgba(244, 63, 94, 0.25)",
    badge: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/20",
  },
  amber: {
    bg: "bg-amber-500/10 dark:bg-amber-400/15",
    border: "border-amber-500/30 dark:border-amber-400/40",
    text: "text-amber-700 dark:text-amber-300",
    glow: "rgba(245, 158, 11, 0.25)",
    badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
};

function renderIcon(name: FolderData["iconName"], className: string, size = 18) {
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
      return <Sparkles size={size} className={className} />;
  }
}

export default function ProjectDrawer({
  folder,
  allFolders,
  onClose,
  onSelectFolder,
}: ProjectDrawerProps) {
  const currentIndex = folder ? allFolders.findIndex((f) => f.id === folder.id) : -1;

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % allFolders.length;
    onSelectFolder(allFolders[nextIdx]);
  }, [currentIndex, allFolders, onSelectFolder]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + allFolders.length) % allFolders.length;
    onSelectFolder(allFolders[prevIdx]);
  }, [currentIndex, allFolders, onSelectFolder]);

  // Keyboard navigation: Escape closes, ArrowLeft/ArrowRight cycles
  useEffect(() => {
    if (!folder) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [folder, onClose, handleNext, handlePrev]);

  if (!folder) return null;

  const theme = THEME_ACCENTS[folder.color] || THEME_ACCENTS.teal;

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <motion.div
          initial={{ x: "100%", boxShadow: "none" }}
          animate={{
            x: 0,
            boxShadow: "-12px 0 36px rgba(0, 0, 0, 0.25)",
          }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          className="relative w-full max-w-lg h-full glass-heavy border-l border-white/10 dark:border-white/5 flex flex-col justify-between overflow-hidden z-10"
          role="dialog"
          aria-modal="true"
          aria-label={folder.label}
        >
          {/* Top Bar with macOS controls & quick cycle buttons */}
          <div className="h-14 px-5 border-b border-border flex items-center justify-between shrink-0 bg-surface/50 backdrop-blur-md">
            {/* macOS traffic light style buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 flex items-center justify-center group"
                aria-label="Close dossier"
              >
                <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110"
                aria-label="Minimize dossier"
              />
              <Link
                href={`/work/${folder.slug}`}
                className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110"
                aria-label="Open full page"
                title="Open full page"
              />
              <span className="text-xs font-mono text-text-tertiary ml-2">
                Dossier · {currentIndex + 1} of {allFolders.length}
              </span>
            </div>

            {/* Previous / Next project pagination */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                aria-label="Previous project (Left arrow)"
                title="Previous (←)"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                aria-label="Next project (Right arrow)"
                title="Next (→)"
              >
                <ChevronRight size={16} />
              </button>
              <div className="w-px h-4 bg-border mx-1" />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                aria-label="Close drawer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Project Switcher Ribbon */}
          <div className="px-5 py-2.5 border-b border-border/60 bg-bg-secondary/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {allFolders.map((item, idx) => {
              const active = item.id === folder.id;
              const itemTheme = THEME_ACCENTS[item.color];
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectFolder(item)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? `${itemTheme.badge} border shadow-xs font-semibold`
                      : "text-text-tertiary hover:text-text-primary hover:bg-surface/60"
                  }`}
                >
                  {item.customIconUrl ? (
                    <img
                      src={item.customIconUrl}
                      alt={item.label}
                      className="w-3.5 h-3.5 object-contain"
                    />
                  ) : (
                    renderIcon(item.iconName, active ? itemTheme.text : "currentColor", 12)
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dossier Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Header Hero */}
            <div className="flex items-start gap-4">
              <div
                className={`p-3.5 rounded-2xl ${theme.bg} ${theme.border} border shadow-sm shrink-0 flex items-center justify-center`}
                style={{ boxShadow: `0 8px 24px ${theme.glow}` }}
              >
                {folder.customIconUrl ? (
                  <img
                    src={folder.customIconUrl}
                    alt={folder.label}
                    className="w-7 h-7 object-contain"
                  />
                ) : (
                  renderIcon(folder.iconName, theme.text, 28)
                )}
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
                  Case Study Dossier
                </span>
                <h2 className="font-display text-2xl font-bold text-text-primary leading-tight">
                  {folder.label}
                </h2>
                <p className="text-xs text-text-tertiary font-mono">
                  Slug: /work/{folder.slug}
                </p>
              </div>
            </div>

            {/* Impact / Metric Highlight Card */}
            <div className="p-4 rounded-2xl bg-surface/80 border border-border/80 shadow-xs space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary font-semibold flex items-center gap-1.5">
                <Sparkles size={12} className="text-accent" />
                Key Metric &amp; Outcome
              </span>
              <div className="text-xl font-bold text-text-primary">
                {folder.metric}
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {folder.outcome}
              </p>
            </div>

            {/* Detailed Dossier Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-tertiary font-semibold">
                What this work solved
              </h3>
              <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-surface/50 border border-border/40">
                  <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                  <span>
                    Identified high-dropoff user journeys and mapped frictionless onboarding paths.
                  </span>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-surface/50 border border-border/40">
                  <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                  <span>
                    Conducted qualitative interviews and distilled telemetry into actionable PRDs.
                  </span>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-surface/50 border border-border/40">
                  <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                  <span>
                    Prototyped interactive UI flows in code to bridge product and engineering velocity.
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tip */}
            <div className="p-3 rounded-xl bg-accent/5 border border-accent/15 text-[11px] text-text-secondary flex items-center justify-between">
              <span>Tip: Use <strong>←</strong> / <strong>→</strong> keys to cycle projects</span>
              <span className="font-mono text-text-tertiary">ESC to close</span>
            </div>
          </div>

          {/* Bottom Docked Action Footer */}
          <div className="p-4 px-6 border-t border-border bg-surface/80 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
            >
              Close
            </button>
            <Link
              href={`/work/${folder.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-accent text-white shadow-md hover:brightness-105 transition-all group"
            >
              <span>Open full case study</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
  );
}
