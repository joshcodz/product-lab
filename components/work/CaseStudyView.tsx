"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Users,
  Wrench,
  CheckCircle2,
  XCircle,
  ExternalLink,
  FileText,
  Copy,
  Check,
  Quote,
  Sparkles,
} from "lucide-react";
import { Github } from "@/components/icons/BrandIcons";
import { CaseStudyData } from "@/lib/caseStudies";

const TOC_SECTIONS = [
  { id: "overview", label: "Overview & Metrics" },
  { id: "tldr", label: "TL;DR" },
  { id: "context", label: "Context & Problem" },
  { id: "discovery", label: "User Discovery" },
  { id: "goals", label: "Goals & Metrics" },
  { id: "prioritization", label: "Prioritization" },
  { id: "solution", label: "Solution & Flows" },
  { id: "execution", label: "Execution & PRD" },
  { id: "results", label: "Results & Feedback" },
  { id: "learnings", label: "Learnings" },
];

export default function CaseStudyView({ study }: { study: CaseStudyData }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeSection, setActiveSection] = useState("overview");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Scroll-spy for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of TOC_SECTIONS) {
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
  }, []);

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
                  {TOC_SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`block text-xs py-1.5 px-3 rounded-lg transition-all ${
                        activeSection === sec.id
                          ? "bg-accent-muted text-accent font-bold"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                      }`}
                    >
                      {sec.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Links */}
              <div className="p-4 rounded-xl glass border border-border-glass space-y-2.5 text-xs font-medium">
                <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider block mb-1">
                  Artifacts &amp; Code
                </span>
                {study.links.liveDemo && (
                  <a
                    href={study.links.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-text-secondary hover:text-accent transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {study.links.repo && study.links.repo !== "#" && (
                  <a
                    href={study.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-text-secondary hover:text-accent transition-colors"
                  >
                    <span>GitHub Repository</span>
                    <Github size={12} />
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
                <span className="text-xs font-mono text-accent font-bold uppercase tracking-widest">
                  Case Study // {study.category}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-[1.08]">
                  {study.title}
                </h1>
                <p className="text-xl sm:text-2xl text-text-secondary font-display leading-snug">
                  {study.subtitle}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl glass border border-border-glass text-xs">
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
                  <span className="text-text-tertiary block font-mono text-[10px] uppercase">Tools</span>
                  <span className="font-semibold text-text-primary mt-1 block">{study.tools.slice(0, 3).join(", ")}</span>
                </div>
              </div>

              {/* 3 Headline Metrics in Big Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {study.headlineMetrics.map((metric, i) => (
                  <div key={i} className="p-5 rounded-2xl glass-heavy border border-accent/20 shadow-md">
                    <div className="font-mono text-4xl sm:text-5xl font-extrabold text-accent">
                      {metric.value}
                    </div>
                    <div className="font-display font-bold text-sm text-text-primary mt-1">
                      {metric.label}
                    </div>
                    <p className="text-xs text-text-tertiary mt-0.5">{metric.sublabel}</p>
                  </div>
                ))}
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

            {/* 3. Context & Problem */}
            <section id="context" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  Context &amp; Problem Space
                </h2>
                <button
                  onClick={() => copyHeadingLink("context")}
                  className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                  aria-label="Copy link to Context"
                >
                  {copiedId === "context" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-base leading-relaxed text-text-secondary">
                {study.context.overview}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl glass border border-border-glass">
                  <span className="text-xs font-mono font-bold text-accent uppercase block mb-1">
                    Target Persona
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {study.context.userProfile}
                  </p>
                </div>
                <div className="p-4 rounded-xl glass border border-border-glass">
                  <span className="text-xs font-mono font-bold text-red-400 uppercase block mb-1">
                    Business Impact of Failure
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {study.context.businessImpact}
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Discovery */}
            <section id="discovery" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  User Discovery &amp; Research
                </h2>
                <button
                  onClick={() => copyHeadingLink("discovery")}
                  className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                  aria-label="Copy link to Discovery"
                >
                  {copiedId === "discovery" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">Methodology: </span>
                {study.discovery.methodology}
              </p>

              {/* Pull quote */}
              <div className="p-6 rounded-2xl bg-accent-muted/30 border-l-4 border-accent my-4 space-y-2">
                <Quote size={20} className="text-accent" />
                <p className="font-display italic text-base sm:text-lg text-text-primary leading-snug">
                  &ldquo;{study.discovery.pullQuote}&rdquo;
                </p>
                <p className="text-xs font-mono text-text-tertiary">— {study.discovery.quoteAuthor}</p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-tertiary">
                  Key Qualitative Insights
                </span>
                {study.discovery.keyInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl glass border border-border-glass text-sm">
                    <span className="font-mono text-xs font-bold text-accent shrink-0 mt-0.5">0{idx + 1}.</span>
                    <span className="text-text-secondary leading-snug">{insight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Goals & Success Metrics */}
            <section id="goals" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  Goals &amp; Success Definition
                </h2>
                <button
                  onClick={() => copyHeadingLink("goals")}
                  className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {copiedId === "goals" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-base text-text-primary font-medium">
                {study.goals.coreGoal}
              </p>
              <div className="space-y-2">
                {study.goals.metrics.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
              <div className="p-3.5 rounded-xl bg-surface border border-border-glass text-xs text-text-tertiary">
                <span className="font-bold text-text-secondary">Guardrail Metric: </span>
                {study.goals.guardrailMetric}
              </div>
            </section>

            {/* 6. Prioritization & Deliberately Cut Features */}
            <section id="prioritization" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  Prioritization Framework
                </h2>
                <button
                  onClick={() => copyHeadingLink("prioritization")}
                  className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {copiedId === "prioritization" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-sm text-text-secondary">
                <span className="font-bold text-text-primary">{study.prioritization.framework}: </span>
                {study.prioritization.frameworkExplanation}
              </p>

              {/* Matrix Table */}
              <div className="overflow-x-auto rounded-2xl glass border border-border-glass">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface/80 border-b border-border-glass text-text-tertiary">
                    <tr>
                      <th className="p-3 font-semibold">Feature / Hypothesis</th>
                      <th className="p-3 font-semibold">Impact</th>
                      <th className="p-3 font-semibold">Effort</th>
                      <th className="p-3 font-semibold">Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-glass">
                    {study.prioritization.featuresMatrix.map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface/30">
                        <td className="p-3 font-medium text-text-primary">{row.feature}</td>
                        <td className="p-3">{row.impact}</td>
                        <td className="p-3">{row.effort}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.verdict.startsWith("P0")
                                ? "bg-emerald-500/10 text-emerald-500"
                                : row.verdict.startsWith("P1")
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {row.verdict}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* What I deliberately did NOT build */}
              <div className="space-y-2 pt-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                  What I Deliberately Did NOT Build &amp; Why
                </span>
                {study.prioritization.deliberatelyCut.map((cut, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface/50 border border-border-glass text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-text-primary">
                      <XCircle size={14} className="text-red-400 shrink-0" />
                      <span>{cut.feature}</span>
                    </div>
                    <p className="text-text-secondary pl-5 leading-snug">{cut.reason}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Solution & Key Flows */}
            <section id="solution" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  Solution &amp; User Flows
                </h2>
                <button
                  onClick={() => copyHeadingLink("solution")}
                  className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {copiedId === "solution" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-base text-text-secondary leading-relaxed">
                {study.solution.overview}
              </p>

              <div className="space-y-6 pt-2">
                {study.solution.flows.map((flow, idx) => (
                  <div key={idx} className="rounded-2xl glass border border-border-glass overflow-hidden shadow-sm">
                    <img
                      src={flow.image}
                      alt={flow.title}
                      className="w-full h-72 sm:h-96 object-cover"
                    />
                    <div className="p-5 space-y-1 bg-surface/80">
                      <h4 className="font-display font-bold text-base text-text-primary">
                        {flow.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {flow.description}
                      </p>
                      <span className="text-[10px] font-mono text-text-tertiary block pt-1">
                        Figure {idx + 1}: {flow.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. Execution & PRD Excerpt */}
            <section id="execution" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  Execution, PRD &amp; Engineering Decisions
                </h2>
                <button
                  onClick={() => copyHeadingLink("execution")}
                  className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {copiedId === "execution" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              {/* PRD excerpt callout */}
              <div className="rounded-2xl glass border border-border-glass overflow-hidden font-mono text-xs">
                <div className="px-4 py-2.5 bg-surface/90 border-b border-border-glass flex items-center justify-between">
                  <span className="text-text-secondary font-bold flex items-center gap-1.5">
                    <FileText size={13} className="text-accent" />
                    PRD-SPEC-EXCERPT.md
                  </span>
                  <span className="text-[10px] text-text-tertiary">Accepted by Engineering</span>
                </div>
                <div className="p-5 leading-relaxed bg-bg/60 text-text-secondary">
                  {study.execution.prdExcerpt}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-tertiary">
                  Technical Architecture Decisions
                </span>
                {study.execution.engineeringDecisions.map((dec, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl glass border border-border-glass text-xs">
                    <span className="font-mono text-accent font-bold">→</span>
                    <span className="text-text-secondary leading-snug">{dec}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Results & Feedback */}
            <section id="results" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  Results &amp; Measurable Proof
                </h2>
                <button
                  onClick={() => copyHeadingLink("results")}
                  className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {copiedId === "results" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Before vs After Table */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {study.results.metrics.map((res, i) => (
                  <div key={i} className="p-5 rounded-2xl glass-heavy border border-border-glass">
                    <span className="text-xs font-mono text-text-tertiary block mb-2">{res.metric}</span>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-mono text-sm text-text-tertiary line-through">{res.before}</span>
                      <span className="font-mono text-3xl font-extrabold text-accent">{res.after}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-500 font-mono">{res.change} improvement</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-tertiary">
                  Qualitative Feedback
                </span>
                {study.results.feedback.map((fb, idx) => (
                  <div key={idx} className="p-4 rounded-xl glass border border-border-glass text-sm italic text-text-secondary leading-relaxed">
                    {fb}
                  </div>
                ))}
              </div>
            </section>

            {/* 10. Learnings */}
            <section id="learnings" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  What I&apos;d Do Differently (Honest Learnings)
                </h2>
                <button
                  onClick={() => copyHeadingLink("learnings")}
                  className="p-1.5 rounded-lg glass text-text-tertiary hover:text-text-primary transition-colors"
                >
                  {copiedId === "learnings" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>
              <div className="space-y-3">
                {study.learnings.map((learning, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl glass border border-border-glass text-sm">
                    <span className="w-5 h-5 rounded-full bg-accent text-text-inverted text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-text-secondary leading-relaxed">{learning}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 11. Footer: Next Case Study & Back */}
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
