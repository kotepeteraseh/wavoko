"use client";

// Service directory: presents each Wavoko service with a link to its detail page.
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

// Service name, destination, audience, and summary points for each service card.
const items = [
  ["WECOAPPLY", "/wecoapply", "For your career", ["Tailored resume for every role", "We handle your applications", "Interview support and on-the-job help", "Live dashboard of your applications"]],
  ["Talent Acquisition", "/talent", "For your business", ["Role briefing and sourcing", "Screening and shortlisting", "Interview coordination", "Support through the offer"]],
  ["Wavoko Finance", "/finance", "For your future", ["Send money across borders", "Clear fees and exchange rates", "Savings goals", "Through a licensed partner"]],
] as const;

export default function Services() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro eyebrow="Our services" title="Three services, one purpose." text="Choose the service that fits where you are today." />
      <section className="wrap grid3">
        {items.map(([name, href, tag, points]) => (
          <div key={name} className="card">
            <p className="text-sm text-ink">{t(tag)}</p>
            <h2 className="text-xl font-bold">{t(name)}</h2>
            <ul className="my-3 list-disc space-y-1 pl-5 text-sm">{points.map((p) => <li key={p}>{t(p)}</li>)}</ul>
            <Link href={href} className="btn">{t("Learn more")}</Link>
          </div>
        ))}
      </section>
    </>
  );
}
