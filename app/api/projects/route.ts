import { NextRequest, NextResponse } from "next/server";
import { getAllProjects, createProject } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

// GET /api/projects — list all projects
export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST /api/projects — create a new project
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const project = await createProject({
      title: body.title ?? "",
      label: body.label ?? "",
      headline: body.headline ?? "",
      description: body.description ?? "",
      slug: body.slug ?? "",
      external_link: body.external_link ?? null,
      is_featured: body.is_featured ?? false,
      sort_order: body.sort_order ?? 0,
    });
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
