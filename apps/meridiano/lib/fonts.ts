import { Cormorant_Garamond, Montserrat } from "next/font/google";

/**
 * Self-hosted by next/font - no runtime request to Google, no layout shift.
 *
 * Two weights per family, as the identity document requires ("Use two weights
 * maximum per typeface"). Cormorant carries every title; Montserrat carries
 * body copy and the small tracked-out labels.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-cormorant",
});

export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "500"],
  display: "swap",
  variable: "--font-montserrat",
});

export const fontClassName = `${cormorant.variable} ${montserrat.variable}`;
