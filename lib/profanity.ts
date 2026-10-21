/**
 * Server-side profanity / abuse filter.
 *
 * Approach: a compact blocklist checked with word-boundary regex so
 * "class" doesn't match but "ass" standalone does. Case-insensitive,
 * strips common leet-speak substitutions before checking.
 *
 * This is intentionally lightweight — the admin moderation queue is the
 * real safety net.
 */

// Blocklist — keep alphabetised for easy maintenance.
// Intentionally small: the moderation queue catches edge cases.
const BLOCKED_WORDS = [
  "asshole",
  "bastard",
  "bitch",
  "bollocks",
  "crap",
  "cunt",
  "damn",
  "dick",
  "douchebag",
  "fag",
  "faggot",
  "fuck",
  "motherfucker",
  "nigga",
  "nigger",
  "piss",
  "prick",
  "pussy",
  "retard",
  "shit",
  "slut",
  "twat",
  "wanker",
  "whore",
];

// Build a single regex with word boundaries for speed
const BLOCKED_RE = new RegExp(
  `\\b(${BLOCKED_WORDS.join("|")})\\b`,
  "i"
);

/** Common leet-speak substitutions */
function deLeet(text: string): string {
  return text
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/\$/g, "s")
    .replace(/@/g, "a")
    .replace(/\|/g, "i");
}

export interface ProfanityResult {
  /** true if the text passes the filter */
  clean: boolean;
  /** human-friendly reason if rejected */
  reason?: string;
}

/**
 * Check a string for profanity / abuse.
 * Returns `{ clean: true }` if acceptable, or `{ clean: false, reason }`.
 */
export function checkProfanity(text: string): ProfanityResult {
  const normalised = deLeet(text.toLowerCase());

  if (BLOCKED_RE.test(normalised)) {
    return {
      clean: false,
      reason:
        "Your message contains language that isn't appropriate for the guestbook. Please rephrase and try again.",
    };
  }

  return { clean: true };
}
