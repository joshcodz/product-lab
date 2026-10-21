"use client";

import { motion } from "framer-motion";
import { Search, FileText, Code2, TrendingUp, CheckCircle2, ArrowRight, Layers, Target } from "lucide-react";

export function DiscoveryVisual() {
  return (
    <div className="w-full h-full min-h-[320px] rounded-2xl glass-heavy p-5 border border-border-glass flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="flex items-center justify-between pb-3 border-b border-border-glass">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
            Problem Space Matrix
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface border border-border-glass text-text-secondary">
          OFS Framework
        </span>
      </div>

      <div className="space-y-3 my-4">
        {[
          { label: "Identify friction points", icon: Search, status: "Mapped" },
          { label: "Score severity & frequency", icon: Target, status: "Scored" },
          { label: "Prioritize by user impact", icon: Layers, status: "Ranked" },
          { label: "Define solution scope", icon: ArrowRight, status: "Scoped" },
        ].map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-surface/70 border border-border-glass"
          >
            <div className="w-7 h-7 rounded-lg bg-accent-muted flex items-center justify-center shrink-0">
              <step.icon size={13} className="text-accent" />
            </div>
            <span className="text-xs font-medium text-text-primary flex-1">{step.label}</span>
            <span className="text-[10px] font-mono font-bold text-emerald-500">{step.status}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-glass/60 text-[11px] text-text-tertiary font-mono">
        <span className="flex items-center gap-1">
          <Search size={11} className="text-accent" />
          Structured discovery process
        </span>
        <span className="text-accent font-semibold">Framework</span>
      </div>
    </div>
  );
}

export function ExecutionVisual() {
  return (
    <div className="w-full h-full min-h-[320px] rounded-2xl glass-heavy p-5 border border-border-glass flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="flex items-center justify-between pb-3 border-b border-border-glass">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-mono font-bold text-text-primary ml-1">
            Spec & Delivery Process
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-muted text-accent font-bold">
          PM Intern
        </span>
      </div>

      <div className="my-3 space-y-2">
        <div className="text-[11px] font-mono text-text-tertiary">
          // Deliverable checklist approach
        </div>
        {[
          { label: "Clear problem statement with user context", done: true },
          { label: "Acceptance criteria for every feature spec", done: true },
          { label: "Edge-case trees and error state handling", done: true },
          { label: "Cross-functional stakeholder alignment", done: true },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="flex items-start gap-2 p-2 rounded-lg bg-surface/50 border border-border-glass text-xs"
          >
            <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-snug">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-glass/60 text-[11px] font-mono text-text-tertiary">
        <span>AlienHouse Networks</span>
        <span className="text-accent font-semibold">Structured specs</span>
      </div>
    </div>
  );
}

export function TechnicalVisual() {
  return (
    <div className="w-full h-full min-h-[320px] rounded-2xl glass-heavy p-5 border border-border-glass flex flex-col justify-between overflow-hidden shadow-inner font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-border-glass">
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-accent" />
          <span className="text-xs font-bold text-text-primary">
            Tech Stack
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-accent-muted text-accent font-bold">
          Builder
        </span>
      </div>

      <div className="my-3 space-y-3">
        {[
          { category: "Frontend", tools: ["Next.js", "React", "TypeScript", "Framer Motion"] },
          { category: "Backend", tools: ["Node.js", "PostgreSQL", "REST APIs"] },
          { category: "Tooling", tools: ["Git", "Vercel", "Figma", "VS Code"] },
        ].map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="p-3 rounded-xl bg-surface/70 border border-border-glass"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5">
              {row.category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {row.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-bg/80 border border-border-glass text-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-glass/60 text-[11px] text-text-tertiary">
        <span>CSE student & builder</span>
        <span className="text-accent font-semibold flex items-center gap-1">
          Full-stack fluent
          <Code2 size={11} />
        </span>
      </div>
    </div>
  );
}

export function GrowthVisual() {
  return (
    <div className="w-full h-full min-h-[320px] rounded-2xl glass-heavy p-5 border border-border-glass flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="flex items-center justify-between pb-3 border-b border-border-glass">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-emerald-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
            Onboarding Analysis Process
          </span>
        </div>
      </div>

      <div className="my-3 space-y-2.5">
        {[
          { step: "1. Map the full onboarding flow", detail: "Every screen, click, and decision point" },
          { step: "2. Identify friction & drop-off points", detail: "Where users hesitate, error, or abandon" },
          { step: "3. Score each step with the OFS rubric", detail: "Severity × frequency × user impact" },
          { step: "4. Design targeted interventions", detail: "Reduce steps, clarify copy, remove blockers" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="p-2.5 rounded-xl bg-surface/70 border border-border-glass"
          >
            <div className="flex items-center justify-between text-[11px] mb-0.5">
              <span className="font-semibold text-text-primary">{item.step}</span>
            </div>
            <p className="text-[10px] text-text-tertiary leading-snug">{item.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-glass/60 text-[11px] font-mono text-text-tertiary">
        <span>Friction Score Framework</span>
        <span className="text-emerald-500 font-bold">Repeatable process</span>
      </div>
    </div>
  );
}
