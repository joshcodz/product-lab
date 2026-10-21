"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Quote,
  Sparkles,
  AlertTriangle,
  ArrowRightCircle,
  HelpCircle,
  Code2,
  Terminal,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { CaseStudyData, CaseStudySection } from "@/lib/caseStudies";

export default function CaseStudyView({ study }: { study: CaseStudyData }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeSection, setActiveSection] = useState("overview");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Build dynamic Table of Contents
  const tocSections = useMemo(() => {
    const list = [
      { id: "overview", label: "Overview & Metrics" },
      { id: "tldr", label: "Executive Summary" },
    ];
    if (study.sections) {
      study.sections.forEach((s) => {
        list.push({ id: s.id, label: s.title });
      });
    }
    // Check if learnings is not already in sections
    const hasLearnings = study.sections?.some((s) => s.id === "learnings");
    if (!hasLearnings && study.learnings && study.learnings.length > 0) {
      list.push({ id: "learnings", label: "What I Learned" });
    }
    return list;
  }, [study]);

  // Scroll-spy for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const section of tocSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocSections]);

  const copyHeadingLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-accent/20 selection:text-accent">
      {/* ── Top Reading Progress Bar ────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* ── Sub-header Navigation Bar ──────────────────────────── */}
      <div className="sticky top-0 z-40 glass-heavy border-b border-border-glass backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#work"
            className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Work</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent-muted text-accent font-semibold border border-accent/20">
              {study.category}
            </span>
            <span className="hidden sm:flex items-center gap-1 text-xs text-text-tertiary font-mono">
              <Clock size={12} />
              {study.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ──────────────────────────────────────────────────────────
              LEFT: Sticky Table of Contents
              ────────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-text-tertiary mb-3">
                  Table of Contents
                </p>
                <nav className="space-y-1">
                  {tocSections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`block text-xs py-1.5 px-3 rounded-lg transition-all ${
                        activeSection === sec.id
                          ? "bg-accent-muted text-accent font-bold border-l-2 border-accent"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                      }`}
                    >
                      {sec.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Links & Artifacts */}
              <div className="p-4 rounded-xl glass border border-border-glass space-y-2.5 text-xs font-medium">
                <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider block mb-1">
                  Artifacts &amp; Links
                </span>
                {study.links.liveDemo && (
                  <div className="text-text-secondary">
                    {study.links.liveDemo.includes("[VERIFY") ? (
                      <div className="flex items-center justify-between text-amber-500 py-1">
                        <span className="font-mono text-[11px]">Live Demo [VERIFY link]</span>
                        <HelpCircle size={12} />
                      </div>
                    ) : (
                      <a
                        href={study.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-text-secondary hover:text-accent transition-colors py-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}
                {study.links.repo && study.links.repo !== "#" && (
                  <a
                    href={study.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-text-secondary hover:text-accent transition-colors py-1"
                  >
                    <span>GitHub Repository</span>
                    <Github size={12} />
                  </a>
                )}
                {study.links.prd && (
                  <a
                    href={study.links.prd}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-text-secondary hover:text-accent transition-colors py-1"
                  >
                    <span>PRD Documentation</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* ──────────────────────────────────────────────────────────
              MAIN: Case Study Content
              ────────────────────────────────────────────────────────── */}
          <main className="lg:col-span-9 space-y-16 max-w-4xl">
            {/* 1. Hero Header */}
            <section id="overview" className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-accent font-bold uppercase tracking-widest">
                    Case Study // {study.category}
                  </span>
                  {study.statusBadge && (
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                        study.statusBadge.includes("[VERIFY")
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          : "bg-surface text-text-secondary border-border-glass"
                      }`}
                    >
                      {study.statusBadge}
                    </span>
                  )}
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-[1.08]">
                  {study.title}
                </h1>
                <p className="text-xl sm:text-2xl text-text-secondary font-display leading-snug">
                  {study.subtitle}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl glass border border-border-glass text-xs">
                <div>
                  <span className="text-text-tertiary block font-mono text-[10px] uppercase">My Role</span>
                  <span className="font-semibold text-text-primary mt-1 block">{study.role}</span>
                </div>
                <div>
                  <span className="text-text-tertiary block font-mono text-[10px] uppercase">Timeline</span>
                  <span className="font-semibold text-text-primary mt-1 block">{study.timeline}</span>
                </div>
                <div>
                  <span className="text-text-tertiary block font-mono text-[10px] uppercase">Team</span>
                  <span className="font-semibold text-text-primary mt-1 block">{study.team}</span>
                </div>
                <div>
                  <span className="text-text-tertiary block font-mono text-[10px] uppercase mb-1.5">Stack / Tools</span>
                  <div className="flex flex-wrap gap-1">
                    {study.tools.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface/80 border border-border-glass text-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Headline Metrics in Big Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {study.headlineMetrics.map((metric, i) => {
                  const isPlaceholder = metric.isPlaceholder || metric.value.includes("[VERIFY");
                  return (
                    <div
                      key={i}
                      className={`p-5 rounded-2xl glass-heavy border shadow-md ${
                        isPlaceholder
                          ? "border-dashed border-amber-500/40 bg-amber-500/5"
                          : "border-accent/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`font-mono text-3xl sm:text-4xl font-extrabold ${
                            isPlaceholder ? "text-amber-500 text-2xl" : "text-accent"
                          }`}
                        >
                          {metric.value}
                        </div>
                        {isPlaceholder && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">
                            UNCONFIRMED
                          </span>
                        )}
                      </div>
                      <div className="font-display font-bold text-sm text-text-primary mt-1">
                        {metric.label}
                      </div>
                      <p className="text-xs text-text-tertiary mt-0.5">{metric.sublabel}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 2. TL;DR Box */}
            <section id="tldr" className="p-6 sm:p-8 rounded-3xl glass-heavy border border-accent/30 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Executive Summary (TL;DR)</span>
              </div>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <div>
                  <span className="font-bold text-text-primary">Problem: </span>
                  <span className="text-text-secondary">{study.tldr.problem}</span>
                </div>
                <div>
                  <span className="font-bold text-accent">What I Did: </span>
                  <span className="text-text-secondary">{study.tldr.action}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-500">Result: </span>
                  <span className="text-text-secondary font-medium">{study.tldr.result}</span>
                </div>
              </div>
            </section>

            {/* 3. Dynamic Sections */}
            {study.sections &&
              study.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-border-glass pb-3">
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                        {sec.title}
                      </h2>
                      {sec.tagline && (
                        <p className="text-xs font-mono text-accent mt-0.5 uppercase tracking-wider">
                          {sec.tagline}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => copyHeadingLink(sec.id)}
                      className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                      aria-label={`Copy link to ${sec.title}`}
                    >
                      {copiedId === sec.id ? (
                        <Check size={14} className="text-emerald-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>

                  {/* Section Content */}
                  {sec.content && (
                    <p className="text-base leading-relaxed text-text-secondary">
                      {sec.content}
                    </p>
                  )}

                  {/* Callout Box */}
                  {sec.callout && (
                    <div
                      className={`p-5 rounded-2xl border ${
                        sec.callout.type === "hypothesis"
                          ? "bg-accent-muted/20 border-accent/40 text-text-primary"
                          : sec.callout.type === "warning"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                          : sec.callout.type === "quote"
                          ? "bg-accent-muted/30 border-l-4 border-accent text-text-primary italic"
                          : "bg-surface border-border-glass text-text-secondary"
                      }`}
                    >
                      {sec.callout.type === "quote" && (
                        <Quote size={20} className="text-accent mb-2 not-italic" />
                      )}
                      {sec.callout.type === "warning" && (
                        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase mb-1">
                          <AlertTriangle size={14} />
                          <span>Verification Notice</span>
                        </div>
                      )}
                      <p className="text-sm sm:text-base leading-relaxed font-medium">
                        {sec.callout.text}
                      </p>
                      {sec.callout.author && (
                        <p className="text-xs font-mono text-text-tertiary mt-2 not-italic">
                          — {sec.callout.author}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Pipeline Diagram (e.g. parse -> execute -> score) */}
                  {sec.pipelineDiagram && (
                    <div className="p-5 rounded-2xl glass-heavy border border-accent/20 space-y-4">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent uppercase tracking-wider">
                        <Terminal size={14} />
                        <span>Execution Pipeline Flow</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {sec.pipelineDiagram.steps.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-4 rounded-xl bg-surface/80 border border-border-glass relative space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-accent">
                                Step 0{sIdx + 1}
                              </span>
                              {sIdx < sec.pipelineDiagram!.steps.length - 1 && (
                                <span className="hidden md:block font-mono text-accent text-xs">
                                  →
                                </span>
                              )}
                            </div>
                            <h4 className="font-mono font-bold text-sm text-text-primary">
                              {st.name}
                            </h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {st.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comparison Table (Option A vs Option B) */}
                  {sec.comparisonTable && (
                    <div className="overflow-x-auto rounded-2xl glass border border-border-glass shadow-sm">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-surface/90 border-b border-border-glass text-text-tertiary">
                          <tr>
                            {sec.comparisonTable.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3.5 font-bold uppercase tracking-wider">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-glass">
                          {sec.comparisonTable.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-surface/40 transition-colors">
                              <td className="p-3.5 font-bold text-accent bg-surface/30">
                                {row.label}
                              </td>
                              {row.values.map((v, vIdx) => (
                                <td key={vIdx} className="p-3.5 text-text-secondary leading-relaxed">
                                  {v}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Roadmap Steps */}
                  {sec.roadmapSteps && (
                    <div className="space-y-3">
                      {sec.roadmapSteps.map((st) => (
                        <div
                          key={st.step}
                          className="flex items-start gap-4 p-4 rounded-2xl glass border border-border-glass hover:border-accent/30 transition-all"
                        >
                          <span className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            0{st.step}
                          </span>
                          <div className="space-y-1">
                            <h4 className="font-display font-bold text-sm text-text-primary">
                              {st.title}
                            </h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {st.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Standard Styled Table */}
                  {sec.table && (
                    <div className="overflow-x-auto rounded-2xl glass border border-border-glass shadow-sm">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-surface/90 border-b border-border-glass text-text-tertiary">
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3.5 font-bold uppercase tracking-wider">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-glass">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-surface/40 transition-colors">
                              {row.map((cell, cIdx) => {
                                const isVerify = cell.includes("[VERIFY");
                                return (
                                  <td
                                    key={cIdx}
                                    className={`p-3.5 ${
                                      cIdx === 0
                                        ? "font-bold text-text-primary"
                                        : "text-text-secondary leading-relaxed"
                                    }`}
                                  >
                                    {isVerify ? (
                                      <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[11px] font-mono">
                                        {cell}
                                      </span>
                                    ) : (
                                      cell
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Subsections Cards */}
                  {sec.subsections && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sec.subsections.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 rounded-xl glass border border-border-glass space-y-2"
                        >
                          <h4 className="font-display font-bold text-sm text-text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {sub.title}
                          </h4>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {sub.description}
                          </p>
                          {sub.bullets && sub.bullets.length > 0 && (
                            <div className="pt-1 space-y-1">
                              {sub.bullets.map((b, bIdx) => {
                                const isAdd = b.includes("[ADD:") || b.includes("[VERIFY");
                                return (
                                  <div
                                    key={bIdx}
                                    className={`text-[11px] font-mono px-2 py-1 rounded ${
                                      isAdd
                                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                                        : "text-text-tertiary"
                                    }`}
                                  >
                                    {b}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Section Bullets */}
                  {sec.bullets && (
                    <div className="space-y-2">
                      {sec.bullets.map((b, bIdx) => {
                        const isVerify = b.includes("[VERIFY") || b.includes("[ADD");
                        return (
                          <div
                            key={bIdx}
                            className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs ${
                              isVerify
                                ? "bg-amber-500/5 border-amber-500/30 text-amber-500 font-mono"
                                : "glass border-border-glass text-text-secondary"
                            }`}
                          >
                            <span className="font-mono text-accent font-bold mt-0.5">→</span>
                            <span className="leading-relaxed">{b}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Placeholders Banner */}
                  {sec.placeholders && sec.placeholders.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-dashed border-amber-500/40 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-500 uppercase">
                        <AlertTriangle size={14} />
                        <span>Action Required: Verification Placeholders</span>
                      </div>
                      <div className="space-y-1">
                        {sec.placeholders.map((p, pIdx) => (
                          <div
                            key={pIdx}
                            className="font-mono text-xs text-amber-500/90 pl-5 relative before:content-['•'] before:absolute before:left-1"
                          >
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}

            {/* 4. Standalone Learnings Section (if not in study.sections) */}
            {!study.sections?.some((s) => s.id === "learnings") &&
              study.learnings &&
              study.learnings.length > 0 && (
                <section id="learnings" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border-glass pb-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                      What I Learned
                    </h2>
                    <button
                      onClick={() => copyHeadingLink("learnings")}
                      className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                      aria-label="Copy link to Learnings"
                    >
                      {copiedId === "learnings" ? (
                        <Check size={14} className="text-emerald-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {study.learnings.map((learning, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-2xl glass border border-border-glass text-sm"
                      >
                        <span className="w-5 h-5 rounded-full bg-accent text-text-inverted text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-text-secondary leading-relaxed">{learning}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* 5. Footer: Next Case Study & Back Navigation */}
            <div className="pt-12 border-t border-border-glass flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border-glass text-sm font-semibold hover:bg-surface transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back to All Work</span>
              </Link>

              {study.nextSlug && (
                <Link
                  href={`/work/${study.nextSlug}`}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-accent text-text-inverted text-sm font-semibold hover:bg-accent-hover transition-all shadow-md group"
                >
                  <div className="text-right">
                    <span className="text-[10px] font-mono opacity-80 block">Next Case Study</span>
                    <span>{study.nextTitle}</span>
                  </div>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
