import type { Metadata } from "next";
import "./globals.css";
import { bricolage, inter, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Josh's Product Lab",
  description:
    "Product manager, builder, and CS student. I turn messy user problems into shipped products — and I build the prototypes myself.",
  metadataBase: new URL("https://joshsproductlab.com"),
  openGraph: {
    title: "Josh's Product Lab",
    description:
      "Product manager, builder, and CS student. I turn messy user problems into shipped products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Josh's Product Lab",
    description:
      "Product manager, builder, and CS student. I turn messy user problems into shipped products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Prevent FOUC: set dark class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('jpl-theme');
                  var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-text-primary transition-colors duration-normal">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
