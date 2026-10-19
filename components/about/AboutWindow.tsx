"use client";

import { motion } from "framer-motion";
import { Terminal, Copy, Check, Sparkles, Heart } from "lucide-react";
import { useState } from "react";

interface AboutWindowProps {
  config?: Record<string, string>;
}

export default function AboutWindow({ config = {} }: AboutWindowProps) {
  const [copied, setCopied] = useState(false);

  const aboutText =
    config.about_text ||
    `Started as a Computer Science undergrad at SRMIST writing C++ and building full-stack web apps. Quickly realized my real thrill wasn't just writing clean syntax — it was figuring out what to build in the first place and why anyone would care.

Product Manager Intern at AlienHouse Networks, driving user journeys and spec writing with an engineering team of 8. In parallel, leading tech & community at Founders Club SRMIST, helping builders turn hackathon ideas into functional products.

Aiming for Associate Product Manager or Founder's Office roles at ambitious B2B SaaS and developer tools startups. Either making developer workflows frictionless, or founding a venture that saves people 10 hours a week.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Josh · Product Builder & CS Student @ SRMIST\nAiming for PM & Founder's Office roles at B2B SaaS and Dev Tools startups.\nFind me at ${config.linkedin_url || "https://linkedin.com/in/joshcodz"}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="section-padding bg-bg-secondary/30 relative">
      <div className="container-content">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-accent/20">
            <span>The Human Behind the Code</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
            About Me
          </h2>
          <p className="text-text-secondary text-base sm:text-lg mt-2">
            Why a CS student builds products instead of just writing algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Notepad / Text Editor Window */}
          <div className="lg:col-span-8 rounded-2xl glass-heavy border border-border-glass overflow-hidden shadow-2xl">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface/70 border-b border-border-glass">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 font-mono text-xs text-text-secondary font-medium flex items-center gap-1.5">
                  <Terminal size={12} className="text-accent" />
                  about-me.txt — utf-8
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[11px] font-mono text-text-tertiary hover:text-text-primary px-2 py-1 rounded bg-surface/60 border border-border-glass transition-colors"
                aria-label="Copy about me text"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Window Body: Then, Now, Future */}
            <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed space-y-6 select-text">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-1.5"
              >
                <div className="text-accent font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>// 01. Then</span>
                  <span className="text-text-tertiary font-normal">→ The Origin</span>
                </div>
                <p className="text-text-secondary">
                  Started as a Computer Science undergrad at SRMIST writing C++ and building full-stack web apps.
                  Quickly realized my real thrill wasn&apos;t just writing clean syntax — it was figuring out{" "}
                  <span className="text-text-primary font-semibold">what to build in the first place</span> and why
                  anyone would care.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="space-y-1.5"
              >
                <div className="text-accent font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>// 02. Now</span>
                  <span className="text-text-tertiary font-normal">→ Building &amp; Leading</span>
                </div>
                <p className="text-text-secondary">
                  Product Manager Intern at <span className="text-text-primary font-semibold">AlienHouse Networks</span>,
                  driving user journeys and spec writing with an engineering team of 8. In parallel, leading tech &amp;
                  community at <span className="text-text-primary font-semibold">Founders Club SRMIST</span>, helping
                  builders turn hackathon ideas into functional products.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-1.5"
              >
                <div className="text-accent font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>// 03. The Future</span>
                  <span className="text-text-tertiary font-normal">→ The Ambition</span>
                </div>
                <p className="text-text-secondary">
                  Aiming for Associate Product Manager or Founder&apos;s Office roles at ambitious B2B SaaS and developer tools
                  startups. Either making developer workflows frictionless, or founding a venture that saves people 10 hours a week.
                  (Plus: consuming slightly too much filter coffee while debugging edge cases).
                </p>
              </motion.div>

              <div className="pt-4 border-t border-border-glass flex items-center justify-between text-xs text-text-tertiary">
                <span>EOF · Lines: 28</span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Available for Summer / Fall 2026 roles
                </span>
              </div>
            </div>
          </div>

          {/* Photo Frame with Handwritten Sticker Note */}
          <div className="lg:col-span-4 relative flex flex-col items-center">
            {/* Sticker Annotation */}
            <div className="absolute -top-4 -right-2 z-20 bg-accent text-text-inverted px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg transform rotate-6 border border-white/20 flex items-center gap-1">
              <Sparkles size={12} />
              <span>&ldquo;Ship or iterate&rdquo;</span>
            </div>

            <div className="w-full max-w-sm rounded-3xl glass-heavy p-4 border border-border-glass shadow-xl relative group">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-bg-secondary border border-border-glass">
                <img
                  src="/josh.jpg"
                  alt="Josh portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-display font-bold text-lg">Josh</p>
                  <p className="text-xs text-white/80 font-mono mt-0.5">
                    {config.about_role || "SRMIST · 3rd Year B.Tech CSE"}
                  </p>
                </div>
              </div>

              {/* Tape Effect at bottom */}
              <div className="mt-3 text-center">
                <span className="text-[11px] font-mono text-text-tertiary">
                  {config.about_location || "Chennai, India · UTC+5:30"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
