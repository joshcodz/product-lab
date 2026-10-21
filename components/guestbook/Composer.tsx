"use client";

import { useState, useEffect, FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ComposerProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const COLORS: Array<{
  id: "yellow" | "pink" | "mint" | "sky" | "lavender";
  label: string;
  bgClass: string;
  dotClass: string;
  borderClass: string;
}> = [
  {
    id: "yellow",
    label: "Yellow",
    bgClass: "bg-[#FEF9C3]",
    dotClass: "bg-[#FDE047]",
    borderClass: "border-yellow-400",
  },
  {
    id: "pink",
    label: "Pink",
    bgClass: "bg-[#FCE7F3]",
    dotClass: "bg-[#F472B6]",
    borderClass: "border-pink-400",
  },
  {
    id: "mint",
    label: "Mint",
    bgClass: "bg-[#D1FAE5]",
    dotClass: "bg-[#34D399]",
    borderClass: "border-emerald-400",
  },
  {
    id: "sky",
    label: "Sky",
    bgClass: "bg-[#E0F2FE]",
    dotClass: "bg-[#38BDF8]",
    borderClass: "border-sky-400",
  },
  {
    id: "lavender",
    label: "Lavender",
    bgClass: "bg-[#EDE9FE]",
    dotClass: "bg-[#A78BFA]",
    borderClass: "border-purple-400",
  },
];

const EMOJI_OPTIONS = ["☕", "🚀", "✨", "💡", "🔥", "👏", "🎨", "💻", "❤️"];

export default function Composer({ onSuccess, onCancel }: ComposerProps) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState<"yellow" | "pink" | "mint" | "sky" | "lavender">("yellow");
  const [emoji, setEmoji] = useState<string | null>(null);
  const [website, setWebsite] = useState(""); // Honeypot
  const [formLoadedAt, setFormLoadedAt] = useState<number>(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  const selectedTheme = COLORS.find((c) => c.id === color) || COLORS[0];
  const remainingChars = 140 - message.length;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const trimmedMsg = message.trim();
    if (trimmedMsg.length < 3) {
      setError("Please write at least 3 characters.");
      return;
    }
    if (trimmedMsg.length > 140) {
      setError("Notes must be 140 characters or fewer.");
      return;
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter your name or handle.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMsg,
          name: trimmedName,
          color,
          emoji,
          website, // honeypot
          _formLoadedAt: formLoadedAt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to post note. Please try again.");
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: unknown) {
      console.error("Submit note error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 text-center space-y-3 bg-[#181a20]">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <CheckCircle2 size={24} />
        </div>
        <h4 className="text-white text-sm font-semibold">Note pinned!</h4>
        <p className="text-white/60 text-xs max-w-sm mx-auto font-mono">
          Your note was pinned to the corkboard. Thanks for stopping by!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 bg-[#16181d] border-b border-white/10 select-none">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        {/* Live preview sticky card */}
        <div
          className={`relative p-4 rounded-sm ${selectedTheme.bgClass} shadow-lg transition-colors duration-200 border border-black/10`}
        >
          {/* Pushpin at top */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rose-500 shadow-md border border-white/60 pointer-events-none" />

          {/* Emoji row & color selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pt-1 border-b border-black/10 pb-2">
            {/* Quick emoji badges */}
            <div className="flex items-center gap-1 overflow-x-auto py-0.5">
              <button
                type="button"
                onClick={() => setEmoji(null)}
                className={`text-[11px] px-1.5 py-0.5 rounded font-sans transition-colors ${
                  emoji === null
                    ? "bg-black/15 font-bold text-stone-900"
                    : "text-stone-500 hover:text-stone-900"
                }`}
                title="No emoji"
              >
                none
              </button>
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(emoji === e ? null : e)}
                  className={`text-sm px-1 py-0.5 rounded transition-transform ${
                    emoji === e
                      ? "scale-125 bg-black/10 ring-1 ring-black/20"
                      : "hover:scale-110 opacity-70 hover:opacity-100"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Pastel color picker */}
            <div className="flex items-center gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  aria-label={`Select ${c.label} note`}
                  className={`w-4 h-4 rounded-full ${c.dotClass} shadow-sm transition-transform ${
                    color === c.id
                      ? "ring-2 ring-stone-900 scale-125"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Handwriting textarea */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 140))}
            placeholder="Write your note here... (max 140 characters)"
            rows={3}
            required
            className="w-full bg-transparent font-handwriting text-xl text-stone-900 placeholder:text-stone-400 placeholder:font-sans placeholder:text-sm focus:outline-none resize-none leading-relaxed tracking-wide"
            autoFocus
          />

          {/* Bottom signature row inside card */}
          <div className="mt-2 pt-2 border-t border-black/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-1 max-w-[200px]">
              <span className="font-handwriting text-stone-700 text-lg font-bold">—</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 30))}
                placeholder="Name / handle *"
                maxLength={30}
                required
                className="w-full bg-transparent border-b border-stone-400/50 focus:border-stone-800 text-xs font-mono text-stone-900 placeholder:text-stone-500 focus:outline-none px-1 py-0.5"
              />
            </div>

            <span
              className={`text-[11px] font-mono ${
                remainingChars < 20 ? "text-rose-600 font-bold" : "text-stone-500"
              }`}
            >
              {remainingChars}
            </span>
          </div>
        </div>

        {/* Hidden Honeypot */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] text-white/40 font-mono hidden sm:block">
            Notes are moderated before appearing publicly.
          </p>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || message.trim().length < 3}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-xs transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {submitting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Pinning…</span>
                </>
              ) : (
                <span>Pin note 📌</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
