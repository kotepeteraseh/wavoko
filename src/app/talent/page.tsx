"use client";

// Informational overview of Wavoko's employer-side hiring support.
import Link from "next/link";
import { ArrowRight, ClipboardList, Search, UserRoundCheck, UsersRound } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

const hiringSteps = [
  { Icon: ClipboardList, title: "Define the role", description: "Clarify the responsibilities, skills, and experience that will help someone succeed." },
  { Icon: Search, title: "Find relevant people", description: "Build a focused search around the role requirements and the organisation's priorities." },
  { Icon: UserRoundCheck, title: "Review and connect", description: "Learn about candidate screening, shortlisting, and arranging useful conversations." },
  { Icon: UsersRound, title: "Support the decision", description: "Keep the hiring process clear as your team evaluates candidates and plans next steps." },
];

export default function Talent() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow="Wavoko Talent"
        title="Find people who move your team forward."
        text="Wavoko Talent helps employers build thoughtful, structured, and human hiring processes."
      />
      <section className="information-page">
        <div className="information-feature information-feature-dark">
          <div className="information-feature-copy">
            <p className="information-kicker">{t("A thoughtful hiring process")}</p>
            <h2>{t("Good hiring starts with clarity.")}</h2>
            <p>{t("The right hire is about more than matching a job title. It is about understanding the work ahead, the team, and the qualities that help someone thrive. Wavoko shares a practical framework for each part of that process.")}</p>
          </div>
          <div className="information-stat-list">
            <div><span>01</span><strong>{t("Understand the role")}</strong></div>
            <div><span>02</span><strong>{t("Focus the search")}</strong></div>
            <div><span>03</span><strong>{t("Make an informed choice")}</strong></div>
          </div>
        </div>
        <div className="information-section-heading">
          <p className="information-kicker">{t("How hiring can work")}</p>
          <h2>{t("A clear process, from brief to decision.")}</h2>
        </div>
        <div className="information-step-grid">
          {hiringSteps.map(({ Icon, title, description }, index) => (
            <article className="information-step-card" key={title}>
              <span className="information-step-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="information-step-icon"><Icon size={20} aria-hidden="true" /></span>
              <h3>{t(title)}</h3>
              <p>{t(description)}</p>
            </article>
          ))}
        </div>
        <div className="information-note">
          <UsersRound size={20} aria-hidden="true" />
          <p>{t("A consistent, respectful process helps both employers and candidates understand what comes next.")}</p>
        </div>
        <div className="information-contact-note">
          <p>{t("Learn more about Wavoko's hiring information.")}</p>
          <Link href="/contact">{t("Contact information")} <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
