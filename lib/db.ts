import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.DATABASE_URL);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  key: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  label: string;
  headline: string;
  description: string;
  slug: string;
  external_link: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  sort_order: number;
}

// ─── site_config helpers ──────────────────────────────────────────────────────

export async function getAllConfig(): Promise<Record<string, string>> {
  const rows = await sql`SELECT key, value FROM site_config`;
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getConfigValue(key: string): Promise<string | null> {
  const rows = await sql`SELECT value FROM site_config WHERE key = ${key}`;
  return rows[0]?.value ?? null;
}

export async function upsertConfig(key: string, value: string): Promise<void> {
  await sql`
    INSERT INTO site_config (key, value)
    VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
}

// ─── project helpers ──────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  return (await sql`
    SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC
  `) as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await sql`
    SELECT * FROM projects WHERE is_featured = true ORDER BY sort_order ASC
  `) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const rows = await sql`SELECT * FROM projects WHERE slug = ${slug}`;
  return (rows[0] as Project) ?? null;
}

export async function createProject(
  data: Omit<Project, "id" | "created_at">
): Promise<Project> {
  const rows = await sql`
    INSERT INTO projects (title, label, headline, description, slug, external_link, is_featured, sort_order)
    VALUES (
      ${data.title},
      ${data.label},
      ${data.headline},
      ${data.description},
      ${data.slug},
      ${data.external_link},
      ${data.is_featured},
      ${data.sort_order}
    )
    RETURNING *
  `;
  return rows[0] as Project;
}

export async function updateProject(
  id: number,
  data: Partial<Omit<Project, "id" | "created_at">>
): Promise<Project> {
  const rows = await sql`
    UPDATE projects SET
      title        = COALESCE(${data.title ?? null}, title),
      label        = COALESCE(${data.label ?? null}, label),
      headline     = COALESCE(${data.headline ?? null}, headline),
      description  = COALESCE(${data.description ?? null}, description),
      slug         = COALESCE(${data.slug ?? null}, slug),
      external_link = ${data.external_link !== undefined ? data.external_link : null},
      is_featured  = COALESCE(${data.is_featured ?? null}, is_featured),
      sort_order   = COALESCE(${data.sort_order ?? null}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Project;
}

export async function deleteProject(id: number): Promise<void> {
  await sql`DELETE FROM projects WHERE id = ${id}`;
}

// ─── social_links helpers ─────────────────────────────────────────────────────

export async function getAllSocialLinks(): Promise<SocialLink[]> {
  return (await sql`
    SELECT * FROM social_links ORDER BY sort_order ASC
  `) as SocialLink[];
}

export async function upsertSocialLink(
  id: number | null,
  platform: string,
  url: string,
  sort_order: number
): Promise<SocialLink> {
  if (id) {
    const rows = await sql`
      UPDATE social_links SET platform = ${platform}, url = ${url}, sort_order = ${sort_order}
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] as SocialLink;
  } else {
    const rows = await sql`
      INSERT INTO social_links (platform, url, sort_order)
      VALUES (${platform}, ${url}, ${sort_order})
      RETURNING *
    `;
    return rows[0] as SocialLink;
  }
}

export async function deleteSocialLink(id: number): Promise<void> {
  await sql`DELETE FROM social_links WHERE id = ${id}`;
}
