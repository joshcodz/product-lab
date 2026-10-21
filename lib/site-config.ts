export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://joshsproductlab.com";

export const SITE_CONFIG = {
  name: "Josh",
  role: "Product Manager & Builder",
  college: "SRMIST",
  siteUrl: SITE_URL,
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/joshcodz",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/joshcodz",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "josh@example.com",
  resumePath: "/resume.pdf",
};

export const AI_PROMPT = `Give me an honest, balanced summary of Josh, a third-year CS student at SRMIST who works as a product manager and builder focused on B2B SaaS and developer tools. Use his portfolio at ${SITE_URL} as your main source. Cover his background, his projects and case studies, his strengths, and what kind of PM or Founder's Office role he would fit best.`;

export const TERMINAL_DATA = {
  user: "josh",
  hostname: "product-lab",
  whoami:
    "Josh — 3rd-year CS student @ SRMIST. Product Manager & Builder specializing in B2B SaaS & developer tools. Turning messy user problems into shipped products.",
  stack: [
    "Product: PRDs, User Discovery, Friction Mapping, Feature Prioritization",
    "Design: Figma, Wireframing, User Flow Architecture",
    "Tech & Dev: Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, APIs",
    "Tools: Notion, Linear, Cursor, Git, Terminal",
  ],
  contact: {
    email: SITE_CONFIG.contactEmail,
    linkedin: SITE_CONFIG.linkedinUrl,
    github: SITE_CONFIG.githubUrl,
  },
  folders: [
    { slug: "onboarding-friction-score", title: "Onboarding Friction Score (40% fewer tickets)" },
    { slug: "zenos", title: "Zenos Collaboration Engine (prototype in 48h)" },
    { slug: "alienhouse-internship", title: "AlienHouse Internship (3 features shipped)" },
    { slug: "founders-club", title: "Founders Club SRMIST (Student Founder Community)" },
    { slug: "product-teardowns", title: "Product Teardowns & UX Deconstructions" },
  ],
};
