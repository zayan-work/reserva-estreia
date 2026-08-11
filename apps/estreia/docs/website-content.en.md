# Estreia — Website Content (English)

> **Purpose.** The complete, human-readable copy of the Estreia reservation
> website, translated to English. This is the single reference for the site's
> text. It mirrors, section by section, the typed dictionary at
> [`lib/i18n/dictionaries/en.ts`](../lib/i18n/dictionaries/en.ts) — the
> dictionary is what the code will read; this document is what people read and
> approve.
>
> **Source language:** Portuguese (pt-BR) — the site is live in Portuguese today.
> **Languages planned:** Portuguese (default), English, Spanish.
> **Voice:** warm, direct, reassuring. No pressure. "Reserving is not buying."
>
> ⚠️ **Legal-safety strings** are marked 🔒 — keep their exact meaning; confirm
> wording with Rengan before publishing (Spec Part 4).
>
> **Kept verbatim in every language:** WhatsApp, Pix, LGPD (Brazil-specific).

---

## Table of contents

1. [SEO & metadata](#1-seo--metadata)
2. [Header](#2-header)
3. [Hero](#3-hero)
4. [Trust strip](#4-trust-strip)
5. [How it works](#5-how-it-works)
6. [The collection (carousel)](#6-the-collection-carousel)
7. [Reservation — form](#7-reservation--form)
8. [Reservation — "why join" rail](#8-reservation--why-join-rail)
9. [FAQ](#9-faq)
10. [Footer](#10-footer)
11. [Social share image (Open Graph)](#11-social-share-image-open-graph)
12. [Internal demand dashboard (/painel)](#12-internal-demand-dashboard-painel)
13. [Accessibility & utility strings](#13-accessibility--utility-strings)

---

## 1. SEO & metadata

| Field | Content |
| --- | --- |
| Page title | Reserve your spot · Estreia Collection |
| Title template | `%s · Estreia` |
| Meta description | The first Estreia collection. Join the reservation list without paying anything now: you secure priority and are the first to know when the piece arrives. Made for you, produced in Brazil. |
| Keywords | reservation list · debut collection · Brazilian lingerie · loungewear · intimate apparel · no-commitment reservation · made in Brazil |
| OG image alt text | Estreia — The first collection. Made for you. No-commitment reservation list. |
| PWA manifest name | Estreia — Reservation list |
| PWA short name | Estreia |

---

## 2. Header

- **Logo:** Estreia. *(the period is part of the wordmark)*
- **Logo aria-label:** Estreia — home
- **Button:** Reserve my spot

---

## 3. Hero

- **Eyebrow:** Debut collection · reservation list
- **Headline:** The first collection. *Made for you.*
  *("Made for you." is the emphasized/italic phrase)*
- **Lede:** Join the reservation list without paying anything now. You secure priority and are the first to know when the piece arrives.
- **Primary button:** Reserve my spot
- **Live counter label:** _[live number]_ **people have already reserved**
- **Image alt text:** Woman smiling, sitting on the bed in natural light, wearing a wine-colored lace lingerie set

**Three reassurances** (bold lead + text) — 🔒 legal-safety:

1. 🔒 **No charge now.** You pay nothing to reserve.
2. 🔒 **Priority access.** Those who reserve buy first.
3. 🔒 **Zero commitment.** Reserving isn't buying.

---

## 4. Trust strip

Thin band, four reassurances (bold word emphasized):

1. **No payment** to join the list
2. A **WhatsApp** notice when it arrives
3. Produced in **Brazil**
4. You choose **size and style**

---

## 5. How it works

- **Eyebrow:** How it works
- **Heading:** Quality you can feel. A process that respects you.
- **Intro:** The reservation list exists so we understand exactly what you want before we produce. No waste, with an absolute focus on quality and the perfect fit for your body.
- **Image alt text:** Detail of a wine-colored lace lingerie set with gold embroidery over satin

**Steps** — 🔒 step copy is locked:

| # | Title | Body |
| --- | --- | --- |
| 1 | You reserve | Leave your name, WhatsApp, and preferred size. It takes less than a minute and there's no charge. |
| 2 | We produce | Once the list is formed, the collection goes into production in Brazil, made to truly fit. |
| 3 | You're notified first | When the piece arrives, everyone on the list gets the notice before anyone else and buys with priority. |

---

## 6. The collection (carousel)

- **Eyebrow:** Options & styles
- **Heading:** The collection, your way.
- **Intro:** Cuts, colors, and textures to match different moments, styles, and bodies. Because comfort is also recognizing yourself in the piece.

**Cards** (fixed order, 8 items):

| # | Label | Body | Image alt text |
| --- | --- | --- | --- |
| 1 | Sophistication | Lace that celebrates presence and personality. | Woman sitting by the window wearing a wine-colored lace set |
| 2 | Light tailoring | Delicacy, color, and confidence for every day. | Woman in a pink lace set with a cream blazer over her shoulders |
| 3 | Lace in color | Textures made to be noticed by touch. | Woman in a lace set in shades of pink and wine with a garter belt |
| 4 | Golden clarity | Lightness that brightens your routine. | Woman in a light lace set with golden details in natural light |
| 5 | Real comfort | Support, softness, and a thoughtful fit. | Woman in a cream high-waisted top and briefs, at home |
| 6 | Made for curves | Proportion, comfort, and beauty with no compromises. | Woman with curves wearing a wine-colored lace set by the window |
| 7 | A pause ritual | Care begins with what touches your skin. | Woman in cream loungewear sitting on the sofa hugging a cushion |
| 8 | Community | Made to share moments with the people you love. | Woman in wine-colored loungewear sitting on the sofa in a cozy living room |

**Carousel controls (aria-labels):**
- Track region: Carousel of the collection's options and styles
- Previous: See previous styles
- Next: See more styles

---

## 7. Reservation — form

- **Heading:** Secure your spot in the debut
- **Subheading:** Your reservation is free and guarantees priority access to the collection before the official launch.

**Fields:**

| Field | Label | Placeholder |
| --- | --- | --- |
| Name | Name | What you'd like to be called |
| WhatsApp | WhatsApp | (11) 90000-0000 |
| Email | Email *(optional)* | you@email.com |

- **Size group legend:** Size you're interested in
  Options: PP · P · M · G · GG · XG · XXG *(Brazilian sizing — not translated)*
- **Category group legend:** What do you most want to see first?
  Options: Lingerie · Loungewear · Body · Everyday basics

**Deposit slot** — *architected but DISABLED on purpose; collects no money; shown as "coming soon" only:*
- Row: **pix** Secure with a refundable deposit — badge: **Coming soon**
- Text: In a future phase, anyone who wants to will be able to secure their reservation with a symbolic, 100% refundable deposit via Pix. It's not active yet.

**Submit button:** Reserve my spot *(while sending: "Reserving…")*

**Fine print** — 🔒 legal-safety:
> 🔒 Reserving isn't buying and creates no charge. We keep your data only to notify you about the collection, in accordance with our [Privacy Policy] and the LGPD. You can leave the list whenever you want.

**Success state (after reserving):**
- Heading: Spot reserved!
- Body: You're on the priority list. We'll reach out on WhatsApp as soon as the collection arrives.
- Queue number: `#[number]`
- Queue caption: This is your number in the queue.

**Validation / error messages** (in-voice, short):

| Situation | Message |
| --- | --- |
| Name missing | Your name is missing |
| WhatsApp invalid | Check the WhatsApp number |
| Email invalid | Check the email |
| Generic submit failure | We couldn't reserve right now. Try again in a moment. |
| No connection | No connection. Check your internet and try again. |
| Invalid request payload (server) | Invalid submission |
| Save failed (server) | We couldn't save right now. Try again. |

---

## 8. Reservation — "why join" rail

- **Heading:** Why join the list
- **Image alt text:** Mosaic of women with different bodies and skin tones wearing pieces from the collection

**Benefits (4):**

| Title | Body |
| --- | --- |
| Real priority | The list buys before the public launch. Debut stock is limited. |
| No rush, no charge | You reserve now and decide when the piece arrives. Nothing is charged today. |
| We'll notify you on WhatsApp | Just one notice, when it matters. No spam, no runaround. |
| Your opinion shapes the collection | What you choose here helps decide the sizes and styles we produce first. |

---

## 9. FAQ

- **Eyebrow:** Questions
- **Heading:** Everything you want to know

> The first two answers are 🔒 legal-safety — do not reword without Rengan.

**1. Does reserving cost anything?** 🔒
No. Reserving is free and creates no charge whatsoever. You simply join the priority list and are notified when the collection arrives.

**2. Is reserving the same as buying?** 🔒
No. The reservation only guarantees that you find out first and have priority to buy. The decision to buy is yours, when the piece is available.

**3. How will I be notified?**
Via the WhatsApp number you leave, and by email if you'd like. Just one notice, when the collection arrives. No spam.

**4. What if I change my mind?**
No problem. You can leave the list whenever you want — just reply on WhatsApp asking to cancel. Your data is handled in accordance with the LGPD.

**5. When does the collection arrive?**
We're forming the list now to define production. Those who reserve are the first to know the exact date, before the public launch.

---

## 10. Footer

- **Logo:** Estreia.
- **Tagline:** Reservation list for the debut collection. Reserving is free and with no commitment.
- **Legal line** 🔒: Your data is used only to notify you about the collection, in accordance with the LGPD (Law 13.709/2018). No payment is collected at this stage.
- **Button:** Reserve my spot

---

## 11. Social share image (Open Graph)

Generated 1200×630 image used when the link is shared.

- **Eyebrow:** DEBUT COLLECTION · RESERVATION LIST
- **Headline:** The first collection. *Made for you.*
- **Subtitle:** Reserve your spot without paying anything now. Priority access and a WhatsApp notice when the piece arrives.
- **Badge:** No charge · No commitment

---

## 12. Internal demand dashboard (/painel)

> Internal, password-protected, not indexed. Included for completeness — this is
> team-facing, not public.

- **Refresh button:** ↻ Refresh *(while loading: "Refreshing…")*
- **Eyebrow:** Demand dashboard · internal
- **Heading:** What the list is telling us
- **Intro:** A live read on the test. This section is for the team, not the public — it's behind a password.
- **Load error:** We couldn't load the numbers right now. — retry: Try again

**KPIs:**

| Value | Label | Caption |
| --- | --- | --- |
| _[count]_ | Reservations | total on the list |
| _[%]_ | Conversion | visit → reservation |
| _[%]_ | With WhatsApp | strong contact |
| _[size]_ | Top size | most requested |

- **Bars heading:** Interest by category
  Categories: Lingerie · Loungewear · Body · Basics
- **Decision rule:** Decision rule: we only move forward with the first order if reservations pass the agreed threshold **AND** if the ambassador's promotion brings the expected traffic. One without the other, and we pause.
- **Progress line:** Reservation goal: _[target]_ · current: _[count]_ — _[threshold reached ✓ / still below the threshold]_. Visits counted: _[count]_.

---

## 13. Accessibility & utility strings

- **Skip link:** Skip to the reservation
- **Reservation section heading (screen-reader only):** Reserve your spot in the debut collection

---

*Generated as the English reference for a trilingual (pt · en · es) site. The
Spanish version in the codebase is an unreviewed draft to be replaced. When you
supply reviewed Spanish/Portuguese copy, it maps key-for-key onto the sections
above.*
