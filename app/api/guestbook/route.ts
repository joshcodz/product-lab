import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  getApprovedNotes,
  createNote,
  countRecentByIP,
  hashIP,
  sanitiseMessage,
} from "@/lib/guestbook";
import { checkProfanity } from "@/lib/profanity";

// ─── Validation schemas ───────────────────────────────────────────────────────

const ALLOWED_COLORS = ["yellow", "pink", "mint", "sky", "lavender"] as const;

// Single emoji regex (basic: emoji presentation sequences)
const EMOJI_RE = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)$/u;

const NoteSchema = z.object({
  message: z
    .string()
    .min(3, "Message must be at least 3 characters")
    .max(140, "Message must be 140 characters or fewer"),
  name: z
    .string()
    .max(30, "Name must be 30 characters or fewer")
    .optional()
    .default("Anonymous"),
  color: z.enum(ALLOWED_COLORS, {
    message: "Invalid color",
  }),
  emoji: z
    .string()
    .refine((val) => EMOJI_RE.test(val), { message: "Must be a single emoji" })
    .nullable()
    .optional()
    .default(null),
  // Anti-spam fields
  website: z.string().optional(), // honeypot — must be empty
  _formLoadedAt: z.number().optional(), // timestamp when form was opened
});

// ─── Rate limit config ────────────────────────────────────────────────────────

const MAX_SUBMISSIONS_PER_DAY = 3;
const MIN_SUBMIT_TIME_MS = 3000; // 3 seconds minimum

// ─── GET: Approved notes, paginated ───────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") || undefined;
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "24", 10) || 24, 1),
      48
    );

    const { notes, nextCursor } = await getApprovedNotes(limit, cursor);

    return NextResponse.json(
      { notes, nextCursor },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("[GET /api/guestbook] Error:", error);
    return NextResponse.json(
      { error: "Failed to load notes" },
      { status: 500 }
    );
  }
}

// ─── POST: Submit a new note ──────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // 1. Parse JSON
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // 2. Zod validation
    const parsed = NoteSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues?.[0];
      return NextResponse.json(
        { error: firstError?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { message, name, color, emoji, website, _formLoadedAt } = parsed.data;

    // 3. Honeypot check — bots fill the hidden "website" field
    if (website) {
      // Silently accept but don't insert (looks like success to the bot)
      return NextResponse.json({
        success: true,
        note: { id: "00000000-0000-0000-0000-000000000000" },
      });
    }

    // 4. Time-to-submit check
    if (_formLoadedAt) {
      const elapsed = Date.now() - _formLoadedAt;
      if (elapsed < MIN_SUBMIT_TIME_MS) {
        return NextResponse.json(
          { error: "That was too fast! Please take a moment and try again." },
          { status: 429 }
        );
      }
    }

    // 5. Sanitise: strip HTML tags and URLs
    const cleanMessage = sanitiseMessage(message);
    if (cleanMessage.length < 3) {
      return NextResponse.json(
        { error: "Message is too short after removing links/HTML. Please write a genuine note." },
        { status: 400 }
      );
    }

    // 6. Profanity filter
    const profanityCheck = checkProfanity(cleanMessage);
    if (!profanityCheck.clean) {
      return NextResponse.json(
        { error: profanityCheck.reason },
        { status: 400 }
      );
    }

    // Also check the name
    const nameCheck = checkProfanity(name || "");
    if (!nameCheck.clean) {
      return NextResponse.json(
        { error: "Please use an appropriate name." },
        { status: 400 }
      );
    }

    // 7. Rate limit — 3 per IP per 24h
    const rawIP =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const ipHash = hashIP(rawIP);

    const recentCount = await countRecentByIP(ipHash);
    if (recentCount >= MAX_SUBMISSIONS_PER_DAY) {
      return NextResponse.json(
        {
          error:
            "You've already left a few notes today — come back tomorrow!",
        },
        { status: 429 }
      );
    }

    // 8. Insert with status = 'pending'
    const note = await createNote(
      {
        message: cleanMessage,
        name: name || "Anonymous",
        color,
        emoji: emoji ?? null,
      },
      ipHash
    );

    // 9. Return success
    return NextResponse.json({
      success: true,
      note: {
        id: note.id,
        message: note.message,
        name: note.name,
        color: note.color,
        emoji: note.emoji,
        created_at: note.created_at,
      },
    });
  } catch (error) {
    console.error("[POST /api/guestbook] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
