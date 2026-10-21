export interface ProductTeardown {
  id: string;
  slug: string;
  product: string;
  company: string;
  category: "Dev Tools" | "Productivity" | "AI" | "Infra & Cloud" | "SaaS";
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  accentColor: string;
  logoBg: string;
  heroHeadline: string;
  tags: string[];
  scores: {
    activation: number;
    speed: number;
    cognitiveLoad: number;
    overall: number;
  };
  thesis: string;
  whatWorks: {
    title: string;
    description: string;
  }[];
  whatFails: {
    title: string;
    description: string;
  }[];
  whatIdChange: {
    title: string;
    proposal?: string;
    description?: string;
  }[];
  keyTakeaways: string[];
  articleUrl?: string;
}

export const TEARDOWNS: ProductTeardown[] = [
  {
    id: "1",
    slug: "linear-vs-jira",
    product: "Linear",
    company: "Linear Orbit, Inc.",
    category: "Dev Tools",
    title: "Linear vs Jira: Why speed and keyboard-first design won the engineering mindshare",
    subtitle: "How sub-50ms UI updates and ruthless opinionated workflows displaced Jira for high-velocity teams.",
    date: "Feb 2026",
    readTime: "7 min read",
    accentColor: "from-indigo-500 to-purple-600",
    logoBg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    heroHeadline: "Speed is the feature. How zero-latency interactions reshape developer motivation.",
    tags: ["Keyboard-First", "Sub-50ms Latency", "Optimistic UI", "Issue Tracking"],
    scores: {
      activation: 9.6,
      speed: 9.9,
      cognitiveLoad: 9.3,
      overall: 9.6,
    },
    thesis:
      "Most enterprise software slows users down with loading spinners, permission modals, and sprawling forms. Linear treated issue tracking as an interactive game engine: syncing in memory, updating optimistically, and enabling 100% keyboard navigation via Cmd+K.",
    whatWorks: [
      {
        title: "Optimistic Local-First Architecture",
        description:
          "Changes update locally on the UI within 16ms before the server acknowledges. Users never pause or wait for a spinner to save a task.",
      },
      {
        title: "Universal Command Palette (Cmd+K)",
        description:
          "Every action from assigning teammates, setting priority, to moving states is accessible without a cursor, mirroring the developer's IDE muscle memory.",
      },
      {
        title: "Ruthless Workflow Constraints",
        description:
          "Instead of Jira's infinite custom workflows that lead to bureaucracy, Linear enforces cycles, triage queues, and projects that keep teams aligned on shipping.",
      },
    ],
    whatFails: [
      {
        title: "Multi-Squad Dependency Tangling",
        description:
          "At 100+ concurrent issues across cross-functional squads, project lists lack high-level cluster maps, forcing managers to create external tracking spreadsheets.",
      },
      {
        title: "Steep Initial Learning Curve for Non-Technical Stakeholders",
        description:
          "Marketing and legal teams entering Linear often get disoriented by minimal UI chrome and lack of explicit Save buttons.",
      },
    ],
    whatIdChange: [
      {
        title: "Dynamic Cluster Dependency View",
        description:
          "Introduce a zoomable node graph for initiative roadmaps that highlights critical paths and blocked PRs without cluttering the issue view.",
      },
      {
        title: "Contextual Guest Mode for Business Partners",
        description:
          "Provide simplified read-and-comment portal for external agencies and non-technical stakeholders to submit tickets without seeing git branches or cycles.",
      },
    ],
    keyTakeaways: [
      "Perceived speed is a retention moat. If an action takes under 100ms, users perceive it as instantaneous.",
      "Constraints beat configuration for high-velocity developer tools.",
      "The best software reflects the mental models of its primary power users.",
    ],
    articleUrl: "https://linkedin.com/in/joshcodz",
  },
  {
    id: "2",
    slug: "arc-browser",
    product: "Arc",
    company: "The Browser Company",
    category: "Productivity",
    title: "Arc Browser: The boldest browser rethink, and why Spaces hit a cognitive wall",
    subtitle: "Deconstructing Arc's vertical tabs, Spaces, and Split View — brilliant craftsmanship versus mental model inertia.",
    date: "Jan 2026",
    readTime: "8 min read",
    accentColor: "from-pink-500 to-rose-600",
    logoBg: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    heroHeadline: "Reinventing the internet's front door: when radical UX meets user habits.",
    tags: ["Spatial UX", "Vertical Tabs", "Cognitive Friction", "Browser"],
    scores: {
      activation: 7.8,
      speed: 8.9,
      cognitiveLoad: 8.2,
      overall: 8.6,
    },
    thesis:
      "Arc proved that tab overload isn't a browser problem — it's an unorganized workspace problem. By merging bookmarks with tabs, collapsing chrome into vertical sidebars, and organizing tasks into Spaces, Arc created the first truly emotional web browser.",
    whatWorks: [
      {
        title: "Vertical Sidebar & Peek Previews",
        description:
          "Preserves vertical screen real estate for content while previewing links in lightweight modal sheets without spawning 20 background tabs.",
      },
      {
        title: "Spaces & Context Isolation",
        description:
          "Instant swipe between Work, Personal, and Side Project spaces with separate logins, profiles, and visual themes.",
      },
      {
        title: "Split View Within One Window",
        description:
          "Side-by-side tabs inside one unified canvas eliminates chaotic multi-window desktop management.",
      },
    ],
    whatFails: [
      {
        title: "Blurring Tabs vs Bookmarks",
        description:
          "Users constantly wonder: 'If I close this pinned tab, did I delete the bookmark or just shut the page?' This mental ambiguity caused anxiety for non-tech adopters.",
      },
      {
        title: "Heavy Chromium Resource Footprint",
        description:
          "Dynamic animations, glassmorphism sidebar, and multiple background Spaces lead to battery drain on lightweight laptops.",
      },
    ],
    whatIdChange: [
      {
        title: "Explicit Tab Archival Status Indicator",
        description:
          "Add subtle status dots distinguishing active memory tabs from cold pinned shortcuts to restore user confidence in what is open.",
      },
      {
        title: "Lightweight 'Battery Saver' Sidebar Mode",
        description:
          "Allow toggling off real-time webgl blur effects in the sidebar when working on battery power.",
      },
    ],
    keyTakeaways: [
      "Replacing a 25-year-old interaction pattern requires 10x UX benefits, not just visual beauty.",
      "Clear boundaries between temporary work (tabs) and permanent reference (bookmarks) reduce user anxiety.",
    ],
    articleUrl: "https://linkedin.com/in/joshcodz",
  },
  {
    id: "3",
    slug: "raycast-vs-spotlight",
    product: "Raycast",
    company: "Raycast Technologies",
    category: "Dev Tools",
    title: "Raycast: How command-palette extensibility replaced macOS Spotlight",
    subtitle: "Turning a desktop launcher into an extensible developer ecosystem with TypeScript and React extensions.",
    date: "Dec 2025",
    readTime: "6 min read",
    accentColor: "from-red-500 to-amber-600",
    logoBg: "bg-red-500/10 text-red-500 border-red-500/20",
    heroHeadline: "From launcher to developer runtime: the moat of community-built extensions.",
    tags: ["Extension Ecosystem", "Speed as a Feature", "Desktop OS", "CLI & GUI"],
    scores: {
      activation: 9.4,
      speed: 9.9,
      cognitiveLoad: 9.5,
      overall: 9.7,
    },
    thesis:
      "Spotlight searches files; Raycast automates full workflows. By giving developers a clean React/Node runtime to build and share command extensions in minutes, Raycast turned an OS launcher into an indispensable operating layer for builders.",
    whatWorks: [
      {
        title: "Frictionless Extension SDK in React",
        description:
          "Developers can build rich UI commands using standardized components (List, Form, Detail, ActionPanel) with zero styling boilerplate.",
      },
      {
        title: "Sub-20ms Keyboard Responsiveness",
        description:
          "Native Swift core ensures the overlay pops open with instant responsiveness on Option+Space, never lagging even under heavy system load.",
      },
      {
        title: "Action Panel Keybindings (Cmd+K)",
        description:
          "Every item has secondary actions clearly mapped to keyboard modifiers (Cmd+Enter, Option+Enter, Cmd+C), turning multi-click workflows into single keystrokes.",
      },
    ],
    whatFails: [
      {
        title: "Extension Command Clutter",
        description:
          "Installing 15+ extensions floods the root search list with duplicate keywords ('Search GitHub', 'GitHub PRs', 'GitHub Issues').",
      },
      {
        title: "Discoverability for Intermediate Users",
        description:
          "Powerful features like Window Management, Floating Notes, and AI Quick Questions remain hidden unless discovered by word of mouth.",
      },
    ],
    whatIdChange: [
      {
        title: "Scoped Smart Routing",
        description:
          "Intelligently rank commands based on the active foreground application (e.g., prioritize Figma commands when Figma is focused, Linear commands when VS Code is open).",
      },
      {
        title: "Visual Extension Health & Conflict Checker",
        description:
          "Provide a settings view showing global keyboard shortcut overlaps and unneeded high-latency API extensions.",
      },
    ],
    keyTakeaways: [
      "If you build an extensible platform where the community creates value for each other, your moat grows with zero incremental engineering cost.",
      "Keyboard ergonomics build fierce user loyalty.",
    ],
    articleUrl: "https://github.com/joshcodz",
  },
  {
    id: "4",
    slug: "cursor-ai-flow",
    product: "Cursor",
    company: "Anysphere",
    category: "AI",
    title: "Cursor: Why inline AI diffs beat chat sidebars for developer flow",
    subtitle: "Why GitHub Copilot's chat sidebar felt like an interruption, while Cursor's inline Cmd+K and Composer preserve flow state.",
    date: "Nov 2025",
    readTime: "7 min read",
    accentColor: "from-cyan-500 to-blue-600",
    logoBg: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    heroHeadline: "AI interaction design: keeping the engineer inside their code buffer.",
    tags: ["In-Place Diffs", "Context Indexing", "Flow State", "Developer Experience"],
    scores: {
      activation: 9.5,
      speed: 9.6,
      cognitiveLoad: 9.4,
      overall: 9.6,
    },
    thesis:
      "Copilot treated AI as an external chatbot next to the editor. Cursor treated AI as an inline compiler: generating green/red diffs directly inside your cursor position, indexed to your entire codebase vector graph.",
    whatWorks: [
      {
        title: "In-Place Cmd+K Diffs",
        description:
          "Highlight 20 lines, hit Cmd+K, type instructions, and review red/green line diffs without copying and pasting between chat windows.",
      },
      {
        title: "Deep Codebase Indexing (@Files & @Docs)",
        description:
          "Allows developers to pull full repo context, specific PRs, or public docs directly into prompt evaluation.",
      },
      {
        title: "Composer Multi-File Scaffolding",
        description:
          "Generates changes across backend APIs, types, and frontend components simultaneously with one unified prompt.",
      },
    ],
    whatFails: [
      {
        title: "Silent Multi-File Hallucinations",
        description:
          "In large Composer sessions, AI occasionally modifies non-target peripheral files without making the side effect immediately apparent before accepting.",
      },
      {
        title: "Indexed Embedding Desync",
        description:
          "On large fast-moving monorepos, local vector embeddings occasionally lag behind active git branch switches.",
      },
    ],
    whatIdChange: [
      {
        title: "Interactive Diff Review Tree for Composer",
        description:
          "Show a compact file tree with checkbox reviews for every changed file before batch acceptance.",
      },
      {
        title: "Confidence Heatmaps on Generated Code",
        description:
          "Highlight unfamiliar API usages in a subtle amber underline to invite closer developer verification.",
      },
    ],
    keyTakeaways: [
      "The best AI tool is the one that disappears into the user's existing physical workflow.",
      "Reducing copy-paste steps across windows is the highest ROI design change in AI UX.",
    ],
    articleUrl: "https://linkedin.com/in/joshcodz",
  },
  {
    id: "5",
    slug: "supabase-vs-firebase",
    product: "Supabase",
    company: "Supabase Inc.",
    category: "Infra & Cloud",
    title: "Supabase: The DX triumph of open-source Postgres over proprietary NoSQL",
    subtitle: "How standard SQL, Row Level Security (RLS), and zero vendor lock-in won the modern indie hacker & startup developer stack.",
    date: "Oct 2025",
    readTime: "6 min read",
    accentColor: "from-emerald-500 to-teal-600",
    logoBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    heroHeadline: "Relational power meets Firebase simplicity: winning developer trust with open standards.",
    tags: ["Open Source", "Row Level Security", "Relational DX", "Database"],
    scores: {
      activation: 9.3,
      speed: 9.2,
      cognitiveLoad: 9.1,
      overall: 9.4,
    },
    thesis:
      "Firebase trapped developers in deeply nested JSON trees and vendor lock-in. Supabase took standard, open-source Postgres, wrapped it in automatic REST and Realtime APIs, and created a dashboard developers actually enjoy opening.",
    whatWorks: [
      {
        title: "Postgres as the Core Primitive",
        description:
          "Zero proprietary query languages. Developers get real relational joins, indexes, foreign keys, and full SQL versatility.",
      },
      {
        title: "Built-In Auth with Row Level Security",
        description:
          "Security rules live in the database itself (RLS policies) rather than fragile application code layers.",
      },
      {
        title: "Instant Table Editor & Auto API Generation",
        description:
          "Creating a table immediately creates TypeScript-typed SDK functions without writing backend boilerplate.",
      },
    ],
    whatFails: [
      {
        title: "RLS Policy Debugging Complexity",
        description:
          "When a query returns empty records due to an RLS policy restriction, Supabase returns empty arrays instead of explicit permission errors, causing confusion.",
      },
      {
        title: "Connection Pooling Limits on Free Tiers",
        description:
          "Serverless architectures can quickly exhaust default pool connections without Supavisor tuning.",
      },
    ],
    whatIdChange: [
      {
        title: "Visual RLS Policy Dry-Run Inspector",
        description:
          "A testing sandbox where developers can simulate queries as 'Anonymous', 'Authenticated User ID 123', or 'Admin' and see exactly which row is allowed or denied.",
      },
      {
        title: "Automated Zero-Config Migration Rollbacks",
        description:
          "One-click migration history snapshots inside the dashboard table editor.",
      },
    ],
    keyTakeaways: [
      "Developers choose open standards because they value exit optionality.",
      "Transforming a complex infrastructure primitive (Postgres) into a high-delight visual GUI is a massive product opportunity.",
    ],
    articleUrl: "https://linkedin.com/in/joshcodz",
  },
  {
    id: "6",
    slug: "notion-vs-obsidian",
    product: "Notion & Obsidian",
    company: "Notion Labs & Dynalist",
    category: "Productivity",
    title: "Notion vs Obsidian: Database flexibility vs local-first longevity",
    subtitle: "The clash between collaborative relational blocks and plain markdown local-first files in personal and team knowledge systems.",
    date: "Sep 2025",
    readTime: "8 min read",
    accentColor: "from-amber-500 to-orange-600",
    logoBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    heroHeadline: "Knowledge graphs vs structured relational workspaces: two opposing philosophies of thought.",
    tags: ["Block Primitive", "Local-First", "Information Architecture", "Notes"],
    scores: {
      activation: 9.0,
      speed: 8.5,
      cognitiveLoad: 8.7,
      overall: 8.9,
    },
    thesis:
      "Notion won team collaboration by turning every paragraph into an addressable database block. Obsidian won technical power users by keeping all data as plain markdown files on local disk. Both represent distinct futures of human thought architectures.",
    whatWorks: [
      {
        title: "Notion's Polymorphic Database Views",
        description:
          "The same underlying data can be viewed as a Kanban board, calendar, gallery, list, or spreadsheet with zero migration effort.",
      },
      {
        title: "Obsidian's Local-First Graph Links",
        description:
          "Sub-millisecond note opening, complete offline reliability, and an interactive graph view showing how disparate concepts interconnect.",
      },
    ],
    whatFails: [
      {
        title: "Notion's Offline Fragility",
        description:
          "Opening Notion on a flight or patchy mobile network frequently results in infinite spinners or conflicted edit states.",
      },
      {
        title: "Obsidian's High Initial Configuration Tax",
        description:
          "Requires users to spend hours installing plugins (Dataview, Templater, Git) before it feels like a functional workspace.",
      },
    ],
    whatIdChange: [
      {
        title: "Local SQLite Offline Cache for Notion",
        description:
          "Cache recent workspace databases locally on mobile and desktop apps to provide true instant offline reads and edits.",
      },
      {
        title: "Curated Starter Kits in Obsidian",
        description:
          "Official 1-click workspace bundles for Product Managers, Students, and Researchers with preconfigured plugins and templates.",
      },
    ],
    keyTakeaways: [
      "The medium of your software shapes how users organize their thinking.",
      "The ultimate productivity software balances relational structure with zero-friction capture.",
    ],
    articleUrl: "https://linkedin.com/in/joshcodz",
  },
];
