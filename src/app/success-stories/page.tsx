"use client";

// Success-stories page with illustrative examples to replace with approved client stories.
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

// Each story contains its service tag, headline, and short description.
const stories = [
  ["WECOAPPLY", "A new role. A whole new chapter.", "From a scattered job search to a focused career plan, a journey toward a role that truly fits."],
  ["WECOAPPLY", "Turning ambition into opportunity.", "A more intentional search, tailored applications, and the confidence to take the next step."],
  ["Talent Acquisition", "The right people. A stronger team.", "A growing company finds the talent that shares its vision for what comes next."],
];

export default function Stories() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro eyebrow="People. Progress. Possibility" title="Every ambition has a story." text="The journeys we are here to make possible." />
      <section className="wrap">
        <div className="grid3">
          {stories.map(([tag, title, d]) => (
            <article key={title} className="card">
              <p className="text-xs font-bold uppercase text-ink">{t(tag)}</p>
              <h2 className="mt-1 font-bold">{t(title)}</h2>
              <p className="my-2 text-sm text-charcoal">{t(d)}</p>
              <p className="text-xs text-charcoal">{t("Illustrative story")}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-charcoal">{t("Replace these with real client stories (with permission) as you collect them.")}</p>
      </section>
    </>
  );
}
