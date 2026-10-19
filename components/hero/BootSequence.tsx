"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [phase, setPhase] = useState<"logo" | "done">("logo");

  useEffect(() => {
    setIsMounted(true);
    // Check if already shown this session
    if (typeof window !== "undefined" && sessionStorage.getItem("jpl-booted")) {
      setPhase("done");
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setPhase("done");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("jpl-booted", "true");
      }
      setTimeout(onComplete, 300);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Skip on click/keypress
  const skip = () => {
    setPhase("done");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("jpl-booted", "true");
    }
    setTimeout(onComplete, 100);
  };

  // Safe SSR & session check
  if (!isMounted || phase === "done") return null;

  return (
    <AnimatePresence>
      {phase === "logo" && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg cursor-pointer"
          onClick={skip}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") skip();
          }}
          tabIndex={0}
          role="button"
          aria-label="Skip loading animation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-glow">
              <span className="font-display text-2xl font-bold text-text-inverted">
                J
              </span>
            </div>
            <motion.p
              className="text-sm font-mono text-text-tertiary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              josh&apos;s product lab
            </motion.p>

            {/* Loading bar */}
            <div className="w-32 h-0.5 bg-border rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-8 text-xs text-text-tertiary font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            click anywhere to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
