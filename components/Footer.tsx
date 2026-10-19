interface FooterProps {
  footerText: string;
}

export default function Footer({ footerText }: FooterProps) {
  if (!footerText) return null;

  return (
    <footer className="border-t border-[#F4F4F4] py-8 mt-20">
      <p className="text-[#666666] text-sm">{footerText}</p>
    </footer>
  );
}
