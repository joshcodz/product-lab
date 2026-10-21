"use client";

import { motion } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";

interface HeroHeadlineProps {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
}

export default function HeroHeadline({
  headline = "I don't need a translator between product and engineering.",
  subtext = "Third-year CS student making B2B SaaS products. I write PRDs and prototype my way out of Earth-616.",
  ctaLabel = "See my work",
  ctaUrl = "#work",
  secondaryLabel = "Book a chat",
  secondaryUrl = "#contact",
}: HeroHeadlineProps) {
  const headlineWords = headline.split(" ");

  return (
    <div className="relative md:absolute md:inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4 md:px-6 py-6 md:py-0">
      <div className="text-center max-w-4xl pointer-events-auto">
        {/* Main heading with text-wrap: balance and drawn underline for 'translator' */}
        <h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight mb-4 text-text-primary"
          style={{ textWrap: "balance" }}
        >
          {headlineWords.map((word, i) => {
            const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
            const isTranslator = cleanWord === "translator";

            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(10px)", y: 6 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.04, // staggered 40ms as specified in Step 7
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block mr-[0.26em] relative ${
                  isTranslator ? "text-accent font-extrabold" : ""
                }`}
              >
                {word}
                {isTranslator && (
                  <motion.svg
                    viewBox="0 0 100 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-1.5 left-0 w-full h-3 overflow-visible pointer-events-none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      delay: 0.2 + i * 0.04 + 0.4, // draws in immediately after word reveal
                      duration: 0.7,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <motion.path
                      d="M2 9C25 4 75 3 98 8"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      className="text-accent"
                    />
                  </motion.svg>
                )}
              </motion.span>
            );
          })}
        </h1>

        {/* Subtitle: Sentence case, max-width about 52ch, muted-token color */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-text-secondary mx-auto mb-6 leading-relaxed"
          style={{ maxWidth: "52ch", textWrap: "pretty" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        >
          {subtext}
        </motion.p>

        {/* CTA Buttons: shine sweep on hover, arrow nudges down 2px, press scale 0.97 */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5, ease: "easeOut" }}
        >
          {/* Primary CTA with shine sweep */}
          <motion.a
            href={ctaUrl}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-white font-medium text-sm transition-all shadow-md hover:shadow-glow overflow-hidden cursor-pointer"
          >
            {/* Shine sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

            <span>{ctaLabel}</span>
            <ArrowDown
              size={15}
              className="group-hover:translate-y-0.5 transition-transform duration-200"
            />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href={secondaryUrl}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass font-medium text-sm text-text-primary hover:bg-surface/85 transition-all shadow-sm cursor-pointer"
          >
            <Calendar size={15} />
            <span>{secondaryLabel}</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
