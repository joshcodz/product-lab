import { sql } from "./db";
import { createHash } from "crypto";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NoteStatus = "pending" | "approved" | "rejected";

export interface GuestbookNote {
  id: string;
  message: string;
  name: string;
  color: string;
  emoji: string | null;
  status: NoteStatus;
  reported: boolean;
  ip_hash: string;
  created_at: string;
}

/** Fields the public POST endpoint accepts (after validation). */
export interface CreateNoteInput {
  message: string;
  name: string;
  color: string;
  emoji: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** SHA-256 hash of a raw IP string. We never store the raw IP. */
export function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

/**
 * Strip HTML tags and URLs from user input so the message is plain text only.
 */
export function sanitiseMessage(raw: string): string {
  return (
    raw
      // Strip HTML tags
      .replace(/<[^>]*>/g, "")
      // Strip URLs (http/https/ftp)
      .replace(/https?:\/\/\S+/gi, "")
      .replace(/ftp:\/\/\S+/gi, "")
      // Strip www. links without protocol
      .replace(/www\.\S+/gi, "")
      // Collapse multiple spaces
      .replace(/\s{2,}/g, " ")
      .trim()
  );
}

// ─── Public reads ─────────────────────────────────────────────────────────────

/**
 * Fetch approved notes, newest first, with cursor pagination.
 *
 * @param limit  Max notes to return (default 24)
 * @param cursor ISO date string — return notes older than this
 */
export async function getApprovedNotes(
  limit = 24,
  cursor?: string
): Promise<{ notes: GuestbookNote[]; nextCursor: string | null }> {
  try {
    let rows: GuestbookNote[];

    if (cursor) {
      rows = (await sql`
        SELECT id, message, name, color, emoji, status, reported, created_at
        FROM guestbook_notes
        WHERE status = 'approved'
          AND created_at < ${cursor}
        ORDER BY created_at DESC
        LIMIT ${limit + 1}
      `) as GuestbookNote[];
    } else {
      rows = (await sql`
        SELECT id, message, name, color, emoji, status, reported, created_at
        FROM guestbook_notes
        WHERE status = 'approved'
        ORDER BY created_at DESC
        LIMIT ${limit + 1}
      `) as GuestbookNote[];
    }

    const hasMore = rows.length > limit;
    const notes = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore ? notes[notes.length - 1].created_at : null;

    return { notes, nextCursor };
  } catch (err: unknown) {
    const dbErr = err as { code?: string };
    if (dbErr?.code === "42P01") {
      // Table doesn't exist in Neon DB yet
      console.warn("[guestbook] 'guestbook_notes' table not found in database.");
      return { notes: [], nextCursor: null };
    }
    throw err;
  }
}

// ─── Insert (public submission) ───────────────────────────────────────────────

/**
 * Insert a new note with status = 'pending'.
 * Returns the created note (with its id and created_at).
 */
export async function createNote(
  input: CreateNoteInput,
  ipHash: string
): Promise<GuestbookNote> {
  const rows = await sql`
    INSERT INTO guestbook_notes (message, name, color, emoji, ip_hash)
    VALUES (
      ${input.message},
      ${input.name || "Anonymous"},
      ${input.color},
      ${input.emoji ?? null}
    , ${ipHash})
    RETURNING *
  `;
  return rows[0] as GuestbookNote;
}

// ─── Rate limiting ────────────────────────────────────────────────────────────

/**
 * Count how many notes this IP hash has submitted in the last 24 hours.
 */
export async function countRecentByIP(ipHash: string): Promise<number> {
  const rows = await sql`
    SELECT COUNT(*)::int AS cnt
    FROM guestbook_notes
    WHERE ip_hash = ${ipHash}
      AND created_at > NOW() - INTERVAL '24 hours'
  `;
  return rows[0]?.cnt ?? 0;
}

// ─── Admin moderation ─────────────────────────────────────────────────────────

/** Fetch ALL notes for the admin queue, with optional status/reported filters. */
export async function getNotesForAdmin(filters?: {
  status?: NoteStatus;
  reported?: boolean;
}): Promise<GuestbookNote[]> {
  if (filters?.reported) {
    return (await sql`
      SELECT * FROM guestbook_notes
      WHERE reported = true
      ORDER BY created_at DESC
    `) as GuestbookNote[];
  }

  if (filters?.status) {
    return (await sql`
      SELECT * FROM guestbook_notes
      WHERE status = ${filters.status}
      ORDER BY created_at DESC
    `) as GuestbookNote[];
  }

  return (await sql`
    SELECT * FROM guestbook_notes
    ORDER BY created_at DESC
  `) as GuestbookNote[];
}

/** Get counts for the admin dashboard. */
export async function getNoteCounts(): Promise<{
  pending: number;
  approved: number;
  rejected: number;
  reported: number;
}> {
  const rows = await sql`
    SELECT
      COUNT(*) FILTER (WHERE status = 'pending')  AS pending,
      COUNT(*) FILTER (WHERE status = 'approved') AS approved,
      COUNT(*) FILTER (WHERE status = 'rejected') AS rejected,
      COUNT(*) FILTER (WHERE reported = true)      AS reported
    FROM guestbook_notes
  `;
  const r = rows[0];
  return {
    pending: Number(r.pending),
    approved: Number(r.approved),
    rejected: Number(r.rejected),
    reported: Number(r.reported),
  };
}

/** Update a note's status (approve / reject). Admin only. */
export async function updateNoteStatus(
  id: string,
  status: NoteStatus
): Promise<GuestbookNote | null> {
  const rows = await sql`
    UPDATE guestbook_notes
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *
  `;
  return (rows[0] as GuestbookNote) ?? null;
}

/** Flag a note as reported. Public — anyone can do this. */
export async function reportNote(id: string): Promise<boolean> {
  const rows = await sql`
    UPDATE guestbook_notes
    SET reported = true
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}

/** Hard-delete a note. Admin only. */
export async function deleteNote(id: string): Promise<boolean> {
  const rows = await sql`
    DELETE FROM guestbook_notes
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}

/** Bulk-update status for multiple IDs. Admin only. */
export async function bulkUpdateStatus(
  ids: string[],
  status: NoteStatus
): Promise<number> {
  if (ids.length === 0) return 0;
  const rows = await sql`
    UPDATE guestbook_notes
    SET status = ${status}
    WHERE id = ANY(${ids})
    RETURNING id
  `;
  return rows.length;
}

/** Bulk-delete multiple IDs. Admin only. */
export async function bulkDeleteNotes(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const rows = await sql`
    DELETE FROM guestbook_notes
    WHERE id = ANY(${ids})
    RETURNING id
  `;
  return rows.length;
}
