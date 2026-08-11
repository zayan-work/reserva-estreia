import type { Dictionary } from "../types";

/**
 * English (en-US). Translated from the pt-BR source of truth. Voice: warm,
 * direct, reassuring — same as the Portuguese. Note the LEGAL-SAFETY strings
 * (hero reassurances, first two FAQ answers, footer legal, form micro copy):
 * keep the meaning exact; run wording past Rengan before going live.
 *
 * "WhatsApp", "Pix", and "LGPD" are Brazil-specific and intentionally kept.
 */
export const en = {
  meta: {
    title: "Reserve your spot · Estreia Collection",
    titleTemplate: "%s · Estreia",
    description:
      "The first Estreia collection. Join the reservation list without paying anything now: you secure priority and are the first to know when the piece arrives. Made for you, produced in Brazil.",
    keywords: [
      "reservation list",
      "debut collection",
      "Brazilian lingerie",
      "loungewear",
      "intimate apparel",
      "no-commitment reservation",
      "made in Brazil",
    ],
    ogImageAlt:
      "Estreia — The first collection. Made for you. No-commitment reservation list.",
    manifestName: "Estreia — Reservation list",
    manifestShortName: "Estreia",
    painelTitle: "Demand dashboard",
  },

  skipLink: "Skip to the reservation",

  header: {
    logoAria: "Estreia — home",
    cta: "Reserve my spot",
  },

  hero: {
    imageAlt:
      "Woman smiling, sitting on the bed in natural light, wearing a wine-colored lace lingerie set",
    eyebrow: "Debut collection · reservation list",
    titleLead: "The first collection.",
    titleEm: "Made for you.",
    lede:
      "Join the reservation list without paying anything now. You secure priority and are the first to know when the piece arrives.",
    cta: "Reserve my spot",
    proofLabel: "people have already reserved",
    proof: [
      { pre: "", bold: "No charge now.", post: " You pay nothing to reserve." },
      { pre: "", bold: "Priority access.", post: " Those who reserve buy first." },
      { pre: "", bold: "Zero commitment.", post: " Reserving isn't buying." },
    ],
  },

  trustStrip: [
    { pre: "", bold: "No payment", post: " to join the list" },
    { pre: "A ", bold: "WhatsApp", post: " notice when it arrives" },
    { pre: "Produced in ", bold: "Brazil", post: "" },
    { pre: "You choose ", bold: "size and style", post: "" },
  ],

  howItWorks: {
    eyebrow: "How it works",
    heading: "Quality you can feel. A process that respects you.",
    intro:
      "The reservation list exists so we understand exactly what you want before we produce. No waste, with an absolute focus on quality and the perfect fit for your body.",
    imageAlt:
      "Detail of a wine-colored lace lingerie set with gold embroidery over satin",
    steps: [
      {
        title: "You reserve",
        body:
          "Leave your name, WhatsApp, and preferred size. It takes less than a minute and there's no charge.",
      },
      {
        title: "We produce",
        body:
          "Once the list is formed, the collection goes into production in Brazil, made to truly fit.",
      },
      {
        title: "You're notified first",
        body:
          "When the piece arrives, everyone on the list gets the notice before anyone else and buys with priority.",
      },
    ],
  },

  collection: {
    eyebrow: "Options & styles",
    heading: "The collection, your way.",
    intro:
      "Cuts, colors, and textures to match different moments, styles, and bodies. Because comfort is also recognizing yourself in the piece.",
    trackAria: "Carousel of the collection's options and styles",
    prevAria: "See previous styles",
    nextAria: "See more styles",
    styles: [
      {
        alt: "Woman sitting by the window wearing a wine-colored lace set",
        label: "Sophistication",
        body: "Lace that celebrates presence and personality.",
      },
      {
        alt: "Woman in a pink lace set with a cream blazer over her shoulders",
        label: "Light tailoring",
        body: "Delicacy, color, and confidence for every day.",
      },
      {
        alt: "Woman in a lace set in shades of pink and wine with a garter belt",
        label: "Lace in color",
        body: "Textures made to be noticed by touch.",
      },
      {
        alt: "Woman in a light lace set with golden details in natural light",
        label: "Golden clarity",
        body: "Lightness that brightens your routine.",
      },
      {
        alt: "Woman in a cream high-waisted top and briefs, at home",
        label: "Real comfort",
        body: "Support, softness, and a thoughtful fit.",
      },
      {
        alt: "Woman with curves wearing a wine-colored lace set by the window",
        label: "Made for curves",
        body: "Proportion, comfort, and beauty with no compromises.",
      },
      {
        alt: "Woman in cream loungewear sitting on the sofa hugging a cushion",
        label: "A pause ritual",
        body: "Care begins with what touches your skin.",
      },
      {
        alt: "Woman in wine-colored loungewear sitting on the sofa in a cozy living room",
        label: "Community",
        body: "Made to share moments with the people you love.",
      },
    ],
  },

  reservation: {
    srHeading: "Reserve your spot in the debut collection",
    form: {
      heading: "Secure your spot in the debut",
      sub:
        "Your reservation is free and guarantees priority access to the collection before the official launch.",
      nameLabel: "Name",
      namePlaceholder: "What you'd like to be called",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "(11) 90000-0000",
      emailLabel: "Email",
      emailOptional: "(optional)",
      emailPlaceholder: "you@email.com",
      sizeLegend: "Size you're interested in",
      categoryLegend: "What do you most want to see first?",
      categoryLabels: {
        lingerie: "Lingerie",
        loungewear: "Loungewear",
        body: "Body",
        basicos: "Everyday basics",
      },
      deposit: {
        pixMark: "pix",
        pix: "Secure with a refundable deposit",
        badge: "Coming soon",
        text:
          "In a future phase, anyone who wants to will be able to secure their reservation with a symbolic, 100% refundable deposit via Pix. It's not active yet.",
      },
      submit: "Reserve my spot",
      submitting: "Reserving…",
      micro: {
        pre:
          "Reserving isn't buying and creates no charge. We keep your data only to notify you about the collection, in accordance with our ",
        linkLabel: "Privacy Policy",
        post: " and the LGPD. You can leave the list whenever you want.",
      },
      success: {
        heading: "Spot reserved!",
        body:
          "You're on the priority list. We'll reach out on WhatsApp as soon as the collection arrives.",
        queueLabel: "This is your number in the queue.",
      },
      errors: {
        name: "Your name is missing",
        whatsapp: "Check the WhatsApp number",
        email: "Check the email",
        form: "We couldn't reserve right now. Try again in a moment.",
        offline: "No connection. Check your internet and try again.",
        invalidPayload: "Invalid submission",
        saveFailed: "We couldn't save right now. Try again.",
      },
    },
    rail: {
      imageAlt:
        "Mosaic of women with different bodies and skin tones wearing pieces from the collection",
      heading: "Why join the list",
      benefits: [
        {
          title: "Real priority",
          body:
            "The list buys before the public launch. Debut stock is limited.",
        },
        {
          title: "No rush, no charge",
          body:
            "You reserve now and decide when the piece arrives. Nothing is charged today.",
        },
        {
          title: "We'll notify you on WhatsApp",
          body: "Just one notice, when it matters. No spam, no runaround.",
        },
        {
          title: "Your opinion shapes the collection",
          body:
            "What you choose here helps decide the sizes and styles we produce first.",
        },
      ],
    },
  },

  faq: {
    eyebrow: "Questions",
    heading: "Everything you want to know",
    items: [
      {
        q: "Does reserving cost anything?",
        a: "No. Reserving is free and creates no charge whatsoever. You simply join the priority list and are notified when the collection arrives.",
      },
      {
        q: "Is reserving the same as buying?",
        a: "No. The reservation only guarantees that you find out first and have priority to buy. The decision to buy is yours, when the piece is available.",
      },
      {
        q: "How will I be notified?",
        a: "Via the WhatsApp number you leave, and by email if you'd like. Just one notice, when the collection arrives. No spam.",
      },
      {
        q: "What if I change my mind?",
        a: "No problem. You can leave the list whenever you want — just reply on WhatsApp asking to cancel. Your data is handled in accordance with the LGPD.",
      },
      {
        q: "When does the collection arrive?",
        a: "We're forming the list now to define production. Those who reserve are the first to know the exact date, before the public launch.",
      },
    ],
  },

  footer: {
    tagline:
      "Reservation list for the debut collection. Reserving is free and with no commitment.",
    legal:
      "Your data is used only to notify you about the collection, in accordance with the LGPD (Law 13.709/2018). No payment is collected at this stage.",
    cta: "Reserve my spot",
  },

  og: {
    eyebrow: "DEBUT COLLECTION · RESERVATION LIST",
    titleLead: "The first collection. ",
    titleEm: "Made for you.",
    subtitle:
      "Reserve your spot without paying anything now. Priority access and a WhatsApp notice when the piece arrives.",
    badge: "No charge · No commitment",
  },

  dashboard: {
    refresh: "↻ Refresh",
    refreshing: "Refreshing…",
    eyebrow: "Demand dashboard · internal",
    heading: "What the list is telling us",
    intro:
      "A live read on the test. This section is for the team, not the public — it's behind a password.",
    loadError: "We couldn't load the numbers right now.",
    retry: "Try again",
    kpis: {
      reservations: { label: "Reservations", desc: "total on the list" },
      conversion: { label: "Conversion", desc: "visit → reservation" },
      whatsapp: { label: "With WhatsApp", desc: "strong contact" },
      topSize: { label: "Top size", desc: "most requested" },
    },
    categoryHeading: "Interest by category",
    categoryLabels: {
      lingerie: "Lingerie",
      loungewear: "Loungewear",
      body: "Body",
      basicos: "Basics",
    },
    decisionRule: {
      pre:
        "Decision rule: we only move forward with the first order if reservations pass the agreed threshold ",
      and: "AND",
      post:
        " if the ambassador's promotion brings the expected traffic. One without the other, and we pause.",
    },
    meta: {
      goalLabel: "Reservation goal:",
      currentLabel: "current:",
      statusClears: "threshold reached ✓",
      statusBelow: "still below the threshold",
      visitsLabel: "Visits counted:",
    },
  },
} satisfies Dictionary;
