import Hero from "@/components/hero/Hero";
import PillarStack from "@/components/work/PillarStack";
import Achievements from "@/components/achievements/Achievements";
import RecognitionMarquee from "@/components/work/RecognitionMarquee";
import ProjectsGrid from "@/components/work/ProjectsGrid";
import AboutWindow from "@/components/about/AboutWindow";
import FooterSection from "@/components/footer/FooterSection";
import { getAllConfig } from "@/lib/db";
import { DEFAULT_SITE_CONFIG } from "@/lib/siteDefaults";

export const revalidate = 0;

export default async function HomePage() {
  let config = DEFAULT_SITE_CONFIG;
  try {
    const dbConfig = await getAllConfig();
    config = { ...DEFAULT_SITE_CONFIG, ...dbConfig };
  } catch (err) {
    console.warn("Could not query DB in HomePage, using defaults", err);
  }

  return (
    <main className="min-h-screen flex flex-col bg-bg text-text-primary selection:bg-accent/20 selection:text-accent">
      {/* ═══════════════════════════════════════════════════════
          1. HERO: Interactive Desktop OS
          ═══════════════════════════════════════════════════════ */}
      <Hero config={config} />

      {/* ═══════════════════════════════════════════════════════
          2. PILLAR STACK: Scroll-driven PM Superpowers
          ═══════════════════════════════════════════════════════ */}
      <PillarStack />

      {/* ═══════════════════════════════════════════════════════
          3. ACHIEVEMENTS: 3D Tilt Badge Cards
          ═══════════════════════════════════════════════════════ */}
      <Achievements />

      {/* ═══════════════════════════════════════════════════════
          4. IN THE WILD: Published Writing & Marquee
          ═══════════════════════════════════════════════════════ */}
      <RecognitionMarquee />

      {/* ═══════════════════════════════════════════════════════
          5. ALL WORK: Projects Grid with Category Filters
          ═══════════════════════════════════════════════════════ */}
      <ProjectsGrid />

      {/* ═══════════════════════════════════════════════════════
          6. ABOUT: "about-me.txt" Terminal / Notepad Window
          ═══════════════════════════════════════════════════════ */}
      <AboutWindow config={config} />

      {/* ═══════════════════════════════════════════════════════
          7. FOOTER / CONTACT: Big Typography & Social Hub
          ═══════════════════════════════════════════════════════ */}
      <FooterSection config={config} />
    </main>
  );
}
