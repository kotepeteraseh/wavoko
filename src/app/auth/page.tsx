"use client";

// This route now explains the site's informational purpose instead of offering accounts.
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

export default function AccountInformation() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow="Wavoko information"
        title="A place to learn about your next step."
        text="This website shares information about Wavoko and the areas we work in. Online accounts and subscriptions are not available here."
      />
      <section className="information-page">
        <div className="information-note information-note-large">
          <BookOpenText size={24} aria-hidden="true" />
          <p>{t("Explore the service information to learn about career support, talent acquisition, and global finance topics.")}</p>
        </div>
        <div className="information-contact-note">
          <p>{t("Choose a topic to explore.")}</p>
          <Link href="/services">{t("Explore services")} <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
