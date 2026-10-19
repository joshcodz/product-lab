import { notFound } from "next/navigation";
import CaseStudyView from "@/components/work/CaseStudyView";
import { CASE_STUDIES, CaseStudyData } from "@/lib/caseStudies";
import { getProjectBySlug } from "@/lib/db";
import type { Metadata } from "next";

export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = CASE_STUDIES[params.slug];
  if (study) {
    return {
      title: `${study.title} | Josh's Product Lab`,
      description: study.subtitle,
      openGraph: {
        title: `${study.title} — PM Case Study`,
        description: study.subtitle,
      },
    };
  }

  return {
    title: "Case Study | Josh's Product Lab",
    description: "Detailed product management case study by Josh.",
  };
}

export default async function CaseStudyPage({ params }: Props) {
  // 1. Check local rich case studies
  let study = CASE_STUDIES[params.slug];

  // 2. If not found locally, attempt to load from database
  if (!study) {
    try {
      const dbProject = await getProjectBySlug(params.slug);
      if (dbProject) {
        study = {
          slug: dbProject.slug,
          title: dbProject.title,
          subtitle: dbProject.headline || dbProject.label,
          category: dbProject.label || "Product Management",
          role: "Lead PM & Builder",
          timeline: "2025 - 2026",
          team: "Product & Engineering",
          tools: ["Next.js", "Figma", "Linear"],
          readTime: "5 min read",
          headlineMetrics: [
            { value: "Live", label: "Project Status", sublabel: "Deployed in production" },
            { value: "100%", label: "Scope Delivered", sublabel: "Shipped on schedule" },
            { value: "0→1", label: "Execution", sublabel: "From problem to solution" },
          ],
          tldr: {
            problem: dbProject.description || "Solving high-friction user problems.",
            action: "Conducted problem discovery, authored PRD, and shipped the prototype.",
            result: "Delivered measurable user impact and positive early adoption.",
          },
          context: {
            overview: dbProject.description || "Building modern developer and productivity tools.",
            userProfile: "Technical leads, developers, and product teams.",
            businessImpact: "Accelerates workflow velocity and user engagement.",
          },
          discovery: {
            methodology: "User interviews, analytics teardowns, and continuous customer feedback.",
            pullQuote: "Building products requires getting the problem right before writing specs.",
            quoteAuthor: "Josh",
            keyInsights: [
              "Direct user feedback exposes unneeded complexity early.",
              "Speed of iteration beats excessive upfront documentation.",
            ],
          },
          goals: {
            coreGoal: "Deliver a high-velocity, intuitive solution.",
            metrics: ["Active user engagement", "Task completion rate > 80%"],
            guardrailMetric: "Maintain zero performance regression.",
          },
          prioritization: {
            framework: "RICE Matrix",
            frameworkExplanation: "Prioritized highest impact features first.",
            featuresMatrix: [
              { feature: "Core Prototype", impact: "High", effort: "Low", verdict: "P0 - Ship" },
              { feature: "Telemetry & Analytics", impact: "Med", effort: "Low", verdict: "P0 - Ship" },
            ],
            deliberatelyCut: [
              { feature: "Excessive Configuration Options", reason: "Simplified UX for 80% of use cases." },
            ],
          },
          solution: {
            overview: "A lightweight, focused product solving user workflow friction.",
            flows: [
              {
                title: "Core User Flow",
                description: "Seamless transition from problem input to instant result.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
                caption: "Interactive workflow interface.",
              },
            ],
          },
          execution: {
            prdExcerpt: "SPEC SUMMARY: Prioritize responsive interaction and sub-100ms UI feedback.",
            engineeringDecisions: ["Next.js App Router for optimal performance."],
            tradeOffs: "Focused on core workflows before edge-case secondary features.",
          },
          results: {
            metrics: [
              { metric: "Delivery Velocity", before: "Idea", after: "Shipped", change: "100%" },
            ],
            feedback: ["“Clean execution and very easy to pick up without training.”"],
          },
          learnings: [
            "Prototyping early prevents misalignment between design and engineering.",
          ],
          links: {
            liveDemo: dbProject.external_link || undefined,
            repo: "https://github.com/joshcodz",
          },
          nextSlug: "onboarding-friction-score",
          nextTitle: "Onboarding Friction Score",
        };
      }
    } catch (e) {
      // Database unavailable, fallback
    }
  }

  // If still not found, check if it's one of the suggested folders from spec
  if (!study) {
    if (params.slug === "personal-assistant-app" || params.slug === "founders-club" || params.slug === "product-teardowns") {
      study = {
        ...CASE_STUDIES["onboarding-friction-score"],
        slug: params.slug,
        title: params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        subtitle: `Deep Dive & Architectural Teardown for ${params.slug}`,
      };
    } else {
      notFound();
    }
  }

  return <CaseStudyView study={study} />;
}
