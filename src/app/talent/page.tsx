"use client";

// Talent Acquisition landing page describing the hiring process for businesses.
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

// Four stages shown as numbered cards.
const steps = [
  ["Tell us the role", "Share what you need, the skills, and the timeline."],
  ["We find and screen", "We search, interview and check candidates for fit."],
  ["You meet the shortlist", "We send you vetted candidates and arrange interviews."],
  ["We support the hire", "From offer to first day, we stay involved."],
];

export default function Talent() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro eyebrow="For your business" title="Build your next great team." text="Great businesses start with great people. We connect you with talent that shares your vision." />
      <section className="wrap">
        <div className="grid3">
          {steps.map(([title, description], i) => (
            <div key={title} className="card"><p className="text-3xl font-black text-ink">{i + 1}</p><h2 className="font-bold">{t(title)}</h2><p className="mt-1 text-sm">{t(description)}</p></div>
          ))}
        </div>
        <Link href="/contact" className="btn mt-8">{t("Tell us about your hiring needs")}</Link>
      </section>
    </>
  );
}
