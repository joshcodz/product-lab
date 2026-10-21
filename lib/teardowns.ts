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

// Empty array by default — no fake or made-up sample teardowns
export const TEARDOWNS: ProductTeardown[] = [];
