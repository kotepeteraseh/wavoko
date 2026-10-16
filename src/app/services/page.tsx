"use client";

// Overview of what Wavoko does, written for visitors exploring the organisation.
import { ArrowLeftRight, Building2, Globe2, HeartHandshake, Users } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

const services = [
  {
    Icon: Building2,
    number: "01",
    title: "Wavoko Solutions",
    audience: "Solutions for work and careers",
    description: "A home for practical solutions that support people at work, through WECOAPPLY career guidance and WeWork office spaces for rent.",
    details: ["WECOAPPLY career and application guidance", "WeWork office spaces available to rent"],
  },
  {
    Icon: Users,
    number: "02",
    title: "Wavoko Talent",
    audience: "For employers",
    description: "Hiring support that helps organisations define their needs, reach relevant candidates, and make informed hiring decisions.",
    details: ["Role definition and candidate sourcing", "Screening and shortlisting", "Interview coordination guidance"],
  },
  {
    Icon: ArrowLeftRight,
    number: "03",
    title: "Wavoko Finance",
    audience: "For people and families",
    description: "Information and guidance around international money movement and saving, with financial services delivered by a licensed partner.",
    details: ["Cross-border transfer information", "Fees and exchange-rate transparency", "Savings goals and planning"],
  },
];

export default function Services() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow="What we do"
        title="Three services. One connected purpose."
        text="Wavoko brings career guidance, hiring support, and cross-border financial information together to help people and organisations move forward."
      />
      <section className="information-page">
        <div className="information-lead">
          <span className="information-lead-icon"><HeartHandshake size={22} aria-hidden="true" /></span>
          <div>
            <p className="information-kicker">{t("A connected approach")}</p>
            <h2>{t("Support for the moves that matter.")}</h2>
            <p>{t("Whether you are planning your next career move, building a team, or learning about financial options across borders, Wavoko brings clear information and people-first guidance together.")}</p>
          </div>
        </div>
        <div className="information-service-grid">
          {services.map(({ Icon, number, title, audience, description, details }) => (
            <article className="information-service-card" key={number}>
              <div className="information-service-top">
                <span>{number}</span>
                <Icon size={22} aria-hidden="true" />
              </div>
              <p className="information-kicker">{t(audience)}</p>
              <h3>{t(title)}</h3>
              <p className="information-service-description">{t(description)}</p>
              <ul>
                {details.map((detail) => <li key={detail}>{t(detail)}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="information-note">
          <Globe2 size={20} aria-hidden="true" />
          <p>{t("Wavoko's services share one goal: make complex next steps clearer, more personal, and easier to understand.")}</p>
        </div>
        <p className="information-disclaimer">{t("Financial services are provided by licensed partners. Availability and eligibility may vary by location.")}</p>
      </section>
    </>
  );
}
