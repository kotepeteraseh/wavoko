"use client";

import { useLanguage } from "./LanguageProvider";

// Shared heading block for informational pages: eyebrow, title, and description.
export default function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  const { t } = useLanguage();
  return (
    <section className="page-intro">
      <div className="page-intro-inner w-full px-5 py-14">
        <p className="eyebrow">{t(eyebrow)}</p>
        <h1 className="mt-2 max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1]">{t(title)}</h1>
        <p className="mt-3 max-w-xl">{t(text)}</p>
      </div>
    </section>
  );
}
