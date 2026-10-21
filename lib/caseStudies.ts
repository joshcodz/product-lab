export interface CaseStudySection {
  id: string;
  title: string;
  tagline?: string;
  content?: string;
  callout?: {
    type?: "quote" | "hypothesis" | "note" | "warning";
    text: string;
    author?: string;
  };
  subsections?: {
    title: string;
    description: string;
    bullets?: string[];
  }[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  comparisonTable?: {
    headers: string[];
    rows: { label: string; values: string[] }[];
  };
  pipelineDiagram?: {
    steps: { name: string; desc: string }[];
  };
  roadmapSteps?: {
    step: number;
    title: string;
    description: string;
  }[];
  placeholders?: string[];
}

export interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  timeline: string;
  team: string;
  statusBadge?: string;
  tools: string[];
  readTime: string;
  headlineMetrics: {
    value: string;
    label: string;
    sublabel: string;
    isPlaceholder?: boolean;
  }[];
  tldr: {
    problem: string;
    action: string;
    result: string;
  };
  sections: CaseStudySection[];
  learnings: string[];
  links: {
    liveDemo?: string;
    repo?: string;
    prd?: string;
  };
  nextSlug: string;
  nextTitle: string;
}

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  // ─────────────────────────────────────────────────────────────
  // 1. ZENOS: A Developer-First Operating System for Deep Work
  // ─────────────────────────────────────────────────────────────
  zenos: {
    slug: "zenos",
    title: "Zenos: A Developer-First Operating System for Deep Work",
    subtitle: "A customizable browser workspace consolidating timer, tasks, notes, music, and ambient focus spaces.",
    category: "Personal Product (0 to 1)",
    role: "Founder, Product Manager, Builder",
    timeline: "Live prototype, v1 shipped [VERIFY live link: placeholder]",
    team: "Founder, Product Manager, Builder",
    statusBadge: "Live prototype, v1 shipped [VERIFY live link: placeholder]",
    tools: ["React", "Vite", "Tailwind", "Framer Motion", "Lucide", "YouTube IFrame API", "HTML5 video"],
    readTime: "6 min read",
    headlineMetrics: [
      {
        value: "0→1",
        label: "Product Stage",
        sublabel: "From self-critique to shipped v1",
      },
      {
        value: "v1",
        label: "Shipped Version",
        sublabel: "Working browser workspace",
      },
      {
        value: "Dev",
        label: "Target Wedge",
        sublabel: "Narrowed focus from broad audience",
      },
    ],
    tldr: {
      problem:
        "Focus tools are scattered across apps, and every switch is a chance to get distracted.",
      action:
        "Zenos puts a timer, tasks, notes, music and a calm ambient background into one customizable browser workspace. After a self-critique, I narrowed the target from 'everyone who works' to developers, and defined a roadmap around that wedge.",
      result:
        "Shipped v1 prototype featuring ambient spaces, draggable widget panels, and Zen Mode with zero backend overhead.",
    },
    sections: [
      {
        id: "problem",
        title: "The Problem",
        content:
          "A typical focus session uses a timer in one app, notes in another, music in a YouTube tab and tasks somewhere else. Each context switch costs attention, and most focus tools are either too minimal (just a timer) or too bare to feel worth keeping open.",
        callout: {
          type: "hypothesis",
          text: "Hypothesis: If the tools you actually use live on one screen that looks good enough to leave open, you switch less and focus longer.",
        },
      },
      {
        id: "target-user",
        title: "Target User and Wedge",
        content:
          "The initial audience was developers, students, writers and knowledge workers. That is too broad for a product. Each group needs different widgets, and a product for everyone has no sharp message.",
        callout: {
          type: "note",
          text: "Decision: Developers are the wedge. They already live in a browser and an editor, they care about tooling and aesthetics, and they have concrete signals of work (commits, PRs) that Zenos can tie to focus sessions. Study and writer widgets move into opt-in 'modes' rather than the core.",
        },
      },
      {
        id: "what-i-built",
        title: "What I Built (v1)",
        content: "Engineered a modular, distraction-free browser desktop system with instant responsiveness:",
        subsections: [
          {
            title: "Ambient Spaces",
            description: "Curated looping video and audio themes (lofi, rain, forest, car at night) with volume and mute controls.",
          },
          {
            title: "Zen Mode",
            description: "Dims the UI and leaves only audio ambiance and the current active task.",
          },
          {
            title: "Widget System",
            description: "Every tool is a draggable glass panel; drag to a trash zone or long-press to remove.",
          },
          {
            title: "Focus Tools",
            description: "Pomodoro with configurable work and break lengths, Focus Intention (one goal at a time), Breathing Guide, and Motivation Quotes.",
          },
          {
            title: "Dev & Study Tools",
            description: "Code Scratchpad, GitHub Heatmap, Flashcards, Study Tracker, and Todo List.",
          },
          {
            title: "Utilities & Nav",
            description: "Weather (geolocation & Open-Meteo), Quick Links, Analytics (sessions vs. daily goal), Command Capsule dock, and Cmd/Ctrl+K command palette.",
          },
          {
            title: "Onboarding & Persistence",
            description: "Setup wizard (name, space, widgets, Pomodoro defaults, launch) with layout and settings persisted in localStorage.",
          },
        ],
      },
      {
        id: "decisions",
        title: "Key Product Decisions and Tradeoffs",
        table: {
          headers: ["Decision", "Why", "Tradeoff Accepted"],
          rows: [
            [
              "One screen with floating widgets instead of tabs or pages",
              "Removes context switching, which is the core problem",
              "Harder to keep the layout clean as widgets grow",
            ],
            [
              "Glassmorphism and ambient video",
              "Aesthetic is the retention hook; people keep it open if it feels good",
              "Heavier on performance; visual style can overshadow function",
            ],
            [
              "localStorage for v1",
              "Zero backend, fast to ship and test",
              "No cross-device sync; data lost if browser storage is cleared",
            ],
            [
              "Onboarding wizard before the workspace",
              "A blank canvas is intimidating; setup creates ownership",
              "Adds friction before first value",
            ],
            [
              "Command palette (Cmd/Ctrl+K)",
              "Power users want speed, and developers expect it",
              "Low discoverability for non-technical users",
            ],
            [
              "Narrow to developers",
              "Sharper positioning and a real integration story",
              "Gives up broader student and writer market for now",
            ],
          ],
        },
      },
      {
        id: "roadmap",
        title: "Roadmap and Prioritization",
        content: "Five prioritized milestones bridging personal utility into a standalone SaaS offering:",
        roadmapSteps: [
          {
            step: 1,
            title: "Accounts and Cloud Sync",
            description: "Sync accounts to the cloud while keeping localStorage as an offline cache. Unlocks multi-device continuity and paid tiers.",
          },
          {
            step: 2,
            title: "Real GitHub Integration",
            description: "Live commit and PR activity stream tied directly to each Pomodoro session. This is the clearest developer differentiator.",
          },
          {
            step: 3,
            title: "Calendar & Slack Status Sync",
            description: "Automatic focus presence across team tools, followed by a lightweight IDE / editor extension.",
          },
          {
            step: 4,
            title: "Self-Hosted Media Engine",
            description: "Replace fragile third-party YouTube embeds with high-performance self-hosted ambient audio/video loops.",
          },
          {
            step: 5,
            title: "Modes & Freemium",
            description: "Study and writer widgets become opt-in modes; free tier plus paid data analytics and visual customization.",
          },
        ],
      },
      {
        id: "metrics",
        title: "Success Metrics (Proposed)",
        content: "No usage data exists yet, so these are the metrics I would instrument first. Replace with real numbers once measured.",
        table: {
          headers: ["Stage", "Metric", "Why It Matters"],
          rows: [
            [
              "Activation",
              "% of users who finish onboarding and start a Pomodoro",
              "Tests whether setup leads to value",
            ],
            [
              "Engagement",
              "Focus sessions per user per week",
              "Core habit signal",
            ],
            [
              "Retention",
              "Day-7 and Day-30 return rate",
              "Tests whether it is worth keeping open",
            ],
            [
              "Differentiation",
              "% of sessions with GitHub connected",
              "Validates the developer wedge",
            ],
          ],
        },
      },
      {
        id: "risks",
        title: "Risks",
        bullets: [
          "Crowded market (Forest, Focusmate, Notion-style dashboards, lofi sites).",
          "Dependence on third-party video embeds.",
          "A beautiful but shallow product if integrations do not land.",
        ],
      },
      {
        id: "learnings",
        title: "What I Learned",
        bullets: [
          "Scoping is a product skill: critiquing my own 'for everyone' positioning was the most valuable step.",
          "Delight drives retention for ambient tools, but only integrations create a moat.",
        ],
        placeholders: ["[ADD: any real user feedback, number of testers, or surprising observation]"],
      },
    ],
    learnings: [
      "Scoping is a product skill: critiquing my own 'for everyone' positioning was the most valuable step.",
      "Delight drives retention for ambient tools, but only integrations create a moat.",
    ],
    links: {
      liveDemo: "[VERIFY live link: placeholder]",
      repo: "https://github.com/joshcodz/zenos",
    },
    nextSlug: "onboarding-friction-score",
    nextTitle: "Onboarding Friction Score",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. ONBOARDING FRICTION SCORE
  // ─────────────────────────────────────────────────────────────
  "onboarding-friction-score": {
    slug: "onboarding-friction-score",
    title: "Onboarding Friction Score",
    subtitle: "Simulating First-Time Open Source Contributors with Isolated Sandbox Execution",
    category: "Developer Tool (0 to 1)",
    role: "Founder, Product Manager, Builder",
    timeline: "In development, CLI-first [VERIFY current progress]",
    team: "Founder, Product Manager, Builder",
    statusBadge: "In development, CLI-first [VERIFY current progress]",
    tools: ["TypeScript", "Node", "Docker", "Sysbox sandboxes", "LLM API"],
    readTime: "7 min read",
    headlineMetrics: [
      {
        value: "CLI",
        label: "Delivery Target",
        sublabel: "ofs run <repo-url>",
      },
      {
        value: "4",
        label: "Ecosystems",
        sublabel: "Node, Python, Go, Docker",
      },
      {
        value: "0→1",
        label: "Architecture",
        sublabel: "Sandbox test pipeline",
      },
    ],
    tldr: {
      problem:
        "Every open source project says it welcomes contributors, but nobody can measure how hard it actually is to get started.",
      action:
        "Onboarding Friction Score (OFS) simulates a first-time contributor: it reads a repo's setup docs, extracts the commands, runs them in an isolated sandbox, and produces a friction score and report.",
      result:
        "Architected a CLI-first sandbox engine transitioning from static LLM text parsing into verified real-world container execution.",
    },
    sections: [
      {
        id: "problem",
        title: "The Problem",
        content:
          "Bad setup docs quietly kill contributions. Missing environment variables, undeclared dependencies, outdated commands and unstated assumptions ('you already have Docker') make newcomers give up before their first commit. Maintainers rarely notice because the people who got stuck just leave.",
      },
      {
        id: "target-users",
        title: "Target Users",
        bullets: [
          "Maintainers who want to know where newcomers get stuck.",
          "Teams onboarding engineers to internal repos.",
          "Developer relations teams comparing the health of projects.",
        ],
      },
      {
        id: "decision",
        title: "The Core Product Decision: Read vs. Run",
        content:
          "The idea is to pretend to be a brand-new contributor and see how far you get. There were two ways to simulate this:",
        comparisonTable: {
          headers: ["Criteria", "Option A: LLM reads the docs", "Option B: LLM executes the commands"],
          rows: [
            {
              label: "What it does",
              values: [
                "Reasons about whether instructions are clear",
                "Actually runs git clone, npm install, setup steps in a sandbox",
              ],
            },
            {
              label: "Strength",
              values: [
                "No infrastructure or security risk, just an API call; fits a weekend build",
                "Catches real breakage such as deprecated commands",
              ],
            },
            {
              label: "Weakness",
              values: [
                "Judges how docs read, not whether they work",
                "Needs sandboxing, timeouts and safe handling of arbitrary repos",
              ],
            },
          ],
        },
        callout: {
          type: "note",
          text: "I started by scoping the v1 engine as Option A to prove the idea cheaply. The architecture then evolved toward Option B because only execution catches real failures, and I chose to build it as a pipeline where the design supports both. [VERIFY: confirm which option v1 actually ships with.]",
        },
      },
      {
        id: "solution",
        title: "Solution and Architecture",
        content:
          "CLI first: `ofs run <repo-url>`. The pipeline is the product, and the frontend is only a window into it. A CLI also gives a free test harness: run it against 10 repos and compare output.",
        pipelineDiagram: {
          steps: [
            { name: "parse", desc: "LLM extracts commands from README & CONTRIBUTING into structured spec" },
            { name: "execute", desc: "Stream commands in isolated Sysbox container; capture logs & timings" },
            { name: "score", desc: "Scorer calculates friction grade, identifies failures, and outputs report" },
          ],
        },
        subsections: [
          {
            title: "doc-parser",
            description: "An LLM turns README and CONTRIBUTING into a structured command list.",
          },
          {
            title: "sandbox",
            description: "Spins up and tears down isolated Sysbox containers for zero host exposure.",
          },
          {
            title: "executor",
            description: "Streams commands into the sandbox, capturing logs, exit codes, and duration timings.",
          },
          {
            title: "scorer",
            description: "Converts execution logs into an actionable friction score and diagnostic report.",
          },
          {
            title: "api",
            description: "Thin HTTP layer over the same pipeline, added once the CLI core works.",
          },
          {
            title: "sandbox-images",
            description: "Standard base images for Node, Python, Go, and Docker-based repositories.",
          },
        ],
      },
      {
        id: "scoring",
        title: "Scoring Approach (Draft)",
        content:
          "The score should reflect where a real newcomer would be stuck. Candidate signals:",
        bullets: [
          "Did setup finish with exit code 0?",
          "Number of failed or retried steps",
          "Undocumented prerequisites discovered",
          "Time to first successful run",
          "Unclear or ambiguous instructions flagged by the parser",
        ],
        callout: {
          type: "hypothesis",
          text: "First milestone: one real public repo, end to end, with a score as simple as pass or fail. Refinement is then incremental.",
        },
      },
      {
        id: "tradeoffs",
        title: "Key Tradeoffs",
        bullets: [
          "CLI before UI: debug one thing at a time.",
          "Four ecosystems in parallel (Node, Python, Go, Docker): broader proof, more upfront work.",
          "Security first: running arbitrary repo commands means sandbox isolation and hosting decisions are critical, not optional.",
        ],
      },
      {
        id: "risks",
        title: "Risks",
        bullets: [
          "Executing untrusted code safely at scale.",
          "LLM command extraction can misread docs; the score is only as good as the parse.",
          "Defining a score people trust and do not feel is arbitrary.",
        ],
      },
      {
        id: "metrics",
        title: "Success Metrics (Proposed)",
        bullets: [
          "Percentage of test repos where the pipeline completes end to end",
          "Agreement between OFS findings and issues a human reviewer finds",
          "Maintainer reactions when shown a report on their own repo [ADD]",
        ],
      },
      {
        id: "learnings",
        title: "What I Learned",
        bullets: [
          "Choosing the smallest version that proves the idea is a PM decision, and the tradeoff between Option A and B is the real story here.",
        ],
        placeholders: ["[ADD: results from your first test repos]"],
      },
    ],
    learnings: [
      "Choosing the smallest version that proves the idea is a PM decision, and the tradeoff between Option A and B is the real story here.",
    ],
    links: {
      repo: "https://github.com/joshcodz/onboarding-friction-score",
    },
    nextSlug: "alienhouse-internship",
    nextTitle: "AlienHouse Networks Internship",
  },

  // ─────────────────────────────────────────────────────────────
  // 3. ALIENHOUSE NETWORKS: PRODUCT MANAGER INTERN
  // ─────────────────────────────────────────────────────────────
  "alienhouse-internship": {
    slug: "alienhouse-internship",
    title: "AlienHouse Networks: Product Manager Intern",
    subtitle: "Internal Product Systems, Client Management, Service Delivery & Cross-Functional Workflows",
    category: "Execution & Product Management",
    role: "Product Manager Intern (Part-time, Remote)",
    timeline: "Dec 2025 to Apr 2026 (5 months) per LinkedIn",
    team: "Marketing, Hiring, and Technology squads",
    statusBadge: "Dec 2025 to Apr 2026 (5 months) · Part-time, Remote",
    tools: ["Internal Systems", "Linear", "Figma", "Notion", "Slack"],
    readTime: "7 min read",
    headlineMetrics: [
      {
        value: "[VERIFY]",
        label: "Features Shipped",
        sublabel: "Shipped features [VERIFY and name them]",
        isPlaceholder: true,
      },
      {
        value: "[VERIFY]",
        label: "Sprint Cadence",
        sublabel: "2.5-week sprint cycle [VERIFY]",
        isPlaceholder: true,
      },
      {
        value: "[VERIFY]",
        label: "Delivery Rate",
        sublabel: "94% on-time delivery [VERIFY]",
        isPlaceholder: true,
      },
    ],
    tldr: {
      problem:
        "As a growing company, much of AlienHouse's work ran on informal processes: client information, service delivery steps and handoffs between teams lived in scattered places. That made it hard to see client status, hand work between marketing, hiring and tech, and scale without adding confusion.",
      action:
        "Worked across marketing, hiring and technology teams to find operational gaps and turn unstructured processes into organized, system-driven workflows that improved efficiency and client visibility.",
      result:
        "Drove internal product systems for client management and service delivery, defining structured deliverables with clear ownership.",
    },
    sections: [
      {
        id: "context",
        title: "Context and Problem",
        content:
          "As a growing company, much of AlienHouse's work ran on informal processes: client information, service delivery steps and handoffs between teams lived in scattered places. That made it hard to see client status, hand work between marketing, hiring and tech, and scale without adding confusion.",
        callout: {
          type: "warning",
          text: "Verification Notice: LinkedIn records show the internship duration as Dec 2025 to Apr 2026 (5 months, Part-time, Remote) focused on internal systems for client management and service delivery.",
        },
      },
      {
        id: "role",
        title: "My Role",
        bullets: [
          "Drove the development of internal product systems for client management and service delivery.",
          "Worked across marketing, hiring and technology to find operational gaps.",
          "Defined structured deliverables so work had clear owners and outcomes.",
          "Bridged business needs and execution by translating unstructured processes into system-driven workflows.",
          "Supported Foundathon 3.0 as the problem-statement SPOC (PB-9), working in the context of AlienHouse-provided problem statements [VERIFY: the link between this and the internship].",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        roadmapSteps: [
          {
            step: 1,
            title: "Discover",
            description: "Talk to each team, map how work actually moves, and list where it breaks.",
          },
          {
            step: 2,
            title: "Define",
            description: "Write structured specs and deliverables with clear acceptance criteria.",
          },
          {
            step: 3,
            title: "Prioritize",
            description: "Weigh impact against effort and cut low-value requests.",
          },
          {
            step: 4,
            title: "Deliver",
            description: "Work with engineering and design to ship, then check the result with the team.",
          },
        ],
      },
      {
        id: "features",
        title: "Features and Outcomes",
        content: "Status of items requiring review before final publishing:",
        table: {
          headers: ["Item on Previous Draft", "Verification Status"],
          rows: [
            ["3 features shipped", "[VERIFY and name them]"],
            ["2.5-week average sprint cycle", "[VERIFY]"],
            ["94% on-time delivery", "[VERIFY]"],
            ["35% fewer post-release bugs", "[VERIFY, and how it was measured]"],
            ["Team of 8 (4 engineers, 2 designers, 1 QA, 1 PM)", "[VERIFY]"],
            ["Quote from a Senior Full-Stack Engineer", "[Use only if real and permitted]"],
            ["Prioritization table (Offline Conflict Resolver, Bulk Asset Export, Audit Log)", "[VERIFY it matches your real work]"],
          ],
        },
      },
      {
        id: "learnings",
        title: "What I Learned",
        bullets: [
          "Most operational problems are unclear ownership and handoffs, not missing tools.",
          "A well-written spec removes more bugs than extra QA.",
        ],
        placeholders: ["[ADD: one specific decision you made and what you would change]"],
      },
    ],
    learnings: [
      "Most operational problems are unclear ownership and handoffs, not missing tools.",
      "A well-written spec removes more bugs than extra QA.",
    ],
    links: {
      liveDemo: "https://alienhouse.io",
    },
    nextSlug: "founders-club",
    nextTitle: "Founders Club, SRMIST (DEI)",
  },

  // ─────────────────────────────────────────────────────────────
  // 4. FOUNDERS CLUB, SRMIST (DEI)
  // ─────────────────────────────────────────────────────────────
  "founders-club": {
    slug: "founders-club",
    title: "Founders Club, SRMIST (DEI)",
    subtitle: "Operations, Marketing, HRM and Quality Control for Flagship Campus Initiatives",
    category: "Leadership & Operations",
    role: "Operations & Marketing Member → Associate Lead → HRM & Quality Control",
    timeline: "[ADD for each role]",
    team: "Founders Club under Directorate of Entrepreneurship and Innovation (DEI), SRMIST",
    statusBadge: "Founders Club, SRMIST (DEI) · Operations, Mktg, HRM & QC",
    tools: ["Operations Management", "Outreach Campaigns", "HRM Rubrics", "Payment Workflows", "Helpdesk Systems"],
    readTime: "7 min read",
    headlineMetrics: [
      {
        value: "PB-9",
        label: "SPOC Ownership",
        sublabel: "Foundathon 3.0 Climate Tech track",
      },
      {
        value: "[ADD]",
        label: "Bootcamp Registrations",
        sublabel: "Targeted outreach campaign [ADD]",
        isPlaceholder: true,
      },
      {
        value: "[ADD]",
        label: "Candidates Evaluated",
        sublabel: "Outreach domain recruitment [ADD]",
        isPlaceholder: true,
      },
    ],
    tldr: {
      problem:
        "Scaling campus entrepreneurship initiatives requires disciplined operational coordination across registration portals, targeted marketing outreach, and rigorous team quality control.",
      action:
        "I moved from member to associate lead to HRM and QC, working across event operations, marketing and outreach, recruitment and quality control. I owned a defined hackathon problem statement and helped run registration, helpdesk and promotion for flagship student events.",
      result:
        "Standardized candidate evaluation rubrics, executed payment and registration workflows for major bootcamps, and coordinated AlienHouse problem statement communications.",
    },
    sections: [
      {
        id: "how-i-worked",
        title: "How I Worked",
        subsections: [
          {
            title: "Operations",
            description: "Coordinated event workflows, registration and payment flow, and helpdesk support, connecting promotion to on-ground execution.",
          },
          {
            title: "Marketing and Outreach",
            description: "Wrote targeted messages and campaigns, favoring personalized outreach over generic posts.",
          },
          {
            title: "People and Quality",
            description: "Interviewed candidates for the Outreach domain with structured HR and domain questions, and took on quality-control responsibilities.",
          },
          {
            title: "Attention to Detail",
            description: "Handled administrative tasks such as the club T-shirt form, where accurate data matters for printing.",
          },
        ],
      },
      {
        id: "initiatives",
        title: "Key Initiatives",
        subsections: [
          {
            title: "Foundathon 3.0 (Flagship Hackathon)",
            description: "Single point of contact for Problem Statement 9, an AI-Driven Climate Tech Investment Platform, from AlienHouse Networks. Owned communication between that problem statement and its participants.",
            bullets: ["[ADD: number of teams on PB-9]"],
          },
          {
            title: "Entrepreneurship Bootcamp 2025, Edition IV (Marketing)",
            description: "Wrote outreach to drive registrations, communicating the five-day format, benefits, daily food, five days of on-duty leave, the Rs 5,000 fee and the 25% Founders Club referral discount. Sent personalized invitations to prospects, including previous IdeaSpark 2.0 teams.",
            bullets: ["[ADD: registrations driven]"],
          },
          {
            title: "Entrepreneurial Bootcamp IX (30 Oct to 2 Nov 2025)",
            description: "Supported Founders Club's collaboration with SRM DEI.",
            bullets: ["[ADD: your specific duties]"],
          },
          {
            title: "Club Wars",
            description: "Worked on the registration and payment portal workflow, helpdesk coordination and C2C promotional posters.",
            bullets: ["[ADD: participants or registrations]"],
          },
          {
            title: "Recruitment (Outreach Domain)",
            description: "Prepared and ran structured interviews with both general suitability and outreach-skill questions.",
            bullets: ["[ADD: candidates interviewed and selected]"],
          },
          {
            title: "Outreach & Institutional Initiatives",
            description: "Involved in DEI's Innovation Council (IIC) outreach, nominating members to represent the club to other colleges. A hostel helpdesk was proposed for 1 to 7 August 2026 [VERIFY: it happened before including it].",
          },
        ],
      },
      {
        id: "skills",
        title: "Skills Demonstrated",
        table: {
          headers: ["Work", "PM Skill Demonstrated"],
          rows: [
            ["Foundathon PB-9 SPOC", "Stakeholder coordination, ownership"],
            ["Registration and payment portal", "Workflow and operations management"],
            ["Bootcamp promotion and outreach", "Growth and audience acquisition"],
            ["Helpdesk and event execution", "Cross-functional execution"],
            ["Candidate interviews", "Assessment and hiring"],
            ["HRM and QC", "Process quality, team operations"],
          ],
        },
      },
      {
        id: "missing-evidence",
        title: "Missing Evidence & Opportunities to Strengthen",
        callout: {
          type: "note",
          text: "The case study becomes much stronger with: registrations you drove, number of events, team size you coordinated, exact role dates, and specific QC deliverables. Add any you can defend.",
        },
      },
      {
        id: "learnings",
        title: "What I Learned",
        bullets: [
          "Marketing works better when it is specific to the person you are writing to.",
          "Execution details (forms, payments, helpdesks) decide whether an event feels professional.",
        ],
        placeholders: ["[ADD: one lesson from moving into a lead role]"],
      },
    ],
    learnings: [
      "Marketing works better when it is specific to the person you are writing to.",
      "Execution details (forms, payments, helpdesks) decide whether an event feels professional.",
    ],
    links: {
      liveDemo: "https://foundersclubsrm.com",
    },
    nextSlug: "product-teardowns",
    nextTitle: "Product Teardowns",
  },

  // ─────────────────────────────────────────────────────────────
  // 5. PRODUCT TEARDOWNS (Kept Unchanged)
  // ─────────────────────────────────────────────────────────────
  "product-teardowns": {
    slug: "product-teardowns",
    title: "Product Teardowns",
    subtitle: "UX Deconstructions & Architectural Deep Dives into Fast-Growing SaaS Products",
    category: "Product Analysis & Teardowns",
    role: "Product Analyst & Teardown Author",
    timeline: "Ongoing Series",
    team: "Independent Research",
    statusBadge: "Ongoing Series · 6 Teardowns Published",
    tools: ["Figma", "Linear", "Chrome DevTools", "Notion"],
    readTime: "5 min read",
    headlineMetrics: [
      {
        value: "6",
        label: "Teardowns Published",
        sublabel: "Detailed product breakdowns",
      },
      {
        value: "100%",
        label: "Independent Analysis",
        sublabel: "First-principles evaluation",
      },
      {
        value: "0→1",
        label: "PM Synthesis",
        sublabel: "Friction to design solutions",
      },
    ],
    tldr: {
      problem:
        "Modern digital products often accumulate hidden friction points, awkward information hierarchies, and unintuitive user flows as they scale.",
      action:
        "Dissected end-to-end user journeys across leading developer tools and consumer applications, isolating friction hotspots and proposing cleaner product alternatives.",
      result:
        "Published 6 in-depth architectural and interaction teardowns illuminating high-velocity UX patterns.",
    },
    sections: [
      {
        id: "problem",
        title: "Approach & Methodology",
        content:
          "Each teardown examines an application through three critical lenses: first-time user activation velocity, cognitive load during core tasks, and the structural trade-offs made between power-user efficiency and accessibility.",
      },
      {
        id: "learnings",
        title: "Key Insights Across Teardowns",
        bullets: [
          "Keyboard shortcuts and command palettes are table stakes for developer retention.",
          "Progressive onboarding consistently outperforms upfront configuration modals.",
          "Speed of perceived performance matters more than raw network latency.",
        ],
      },
    ],
    learnings: [
      "Great product teardowns critique the problem framing, not just surface-level UI decisions.",
      "Understanding what a team chose NOT to build is often more informative than what they shipped.",
    ],
    links: {
      liveDemo: "https://github.com/joshcodz",
    },
    nextSlug: "zenos",
    nextTitle: "Zenos: A Developer-First OS",
  },
};
