"use client";

// The former client dashboard route now provides information about the site's scope.
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

export default function DashboardInformation() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow="About this website"
        title="Information, clearly explained."
        text="Wavoko's website introduces our services and shares useful context. It does not provide a client portal or application tracking."
      />
      <section className="information-page">
        <div className="information-note information-note-large">
          <LayoutDashboard size={24} aria-hidden="true" />
          <p>{t("This site is designed to share information. For an overview of what Wavoko does, visit the services page.")}</p>
        </div>
        <div className="information-contact-note">
          <p>{t("Find out what Wavoko is about.")}</p>
          <Link href="/services">{t("Explore services")} <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
