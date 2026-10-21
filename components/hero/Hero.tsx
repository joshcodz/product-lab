"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import MenuBar from "./MenuBar";
import WallpaperBlobs from "./WallpaperBlobs";
import HeroHeadline from "./HeroHeadline";
import DesktopFolder, { PLACEHOLDER_FOLDERS, FolderData } from "./DesktopFolder";
import ProjectDrawer from "./ProjectDrawer";
import Dock from "./Dock";
import BootSequence from "./BootSequence";
import ClockWeatherWidget from "./widgets/ClockWeatherWidget";
import BuildingWidget from "./widgets/BuildingWidget";
import MusicWidget from "./widgets/MusicWidget";
import PhotoWidget from "./widgets/PhotoWidget";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  config?: Record<string, string>;
}

export default function Hero({ config = {} }: HeroProps) {
  const [booted, setBooted] = useState(false);
  const [scrollCueVisible, setScrollCueVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<FolderData | null>(null);

  // Cursor Parallax & Spotlight state throttled via requestAnimationFrame
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // Decoupled, softened micro-parallax per widget (2–3.5px) with natural perspective depth
  const photoParallaxX = useTransform(springX, [-1, 1], [-3.5, 3.5]);
  const photoParallaxY = useTransform(springY, [-1, 1], [-3, 3]);

  const clockParallaxX = useTransform(springX, [-1, 1], [3, -3]);
  const clockParallaxY = useTransform(springY, [-1, 1], [-2.5, 2.5]);

  const musicParallaxX = useTransform(springX, [-1, 1], [-2.5, 2.5]);
  const musicParallaxY = useTransform(springY, [-1, 1], [3, -3]);

  const buildingParallaxX = useTransform(springX, [-1, 1], [2, -2]);
  const buildingParallaxY = useTransform(springY, [-1, 1], [2, -2]);

  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Detect reduced motion & tab visibility
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const mqHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", mqHandler);

    const onVisibilityChange = () => {
      setTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onScroll = () => setScrollCueVisible(window.scrollY <= 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", mqHandler);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Cursor move handler with requestAnimationFrame throttling
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const normX = (clientX / window.innerWidth) * 2 - 1;
        const normY = (clientY / window.innerHeight) * 2 - 1;
        mouseX.set(normX);
        mouseY.set(normY);
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(600px circle at ${clientX}px ${clientY}px, rgba(45, 212, 191, 0.06), transparent 80%)`;
        }
      });
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between overflow-hidden wallpaper grain select-none"
    >
      {/* Boot sequence intro (runs once per session) */}
      <BootSequence onComplete={() => setBooted(true)} />

      {/* Top macOS-style Menu Bar */}
      <MenuBar
        statusBadge={config.status_badge}
        statusHeadline={config.status_headline || "Josh's Product Lab"}
      />

      {/* Ambient moving gradient blobs with Parallax */}
      <WallpaperBlobs />

      {/* Radial spotlight following cursor (~6% opacity, disabled on reduced motion) */}
      {!prefersReducedMotion && (
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 z-15 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at -500px -500px, rgba(45, 212, 191, 0.06), transparent 80%)`,
          }}
        />
      )}

      {/* ──────────────────────────────────────────────────────────
          DESKTOP VIEW (hidden on small screens, shown md and above)
          100dvh height, widgets collapse when viewport height < 760px
          ────────────────────────────────────────────────────────── */}
      <div className="hidden md:block relative w-full h-[calc(100dvh-2rem)] mt-8 pb-24 px-8 overflow-hidden">
        {/* Left column folders */}
        <div className="absolute top-12 left-8 z-20 flex flex-col gap-4">
          {PLACEHOLDER_FOLDERS.slice(0, 3).map((folder, idx) => (
            <DesktopFolder
              key={folder.id}
              folder={folder}
              index={idx}
              onOpen={setSelectedFolder}
            />
          ))}
        </div>

        {/* Right column folders */}
        <div className="absolute top-12 right-8 z-20 flex flex-col gap-4">
          {PLACEHOLDER_FOLDERS.slice(3, 6).map((folder, idx) => (
            <DesktopFolder
              key={folder.id}
              folder={folder}
              index={idx + 3}
              onOpen={setSelectedFolder}
            />
          ))}
        </div>

        {/* ── Widgets with Ambient Float & Cursor Parallax ── */}

        {/* Top-Left: Photo Card with 3D tilt */}
        <motion.div
          style={
            prefersReducedMotion
              ? {}
              : { x: photoParallaxX, y: photoParallaxY }
          }
          animate={
            !prefersReducedMotion && tabVisible
              ? { y: [0, -3, 0] }
              : { y: 0 }
          }
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          className="absolute top-12 left-36 2xl:left-48 z-20"
        >
          <PhotoWidget />
        </motion.div>

        {/* Top-Right: Merged Clock & Weather Widget */}
        <motion.div
          style={
            prefersReducedMotion
              ? {}
              : { x: clockParallaxX, y: clockParallaxY }
          }
          animate={
            !prefersReducedMotion && tabVisible
              ? { y: [0, 3, 0] }
              : { y: 0 }
          }
          transition={{
            repeat: Infinity,
            duration: 9.5,
            ease: "easeInOut",
            delay: 1.2,
          }}
          className="absolute top-12 right-36 2xl:right-48 z-20"
        >
          <ClockWeatherWidget />
        </motion.div>

        {/* Bottom-Left: Refined Music Widget (collapsed if height < 760px) */}
        <motion.div
          style={
            prefersReducedMotion
              ? {}
              : { x: musicParallaxX, y: musicParallaxY }
          }
          animate={
            !prefersReducedMotion && tabVisible
              ? { y: [0, -2.5, 0] }
              : { y: 0 }
          }
          transition={{
            repeat: Infinity,
            duration: 8.5,
            ease: "easeInOut",
            delay: 2.2,
          }}
          className="hidden [@media(min-height:760px)]:block absolute bottom-24 left-10 2xl:left-16 z-20"
        >
          <MusicWidget />
        </motion.div>

        {/* Bottom-Right: Currently Building Widget (collapsed if height < 760px) */}
        <motion.div
          style={
            prefersReducedMotion
              ? {}
              : { x: buildingParallaxX, y: buildingParallaxY }
          }
          animate={
            !prefersReducedMotion && tabVisible
              ? { y: [0, 2.5, 0] }
              : { y: 0 }
          }
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 1.8,
          }}
          className="hidden [@media(min-height:760px)]:block absolute bottom-24 right-10 2xl:right-16 z-20"
        >
          <BuildingWidget
            projectName={config.currently_building}
            status="In Development"
            update="Polishing desktop OS interface & shipping interactive case studies."
          />
        </motion.div>

        {/* Center Headline */}
        <HeroHeadline
          headline={config.hero_headline}
          subtext={config.hero_subtext}
          ctaLabel={config.hero_cta_label}
          ctaUrl={config.hero_cta_url}
          secondaryLabel={config.hero_secondary_label}
          secondaryUrl={config.hero_secondary_url}
        />

        {/* Centered Desktop Dock */}
        <Dock />
      </div>

      {/* ──────────────────────────────────────────────────────────
          MOBILE VIEW (screen width < 768px: clean mobile OS layout)
          Headline first, 2/3-col folder grid, horizontal swipe row
          ────────────────────────────────────────────────────────── */}
      <div className="block md:hidden w-full pt-14 pb-28 px-4 flex flex-col items-center">
        {/* Headline */}
        <div className="w-full mb-6 pt-2">
          <HeroHeadline
            headline={config.hero_headline}
            subtext={config.hero_subtext}
            ctaLabel={config.hero_cta_label}
            ctaUrl={config.hero_cta_url}
            secondaryLabel={config.hero_secondary_label}
            secondaryUrl={config.hero_secondary_url}
          />
        </div>

        {/* Mobile Folder Grid (3 columns) */}
        <div className="w-full mb-6">
          <p className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-3 text-center">
            Case Studies &amp; Projects
          </p>
          <div className="grid grid-cols-3 gap-2.5 justify-items-center">
            {PLACEHOLDER_FOLDERS.map((folder, idx) => (
              <DesktopFolder
                key={folder.id}
                folder={folder}
                index={idx}
                onOpen={setSelectedFolder}
              />
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Swipe Row for Widgets */}
        <div className="w-full mb-6">
          <p className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-3 text-center">
            Live Widgets
          </p>
          <div className="flex gap-3.5 overflow-x-auto pb-4 pt-1 px-2 no-scrollbar snap-x snap-mandatory">
            <div className="snap-center shrink-0">
              <ClockWeatherWidget />
            </div>
            <div className="snap-center shrink-0">
              <BuildingWidget
                projectName={config.currently_building}
                status="In Development"
              />
            </div>
            <div className="snap-center shrink-0">
              <MusicWidget />
            </div>
            <div className="snap-center shrink-0">
              <PhotoWidget />
            </div>
          </div>
        </div>

        {/* Mobile bottom dock is rendered inside <Dock /> itself */}
      </div>

      {/* Scroll-to-explore cue — centered above dock, fades on scroll */}
      <div
        className="hidden md:flex flex-col items-center absolute z-25 pointer-events-none transition-opacity duration-500"
        style={{
          bottom: "max(84px, calc(env(safe-area-inset-bottom) + 68px))",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: scrollCueVisible ? 1 : 0,
        }}
      >
        <span className="text-[11px] font-mono text-text-secondary tracking-wide mb-1 px-2.5 py-0.5 rounded-full bg-surface/60 backdrop-blur-xs border border-border-glass">
          Scroll to explore
        </span>
        <ChevronDown
          size={16}
          className="text-text-secondary animate-bounce-slow"
        />
      </div>

      {/* Project Dossier Drawer (slides in from right) */}
      <AnimatePresence>
        {selectedFolder && (
          <ProjectDrawer
            folder={selectedFolder}
            allFolders={PLACEHOLDER_FOLDERS}
            onClose={() => setSelectedFolder(null)}
            onSelectFolder={setSelectedFolder}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
