import { Header } from "./Header";
import { Hero } from "./Hero";
import { Essence } from "./Essence";
import { Market } from "./Market";
import { Portfolio } from "./Portfolio";
import { Approach } from "./Approach";
import { Leadership } from "./Leadership";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { getDictionary, type Locale } from "@/lib/content";

/** The whole site: one scroll, seven sections. Identical for every locale. */
export function Page({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <Header t={t} locale={locale} />
      <main id="main">
        <Hero t={t} />
        <Essence t={t} />
        <Market t={t} />
        <Portfolio t={t} />
        <Approach t={t} />
        <Leadership t={t} />
        <Contact t={t} locale={locale} />
      </main>
      <Footer t={t} />
    </>
  );
}
