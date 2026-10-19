"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_SITE_CONFIG } from "@/lib/siteDefaults";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
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

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  sort_order: number;
}

interface SiteConfig {
  [key: string]: string;
}

type Tab = "hero" | "projects" | "about" | "currently" | "social" | "site";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const EMPTY_PROJECT: Omit<Project, "id" | "created_at"> = {
  title: "",
  label: "",
  headline: "",
  description: "",
  slug: "",
  external_link: "",
  is_featured: false,
  sort_order: 0,
};

// ─── Field with Current Live Value Badge ─────────────────────────────────────

function EditableField({
  label,
  value,
  currentValue,
  onChange,
  onReset,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  currentValue?: string;
  onChange: (v: string) => void;
  onReset?: () => void;
  placeholder?: string;
  type?: string;
}) {
  const isChanged = currentValue !== undefined && value !== currentValue;

  return (
    <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA]/50">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#555555] uppercase tracking-wide">
          {label}
        </label>
        {isChanged && (
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            Unsaved changes
          </span>
        )}
      </div>

      {currentValue !== undefined && (
        <div className="flex items-start gap-1.5 text-xs text-[#777777] bg-white p-2 rounded border border-[#EBEBEB]">
          <span className="font-semibold text-[#444444] shrink-0">Current live:</span>
          <span className="truncate italic font-mono text-[#333333]">
            {currentValue || "(empty)"}
          </span>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border border-[#DCDCDC] bg-white rounded-md px-3 py-2 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
        />
        {isChanged && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-[#666666] hover:text-[#111111] px-2.5 py-1.5 border border-[#DCDCDC] bg-white rounded-md"
            title="Reset to current live value"
          >
            Revert
          </button>
        )}
      </div>
    </div>
  );
}

function EditableTextArea({
  label,
  value,
  currentValue,
  onChange,
  onReset,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  currentValue?: string;
  onChange: (v: string) => void;
  onReset?: () => void;
  placeholder?: string;
  rows?: number;
}) {
  const isChanged = currentValue !== undefined && value !== currentValue;

  return (
    <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-[#EBEBEB] bg-[#FAFAFA]/50">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#555555] uppercase tracking-wide">
          {label}
        </label>
        {isChanged && (
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            Unsaved changes
          </span>
        )}
      </div>

      {currentValue !== undefined && (
        <div className="text-xs text-[#777777] bg-white p-2 rounded border border-[#EBEBEB] max-h-24 overflow-y-auto">
          <span className="font-semibold text-[#444444] block mb-1">Current live:</span>
          <p className="whitespace-pre-line text-[#333333] font-mono">
            {currentValue || "(empty)"}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="border border-[#DCDCDC] bg-white rounded-md px-3 py-2 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] resize-y"
        />
        {isChanged && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="self-end text-xs text-[#666666] hover:text-[#111111] px-2.5 py-1.5 border border-[#DCDCDC] bg-white rounded-md"
          >
            Revert to live value
          </button>
        )}
      </div>
    </div>
  );
}

function SaveButton({
  loading,
  label = "Apply & Save Changes",
}: {
  loading: boolean;
  label?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-[#111111] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#333333] transition-all disabled:opacity-50 self-start shadow-sm active:scale-95"
    >
      {loading ? "Saving…" : label}
    </button>
  );
}

function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg text-sm font-medium shadow-xl z-50 transition-all ${
        type === "success"
          ? "bg-[#111111] text-white"
          : "bg-red-500 text-white"
      }`}
    >
      {message}
    </div>
  );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // ── Shared config state ──
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [configLoading, setConfigLoading] = useState(false);

  // ── Projects state ──
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Omit<Project, "id" | "created_at"> & { id?: number } | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // ── Social links state ──
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [socialLoading, setSocialLoading] = useState(false);

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // ── Load data ──
  useEffect(() => {
    fetchConfig();
    fetchProjects();
    fetchSocialLinks();
  }, []);

  async function fetchConfig() {
    try {
      const res = await fetch("/api/config");
      if (res.ok) {
        const data = await res.json();
        setConfig({ ...DEFAULT_SITE_CONFIG, ...data });
      }
    } catch {
      setConfig(DEFAULT_SITE_CONFIG);
    }
  }

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) setProjects(await res.json());
    } catch {}
  }

  async function fetchSocialLinks() {
    try {
      const res = await fetch("/api/social-links");
      if (res.ok) setSocialLinks(await res.json());
    } catch {}
  }

  // ── Logout ──
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // ── Save config (bulk) ──
  async function saveConfig(updates: Record<string, string>) {
    setConfigLoading(true);
    const res = await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
    setConfigLoading(false);
    if (res.ok) {
      setConfig((prev) => ({ ...prev, ...updates }));
      showToast("Saved & updated live on website!");
    } else {
      showToast("Failed to save", "error");
    }
  }

  // ── Tab 1: Hero Form Component ──
  function HeroTabContent() {
    const [headline, setHeadline] = useState(config.hero_headline || DEFAULT_SITE_CONFIG.hero_headline);
    const [subtext, setSubtext] = useState(config.hero_subtext || DEFAULT_SITE_CONFIG.hero_subtext);
    const [ctaLabel, setCtaLabel] = useState(config.hero_cta_label || DEFAULT_SITE_CONFIG.hero_cta_label);
    const [ctaUrl, setCtaUrl] = useState(config.hero_cta_url || DEFAULT_SITE_CONFIG.hero_cta_url);
    const [statusBadge, setStatusBadge] = useState(config.status_badge || DEFAULT_SITE_CONFIG.status_badge);
    const [statusHeadline, setStatusHeadline] = useState(config.status_headline || DEFAULT_SITE_CONFIG.status_headline);

    useEffect(() => {
      setHeadline(config.hero_headline || DEFAULT_SITE_CONFIG.hero_headline);
      setSubtext(config.hero_subtext || DEFAULT_SITE_CONFIG.hero_subtext);
      setCtaLabel(config.hero_cta_label || DEFAULT_SITE_CONFIG.hero_cta_label);
      setCtaUrl(config.hero_cta_url || DEFAULT_SITE_CONFIG.hero_cta_url);
      setStatusBadge(config.status_badge || DEFAULT_SITE_CONFIG.status_badge);
      setStatusHeadline(config.status_headline || DEFAULT_SITE_CONFIG.status_headline);
    }, [config]);

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();
      await saveConfig({
        hero_headline: headline,
        hero_subtext: subtext,
        hero_cta_label: ctaLabel,
        hero_cta_url: ctaUrl,
        status_badge: statusBadge,
        status_headline: statusHeadline,
      });
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
        <div className="mb-2">
          <h2 className="text-base font-bold text-[#111111]">Hero Section &amp; Menu Bar</h2>
          <p className="text-xs text-[#666666]">
            Every field displays the current live value running on your website. Edit and click &ldquo;Apply &amp; Save Changes&rdquo; to update immediately.
          </p>
        </div>

        <EditableField
          label="Menu Bar Headline"
          value={statusHeadline}
          currentValue={config.status_headline || DEFAULT_SITE_CONFIG.status_headline}
          onChange={setStatusHeadline}
          onReset={() => setStatusHeadline(config.status_headline || DEFAULT_SITE_CONFIG.status_headline)}
          placeholder="Josh · Aspiring PM"
        />

        <EditableField
          label="Menu Bar Badge"
          value={statusBadge}
          currentValue={config.status_badge || DEFAULT_SITE_CONFIG.status_badge}
          onChange={setStatusBadge}
          onReset={() => setStatusBadge(config.status_badge || DEFAULT_SITE_CONFIG.status_badge)}
          placeholder="Open to internships"
        />

        <EditableTextArea
          label="Main Headline"
          value={headline}
          currentValue={config.hero_headline || DEFAULT_SITE_CONFIG.hero_headline}
          onChange={setHeadline}
          onReset={() => setHeadline(config.hero_headline || DEFAULT_SITE_CONFIG.hero_headline)}
          placeholder="I'm Josh. I'm building..."
          rows={3}
        />

        <EditableTextArea
          label="Subheading / Pitch"
          value={subtext}
          currentValue={config.hero_subtext || DEFAULT_SITE_CONFIG.hero_subtext}
          onChange={setSubtext}
          onReset={() => setSubtext(config.hero_subtext || DEFAULT_SITE_CONFIG.hero_subtext)}
          placeholder="I turn messy user problems..."
          rows={3}
        />

        <div className="grid grid-cols-2 gap-3">
          <EditableField
            label="CTA Button Label"
            value={ctaLabel}
            currentValue={config.hero_cta_label || DEFAULT_SITE_CONFIG.hero_cta_label}
            onChange={setCtaLabel}
            onReset={() => setCtaLabel(config.hero_cta_label || DEFAULT_SITE_CONFIG.hero_cta_label)}
            placeholder="See my work"
          />
          <EditableField
            label="CTA Button Target URL"
            value={ctaUrl}
            currentValue={config.hero_cta_url || DEFAULT_SITE_CONFIG.hero_cta_url}
            onChange={setCtaUrl}
            onReset={() => setCtaUrl(config.hero_cta_url || DEFAULT_SITE_CONFIG.hero_cta_url)}
            placeholder="#work"
          />
        </div>

        <SaveButton loading={configLoading} />
      </form>
    );
  }

  // ── Tab 2: Projects ──
  function ProjectsTabContent() {
    function openNew() {
      setEditingProject({ ...EMPTY_PROJECT });
      setShowProjectForm(true);
    }

    function openEdit(p: Project) {
      setEditingProject({
        id: p.id,
        title: p.title,
        label: p.label,
        headline: p.headline,
        description: p.description,
        slug: p.slug,
        external_link: p.external_link || "",
        is_featured: p.is_featured,
        sort_order: p.sort_order,
      });
      setShowProjectForm(true);
    }

    async function handleDelete(id: number) {
      if (!confirm("Delete this project?")) return;
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast("Project deleted");
      } else {
        showToast("Failed to delete", "error");
      }
    }

    if (showProjectForm && editingProject !== null) {
      return (
        <ProjectForm
          initial={editingProject}
          onSave={async (data) => {
            setProjectsLoading(true);
            const isEdit = !!data.id;
            const url = isEdit ? `/api/projects/${data.id}` : "/api/projects";
            const method = isEdit ? "PUT" : "POST";
            const res = await fetch(url, {
              method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            setProjectsLoading(false);
            if (res.ok) {
              await fetchProjects();
              setShowProjectForm(false);
              setEditingProject(null);
              showToast(isEdit ? "Project updated" : "Project created");
            } else {
              showToast("Failed to save project", "error");
            }
          }}
          onCancel={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
          loading={projectsLoading}
        />
      );
    }

    return (
      <div className="max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-[#111111]">Projects &amp; Case Studies</h2>
            <p className="text-xs text-[#666666]">
              {projects.length} project{projects.length !== 1 ? "s" : ""} currently in database
            </p>
          </div>
          <button
            onClick={openNew}
            className="bg-[#111111] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#333333] transition-colors"
          >
            + Add project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-[#DCDCDC] text-center">
            <p className="text-[#666666] text-sm">No custom database projects yet.</p>
            <p className="text-xs text-[#999999] mt-1">
              The website currently falls back to the 6 featured case studies in caseStudies.ts.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-white border border-[#EBEBEB] rounded-lg px-4 py-3 shadow-xs"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium text-[#111111] truncate">{p.title || "(untitled)"}</span>
                  <span className="text-xs text-[#666666] truncate">/work/{p.slug} {p.is_featured ? "· Featured" : ""}</span>
                </div>
                <div className="flex gap-2 ml-4 shrink-0">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-xs text-[#111111] border border-[#E5E5E5] bg-white px-3 py-1.5 rounded hover:bg-[#F4F4F4] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-xs text-red-500 border border-red-200 bg-white px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Project Form
  function ProjectForm({
    initial,
    onSave,
    onCancel,
    loading,
  }: {
    initial: Omit<Project, "id" | "created_at"> & { id?: number };
    onSave: (data: typeof initial) => void;
    onCancel: () => void;
    loading: boolean;
  }) {
    const [form, setForm] = useState(initial);

    function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
      setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleTitleChange(v: string) {
      set("title", v);
      if (!initial.id) {
        set("slug", slugify(v));
      }
    }

    return (
      <div className="max-w-xl">
        <button
          onClick={onCancel}
          className="text-sm text-[#666666] hover:text-[#111111] mb-6 inline-flex items-center gap-1 font-medium"
        >
          ← Back to projects
        </button>
        <h3 className="text-base font-semibold text-[#111111] mb-6">
          {initial.id ? "Edit project" : "New project"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#666666] uppercase tracking-wide">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="border border-[#E5E5E5] rounded-md px-3 py-2 text-sm text-[#111111] focus:ring-2 focus:ring-[#111111]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#666666] uppercase tracking-wide">Label / Tag</label>
            <input
              type="text"
              value={form.label}
              onChange={(e) => set("label", e.target.value)}
              placeholder="Developer Tools · Side Project"
              className="border border-[#E5E5E5] rounded-md px-3 py-2 text-sm text-[#111111] focus:ring-2 focus:ring-[#111111]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#666666] uppercase tracking-wide">Headline</label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) => set("headline", e.target.value)}
              placeholder="One-line description"
              className="border border-[#E5E5E5] rounded-md px-3 py-2 text-sm text-[#111111] focus:ring-2 focus:ring-[#111111]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#666666] uppercase tracking-wide">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="border border-[#E5E5E5] rounded-md px-3 py-2 text-sm text-[#111111] focus:ring-2 focus:ring-[#111111]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#666666] uppercase tracking-wide">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="my-project"
              className="border border-[#E5E5E5] rounded-md px-3 py-2 text-sm text-[#111111] focus:ring-2 focus:ring-[#111111]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#666666] uppercase tracking-wide">External Link (optional)</label>
            <input
              type="url"
              value={form.external_link || ""}
              onChange={(e) => set("external_link", e.target.value || null)}
              placeholder="https://…"
              className="border border-[#E5E5E5] rounded-md px-3 py-2 text-sm text-[#111111] focus:ring-2 focus:ring-[#111111]"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => set("is_featured", e.target.checked)}
              className="w-4 h-4 accent-[#111111]"
            />
            <span className="text-sm text-[#111111]">Featured project (display in main sections)</span>
          </label>

          <div className="flex gap-3 pt-2">
            <SaveButton loading={loading} label={initial.id ? "Update project" : "Create project"} />
            <button
              type="button"
              onClick={onCancel}
              className="text-sm text-[#666666] hover:text-[#111111] px-4 py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ── Tab 3: About ──
  function AboutTabContent() {
    const [aboutText, setAboutText] = useState(config.about_text || DEFAULT_SITE_CONFIG.about_text);
    const [role, setRole] = useState(config.about_role || DEFAULT_SITE_CONFIG.about_role);
    const [location, setLocation] = useState(config.about_location || DEFAULT_SITE_CONFIG.about_location);

    useEffect(() => {
      setAboutText(config.about_text || DEFAULT_SITE_CONFIG.about_text);
      setRole(config.about_role || DEFAULT_SITE_CONFIG.about_role);
      setLocation(config.about_location || DEFAULT_SITE_CONFIG.about_location);
    }, [config]);

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();
      await saveConfig({
        about_text: aboutText,
        about_role: role,
        about_location: location,
      });
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
        <div>
          <h2 className="text-base font-bold text-[#111111]">About Window &amp; Photo Card</h2>
          <p className="text-xs text-[#666666]">
            Configure the contents displayed in the notepad terminal window and sticker photo card.
          </p>
        </div>

        <EditableTextArea
          label="About Text (Notepad Window)"
          value={aboutText}
          currentValue={config.about_text || DEFAULT_SITE_CONFIG.about_text}
          onChange={setAboutText}
          onReset={() => setAboutText(config.about_text || DEFAULT_SITE_CONFIG.about_text)}
          placeholder="Write your background and story…"
          rows={8}
        />

        <div className="grid grid-cols-2 gap-3">
          <EditableField
            label="Role Label (Photo Card)"
            value={role}
            currentValue={config.about_role || DEFAULT_SITE_CONFIG.about_role}
            onChange={setRole}
            onReset={() => setRole(config.about_role || DEFAULT_SITE_CONFIG.about_role)}
            placeholder="SRMIST · 3rd Year B.Tech CSE"
          />
          <EditableField
            label="Location Label (Photo Card)"
            value={location}
            currentValue={config.about_location || DEFAULT_SITE_CONFIG.about_location}
            onChange={setLocation}
            onReset={() => setLocation(config.about_location || DEFAULT_SITE_CONFIG.about_location)}
            placeholder="Chennai, India · UTC+5:30"
          />
        </div>

        <SaveButton loading={configLoading} />
      </form>
    );
  }

  // ── Tab 4: Currently ──
  function CurrentlyTabContent() {
    const [building, setBuilding] = useState(config.currently_building || DEFAULT_SITE_CONFIG.currently_building);
    const [reading, setReading] = useState(config.currently_reading || DEFAULT_SITE_CONFIG.currently_reading);
    const [targeting, setTargeting] = useState(config.currently_targeting || DEFAULT_SITE_CONFIG.currently_targeting);

    useEffect(() => {
      setBuilding(config.currently_building || DEFAULT_SITE_CONFIG.currently_building);
      setReading(config.currently_reading || DEFAULT_SITE_CONFIG.currently_reading);
      setTargeting(config.currently_targeting || DEFAULT_SITE_CONFIG.currently_targeting);
    }, [config]);

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();
      await saveConfig({
        currently_building: building,
        currently_reading: reading,
        currently_targeting: targeting,
      });
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
        <div>
          <h2 className="text-base font-bold text-[#111111]">Currently / Status Radar</h2>
          <p className="text-xs text-[#666666]">
            Keep your real-time status updated across the site.
          </p>
        </div>

        <EditableField
          label="Currently Building"
          value={building}
          currentValue={config.currently_building || DEFAULT_SITE_CONFIG.currently_building}
          onChange={setBuilding}
          onReset={() => setBuilding(config.currently_building || DEFAULT_SITE_CONFIG.currently_building)}
          placeholder="Onboarding Friction Score & Zenos..."
        />

        <EditableField
          label="Currently Reading"
          value={reading}
          currentValue={config.currently_reading || DEFAULT_SITE_CONFIG.currently_reading}
          onChange={setReading}
          onReset={() => setReading(config.currently_reading || DEFAULT_SITE_CONFIG.currently_reading)}
          placeholder="Inspired by Marty Cagan..."
        />

        <EditableField
          label="Currently Targeting"
          value={targeting}
          currentValue={config.currently_targeting || DEFAULT_SITE_CONFIG.currently_targeting}
          onChange={setTargeting}
          onReset={() => setTargeting(config.currently_targeting || DEFAULT_SITE_CONFIG.currently_targeting)}
          placeholder="APM / Founder's Office Internships (Summer 2026)"
        />

        <SaveButton loading={configLoading} />
      </form>
    );
  }

  // ── Tab 5: Social ──
  function SocialTabContent() {
    const [linkedin, setLinkedin] = useState(config.linkedin_url || DEFAULT_SITE_CONFIG.linkedin_url);
    const [github, setGithub] = useState(config.github_url || DEFAULT_SITE_CONFIG.github_url);
    const [email, setEmail] = useState(config.contact_email || DEFAULT_SITE_CONFIG.contact_email);

    useEffect(() => {
      setLinkedin(config.linkedin_url || DEFAULT_SITE_CONFIG.linkedin_url);
      setGithub(config.github_url || DEFAULT_SITE_CONFIG.github_url);
      setEmail(config.contact_email || DEFAULT_SITE_CONFIG.contact_email);
    }, [config]);

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();
      await saveConfig({
        linkedin_url: linkedin,
        github_url: github,
        contact_email: email,
      });
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
        <div>
          <h2 className="text-base font-bold text-[#111111]">Contact &amp; Social Links</h2>
          <p className="text-xs text-[#666666]">
            Configure your active primary contact and social accounts used in the footer and dock.
          </p>
        </div>

        <EditableField
          label="Contact Email"
          value={email}
          currentValue={config.contact_email || DEFAULT_SITE_CONFIG.contact_email}
          onChange={setEmail}
          onReset={() => setEmail(config.contact_email || DEFAULT_SITE_CONFIG.contact_email)}
          type="email"
          placeholder="josh@example.com"
        />

        <EditableField
          label="LinkedIn URL"
          value={linkedin}
          currentValue={config.linkedin_url || DEFAULT_SITE_CONFIG.linkedin_url}
          onChange={setLinkedin}
          onReset={() => setLinkedin(config.linkedin_url || DEFAULT_SITE_CONFIG.linkedin_url)}
          type="url"
          placeholder="https://linkedin.com/in/joshcodz"
        />

        <EditableField
          label="GitHub URL"
          value={github}
          currentValue={config.github_url || DEFAULT_SITE_CONFIG.github_url}
          onChange={setGithub}
          onReset={() => setGithub(config.github_url || DEFAULT_SITE_CONFIG.github_url)}
          type="url"
          placeholder="https://github.com/joshcodz"
        />

        <SaveButton loading={configLoading} />
      </form>
    );
  }

  // ── Tab 6: Site Config ──
  function SiteConfigTabContent() {
    const [siteTitle, setSiteTitle] = useState(config.site_title || DEFAULT_SITE_CONFIG.site_title);
    const [metaDesc, setMetaDesc] = useState(config.meta_description || DEFAULT_SITE_CONFIG.meta_description);
    const [footerText, setFooterText] = useState(config.footer_text || DEFAULT_SITE_CONFIG.footer_text);

    useEffect(() => {
      setSiteTitle(config.site_title || DEFAULT_SITE_CONFIG.site_title);
      setMetaDesc(config.meta_description || DEFAULT_SITE_CONFIG.meta_description);
      setFooterText(config.footer_text || DEFAULT_SITE_CONFIG.footer_text);
    }, [config]);

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();
      await saveConfig({
        site_title: siteTitle,
        meta_description: metaDesc,
        footer_text: footerText,
      });
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
        <div>
          <h2 className="text-base font-bold text-[#111111]">Global Site Metadata &amp; Footer</h2>
          <p className="text-xs text-[#666666]">
            Configure site title, SEO meta description, and the bottom copyright string.
          </p>
        </div>

        <EditableField
          label="Site Title (Browser Tab)"
          value={siteTitle}
          currentValue={config.site_title || DEFAULT_SITE_CONFIG.site_title}
          onChange={setSiteTitle}
          onReset={() => setSiteTitle(config.site_title || DEFAULT_SITE_CONFIG.site_title)}
          placeholder="Josh's Product Lab"
        />

        <EditableTextArea
          label="Meta Description (SEO)"
          value={metaDesc}
          currentValue={config.meta_description || DEFAULT_SITE_CONFIG.meta_description}
          onChange={setMetaDesc}
          onReset={() => setMetaDesc(config.meta_description || DEFAULT_SITE_CONFIG.meta_description)}
          placeholder="Short description for search engines…"
          rows={3}
        />

        <EditableField
          label="Footer Text"
          value={footerText}
          currentValue={config.footer_text || DEFAULT_SITE_CONFIG.footer_text}
          onChange={setFooterText}
          onReset={() => setFooterText(config.footer_text || DEFAULT_SITE_CONFIG.footer_text)}
          placeholder="© 2026 Josh's Product Lab..."
        />

        <SaveButton loading={configLoading} />
      </form>
    );
  }

  // ── Tabs List ──
  const tabs: { id: Tab; label: string }[] = [
    { id: "hero", label: "Hero & Menu" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About Me" },
    { id: "currently", label: "Currently" },
    { id: "social", label: "Social & Contact" },
    { id: "site", label: "Site & SEO" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* ── Top Bar ── */}
      <div className="border-b border-[#EBEBEB] bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#111111] font-bold text-sm tracking-tight">Admin Console</span>
          <span className="text-[#CCCCCC] text-sm">|</span>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#666666] hover:text-[#111111] transition-colors font-medium flex items-center gap-1"
          >
            <span>Open live site</span>
            <span>↗</span>
          </a>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-[#666666] hover:text-red-600 transition-colors font-medium px-3 py-1.5 rounded border border-[#EBEBEB] hover:border-red-200"
        >
          Sign out
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* ── Tab Navigation ── */}
        <div className="flex gap-1.5 mb-8 flex-wrap p-1 bg-[#F0F0F0] rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowProjectForm(false);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#111111] shadow-xs"
                  : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 sm:p-8 shadow-xs">
          {activeTab === "hero" && <HeroTabContent />}
          {activeTab === "projects" && <ProjectsTabContent />}
          {activeTab === "about" && <AboutTabContent />}
          {activeTab === "currently" && <CurrentlyTabContent />}
          {activeTab === "social" && <SocialTabContent />}
          {activeTab === "site" && <SiteConfigTabContent />}
        </div>
      </div>

      {/* ── Toast Feedback ── */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
