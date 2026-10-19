import Link from "next/link";
import { SocialLink } from "@/lib/db";

interface NavProps {
  siteTitle: string;
  socialLinks: SocialLink[];
}

export default function Nav({ siteTitle, socialLinks }: NavProps) {
  return (
    <nav className="w-full flex items-center justify-between py-6 px-0">
      <Link
        href="/"
        className="text-[#111111] font-semibold text-base hover:opacity-70 transition-opacity"
      >
        {siteTitle}
      </Link>

      <div className="flex items-center gap-5">
        <Link
          href="/about"
          className="text-[#666666] text-sm hover:text-[#111111] transition-colors"
        >
          About
        </Link>

        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666666] text-sm hover:text-[#111111] transition-colors"
          >
            {link.platform}
          </a>
        ))}
      </div>
    </nav>
  );
}
