"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Layers,
  Zap,
  BarChart2,
  Bookmark,
  Share2,
  Check,
} from "lucide-react";
import { TEARDOWNS, ProductTeardown } from "@/lib/teardowns";

const CATEGORIES = ["All", "Dev Tools", "Productivity", "AI", "Infra & Cloud"] as const;

export default function TeardownsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTeardown, setActiveTeardown] = useState<ProductTeardown | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Filtered teardowns based on category and search query
  const filteredTeardowns = useMemo(() => {
    return TEARDOWNS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyLink = (item: ProductTeardown) => {
    const url = `${window.location.origin}/teardowns#${item.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(item.slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-accent/20 selection:text-accent">
      {/* ── Sub-header Navigation Bar ──────────────────────────── */}
      <div className="sticky top-0 z-40 glass-heavy border-b border-border-glass backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#work"
            className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Josh&apos;s Product Lab</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent-muted text-accent font-semibold border border-accent/20">
              Library · {TEARDOWNS.length} Teardowns
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-xs font-mono font-bold uppercase tracking-wider border border-accent/20">
            <Sparkles size={12} />
            <span>Product Teardowns &amp; Architectural Deconstructions</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-[1.08]">
            Product Teardown Library
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary font-display leading-relaxed">
            Rigorous UX deconstructions of products I admire — dissecting first-time activation, cognitive load, hidden trade-offs, and how I&apos;d redesign the core user journey.
          </p>
        </div>

        {/* ── Search & Filter Controls ──────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-accent text-text-inverted shadow-sm"
                    : "bg-surface/80 border border-border-glass text-text-secondary hover:text-text-primary hover:bg-surface"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, keywords, tags..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface/80 border border-border-glass text-xs font-mono text-text-primary placeholder:text-text-tertiary focus:outline-hidden focus:border-accent transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── Teardowns Grid ────────────────────────────────────── */}
        {filteredTeardowns.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass border border-border-glass space-y-3">
            <SlidersHorizontal size={32} className="mx-auto text-text-tertiary" />
            <h3 className="font-display font-bold text-lg text-text-primary">
              No teardowns match your filter
            </h3>
            <p className="text-xs text-text-secondary">
              Try adjusting your search query or selecting &quot;All&quot; categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeardowns.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between p-6 rounded-3xl glass-heavy border border-border-glass hover:border-accent/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-accent-muted text-accent border border-accent/20">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 text-text-tertiary text-xs font-mono">
                      <Clock size={12} />
                      <span>{item.readTime}</span>
                    </div>
                  </div>

                  {/* Product Title & Company */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-text-secondary uppercase">
                        {item.product}
                      </span>
                      <span className="text-text-tertiary text-xs">·</span>
                      <span className="text-[11px] font-mono text-text-tertiary">
                        {item.company}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Thesis snippet */}
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {item.thesis}
                  </p>

                  {/* Scores Gauge */}
                  <div className="p-3.5 rounded-2xl bg-surface/70 border border-border-glass space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-text-tertiary font-bold uppercase text-[10px]">
                        Overall UX Score
                      </span>
                      <span className="font-mono font-bold text-accent">
                        {item.scores.overall} / 10
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border-glass/60 text-[10px] font-mono text-text-tertiary">
                      <div>
                        <span className="block opacity-70">Activation</span>
                        <span className="font-bold text-text-primary">{item.scores.activation}</span>
                      </div>
                      <div>
                        <span className="block opacity-70">Speed</span>
                        <span className="font-bold text-text-primary">{item.scores.speed}</span>
                      </div>
                      <div>
                        <span className="block opacity-70">Cognitive</span>
                        <span className="font-bold text-text-primary">{item.scores.cognitiveLoad}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface border border-border-glass text-text-secondary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-6 mt-4 border-t border-border-glass flex items-center justify-between">
                  <span className="text-[11px] font-mono text-text-tertiary">
                    {item.date}
                  </span>
                  <button
                    onClick={() => setActiveTeardown(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent hover:text-accent-hover transition-colors group/btn cursor-pointer"
                  >
                    <span>Read Teardown</span>
                    <ChevronRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      {/* ── Slide-over Deep-Dive Modal Drawer ─────────────────── */}
      <AnimatePresence>
        {activeTeardown && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTeardown(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Slide-over Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative w-full max-w-2xl bg-bg border-l border-border-glass h-full shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border-glass flex items-center justify-between shrink-0 bg-surface/80 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase font-bold px-2.5 py-0.5 rounded-full bg-accent-muted text-accent border border-accent/20">
                    {activeTeardown.category}
                  </span>
                  <span className="text-xs font-mono text-text-tertiary">
                    {activeTeardown.date} · {activeTeardown.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(activeTeardown)}
                    className="p-2 rounded-xl glass hover:text-text-primary text-text-secondary transition-colors"
                    title="Copy teardown link"
                  >
                    {copiedSlug === activeTeardown.slug ? (
                      <Check size={14} className="text-emerald-500" />
                    ) : (
                      <Share2 size={14} />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTeardown(null)}
                    className="p-2 rounded-xl glass hover:text-text-primary text-text-secondary transition-colors"
                    aria-label="Close drawer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 select-text">
                {/* Title & Core Thesis */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-accent">
                      {activeTeardown.product}
                    </span>
                    <span className="text-text-tertiary text-xs">/</span>
                    <span className="text-xs font-mono text-text-tertiary">
                      {activeTeardown.company}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
                    {activeTeardown.title}
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    {activeTeardown.subtitle}
                  </p>
                </div>

                {/* Scores Matrix Card */}
                <div className="p-5 rounded-2xl glass-heavy border border-accent/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase font-bold text-accent tracking-wider">
                      Evaluation Breakdown
                    </span>
                    <span className="font-mono text-sm font-extrabold text-accent">
                      {activeTeardown.scores.overall} / 10 Overall
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border-glass text-xs font-mono">
                    <div className="p-2 rounded-xl bg-surface/50 border border-border-glass">
                      <span className="text-[10px] text-text-tertiary block">Activation</span>
                      <span className="text-base font-bold text-text-primary">
                        {activeTeardown.scores.activation}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-surface/50 border border-border-glass">
                      <span className="text-[10px] text-text-tertiary block">Perceived Speed</span>
                      <span className="text-base font-bold text-text-primary">
                        {activeTeardown.scores.speed}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-surface/50 border border-border-glass">
                      <span className="text-[10px] text-text-tertiary block">Cognitive Load</span>
                      <span className="text-base font-bold text-text-primary">
                        {activeTeardown.scores.cognitiveLoad}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Core Thesis Box */}
                <div className="p-5 rounded-2xl bg-accent-muted/20 border border-accent/30 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent uppercase">
                    <Lightbulb size={14} />
                    <span>Core Thesis</span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed font-medium">
                    {activeTeardown.thesis}
                  </p>
                </div>

                {/* What Works */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider">
                    <CheckCircle2 size={14} />
                    <span>What Works (High-Impact UX Patterns)</span>
                  </div>
                  <div className="space-y-3">
                    {activeTeardown.whatWorks.map((w, wIdx) => (
                      <div
                        key={wIdx}
                        className="p-4 rounded-xl glass border border-border-glass space-y-1"
                      >
                        <h4 className="font-display font-bold text-sm text-text-primary">
                          {w.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {w.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What Fails / Friction Points */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-500 uppercase tracking-wider">
                    <AlertTriangle size={14} />
                    <span>Friction Points &amp; Hidden Trade-offs</span>
                  </div>
                  <div className="space-y-3">
                    {activeTeardown.whatFails.map((f, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1"
                      >
                        <h4 className="font-display font-bold text-sm text-amber-500">
                          {f.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What I'd Change (PM Proposals) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent uppercase tracking-wider">
                    <Zap size={14} />
                    <span>What I&apos;d Change (My PM Redesign Proposals)</span>
                  </div>
                  <div className="space-y-3">
                    {activeTeardown.whatIdChange.map((c, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-4 rounded-xl glass-heavy border border-accent/20 space-y-1"
                      >
                        <h4 className="font-display font-bold text-sm text-text-primary">
                          {c.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {c.proposal || c.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Takeaways */}
                <div className="p-5 rounded-2xl bg-surface border border-border-glass space-y-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-tertiary block">
                    Key Takeaways for Builders
                  </span>
                  <div className="space-y-2">
                    {activeTeardown.keyTakeaways.map((t, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed"
                      >
                        <span className="text-accent font-mono font-bold mt-0.5">→</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 px-6 border-t border-border-glass bg-surface/90 flex items-center justify-between shrink-0">
                <button
                  onClick={() => setActiveTeardown(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold glass text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  Close Teardown
                </button>
                {activeTeardown.articleUrl && (
                  <a
                    href={activeTeardown.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-accent text-text-inverted hover:bg-accent-hover transition-colors shadow-sm"
                  >
                    <span>Discuss on LinkedIn / Substack</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
