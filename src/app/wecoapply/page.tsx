"use client";

// Informational overview of Wavoko's candidate and career-support service.
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, FileCheck2 } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

const solutionAreas = [
  { Icon: FileCheck2, title: "WECOAPPLY", description: "Career and application guidance to help people present their experience, explore opportunities, and prepare for the next step." },
  { Icon: Building2, title: "WeWork", description: "Office spaces available to rent for people and teams looking for a place to work. Contact us to ask about locations and availability." },
];

const process = [
  ["Career support through WECOAPPLY", "Explore guidance for presenting your experience, finding relevant roles, and preparing for interviews."],
  ["Workspaces through WeWork", "Ask about office space options for your work needs, preferred location, and team size."],
];

export default function Wecoapply() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow="Wavoko Solutions"
        title="Practical solutions for work and careers."
        text="Wavoko Solutions brings together WECOAPPLY career guidance and WeWork office spaces available to rent."
      />
      <section className="information-page">
        <div className="information-feature">
          <div className="information-feature-copy">
            <p className="information-kicker">{t("One home, two ways to move forward")}</p>
            <h2>{t("Find support for your next step at work.")}</h2>
            <p>{t("Whether you are preparing for a new opportunity or looking for a place to work, Wavoko Solutions connects you with career guidance through WECOAPPLY and rentable office spaces through WeWork.")}</p>
          </div>
          <div className="information-feature-art" aria-hidden="true">
            <span className="information-art-orbit information-art-orbit-one" />
            <span className="information-art-orbit information-art-orbit-two" />
            <span className="information-art-icon"><BriefcaseBusiness size={36} /></span>
            <span className="information-art-label">WAVOKO SOLUTIONS</span>
          </div>
        </div>

        <div className="information-section-heading">
          <p className="information-kicker">{t("Explore our solutions")}</p>
          <h2>{t("Career guidance and spaces to work.")}</h2>
        </div>
        <div className="information-service-grid">
          {solutionAreas.map(({ Icon, title, description }, index) => (
            <article className="information-service-card solution-offer-card" key={title}>
              <div className="information-service-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3>{t(title)}</h3>
              <p className="information-service-description">{t(description)}</p>
            </article>
          ))}
        </div>

        <div className="information-process">
          <div className="information-section-heading">
            <p className="information-kicker">{t("Choose the support you need")}</p>
            <h2>{t("Two solutions. One place to start.")}</h2>
          </div>
          <ol>
            {process.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{t(title)}</h3><p>{t(description)}</p></div>
                <ArrowRight size={17} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>

        <div className="information-contact-note">
          <p>{t("Want to ask about WECOAPPLY or WeWork office spaces?")}</p>
          <Link href="/contact">{t("Read how to contact Wavoko")} <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
