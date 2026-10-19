"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, FileText } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Achievements", href: "#achievements" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Show navbar after scrolling past the hero (100vh)
  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: detect which section is currently visible
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── Sticky Nav Bar ──────────────────────────────────── */}
      <AnimatePresence>
        {scrolledPastHero && (
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 glass-heavy"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between">
              {/* Logo */}
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-accent text-text-inverted font-display font-bold text-sm hover:scale-105 transition-transform"
                aria-label="Back to top"
              >
                J
              </a>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === link.href.replace("#", "")
                        ? "text-accent"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.href.replace("#", "") && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-accent-muted rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2">
                {/* Dark mode toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                  aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
                >
                  {resolvedTheme === "light" ? (
                    <Moon size={18} />
                  ) : (
                    <Sun size={18} />
                  )}
                </button>

                {/* Resume button (desktop) */}
                <a
                  href="#"
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-text-inverted hover:bg-accent-hover transition-colors"
                  aria-label="View resume"
                >
                  <FileText size={15} />
                  Resume
                </a>

                {/* Hamburger (mobile) */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary"
                  aria-label="Open menu"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Mobile Full-Screen Sheet ───────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-xl flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                  className="text-3xl font-display font-semibold text-text-primary hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: NAV_LINKS.length * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className="mt-4 flex items-center gap-4"
              >
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl bg-bg-secondary text-text-primary"
                  aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
                >
                  {resolvedTheme === "light" ? (
                    <Moon size={22} />
                  ) : (
                    <Sun size={22} />
                  )}
                </button>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 px-6 py-3 text-base font-medium rounded-xl bg-accent text-text-inverted"
                >
                  <FileText size={18} />
                  Resume
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
