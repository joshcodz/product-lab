import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllConfig, getAllSocialLinks } from "@/lib/db";

export const revalidate = 0;

export default async function AboutPage() {
  const [config, socialLinks] = await Promise.all([
    getAllConfig(),
    getAllSocialLinks(),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-6 pb-20">
      <Nav siteTitle={config.site_title || ""} socialLinks={socialLinks} />

      <section className="mt-16 mb-20">
        <h1 className="text-3xl font-bold text-[#111111] mb-10">About</h1>

        {config.about_text && (
          <div className="space-y-5 max-w-xl">
            {config.about_text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-[#666666] text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Currently section on about page too */}
        {(config.currently_building ||
          config.currently_reading ||
          config.currently_targeting) && (
          <div className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#666666] mb-6">
              Currently
            </h2>
            <div className="flex flex-col gap-3">
              {config.currently_building && (
                <div className="flex gap-3">
                  <span className="text-[#666666] text-sm w-24 shrink-0">Building</span>
                  <span className="text-[#111111] text-sm">{config.currently_building}</span>
                </div>
              )}
              {config.currently_reading && (
                <div className="flex gap-3">
                  <span className="text-[#666666] text-sm w-24 shrink-0">Reading</span>
                  <span className="text-[#111111] text-sm">{config.currently_reading}</span>
                </div>
              )}
              {config.currently_targeting && (
                <div className="flex gap-3">
                  <span className="text-[#666666] text-sm w-24 shrink-0">Targeting</span>
                  <span className="text-[#111111] text-sm">{config.currently_targeting}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111] text-sm font-medium underline underline-offset-2 hover:text-[#666666] transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </section>

      <Footer footerText={config.footer_text || ""} />
    </div>
  );
}
