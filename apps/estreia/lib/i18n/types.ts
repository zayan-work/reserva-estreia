/**
 * The Dictionary contract — the exact shape every locale file must provide.
 * Each dictionary in ./dictionaries/*.ts is declared `satisfies Dictionary`,
 * so TypeScript flags any missing or misspelled key the moment a translation
 * is incomplete. Add a key here first, then fill it in pt/en/es.
 *
 * Some strings are split into segments (e.g. `{ pre, bold, post }`) because the
 * component renders part of them in <b>. Keep the split identical across locales.
 */

/** A phrase where one middle span is emphasized (rendered bold in the UI). */
export interface EmphasizedPhrase {
  pre: string;
  bold: string;
  post: string;
}

export interface Dictionary {
  /** SEO / metadata / PWA manifest / social share. */
  meta: {
    title: string;
    titleTemplate: string; // must contain "%s"
    description: string;
    keywords: string[];
    ogImageAlt: string;
    manifestName: string;
    manifestShortName: string;
    painelTitle: string; // internal dashboard <title>
  };

  /** Skip-to-content link (a11y). */
  skipLink: string;

  header: {
    logoAria: string;
    cta: string;
  };

  hero: {
    imageAlt: string;
    eyebrow: string;
    titleLead: string; // "The first collection."
    titleEm: string; // emphasized/italic: "Made for you."
    lede: string;
    cta: string;
    proofLabel: string; // "people have already reserved"
    proof: EmphasizedPhrase[]; // 3 reassurances — bold lead, then text
  };

  /** Thin reassurance band under the hero. */
  trustStrip: EmphasizedPhrase[]; // 4 items

  howItWorks: {
    eyebrow: string;
    heading: string;
    intro: string;
    imageAlt: string;
    steps: { title: string; body: string }[]; // 3 steps
  };

  collection: {
    eyebrow: string;
    heading: string;
    intro: string;
    trackAria: string;
    prevAria: string;
    nextAria: string;
    styles: { alt: string; label: string; body: string }[]; // 8 cards
  };

  reservation: {
    srHeading: string; // visually-hidden section heading
    form: {
      heading: string;
      sub: string;
      nameLabel: string;
      namePlaceholder: string;
      whatsappLabel: string;
      whatsappPlaceholder: string;
      emailLabel: string;
      emailOptional: string; // "(optional)"
      emailPlaceholder: string;
      sizeLegend: string;
      categoryLegend: string;
      categoryLabels: {
        lingerie: string;
        loungewear: string;
        body: string;
        basicos: string;
      };
      deposit: {
        pixMark: string; // "pix"
        pix: string; // "Secure with a refundable deposit"
        badge: string; // "Coming soon"
        text: string;
      };
      submit: string;
      submitting: string;
      /** Fine-print line with an inline link to the privacy policy. */
      micro: { pre: string; linkLabel: string; post: string };
      success: { heading: string; body: string; queueLabel: string };
      /** Field + form errors — must match the server's copy (lib/reservation.ts). */
      errors: {
        name: string;
        whatsapp: string;
        email: string;
        form: string;
        offline: string;
        invalidPayload: string;
        saveFailed: string;
      };
    };
    rail: {
      imageAlt: string;
      heading: string;
      benefits: { title: string; body: string }[]; // 4 benefits
    };
  };

  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[]; // 5 Q&As
  };

  footer: {
    tagline: string;
    legal: string;
    cta: string;
  };

  /** Generated social-share image (opengraph-image.tsx). */
  og: {
    eyebrow: string;
    titleLead: string;
    titleEm: string;
    subtitle: string;
    badge: string;
  };

  /** Internal demand dashboard at /painel (behind Basic Auth). */
  dashboard: {
    refresh: string;
    refreshing: string;
    eyebrow: string;
    heading: string;
    intro: string;
    loadError: string;
    retry: string;
    kpis: {
      reservations: { label: string; desc: string };
      conversion: { label: string; desc: string };
      whatsapp: { label: string; desc: string };
      topSize: { label: string; desc: string };
    };
    categoryHeading: string;
    categoryLabels: {
      lingerie: string;
      loungewear: string;
      body: string;
      basicos: string;
    };
    /** Decision-rule note. `{pre}` … <b>AND</b> … `{post}` around "AND". */
    decisionRule: { pre: string; and: string; post: string };
    meta: {
      goalLabel: string; // "Reservation goal:"
      currentLabel: string; // "current:"
      statusClears: string; // "threshold reached ✓"
      statusBelow: string; // "still below the threshold"
      visitsLabel: string; // "Visits counted:"
    };
  };
}
