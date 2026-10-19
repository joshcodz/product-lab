"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, MessageSquare, Newspaper, Sparkles } from "lucide-react";

interface MarqueeItem {
  id: string;
  source: string;
  type: "Blog" | "Teardown" | "LinkedIn" | "Feature";
  headline: string;
  url: string;
  date: string;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  {
    id: "1",
    source: "Product Teardowns",
    type: "Teardown",
    headline: "Linear vs Jira: Why speed and keyboard-first design won the engineering mindshare",
    url: "https://linkedin.com/in/joshcodz",
    date: "Feb 2026",
  },
  {
    id: "2",
    source: "Founders Club SRMIST",
    type: "Feature",
    headline: "Building 0→1 products in college: Student founder spotlight with Josh",
    url: "https://foundersclubsrm.com",
    date: "Jan 2026",
  },
  {
    id: "3",
    source: "Substack / Blog",
    type: "Blog",
    headline: "The Anatomy of 5-Minute SaaS Onboarding: How to cut cognitive fatigue by 40%",
    url: "https://linkedin.com/in/joshcodz",
    date: "Dec 2025",
  },
  {
    id: "4",
    source: "LinkedIn Deep-Dive",
    type: "LinkedIn",
    headline: "Why modern PMs must know how to prototype: bridging the spec-to-ship divide",
    url: "https://linkedin.com/in/joshcodz",
    date: "Nov 2025",
  },
  {
    id: "5",
    source: "Dev Tools Weekly",
    type: "Feature",
    headline: "Zenos: Real-time collaborative workspace built in 48 hours featured in builder showcase",
    url: "https://github.com/joshcodz",
    date: "Oct 2025",
  },
];

export default function RecognitionMarquee() {
  if (MARQUEE_ITEMS.length === 0) return null;

  // Duplicate for seamless infinite loop
  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="py-14 bg-bg border-y border-border-glass overflow-hidden relative select-none">
      <div className="container-content mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">
            In the Wild &amp; Published Writing
          </span>
        </div>
        <span className="text-[11px] font-mono text-text-tertiary">
          Hover to pause
        </span>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full overflow-hidden flex">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-5 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {repeatedItems.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-80 sm:w-96 p-5 rounded-2xl glass border border-border-glass hover:border-accent/40 transition-all group flex flex-col justify-between hover-lift shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2 text-text-tertiary">
                  <span className="font-semibold text-accent flex items-center gap-1.5">
                    {item.type === "Teardown" && <BookOpen size={12} />}
                    {item.type === "LinkedIn" && <MessageSquare size={12} />}
                    {item.type === "Blog" && <Newspaper size={12} />}
                    {item.source}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                  {item.headline}
                </h4>
              </div>

              <div className="flex items-center gap-1 text-xs font-medium text-accent mt-4 pt-3 border-t border-border-glass">
                <span>Read article</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
