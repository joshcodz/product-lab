import { Inter, JetBrains_Mono, Bricolage_Grotesque, Caveat } from "next/font/google";

/**
 * Display font — Bricolage Grotesque
 * Distinctive, geometric, modern, slightly playful — perfect for headlines.
 */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["Georgia", "serif"],
});

/**
 * Body / UI font — Inter
 * Clean, highly readable at all sizes.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/**
 * Monospace font — JetBrains Mono
 * Used for the about-me.txt window, stat labels, and code blocks.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["Menlo", "monospace"],
});

/**
 * Handwriting font — Caveat
 * Warm, expressive, natural handwriting font for sticky notes.
 */
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
  fallback: ["cursive"],
});
