import { NextRequest, NextResponse } from "next/server";
import { getAllConfig, upsertConfig } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { DEFAULT_SITE_CONFIG } from "@/lib/siteDefaults";

// GET /api/config — returns all site_config rows merged over the default site values
export async function GET() {
  try {
    const dbConfig = await getAllConfig();
    const merged = { ...DEFAULT_SITE_CONFIG, ...dbConfig };
    return NextResponse.json(merged);
  } catch (err) {
    console.error(err);
    // If DB has an issue, still return live defaults so admin never sees blank fields
    return NextResponse.json(DEFAULT_SITE_CONFIG);
  }
}

// POST /api/config — upserts one or many key/value pairs
// Body: { key: string, value: string } | { updates: Record<string, string> }
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (body.updates && typeof body.updates === "object") {
      // Bulk update
      await Promise.all(
        Object.entries(body.updates as Record<string, string>).map(([k, v]) =>
          upsertConfig(k, v)
        )
      );
    } else if (typeof body.key === "string") {
      await upsertConfig(body.key, body.value ?? "");
    } else {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
  }
}
