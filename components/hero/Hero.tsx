"use client";

import { useState } from "react";
import MenuBar from "./MenuBar";
import WallpaperBlobs from "./WallpaperBlobs";
import HeroHeadline from "./HeroHeadline";
import DesktopFolder, { PLACEHOLDER_FOLDERS } from "./DesktopFolder";
import Dock from "./Dock";
import BootSequence from "./BootSequence";
import ClockWidget from "./widgets/ClockWidget";
import WeatherWidget from "./widgets/WeatherWidget";
import MusicWidget from "./widgets/MusicWidget";
import PhotoWidget from "./widgets/PhotoWidget";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  config?: Record<string, string>;
}

export default function Hero({ config = {} }: HeroProps) {
  const [booted, setBooted] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden wallpaper grain select-none"
    >
      {/* Boot sequence intro (runs once per session) */}
      <BootSequence onComplete={() => setBooted(true)} />

      {/* Top macOS-style Menu Bar */}
      <MenuBar
        statusBadge={config.status_badge}
        statusHeadline={config.status_headline}
      />

      {/* Ambient moving gradient blobs */}
      <WallpaperBlobs />

      {/* ──────────────────────────────────────────────────────────
          DESKTOP VIEW (hidden on small screens, shown md and above)
          ────────────────────────────────────────────────────────── */}
      <div className="hidden md:block relative w-full h-screen pt-12 pb-24 px-8 overflow-hidden">
        {/* Left column folders */}
        <div className="absolute top-16 left-8 z-20 flex flex-col gap-5">
          {PLACEHOLDER_FOLDERS.slice(0, 3).map((folder, idx) => (
            <DesktopFolder key={folder.id} folder={folder} index={idx} />
          ))}
        </div>

        {/* Right column folders */}
        <div className="absolute top-16 right-8 z-20 flex flex-col gap-5">
          {PLACEHOLDER_FOLDERS.slice(3, 6).map((folder, idx) => (
            <DesktopFolder key={folder.id} folder={folder} index={idx + 3} />
          ))}
        </div>

        {/* Widgets scattered with drag capabilities */}
        {/* Clock widget: top right, near folders */}
        <div className="absolute top-16 right-36 2xl:right-48 z-20">
          <ClockWidget />
        </div>

        {/* Photo widget: top left, near folders */}
        <div className="absolute top-16 left-36 2xl:left-48 z-20">
          <PhotoWidget />
        </div>

        {/* Music widget: bottom left */}
        <div className="absolute bottom-24 left-10 2xl:left-16 z-20">
          <MusicWidget />
        </div>

        {/* Weather widget: bottom right */}
        <div className="absolute bottom-24 right-10 2xl:right-16 z-20">
          <WeatherWidget />
        </div>

        {/* Center Headline */}
        <HeroHeadline
          headline={config.hero_headline}
          subtext={config.hero_subtext}
          ctaLabel={config.hero_cta_label}
          ctaUrl={config.hero_cta_url}
          secondaryLabel={config.hero_secondary_label}
          secondaryUrl={config.hero_secondary_url}
        />

        {/* Dock at bottom center */}
        <Dock />
      </div>

      {/* ──────────────────────────────────────────────────────────
          MOBILE VIEW (4f from spec: separate layout, headline first,
          2-col folders, swipeable widget row, fixed bottom dock)
          ────────────────────────────────────────────────────────── */}
      <div className="block md:hidden w-full pt-16 pb-28 px-4 flex flex-col items-center">
        {/* Headline */}
        <div className="w-full mb-8 pt-4">
          <HeroHeadline
            headline={config.hero_headline}
            subtext={config.hero_subtext}
            ctaLabel={config.hero_cta_label}
            ctaUrl={config.hero_cta_url}
            secondaryLabel={config.hero_secondary_label}
            secondaryUrl={config.hero_secondary_url}
          />
        </div>

        {/* Mobile Folder Grid (2 columns) */}
        <div className="w-full mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-3 text-center">
            Case Studies &amp; Work
          </p>
          <div className="grid grid-cols-3 gap-3 justify-items-center">
            {PLACEHOLDER_FOLDERS.map((folder, idx) => (
              <DesktopFolder key={folder.id} folder={folder} index={idx} />
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Swipe Row for Widgets */}
        <div className="w-full mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-text-tertiary mb-3 text-center">
            Live Widgets
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-2 no-scrollbar snap-x snap-mandatory">
            <div className="snap-center shrink-0">
              <ClockWidget />
            </div>
            <div className="snap-center shrink-0">
              <WeatherWidget />
            </div>
            <div className="snap-center shrink-0">
              <MusicWidget />
            </div>
            <div className="snap-center shrink-0">
              <PhotoWidget />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Dock */}
        <div className="fixed bottom-3 left-0 right-0 z-40 flex justify-center px-4">
          <Dock />
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="hidden md:flex absolute bottom-4 left-6 z-20 items-center gap-1.5 text-[11px] font-mono text-text-tertiary animate-pulse pointer-events-none">
        <ArrowDown size={13} />
        <span>Scroll to explore superpowers</span>
      </div>
    </section>
  );
}
