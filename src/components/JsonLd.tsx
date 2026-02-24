import { business } from "@/content/siteContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://faten-architect.co.il";

export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description:
      "תכנון ועיצוב שמדייק את החיים שלך — פונקציונלי, אלגנטי ומרשים. אדריכלית ומעצבת פנים משפרעם.",
    url: siteUrl,
    telephone: business.phoneE164,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: "Israel",
    },
    sameAs: [business.instagram],
    areaServed: "IL",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
