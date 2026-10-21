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
  StickyNote,
  Mail,
  FileText,
  ArrowDown,
} from "lucide-react";
import { Linkedin, Github, Notion, Figma } from "@/components/icons/BrandIcons";
import { SITE_CONFIG } from "@/lib/site-config";
import TerminalWindow from "./TerminalWindow";
import GuestbookWindow from "../guestbook/GuestbookWindow";

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  isDecorative?: boolean;
  isTerminal?: boolean;
  isResume?: boolean;
  isGuestbook?: boolean;
  download?: string;
  group: 1 | 2 | 3;
}

// Group 1: Tools I use (decorative Notion, Figma + interactive Terminal)
const GROUP_1_ITEMS: DockItem[] = [
  {
    id: "notion",
    icon: <Notion size={20} className="text-text-primary" />,
    label: "Notion · docs & PRDs",
    isDecorative: true,
    group: 1,
  },
  {
    id: "figma",
    icon: <Figma size={20} className="text-text-primary" />,
    label: "Figma · wireframes & flows",
    isDecorative: true,
    group: 1,
  },
  {
    id: "terminal",
    icon: <Terminal size={20} className="text-accent" />,
    label: "Terminal · explore OS",
    isTerminal: true,
    group: 1,
  },
];

// Group 2: Guestbook
const GROUP_2_ITEMS: DockItem[] = [
  {
    id: "guestbook",
    icon: <StickyNote size={20} className="text-amber-500 dark:text-amber-400" />,
    label: "Guestbook · leave me a note",
    isGuestbook: true,
    group: 2,
  },
];

// Group 3: Contact & Proof
const GROUP_3_ITEMS: DockItem[] = [
  {
    id: "linkedin",
    icon: <Linkedin size={20} className="text-text-primary" />,
    label: "LinkedIn",
    href: SITE_CONFIG.linkedinUrl,
    group: 3,
  },
  {
    id: "github",
    icon: <Github size={20} className="text-text-primary" />,
    label: "GitHub",
    href: SITE_CONFIG.githubUrl,
    group: 3,
  },
  {
    id: "email",
    icon: <Mail size={20} className="text-text-primary" />,
    label: "Email",
    href: `mailto:${SITE_CONFIG.contactEmail}`,
    group: 3,
  },
  {
    id: "resume",
    icon: (
      <span className="relative flex items-center justify-center group/res">
        <FileText size={20} className="text-text-primary" />
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

// Mobile quick links
const MOBILE_ITEMS = [
  GROUP_3_ITEMS[0], // LinkedIn
  GROUP_3_ITEMS[1], // GitHub
  GROUP_3_ITEMS[2], // Email
  GROUP_3_ITEMS[3], // Resume
];

interface DockButtonProps {
  item: DockItem;
  mouseX: MotionValue<number>;
  prefersReducedMotion: boolean;
  isOpen: boolean;
  onOpen: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

function DockButton({
  item,
  mouseX,
  prefersReducedMotion,
  isOpen,
  onOpen,
  triggerRef,
}: DockButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    if (prefersReducedMotion || !Number.isFinite(val)) return 200;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 200;
    return val - rect.x - rect.width / 2;
  });

  const targetScale = useTransform(distance, [-110, 0, 110], [1, 1.45, 1], {
    clamp: true,
  });
  const springScale = useSpring(targetScale, {
    mass: 0.1,
    stiffness: 280,
    damping: 18,
  });

  const y = useTransform(springScale, [1, 1.45], [0, -10], {
    clamp: true,
  });

  const activeScale = isFocused ? 1.4 : springScale;
  const activeY = isFocused ? -10 : y;

  const innerContent = (
    <motion.div
      ref={ref}
      style={{
        scale: prefersReducedMotion ? 1 : activeScale,
        y: prefersReducedMotion ? 0 : activeY,
      }}
      className="relative group"
    >
      <motion.div
        whileTap={{ scale: 0.88, y: -4 }}
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all ${
          item.isDecorative
            ? "cursor-default bg-surface/90 text-text-primary border border-border/80 shadow-xs"
            : item.isTerminal
            ? "cursor-pointer bg-surface/95 text-text-primary hover:text-accent border border-border/80 shadow-xs hover:border-accent/40"
            : "cursor-pointer bg-surface/95 text-text-primary hover:text-accent border border-border/80 shadow-xs hover:border-accent/40"
        } backdrop-blur-md`}
      >
        {item.icon}
      </motion.div>

      {/* Active Window Dot */}
      {isOpen && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
      )}

      {/* Tooltip Pill */}
      <div
        className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#16171A]/95 text-white backdrop-blur-md text-[11px] font-medium whitespace-nowrap pointer-events-none shadow-md border border-white/10 transition-all duration-200 ${
          isFocused
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
        }`}
      >
        {item.label}
      </div>
    </motion.div>
  );

  if (item.isDecorative) {
    return (
      <div
        tabIndex={0}
        role="img"
        aria-label={item.label}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl cursor-default"
      >
        {innerContent}
      </div>
    );
  }

  if (item.isTerminal || item.isGuestbook) {
    return (
      <button
        ref={triggerRef}
        type="button"
        onClick={onOpen}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label={item.label}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
      >
        {innerContent}
      </button>
    );
  }

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

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const terminalTriggerRef = useRef<HTMLButtonElement | null>(null);
  const guestbookTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Check prefers-reduced-motion & listen for external open-guestbook events
  useEffect(() => {
    try {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(media.matches);
    } catch {}

    const handleOpenGuestbook = () => setGuestbookOpen(true);
    window.addEventListener("open-guestbook", handleOpenGuestbook);
    return () => window.removeEventListener("open-guestbook", handleOpenGuestbook);
  }, []);

  const handleCloseTerminal = () => {
    setTerminalOpen(false);
    terminalTriggerRef.current?.focus();
  };

  const handleCloseGuestbook = () => {
    setGuestbookOpen(false);
    guestbookTriggerRef.current?.focus();
  };

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          DESKTOP DOCK (9 items in 3 groups with thin vertical dividers)
          ────────────────────────────────────────────────────────── */}
      <motion.div
        className="hidden md:flex justify-center absolute z-30"
        style={{
          bottom: "max(16px, env(safe-area-inset-bottom))",
          left: "50%",
          x: "-50%",
        }}
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
            {GROUP_1_ITEMS.map((item) => (
              <DockButton
                key={item.id}
                item={item}
                mouseX={mouseX}
                prefersReducedMotion={prefersReducedMotion}
                isOpen={item.isTerminal ? terminalOpen : false}
                onOpen={() => setTerminalOpen(true)}
                triggerRef={item.isTerminal ? terminalTriggerRef : undefined}
              />
            ))}
          </div>

          {/* Divider between Group 1 & Group 2 */}
          <div className="w-px h-6 bg-border-glass mx-1 self-center" aria-hidden="true" />

          {/* GROUP 2: Guestbook */}
          <div className="flex items-end gap-1.5" role="group" aria-label="Guestbook">
            {GROUP_2_ITEMS.map((item) => (
              <DockButton
                key={item.id}
                item={item}
                mouseX={mouseX}
                prefersReducedMotion={prefersReducedMotion}
                isOpen={guestbookOpen}
                onOpen={() => setGuestbookOpen(true)}
                triggerRef={guestbookTriggerRef}
              />
            ))}
          </div>

          {/* Divider between Group 2 & Group 3 */}
          <div className="w-px h-6 bg-border-glass mx-1 self-center" aria-hidden="true" />

          {/* GROUP 3: Contact & proof */}
          <div className="flex items-end gap-1.5" role="group" aria-label="Contact and proof">
            {GROUP_3_ITEMS.map((item) => (
              <DockButton
                key={item.id}
                item={item}
                mouseX={mouseX}
                prefersReducedMotion={prefersReducedMotion}
                isOpen={false}
                onOpen={() => {}}
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
          {MOBILE_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              download={item.download}
              aria-label={item.label}
              className="w-10 h-10 rounded-xl bg-surface/90 flex items-center justify-center text-text-primary active:scale-95 border border-border/80 shadow-xs"
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

      {/* ──────────────────────────────────────────────────────────
          GUESTBOOK WINDOW (Corkboard OS Window)
          ────────────────────────────────────────────────────────── */}
      <GuestbookWindow
        isOpen={guestbookOpen}
        onClose={handleCloseGuestbook}
      />
    </>
  );
}
