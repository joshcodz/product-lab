"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import CountUp from "./CountUp";
import { DiscoveryVisual, ExecutionVisual, TechnicalVisual, GrowthVisual } from "./PillarVisuals";

export interface PillarData {
  number: string;
  category: string;
  claim: string;
  description: string;
  caseStudySlug: string;
  caseStudyTitle: string;
  stats: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    description: string;
  }[];
  visual: React.ReactNode;
}

const PILLARS: PillarData[] = [
  {
    number: "01",
    category: "Product Discovery & Strategy",
    claim: "I find the problem worth solving before writing a line of spec.",
    description:
      "I run structured customer interviews and quantitative friction maps so teams never waste sprint cycles building features nobody uses.",
    caseStudySlug: "onboarding-friction-score",
    caseStudyTitle: "Onboarding Friction Score",
    stats: [
      {
        value: 24,
        suffix: "+",
        label: "Interviews Run",
        description: "1-on-1 user problem discovery sessions",
      },
      {
        value: 6,
        label: "Validated Problems",
        description: "Prioritized into high-ROI solution specs",
      },
      {
        value: 4,
        label: "Bloated Features Cut",
        description: "Saved ~120 engineer-hours of low-impact work",
      },
    ],
    visual: <DiscoveryVisual />,
  },
  {
    number: "02",
    category: "Execution & Specs",
    claim: "I write specs that engineers actually read — and ship on time.",
    description:
      "Zero hand-wavy requirements. I provide precise acceptance criteria, API expectations, edge-case trees, and interactive prototypes.",
    caseStudySlug: "alienhouse-internship",
    caseStudyTitle: "AlienHouse PM Internship",
    stats: [
      {
        value: 8,
        label: "PRDs Authored",
        description: "Engineers praised clarity and completeness",
      },
      {
        value: 14,
        label: "Features Shipped",
        description: "From idea through testing to production",
      },
      {
        value: 2.5,
        suffix: " wk",
        label: "Cycle Time",
        description: "Rapid iteration cadence across cross-functional team",
      },
    ],
    visual: <ExecutionVisual />,
  },
  {
    number: "03",
    category: "Technical Fluency & Building",
    claim: "I don't just spec it — I build it.",
    description:
      "As a CSE student and full-stack engineer, I prototype complex interactions in 48 hours, speak git and APIs fluently, and unblock blockers fast.",
    caseStudySlug: "zenos",
    caseStudyTitle: "Zenos Real-Time Collab",
    stats: [
      {
        value: 12,
        suffix: "+",
        label: "Public Repos",
        description: "Real production Next.js & TypeScript codebases",
      },
      {
        value: 450,
        suffix: "+",
        label: "Commits This Year",
        description: "Hands-on builder with genuine technical depth",
      },
      {
        value: 3,
        label: "Shipped Side Products",
        description: "From zero to live deployed apps with active users",
      },
    ],
    visual: <TechnicalVisual />,
  },
  {
    number: "04",
    category: "Growth & Customer Insight",
    claim: "I obsess over the first 5 minutes of a user's experience.",
    description:
      "Activation is where products win. I eliminate cognitive load, instrument step funnels, and design the shortest path to the user's 'Aha!' moment.",
    caseStudySlug: "onboarding-friction-score",
    caseStudyTitle: "Growth Teardown & Redesign",
    stats: [
      {
        value: 38,
        prefix: "+",
        suffix: "%",
        label: "Activation Lift",
        description: "Measurable increase in day-1 core action completion",
      },
      {
        value: 500,
        suffix: "+",
        label: "Active Users",
        description: "Across side projects and community initiatives",
      },
      {
        value: 45,
        prefix: "-",
        suffix: "%",
        label: "Time-to-Value",
        description: "Cut setup latency from 15 mins to under 3 mins",
      },
    ],
    visual: <GrowthVisual />,
  },
];

export default function PillarStack() {
  return (
    <section id="work" className="relative section-padding">
      <div className="container-content">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-accent/20">
            <span>PM Superpowers</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-[1.1] mb-5">
            What I bring to the table.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Every superpower is backed by proof, shipped code, and measurable outcomes.
            Click any pillar to dive into the full case study.
          </p>
        </div>

        {/* Scroll-Driven Sticky Stack of Pillars */}
        <div className="relative space-y-12 md:space-y-16">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.number}
              className="sticky top-20 z-10"
              style={{
                top: `calc(5rem + ${index * 1.5}rem)`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-3xl glass-heavy p-6 sm:p-8 md:p-10 border border-border-glass shadow-2xl backdrop-blur-2xl hover-lift transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Claims, Details & Stats */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded-md bg-accent-muted border border-accent/20">
                        Superpower nº{pillar.number}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-text-tertiary">
                        {pillar.category}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                      {pillar.claim}
                    </h3>

                    <p className="text-text-secondary text-base leading-relaxed max-w-xl">
                      {pillar.description}
                    </p>

                    {/* Stats Grid with CountUp */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-glass">
                      {pillar.stats.map((stat, i) => (
                        <div key={i} className="p-3 rounded-xl bg-surface/50 border border-border-glass/60">
                          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-accent">
                            <CountUp
                              value={stat.value}
                              prefix={stat.prefix}
                              suffix={stat.suffix}
                              decimals={stat.value % 1 !== 0 ? 1 : 0}
                            />
                          </div>
                          <div className="text-xs font-bold text-text-primary mt-1">
                            {stat.label}
                          </div>
                          <p className="text-[11px] text-text-tertiary mt-0.5 leading-snug">
                            {stat.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Case Study CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Link
                        href={`/work/${pillar.caseStudySlug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-text-inverted text-sm font-semibold hover:bg-accent-hover transition-all shadow-md group"
                      >
                        <span>Full case study</span>
                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                      <Link
                        href={`/work/${pillar.caseStudySlug}#results`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <span>View metrics &amp; teardown</span>
                        <ExternalLink size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Diagram / Mockup Panel */}
                  <div className="lg:col-span-5 w-full">
                    {pillar.visual}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
