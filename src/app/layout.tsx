import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { business } from "@/content/siteContent";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AccessibilityFloatingBadge } from "@/components/AccessibilityBadge";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://faten-architect.co.il";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | אדריכלות ועיצוב פנים – ${business.city}`,
    template: `%s | ${business.name}`,
  },
  description:
    "תכנון ועיצוב שמדייק את החיים שלך — פונקציונלי, אלגנטי ומרשים. אדריכלית ומעצבת פנים משפרעם. התאמה אישית, תכנון חכם וליווי מלא.",
  keywords: [
    "אדריכלות",
    "עיצוב פנים",
    "שפרעם",
    "תכנון מבנים",
    "הום סטיילינג",
    "עיצוב מסחרי",
    "Faten Architect",
  ],
  authors: [{ name: business.name, url: siteUrl }],
  creator: business.name,
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: siteUrl,
    siteName: business.name,
    title: `${business.name} | אדריכלות ועיצוב פנים – ${business.city}`,
    description:
      "תכנון ועיצוב שמדייק את החיים שלך — פונקציונלי, אלגנטי ומרשים. אדריכלית ומעצבת פנים משפרעם.",
    images: [
      {
        url: "/projects/logo.png.jpeg",
        width: 1200,
        height: 630,
        alt: `${business.name} - Architecture & Interior Design`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | אדריכלות ועיצוב פנים`,
    description: "תכנון ועיצוב שמדייק את החיים שלך — פונקציונלי, אלגנטי ומרשים.",
    images: ["/projects/logo.png.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <a href="#main" className="sr-only focus:fixed focus:inset-auto focus:top-4 focus:right-4 focus:z-[60] focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:rounded focus:bg-warm-charcoal focus:px-3 focus:py-2 focus:text-white focus:[clip:auto]">
          דלג לתוכן הראשי
        </a>
        <JsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <AccessibilityFloatingBadge />
      </body>
    </html>
  );
}
