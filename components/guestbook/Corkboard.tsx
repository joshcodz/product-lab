"use client";

import { useState, useEffect, useCallback } from "react";
import StickyNote from "./StickyNote";
import type { GuestbookNote } from "@/lib/guestbook";
import { StickyNote as StickyNoteIcon, RefreshCw, Loader2 } from "lucide-react";

interface CorkboardProps {
  onOpenComposer?: () => void;
  refreshTrigger?: number;
}

export default function Corkboard({
  onOpenComposer,
  refreshTrigger,
}: CorkboardProps) {
  const [notes, setNotes] = useState<GuestbookNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async (cursor?: string) => {
    try {
      if (cursor) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const url = cursor
        ? `/api/guestbook?cursor=${encodeURIComponent(cursor)}&limit=18`
        : `/api/guestbook?limit=18`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to load guestbook notes");
      }

      const data = await res.json();
      if (cursor) {
        setNotes((prev) => [...prev, ...(data.notes || [])]);
      } else {
        setNotes(data.notes || []);
      }
      setNextCursor(data.nextCursor || null);
    } catch (err: unknown) {
      console.error("Corkboard fetch error:", err);
      if (!cursor) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not load notes. Please check back soon."
        );
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes, refreshTrigger]);

  return (
    <div className="relative flex-1 w-full h-full overflow-y-auto bg-[#1a1714] bg-[radial-gradient(#29241e_1px,transparent_1px)] [background-size:16px_16px] shadow-inner">
      {/* Subtle cork border glow / vignette */}
      <div className="pointer-events-none sticky top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/30 to-transparent z-10" />

      <div className="p-5 md:p-7 min-h-full flex flex-col">
        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-sm bg-white/5 border border-white/5 flex flex-col justify-between p-4"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 mx-auto" />
                <div className="space-y-2 my-auto">
                  <div className="h-3 bg-white/10 rounded w-5/6" />
                  <div className="h-3 bg-white/10 rounded w-4/6" />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <div className="h-3 bg-white/10 rounded w-20" />
                  <div className="h-2 bg-white/10 rounded w-12" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="my-auto text-center py-12 px-4 space-y-3">
            <p className="text-rose-400 text-sm font-mono">{error}</p>
            <button
              onClick={() => fetchNotes()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 text-xs font-mono transition-colors"
            >
              <RefreshCw size={12} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && notes.length === 0 && (
          <div className="my-auto text-center py-12 px-4 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shadow-lg">
              <StickyNoteIcon size={30} className="text-amber-400/80" />
            </div>
            <div className="space-y-1.5 max-w-sm mx-auto">
              <h3 className="text-white/80 text-base font-semibold">
                No notes on the board yet
              </h3>
              <p className="text-white/40 text-xs font-mono">
                Be the first visitor to pin a note! Click &ldquo;Leave a note&rdquo; above to say hello.
              </p>
            </div>
            {onOpenComposer && (
              <button
                onClick={onOpenComposer}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 text-xs font-medium transition-all shadow-md active:scale-95"
              >
                <span>Write the first note ✏️</span>
              </button>
            )}
          </div>
        )}

        {/* Notes Grid */}
        {!loading && !error && notes.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
              {notes.map((note, index) => (
                <StickyNote
                  key={note.id}
                  note={note}
                  index={index}
                />
              ))}
            </div>

            {/* Load More Button */}
            {nextCursor && (
              <div className="mt-8 text-center pt-4 pb-2">
                <button
                  onClick={() => fetchNotes(nextCursor)}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono border border-white/10 transition-all disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Loading older notes…</span>
                    </>
                  ) : (
                    <span>Load older notes ↓</span>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom vignette */}
      <div className="pointer-events-none sticky bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/40 to-transparent z-10" />
    </div>
  );
}
