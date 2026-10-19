import { NextRequest, NextResponse } from "next/server";
import { getAllSocialLinks, upsertSocialLink } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

// GET /api/social-links — list all social links
export async function GET() {
  try {
    const links = await getAllSocialLinks();
    return NextResponse.json(links);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch social links" }, { status: 500 });
  }
}

// POST /api/social-links — create or update a social link
// Body: { id?: number, platform: string, url: string, sort_order: number }
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const link = await upsertSocialLink(
      body.id ?? null,
      body.platform ?? "",
      body.url ?? "",
      body.sort_order ?? 0
    );
    return NextResponse.json(link);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save social link" }, { status: 500 });
  }
}
