import Link from "next/link";
import { Project } from "@/lib/db";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const CardContent = (
    <div className="bg-[#F4F4F4] rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col">
      {project.label && (
        <p className="text-[#666666] text-xs font-medium uppercase tracking-wide mb-3">
          {project.label}
        </p>
      )}
      {project.title && (
        <h3 className="text-[#111111] font-semibold text-lg mb-2">
          {project.title}
        </h3>
      )}
      {project.headline && (
        <p className="text-[#666666] text-sm mb-3">{project.headline}</p>
      )}
      {project.description && (
        <p className="text-[#666666] text-sm leading-relaxed flex-1">
          {project.description}
        </p>
      )}
      {project.external_link && (
        <div className="mt-4">
          <span className="text-[#111111] text-sm font-medium underline underline-offset-2">
            View project →
          </span>
        </div>
      )}
    </div>
  );

  // If external link, open in new tab; otherwise link to internal slug page
  if (project.external_link) {
    return (
      <a
        href={project.external_link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <Link href={`/work/${project.slug}`} className="block h-full">
      {CardContent}
    </Link>
  );
}
