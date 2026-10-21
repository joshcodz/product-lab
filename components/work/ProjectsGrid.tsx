"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Terminal, Code2, Compass } from "lucide-react";

export type ProjectCategory = "All" | "Case studies" | "Side projects";

export interface ProjectCardData {
  id: string;
  name: string;
  description: string;
  category: "Case studies" | "Side projects";
  tags: string[];
  status: "Live" | "Prototype" | "Concept" | "Shipped";
  slug?: string;
  externalLink?: string;
  image: string;
}

const PROJECTS: ProjectCardData[] = [
  {
    id: "1",
    name: "Onboarding Friction Score",
    description: "Reduced day-1 drop-off by 40% with automated step-friction diagnostics for B2B SaaS.",
    category: "Case studies",
    tags: ["B2B SaaS", "Growth", "0→1"],
    status: "Shipped",
    slug: "onboarding-friction-score",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Zenos Collaboration Engine",
    description: "Built a multiplayer canvas and document workspace for student sprint teams from 0 to live in 48 hours.",
    category: "Side projects",
    tags: ["Dev Tools", "Real-Time", "Next.js"],
    status: "Live",
    slug: "zenos",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "AlienHouse Core PM Suite",
    description: "Shipped 3 core features leading a cross-functional squad of 8 engineers and designers.",
    category: "Case studies",
    tags: ["Product Management", "B2B SaaS", "Internship"],
    status: "Shipped",
    slug: "alienhouse-internship",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES: ProjectCategory[] = ["All", "Case studies", "Side projects"];

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding bg-bg">
      <div className="container-content">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-accent/20">
              <span>Archive &amp; Shipments</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
              Selected work &amp; side projects
            </h2>
            <p className="text-text-secondary text-base mt-2">
              2024 — 2026 · Shipped products, interactive prototypes, and product specs.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? "text-text-inverted"
                    : "text-text-secondary hover:text-text-primary glass hover:bg-surface/80"
                }`}
              >
                {activeFilter === cat && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 bg-accent rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl glass border border-border-glass overflow-hidden flex flex-col justify-between hover-lift shadow-xs hover:shadow-xl transition-all"
              >
                <Link
                  href={project.slug ? `/work/${project.slug}` : (project.externalLink || "#")}
                  className="flex flex-col h-full"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-48 overflow-hidden bg-bg-secondary">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/50 text-white border border-white/20">
                        {project.status}
                      </span>
                    </div>

                    {/* Arrow Action on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-md">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface border border-border-glass text-text-tertiary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border-glass flex items-center justify-between text-xs font-semibold text-accent">
                      <span>Explore details</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Closing Card: Playground */}
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group rounded-2xl glass-heavy border border-accent/30 p-6 flex flex-col justify-between hover-lift shadow-xs hover:shadow-xl bg-gradient-to-br from-accent-muted/30 via-transparent to-lavender/10"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent text-text-inverted flex items-center justify-center shadow-md">
                  <Compass size={24} />
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Experiments &amp; Lab</span>
                </div>

                <h3 className="font-display font-bold text-2xl text-text-primary">
                  The Playground
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed">
                  Interactive UI experiments, small canvas widgets, micro-interactions, and things I build purely for the curiosity of it.
                </p>
              </div>

              <Link
                href="/work"
                className="mt-6 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface border border-border-glass text-xs font-bold text-text-primary hover:border-accent group/btn transition-colors"
              >
                <span>Enter Playground</span>
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-accent" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
