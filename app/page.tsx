import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import JsonLd from "@/components/JsonLd";
import Reservation from "@/components/Reservation";
import TrustStrip from "@/components/TrustStrip";
import VisitBeacon from "@/components/VisitBeacon";

/**
 * The landing page — one scroll, in the exact order of the Build Spec (Part 2):
 * header · hero · trust strip · how it works · reservation · FAQ · footer.
 * The internal demand dashboard lives at /painel (protected), never here.
 */
export default function Home() {
  return (
    <>
      <a href="#reservar" className="skip">
        Pular para a reserva
      </a>
      <span id="top" />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <Reservation />
        <Faq />
      </main>
      <Footer />
      <VisitBeacon />
      <JsonLd />
    </>
  );
}
