"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Rocket, Award, Code2, Flame, ExternalLink } from "lucide-react";

export interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
  tag: string;
  link?: string;
  glowColor: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    icon: <Trophy className="text-amber-400" size={24} />,
    title: "Samsung EnnovateX Finalist",
    detail: "Top national finalist for developing an AI-driven accessibility tool.",
    tag: "National Finalist",
    link: "https://www.samsung.com",
    glowColor: "group-hover:shadow-amber-500/20",
  },
  {
    id: "2",
    icon: <Users className="text-accent" size={24} />,
    title: "Founders Club SRMIST Lead",
    detail: "Leading product & tech initiatives for 150+ student founders and creators.",
    tag: "Leadership",
    link: "https://foundersclubsrm.com",
    glowColor: "group-hover:shadow-accent/20",
  },
  {
    id: "3",
    icon: <Rocket className="text-emerald-400" size={24} />,
    title: "PM Intern @ AlienHouse",
    detail: "Spearheaded 3 core feature launches, reduced user drop-off across beta.",
    tag: "Product Management",
    link: "https://alienhouse.io",
    glowColor: "group-hover:shadow-emerald-500/20",
  },
  {
    id: "4",
    icon: <Code2 className="text-sky-400" size={24} />,
    title: "3+ Shipped 0→1 Side Apps",
    detail: "Full-stack built & launched Onboarding Friction Score, Zenos, and TaskBot.",
    tag: "Builder",
    glowColor: "group-hover:shadow-sky-500/20",
  },
  {
    id: "5",
    icon: <Flame className="text-pink-400" size={24} />,
    title: "Hackathon Winner & Mentor",
    detail: "Won 2 regional hackathons, mentored 40+ students in product teardowns.",
    tag: "Community",
    glowColor: "group-hover:shadow-pink-500/20",
  },
  {
    id: "6",
    icon: <Award className="text-purple-400" size={24} />,
    title: "Top 5% GitHub Contributions",
    detail: "Consistent daily builder with 450+ commits across open-source and SaaS tooling.",
    tag: "Open Source",
    link: "https://github.com/joshcodz",
    glowColor: "group-hover:shadow-purple-500/20",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-bg-secondary/40 relative">
      <div className="container-content">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-accent/20">
            <span>Milestones &amp; Proof</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Achievements
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Honors, leadership roles, and hackathons where I took zero to one.
          </p>
        </div>

        {/* 3D Tilt Badge Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative p-6 rounded-2xl glass border border-border-glass transition-all duration-300 shadow-sm hover:shadow-xl ${item.glowColor}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-surface/80 border border-border-glass shadow-xs group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-surface border border-border-glass text-text-secondary">
                  {item.tag}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-accent transition-colors flex items-center gap-1.5">
                <span>{item.title}</span>
                {item.link && (
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-accent shrink-0"
                  />
                )}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed">
                {item.detail}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label={item.title}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
