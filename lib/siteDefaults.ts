export interface SiteDefaults {
  [key: string]: string;
  hero_headline: string;
  hero_subtext: string;
  hero_cta_label: string;
  hero_cta_url: string;
  hero_secondary_label: string;
  hero_secondary_url: string;

  status_badge: string;
  status_headline: string;

  about_text: string;
  about_tagline: string;
  about_role: string;
  about_location: string;

  currently_building: string;
  currently_reading: string;
  currently_targeting: string;

  site_title: string;
  meta_description: string;
  footer_text: string;
  contact_email: string;
  linkedin_url: string;
  github_url: string;
  calendar_url: string;
}

export const DEFAULT_SITE_CONFIG: SiteDefaults = {
  hero_headline: "I'm Josh. I'm building toward product leadership at B2B SaaS & dev tools startups.",
  hero_subtext: "I turn messy user problems into shipped products — and I build the prototypes myself.",
  hero_cta_label: "See my work",
  hero_cta_url: "#work",
  hero_secondary_label: "Book a chat",
  hero_secondary_url: "#contact",

  status_badge: "Open to internships",
  status_headline: "Josh · Aspiring PM",

  about_text:
    "Started as a Computer Science undergrad at SRMIST writing C++ and building full-stack web apps. Quickly realized my real thrill wasn't just writing clean syntax — it was figuring out what to build in the first place and why anyone would care.\n\nProduct Manager Intern at AlienHouse Networks, driving user journeys and spec writing with an engineering team of 8. In parallel, leading tech & community at Founders Club SRMIST, helping builders turn hackathon ideas into functional products.\n\nAiming for Associate Product Manager or Founder's Office roles at ambitious B2B SaaS and developer tools startups.",
  about_tagline: "Why a CS student builds products instead of just writing algorithms.",
  about_role: "SRMIST · 3rd Year B.Tech CSE",
  about_location: "Chennai, India · UTC+5:30",

  currently_building: "Onboarding Friction Score & Zenos Collaboration Engine",
  currently_reading: "Inspired by Marty Cagan & The Mom Test",
  currently_targeting: "APM / Founder's Office Internships (Summer/Fall 2026)",

  site_title: "Josh's Product Lab",
  meta_description: "Portfolio & Interactive OS of Josh, an aspiring PM building 0→1 products for B2B SaaS and Dev Tools startups.",
  footer_text: "© 2026 Josh's Product Lab. Built by me with Next.js & Framer Motion.",
  contact_email: "josh@example.com",
  linkedin_url: "https://linkedin.com/in/joshcodz",
  github_url: "https://github.com/joshcodz",
  calendar_url: "https://linkedin.com/in/joshcodz",
};
