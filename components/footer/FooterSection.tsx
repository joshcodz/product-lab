"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Calendar,
  FileText,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
  Terminal,
  X,
} from "lucide-react";
import { Linkedin, Github } from "@/components/icons/BrandIcons";

interface FooterSectionProps {
  config?: Record<string, string>;
}

export default function FooterSection({ config = {} }: FooterSectionProps) {
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  const email = config.contact_email || "josh@example.com";
  const linkedin = config.linkedin_url || "https://linkedin.com/in/joshcodz";
  const github = config.github_url || "https://github.com/joshcodz";
  const footerText =
    config.footer_text || "© 2026 Josh's Product Lab. Built by me with Next.js & Framer Motion.";

  // Easter egg: listen for keystroke "/admin"
  useEffect(() => {
    let buffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      buffer += e.key;
      if (buffer.length > 10) buffer = buffer.slice(-10);
      if (buffer.endsWith("/admin")) {
        setEasterEggOpen(true);
        buffer = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <footer id="contact" className="section-padding bg-bg relative overflow-hidden border-t border-border-glass">
      {/* Background glow blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="container-content text-center">
        {/* Playful Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-xs font-mono font-bold uppercase tracking-wider mb-6 border border-accent/20">
          <span>Let&apos;s Connect</span>
        </div>

        {/* Huge Display Name */}
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-text-primary mb-4">
          Josh<span className="text-accent">.</span>
        </h2>

        <p className="text-text-secondary text-lg sm:text-2xl font-display max-w-xl mx-auto mb-10 leading-snug">
          Let&apos;s build products that solve real problems.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-accent text-text-inverted font-semibold text-base hover:bg-accent-hover transition-all shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            <Mail size={18} />
            <span>Say hello →</span>
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl glass font-semibold text-base text-text-primary hover:bg-surface/80 transition-all hover:-translate-y-0.5"
          >
            <Calendar size={18} className="text-accent" />
            <span>Book a chat</span>
          </a>
        </div>

        {/* Social Icons & AI Prompts Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto mb-12">
          <a
            href={`https://claude.ai/new?q=${encodeURIComponent(
              "Tell me about Josh, a PM-minded CS student at SRMIST. He's built products like Onboarding Friction Score and Zenos, interned at AlienHouse Networks as a PM, and leads Founders Club SRMIST. Why is he a standout PM candidate?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border-glass text-xs font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
          >
            <Sparkles size={14} className="text-accent" />
            <span>Ask Claude about me</span>
          </a>

          <a
            href={`https://chatgpt.com/?q=${encodeURIComponent(
              "Tell me about Josh, a PM-minded CS student at SRMIST. He's built products like Onboarding Friction Score and Zenos, interned at AlienHouse Networks, and leads Founders Club SRMIST. Why is he a standout PM candidate?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border-glass text-xs font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
          >
            <MessageCircle size={14} className="text-accent" />
            <span>Ask ChatGPT about me</span>
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl glass border border-border-glass text-text-secondary hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl glass border border-border-glass text-text-secondary hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>

          <a
            href="#"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass border border-border-glass text-xs font-medium text-text-secondary hover:text-accent transition-colors"
          >
            <FileText size={14} />
            <span>Resume (PDF)</span>
          </a>
        </div>

        {/* Text CTA Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-text-secondary mb-12">
          <a
            href={`mailto:${email}`}
            className="hover:text-accent transition-colors flex items-center gap-1 group"
          >
            <span>Email</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1 group"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1 group"
          >
            <span>GitHub</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <button
            onClick={() => setEasterEggOpen(true)}
            className="hover:text-accent transition-colors flex items-center gap-1 font-mono text-xs text-text-tertiary"
          >
            <span>/admin</span>
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-border-glass/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-text-tertiary gap-3">
          <p>{footerText}</p>
          <p className="flex items-center gap-1">
            <span>Chennai, India</span>
            <span>·</span>
            <span className="text-emerald-500 font-semibold">All systems operational</span>
          </p>
        </div>
      </div>

      {/* Easter Egg Modal when typing "/admin" */}
      <AnimatePresence>
        {easterEggOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEasterEggOpen(false)}
            />
            <motion.div
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 glass-heavy rounded-2xl p-6 border border-border-glass shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
                  <Terminal size={14} />
                  <span>Terminal Access Found</span>
                </div>
                <button
                  onClick={() => setEasterEggOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface text-text-tertiary"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                You discovered the secret entry point! You can access the live management console at:
              </p>
              <a
                href="/admin"
                className="block text-center w-full py-2.5 rounded-xl bg-accent text-text-inverted font-bold text-sm hover:bg-accent-hover transition-colors shadow-md"
              >
                Go to Admin Dashboard →
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
}
