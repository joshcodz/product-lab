import type { Metadata } from "next";
import "./globals.css";
import { bricolage, inter, jetbrainsMono, caveat } from "@/lib/fonts";
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
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        {/* Prevent FOUC: set theme, wallpaper, grain, and time before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('jpl-theme');
                  var isDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }

                  var storedWp = localStorage.getItem('jpl-wallpaper');
                  var valid = ['mesh', 'aurora', 'dots', 'time-of-day'];
                  var wp = (storedWp && valid.indexOf(storedWp) !== -1) ? storedWp : 'mesh';
                  document.documentElement.setAttribute('data-wallpaper', wp);

                  var storedGrain = localStorage.getItem('jpl-grain');
                  var grain = storedGrain === null ? 'true' : storedGrain;
                  document.documentElement.setAttribute('data-grain', grain === 'false' ? 'false' : 'true');

                  var hour = new Date().getHours();
                  var tod = 'night';
                  if (hour >= 5 && hour < 12) {
                    tod = 'morning';
                  } else if (hour >= 12 && hour < 17) {
                    tod = 'afternoon';
                  } else if (hour >= 17 && hour < 21) {
                    tod = 'evening';
                  }
                  document.documentElement.setAttribute('data-time', tod);
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
