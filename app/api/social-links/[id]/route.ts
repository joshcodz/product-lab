import { NextRequest, NextResponse } from "next/server";
import { deleteSocialLink } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

// DELETE /api/social-links/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await deleteSocialLink(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete social link" }, { status: 500 });
  }
}
