import { NextRequest, NextResponse } from "next/server";
import {
  updateNoteStatus,
  reportNote,
  deleteNote,
  type NoteStatus,
} from "@/lib/guestbook";
import { isAuthenticated } from "@/lib/auth";

// ─── PATCH: Update note status (admin) or report (public) ─────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
    }

    // Public action: report a note (anyone can flag)
    if (body.reported === true) {
      const success = await reportNote(id);
      if (!success) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, reported: true });
    }

    // Admin actions: approve / reject
    if (!isAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const status = body.status as NoteStatus;
    if (!["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: approved, rejected, or pending." },
        { status: 400 }
      );
    }

    const updated = await updateNoteStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, note: updated });
  } catch (error) {
    console.error("[PATCH /api/guestbook/[id]] Error:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

// ─── DELETE: Remove a note (admin only) ───────────────────────────────────────

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthenticated()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
    }

    const success = await deleteNote(id);
    if (!success) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/guestbook/[id]] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
