"use client";

// Company overview describing Wavoko's purpose and its three areas of information.
import Link from "next/link";
import { ArrowRight, Globe2, HeartHandshake, Lightbulb, UsersRound } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

const values = [
  { Icon: HeartHandshake, title: "People first", description: "Every decision starts with the people and organisations looking for a clearer way forward." },
  { Icon: Lightbulb, title: "Clarity over complexity", description: "Useful information should help people understand their options and the steps ahead." },
  { Icon: Globe2, title: "Connected perspectives", description: "Career growth, teams, families, and financial choices are all part of how people move forward." },
];

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow="About Wavoko"
        title="Connecting people to possibilities."
        text="Wavoko brings information about career support, hiring, and financial topics together in one place."
      />
      <section className="information-page">
        <div className="about-story-panel">
          <div className="about-story-mark" aria-hidden="true">W</div>
          <div>
            <p className="information-kicker">{t("Our purpose")}</p>
            <h2>{t("Helping people make sense of what comes next.")}</h2>
            <p>{t("People and organisations face important decisions as they grow. Wavoko exists to make those decisions easier to explore by sharing accessible information across work, talent, and life beyond borders.")}</p>
          </div>
        </div>
        <div className="information-section-heading">
          <p className="information-kicker">{t("What guides us")}</p>
          <h2>{t("A people-first point of view.")}</h2>
        </div>
        <div className="information-value-grid">
          {values.map(({ Icon, title, description }, index) => (
            <article className="information-value-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={23} aria-hidden="true" />
              <h3>{t(title)}</h3>
              <p>{t(description)}</p>
            </article>
          ))}
        </div>
        <div className="about-service-links">
          <div>
            <span className="about-links-icon"><UsersRound size={20} aria-hidden="true" /></span>
            <div><h3>{t("Three areas. One connected perspective.")}</h3><p>{t("Learn what each Wavoko service covers.")}</p></div>
          </div>
          <Link href="/services" aria-label={t("Explore Wavoko services")}><ArrowRight size={20} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
