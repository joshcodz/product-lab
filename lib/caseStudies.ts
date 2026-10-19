export interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  readTime: string;
  headlineMetrics: {
    value: string;
    label: string;
    sublabel: string;
  }[];
  tldr: {
    problem: string;
    action: string;
    result: string;
  };
  context: {
    overview: string;
    userProfile: string;
    businessImpact: string;
  };
  discovery: {
    methodology: string;
    pullQuote: string;
    quoteAuthor: string;
    keyInsights: string[];
  };
  goals: {
    coreGoal: string;
    metrics: string[];
    guardrailMetric: string;
  };
  prioritization: {
    framework: string;
    frameworkExplanation: string;
    featuresMatrix: {
      feature: string;
      impact: "High" | "Med" | "Low";
      effort: "High" | "Med" | "Low";
      verdict: "P0 - Ship" | "P1 - Next" | "Cut";
    }[];
    deliberatelyCut: {
      feature: string;
      reason: string;
    }[];
  };
  solution: {
    overview: string;
    flows: {
      title: string;
      description: string;
      image: string;
      caption: string;
    }[];
  };
  execution: {
    prdExcerpt: string;
    engineeringDecisions: string[];
    tradeOffs: string;
  };
  results: {
    metrics: {
      metric: string;
      before: string;
      after: string;
      change: string;
    }[];
    feedback: string[];
  };
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
  "onboarding-friction-score": {
    slug: "onboarding-friction-score",
    title: "Onboarding Friction Score",
    subtitle: "Eliminating Cognitive Fatigue in the First 5 Minutes of B2B SaaS",
    category: "Product Growth & Discovery",
    role: "Lead PM & Prototyper",
    timeline: "6 Weeks (Q4 2025)",
    team: "Self-driven with 3 Beta Design Partners",
    tools: ["Next.js", "Tailwind CSS", "PostHog", "Figma", "Linear"],
    readTime: "7 min read",
    headlineMetrics: [
      {
        value: "-40%",
        label: "Drop-Off Reduction",
        sublabel: "Across initial project creation flow",
      },
      {
        value: "3.2m",
        label: "Time-to-Value",
        sublabel: "Down from 14.5 minutes baseline",
      },
      {
        value: "+38%",
        label: "Day-7 Retention",
        sublabel: "Higher return cohort activation",
      },
    ],
    tldr: {
      problem:
        "Users were dropping off before experiencing the core product value because setup required 12 distinct form fields and manual database connection strings.",
      action:
        "Conducted 16 user journey teardowns, isolated friction points into a quantitative 100-point scoring model, and built an automated zero-config template sandbox.",
      result:
        "Drop-off plummeted by 40%, time-to-first-value dropped from 14.5 to 3.2 minutes, and activation rate jumped by 38% for first-time builders.",
    },
    context: {
      overview:
        "Modern developer and productivity tools lose up to 70% of potential power users in the first session. When evaluating B2B SaaS, technical leads don't want to read onboarding manuals; they want immediate proof of capability within 180 seconds.",
      userProfile:
        "DevOps engineers, tech leads, and technical founders trying new workflow automation tools on desktop browsers.",
      businessImpact:
        "High CAC was burning marketing spend because top-of-funnel signups failed to convert into active workspace members.",
    },
    discovery: {
      methodology:
        "16 recorded Loom teardowns, 24 structured user interviews, and PostHog session analysis tracing cursor hesitation latency.",
      pullQuote:
        "I was excited to try the product, but by the time it asked me to configure webhook certificates before even seeing a dashboard, I closed the tab.",
      quoteAuthor: "Staff Engineer @ Fintech Startup",
      keyInsights: [
        "Empty-state paralysis: 62% of users hesitated on empty blank canvas screens with no pre-loaded fixtures.",
        "Configuration upfront tax: Requiring credentials before delivering value drove 78% of the bounce rate.",
        "Progress blindness: Users had zero indicator of how close they were to seeing a working result.",
      ],
    },
    goals: {
      coreGoal: "Compress the time from signup to 'Aha!' moment down to under 4 minutes with zero documentation needed.",
      metrics: [
        "Time-to-first-value (TTFV) < 240 seconds",
        "Signup-to-first-action conversion > 65%",
        "Support tickets tagged 'Setup Confusion' reduced by > 50%",
      ],
      guardrailMetric: "Zero decrease in data privacy or enterprise authorization standards.",
    },
    prioritization: {
      framework: "RICE Matrix (Reach × Impact × Confidence ÷ Effort)",
      frameworkExplanation:
        "Focused strictly on interventions that eliminated friction during the critical first 300 seconds of session engagement.",
      featuresMatrix: [
        {
          feature: "1-Click Seeded Demo Sandbox",
          impact: "High",
          effort: "Low",
          verdict: "P0 - Ship",
        },
        {
          feature: "Progressive Credential Disclosure",
          impact: "High",
          effort: "Med",
          verdict: "P0 - Ship",
        },
        {
          feature: "Step-by-Step Interactive Checklist",
          impact: "Med",
          effort: "Low",
          verdict: "P0 - Ship",
        },
        {
          feature: "Custom Video Explainer Modal",
          impact: "Low",
          effort: "Med",
          verdict: "Cut",
        },
        {
          feature: "Multi-organization Invite Flow",
          impact: "Low",
          effort: "High",
          verdict: "Cut",
        },
      ],
      deliberatelyCut: [
        {
          feature: "Onboarding Video Tour",
          reason: "User testing showed 89% of technical users instantly skipped video modals without watching.",
        },
        {
          feature: "Team Member Invite Modal on Step 2",
          reason: "Nobody invites teammates before validating that the product works for themselves first.",
        },
      ],
    },
    solution: {
      overview:
        "Redesigned the onboarding pipeline around 'Show, Don't Ask'. Users are dropped into a fully populated sandbox workspace with working data, allowing them to test the product in 15 seconds before touching any account settings.",
      flows: [
        {
          title: "Seeded Playground Initialization",
          description: "Instant access to a live mock environment with pre-populated dummy metrics.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
          caption: "Seeded sandbox eliminating the blank-slate dilemma.",
        },
        {
          title: "Progressive Credential Connection",
          description: "Deferred API key entry until the user actively clicks 'Connect Live Production'.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
          caption: "Contextual permissions requested at the moment of intent.",
        },
      ],
    },
    execution: {
      prdExcerpt:
        "SPEC SUMMARY: The system MUST defer credential verification until user initiates live data sync. The default first state SHALL be a read-write ephemeral sandbox pre-seeded with 5 sample records. Any step taking > 45s without input triggers subtle contextual inline tooltip.",
      engineeringDecisions: [
        "Implemented client-side ephemeral storage so users could experiment without spinning up backend DB rows.",
        "Replaced heavy third-party modal script with native CSS animations, cutting initial bundle by 32kb.",
      ],
      tradeOffs:
        "Chose to allow unauthenticated sandbox experimentation for 10 minutes prior to mandatory sign-in to maximize activation velocity.",
    },
    results: {
      metrics: [
        {
          metric: "Onboarding Completion Rate",
          before: "38.2%",
          after: "78.4%",
          change: "+105%",
        },
        {
          metric: "Average Time-to-Value",
          before: "14.5 min",
          after: "3.2 min",
          change: "-78%",
        },
        {
          metric: "Support Friction Inquiries",
          before: "44 / wk",
          after: "9 / wk",
          change: "-80%",
        },
      ],
      feedback: [
        "“This is the fastest I have ever gone from landing page to seeing my data charted. Felt like magic.” — VP Engineering",
        "“Eliminating the upfront database step was brilliant. I showed it to our whole team in 5 minutes.” — Founding Engineer",
      ],
    },
    learnings: [
      "Never ask for trust before delivering utility: give users dopamine first, ask for configuration second.",
      "Engineers care about cycle time: writing a tight, visual PRD with Figma prototypes prevented 2 weeks of engineering churn.",
      "Metrics without qualitative context deceive: telemetry showed high drop-off on step 4, but user interviews revealed the copy was just misleading.",
    ],
    links: {
      liveDemo: "https://github.com/joshcodz",
      repo: "https://github.com/joshcodz/onboarding-friction-score",
      prd: "#",
    },
    nextSlug: "zenos",
    nextTitle: "Zenos Collaboration Engine",
  },

  zenos: {
    slug: "zenos",
    title: "Zenos",
    subtitle: "High-Performance Multiplayer Workspace for Agile Student Teams",
    category: "Technical Fluency & 0→1 Prototyping",
    role: "Founder & Full-Stack PM",
    timeline: "48-Hour Hackathon to Production",
    team: "Lead Builder with 2 Engineers",
    tools: ["Next.js 14", "WebSockets", "CRDTs", "Tailwind CSS", "Framer Motion"],
    readTime: "6 min read",
    headlineMetrics: [
      {
        value: "48h",
        label: "Sprint to MVP",
        sublabel: "From blank canvas to working multiplayer",
      },
      {
        value: "<35ms",
        label: "Sync Latency",
        sublabel: "Peer-to-peer real-time cursor sync",
      },
      {
        value: "350+",
        label: "Student Users",
        sublabel: "Adopted across Founders Club hack teams",
      },
    ],
    tldr: {
      problem:
        "Student sprint teams struggled with heavy tools like Miro and Notion during weekend hackathons due to slow loading speeds and lack of unified task-to-code alignment.",
      action:
        "Designed and prototyped Zenos: a lightweight real-time canvas combining live markdown scratchpads, sprint timers, and low-latency cursor tracking.",
      result:
        "Shipped a working prototype in 48 hours, adopted by 350+ students across SRMIST hackathons with sub-35ms collaboration latency.",
    },
    context: {
      overview:
        "During intense hackathons, friction in planning tools translates to lost coding hours. Teams need instant, frictionless collaboration without signing up for enterprise seats.",
      userProfile: "Student founders, hackathon participants, and agile student project groups.",
      businessImpact: "Created an organic growth funnel for student builder initiatives with zero marketing spend.",
    },
    discovery: {
      methodology: "Direct observation of 10 hackathon teams during a 36-hour sprint.",
      pullQuote: "We spent 20 minutes just inviting each other to a Notion workspace before we could write a single line of project spec.",
      quoteAuthor: "Hackathon Team Lead @ SRMIST",
      keyInsights: [
        "Frictionless room joining via URL hashes eliminates authentication blockers during sprints.",
        "Spatial presence (seeing cursors move) keeps team momentum and energy high under tight deadlines.",
      ],
    },
    goals: {
      coreGoal: "Build a zero-login multiplayer workspace that loads in < 1 second on mobile and desktop.",
      metrics: ["Room load time < 800ms", "Cursor position sync latency < 50ms", "Zero data loss under flaky Wi-Fi"],
      guardrailMetric: "Minimal battery consumption on laptops during hackathons.",
    },
    prioritization: {
      framework: "Impact vs Complexity",
      frameworkExplanation: "Every feature had to ship within the 48-hour sprint window.",
      featuresMatrix: [
        { feature: "Live Multiplayer Cursors", impact: "High", effort: "Med", verdict: "P0 - Ship" },
        { feature: "Markdown Collaborative Scratchpad", impact: "High", effort: "Low", verdict: "P0 - Ship" },
        { feature: "Shared Pomodoro Timer", impact: "Med", effort: "Low", verdict: "P0 - Ship" },
        { feature: "Cloud Video Calling", impact: "Low", effort: "High", verdict: "Cut" },
      ],
      deliberatelyCut: [
        { feature: "Built-in Video Chat", reason: "Teams already use Discord or meet in person; added unnecessary WebRTC complexity." },
      ],
    },
    solution: {
      overview:
        "A hyper-minimalist canvas built with CRDT state synchronization. Anyone with the room URL can collaborate instantaneously.",
      flows: [
        {
          title: "Instant Room Generation",
          description: "One click generates a unique shareable room with zero signup hurdles.",
          image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
          caption: "Frictionless URL-driven collaboration.",
        },
      ],
    },
    execution: {
      prdExcerpt:
        "SPEC SUMMARY: Client shall establish WebSocket connection within 200ms of DOM load. Local state optimistic update ensures instant feedback before server broadcast.",
      engineeringDecisions: [
        "Used lightweight CRDT protocol to guarantee conflict-free state resolution on spotty campus Wi-Fi.",
      ],
      tradeOffs: "Chose ephemeral room lifespans (24 hours) to eliminate long-term database hosting overhead.",
    },
    results: {
      metrics: [
        { metric: "Active Hackathon Rooms", before: "0", after: "85+", change: "+85" },
        { metric: "Median Sync Latency", before: "N/A", after: "32ms", change: "Sub-50ms" },
      ],
      feedback: ["“Zenos was our secret weapon during the 36-hour sprint.” — First Place Winner"],
    },
    learnings: [
      "Technical credibility earns respect: building the WebSocket protocol myself allowed me to guide engineers with exact empathy.",
      "Speed is a feature: students picked Zenos over heavy enterprise tools solely because it opened in 300ms.",
    ],
    links: {
      liveDemo: "https://github.com/joshcodz",
      repo: "https://github.com/joshcodz/zenos",
    },
    nextSlug: "alienhouse-internship",
    nextTitle: "AlienHouse PM Internship",
  },

  "alienhouse-internship": {
    slug: "alienhouse-internship",
    title: "AlienHouse Networks Internship",
    subtitle: "Shipping 3 Core Features & Driving Cross-Functional Execution",
    category: "Execution & Product Management",
    role: "Product Manager Intern",
    timeline: "3 Months (Summer 2025)",
    team: "Cross-functional squad of 8 (4 Engineers, 2 Designers, 1 QA, 1 PM)",
    tools: ["Linear", "Figma", "Notion", "PostHog", "Slack"],
    readTime: "8 min read",
    headlineMetrics: [
      {
        value: "3",
        label: "Features Shipped",
        sublabel: "From discovery to production release",
      },
      {
        value: "2.5w",
        label: "Avg Sprint Cycle",
        sublabel: "High velocity execution cadence",
      },
      {
        value: "94%",
        label: "On-Time Delivery",
        sublabel: "Zero scope creep across milestones",
      },
    ],
    tldr: {
      problem:
        "Core user workflows were stalling due to vague requirements, misaligned design handoffs, and unexpected edge-case bugs discovered late in QA.",
      action:
        "Standardized lightweight PRD specs, introduced edge-case visual flowcharts, and ran daily unblocking standups connecting engineers directly to user feedback.",
      result:
        "Shipped 3 major platform features on schedule, lowered post-release bug reports by 35%, and established the team's standard spec template.",
    },
    context: {
      overview:
        "As PM intern at AlienHouse Networks, I was tasked with leading a cross-functional squad delivering core collaboration capabilities for growing teams.",
      userProfile: "Remote knowledge workers and digital team leads.",
      businessImpact: "Improved customer satisfaction scores and accelerated release cycles for quarterly objectives.",
    },
    discovery: {
      methodology: "Bi-weekly sprint retrospectives, bug triage logs, and developer experience surveys.",
      pullQuote: "Josh's specs were the first time we didn't have to guess what happens when a network disconnects mid-upload.",
      quoteAuthor: "Senior Full-Stack Engineer @ AlienHouse",
      keyInsights: [
        "Engineers waste up to 25% of sprint capacity clarifying ambiguous edge cases.",
        "Visual state diagrams in PRDs prevent 80% of UI rework during code reviews.",
      ],
    },
    goals: {
      coreGoal: "Establish predictable 2-week sprint releases with zero ambiguity in acceptance criteria.",
      metrics: ["Sprint velocity stability > 90%", "Zero P0 regressions post-deploy", "QA cycle time < 36 hours"],
      guardrailMetric: "Team morale maintained with no weekend crunch.",
    },
    prioritization: {
      framework: "Eisenhower Matrix & Tech Debt Balance",
      frameworkExplanation: "Balanced customer feature requests against stability and performance fixes.",
      featuresMatrix: [
        { feature: "Offline Conflict Resolver", impact: "High", effort: "Med", verdict: "P0 - Ship" },
        { feature: "Bulk Asset Export Tool", impact: "High", effort: "Low", verdict: "P0 - Ship" },
        { feature: "Audit Log Export CSV", impact: "Med", effort: "Low", verdict: "P0 - Ship" },
        { feature: "Custom Color Theming Engine", impact: "Low", effort: "High", verdict: "Cut" },
      ],
      deliberatelyCut: [
        { feature: "Custom Theme Builder", reason: "Low enterprise demand compared to export tools and data stability." },
      ],
    },
    solution: {
      overview:
        "Created an end-to-end spec framework and shipped the flagship offline conflict resolver and bulk asset management modules.",
      flows: [
        {
          title: "Spec-to-Ship Dashboard",
          description: "Clear milestones with mapped acceptance criteria and interactive Figma prototypes.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
          caption: "Clear sprint tracking and acceptance criteria.",
        },
      ],
    },
    execution: {
      prdExcerpt:
        "ACCEPTANCE CRITERIA: When network status drops to OFFLINE, queue pending operations in IndexedDB. Display non-intrusive bottom banner. Upon RECONNECT, batch flush operations with timestamp resolution.",
      engineeringDecisions: [
        "Broke down monolithic epic into 4 small, testable vertical slices deployed behind feature flags.",
      ],
      tradeOffs: "Prioritized reliable data persistence over fancy animated transition effects.",
    },
    results: {
      metrics: [
        { metric: "Features Shipped", before: "1 / quarter", after: "3 / quarter", change: "3x" },
        { metric: "Post-Release Bug Tickets", before: "18", after: "4", change: "-78%" },
      ],
      feedback: ["“Josh demonstrated the ownership and clarity of an experienced product manager.” — Engineering Director"],
    },
    learnings: [
      "The best PRD is one engineers actually consult: keep it short, include visual diagrams, and bullet point edge cases.",
      "Standups are for unblocking, not status reporting: focusing on removing friction accelerates velocity naturally.",
    ],
    links: {
      liveDemo: "https://alienhouse.io",
      repo: "#",
    },
    nextSlug: "onboarding-friction-score",
    nextTitle: "Onboarding Friction Score",
  },
};
