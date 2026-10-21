-- ============================================================
-- Josh's Product Lab — Neon PostgreSQL Schema
-- Run this once in your Neon SQL editor to create all tables
-- ============================================================

-- 1. site_config
--    Stores all single-value site settings as key/value pairs
CREATE TABLE IF NOT EXISTS site_config (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

-- Seed default keys (values are empty — fill them in via admin)
INSERT INTO site_config (key, value) VALUES
  ('site_title',            'Josh''s Product Lab'),
  ('meta_description',      ''),
  ('hero_headline',         ''),
  ('hero_subtext',          ''),
  ('hero_cta_label',        ''),
  ('about_text',            ''),
  ('currently_building',    ''),
  ('currently_reading',     ''),
  ('currently_targeting',   ''),
  ('footer_text',           '')
ON CONFLICT (key) DO NOTHING;

-- 2. projects
CREATE TABLE IF NOT EXISTS projects (
  id            SERIAL PRIMARY KEY,
  title         TEXT NOT NULL DEFAULT '',
  label         TEXT NOT NULL DEFAULT '',
  headline      TEXT NOT NULL DEFAULT '',
  description   TEXT NOT NULL DEFAULT '',
  slug          TEXT NOT NULL UNIQUE,
  external_link TEXT,
  is_featured   BOOLEAN NOT NULL DEFAULT false,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 3. social_links
CREATE TABLE IF NOT EXISTS social_links (
  id         SERIAL PRIMARY KEY,
  platform   TEXT NOT NULL DEFAULT '',
  url        TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- 4. guestbook_notes
CREATE TABLE IF NOT EXISTS guestbook_notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message    TEXT NOT NULL,
  name       TEXT NOT NULL DEFAULT 'Anonymous',
  color      TEXT NOT NULL DEFAULT 'yellow',
  emoji      TEXT,
  status     TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  reported   BOOLEAN NOT NULL DEFAULT false,
  ip_hash    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fast lookup for public reads: approved notes, newest first
CREATE INDEX IF NOT EXISTS idx_guestbook_approved
  ON guestbook_notes (status, created_at DESC)
  WHERE status = 'approved';

-- Fast lookup for rate-limit checks by hashed IP
CREATE INDEX IF NOT EXISTS idx_guestbook_ip_rate
  ON guestbook_notes (ip_hash, created_at DESC);
