/**
 * The shape of one locale's copy. Every locale file satisfies this exactly, so
 * adding a language is a compile-time-checked exercise: TypeScript will name
 * every string you forgot to translate.
 *
 * Source of truth for the copy itself is `docs/brand/Meridiano_Trilingual_Content.pdf`.
 */

export type Pillar = {
  /** "01" … "04" - rendered as a small gold numeral. */
  index: string;
  title: string;
  body: string;
  /** Which emblem-family icon fronts this pillar. */
  icon: "sun" | "palm" | "waves" | "horizon";
};

export type PortfolioCard = {
  index: string;
  /** Matches the image basename in /public/images/portfolio-*.webp */
  key: "intimates" | "lifestyle" | "grooming";
  name: string;
  tagline: string;
  status: string;
};

export type ApproachCard = {
  index: string;
  title: string;
  body: string;
};

export type Person = {
  role: string;
  name: string;
  bio: string;
  email: string;
};

export type Dictionary = {
  /** Drives <html lang> and og:locale. */
  htmlLang: string;
  ogLocale: string;

  meta: {
    title: string;
    description: string;
  };

  nav: {
    essence: string;
    market: string;
    portfolio: string;
    approach: string;
    leadership: string;
    contact: string;
    /** aria-label for the <nav> and the mobile disclosure button. */
    menuLabel: string;
    skipToContent: string;
  };

  hero: {
    wordmark: string;
    subline: string;
    /** Visually hidden - gives the emblem an accessible name. */
    emblemAlt: string;
    scrollHint: string;
  };

  essence: {
    label: string;
    title: string;
    body: string;
    pillars: [Pillar, Pillar, Pillar, Pillar];
  };

  market: {
    label: string;
    body: string;
    imageAlt: string;
  };

  portfolio: {
    label: string;
    title: string;
    note: string;
    cards: [PortfolioCard, PortfolioCard, PortfolioCard];
  };

  approach: {
    label: string;
    title: string;
    cards: [ApproachCard, ApproachCard, ApproachCard];
  };

  leadership: {
    label: string;
    title: string;
    people: [Person, Person];
  };

  contact: {
    label: string;
    title: string;
    inquiryLabel: string;
    inquiryEmail: string;
    formLabel: string;
    formPlaceholder: string;
    formButton: string;
    formSending: string;
    formSuccess: string;
    formError: string;
    formEmptyError: string;
  };

  footer: {
    copyright: string;
    builtIn: string;
  };
};
