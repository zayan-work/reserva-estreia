import { FAQ } from "@/lib/faq";
import { SITE } from "@/lib/site";

/**
 * Structured data for SEO + rich results: Organization, WebSite, and FAQPage.
 * FAQPage can earn an expandable FAQ rich result in Google. Built from the same
 * FAQ source as the visible section so they never drift.
 */
export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#org`,
        name: SITE.brand,
        url: SITE.url,
        description: SITE.description,
        areaServed: "BR",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.title,
        inLanguage: "pt-BR",
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#org` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, generated from our own content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
