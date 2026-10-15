"use client";

// Finance landing page: describes upcoming transfer and savings support.
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

// Feature summaries are rendered as a consistent set of cards.
const feats = [
  ["Send money across borders", "Choose a country, see the fee and rate first, then send to a bank or mobile money account."],
  ["Save towards your goals", "Set a goal, add money over time and watch your progress."],
  ["Safe by design", "Transfers run through a licensed partner, with identity checks for every customer."],
];

export default function Finance() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro eyebrow="For your future" title="Explore financial possibilities." text="Move money between countries and build your savings with Wavoko Finance." />
      <section className="wrap">
        <div className="grid3">
          {feats.map(([title, description]) => <div key={title} className="card"><h2 className="font-bold text-ink">{t(title)}</h2><p className="mt-1 text-sm">{t(description)}</p></div>)}
        </div>
        <p className="mt-6 rounded-md bg-brand-soft p-4 text-sm">{t("Wavoko Finance is coming soon. Contact us to be among the first to know.")}</p>
        <Link href="/contact" className="btn mt-6">{t("Get in touch")}</Link>
      </section>
    </>
  );
}
