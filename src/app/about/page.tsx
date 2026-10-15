"use client";

// About page: explains Wavoko's purpose and the values behind its services.
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

// Short value statements displayed as cards beneath the introduction.
const values = [
  ["People first", "Every decision starts with the person or business we are helping."],
  ["Built around you", "We work to your goals and your pace, not a fixed script."],
  ["Without borders", "We connect people, companies and money across countries."],
];

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro eyebrow="About us" title="Connecting people to possibilities." text="Wavoko brings career support, hiring and finance together, so people and businesses can grow in one place." />
      <section className="wrap">
        <p className="max-w-2xl text-charcoal">{t("Wavoko is a team that helps job seekers land the right roles, helps companies find the right people, and helps families move and save money across borders. Our three services share one purpose: opening doors to possibility.")}</p>
        <div className="grid3 mt-8">
          {values.map(([title, description]) => <div key={title} className="card"><h3 className="font-bold text-ink">{t(title)}</h3><p className="mt-1 text-sm">{t(description)}</p></div>)}
        </div>
      </section>
    </>
  );
}
