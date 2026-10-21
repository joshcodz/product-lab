import { notFound, redirect } from "next/navigation";
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
  if (params.slug === "product-teardowns") {
    redirect("/teardowns");
  }

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

          sections: [
            {
              id: "overview",
              title: "Project Overview",
              content: dbProject.description || "Building modern developer and productivity tools.",
            },
          ],
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

  // If still not found, trigger 404
  if (!study) {
    notFound();
  }

  return <CaseStudyView study={study} />;
}
