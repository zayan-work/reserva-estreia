import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import type { Dictionary, Locale } from "@/lib/content";

export function Contact({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section
      className="section contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="shell">
        <Reveal className="section-head">
          <span className="label">{t.contact.label}</span>
          <h2 className="display" id="contact-title">
            {t.contact.title}
          </h2>
        </Reveal>

        <Reveal className="contact-grid">
          <div>
            <div className="contact-block">
              <span className="label">{t.contact.inquiryLabel}</span>
              <a href={`mailto:${t.contact.inquiryEmail}`}>
                {t.contact.inquiryEmail}
              </a>
            </div>

            <div className="contact-block">
              <span className="label">{t.contact.addressLabel}</span>
              <address>{t.contact.address}</address>
            </div>
          </div>

          <ContactForm t={t} locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
