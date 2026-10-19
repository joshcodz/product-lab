import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Fonts ─────────────────────────────────────────────── */
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      /* ── Colors (all reference CSS vars for light/dark) ──── */
      colors: {
        bg: {
          DEFAULT: "var(--color-bg)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          inverted: "var(--color-text-inverted)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          light: "var(--color-accent-light)",
          muted: "var(--color-accent-muted)",
        },
        peach: {
          DEFAULT: "var(--color-peach)",
          muted: "var(--color-peach-muted)",
        },
        lavender: {
          DEFAULT: "var(--color-lavender)",
          muted: "var(--color-lavender-muted)",
        },
        mint: {
          DEFAULT: "var(--color-mint)",
          muted: "var(--color-mint-muted)",
        },
        sky: {
          DEFAULT: "var(--color-sky)",
          muted: "var(--color-sky-muted)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          light: "var(--color-border-light)",
          glass: "var(--color-border-glass)",
        },
      },

      /* ── Border Radius ─────────────────────────────────────── */
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        icon: "var(--radius-icon)",
      },

      /* ── Box Shadows ───────────────────────────────────────── */
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
      },

      /* ── Spacing (extend, not override) ────────────────────── */
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      /* ── Max Width ─────────────────────────────────────────── */
      maxWidth: {
        content: "1200px",
      },

      /* ── Transition ────────────────────────────────────────── */
      transitionTimingFunction: {
        spring: "var(--ease-spring)",
        smooth: "var(--ease-smooth)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },

      /* ── Animations ────────────────────────────────────────── */
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3) translateY(20px)" },
          "50%": { transform: "scale(1.05) translateY(-4px)" },
          "70%": { transform: "scale(0.98) translateY(1px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s var(--ease-smooth) forwards",
        "slide-up": "slide-up 0.5s var(--ease-spring) forwards",
        "slide-down": "slide-down 0.3s var(--ease-smooth) forwards",
        "scale-in": "scale-in 0.3s var(--ease-spring) forwards",
        wiggle: "wiggle 0.4s var(--ease-spring)",
        "spin-slow": "spin-slow 8s linear infinite",
        marquee: "marquee 30s linear infinite",
        "bounce-in": "bounce-in 0.5s var(--ease-spring) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
