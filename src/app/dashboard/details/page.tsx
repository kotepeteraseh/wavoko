"use client";

// The former client profile route now explains that the website collects no account profile.
import Link from "next/link";
import { ArrowRight, CircleUserRound } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProfileInformation() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow="Your information"
        title="Learn about Wavoko's approach."
        text="This informational website does not ask visitors to create a profile, upload a resume, or save job preferences."
      />
      <section className="information-page">
        <div className="information-note information-note-large">
          <CircleUserRound size={24} aria-hidden="true" />
          <p>{t("Read about career support and the information that can help you prepare for your next professional move.")}</p>
        </div>
        <div className="information-contact-note">
          <p>{t("Explore career information.")}</p>
          <Link href="/wecoapply">{t("About WECOAPPLY")} <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
