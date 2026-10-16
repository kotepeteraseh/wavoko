"use client";

// Informational overview of cross-border financial topics and partner delivery.
import Link from "next/link";
import { ArrowLeftRight, ArrowRight, BadgeCheck, ChartNoAxesCombined, Globe2, WalletCards } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

const topics = [
  { Icon: ArrowLeftRight, title: "International transfers", description: "Understand how cross-border transfers work, including the recipient options that may be available." },
  { Icon: ChartNoAxesCombined, title: "Planning and saving", description: "Explore ways to set savings goals, plan ahead, and keep track of what matters to you." },
  { Icon: BadgeCheck, title: "Clear, responsible information", description: "Learn why fees, exchange rates, identity checks, and provider details matter before choosing a financial service." },
];

export default function Finance() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow="Money across borders"
        title="Understand your financial options."
        text="Wavoko Finance shares information about international money movement and saving, with regulated financial services provided by licensed partners."
      />
      <section className="information-page">
        <div className="finance-overview">
          <div className="finance-overview-icon"><Globe2 size={30} aria-hidden="true" /></div>
          <div>
            <p className="information-kicker">{t("Financial information")}</p>
            <h2>{t("Clear information helps you make considered choices.")}</h2>
            <p>{t("Financial needs often reach beyond borders. This section explains common topics to consider when exploring transfers and saving, so you can ask informed questions and understand who provides each service.")}</p>
          </div>
          <span className="finance-overview-stamp"><WalletCards size={24} aria-hidden="true" /> WAVOKO FINANCE</span>
        </div>
        <div className="information-section-heading">
          <p className="information-kicker">{t("Topics to explore")}</p>
          <h2>{t("A useful place to begin.")}</h2>
        </div>
        <div className="information-service-grid">
          {topics.map(({ Icon, title, description }, index) => (
            <article className="information-service-card" key={title}>
              <div className="information-service-top"><span>{String(index + 1).padStart(2, "0")}</span><Icon size={22} aria-hidden="true" /></div>
              <h3>{t(title)}</h3>
              <p className="information-service-description">{t(description)}</p>
            </article>
          ))}
        </div>
        <div className="finance-disclaimer">
          <BadgeCheck size={22} aria-hidden="true" />
          <div>
            <h3>{t("Know who provides the service.")}</h3>
            <p>{t("Wavoko is not a bank or money-transfer provider. Financial products and regulated services are offered by licensed third-party partners. Availability, eligibility, fees, and terms depend on the provider and location.")}</p>
          </div>
        </div>
        <div className="information-contact-note">
          <p>{t("For general questions about Wavoko Finance information, contact our team.")}</p>
          <Link href="/contact">{t("Contact information")} <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
