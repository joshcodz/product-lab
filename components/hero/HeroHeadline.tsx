"use client";

import { motion } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";

const words = [
  "I'm",
  "Josh.",
  "I'm",
  "building",
  "toward",
  "product",
  "leadership",
  "at",
  "B2B SaaS",
  "&",
  "dev tools",
  "startups.",
];

const wordVariants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      delay: 0.6 + i * 0.07,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

interface HeroHeadlineProps {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
}

export default function HeroHeadline({
  headline = "I'm Josh. I'm building toward product leadership at B2B SaaS & dev tools startups.",
  subtext = "I turn messy user problems into shipped products — and I build the prototypes myself.",
  ctaLabel = "See my work",
  ctaUrl = "#work",
  secondaryLabel = "Book a chat",
  secondaryUrl = "#contact",
}: HeroHeadlineProps) {
  const headlineWords = headline.split(" ");

  return (
    <div className="relative md:absolute md:inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4 md:px-6 py-6 md:py-0">
      <div className="text-center max-w-4xl pointer-events-auto">
        {/* Main heading — word-by-word blur reveal */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight mb-4">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className={`inline-block mr-[0.26em] ${
                ["B2B", "SaaS", "SaaS,", "&", "dev", "tools"].includes(
                  word.replace(/[.,]/g, "")
                )
                  ? "text-accent"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-text-secondary max-w-lg mx-auto mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
        >
          {subtext}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5, ease: "easeOut" }}
        >
          <a
            href={ctaUrl}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-text-inverted font-medium text-sm hover:bg-accent-hover transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            {ctaLabel}
            <ArrowDown size={15} />
          </a>
          <a
            href={secondaryUrl}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-medium text-sm text-text-primary hover:bg-surface/80 transition-all hover:-translate-y-0.5"
          >
            <Calendar size={15} />
            {secondaryLabel}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
