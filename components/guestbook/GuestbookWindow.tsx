"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, X, Minus, PenLine } from "lucide-react";
import Corkboard from "./Corkboard";
import Composer from "./Composer";

interface GuestbookWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * macOS-style glass window for the Guestbook corkboard.
 */
export default function GuestbookWindow({
  isOpen,
  onClose,
}: GuestbookWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Reset composer when window closes
  useEffect(() => {
    if (!isOpen) setComposerOpen(false);
  }, [isOpen]);

  // ESC to close + focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        if (composerOpen) {
          setComposerOpen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, composerOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Window */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 pointer-events-none md:p-6">
            <motion.div
              ref={windowRef}
              drag
              dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
              dragElastic={0.08}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-full max-w-3xl h-[540px] max-h-[85vh] bg-[#121316]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto select-none"
              role="dialog"
              aria-modal="true"
              aria-label="Guestbook Window"
            >
              {/* macOS Window Chrome Header */}
              <div className="h-10 bg-white/5 border-b border-white/10 px-4 flex items-center justify-between cursor-grab active:cursor-grabbing shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 flex items-center justify-center group"
                    aria-label="Close guestbook"
                  >
                    <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 flex items-center justify-center group"
                    aria-label="Minimize guestbook"
                  >
                    <Minus size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                  <div
                    className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110"
                    aria-label="Maximize"
                  />
                </div>

                <div className="text-xs font-mono font-medium text-white/60 flex items-center gap-1.5 pointer-events-none">
                  <StickyNote size={12} className="text-amber-400" />
                  <span>guestbook.corkboard</span>
                </div>

                {/* Leave a note button */}
                <button
                  onClick={() => setComposerOpen(!composerOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    composerOpen
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10"
                  }`}
                  aria-label={composerOpen ? "Cancel writing" : "Leave a note"}
                >
                  <PenLine size={11} />
                  <span className="hidden sm:inline">{composerOpen ? "Cancel" : "Leave a note"}</span>
                </button>
              </div>

              {/* Composer panel (slides in from top when open) */}
              <AnimatePresence>
                {composerOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="overflow-hidden border-b border-white/10 shrink-0"
                  >
                    <Composer
                      onSuccess={() => {
                        setComposerOpen(false);
                        setRefreshTrigger((prev) => prev + 1);
                      }}
                      onCancel={() => setComposerOpen(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Corkboard body */}
              <Corkboard
                onOpenComposer={() => setComposerOpen(true)}
                refreshTrigger={refreshTrigger}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
