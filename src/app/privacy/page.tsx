"use client";

// Plain-language privacy summary page; have the published policy reviewed before launch.
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

// Each entry becomes one titled privacy topic in the page body.
const sections = [
  ["What we collect", "If you contact Wavoko, we receive the contact details and message that you choose to include."],
  ["How we use it", "We use the details you send to understand and respond to your enquiry."],
  ["Who can see it", "Your message may be handled by the people and providers needed to receive and respond to enquiries."],
  ["Your choices", "You can contact Wavoko to ask about a message or request that your contact information be corrected or removed."],
  ["Security", "The published privacy notice should explain the safeguards and retention periods used for contact enquiries."],
];

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro eyebrow="Privacy & data" title="Your privacy matters." text="An overview of the information Wavoko may handle when you contact us or learn about our services." />
      <section className="information-page">
        <div className="privacy-intro-panel">
          <p className="information-kicker">{t("Information in plain language")}</p>
          <h2>{t("Understand what happens to your information.")}</h2>
          <p>{t("This overview focuses on this information website and its contact form. It is not a substitute for a complete privacy notice.")}</p>
        </div>
        <div className="privacy-section-grid">
          {sections.map(([title, description], index) => (
            <article className="privacy-section-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{t(title)}</h2>
              <p>{t(description)}</p>
            </article>
          ))}
        </div>
        <div className="information-contact-note">
          <p>{t("Questions about your information?")}</p>
          <a href="mailto:info@localadsnetwork.com">{t("Contact Wavoko's team")} <span aria-hidden="true">→</span></a>
        </div>
        <p className="information-disclaimer">{t("Please confirm the final contact-handling, retention, and security practices with a qualified professional before publication.")}</p>
      </section>
    </>
  );
}
