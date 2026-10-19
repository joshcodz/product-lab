"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileCode, Users, TrendingUp, Sparkles, Filter, ArrowUpRight } from "lucide-react";

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
          24 User Interviews
        </span>
      </div>

      <div className="space-y-3 my-4">
        <div className="p-3 rounded-xl bg-surface/70 border border-border-glass">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-text-primary">
              Core Pain: Setup Latency
            </span>
            <span className="text-red-500 font-mono text-[10px] font-bold">
              High Friction (88%)
            </span>
          </div>
          <p className="text-[11px] text-text-secondary leading-snug">
            &ldquo;Users abandon during environment setup because configuration takes 15+ manual minutes.&rdquo;
          </p>
        </div>

        <div className="p-3 rounded-xl bg-accent-muted/40 border border-accent/20">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-accent">
              Validated Solution
            </span>
            <span className="text-accent font-mono text-[10px] font-bold">
              P0 Scope
            </span>
          </div>
          <p className="text-[11px] text-text-primary leading-snug font-medium">
            1-Click automated template cloning + zero-config sandbox environment.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-glass/60 text-[11px] text-text-tertiary font-mono">
        <span className="flex items-center gap-1">
          <Filter size={11} className="text-accent" />
          4 bloated feature ideas cut
        </span>
        <span className="text-emerald-500 font-bold">Validated</span>
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
            PRD-2026.4 // Specs &amp; Delivery
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
          Ready for Dev
        </span>
      </div>

      <div className="my-3 space-y-2">
        <div className="text-[11px] font-mono text-text-tertiary">
          // Acceptance Criteria Checklist
        </div>
        {[
          { label: "Token-bucket rate limiting specified with edge-case handling", done: true },
          { label: "Telemetry events schema mapped for amplitude tracking", done: true },
          { label: "Zero-data empty state mockups attached for engineering", done: true },
          { label: "Backward compatible DB migration plan approved", done: true },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-surface/50 border border-border-glass text-xs">
            <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-text-secondary leading-snug">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-glass/60 text-[11px] font-mono text-text-tertiary">
        <span>Cycle Time: 2.5 weeks</span>
        <span className="text-accent font-semibold">14 features shipped</span>
      </div>
    </div>
  );
}

export function TechnicalVisual() {
  return (
    <div className="w-full h-full min-h-[320px] rounded-2xl glass-heavy p-5 border border-border-glass flex flex-col justify-between overflow-hidden shadow-inner font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-border-glass">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-accent" />
          <span className="text-xs font-bold text-text-primary">
            prototype_sandbox.tsx
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-accent text-text-inverted font-bold">
          LIVE DEMO
        </span>
      </div>

      <div className="my-3 p-3.5 rounded-xl bg-bg/80 border border-border-glass text-[11px] leading-relaxed overflow-x-auto text-text-secondary">
        <div>
          <span className="text-pink-400">const</span>{" "}
          <span className="text-blue-400">frictionScore</span> ={" "}
          <span className="text-yellow-400">useCallback</span>(() =&gt; &#123;
        </div>
        <div className="pl-4 text-text-tertiary">
          // Measure time-to-first-value &amp; drop points
        </div>
        <div className="pl-4">
          <span className="text-pink-400">const</span> latency = tracker.
          <span className="text-accent">getMilestoneDuration</span>(&apos;signup_to_activation&apos;);
        </div>
        <div className="pl-4">
          <span className="text-purple-400">return</span> latency &lt;{" "}
          <span className="text-emerald-400">180</span> ?{" "}
          <span className="text-emerald-400">&apos;OPTIMAL&apos;</span> :{" "}
          <span className="text-amber-400">&apos;NEEDS_REFINEMENT&apos;</span>;
        </div>
        <div>&#125;, [tracker]);</div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-glass/60 text-[11px] text-text-tertiary">
        <span>450+ commits this year</span>
        <span className="text-accent font-semibold flex items-center gap-1">
          Full-stack fluent
          <Sparkles size={11} />
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
            First 5-Min Activation Funnel
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
          +38% Lift
        </span>
      </div>

      <div className="my-3 space-y-2.5">
        {[
          { step: "1. Land on app", before: 100, after: 100 },
          { step: "2. Sign up / SSO", before: 68, after: 89 },
          { step: "3. First project created", before: 34, after: 68 },
          { step: "4. Invites teammate (Aha moment)", before: 18, after: 42 },
        ].map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-[11px] font-medium text-text-secondary">
              <span>{item.step}</span>
              <span className="font-mono text-xs">
                <span className="text-text-tertiary line-through mr-1.5">{item.before}%</span>
                <span className="text-emerald-500 font-bold">{item.after}%</span>
              </span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden flex">
              <div
                className="bg-accent h-full rounded-full transition-all duration-1000"
                style={{ width: `${item.after}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border-glass/60 text-[11px] font-mono text-text-tertiary">
        <span>Time-to-value: -45%</span>
        <span className="text-emerald-500 font-bold">500+ Active Users</span>
      </div>
    </div>
  );
}
