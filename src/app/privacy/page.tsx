"use client";

// Plain-language privacy summary page; have the published policy reviewed before launch.
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

// Each entry becomes one titled privacy topic in the page body.
const sections = [
  ["What we collect", "Account details, resume information, job preferences, uploaded resume files, and messages you send us."],
  ["How we use it", "To prepare tailored resumes, apply for jobs on your behalf, support you, and run your subscription."],
  ["Who can see it", "You, and the Wavoko staff who work on your case. We do not sell your data."],
  ["Your choices", "You can ask to see, correct or delete your data at any time by contacting us."],
  ["Security", "Data is encrypted in transit, resumes are stored privately, and each client can only access their own records."],
];

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro eyebrow="Privacy & data" title="Your data, handled with care." text="A plain-language summary of how Wavoko treats your information." />
      <section className="wrap max-w-3xl space-y-5">
        {sections.map(([title, description]) => <div key={title}><h2 className="font-bold text-ink">{t(title)}</h2><p className="text-charcoal">{t(description)}</p></div>)}
        <p className="text-sm text-charcoal">{t("Contact: info@localadsnetwork.com. This is a template, so have a lawyer review it before launch.")}</p>
      </section>
    </>
  );
}
