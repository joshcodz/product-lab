"use client";

import { useState } from "react";
import { Flag, Check } from "lucide-react";
import type { GuestbookNote } from "@/lib/guestbook";

interface StickyNoteProps {
  note: GuestbookNote;
  index?: number;
  onReport?: (id: string) => void;
}

// Pastel note styles: background, subtle shadow, pin color, tape/border accent
const COLOR_CONFIGS: Record<
  string,
  {
    bg: string;
    border: string;
    pin: string;
    shadow: string;
    ink: string;
    meta: string;
  }
> = {
  yellow: {
    bg: "bg-[#FEF9C3] dark:bg-[#FEF08A]",
    border: "border-yellow-300/40",
    pin: "bg-rose-500 shadow-rose-900/40",
    shadow: "shadow-[2px_6px_16px_rgba(0,0,0,0.18)]",
    ink: "text-stone-900",
    meta: "text-stone-600",
  },
  pink: {
    bg: "bg-[#FCE7F3] dark:bg-[#FBCFE8]",
    border: "border-pink-300/40",
    pin: "bg-rose-500 shadow-rose-900/40",
    shadow: "shadow-[2px_6px_16px_rgba(0,0,0,0.18)]",
    ink: "text-stone-900",
    meta: "text-pink-900/70",
  },
  mint: {
    bg: "bg-[#D1FAE5] dark:bg-[#A7F3D0]",
    border: "border-emerald-300/40",
    pin: "bg-rose-500 shadow-rose-900/40",
    shadow: "shadow-[2px_6px_16px_rgba(0,0,0,0.18)]",
    ink: "text-stone-900",
    meta: "text-emerald-950/70",
  },
  sky: {
    bg: "bg-[#E0F2FE] dark:bg-[#BAE6FD]",
    border: "border-sky-300/40",
    pin: "bg-rose-500 shadow-rose-900/40",
    shadow: "shadow-[2px_6px_16px_rgba(0,0,0,0.18)]",
    ink: "text-stone-900",
    meta: "text-sky-950/70",
  },
  lavender: {
    bg: "bg-[#EDE9FE] dark:bg-[#DDD6FE]",
    border: "border-purple-300/40",
    pin: "bg-rose-500 shadow-rose-900/40",
    shadow: "shadow-[2px_6px_16px_rgba(0,0,0,0.18)]",
    ink: "text-stone-900",
    meta: "text-purple-950/70",
  },
};

// Deterministic subtle rotation (-2.2deg to +2.2deg) based on note index or id
const ROTATIONS = [
  "-rotate-1",
  "rotate-1",
  "-rotate-2",
  "rotate-2",
  "rotate-0",
  "-rotate-[1.5deg]",
  "rotate-[1.5deg]",
];

function getRelativeTime(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function StickyNote({
  note,
  index = 0,
  onReport,
}: StickyNoteProps) {
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(note.reported);

  const theme = COLOR_CONFIGS[note.color] || COLOR_CONFIGS.yellow;
  const rotationClass = ROTATIONS[Math.abs(index) % ROTATIONS.length];

  const handleReport = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (reported || reporting) return;

    const confirmed = window.confirm(
      "Report this note for moderation? It will be flagged for review."
    );
    if (!confirmed) return;

    setReporting(true);
    try {
      const res = await fetch(`/api/guestbook/${note.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reported: true }),
      });
      if (res.ok) {
        setReported(true);
        onReport?.(note.id);
      }
    } catch (err) {
      console.error("Failed to report note:", err);
    } finally {
      setReporting(false);
    }
  };

  return (
    <div
      className={`group relative p-4 rounded-sm ${theme.bg} ${theme.ink} ${theme.shadow} ${rotationClass} transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between min-h-[170px] select-text border ${theme.border}`}
    >
      {/* Pushpin at top center */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10">
        <div
          className={`w-3 h-3 rounded-full ${theme.pin} shadow-md border border-white/60 ring-1 ring-black/10`}
        />
        {/* Subtle pin needle shadow */}
        <div className="absolute top-2.5 left-1.5 w-1 h-2 bg-black/20 rounded-full blur-[0.5px] -rotate-12" />
      </div>

      {/* Top action row: Emoji tag & Report button */}
      <div className="flex items-center justify-between gap-1 mb-2 pt-1">
        {note.emoji ? (
          <span
            className="text-lg leading-none inline-block drop-shadow-sm select-none"
            aria-label="Note emoji"
          >
            {note.emoji}
          </span>
        ) : (
          <span className="w-4" />
        )}

        <button
          onClick={handleReport}
          disabled={reported || reporting}
          title={reported ? "Flagged for review" : "Report note"}
          className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-black/10 text-stone-600 text-xs flex items-center gap-1 ${
            reported ? "!opacity-70 cursor-default" : ""
          }`}
          aria-label="Report note"
        >
          {reported ? (
            <>
              <Check size={11} className="text-emerald-700" />
              <span className="text-[10px] font-sans text-emerald-800">Flagged</span>
            </>
          ) : (
            <Flag size={11} className="hover:text-rose-600 transition-colors" />
          )}
        </button>
      </div>

      {/* Message content in handwriting font */}
      <div className="flex-1 my-1">
        <p className="font-handwriting text-xl leading-snug whitespace-pre-wrap break-words tracking-wide">
          {note.message}
        </p>
      </div>

      {/* Footer: Name signature & relative timestamp */}
      <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between gap-2 select-none">
        <span className="font-handwriting text-base font-bold truncate tracking-wide">
          — {note.name || "Anonymous"}
        </span>
        <span className={`text-[11px] font-mono shrink-0 ${theme.meta}`}>
          {getRelativeTime(note.created_at)}
        </span>
      </div>
    </div>
  );
}
