"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DiscoveryVisual, ExecutionVisual, TechnicalVisual, GrowthVisual } from "./PillarVisuals";

export interface PillarIndicator {
  label: string;
  description: string;
  tag?: string;
}

export interface PillarData {
  number: string;
  category: string;
  claim: string;
  description: string;
  caseStudySlug: string;
  caseStudyTitle: string;
  indicators: PillarIndicator[];
  visual: React.ReactNode;
}

const PILLARS: PillarData[] = [
  {
    number: "01",
    category: "Product Discovery & Strategy",
    claim: "I find the problem worth solving before writing a line of spec.",
    description:
      "I run structured problem-discovery sessions and friction mapping so teams never waste sprint cycles building features nobody asked for.",
    caseStudySlug: "onboarding-friction-score",
    caseStudyTitle: "Onboarding Friction Score",
    indicators: [
      {
        label: "Friction Mapping Framework",
        description: "Built a structured scoring system to quantify onboarding pain points across SaaS products",
        tag: "Method",
      },
      {
        label: "Problem Prioritization",
        description: "Ranked discovery findings by user impact and feasibility to define what to build first",
        tag: "Output",
      },
      {
        label: "Scope Definition",
        description: "Translated raw user friction into actionable P0/P1 feature specs with clear boundaries",
        tag: "Output",
      },
    ],
    visual: <DiscoveryVisual />,
  },
  {
    number: "02",
    category: "Execution & Specs",
    claim: "I write specs that engineers actually read — and ship on time.",
    description:
      "Zero hand-wavy requirements. Precise acceptance criteria, API expectations, edge-case trees, and interactive prototypes.",
    caseStudySlug: "alienhouse-internship",
    caseStudyTitle: "AlienHouse Networks Internship",
    indicators: [
      {
        label: "PM Intern @ AlienHouse Networks",
        description: "Owned product specs and cross-functional coordination across Marketing, Hiring, and Tech squads",
        tag: "Role",
      },
      {
        label: "System-Driven Workflows",
        description: "Designed structured processes with clear acceptance criteria for every deliverable",
        tag: "Approach",
      },
      {
        label: "Cross-Functional Coordination",
        description: "Bridged communication between non-technical stakeholders and engineering teams",
        tag: "Skill",
      },
    ],
    visual: <ExecutionVisual />,
  },
  {
    number: "03",
    category: "Technical Fluency & Building",
    claim: "I don't just spec it — I build it.",
    description:
      "As a CSE student and full-stack builder, I prototype complex interactions, speak git and APIs fluently, and unblock engineering blockers fast.",
    caseStudySlug: "zenos",
    caseStudyTitle: "Zenos: Deep Work OS",
    indicators: [
      {
        label: "Full-Stack Builder",
        description: "Ship production-grade apps with Next.js, TypeScript, PostgreSQL, and modern tooling",
        tag: "Stack",
      },
      {
        label: "Live Deployed Products",
        description: "Multiple projects taken from zero to production with real users",
        tag: "Output",
      },
      {
        label: "CSE Foundation",
        description: "Computer Science & Engineering student with coursework in Java, C++, data structures, and algorithms",
        tag: "Background",
      },
    ],
    visual: <TechnicalVisual />,
  },
  {
    number: "04",
    category: "Growth & Customer Insight",
    claim: "I obsess over the first 5 minutes of a user's experience.",
    description:
      "Activation is where products win. I eliminate cognitive load, map step-by-step funnels, and design the shortest path to the user's 'Aha!' moment.",
    caseStudySlug: "onboarding-friction-score",
    caseStudyTitle: "Onboarding Friction Score",
    indicators: [
      {
        label: "Onboarding Flow Analysis",
        description: "Mapped complete user journeys from signup to first value moment across multiple SaaS products",
        tag: "Method",
      },
      {
        label: "Step-Funnel Mapping",
        description: "Identified exact drop-off points in onboarding flows and proposed targeted interventions",
        tag: "Method",
      },
      {
        label: "Friction Score Framework",
        description: "Created a repeatable scoring rubric to benchmark and compare onboarding experiences",
        tag: "Framework",
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
            Every superpower is backed by real work — case studies, shipped products, and structured frameworks.
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
                  {/* Left Column: Claims, Details & Indicators */}
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

                    {/* Indicators Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-glass">
                      {pillar.indicators.map((indicator, i) => (
                        <div key={i} className="p-3 rounded-xl bg-surface/50 border border-border-glass/60">
                          {indicator.tag && (
                            <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent-muted px-1.5 py-0.5 rounded mb-1.5">
                              {indicator.tag}
                            </span>
                          )}
                          <div className="text-xs font-bold text-text-primary">
                            {indicator.label}
                          </div>
                          <p className="text-[11px] text-text-tertiary mt-0.5 leading-snug">
                            {indicator.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Case Study CTA */}
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
