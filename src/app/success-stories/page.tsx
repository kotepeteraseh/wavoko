"use client";

import { Quote, UsersRound, HeartHandshake } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

const testimonials = [
  { service: "Wavoko Solutions", role: "WECOAPPLY client", id: "01" },
  { service: "Wavoko Talent", role: "Employer client", id: "02" },
  { service: "Wavoko Finance", role: "Finance client", id: "03" },
];

export default function Stories() {
  const { t } = useLanguage();
  // Repeat the cards to make the marquee loop seamlessly without duplicate screen-reader content.
  const cards = (duplicate = false) => (
    <div className="story-testimonial-group" role="list" aria-hidden={duplicate || undefined}>
      {testimonials.map(({ service, role, id }) => (
        <article className="story-testimonial-card" key={id} role="listitem">
          <div className="story-testimonial-top">
            <span className="story-testimonial-mark"><Quote size={20} aria-hidden="true" /></span>
            <span className="story-testimonial-placeholder">{t("Placeholder")}</span>
          </div>
          <p className="story-testimonial-quote">{t("Verified client testimonial will be added here.")}</p>
          <div className="story-testimonial-client">
            <span className="story-testimonial-avatar" aria-hidden="true">{id}</span>
            <div>
              <strong>{t("Client name pending approval")}</strong>
              <span>{t(role)} · {t(service)}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <>
      <PageIntro
        eyebrow="People. Progress. Possibility."
        title="Stories of progress, told by our clients."
        text="We’re preparing this space for real client voices. Approved testimonials and verified impact figures will be added as they’re confirmed."
      />
      <section className="information-page stories-page">
        <div className="stories-heading">
          <div className="information-section-heading">
            <p className="information-kicker">{t("Client voices")}</p>
            <h2>{t("A little progress can change what comes next.")}</h2>
          </div>
          <p>{t("These testimonial cards are placeholders, not real client quotes. We’ll publish stories only with client approval.")}</p>
        </div>

        <div className="story-marquee" role="region" aria-label={t("Client testimonials")}>
          <div className="story-marquee-track">
            {cards()}
            {cards(true)}
          </div>
        </div>
        <p className="story-motion-note">{t("Testimonials move from right to left. Hover to pause.")}</p>

        <section className="stories-impact" aria-labelledby="stories-impact-title">
          <div className="stories-impact-heading">
            <span className="stories-impact-icon"><HeartHandshake size={22} aria-hidden="true" /></span>
            <div>
              <p className="information-kicker">{t("Our impact")}</p>
              <h2 id="stories-impact-title">{t("Progress we can measure, responsibly.")}</h2>
            </div>
          </div>
          <div className="stories-impact-grid">
            <article className="stories-impact-card">
              <UsersRound size={22} aria-hidden="true" />
              <strong>{t("Verified number pending")}</strong>
              <h3>{t("Wavoko users so far")}</h3>
              <p>{t("Add the verified total of Wavoko users here.")}</p>
            </article>
            <article className="stories-impact-card">
              <HeartHandshake size={22} aria-hidden="true" />
              <strong>{t("Verified number pending")}</strong>
              <h3>{t("Lives positively impacted")}</h3>
              <p>{t("Add a verified impact figure and explain how it was measured.")}</p>
            </article>
          </div>
          <p className="information-disclaimer">{t("Impact figures are placeholders until verified numbers and their measurement method are supplied.")}</p>
        </section>
      </section>
    </>
  );
}
