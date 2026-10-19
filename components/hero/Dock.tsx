"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Terminal,
  Sparkles,
  Mail,
  FileText,
  ArrowDown,
} from "lucide-react";
import { Linkedin, Github, Notion, Figma, ChatGPT } from "@/components/icons/BrandIcons";
import { SITE_CONFIG, AI_PROMPT } from "@/lib/site-config";
import TerminalWindow from "./TerminalWindow";

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  isDecorative?: boolean;
  isTerminal?: boolean;
  isResume?: boolean;
  isClaude?: boolean;
  download?: string;
  group: 1 | 2 | 3;
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [hasVisitedPrompt, setHasVisitedPrompt] = useState(true);
  const [showClaudePulse, setShowClaudePulse] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const terminalTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Check prefers-reduced-motion & first visit sessionStorage hint
  useEffect(() => {
    try {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(media.matches);

      const visited = sessionStorage.getItem("jpl_claude_hint_seen");
      if (!visited && !media.matches) {
        setHasVisitedPrompt(false);
        // Trigger subtle pulse & tooltip after dock entrance completes (~1.4s)
        const timer = setTimeout(() => {
          setShowClaudePulse(true);
          try {
            sessionStorage.setItem("jpl_claude_hint_seen", "true");
          } catch {}

          // Auto-hide after 2.5s
          setTimeout(() => {
            setShowClaudePulse(false);
            setHasVisitedPrompt(true);
          }, 2500);
        }, 1400);

        return () => clearTimeout(timer);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const handleCloseTerminal = () => {
    setTerminalOpen(false);
    terminalTriggerRef.current?.focus();
  };

  // Group 1: Tools I use (decorative Notion, Figma + interactive Terminal)
  const group1Items: DockItem[] = [
    {
      id: "notion",
      icon: <Notion size={20} />,
      label: "Notion · docs & PRDs",
      isDecorative: true,
      group: 1,
    },
    {
      id: "figma",
      icon: <Figma size={20} />,
      label: "Figma · wireframes & flows",
      isDecorative: true,
      group: 1,
    },
    {
      id: "terminal",
      icon: <Terminal size={20} />,
      label: "Terminal · explore OS",
      isTerminal: true,
      group: 1,
    },
  ];

  // Group 2: Ask AI about me
  const group2Items: DockItem[] = [
    {
      id: "claude",
      icon: <Sparkles size={20} className="text-amber-500" />,
      label: showClaudePulse ? "Ask AI about me" : "Ask Claude about me",
      href: `https://claude.ai/new?q=${encodeURIComponent(AI_PROMPT)}`,
      isClaude: true,
      group: 2,
    },
    {
      id: "chatgpt",
      icon: <ChatGPT size={20} className="text-emerald-500" />,
      label: "Ask ChatGPT about me",
      href: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}`,
      group: 2,
    },
  ];

  // Group 3: Contact & Proof
  const group3Items: DockItem[] = [
    {
      id: "linkedin",
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: SITE_CONFIG.linkedinUrl,
      group: 3,
    },
    {
      id: "github",
      icon: <Github size={20} />,
      label: "GitHub",
      href: SITE_CONFIG.githubUrl,
      group: 3,
    },
    {
      id: "email",
      icon: <Mail size={20} />,
      label: "Email",
      href: `mailto:${SITE_CONFIG.contactEmail}`,
      group: 3,
    },
    {
      id: "resume",
      icon: (
        <span className="relative flex items-center justify-center group/res">
          <FileText size={20} />
          <ArrowDown
            size={9}
            className="absolute -bottom-1 -right-1 text-accent transition-transform duration-300 group-hover/res:translate-y-0.5 group-hover/res:text-text-primary"
          />
        </span>
      ),
      label: "Resume (PDF)",
      href: SITE_CONFIG.resumePath,
      download: "Josh_Resume.pdf",
      isResume: true,
      group: 3,
    },
  ];

  const allItems = [...group1Items, ...group2Items, ...group3Items];

  function DockButton({ item, index }: { item: DockItem; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const distance = useTransform(mouseX, (val) => {
      if (prefersReducedMotion) return 150;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return 150;
      return val - rect.x - rect.width / 2;
    });

    const targetScale = useTransform(distance, [-110, 0, 110], [1, 1.45, 1]);
    const springScale = useSpring(targetScale, {
      mass: 0.1,
      stiffness: 280,
      damping: 18,
    });

    const y = useTransform(springScale, [1, 1.45], [0, -10]);

    const activeScale = isFocused ? 1.4 : springScale;
    const activeY = isFocused ? -10 : y;

    const isPulseItem = item.isClaude && showClaudePulse;

    const innerContent = (
      <motion.div
        ref={ref}
        style={{
          scale: prefersReducedMotion ? 1 : activeScale,
          y: prefersReducedMotion ? 0 : activeY,
        }}
        className="relative group"
        initial={{ opacity: 0, y: 16, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.8 + index * 0.04,
        }}
      >
        {/* Soft glowing hint ring on Claude first visit */}
        {isPulseItem && (
          <span className="absolute -inset-1 rounded-2xl bg-amber-400/40 animate-ping pointer-events-none" />
        )}

        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all ${
            item.isDecorative
              ? "cursor-default bg-surface/75 text-text-secondary border border-border-glass shadow-xs"
              : item.isTerminal
              ? "cursor-pointer bg-surface/85 text-text-primary hover:text-accent border border-border-glass shadow-xs active:scale-95"
              : "cursor-pointer bg-surface/85 text-text-primary hover:text-accent border border-border-glass shadow-xs active:scale-95"
          } backdrop-blur-md`}
        >
          {item.icon}
        </div>

        {/* Tooltip Pill */}
        <div
          className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#16171A]/95 text-white backdrop-blur-md text-[11px] font-medium whitespace-nowrap pointer-events-none shadow-md border border-white/10 transition-all duration-200 ${
            isPulseItem || isFocused
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
          }`}
        >
          {item.label}
        </div>
      </motion.div>
    );

    // Decorative items (Notion, Figma) — cursor default, no click
    if (item.isDecorative) {
      return (
        <div
          tabIndex={0}
          role="img"
          aria-label={item.label}
          aria-hidden="false"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl cursor-default"
        >
          {innerContent}
        </div>
      );
    }

    // Terminal interactive button
    if (item.isTerminal) {
      return (
        <button
          ref={terminalTriggerRef}
          type="button"
          onClick={() => setTerminalOpen(true)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label={item.label}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
        >
          {innerContent}
        </button>
      );
    }

    // Anchor items
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        download={item.download}
        aria-label={item.label}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
      >
        {innerContent}
      </a>
    );
  }

  // Mobile fixed items (Claude, LinkedIn, GitHub, Email, Resume)
  const mobileItems = [
    group2Items[0], // Claude
    group3Items[0], // LinkedIn
    group3Items[1], // GitHub
    group3Items[2], // Email
    group3Items[3], // Resume
  ];

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          DESKTOP DOCK (9 items in 3 groups with thin vertical dividers)
          ────────────────────────────────────────────────────────── */}
      <motion.div
        className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
        initial={{ y: 35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 22 }}
      >
        <nav
          aria-label="Applications dock"
          className="flex items-end gap-1.5 px-3 py-2 rounded-2xl glass-heavy border border-border-glass shadow-xl"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {/* GROUP 1: Tools I use */}
          <div className="flex items-end gap-1.5" role="group" aria-label="Tools I use">
            {group1Items.map((item, i) => (
              <DockButton key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* Divider between Group 1 & Group 2 */}
          <div className="w-px h-6 bg-border-glass mx-1 self-center" aria-hidden="true" />

          {/* GROUP 2: Ask AI about me */}
          <div className="flex items-end gap-1.5" role="group" aria-label="Ask AI about me">
            {group2Items.map((item, i) => (
              <DockButton key={item.id} item={item} index={group1Items.length + i} />
            ))}
          </div>

          {/* Divider between Group 2 & Group 3 */}
          <div className="w-px h-6 bg-border-glass mx-1 self-center" aria-hidden="true" />

          {/* GROUP 3: Contact & proof */}
          <div className="flex items-end gap-1.5" role="group" aria-label="Contact and proof">
            {group3Items.map((item, i) => (
              <DockButton
                key={item.id}
                item={item}
                index={group1Items.length + group2Items.length + i}
              />
            ))}
          </div>
        </nav>
      </motion.div>

      {/* ──────────────────────────────────────────────────────────
          MOBILE DOCK (Fixed bottom, 5 items, safe-area-inset-bottom)
          ────────────────────────────────────────────────────────── */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 flex justify-center pointer-events-none">
        <nav
          aria-label="Mobile quick links"
          className="flex items-center gap-2 px-3 py-2 rounded-2xl glass-heavy border border-border-glass shadow-xl pointer-events-auto"
        >
          {mobileItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              download={item.download}
              aria-label={item.label}
              className="w-10 h-10 rounded-xl bg-surface/80 flex items-center justify-center text-text-primary active:scale-95 border border-border-glass"
            >
              {item.icon}
            </a>
          ))}
        </nav>
      </div>

      {/* ──────────────────────────────────────────────────────────
          INTERACTIVE TERMINAL WINDOW (Draggable OS Window)
          ────────────────────────────────────────────────────────── */}
      <TerminalWindow
        isOpen={terminalOpen}
        onClose={handleCloseTerminal}
        onNavigate={(slug) => {
          setTerminalOpen(false);
          window.location.href = `/work/${slug}`;
        }}
      />
    </>
  );
}
